const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  try {
    const res = await sql`
      CREATE TABLE IF NOT EXISTS api_logs (
          id SERIAL PRIMARY KEY,
          uid VARCHAR(255) NOT NULL,
          endpoint VARCHAR(255) NOT NULL,
          status_code INTEGER NOT NULL,
          response_time_ms INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Created api_logs table:", res);
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

main();
