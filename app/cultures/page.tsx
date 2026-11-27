import type { Metadata } from "next";
import { CultureExplorer } from "@/components/culture-explorer";
import { getCultures } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Cultures",
  description:
    "Browse every documented tradition — food, dance, art, and language — with full accessibility support.",
};

export default async function CulturesPage() {
  const cultures = await getCultures();

  return (
    <>
      <section className="border-b border-border">
        <div className="container py-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            All cultures
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-pretty">
            Filter by tradition type or search across countries. Every entry
            includes alt text, a transcript, and narration options.
          </p>
        </div>
      </section>
      <CultureExplorer cultures={cultures} />
    </>
  );
}