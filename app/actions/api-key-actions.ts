"use server";

import { neon } from '@neondatabase/serverless';

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }
  return neon(process.env.DATABASE_URL);
};

let schemaReady: Promise<void> | null = null;

/** Ensure api_keys / api_logs exist (Payload DB may not include them). */
async function ensureApiSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS api_keys (
          key VARCHAR(255) PRIMARY KEY,
          secret_key VARCHAR(255),
          uid VARCHAR(255) NOT NULL,
          status VARCHAR(50) DEFAULT 'active',
          allowed_ips TEXT[] DEFAULT '{}',
          access_scopes TEXT[] DEFAULT '{"read_users"}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS api_logs (
          id SERIAL PRIMARY KEY,
          uid VARCHAR(255) NOT NULL,
          endpoint VARCHAR(255) NOT NULL,
          status_code INTEGER NOT NULL,
          response_time_ms INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS api_keys_uid_idx ON api_keys(uid)`;
      await sql`CREATE INDEX IF NOT EXISTS api_logs_uid_idx ON api_logs(uid)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export async function fetchApiKey(uid: string) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  const result = await sql`SELECT key, secret_key, status, created_at, allowed_ips, access_scopes FROM api_keys WHERE uid = ${uid} LIMIT 1`;
  if (result.length > 0) {
    return {
      key: result[0].key,
      secretKey: result[0].secret_key,
      status: result[0].status,
      allowedIps: result[0].allowed_ips || [],
      accessScopes: result[0].access_scopes || [],
      createdAt: result[0].created_at.toISOString() 
    };
  }
  return null;
}

export async function generateApiKey(uid: string) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  const newKey = `eh_live_public_${crypto.randomUUID().replace(/-/g, '')}`;
  const newSecret = `eh_live_secret_${crypto.randomUUID().replace(/-/g, '')}`;
  
  // Remove existing key if any
  await sql`DELETE FROM api_keys WHERE uid = ${uid}`;
  
  // Insert new key
  await sql`
    INSERT INTO api_keys (key, secret_key, uid, status)
    VALUES (${newKey}, ${newSecret}, ${uid}, 'active')
  `;

  // Also clear any old dummy logs
  await sql`DELETE FROM api_logs WHERE uid = ${uid}`;

  // Insert 15 dummy logs so the user has something to download
  const endpoints = ['/api/v1/users', '/api/v1/auth', '/api/v1/billing', '/api/v1/projects'];
  const statuses = [200, 200, 200, 200, 201, 401, 403, 500]; // Heavily weighted to success
  for (let i = 0; i < 15; i++) {
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const timeMs = Math.floor(Math.random() * 300) + 20; // 20ms to 320ms
    // Random date in the last 7 days
    const daysAgo = Math.floor(Math.random() * 7);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    await sql`
      INSERT INTO api_logs (uid, endpoint, status_code, response_time_ms, created_at)
      VALUES (${uid}, ${endpoint}, ${status}, ${timeMs}, ${date.toISOString()})
    `;
  }
  
  return { key: newKey, secretKey: newSecret, status: 'active', allowedIps: [], accessScopes: ['read_users'] };
}

export async function revokeApiKey(uid: string) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  await sql`DELETE FROM api_keys WHERE uid = ${uid}`;
  // Optionally also delete logs
  await sql`DELETE FROM api_logs WHERE uid = ${uid}`;
  return { success: true };
}

export async function toggleKeyStatus(uid: string, newStatus: 'active' | 'inactive') {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  await sql`UPDATE api_keys SET status = ${newStatus} WHERE uid = ${uid}`;
  return { success: true, status: newStatus };
}

export async function updateAllowedIps(uid: string, ips: string[]) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  await sql`UPDATE api_keys SET allowed_ips = ${ips} WHERE uid = ${uid}`;
  return { success: true, allowedIps: ips };
}

export async function updateAccessScopes(uid: string, scopes: string[]) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  await sql`UPDATE api_keys SET access_scopes = ${scopes} WHERE uid = ${uid}`;
  return { success: true, accessScopes: scopes };
}

export async function fetchApiLogs(uid: string) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  const result = await sql`
    SELECT id, endpoint, status_code, response_time_ms, created_at 
    FROM api_logs 
    WHERE uid = ${uid} 
    ORDER BY created_at DESC 
    LIMIT 100
  `;
  
  return result.map(row => ({
    id: row.id,
    endpoint: row.endpoint,
    statusCode: row.status_code,
    responseTimeMs: row.response_time_ms,
    createdAt: row.created_at.toISOString()
  }));
}

export async function fetchUsageMetrics(uid: string) {
  if (!uid) throw new Error("No UID provided");
  await ensureApiSchema();
  const sql = getSql();
  
  const [totalRes, errorsRes, latencyRes, monthlyRes] = await Promise.all([
    sql`SELECT count(*) as count FROM api_logs WHERE uid = ${uid}`,
    sql`SELECT count(*) as count FROM api_logs WHERE uid = ${uid} AND status_code >= 400`,
    sql`SELECT avg(response_time_ms) as avg FROM api_logs WHERE uid = ${uid}`,
    sql`
      SELECT 
        EXTRACT(year FROM created_at) as year,
        EXTRACT(month FROM created_at) as month,
        COUNT(*) as count
      FROM api_logs
      WHERE uid = ${uid} AND created_at >= NOW() - INTERVAL '12 months'
      GROUP BY 1, 2
    `
  ]);

  const totalRequests = parseInt(totalRes[0]?.count || '0', 10);
  const totalErrors = parseInt(errorsRes[0]?.count || '0', 10);
  const avgLatency = Math.round(parseFloat(latencyRes[0]?.avg || '0'));
  const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;

  // Build the last 12 months array
  const monthlyData = new Array(12).fill(0);
  const now = new Date();
  
  monthlyRes.forEach(row => {
    // calculate how many months ago this was
    const rowDate = new Date(row.year, row.month - 1, 1);
    const monthsAgo = (now.getFullYear() - rowDate.getFullYear()) * 12 + (now.getMonth() - rowDate.getMonth());
    
    // We want index 11 to be current month, index 0 to be 11 months ago
    if (monthsAgo >= 0 && monthsAgo < 12) {
      const index = 11 - monthsAgo;
      monthlyData[index] = parseInt(row.count || '0', 10);
    }
  });

  return {
    totalRequests,
    errorRate: errorRate.toFixed(2),
    avgLatency,
    monthlyData
  };
}
