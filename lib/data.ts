import { createClient as createServerClient } from "./supabase/server";
import {
  seedCountries,
  seedCulturesWithMeta,
} from "./seed";
import type { Country, CultureWithMeta } from "./types";

type RawRow = Record<string, unknown>;

const CULTURE_SELECT =
  "*, country:countries(*), accessibility:accessibility_meta(*)";

/** Normalize a Supabase join row into our `CultureWithMeta` shape. */
function mapCultureRow(row: RawRow): CultureWithMeta {
  const country = Array.isArray(row.country) ? row.country[0] : row.country;
  const access = Array.isArray(row.accessibility)
    ? row.accessibility[0]
    : row.accessibility;

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
          flag_url: String(country.flag_url ?? ""),
        }
      : null,
    accessibility: access
      ? {
          id: String(access.id),
          culture_id: String(access.culture_id),
          alt_text: String(access.alt_text ?? ""),
          transcript:
            access.transcript == null ? null : String(access.transcript),
          is_high_contrast_safe: Boolean(access.is_high_contrast_safe),
        }
      : null,
  };
}

/** Fetch every culture with its country and accessibility metadata. */
export async function getCultures(): Promise<CultureWithMeta[]> {
  const supabase = await createServerClient();
  if (!supabase) return seedCulturesWithMeta;

  const { data, error } = await supabase
    .from("cultures")
    .select(CULTURE_SELECT)
    .order("name", { ascending: true });

  if (error || !data) return seedCulturesWithMeta;
  return (data as RawRow[]).map(mapCultureRow);
}

/** Fetch a single culture by id, or `null` when not found. */
export async function getCultureById(
  id: string,
): Promise<CultureWithMeta | null> {
  const supabase = await createServerClient();
  if (!supabase) {
    return seedCulturesWithMeta.find((c) => c.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("cultures")
    .select(CULTURE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return seedCulturesWithMeta.find((c) => c.id === id) ?? null;
  }
  return mapCultureRow(data as RawRow);
}

/** Fetch every country. */
export async function getCountries(): Promise<Country[]> {
  const supabase = await createServerClient();
  if (!supabase) return seedCountries;

  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data) return seedCountries;
  return data as Country[];
}

/** Fetch a single country by id, or `null` when not found. */
export async function getCountryById(id: string): Promise<Country | null> {
  const supabase = await createServerClient();
  if (!supabase) return seedCountries.find((c) => c.id === id) ?? null;

  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return seedCountries.find((c) => c.id === id) ?? null;
  return data as Country;
}

/** Fetch every culture belonging to a country. */
export async function getCulturesByCountry(
  countryId: string,
): Promise<CultureWithMeta[]> {
  const fallback = () =>
    seedCulturesWithMeta.filter((c) => c.country_id === countryId);

  const supabase = await createServerClient();
  if (!supabase) return fallback();

  const { data, error } = await supabase
    .from("cultures")
    .select(CULTURE_SELECT)
    .eq("country_id", countryId)
    .order("name", { ascending: true });

  if (error || !data) return fallback();
  return (data as RawRow[]).map(mapCultureRow);
}