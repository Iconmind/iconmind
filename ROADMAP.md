# Roadmap

The set is drawn. What remains is reach: the same 1,008 icons, generated into every
package a team might already be standing in — the way Lucide did it, from one source
of truth.

Live progress, rendered from the icon data itself: [iconmind.dev/roadmap](https://iconmind.dev/roadmap).

## Phase 1 — The set ✅

1,008 icons across 12 domains, six cells each (outline & duotone × thin / regular / bold).
Every geometric rule lives in a constructor or a validator, so a drawing that breaks the
system cannot reach a file. Five concepts stand refused with written reasons (`hand`,
`hash`, `star`, `bold`, `italic` — each wants geometry the 0/45/90 grammar does not have).

## Phase 2 — Launch (in progress)

- ✅ `@iconmind/icons`, `@iconmind/react`, `@iconmind/mcp` — **0.2.0 on npm**
- Docs live (Vercel; **iconmind.dev** to follow): search, categories, studio, per-icon pages
- Versioning via changesets; SVGs are the API

## Phase 3 — Frameworks (largely landed)

One generator, many targets — each package is emitted from the same icon source,
never hand-maintained:

- ✅ `@iconmind/vue` · `@iconmind/svelte` · `@iconmind/solid` · `@iconmind/preact`
- ✅ `@iconmind/astro` (source-published, zero client JS)
- ✅ `iconmind/blade-iconmind` — Laravel via Blade Icons (Packagist publish pending)
- `@iconmind/angular` — needs an ng-packagr build; the lucide-style single
  `<im-icon>` + tree-shakeable data modules is the plan

## Phase 4 — Native

- ✅ `@iconmind/react-native` — components over `react-native-svg`
- `iconmind_flutter` — needs stroke→outline conversion before a font is possible;
  a `flutter_svg` wrapper may ship first

## Phase 5 — Design & static

- Figma plugin (search + insert, variant-aware)
- SVG sprite and symbol builds
- Icon font for the environments that still need one
- CDN builds (unpkg / jsDelivr paths documented)

## Phase 6 — v1.0

- API freeze and semver guarantees
- Accessibility pass (titles, `aria-hidden` defaults, docs guidance)
- Community contribution pipeline: the validator is the reviewer
