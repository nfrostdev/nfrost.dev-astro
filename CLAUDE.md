# CLAUDE.md

## Project

Personal portfolio site for Nick Frost, Engineering Manager based in Kalamazoo, MI.
Built with Astro 5 + Tailwind CSS v4. Static output. Deployed to Cloudflare Pages.

## Commands

- `npm run dev` — dev server (usually already running)
- `npm run build` — production build (output: `dist/`)
- `npm run preview` — preview production build
- Package manager: **npm** (not bun, not yarn)

## Stack

- Astro 5 (static, no JS frameworks, Astro components + vanilla JS only)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Font: Onest (self-hosted via `@fontsource-variable/onest`, preloaded)
- `satori` + `@resvg/resvg-js` for OG image generation
- `simple-icons` for tech badge SVG icons
- `@astrojs/sitemap` (filters out tailored resume paths)
- View Transitions via Astro `<ViewTransitions />`

## File Structure

```
src/
  components/          — Section, ProjectCard, ExperienceItem, TechBadge, Logo, ThemeScript, ResumeLayout, icons/
  data/resumes/        — tailored resume JSON files (_prefixed = ignored)
  layouts/Layout.astro — html shell, nav, footer, scripts
  lib/data.ts          — shared data (skills)
  lib/techIcons.ts     — simple-icons iconMap + urlMap + hasIcon()
  pages/
    index.astro        — single-page site, all content defined inline
    404.astro          — 404 page
    og.png.ts          — OG image generation (satori)
    resume/            — master resume, [slug] tailored, all.astro dashboard
  styles/global.css    — Tailwind import, font import, theme vars, all custom CSS
```

## Style & Writing Rules

- **No em dashes.** Replace with period, comma, or semicolon.
- Keep wording concise. No filler, no fluff.
- Site copy: first-person, personal, direct tone.
- Resume copy: professional bullet-point style (intentionally differs from site).
- No LinkedIn references anywhere.
- Consistent title case on button labels ("Get in Touch", "View Projects").

## Design System

- Dark-first, monochrome. No blue in dark mode.
- `data-theme="dark|light"` on `<html>`, set by ThemeScript.astro (prevents FOUC).
- Light mode remaps zinc CSS variables; `--color-white` remaps to zinc-950.
- Favicon swaps with theme (favicon.svg / favicon-dark.svg).
- ThemeScript handles `astro:after-swap` for View Transitions compatibility.
- Noise texture overlay at 4% opacity (2% light mode).
- Scroll fade-ins via IntersectionObserver on `[data-animate]`, respects `prefers-reduced-motion`.

## Accessibility

- Target: AAA (7:1) dark mode, AA (4.5:1) light mode.
- 44px touch targets on all interactive elements.
- `prefers-reduced-motion` respected for animations.
- Skip link, focus-visible ring, aria-hidden on decorative SVGs, sr-only text for new-tab links.

## Technical Gotchas

- Use `:global()` selector when Astro scoped styles need to target elements inside child components. Without this, styles silently fail.
- Print stylesheets: don't use aggressive resets like `* { background: transparent !important }` as they kill intentional background colors (resume blue header/footer).
- Resume paper is always light regardless of theme; background/toolbar follow theme.
- Check for typographic orphans in print layouts proactively.

## Resume System

- Master resume: `/resume` (experience data defined inline).
- Tailored resumes: JSON in `src/data/resumes/` rendered at `/resume/[slug]`.
- Dashboard: `/resume/all` lists all tailored resumes sorted by date.
- JSON override arrays are full replacements, not diffs.
- `_`-prefixed JSON files are ignored. `_example.json` serves as template.
- Tailored pages have `noindex` meta and are excluded from sitemap.
- Print optimized: `@page letter`, blue header/footer preserved, toolbar hidden.
