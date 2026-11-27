import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Globe2 } from "lucide-react";
import { MediaViewer } from "@/components/media-viewer";
import { CultureTypeBadge } from "@/components/culture-type";
import { getCultureById, getCultures } from "@/lib/data";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const culture = await getCultureById(params.id);
  if (!culture) return { title: "Culture not found" };
  const description =
    culture.accessibility?.alt_text || culture.detail_desc.slice(0, 150);
  return {
    title: culture.name,
    description,
  };
}

export default async function CultureDetailPage({ params }: PageProps) {
  const culture = await getCultureById(params.id);
  if (!culture) notFound();

  // Preload sibling cultures for the "related" strip.
  const all = await getCultures();
  const related = all.filter((c) => c.id !== culture.id).slice(0, 3);

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
              href="/cultures"
              className="rounded underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Cultures
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li className="text-foreground" aria-current="page">
            {culture.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main article */}
        <article className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <CultureTypeBadge type={culture.type} />
            {culture.country ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Globe2 className="size-4" aria-hidden="true" />
                {culture.country.name}
              </span>
            ) : null}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {culture.name}
          </h1>

          <p className="mt-4 text-lg leading-8 text-muted-foreground text-pretty">
            {culture.detail_desc}
          </p>

          <div className="mt-8">
            <MediaViewer culture={culture} />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <section
            aria-labelledby="about-country"
            className="rounded-lg border border-border bg-card p-5"
          >
            <h2 id="about-country" className="text-lg font-semibold">
              About {culture.country?.name ?? "this culture"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {culture.country
                ? "Discover more traditions from this country and beyond."
                : "This tradition is part of the BudayaKita Global collection."}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-medium">{culture.type}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">High contrast</dt>
                <dd className="font-medium">
                  {culture.accessibility?.is_high_contrast_safe
                    ? "Safe"
                    : "Standard"}
                </dd>
              </div>
            </dl>
          </section>

          {related.length > 0 && (
            <section
              aria-labelledby="related"
              className="mt-6 rounded-lg border border-border bg-card p-5"
            >
              <h2 id="related" className="text-lg font-semibold">
                Related traditions
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/cultures/${item.id}`}
                      className="flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">
                        {item.type}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}