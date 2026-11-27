"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { CultureCard } from "@/components/culture-card";
import { cn } from "@/lib/utils";
import type { CultureType, CultureWithMeta } from "@/lib/types";

type Filter = "All" | CultureType;

const FILTERS: Filter[] = ["All", "Food", "Dance", "Art", "Language"];

export function CultureExplorer({ cultures }: { cultures: CultureWithMeta[] }) {
  const [filter, setFilter] = React.useState<Filter>("All");
  const [query, setQuery] = React.useState("");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return cultures.filter((culture) => {
      const matchesType = filter === "All" || culture.type === filter;
      const matchesQuery =
        q.length === 0 ||
        culture.name.toLowerCase().includes(q) ||
        culture.detail_desc.toLowerCase().includes(q) ||
        (culture.country?.name.toLowerCase().includes(q) ?? false);
      return matchesType && matchesQuery;
    });
  }, [cultures, filter, query]);

  return (
    <section aria-labelledby="cultures-heading" className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cultures-heading" className="text-2xl font-bold tracking-tight">
              Explore cultures
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {visible.length} {visible.length === 1 ? "tradition" : "traditions"}{" "}
              to discover
            </p>
          </div>

          <label className="relative block w-full md:max-w-xs">
            <span className="sr-only">Search cultures</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cultures or countries…"
              className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
          </label>
        </div>

        <div
          role="group"
          aria-label="Filter cultures by type"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background text-foreground hover:bg-muted",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((culture) => (
            <CultureCard key={culture.id} culture={culture} />
          ))}
        </div>
      ) : (
        <p
          role="status"
          className="mt-10 rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground"
        >
          No cultures match your search. Try a different term or filter.
        </p>
      )}
    </section>
  );
}