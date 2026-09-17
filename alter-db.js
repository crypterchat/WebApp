const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  try {
    const res1 = await sql`ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS allowed_ips TEXT[] DEFAULT '{}';`;
    console.log("Added allowed_ips column:", res1);
    const res2 = await sql`ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS access_scopes TEXT[] DEFAULT '{"read_users"}';`;
    console.log("Added access_scopes column:", res2);
  } catch (err) {
    console.error("Error altering table:", err);
  }
}

main();
