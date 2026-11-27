import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import type { CountryWithCount } from "@/lib/types";

interface CountryGridProps {
  countries: CountryWithCount[];
  id?: string;
  title?: string;
  description?: string;
}

/** Responsive grid of countries, each linking to its detail page. */
export function CountryGrid({
  countries,
  id = "countries",
  title = "Explore by country",
  description = "Start with a place, then discover the traditions that make it unique.",
}: CountryGridProps) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id} className="container py-12">
      <div className="flex flex-col gap-2">
        <h2
          id={`${id}-heading`}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground text-pretty">
          {description}
        </p>
      </div>

      {countries.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => {
            const count = country.culture_count;
            const href = `/countries/${country.id}`;
            return (
              <li key={country.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-muted">
                    {country.flag_url ? (
                      <Image
                        src={country.flag_url}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center text-muted-foreground"
                      >
                        <Globe2 className="size-12" />
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-md border border-border bg-background/90 px-2 py-1 text-xs font-bold tracking-wider text-foreground">
                      {country.iso_code}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold leading-tight tracking-tight">
                      <Link
                        href={href}
                        className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        {country.name}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {country.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
                      <span className="text-sm text-muted-foreground">
                        {count} {count === 1 ? "tradition" : "traditions"}
                      </span>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Explore
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p
          role="status"
          className="mt-8 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground"
        >
          No countries available yet.
        </p>
      )}
    </section>
  );
}
