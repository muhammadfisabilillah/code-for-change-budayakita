/**
 * BudayaKita Global — Neon seeder.
 *
 * Run with: npm run seed
 *
 * Requires DATABASE_URL from Neon. The script is idempotent and mirrors
 * lib/seed.ts exactly: same countries, cultures, local image paths, alt text,
 * transcripts, and accessibility flags.
 */

import { existsSync, readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import {
  seedAccessibility,
  seedCountries,
  seedCultures,
} from "../lib/seed";

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    if (!key || key in process.env) continue;
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "Missing DATABASE_URL. Set it in .env.local (see .env.example).",
    );
    process.exit(1);
  }

  const sql = neon(url, { fullResults: false });
  let countryCount = 0;
  let cultureCount = 0;
  let accessibilityCount = 0;

  for (const country of seedCountries) {
    const countryRows = await sql`
      INSERT INTO countries (name, iso_code, flag_url, description)
      VALUES (
        ${country.name},
        ${country.iso_code},
        ${country.flag_url ?? null},
        ${country.description ?? null}
      )
      ON CONFLICT (iso_code) DO UPDATE SET
        name = EXCLUDED.name,
        flag_url = EXCLUDED.flag_url,
        description = EXCLUDED.description
      RETURNING id
    `;
    const countryId = String(countryRows[0].id);
    countryCount += 1;
    console.log(`Country: ${country.name}`);

    const cultures = seedCultures.filter(
      (culture) => culture.country_id === country.id,
    );

    for (const culture of cultures) {
      const cultureRows = await sql`
        INSERT INTO cultures (
          country_id,
          type,
          name,
          detail_desc,
          media_url,
          audio_narration_url,
          sign_language_gif_url
        )
        VALUES (
          ${countryId},
          ${culture.type},
          ${culture.name},
          ${culture.detail_desc ?? null},
          ${culture.media_url ?? null},
          ${culture.audio_narration_url ?? null},
          ${culture.sign_language_gif_url ?? null}
        )
        ON CONFLICT (country_id, name) DO UPDATE SET
          type = EXCLUDED.type,
          detail_desc = EXCLUDED.detail_desc,
          media_url = EXCLUDED.media_url,
          audio_narration_url = EXCLUDED.audio_narration_url,
          sign_language_gif_url = EXCLUDED.sign_language_gif_url
        RETURNING id
      `;
      const cultureId = String(cultureRows[0].id);
      cultureCount += 1;

      const accessibility = seedAccessibility.find(
        (item) => item.culture_id === culture.id,
      );

      if (accessibility) {
        await sql`
          INSERT INTO accessibility_meta (
            culture_id,
            alt_text,
            transcript,
            is_high_contrast_safe
          )
          VALUES (
            ${cultureId},
            ${accessibility.alt_text},
            ${accessibility.transcript ?? null},
            ${accessibility.is_high_contrast_safe}
          )
          ON CONFLICT (culture_id) DO UPDATE SET
            alt_text = EXCLUDED.alt_text,
            transcript = EXCLUDED.transcript,
            is_high_contrast_safe = EXCLUDED.is_high_contrast_safe
        `;
        accessibilityCount += 1;
      }

      console.log(`  - ${culture.name} (${culture.type})`);
    }
  }

  console.log(
    `\nSeed complete: ${countryCount} countries, ${cultureCount} cultures, ${accessibilityCount} accessibility records.`,
  );
}

main().catch((error: unknown) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
