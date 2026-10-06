# Lucas-Nahuel-Pinto.github.io

Professional QA portfolio — [lucas-nahuel-pinto.github.io](https://lucas-nahuel-pinto.github.io).

Bilingual (ES/EN) static site built with Astro. Showcases three QA projects as case studies: QA flow checklists, Jira traceability manager and agent harness configuration.

## Stack

- [Astro](https://astro.build) + TypeScript (strict)
- Zero client framework — static output, vanilla scripts for theme toggle
- `@astrojs/sitemap`, hreflang alternates, JSON-LD `Person`
- GitHub Actions → GitHub Pages

## Develop

```bash
bun install
bun run dev      # http://localhost:4321/es
bun run check    # astro check (TypeScript 6 — TS7 unsupported by astro check)
bun run build    # dist/
```

## Structure

```
src/
  data/          project + case-study content (es/en)
  components/    Navbar, ThemeToggle, Footer, stripe/gallery components
  layouts/       BaseLayout (SEO, theme boot, hreflang)
  lib/i18n.ts    language helpers + UI strings
  pages/[lang]/  es/ and en/ routes share the same components
public/
  checklists/    self-contained HTML checklists (served standalone)
  images/        screenshots (synthetic data only)
```

## Privacy rule

No employer data is ever published: screenshots and demo data are synthetic, and a pre-publish sweep (`BK-\d`, employer identifiers, Atlassian URLs) must return zero matches in `dist/`.

## License

MIT
