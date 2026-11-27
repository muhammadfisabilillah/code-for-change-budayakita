import type {
  AccessibilityMeta,
  Country,
  Culture,
  CultureWithMeta,
} from "./types";

/**
 * Bundled seed data.
 *
 * Used as a graceful fallback when Supabase is not configured (local dev,
 * CI, static previews). When Supabase env vars are present, `lib/data.ts`
 * reads live rows instead. Image URLs use deterministic picsum seeds so the
 * UI is populated even offline.
 */

const img = (seed: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`;

export const seedCountries: Country[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    name: "Indonesia",
    iso_code: "ID",
    flag_url: "https://flagcdn.com/w320/id.png",
    description:
      "An archipelago of over 17,000 islands, Indonesia is a mosaic of hundreds of ethnic groups, languages, and living traditions.",
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    name: "Japan",
    iso_code: "JP",
    flag_url: "https://flagcdn.com/w320/jp.png",
    description:
      "Where ancient ritual meets cutting-edge design, Japan balances deep respect for tradition with constant reinvention.",
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    name: "Mexico",
    iso_code: "MX",
    flag_url: "https://flagcdn.com/w320/mx.png",
    description:
      "A vibrant fusion of Indigenous and Spanish heritage, Mexico is celebrated for its color, music, and culinary depth.",
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    name: "Italy",
    iso_code: "IT",
    flag_url: "https://flagcdn.com/w320/it.png",
    description:
      "The cradle of the Renaissance, Italy's culture is written across its art, architecture, music, and regional tables.",
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    name: "India",
    iso_code: "IN",
    flag_url: "https://flagcdn.com/w320/in.png",
    description:
      "A subcontinent of extraordinary diversity, India is home to thousands of years of philosophy, dance, and cuisine.",
  },
  {
    id: "10000000-0000-4000-8000-000000000006",
    name: "Nigeria",
    iso_code: "NG",
    flag_url: "https://flagcdn.com/w320/ng.png",
    description:
      "Africa's most populous nation, Nigeria's culture pulses through Nollywood, Afrobeats, textiles, and 500+ languages.",
  },
];

export const seedCultures: Culture[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    country_id: "10000000-0000-4000-8000-000000000001",
    type: "Dance",
    name: "Tari Saman",
    detail_desc:
      "The 'Dance of a Thousand Hands' from Aceh. Performers kneel in a tight row, moving in flawless unison with rapid claps, chest pats, and body sways — a mesmerizing display of communal discipline.",
    media_url: img("tari-saman"),
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    country_id: "10000000-0000-4000-8000-000000000001",
    type: "Food",
    name: "Rendang",
    detail_desc:
      "A slow-cooked Minangkabau masterpiece of beef simmered for hours in coconut milk and a complex spice paste until the sauce caramelizes into a rich, dry coating.",
    media_url: "/images/cultures/rendang.jpg",
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000003",
    country_id: "10000000-0000-4000-8000-000000000002",
    type: "Art",
    name: "Ikebana",
    detail_desc:
      "The Japanese art of flower arranging, emphasizing line, balance, and negative space. Each stem, leaf, and bloom is placed to express harmony between nature and humanity.",
    media_url: "/images/cultures/ikebana.jpg",
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000004",
    country_id: "10000000-0000-4000-8000-000000000002",
    type: "Food",
    name: "Edomae Sushi",
    detail_desc:
      "Tokyo Bay sushi refined over centuries, where vinegared rice is paired with seafood cured or simmered to concentrate flavor — a study in seasonality and restraint.",
    media_url: img("edomae-sushi"),
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000005",
    country_id: "10000000-0000-4000-8000-000000000003",
    type: "Dance",
    name: "Jarabe Tapatío",
    detail_desc:
      "Mexico's national dance, often called the 'Mexican Hat Dance.' Couples circle with precise footwork around a sombrero in a courtship story told through movement.",
    media_url: "/images/cultures/jarabe-tapatios.jpg",
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000006",
    country_id: "10000000-0000-4000-8000-000000000003",
    type: "Food",
    name: "Mole Poblano",
    detail_desc:
      "A legendary Puebla sauce blending chilies, spices, nuts, seeds, and a touch of chocolate into a complex, layered dish that can contain over 20 ingredients.",
    media_url: img("mole-poblano"),
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000007",
    country_id: "10000000-0000-4000-8000-000000000004",
    type: "Art",
    name: "Opera Buffa",
    detail_desc:
      "Italian comic opera that flourished in the 18th century, using everyday characters, rapid patter, and ensemble finales to turn ordinary life into musical comedy.",
    media_url: img("opera-buffa"),
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000008",
    country_id: "10000000-0000-4000-8000-000000000005",
    type: "Dance",
    name: "Bharatanatyam",
    detail_desc:
      "One of India's oldest classical dance forms from Tamil Nadu, combining intricate footwork, expressive hand gestures (mudras), and facial storytelling (abhinaya).",
    media_url: "/images/cultures/bharatanatyam.jpg",
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000009",
    country_id: "10000000-0000-4000-8000-000000000006",
    type: "Art",
    name: "Adire Textile",
    detail_desc:
      "Yoruba resist-dyeing from Nigeria, where cloth is tied, stitched, or painted with cassava paste before indigo dyeing to reveal intricate blue-and-white patterns.",
    media_url: "/images/cultures/adire-textile.jpg",
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
  {
    id: "20000000-0000-4000-8000-000000000010",
    country_id: "10000000-0000-4000-8000-000000000006",
    type: "Language",
    name: "Yoruba",
    detail_desc:
      "A tonal language spoken by over 40 million people. Pitch changes meaning entirely, and its rich oral literature carries proverbs, poetry, and history across generations.",
    media_url: "/images/cultures/yoruba.jpg",
    audio_narration_url: "",
    sign_language_gif_url: "",
  },
];

/** Alt text written for specific bundled photographs. */
const CUSTOM_ALT_TEXT: Record<string, string> = {
  "20000000-0000-4000-8000-000000000008":
    "A Bharatanatyam dancer in a vivid red costume performing a raised-hand gesture and lifted-leg pose under warm stage lighting against a dark temple backdrop.",
  "20000000-0000-4000-8000-000000000009":
    "A woman wearing a warm orange and cream patterned Adire textile with a sheer white lace headwrap, smiling outdoors in soft daylight.",
  "20000000-0000-4000-8000-000000000010":
    "A group of people in teal striped traditional Yoruba attire with matching fila caps and coral bead necklaces gathered at an outdoor celebration.",
  "20000000-0000-4000-8000-000000000002":
    "A close-up of dark, caramelized beef rendang coated in a rich spice paste on a white ceramic plate.",
  "20000000-0000-4000-8000-000000000003":
    "A minimalist ikebana arrangement of slender branches in a tall glass vase, casting delicate shadows on a warm wall beneath a framed calligraphy panel.",
  "20000000-0000-4000-8000-000000000005":
    "A Mexican rider in an embroidered navy dress and wide-brimmed sombrero sitting atop a tan horse against a soft blue sky.",
};

export const seedAccessibility: AccessibilityMeta[] = seedCultures.map(
  (culture, index) => ({
    id: `30000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    culture_id: culture.id,
    alt_text:
      CUSTOM_ALT_TEXT[culture.id] ??
      `${culture.name} — a cultural ${culture.type.toLowerCase()} tradition.`,
    transcript:
      index % 3 === 0
        ? `${culture.name}. ${culture.detail_desc} This description is provided as a text alternative for the accompanying media.`
        : null,
    is_high_contrast_safe: index % 2 === 0,
  }),
);

/** Fully-joined fallback used by the data layer. */
export const seedCulturesWithMeta: CultureWithMeta[] = seedCultures.map(
  (culture) => {
    const country =
      seedCountries.find((c) => c.id === culture.country_id) ?? null;
    const accessibility =
      seedAccessibility.find((a) => a.culture_id === culture.id) ?? null;

    return {
      ...culture,
      country: country
        ? {
            id: country.id,
            name: country.name,
            iso_code: country.iso_code,
            flag_url: country.flag_url,
          }
        : null,
      accessibility,
    };
  },
);