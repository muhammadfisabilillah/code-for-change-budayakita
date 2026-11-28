/**
 * BudayaKita Global — database seeder.
 *
 * Run with: npm run seed
 *
 * Requires a Supabase service-role key (see .env.example). The key bypasses
 * Row Level Security, so it must NEVER be exposed in browser code.
 *
 * The dataset is imported from lib/seed.ts so the live database matches the
 * bundled fallback exactly — same countries, cultures, local image paths,
 * alt text, transcripts, and accessibility flags.
 *
 * Idempotent: rows are matched by natural keys (countries.iso_code,
 * cultures.country_id + name, accessibility_meta.culture_id) and updated
 * instead of duplicated.
 */

import { existsSync, readFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  seedAccessibility,
  seedCountries,
  seedCultures,
} from "../lib/seed";
import type {
  AccessibilityMeta,
  Culture,
  Country,
} from "../lib/types";

/** Minimal .env loader so the script works without extra dependencies. */
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

type CountryInput = Pick<
  Country,
  "name" | "iso_code" | "flag_url" | "description"
>;

type CultureInput = Pick<
  Culture,
  | "country_id"
  | "type"
  | "name"
  | "detail_desc"
  | "media_url"
  | "audio_narration_url"
  | "sign_language_gif_url"
>;

type AccessibilityInput = Pick<
  AccessibilityMeta,
  "culture_id" | "alt_text" | "transcript" | "is_high_contrast_safe"
>;

async function upsertCountry(
  client: SupabaseClient,
  input: CountryInput,
): Promise<string> {
  const { data: existing, error: lookupError } = await client
    .from("countries")
    .select("id")
    .eq("iso_code", input.iso_code)
    .maybeSingle();
  if (lookupError) throw lookupError;

  if (existing) {
    const { error } = await client
      .from("countries")
      .update(input)
      .eq("id", existing.id);
    if (error) throw error;
    return String(existing.id);
  }

  const { data, error } = await client
    .from("countries")
    .insert(input)
    .select("id")
    .single();
  if (error) throw error;
  if (!data) throw new Error(`Could not insert country ${input.name}`);
  return String(data.id);
}

async function upsertCulture(
  client: SupabaseClient,
  input: CultureInput,
): Promise<string> {
  const { data: existing, error: lookupError } = await client
    .from("cultures")
    .select("id")
    .eq("country_id", input.country_id)
    .eq("name", input.name)
    .maybeSingle();
  if (lookupError) throw lookupError;

  if (existing) {
    const { error } = await client
      .from("cultures")
      .update(input)
      .eq("id", existing.id);
    if (error) throw error;
    return String(existing.id);
  }

  const { data, error } = await client
    .from("cultures")
    .insert(input)
    .select("id")
    .single();
  if (error) throw error;
  if (!data) throw new Error(`Could not insert culture ${input.name}`);
  return String(data.id);
}

async function upsertAccessibility(
  client: SupabaseClient,
  input: AccessibilityInput,
): Promise<void> {
  const { data: existing, error: lookupError } = await client
    .from("accessibility_meta")
    .select("id")
    .eq("culture_id", input.culture_id)
    .maybeSingle();
  if (lookupError) throw lookupError;

  if (existing) {
    const { error } = await client
      .from("accessibility_meta")
      .update(input)
      .eq("id", existing.id);
    if (error) throw error;
    return;
  }

  const { error } = await client.from("accessibility_meta").insert(input);
  if (error) throw error;
}

async function main() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error(
      "Missing credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (see .env.example).",
    );
    process.exit(1);
  }

  const client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let countryCount = 0;
  let cultureCount = 0;
  let accessibilityCount = 0;
  const countryIdsByIso = new Map<string, string>();

  for (const country of seedCountries) {
    const countryId = await upsertCountry(client, {
      name: country.name,
      iso_code: country.iso_code,
      flag_url: country.flag_url,
      description: country.description,
    });
    countryIdsByIso.set(country.iso_code, countryId);
    countryCount += 1;
    console.log(`Country: ${country.name}`);

    const cultures = seedCultures.filter(
      (culture) => culture.country_id === country.id,
    );

    for (const culture of cultures) {
      const cultureId = await upsertCulture(client, {
        country_id: countryId,
        type: culture.type,
        name: culture.name,
        detail_desc: culture.detail_desc,
        media_url: culture.media_url,
        audio_narration_url: culture.audio_narration_url,
        sign_language_gif_url: culture.sign_language_gif_url,
      });
      cultureCount += 1;

      const accessibility = seedAccessibility.find(
        (item) => item.culture_id === culture.id,
      );
      if (accessibility) {
        await upsertAccessibility(client, {
          culture_id: cultureId,
          alt_text: accessibility.alt_text,
          transcript: accessibility.transcript,
          is_high_contrast_safe: accessibility.is_high_contrast_safe,
        });
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
