# @iconmind/react

## 0.4.1

## 0.4.0

### Minor Changes

- de053ca: One thousand new icons — the set grows from 1,041 to 2,041 (12,246 drawings), all drawn on the same 24px grid, 0/45/90° angles, six cells each (outline and duotone at thin, regular and bold).

  What arrived: the generative stack (diffusion, image and video generation, speech, 3D, robotics), reasoning and evaluation (calibration, ROC and precision-recall curves, eval harnesses, checkpoints), agents at their desks (file, terminal, email, code, browser, desktop, phone, form, SQL and support agents, memory of every kind), the named parts of a screen (chat bubbles in every mood, bottom sheets, carousels, kanban, gestures, pages, panes and pickers), data and analytics (pivots, window functions, candlesticks, dumbbell, radial, combo and timeline charts), security (keys granted, revoked, verified, vaulted and scoped), cost (coins paid, refunded, topped up, metered), and the pairing grammar that closes the set — a body such as a coin, clock, key, pin, flag, funnel, target, bookmark, heart or shield qualified by the mark beside it.

  Every icon description was rewritten as a full sentence for search (60–101 characters), and the docs site's download buttons now build the shown SVG in the browser instead of fetching a file that did not exist.

## 0.3.6

## 0.3.5

## 0.3.4

## 0.3.3

## 0.3.2

## 0.3.1

## 0.3.0

### Minor Changes

- e7f2fa5: Six new framework packages, all generated from the same icon source as React: Vue,
  Svelte (source-published), Solid, Preact, React Native (react-native-svg) and Astro
  (source-published, zero client JS). One fixed version across every package.

## 0.2.0

### Minor Changes

- b256468: Open the `data` domain with its first six icons: `pipeline`, `transform`,
  `data-warehouse`, `stream`, `data-quality`, and `dag`.

  This is the first domain outside the AI cluster. Until now all 53 icons sat in
  `ai`, `agents`, `mcp`, and `rag`, so anyone searching for a data-engineering
  concept found nothing at all.

- 982a4ba: Open the `devops` domain with its first six icons: `build`, `container`,
  `cluster`, `release-tag`, `observability`, and `incident`.
- 5386e74: Open the `devtools` domain with its first six icons: `code`, `terminal`,
  `branch-git`, `package`, `debug`, and `api`.
- 21bd328: Open `cloud`, `security`, `automation`, and `analytics` with four icons each.
  Only `interface` is still empty.
- 5cba80f: Open the `interface` domain with ten icons, and fill the last gap in `ai`, `mcp`
  and `rag`. Every one of the twelve domains now meets its M3 minimum, and the set
  is at 100 icons.

## 0.1.0

### Minor Changes

- 38a935e: First release. 53 icons across AI, agents, MCP, and RAG, drawn in a single design
  language: containers cut their corners at 45°, every shape fills the 2..22 live area,
  and one 2px stroke throughout.

  Ships `@iconmind/icons` (raw SVG, metadata, sprite), `@iconmind/react` (one named
  export per icon, ESM only, roughly 500 bytes gzipped for a single icon), and
  `@iconmind/mcp` (an MCP server so an AI assistant can search for and insert icons that
  actually exist instead of guessing names).
