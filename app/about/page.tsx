import type { Metadata } from "next";
import {
  Accessibility,
  Contrast,
  Keyboard,
  Captions,
  Hand,
  Search,
  Moon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How BudayaKita Global meets WCAG 2.1 AA: keyboard navigation, high contrast, transcripts, and reduced motion.",
};

const FEATURES = [
  {
    icon: Keyboard,
    title: "Full keyboard support",
    body: "Every interactive element is reachable and operable by keyboard, with a highly visible focus ring on each control.",
  },
  {
    icon: Contrast,
    title: "High contrast mode",
    body: "Toggle the Black / White / Soft-blue palette from the navbar. Your preference is saved for next time.",
  },
  {
    icon: Captions,
    title: "Transcripts & captions",
    body: "Audio and visual media include a toggleable transcript that serves as a full text alternative.",
  },
  {
    icon: Accessibility,
    title: "Reduced motion",
    body: "Animations automatically respect your system's prefers-reduced-motion setting.",
  },
  {
    icon: Search,
    title: "Global search",
    body: "Find any country or cultural tradition from the navbar — mouse or keyboard, with Ctrl/⌘+K as a shortcut.",
  },
  {
    icon: Moon,
    title: "Night gallery",
    body: "A muted stone-950 dark theme keeps the editorial calm after sunset, with amber accents instead of harsh neon.",
  },
  {
    icon: Hand,
    title: "Sign language",
    body: "Entries include a sign language interpretation when available, with an equivalent text alternative always provided.",
  },
];

export default function AboutPage() {
  return (
    <div className="container py-12">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Built for everyone
        </h1>
        <p className="mt-3 text-lg text-muted-foreground text-pretty">
          BudayaKita Global is designed to meet WCAG 2.1 AA so that people
          with visual, auditory, and motor impairments can explore world
          cultures with the same richness as anyone else.
        </p>
      </header>

      <section
        aria-label="Accessibility features"
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10 rounded-lg border border-border bg-muted/40 p-6">
        <h2 className="text-lg font-semibold">Our commitment</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We use semantic HTML landmarks, Radix UI primitives for robust
          accessibility, and continuous review against the WCAG 2.1 AA
          checklist. If you encounter a barrier, we want to hear about it.
        </p>
      </section>
    </div>
  );
}