export type CultureType = "Food" | "Dance" | "Art" | "Language";

export interface Country {
  id: string;
  name: string;
  iso_code: string;
  flag_url: string;
  description: string;
}

/** A country enriched with the number of documented traditions it has. */
export interface CountryWithCount extends Country {
  culture_count: number;
}

export interface Culture {
  id: string;
  country_id: string;
  type: CultureType;
  name: string;
  detail_desc: string;
  media_url: string;
  audio_narration_url: string;
  sign_language_gif_url: string;
}

export interface AccessibilityMeta {
  id: string;
  culture_id: string;
  alt_text: string;
  transcript: string | null;
  is_high_contrast_safe: boolean;
}

/** A culture joined with its country and accessibility metadata. */
export interface CultureWithMeta extends Culture {
  country: Pick<Country, "id" | "name" | "iso_code" | "flag_url"> | null;
  accessibility: AccessibilityMeta | null;
}