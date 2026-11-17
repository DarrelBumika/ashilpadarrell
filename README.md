# portfolio-v3

Personal portfolio for ashilpa darrell bumika. One page, heavy on scroll-driven
typography: GSAP timelines scrubbed by ScrollTrigger, Lenis for smooth scrolling,
Next.js App Router with React 19 and Tailwind CSS v4.

Live: [ashilpadarrell.site](https://ashilpadarrell.site)

## Stack

| Concern     | Choice                                               |
| ----------- | ---------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI          | React 19, Tailwind CSS v4                            |
| Motion      | GSAP 3 + ScrollTrigger + `@gsap/react`, Lenis        |
| Type safety | TypeScript (strict)                                  |
| Tooling     | Bun, ESLint (`eslint-config-next`), Prettier         |

## Getting started

Requires [Bun](https://bun.sh) 1.3+ (the repo is locked to it via
`packageManager`).

```bash
bun install
bun dev          # http://localhost:3000
```

Environment is optional — without it the app infers its target from
`VERCEL_ENV` and `NODE_ENV`. To force one, copy `.env.example` to `.env`:

```bash
NEXT_PUBLIC_APP_ENV=development   # development | preview | production
```

`APP_ENV` drives two things: the `[Dev]` / `[Preview]` title suffix and whether
the analytics script is injected. Getting it wrong in preview is how test
traffic lands in production analytics.

## Scripts

| Command            | What it does                                 |
| ------------------ | -------------------------------------------- |
| `bun dev`          | Dev server with Turbopack                    |
| `bun build`        | Production build (type-checks as part of it) |
| `bun start`        | Serve the production build                   |
| `bun lint`         | ESLint                                       |
| `bun typecheck`    | `tsc --noEmit`                               |
| `bun format`       | Prettier write                               |
| `bun format:check` | Prettier check (CI-friendly)                 |

## Layout

```
app/
  layout.tsx        root shell: font, metadata, intro bootstrap, analytics
  page.tsx          section order
  globals.css       Tailwind import, theme tokens, display typography
  not-found.tsx    404
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
  content/          all copy and identity — edit here, not in components
    site.ts         name, email, phone, socials, URL, analytics, wordmarks
    nav.ts          section links (must match rendered section ids)
    home.ts         hero + slogan lines
    about.ts        about kicker + lines
    works.ts        works heading + project list
components/
  sections/         page sections: Header, HomeStage, Hero, About,
                    SelectedWorks, Footer
  ui/               WordReveal, Slogan, FloatingSlogan, TextButton
  intro/            Intro overlay
  SiteFooterProvider.tsx
  SmoothScroll.tsx  Lenis + GSAP ticker
hooks/
  useSiteFooter.ts  footer ref shared with Header and FloatingSlogan
lib/
  env.ts            APP_ENV resolution
  text.ts           TextLine helpers, toPlainText for aria-labels
  motion.ts         reveal distance, reduced-motion query
  introState.ts     intro seen/revealed store
assets/
  fonts/            nohemi (variable, wght 100–900)
  img/              optimized portrait
```

## Editing content

All user-facing copy lives in `app/content/`. Display headings are
`TextLine = { text: string; bold?: boolean }[]` — one array per visual line — and
`aria-label`s are derived from them with `toPlainText`, so a heading can never
drift from its accessible name.

Adding a nav link means adding a section with a matching `id`; `content/nav.ts`
documents that contract. A link without a target is a broken anchor.

## Motion conventions

- Every animated section wraps its work in `gsap.matchMedia()` and declares a
  `(prefers-reduced-motion: reduce)` branch. Don't ship an animation that only
  exists in the no-preference branch.
- `<WordReveal lines={...} />` renders the per-word spans. Words carry
  `data-reveal-word`; the consumer owns the timeline — `useWordReveal` for
  mount reveals, a hand-built scrubbed timeline for pinned sections.
- `hideForReveal()` parks words below their mask; `prefersReducedMotion()` reads
  the media query once per effect.
- Lenis is driven from GSAP's ticker so scroll position and animation share one
  frame loop. Don't add a second RAF loop.

## Deploy

Built for Vercel (`bun run build`). Set `NEXT_PUBLIC_APP_ENV=preview` on preview
environments if you rely on the suffix instead of `VERCEL_ENV`.
