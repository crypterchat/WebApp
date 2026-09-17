const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  try {
    const res1 = await sql`ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS secret_key VARCHAR(255);`;
    console.log("Added secret_key column:", res1);
  } catch (err) {
    console.error("Error altering table:", err);
  }
}

main();
