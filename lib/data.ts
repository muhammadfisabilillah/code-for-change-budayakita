import { getSql } from "./db";
import { seedCountries, seedCulturesWithMeta } from "./seed";
import type { Country, CultureWithMeta } from "./types";

type Row = Record<string, unknown>;

/** Decode a jsonb column that may arrive as an object or a JSON string. */
function asObject(value: unknown): Row | null {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Row;
    } catch {
      return null;
    }
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Row;
  }
  return null;
}

function mapCountryRow(row: Row): Country {
  return {
    id: String(row.id),
    name: String(row.name),
    iso_code: String(row.iso_code),
    flag_url: row.flag_url == null ? "" : String(row.flag_url),
    description: row.description == null ? "" : String(row.description),
  };
}

function mapCultureRow(row: Row): CultureWithMeta {
  const country = asObject(row.country);
  const accessibility = asObject(row.accessibility);

  return {
    id: String(row.id),
    country_id: String(row.country_id),
    type: row.type as CultureWithMeta["type"],
    name: String(row.name),
    detail_desc: String(row.detail_desc ?? ""),
    media_url: String(row.media_url ?? ""),
    audio_narration_url: String(row.audio_narration_url ?? ""),
    sign_language_gif_url: String(row.sign_language_gif_url ?? ""),
    country: country
      ? {
          id: String(country.id),
          name: String(country.name),
          iso_code: String(country.iso_code),
          flag_url: country.flag_url == null ? "" : String(country.flag_url),
        }
      : null,
    accessibility: accessibility
      ? {
          id: String(accessibility.id),
          culture_id: String(accessibility.culture_id),
          alt_text: String(accessibility.alt_text ?? ""),
          transcript:
            accessibility.transcript == null
              ? null
              : String(accessibility.transcript),
          is_high_contrast_safe: Boolean(accessibility.is_high_contrast_safe),
        }
      : null,
  };
}

async function withFallback<T>(query: () => Promise<T>, fallback: T) {
  const sql = getSql();
  if (!sql) return fallback;
  try {
    return await query();
  } catch (error) {
    console.error("Neon query failed, using bundled seed data:", error);
    return fallback;
  }
}

/** Fetch every culture with its country and accessibility metadata. */
export async function getCultures(): Promise<CultureWithMeta[]> {
  return withFallback(async () => {
    const sql = getSql()!;
    const rows = await sql`
      SELECT
        c.id, c.country_id, c.type, c.name, c.detail_desc,
        c.media_url, c.audio_narration_url, c.sign_language_gif_url,
        CASE WHEN co.id IS NULL THEN NULL ELSE jsonb_build_object(
          'id', co.id, 'name', co.name, 'iso_code', co.iso_code,
          'flag_url', co.flag_url
        ) END AS country,
        CASE WHEN a.id IS NULL THEN NULL ELSE jsonb_build_object(
          'id', a.id, 'culture_id', a.culture_id, 'alt_text', a.alt_text,
          'transcript', a.transcript, 'is_high_contrast_safe', a.is_high_contrast_safe
        ) END AS accessibility
      FROM cultures c
      LEFT JOIN countries co ON co.id = c.country_id
      LEFT JOIN accessibility_meta a ON a.culture_id = c.id
      ORDER BY c.name ASC
    `;
    return rows.map((row) => mapCultureRow(row as Row));
  }, seedCulturesWithMeta);
}

/** Fetch a single culture by id, or `null` when not found. */
export async function getCultureById(
  id: string,
): Promise<CultureWithMeta | null> {
  const fallback = () => seedCulturesWithMeta.find((c) => c.id === id) ?? null;
  return withFallback(async () => {
    const sql = getSql()!;
    const rows = await sql`
      SELECT
        c.id, c.country_id, c.type, c.name, c.detail_desc,
        c.media_url, c.audio_narration_url, c.sign_language_gif_url,
        CASE WHEN co.id IS NULL THEN NULL ELSE jsonb_build_object(
          'id', co.id, 'name', co.name, 'iso_code', co.iso_code,
          'flag_url', co.flag_url
        ) END AS country,
        CASE WHEN a.id IS NULL THEN NULL ELSE jsonb_build_object(
          'id', a.id, 'culture_id', a.culture_id, 'alt_text', a.alt_text,
          'transcript', a.transcript, 'is_high_contrast_safe', a.is_high_contrast_safe
        ) END AS accessibility
      FROM cultures c
      LEFT JOIN countries co ON co.id = c.country_id
      LEFT JOIN accessibility_meta a ON a.culture_id = c.id
      WHERE c.id = ${id}
      LIMIT 1
    `;
    return rows.length > 0 ? mapCultureRow(rows[0] as Row) : fallback();
  }, fallback());
}

/** Fetch every country. */
export async function getCountries(): Promise<Country[]> {
  return withFallback(async () => {
    const sql = getSql()!;
    const rows = await sql`
      SELECT id, name, iso_code, flag_url, description
      FROM countries
      ORDER BY name ASC
    `;
    return rows.map((row) => mapCountryRow(row as Row));
  }, seedCountries);
}

/** Fetch a single country by id, or `null` when not found. */
export async function getCountryById(id: string): Promise<Country | null> {
  const fallback = () => seedCountries.find((c) => c.id === id) ?? null;
  return withFallback(async () => {
    const sql = getSql()!;
    const rows = await sql`
      SELECT id, name, iso_code, flag_url, description
      FROM countries
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows.length > 0 ? mapCountryRow(rows[0] as Row) : fallback();
  }, fallback());
}

/** Fetch every culture belonging to a country. */
export async function getCulturesByCountry(
  countryId: string,
): Promise<CultureWithMeta[]> {
  const fallback = () =>
    seedCulturesWithMeta.filter((c) => c.country_id === countryId);
  return withFallback(async () => {
    const sql = getSql()!;
    const rows = await sql`
      SELECT
        c.id, c.country_id, c.type, c.name, c.detail_desc,
        c.media_url, c.audio_narration_url, c.sign_language_gif_url,
        CASE WHEN co.id IS NULL THEN NULL ELSE jsonb_build_object(
          'id', co.id, 'name', co.name, 'iso_code', co.iso_code,
          'flag_url', co.flag_url
        ) END AS country,
        CASE WHEN a.id IS NULL THEN NULL ELSE jsonb_build_object(
          'id', a.id, 'culture_id', a.culture_id, 'alt_text', a.alt_text,
          'transcript', a.transcript, 'is_high_contrast_safe', a.is_high_contrast_safe
        ) END AS accessibility
      FROM cultures c
      LEFT JOIN countries co ON co.id = c.country_id
      LEFT JOIN accessibility_meta a ON a.culture_id = c.id
      WHERE c.country_id = ${countryId}
      ORDER BY c.name ASC
    `;
    return rows.map((row) => mapCultureRow(row as Row));
  }, fallback());
}
