import { CultureExplorer } from "@/components/culture-explorer";
import { CountryGrid } from "@/components/country-grid";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionStatement } from "@/components/sections/MissionStatement";
import { FeaturedGrid } from "@/components/sections/FeaturedGrid";
import { getCountries, getCultures } from "@/lib/data";
import type { CountryWithCount } from "@/lib/types";

export default async function HomePage() {
  const [countries, cultures] = await Promise.all([
    getCountries(),
    getCultures(),
  ]);

  const countriesWithCounts: CountryWithCount[] = countries.map((country) => ({
    ...country,
    culture_count: cultures.filter((c) => c.country_id === country.id).length,
  }));

  return (
    <div className="page-shell min-h-screen bg-stone-50 dark:bg-stone-950">
      <HeroSection
        imageSrc="/images/hero/hero-secssion.jpg"
        imageAlt="A group of performers raising their hands in unison in front of a Balinese temple gate at dusk."
        photoCredit="Photo · BudayaKita Global archive"
        tone="dark"
      />

      <MissionStatement />
      <FeaturedGrid />

      <CountryGrid countries={countriesWithCounts} />

      <div className="border-t border-border">
        <CultureExplorer cultures={cultures} />
      </div>
    </div>
  );
}
