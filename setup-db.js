const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS api_keys (
        key VARCHAR(255) PRIMARY KEY,
        secret_key VARCHAR(255),
        uid VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        allowed_ips TEXT[] DEFAULT '{}',
        access_scopes TEXT[] DEFAULT '{"read_users"}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS api_logs (
        id SERIAL PRIMARY KEY,
        uid VARCHAR(255) NOT NULL,
        endpoint VARCHAR(255) NOT NULL,
        status_code INTEGER NOT NULL,
        response_time_ms INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS api_keys_uid_idx ON api_keys(uid)`;
    await sql`CREATE INDEX IF NOT EXISTS api_logs_uid_idx ON api_logs(uid)`;
    console.log("api_keys and api_logs tables ready");
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
}

main();
