"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Contrast, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarSearch } from "@/components/layout/navbar-search";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { cn } from "@/lib/utils";
import type { Country, CultureWithMeta } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/countries", label: "Countries" },
  { href: "/cultures", label: "Cultures" },
  { href: "/about", label: "About" },
] as const;

interface NavbarProps {
  cultures: Pick<
    CultureWithMeta,
    "id" | "name" | "type" | "detail_desc" | "country"
  >[];
  countries: Pick<Country, "id" | "name" | "iso_code" | "flag_url">[];
}

export function Navbar({ cultures, countries }: NavbarProps) {
  const pathname = usePathname();
  const { highContrast, toggleHighContrast, darkMode, toggleDarkMode } =
    useAccessibility();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuId = "primary-navigation";

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav
        aria-label="Primary"
        className="container flex h-16 items-center justify-between gap-4"
      >
        <Link
          href="/"
          className="flex items-baseline gap-2 rounded-sm font-normal tracking-tight text-foreground transition-colors duration-500 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-lg">BudayaKita</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:inline">
            Global
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center text-xs font-medium uppercase tracking-widest transition-colors duration-500 ease-out",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive(link.href)
                      ? "text-foreground underline decoration-1 underline-offset-8"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <NavbarSearch cultures={cultures} countries={countries} />

          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            aria-pressed={darkMode}
            aria-label={
              darkMode ? "Disable dark mode" : "Enable dark mode"
            }
            title={darkMode ? "Disable dark mode" : "Enable dark mode"}
            className="rounded-sm transition-all duration-500 ease-out"
          >
            {darkMode ? (
              <Sun aria-hidden="true" />
            ) : (
              <Moon aria-hidden="true" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            aria-label={
              highContrast
                ? "Disable high contrast mode"
                : "Enable high contrast mode"
            }
            title={
              highContrast
                ? "Disable high contrast mode"
                : "Enable high contrast mode"
            }
            className="rounded-sm transition-all duration-500 ease-out"
          >
            <Contrast aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-sm transition-all duration-500 ease-out md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div id={menuId} className="border-t border-border md:hidden">
          <ul className="container flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex h-12 items-center text-xs font-medium uppercase tracking-widest transition-colors duration-500 ease-out",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
