"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "high-contrast";

interface AccessibilityContextValue {
  /** Current theme. */
  theme: Theme;
  /** Replace the current theme. */
  setTheme: (theme: Theme) => void;
  /** True when the Black/White/Soft-blue high-contrast palette is active. */
  highContrast: boolean;
  /** Toggle high contrast on/off. */
  toggleHighContrast: () => void;
  /** True when the class-based dark theme is active. */
  darkMode: boolean;
  /** Toggle dark mode on/off. */
  toggleDarkMode: () => void;
  /** True when the user's OS requests reduced motion. */
  reducedMotion: boolean;
}

const AccessibilityContext =
  createContext<AccessibilityContextValue | null>(null);

const THEME_KEY = "budayakita-theme";
const LEGACY_THEME_KEY = "budayakita:theme";
const LEGACY_CONTRAST_KEY = "budayakita:high-contrast";

const THEMES: Theme[] = ["light", "dark", "high-contrast"];

function isTheme(value: string | null): value is Theme {
  return value !== null && (THEMES as string[]).includes(value);
}

/** Applies theme classes immediately, before React effects run. */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark", "high-contrast", "hc");
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "high-contrast") {
    root.classList.add("high-contrast", "hc");
  } else {
    root.classList.add("light");
  }
}

/** Reads the saved preference, including legacy keys from earlier builds. */
function readInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (isTheme(stored)) return stored;

    const legacyContrast = window.localStorage.getItem(LEGACY_CONTRAST_KEY);
    if (legacyContrast === "true") return "high-contrast";

    const legacyTheme = window.localStorage.getItem(LEGACY_THEME_KEY);
    if (legacyTheme === "dark" || legacyTheme === "light") return legacyTheme;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  } catch {
    // Ignore storage / matchMedia access errors.
  }
  return "light";
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  // SSR default stays "light" so server and client markup always match.
  const [theme, setThemeState] = useState<Theme>("light");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate the saved preference once after mount.
  useEffect(() => {
    const initial = readInitialTheme();
    applyTheme(initial);
    setThemeState(initial);
    setMounted(true);
  }, []);

  // Persist and apply every subsequent change (skip the pre-hydration default).
  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
      window.localStorage.removeItem(LEGACY_THEME_KEY);
      window.localStorage.removeItem(LEGACY_CONTRAST_KEY);
    } catch {
      // Ignore storage access errors.
    }
  }, [theme, mounted]);

  // Track the OS-level reduced-motion preference live.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);

  const toggleDarkMode = useCallback(
    () => setThemeState((value) => (value === "dark" ? "light" : "dark")),
    [],
  );

  const toggleHighContrast = useCallback(
    () =>
      setThemeState((value) =>
        value === "high-contrast" ? "light" : "high-contrast",
      ),
    [],
  );

  const darkMode = theme === "dark";
  const highContrast = theme === "high-contrast";

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      darkMode,
      toggleDarkMode,
      highContrast,
      toggleHighContrast,
      reducedMotion,
    }),
    [
      theme,
      setTheme,
      darkMode,
      toggleDarkMode,
      highContrast,
      toggleHighContrast,
      reducedMotion,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

/** Access the accessibility context. Throws if used outside the provider. */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
}
