# @iconmind/icons

## 0.3.4

### Patch Changes

- seo(web): structured data stops pointing at ghosts, and every icon gets a real URL

## 0.3.3

### Patch Changes

- feat(flutter): the example gallery, and a README that answers everything

## 0.3.2

### Patch Changes

- chore(flutter): 0.3.2, aligned with the release this push cuts

## 0.3.1

### Patch Changes

- 8933365: The bare entry point is now a few hundred bytes — `version` and `counts` only. The full
  metadata database (descriptions, tags, keywords, `getIcon`, `iconsIn`, `categories`)
  moved to `@iconmind/icons/metadata`; `metadata.json` and `sprite.svg` subpaths are
  unchanged. Importing the database is now a decision, not a side effect of touching the
  package.

## 0.3.0

### Minor Changes

- e7f2fa5: Six new framework packages, all generated from the same icon source as React: Vue,
  Svelte (source-published), Solid, Preact, React Native (react-native-svg) and Astro
  (source-published, zero client JS). One fixed version across every package.

## 0.2.0 — 2026-08-26

The complete set. 1,008 icons across 12 domains, six cells each (outline & duotone ×
thin / regular / bold) — 6,048 SVGs, every geometric rule machine-enforced.

- Duotone finally answers everywhere: closed bodies tint at 20%, and mark-only icons
  (a check, an arrow, a chevron) tint with their own halo.
- One body per family: agent badges share a ring, MCP shares the chamfer, capabilities
  share the plug, and everything that goes round shares one square loop.
- The whole set sits in an 18–22 size band with ink centred within 2 units — measured,
  then locked into the validator.
- Five concepts refused with written reasons (`hand`, `hash`, `star`, `bold`, `italic`):
  each wants geometry the 0/45/90 grammar does not have.

## 0.1.0

First publish: the anchor set that defined the visual language.
