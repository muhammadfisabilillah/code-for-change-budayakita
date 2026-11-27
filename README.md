# BudayaKita Global

**An inclusive digital platform celebrating world cultural heritage — designed for everyone, without barriers.**

---

## About

Cultural heritage is often documented in ways that exclude the very people it belongs to. Museum and archive websites frequently lack alt text, transcripts, keyboard navigation, and readable contrast — leaving blind, deaf, and motor-impaired visitors unable to take part in stories that are collectively theirs.

**BudayaKita Global** is our answer: a premium, editorial-style atlas of world cultures built with **WCAG 2.1 AA** as a design foundation rather than an afterthought. Every cultural entry pairs beautiful imagery with meaningful alternative text, narration, transcripts, and sign-language context. The interface stays calm and spacious — inspired by architecture and culture magazines — so the content, not the chrome, does the talking.

Built for the **Code for Change** hackathon.

---

## Key Features

- **Architectural Editorial Design** — Generous whitespace, light-weight editorial typography, a warm stone palette, and a single restrained terracotta accent. Full-bleed hero photography, manifesto sections, magazine-style featured grids, and long-form culture storytelling.
- **Accessibility-First**
  - Screen-reader friendly semantic landmarks, headings, and ARIA attributes
  - Descriptive alt text stored alongside each cultural item
  - Narration transcripts and audio narration (with speech-synthesis fallback)
  - Sign-language context with an equivalent text alternative when media is unavailable
  - High contrast mode, keyboard navigation, skip link, and visible focus states
  - Reduced-motion support throughout
- **Theme System**
  - **Light** — warm off-white with terracotta accent
  - **Dark** — deep stone with a muted amber accent
  - **High Contrast** — pure black/white with a soft blue accent
  - Preferences persist in `localStorage`; dark mode also respects the OS preference.
- **Global Search** — Find any country or cultural tradition from the navbar (`Ctrl/⌘ + K`) with full keyboard navigation.
- **Responsive & Performant** — Mobile-first layouts, optimized images via `next/image`, static pre-rendering for editorial routes, and graceful fallback to bundled seed data when Supabase is not configured.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Primitives | Radix UI (`@radix-ui/react-slot`) |
| Backend | Supabase (PostgreSQL, read-only anon access) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or newer
- npm 9 or newer
- A Supabase project (optional — the app runs with bundled seed data without it)

### Installation

```bash
git clone https://github.com/muhammadfisabilillah/code-for-change-budayakita.git
cd code-for-change-budayakita
npm install
```

### Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (read-only access) |
| `SUPABASE_URL` | Used by the seeder script |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** key used by `npm run seed`; never expose it in browser code |

If the public variables are empty, the app automatically falls back to the curated data in `lib/seed.ts`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Scripts

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # ESLint
npm run typecheck   # TypeScript check
npm run seed        # populate Supabase with starter data
```

The database schema lives in [`supabase/schema.sql`](supabase/schema.sql). Run it in the Supabase SQL editor before seeding.

---

## Accessibility Commitment

Accessibility is a requirement, not a feature flag. We aim to meet **WCAG 2.1 AA** across the experience: every interactive element is keyboard reachable with a visible focus indicator, media has text alternatives, motion respects user preferences, and contrast is verified in all three themes. If you find a barrier, please open an issue — fixing it is a contribution to everyone's heritage.

---

## Author

**Muhammad Fisabilillah** — [https://github.com/muhammadfisabilillah](https://github.com/muhammadfisabilillah)

---

## License

Released under the [MIT License](LICENSE).
