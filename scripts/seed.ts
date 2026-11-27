/**
 * BudayaKita Global — database seeder.
 *
 * Run with: npm run seed
 *
 * Requires a Supabase service-role key (see .env.example). The key bypasses
 * Row Level Security, so it must NEVER be exposed in browser code. The script
 * is idempotent: it updates existing rows matched by natural keys
 * (countries.iso_code, cultures.country_id + name, accessibility_meta.culture_id)
 * instead of creating duplicates.
 *
 * Note: media URLs are deterministic placeholders. Replace them with licensed
 * photographs of the real traditions and update the alt text to describe the
 * actual image before going to production.
 */

import { existsSync, readFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  AccessibilityMeta,
  Culture,
  CultureType,
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

interface SeedCulture {
  name: string;
  type: CultureType;
  detail_desc: string;
  imageSeed: string;
  /** Describes what a sighted user sees in the media. */
  alt_text: string;
  /** Spoken-word equivalent, with non-speech audio noted in brackets. */
  transcript: string;
  is_high_contrast_safe: boolean;
}

interface SeedCountry extends CountryInput {
  cultures: SeedCulture[];
}

const image = (seed: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`;

const SEED_COUNTRIES: SeedCountry[] = [
  {
    name: "Indonesia",
    iso_code: "ID",
    flag_url: "https://flagcdn.com/w320/id.png",
    description:
      "An archipelago of more than 17,000 islands where hundreds of ethnic groups, languages, and living traditions overlap.",
    cultures: [
      {
        name: "Tari Saman",
        type: "Dance",
        detail_desc:
          "A celebration dance of the Gayo people of Aceh. Dancers kneel shoulder to shoulder and move as one body through rapid claps, chest pats, and swaying — earning it the name 'dance of a thousand hands'.",
        imageSeed: "tari-saman-aceh",
        alt_text:
          "A row of Acehnese dancers in dark embroidered costumes kneeling shoulder to shoulder, raising their hands and clapping in unison.",
        transcript:
          "Tari Saman. Also known as the dance of a thousand hands, this performance comes from the Gayo people of Aceh. [rhythmic hand clapping] Nine or more dancers kneel in a tight row, moving as one body — clapping, patting their chests, and swaying from side to side. The song begins slowly, then builds to a crescendo of synchronized rhythm before ending abruptly. It is performed at celebrations and carries stories between generations.",
        is_high_contrast_safe: true,
      },
      {
        name: "Rendang",
        type: "Food",
        detail_desc:
          "A Minangkabau dish of beef slow-cooked in coconut milk and a spice paste of ginger, galangal, turmeric, and chili until the sauce caramelizes into a rich, dry coating.",
        imageSeed: "rendang-minang",
        alt_text:
          "A plate of dark, glossy beef rendang coated in a thick coconut and spice paste, served beside steamed rice and green vegetables.",
        transcript:
          "Rendang. This slow-cooked dish from West Sumatra starts with beef simmered in coconut milk, ginger, galangal, turmeric, and chilies. [soft bubbling] The pot is stirred for hours until the liquid evaporates and the sauce turns a deep brown. The result is tender meat that is rich, spicy, and slightly sweet. Rendang is a centerpiece of Minangkabau celebrations and is often made in large batches for family and guests.",
        is_high_contrast_safe: false,
      },
    ],
  },
  {
    name: "Japan",
    iso_code: "JP",
    flag_url: "https://flagcdn.com/w320/jp.png",
    description:
      "An island nation where centuries-old ritual sits beside meticulous modern craft, from flower arrangement to the precise geometry of sushi.",
    cultures: [
      {
        name: "Ikebana",
        type: "Art",
        detail_desc:
          "The Japanese art of flower arranging. Rather than filling a vase, ikebana uses line, asymmetry, and negative space to express the relationship between nature and humanity.",
        imageSeed: "ikebana-flower-arrangement",
        alt_text:
          "A tall curved branch and three white chrysanthemums arranged asymmetrically in a shallow black ceramic vase, with open space above the stems.",
        transcript:
          "Ikebana. The Japanese art of flower arranging, also called kado, or the way of flowers. [quiet water pouring] A single curved branch rises above three white chrysanthemums in a shallow black vase. The arranger treats the empty space as part of the composition, giving each stem a clear line and direction. Different schools follow different principles, but all value balance, seasonality, and restraint over abundance.",
        is_high_contrast_safe: true,
      },
      {
        name: "Edomae Sushi",
        type: "Food",
        detail_desc:
          "Tokyo Bay sushi refined over centuries. Vinegared rice is paired with seafood that is cured, simmered, or aged to concentrate its flavor, emphasizing seasonality and restraint.",
        imageSeed: "edomae-nigiri-sushi",
        alt_text:
          "A single piece of tuna nigiri sushi with a glossy red topping resting on a small mound of vinegared rice, served on a white ceramic plate.",
        transcript:
          "Edomae sushi. This style of sushi developed in old Edo, now Tokyo, when seafood from the bay was preserved with rice vinegar and salt. [knife tapping a wooden board] A chef shapes warm vinegared rice by hand, brushes on a little soy glaze, and lays over a slice of aged tuna. Each piece is meant to be eaten immediately, with the balance of rice and fish adjusted for the season.",
        is_high_contrast_safe: false,
      },
    ],
  },
  {
    name: "Brazil",
    iso_code: "BR",
    flag_url: "https://flagcdn.com/w320/br.png",
    description:
      "A country of immense regional variety, where Indigenous, African, and European influences meet in music, food, and movement.",
    cultures: [
      {
        name: "Samba",
        type: "Dance",
        detail_desc:
          "A rhythmic dance and music genre rooted in Afro-Brazilian communities. Samba is the sound of carnival: rolling percussion, call-and-response singing, and light, bouncing footwork.",
        imageSeed: "samba-carnival-dance",
        alt_text:
          "Carnival dancers in bright feathered costumes stepping in a circle while a drummer plays at the side of the street.",
        transcript:
          "Samba. Born in Afro-Brazilian communities in the early twentieth century, samba became the heartbeat of carnival. [percussion: surdo drum and tambourine] Dancers move with small bouncing steps, swaying their hips as the drummer accents the beat. In a samba school, the music, costumes, and choreography are prepared together for months. The call-and-response singing invites everyone in the street to join in.",
        is_high_contrast_safe: true,
      },
      {
        name: "Feijoada",
        type: "Food",
        detail_desc:
          "Brazil's national dish: black beans simmered slowly with salted pork and beef, traditionally served with white rice, collard greens, orange slices, and farofa.",
        imageSeed: "feijoada-brazilian-stew",
        alt_text:
          "A dark earthenware pot filled with black beans and pieces of pork, accompanied by white rice, orange slices, and collard greens.",
        transcript:
          "Feijoada. Often described as Brazil's national dish, feijoada is a stew of black beans cooked slowly with salted pork and beef. [gentle simmering] It is served with white rice, sautéed collard greens, toasted farofa, and orange slices, whose acidity cuts through the richness. The dish reflects a long history of blending Indigenous, African, and Portuguese cooking traditions, and is commonly shared at family gatherings.",
        is_high_contrast_safe: false,
      },
    ],
  },
];

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

  for (const country of SEED_COUNTRIES) {
    const { cultures, ...countryFields } = country;
    const countryId = await upsertCountry(client, countryFields);
    countryCount += 1;
    console.log(`Country: ${country.name}`);

    for (const culture of cultures) {
      const cultureId = await upsertCulture(client, {
        country_id: countryId,
        type: culture.type,
        name: culture.name,
        detail_desc: culture.detail_desc,
        media_url: image(culture.imageSeed),
        // Empty URLs let the UI fall back to speech synthesis and to its
        // accessible "not available" message for sign language.
        audio_narration_url: "",
        sign_language_gif_url: "",
      });
      cultureCount += 1;

      await upsertAccessibility(client, {
        culture_id: cultureId,
        alt_text: culture.alt_text,
        transcript: culture.transcript,
        is_high_contrast_safe: culture.is_high_contrast_safe,
      });
      accessibilityCount += 1;
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
