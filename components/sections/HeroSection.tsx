import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type HeroTone = "dark" | "light";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  photoCredit?: string;
  /** Brightness of the photo: "dark" uses white text, "light" uses charcoal. */
  tone?: HeroTone;
  label?: string;
  heading?: React.ReactNode;
  subheading?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

const DEFAULT_IMAGE = "/images/hero/hero-secssion.jpg";
const DEFAULT_ALT =
  "A group of performers raising their hands in unison in front of a Balinese temple gate at dusk.";

/** Full-bleed editorial opening spread with an accessibility-first overlay. */
export function HeroSection({
  imageSrc = DEFAULT_IMAGE,
  imageAlt = DEFAULT_ALT,
  photoCredit = "Photo · BudayaKita Global archive",
  tone = "dark",
  label = "Explore world heritage",
  heading = (
    <>
      Discover the world&apos;s cultures,{" "}
      <span className="opacity-75">for everyone.</span>
    </>
  ),
  subheading =
    "Explore food, dance, art, and language from every corner of the globe — with alt text, transcripts, audio narration, and high contrast built in from the start.",
  ctaHref = "/countries",
  ctaLabel = "Start exploring",
}: HeroSectionProps) {
  const isDark = tone === "dark";

  return (
    <section className="editorial-hero hero-section relative isolate flex items-center overflow-hidden bg-stone-900">
      {/* Background image, edge-to-edge */}
      <div aria-hidden="true" className="hero-media absolute inset-0 -z-30">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Readability layer. Dark is the safe default; light is opt-in. */}
      <div
        aria-hidden="true"
        className={cn(
          "hero-overlay absolute inset-0 -z-20",
          isDark
            ? "bg-gradient-to-b from-stone-900/10 via-stone-900/20 to-stone-900/50"
            : "bg-white/40",
        )}
      />
      {isDark && (
        <div
          aria-hidden="true"
          className="hero-overlay absolute inset-0 -z-10 bg-gradient-to-r from-stone-900/45 via-stone-900/15 to-transparent"
        />
      )}

      <div className="container relative z-10 py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <p
            className={cn(
              "text-xs font-medium uppercase tracking-widest",
              isDark ? "text-white/80" : "text-stone-600",
            )}
          >
            {label}
          </p>

          <h1
            className={cn(
              "mt-6 max-w-4xl text-5xl font-light leading-[1.06] tracking-tight text-balance md:text-7xl",
              isDark ? "text-white" : "text-stone-900",
            )}
          >
            {heading}
          </h1>

          <p
            className={cn(
              "mt-6 max-w-xl text-lg leading-relaxed md:text-xl",
              isDark ? "text-white/90" : "text-stone-700",
            )}
          >
            {subheading}
          </p>

          <Button
            asChild
            variant="outline"
            className={cn(
              "hero-focus hero-cta mt-10 h-12 rounded-sm bg-transparent px-8 text-xs font-medium uppercase tracking-widest transition-all duration-500 ease-out",
              isDark
                ? "border-white/80 text-white hover:bg-white hover:text-stone-900 dark:border-stone-300 dark:text-stone-300 dark:hover:bg-stone-300 dark:hover:text-stone-900"
                : "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white",
            )}
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>

      {/* Subtle attribution, kept out of the reading path */}
      <p
        className={cn(
          "absolute bottom-6 right-6 z-10 hidden text-[11px] font-medium uppercase tracking-widest sm:block",
          isDark ? "text-white/70" : "text-stone-700",
        )}
      >
        {photoCredit}
      </p>

      <a
        href="#countries"
        className={cn(
          "hero-focus absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-sm px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors duration-500 ease-out",
          isDark
            ? "text-white/85 hover:text-white"
            : "text-stone-700 hover:text-stone-900",
        )}
      >
        Scroll to explore
        <ArrowDown className="scroll-indicator size-4" aria-hidden="true" />
      </a>
    </section>
  );
}
