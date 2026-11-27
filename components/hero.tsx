import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

interface HeroProps {
  traditionCount: number;
  countryCount: number;
  heroImage: string;
  heroAlt: string;
}

/** Editorial opening spread: quiet type beside a single framed photograph. */
export function Hero({
  traditionCount,
  countryCount,
  heroImage,
  heroAlt,
}: HeroProps) {
  return (
    <section className="editorial-hero border-b border-border">
      <div className="container grid grid-cols-1 items-center gap-12 py-24 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="editorial-label">A living atlas of world cultures</p>

          <h1 className="mt-6 text-5xl font-light leading-[1.08] tracking-tight text-balance md:text-7xl">
            Discover the world&apos;s cultures,{" "}
            <span className="text-accent">for everyone.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Explore food, dance, art, and language from every corner of the
            globe — with alt text, transcripts, audio narration, and high
            contrast built in from the start.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm border-foreground bg-transparent px-8 text-xs font-medium uppercase tracking-widest text-foreground transition-all duration-500 ease-out hover:bg-foreground hover:text-background"
            >
              <Link href="/countries">
                Start exploring
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-sm text-xs font-medium uppercase tracking-widest text-muted-foreground underline decoration-border underline-offset-8 transition-all duration-500 ease-out hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Our accessibility promise
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-6">
            <div>
              <dt className="editorial-label">Countries</dt>
              <dd className="mt-2 text-2xl font-light tracking-tight">
                {countryCount}
              </dd>
            </div>
            <div>
              <dt className="editorial-label">Traditions</dt>
              <dd className="mt-2 text-2xl font-light tracking-tight">
                {traditionCount}
              </dd>
            </div>
            <div>
              <dt className="editorial-label">Standard</dt>
              <dd className="mt-2 text-2xl font-light tracking-tight">
                WCAG 2.1 AA
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <figure className="border border-border bg-card">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              ) : (
                <div
                  role="img"
                  aria-label={heroAlt}
                  className="flex h-full w-full items-center justify-center text-muted-foreground"
                >
                  <span className="editorial-label">Image unavailable</span>
                </div>
              )}
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3">
              <span className="editorial-label">Field notes · No. 01</span>
              <span className="text-xs text-muted-foreground">
                A tradition, documented
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
