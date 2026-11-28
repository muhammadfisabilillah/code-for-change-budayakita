"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Globe2, Search, X } from "lucide-react";
import { CultureTypeBadge } from "@/components/culture-type";
import { cultureSlug } from "@/lib/culture-slugs";
import { cn } from "@/lib/utils";
import type { Country, CultureType, CultureWithMeta } from "@/lib/types";

type SearchResult =
  | {
      kind: "country";
      id: string;
      label: string;
      detail: string;
      href: string;
      flagUrl: string | null;
    }
  | {
      kind: "culture";
      id: string;
      label: string;
      detail: string;
      href: string;
      type: CultureType;
    };

interface NavbarSearchProps {
  cultures: Pick<CultureWithMeta, "id" | "name" | "type" | "detail_desc" | "country">[];
  countries: Pick<Country, "id" | "name" | "iso_code" | "flag_url">[];
}

const LIST_ID = "navbar-search-results";
const OPTION_ID = "navbar-search-option";

/** Global search control in the navbar: inline on desktop, icon on mobile. */
export function NavbarSearch({ cultures, countries }: NavbarSearchProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  const openSearch = React.useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const closeSearch = React.useCallback(() => {
    setOpen(false);
    previousFocusRef.current?.focus();
  }, []);

  const countryResults = React.useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    return countries
      .filter(
        (country) =>
          q.length === 0 ||
          country.name.toLowerCase().includes(q) ||
          country.iso_code.toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((country) => ({
        kind: "country" as const,
        id: country.id,
        label: country.name,
        detail: country.iso_code,
        href: `/countries/${country.id}`,
        flagUrl: country.flag_url ?? null,
      }));
  }, [countries, query]);

  const cultureResults = React.useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    return cultures
      .filter(
        (culture) =>
          q.length === 0 ||
          culture.name.toLowerCase().includes(q) ||
          culture.type.toLowerCase().includes(q) ||
          culture.detail_desc.toLowerCase().includes(q) ||
          (culture.country?.name.toLowerCase().includes(q) ?? false),
      )
      .slice(0, 6)
      .map((culture) => ({
        kind: "culture" as const,
        id: culture.id,
        label: culture.name,
        detail: culture.country?.name ?? culture.type,
        href: `/culture/${cultureSlug(culture.name)}`,
        type: culture.type,
      }));
  }, [cultures, query]);

  const results = React.useMemo(
    () => [...countryResults, ...cultureResults],
    [countryResults, cultureResults],
  );

  // Keep the active option in range whenever the result set changes.
  React.useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(results.length - 1, 0)));
  }, [results.length]);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openSearch]);

  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const selectResult = (result: SearchResult | undefined) => {
    if (!result) return;
    setOpen(false);
    router.push(result.href);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index + 1) % results.length,
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0
          ? 0
          : (index - 1 + results.length) % results.length,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      selectResult(results[activeIndex]);
    }
  };

  // Keep focus inside the dialog while it is open.
  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'input, button:not([disabled]), a[href]',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const renderOption = (result: SearchResult, index: number) => (
    <div
      key={`${result.kind}-${result.id}`}
      id={`${OPTION_ID}-${index}`}
      role="option"
      aria-selected={activeIndex === index}
      onClick={() => selectResult(result)}
      onMouseEnter={() => setActiveIndex(index)}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 transition-colors duration-500 ease-out",
        activeIndex === index ? "bg-muted" : "hover:bg-muted/60",
      )}
    >
      {result.kind === "country" ? (
        result.flagUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.flagUrl}
            alt=""
            aria-hidden="true"
            className="size-8 rounded object-cover ring-1 ring-border"
          />
        ) : (
          <span className="flex size-8 items-center justify-center rounded bg-muted text-muted-foreground">
            <Globe2 className="size-4" aria-hidden="true" />
          </span>
        )
      ) : (
        <span className="w-[4.5rem] shrink-0">
          <CultureTypeBadge type={result.type} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{result.label}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {result.kind === "country" ? "Country" : "Culture"} · {result.detail}
        </span>
      </span>
      {activeIndex === index && (
        <CornerDownLeft className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className="hidden h-10 w-52 items-center gap-2 rounded-sm border border-border bg-background px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-all duration-500 ease-out hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:flex"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="flex-1 text-left">Search cultures…</span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-sans text-[10px] font-semibold">
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={openSearch}
        aria-label="Search cultures and countries"
        className="inline-flex size-11 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-500 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
      >
        <Search className="size-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex justify-center p-4 pt-[8vh]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" onClick={closeSearch} />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search cultures and countries"
            onKeyDown={onDialogKeyDown}
            className="relative z-10 flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-sm border border-border bg-background shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-label="Search cultures and countries"
                aria-expanded="true"
                aria-controls={LIST_ID}
                aria-activedescendant={
                  results.length > 0 ? `${OPTION_ID}-${activeIndex}` : undefined
                }
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search cultures or countries…"
                className="h-14 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="inline-flex size-9 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-500 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div
              id={LIST_ID}
              role="listbox"
              aria-label="Search results"
              className="min-h-24 flex-1 overflow-y-auto p-2"
            >
              {results.length === 0 ? (
                <p
                  role="status"
                  className="px-3 py-8 text-center text-sm text-muted-foreground"
                >
                  No cultures or countries match “{query}”.
                </p>
              ) : (
                <>
                  {countryResults.length > 0 && (
                    <div role="group" aria-label="Countries">
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Countries
                      </p>
                      {countryResults.map((result, index) =>
                        renderOption(result, index),
                      )}
                    </div>
                  )}
                  {cultureResults.length > 0 && (
                    <div role="group" aria-label="Cultures">
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Cultures
                      </p>
                      {cultureResults.map((result, index) =>
                        renderOption(result, countryResults.length + index),
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <p className="hidden border-t border-border px-4 py-2 text-xs text-muted-foreground sm:block">
              Use ↑ ↓ to navigate · Enter to open · Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
