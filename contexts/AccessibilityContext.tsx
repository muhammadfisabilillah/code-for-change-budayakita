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

interface AccessibilityContextValue {
  /** Whether the Black/White/Soft-blue high-contrast palette is active. */
  highContrast: boolean;
  /** Toggle the high-contrast palette on/off. */
  toggleHighContrast: () => void;
  /** True when the user's OS requests reduced motion. */
  reducedMotion: boolean;
  /** Whether the class-based dark theme is active. */
  darkMode: boolean;
  /** Toggle the dark theme on/off. */
  toggleDarkMode: () => void;
}

const AccessibilityContext =
  createContext<AccessibilityContextValue | null>(null);

const STORAGE_KEY = "budayakita:high-contrast";
const THEME_KEY = "budayakita:theme";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Hydrate persisted preference after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setHighContrast(true);
    } catch {
      // Ignore storage access errors (private mode, etc.)
    }
  }, []);

  // Hydrate the theme preference after mount (the inline bootstrap script in
  // the root layout applies the class before paint to avoid a flash).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY);
      if (stored === "dark" || stored === "light") {
        setDarkMode(stored === "dark");
      } else {
        setDarkMode(
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        );
      }
    } catch {
      // Ignore storage / matchMedia access errors.
    }
  }, []);

  // Keep the <html> class in sync so Tailwind `hc` variables apply globally.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hc", highContrast);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(highContrast));
    } catch {
      // Ignore storage access errors.
    }
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    try {
      window.localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
    } catch {
      // Ignore storage access errors.
    }
  }, [darkMode]);

  // Track the OS-level reduced-motion preference live.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggleHighContrast = useCallback(
    () => setHighContrast((value) => !value),
    [],
  );

  const toggleDarkMode = useCallback(
    () => setDarkMode((value) => !value),
    [],
  );

  const value = useMemo(
    () => ({
      highContrast,
      toggleHighContrast,
      reducedMotion,
      darkMode,
      toggleDarkMode,
    }),
    [highContrast, toggleHighContrast, reducedMotion, darkMode, toggleDarkMode],
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