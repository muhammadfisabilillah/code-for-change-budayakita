import { neon } from "@neondatabase/serverless";

function createNeon(url: string) {
  // fullResults:false makes tagged templates resolve directly to row arrays.
  return neon(url, { fullResults: false });
}

type Sql = ReturnType<typeof createNeon>;

let cachedSql: Sql | null = null;
let cachedUrl: string | null = null;

/**
 * Server-only Neon SQL client.
 *
 * Returns `null` when DATABASE_URL is missing so the app can fall back to the
 * bundled seed data — same behaviour as the previous Supabase adapter.
 */
export function getSql(): Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (!cachedSql || cachedUrl !== url) {
    cachedSql = createNeon(url);
    cachedUrl = url;
  }

  return cachedSql;
}
