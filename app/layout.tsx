import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { MotionProvider } from "@/components/motion-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeScript } from "@/components/ThemeScript";
import { getCountries, getCultures } from "@/lib/data";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BudayaKita Global — Documenting World Cultures",
    template: "%s · BudayaKita Global",
  },
  description:
    "An inclusive, accessible platform for exploring food, dance, art, and language from cultures around the world.",
  applicationName: "BudayaKita Global",
  keywords: [
    "culture",
    "accessibility",
    "WCAG",
    "world cultures",
    "food",
    "dance",
    "art",
    "language",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The navbar search indexes both cultures and countries, so load the
  // lightweight searchable fields once for every page.
  const [cultures, countries] = await Promise.all([
    getCultures(),
    getCountries(),
  ]);

  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <AccessibilityProvider>
          <MotionProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navbar cultures={cultures} countries={countries} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}