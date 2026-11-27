import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Globe2 } from "lucide-react";
import { CultureCard } from "@/components/culture-card";
import { CultureTypeBadge } from "@/components/culture-type";
import { getCountryById, getCulturesByCountry } from "@/lib/data";
import type { CultureType } from "@/lib/types";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const country = await getCountryById(params.id);
  if (!country) return { title: "Country not found" };
  return {
    title: country.name,
    description: country.description,
  };
}

export default async function CountryDetailPage({ params }: PageProps) {
  const country = await getCountryById(params.id);
  if (!country) notFound();

  const cultures = await getCulturesByCountry(country.id);
  const types = Array.from(new Set(cultures.map((c) => c.type))) as CultureType[];

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link
              href="/"
              className="rounded underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li>
            <Link
              href="/countries"
              className="rounded underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Countries
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li className="text-foreground" aria-current="page">
            {country.name}
          </li>
        </ol>
      </nav>

      <Link
        href="/countries"
        className="inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        All countries
      </Link>

      {/* Country hero */}
      <section
        aria-labelledby="country-heading"
        className="mt-4 grid grid-cols-1 gap-6 rounded-lg border border-border bg-card p-6 sm:grid-cols-[180px_1fr] sm:p-8"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted sm:aspect-square sm:max-w-[180px]">
          {country.flag_url ? (
            <Image
              src={country.flag_url}
              alt={`Flag of ${country.name}`}
              fill
              priority
              sizes="180px"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`Flag of ${country.name}`}
              className="flex h-full w-full items-center justify-center text-muted-foreground"
            >
              <Globe2 className="size-12" aria-hidden="true" />
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-bold tracking-wider">
            {country.iso_code}
          </span>
          <h1
            id="country-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
          >
            {country.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-pretty">
            {country.description}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Traditions</dt>
              <dd className="font-semibold">{cultures.length}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Categories</dt>
              <dd className="font-semibold">{types.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Cultural items */}
      <section aria-labelledby="country-cultures-heading" className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="country-cultures-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Cultural traditions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {cultures.length}{" "}
              {cultures.length === 1 ? "tradition" : "traditions"} documented
              from {country.name}
            </p>
          </div>
          {types.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Categories present">
              {types.map((type) => (
                <li key={type}>
                  <CultureTypeBadge type={type} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {cultures.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cultures.map((culture) => (
              <li key={culture.id} className="h-full">
                <CultureCard culture={culture} />
              </li>
            ))}
          </ul>
        ) : (
          <p
            role="status"
            className="mt-6 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground"
          >
            No traditions have been documented for {country.name} yet.
          </p>
        )}
      </section>
    </div>
  );
}
