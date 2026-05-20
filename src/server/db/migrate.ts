import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

const connection = neon(process.env.DATABASE_URL!);
const db = drizzle(connection);

// Strip comment lines, then split on semicolons.
// Neon HTTP does not support multi-statement strings — run each statement individually.
function splitStatements(raw: string): string[] {
  const stripped = raw
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  return stripped
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

async function migrate() {
  await db.execute(sql.raw(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `));

  const migrationsDir = path.join(process.cwd(), 'drizzle', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const exists = await connection`SELECT 1 FROM _migrations WHERE name = ${file}`;
    if (exists.length > 0) {
      console.log(`  skip  ${file}`);
      continue;
    }

    const raw = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    const statements = splitStatements(raw);
    console.log(`  run   ${file} (${statements.length} statement${statements.length !== 1 ? 's' : ''})`);

    for (const stmt of statements) {
      try {
        await db.execute(sql.raw(stmt));
      } catch (err: unknown) {
        // PostgreSQL codes for "already exists" — safe to skip in idempotent migrations
        const IDEMPOTENT_CODES = new Set(['42710', '42701', '42P07', '23505']);
        const code = (err as { cause?: { code?: string } })?.cause?.code;
        if (code && IDEMPOTENT_CODES.has(code)) {
          console.log(`    skip (already exists): ${stmt.substring(0, 60).replace(/\s+/g, ' ')}...`);
        } else {
          throw err;
        }
      }
    }

    await connection`INSERT INTO _migrations (name) VALUES (${file})`;
    console.log(`  done  ${file}`);
  }

  console.log('\nAll migrations applied.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
