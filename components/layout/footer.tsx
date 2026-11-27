import Link from "next/link";
import { Globe2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/40">
      <div className="container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe2 className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">BudayaKita Global</p>
            <p className="text-sm text-muted-foreground">
              Documenting world cultures, accessibly.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/"
            className="rounded text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Home
          </Link>
          <Link
            href="/cultures"
            className="rounded text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Cultures
          </Link>
          <Link
            href="/about"
            className="rounded text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Accessibility
          </Link>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container flex items-center justify-center gap-1.5 py-4 text-xs text-muted-foreground">
          <span>Built with</span>
          <Heart className="size-3.5 text-primary" aria-hidden="true" />
          <span>for everyone. WCAG 2.1 AA.</span>
        </div>
      </div>
    </footer>
  );
}