"use server";

import { neon } from '@neondatabase/serverless';

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }
  return neon(process.env.DATABASE_URL);
};

export type SearchResult = {
  id: string;
  type: 'page' | 'key' | 'log';
  title: string;
  subtitle: string;
  url: string;
  icon: 'Book' | 'Key' | 'Server' | 'BarChart' | 'Activity';
};

const STATIC_PAGES: SearchResult[] = [
  { id: 'p1', type: 'page', title: 'Server Setup', subtitle: 'Configure private backend routing', url: '/server', icon: 'Server' },
  { id: 'p2', type: 'page', title: 'API Keys', subtitle: 'Manage your server credentials', url: '/api/key', icon: 'Key' },
  { id: 'p3', type: 'page', title: 'ChatScan', subtitle: 'View message interception logs', url: '/chatscan', icon: 'BarChart' },
  { id: 'p4', type: 'page', title: 'Documentation', subtitle: 'Self-hosted server guide', url: '/docs', icon: 'Book' },
];

export async function searchSystem(uid: string, query: string): Promise<SearchResult[]> {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  
  const results: SearchResult[] = [];

  // 1. Search Static Pages
  const pageMatches = STATIC_PAGES.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.subtitle.toLowerCase().includes(q)
  );
  results.push(...pageMatches);

  // 2. Search Database
  if (uid) {
    try {
      const sql = getSql();
      const likeQuery = `%${q}%`;

      // Search API Keys
      const keyMatches = await sql`
        SELECT key, status 
        FROM api_keys 
        WHERE uid = ${uid} AND (key ILIKE ${likeQuery} OR status ILIKE ${likeQuery})
        LIMIT 2
      `;

      keyMatches.forEach(k => {
        results.push({
          id: `k_${k.key}`,
          type: 'key',
          title: `API Key (${k.status})`,
          subtitle: k.key,
          url: '/api/key',
          icon: 'Key'
        });
      });

      // Search API Logs
      const logMatches = await sql`
        SELECT id, endpoint, status_code, response_time_ms 
        FROM api_logs 
        WHERE uid = ${uid} AND endpoint ILIKE ${likeQuery}
        ORDER BY created_at DESC
        LIMIT 3
      `;

      logMatches.forEach(log => {
        results.push({
          id: `l_${log.id}`,
          type: 'log',
          title: `Log: ${log.endpoint}`,
          subtitle: `Status: ${log.status_code} - Latency: ${log.response_time_ms}ms`,
          url: '/chatscan',
          icon: 'Activity'
        });
      });

    } catch (e) {
      console.error("Search DB Error:", e);
    }
  }

  return results;
}
