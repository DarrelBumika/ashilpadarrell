# AGENTS.md — portfolio-v3

Bun-only Next.js 16 portfolio (App Router, React 19, Tailwind v4, GSAP/ScrollTrigger + Lenis). `README.md` has the full authored tour; this file is the "don't get bitten" shortlist.

## Commands (no test suite)
- `bun install` — lockfile is `bun.lock`; toolchain pinned to `bun@1.3.11` via `packageManager`. Don't reach for npm/pnpm/yarn.
- `bun dev` (Turbopack, :3000) · `bun build` (also type-checks) · `bun start`
- `bun lint` · `bun typecheck` · `bun format:check` · `bun format`
- No tests, no test runner, no CI workflow, no configured pre-commit hooks. Verify with `bun lint`, `bun typecheck`, `bun format:check`, `bun build`. There is no single aggregate "check" script.

## Toolchain quirks
- Tailwind v4 is loaded via `@tailwindcss/turbopack` in `next.config.ts`, not PostCSS. There is no `tailwind.config`/`postcss.config` — don't add one expecting it to apply. Theme tokens live in `app/globals.css` (`@theme`).
- `cacheComponents: true` enables `"use cache"` (see `copyrightYear()` in `app/page.tsx`). Next 16 generates route types under `.next/types` that supply `LayoutProps<"/">` etc. — use them instead of hand-rolling prop types.

## Imports / where things live
- Aliases: `@/*`, `@app/*`, `@components/*`, `@content/*` (→ `app/content/*`), `@hooks/*`, `@lib/*`, `@assets/*`. Prefer these over `../../` chains.
- All copy, identity, links, and analytics IDs live in `app/content/*` — edit there, not in components. Display text is `TextLine`/`TextBlock` (`{text, bold?}[][]`); `toPlainText` derives `aria-label`s so a heading can't drift from its accessible name.
- `app/content/nav.ts` is the nav contract: every `href` must match a section `id` actually rendered (`#home`, `#about`, `#works`), or it's a broken anchor.

## Environment (`lib/env.ts`)
- Resolution order: valid `NEXT_PUBLIC_APP_ENV` override > `VERCEL_ENV=preview` > `NODE_ENV=development` > `production`.
- `APP_ENV` drives three things: title suffix `[Dev]`/`[Preview]`, `robots` (only prod is indexable), and analytics injection (prod only). A wrong preview value sends test traffic to real analytics. `.env.example` documents the override; `.env` is gitignored.

## Motion & scroll (easy to break)
- One frame loop only: Lenis is created with `autoRaf: false` in `components/SmoothScroll.tsx` and driven from `gsap.ticker`; `lenis.on("scroll", ScrollTrigger.update)`. Don't add a second RAF loop.
- Locking scroll for overlays must call `pauseScroll()`/`resumeScroll()` from `lib/scrollLock.ts` (module-level Lenis handle). Hiding `body` overflow does nothing — Lenis scrolls the window.
- Every animated section uses `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` branch. Never ship an animation that exists only in the no-preference branch.
- `<WordReveal>` renders `[data-reveal-word]` spans only; the consumer owns the timeline (`useWordReveal` for mount reveals, a hand-built scrubbed timeline for pinned sections). `hideForReveal()` parks words and `prefersReducedMotion()` reads the query once per effect (`lib/motion.ts`).
- Reveals are gated on the intro via `useIntroRevealed()` (`lib/introState.ts`), which waits for `markIntroRevealed()`. Repeat-visit skip state is `sessionStorage["portfolio-intro-seen"]` plus an inline `<head>` script in `app/layout.tsx` that sets `html[data-intro="done"]` before paint — keep that script or the intro flashes on every visit.
