/** Quick check that the app data layer reads from Neon, not the fallback. */
import { existsSync, readFileSync } from "node:fs";
import { getCountries, getCultures } from "../lib/data";

const path = ".env.local";
if (existsSync(path)) {
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^DATABASE_URL=(.+)$/);
    if (match && !process.env.DATABASE_URL) {
      process.env.DATABASE_URL = match[1].trim();
    }
  }
}

async function main() {
  const [countries, cultures] = await Promise.all([
    getCountries(),
    getCultures(),
  ]);

  console.log(`Countries from data layer: ${countries.length}`);
  console.log(`Cultures from data layer: ${cultures.length}`);
  console.log(`First country: ${countries[0]?.name ?? "(none)"}`);
  console.log(`First culture: ${cultures[0]?.name ?? "(none)"}`);
  console.log(
    `First culture has joined country: ${Boolean(cultures[0]?.country?.name)}`,
  );
  console.log(
    `First culture has accessibility: ${Boolean(cultures[0]?.accessibility)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
