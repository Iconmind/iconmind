# @iconmind/mcp

## 0.6.3

## 0.6.2

## 0.6.1

## 0.6.0

### Minor Changes

- deb6704: Devices, and twenty-one names that now find the icon they meant: 2,271 → 2,287 icons.

  The additions come from the most-reacted open icon requests in the Lucide and Tabler
  trackers, filtered to what this set is for. Sixteen new drawings: mouse, printer, router,
  laptop, tablet, speaker, gamepad, headset, usb, sim-card, sd-card, ethernet, cable,
  motherboard, battery-charging and satellite.

  Twenty-one requested names turned out to describe icons that already existed, so they are
  aliases rather than second drawings — `smartphone` is `phone`, `watch` is `smartwatch`,
  `mouse-pointer` is `cursor`, `map-pin` is `location`, `heart-add` is `favorite-add`,
  `scan-barcode` is `barcode`, `ram` is `memory-ram`. Searching for the name you know now
  finds the drawing.

  Two were refused rather than drawn badly: `bluetooth`, because the rune needs three stroke
  crossings where the set allows two, and `plug`, because the two-pronged plug is already
  the `tool` icon.

### Patch Changes

- Updated dependencies [deb6704]
  - @iconmind/icons@0.6.0

## 0.5.0

### Minor Changes

- b2729bd: The generic layer, family by family: 2,041 → 2,271 icons (13,626 drawings).

  Measured against Lucide's names, the set had the AI-native vocabulary and not the
  families that make somebody install a second icon set beside it. This release closes
  those gaps on the bodies the set already draws — 230 icons across documents, folders,
  people, chats, calendars, clocks, panels, layouts, alignment, lists, text, arrows,
  chevrons, corners, git, clipboards, monitors, mail, databases, bells, shields, clouds
  and charts — each family drawn in one sitting on one body, with its mark at the slot
  its existing siblings use.

  Lucide's spellings resolve here too. A hundred-odd of them became aliases on icons the
  set already had (`file-plus` → `document-add`, `message-square-check` → `chat-check`,
  `panel-left` → `sidebar`, `cloud-download` → `download-cloud`, `clock-check` →
  `on-time`), so the name you know finds the drawing whichever set you learned it in.

  Six icons that turned out to be the same drawing as an existing one were not drawn
  twice: `user-check` is `human-approval`, `clipboard-paste` is `paste`,
  `chart-no-axes-gantt` is `span-trace`, `chevrons-up` is `priority`, `corner-down-left`
  is `command` — aliases, all of them.

  Under the hood, every icon in a family now carries the same family label, which is
  what lets the nightly perceptual scan tell a sibling from a duplicate.

### Patch Changes

- Updated dependencies [b2729bd]
  - @iconmind/icons@0.5.0

## 0.4.1

## 0.4.0

### Minor Changes

- de053ca: One thousand new icons — the set grows from 1,041 to 2,041 (12,246 drawings), all drawn on the same 24px grid, 0/45/90° angles, six cells each (outline and duotone at thin, regular and bold).

  What arrived: the generative stack (diffusion, image and video generation, speech, 3D, robotics), reasoning and evaluation (calibration, ROC and precision-recall curves, eval harnesses, checkpoints), agents at their desks (file, terminal, email, code, browser, desktop, phone, form, SQL and support agents, memory of every kind), the named parts of a screen (chat bubbles in every mood, bottom sheets, carousels, kanban, gestures, pages, panes and pickers), data and analytics (pivots, window functions, candlesticks, dumbbell, radial, combo and timeline charts), security (keys granted, revoked, verified, vaulted and scoped), cost (coins paid, refunded, topped up, metered), and the pairing grammar that closes the set — a body such as a coin, clock, key, pin, flag, funnel, target, bookmark, heart or shield qualified by the mark beside it.

  Every icon description was rewritten as a full sentence for search (60–101 characters), and the docs site's download buttons now build the shown SVG in the browser instead of fetching a file that did not exist.

### Patch Changes

- Updated dependencies [de053ca]
  - @iconmind/icons@0.4.0

## 0.3.6

## 0.3.5

### Patch Changes

- Updated dependencies
  - @iconmind/icons@0.3.5

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
