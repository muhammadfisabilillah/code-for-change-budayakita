import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CountryGrid } from "@/components/country-grid";
import { getCountries, getCultures } from "@/lib/data";
import type { CountryWithCount } from "@/lib/types";

export const metadata: Metadata = {
  title: "Countries",
  description:
    "Browse countries in the BudayaKita Global atlas and discover the cultural traditions documented from each one.",
};

export default async function CountriesPage() {
  const [countries, cultures] = await Promise.all([
    getCountries(),
    getCultures(),
  ]);

  const countriesWithCounts: CountryWithCount[] = countries.map((country) => ({
    ...country,
    culture_count: cultures.filter((c) => c.country_id === country.id).length,
  }));

  return (
    <>
      <section className="border-b border-border">
        <div className="container py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Countries
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-pretty">
            Every place has a story. Pick a country to see its food, dance,
            art, and language — each documented with accessibility support.
          </p>
        </div>
      </section>

      <CountryGrid
        countries={countriesWithCounts}
        id="all-countries"
        title="All countries"
        description="Select a flag to explore the traditions documented from that country."
      />
    </>
  );
}
