# Parity plan — the generic layer, family by family

The set is 2,041 icons, the same count as Lucide 1.37 (2,048). Its AI-native third —
ai 300, agents 204, rag 101, mcp 59 — has no equal. Its generic layer does not: measured
against Lucide's names, only 204 (10 %) exist here by the same name, and the gaps sit in
exactly the families that make somebody install a second set beside this one — a
dashboard that takes `agent-run` from IconMind still opens Lucide for `file-plus`,
`user-check`, `folder-open`, `calendar-days` and `panel-left`.

| family | Lucide | here (prefix) |
|---|---|---|
| file-* | 82 | 3 |
| arrow-* | 70 | 6 |
| folder-* | 33 | 6 |
| user-* | 32 | 6 |
| message-* | 31 | 6 |
| align / list / text | 63 | 14 |
| panel / grid / table | 43 | 7 |
| calendar / clock | 42 | 8 |
| git-* | 18 | 3 |
| clipboard / monitor / mail / database / bell | 58 | 5 |

This plan closes those gaps: **301 core names** and **120 optional ones**, drawn family
by family. Not one more icon in ai/agents/rag/mcp except from a real request — those
categories are saturated (the 1k rounds ended with 79 near-pairs there), and the next
thing they need is the visual audit, not volume. Target after the core: ~2,340.

## The contract

Everything in `1k-icons.md` § "The contract" and § "Naming" still applies, unchanged:
24px grid, 0.5 snap, 0/45/90, live area 2..22, size band, centring, ink at 16 px,
element budget, six cells with derived duotone, the bodies vocabulary, the banned
shapes, radius 2 or capsule. Two rules are new, both learned on 2026-08-30:

- **Family first, declared up front.** Every icon in this plan is a body plus a mark
  (`file` + `add`, `folder` + `lock`, `panel` + `left`) or a body plus a direction. The
  batch declares `family: "file"` on all of them before the first one is drawn. The
  perceptual scan judges same-family pairs by their *peak* difference and everything
  else by the *mean* — a sibling filed under the wrong label fails as a duplicate, and
  50 of the 79 pairs in the 1k set were exactly that. Family labels are a partition: an
  icon must share its label with every neighbour under 0.050 mean distance. Measure
  with `inkMap`/`inkDistance` from `scripts/lib/hash.ts` when in doubt (seconds), not
  with the full scan (three minutes).
- **`duplicate/perceptual` is an error and cannot be accepted.** The schema rejects
  `accepted` for it. A pair that fails is fixed by the family label if they are
  siblings, or by a redraw if they are not. Never by lowering a threshold.

## Naming

Lucide's names, translated into the set's own grammar (the names people type are the
ones that should resolve, so the Lucide spelling goes in `aliases` where it differs):

| Lucide suffix | here | example |
|---|---|---|
| `-plus` | `-add` | file-add (alias file-plus) |
| `-x`, `-minus` | `-remove` | user-remove (aliases user-x, user-minus) |
| `-cog` | `-config` | folder-config (alias folder-cog) |
| `-pen`, `-pen-line`, `-edit` | `-edit` | clipboard-edit |
| `-warning` | `-alert` | file-alert (alias file-warning) |
| `-2`, `-corner`, `-round` variants | dropped | one drawing per concept |

Directions stay Lucide's (`arrow-up-to-line`, `panel-left-close`, `chevrons-up-down`)
— they are already the set's convention.

## The loop (every round, no skipping)

1. **Draw** the round's family into the next `batch-NN.ts` (one file per round,
   starting `batch-77.ts`), registered in `run.ts`, `family:` set on every icon,
   description 60–110 characters written for search (the web meta template appends
   ~95 more).
2. `tsx scripts/review/precheck.mts scripts/draw/icons/batch-NN.ts`.
3. `pnpm icons:build && pnpm icons:optimize`.
4. `pnpm icons:validate` — 0 failed, 0 warnings.
5. `pnpm icons:audit <slugs>` — no outliers; a named exception needs a reason.
6. `npx tsx scripts/review/twins.mts <slugs>` — no new pair ≥ 0.88 IoU; 0.72–0.88
   looked at and either redrawn or recorded below as family grammar.
7. `pnpm icons:duplicates --perceptual` — **new in this plan**, once per round, 0
   failed. Three minutes locally; it is what the Nightly runs.
8. **Contact sheet** at 24 px beside the closest existing neighbours (the scratchpad
   `sheet.mjs`); anything mushy or off-voice is redrawn in this round.
9. A green round is a local commit. Push cadence is the user's call; a push that
   touches `packages/` mints a patch release by itself.

## Rounds

One family per round where the family is big enough, two or three small ones
together. Rounds are ~40 icons; each is a cross-section of one construction, so a
family's grammar is settled in one sitting and the scan sees the whole family at once.

| round | batch | families | icons |
|---|---|---|---|
| 1 | batch-77 | file | 38 |
| 2 | batch-78 | folder · user | 37 |
| 3 | batch-79 | message · calendar · clock | 40 |
| 4 | batch-80 | panel · layout · align | 34 |
| 5 | batch-81 | list · text · grid · table | 44 |
| 6 | batch-82 | arrow | 34 |
| 7 | batch-83 | chevron · corner · move | 29 |
| 8 | batch-84 | git · clipboard · monitor | 36 |
| 9 | batch-85 | mail · database · bell · shield · cloud | 39 |
| 10 | batch-86 | chart | 14 (+ spares from optional) |
| 11–13 | batch-87…89 | optional families, in the order the misses ask for them | ≤ 120 |

After round 10: full audit, full twins, full perceptual scan, refresh the hardcoded
counts (README badges and lines, the contribute page, every package README and
package.json description, Flutter pubspec + CHANGELOG), `pnpm icons:generate`, one
push, one minor release.

## The demand loop

Nothing in the optional list is drawn on a guess. Two signals decide the order:

- `search-miss` — a Vercel Analytics event fired from the browser, the search page and
  the palette when a query of two or more characters finds nothing (`apps/web/lib/
  search-miss.ts`; once per query per session). Custom events show on paid plans only.
- Icon-request issues — every zero-result state on the site links to the
  `icon-request.yml` template with the query prefilled.

Read both before each optional round. A name that shows up in either jumps the queue;
a family nobody asked for is left undrawn.

## Core — 301

### file (38)
file-add, file-remove, file-check, file-search, file-lock, file-key, file-json,
file-text, file-image, file-video, file-audio, file-archive, file-spreadsheet,
file-chart, file-diff, file-edit, file-clock, file-config, file-input, file-output,
file-up, file-down, file-user, file-alert, file-question, file-stack, file-box,
file-symlink, file-type, file-terminal, file-scan, file-signature, file-badge,
file-play, file-heart, file-braces, file-digit, file-sliders

### folder (23)
folder-remove, folder-search, folder-lock, folder-key, folder-code, folder-config,
folder-git, folder-closed, folder-tree, folder-root, folder-sync, folder-clock,
folder-input, folder-output, folder-up, folder-down, folder-edit, folder-archive,
folder-heart, folder-dot, folder-symlink, folder-kanban, folder-bookmark

### user (14)
user-remove, user-check, user-config, user-key, user-lock, user-search, user-edit,
user-star, user-shield, user-circle, user-square, user-round, user-back, user-cog

### message (17)
message-check, message-add, message-remove, message-reply, message-share,
message-quote, message-code, message-alert, message-more, message-heart,
message-lock, message-off, message-dashed, message-diff, message-dot, message-text,
message-question

### calendar (12)
calendar-days, calendar-range, calendar-remove, calendar-clock, calendar-search,
calendar-sync, calendar-config, calendar-heart, calendar-fold, calendar-up,
calendar-down, calendar-1

### clock (11)
clock-alert, clock-check, clock-add, clock-fading, clock-arrow-up, clock-arrow-down,
clock-arrow-left, clock-arrow-right, alarm-clock, alarm-clock-off, alarm-clock-check

### panel (14)
panel-left, panel-right, panel-left-open, panel-left-close, panel-right-open,
panel-right-close, panel-top-open, panel-top-close, panel-bottom-open,
panel-bottom-close, panel-left-dashed, panel-right-dashed, panel-top-dashed,
panel-bottom-dashed

### layout (7)
layout-dashboard, layout-grid, layout-list, layout-template, layout-panel-left,
layout-panel-top, layout-freeform

### align (13)
align-justify, align-start-horizontal, align-start-vertical, align-center-horizontal,
align-center-vertical, align-end-horizontal, align-end-vertical,
align-horizontal-distribute-center, align-vertical-distribute-center,
align-horizontal-space-between, align-vertical-space-between,
align-horizontal-justify-center, align-vertical-justify-center

### list (16)
list-check, list-checks, list-todo, list-ordered, list-tree, list-filter, list-add,
list-remove, list-start, list-end, list-indent-increase, list-indent-decrease,
list-restart, list-video, list-music, list-x

### text (14)
text-wrap, text-quote, text-select, text-cursor-input, text-search, text-initial,
text-align-start, text-align-center, text-align-end, text-align-justify, heading,
heading-1, heading-2, heading-3

### arrow (34)
arrow-up-right, arrow-up-left, arrow-down-right, arrow-down-left, arrow-left-right,
arrow-up-down, arrow-right-left, arrow-down-up, arrow-up-to-line, arrow-down-to-line,
arrow-left-to-line, arrow-right-to-line, arrow-up-from-line, arrow-down-from-line,
arrow-left-from-line, arrow-right-from-line, arrow-up-from-dot, arrow-down-to-dot,
arrow-down-a-z, arrow-up-a-z, arrow-down-z-a, arrow-up-z-a, arrow-down-0-1,
arrow-up-0-1, arrow-down-1-0, arrow-up-1-0, arrow-down-narrow-wide,
arrow-down-wide-narrow, arrow-up-narrow-wide, arrow-up-wide-narrow, arrow-big-up,
arrow-big-down, arrow-big-left, arrow-big-right

### chevron (10)
chevrons-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up-down,
chevrons-down-up, chevrons-left-right, chevrons-right-left, chevron-first,
chevron-last

### corner (8)
corner-down-left, corner-down-right, corner-up-left, corner-up-right,
corner-left-down, corner-left-up, corner-right-down, corner-right-up

### move (11)
move-horizontal, move-vertical, move-diagonal, move-up, move-down, move-left,
move-right, move-up-left, move-up-right, move-down-left, move-down-right

### git (14)
git-branch, git-branch-add, git-branch-remove, git-commit-vertical, git-compare,
git-compare-arrows, git-fork, git-graph, git-merge-conflict, git-pull-request,
git-pull-request-closed, git-pull-request-draft, git-pull-request-create,
git-pull-request-arrow

### clipboard (10)
clipboard-check, clipboard-copy, clipboard-paste, clipboard-list, clipboard-add,
clipboard-remove, clipboard-edit, clipboard-clock, clipboard-signature,
clipboard-type

### monitor (12)
monitor-check, monitor-off, monitor-play, monitor-pause, monitor-stop, monitor-up,
monitor-down, monitor-config, monitor-dot, monitor-cloud, monitor-smartphone,
monitor-speaker

### mail (9)
mail-open, mail-check, mail-add, mail-remove, mail-search, mail-alert, mail-clock,
mail-question, mail-badge

### database (8)
database-add, database-remove, database-check, database-search, database-backup,
database-zap, database-arrow-up, database-arrow-down

### table (8)
table-2, table-config, table-properties, table-of-contents, table-cells-merge,
table-cells-split, table-columns-split, table-rows-split

### grid (6)
grid-2x2, grid-3x3, grid-3x2, grid-2x2-check, grid-2x2-add, grid-2x2-remove

### bell (7)
bell-ring, bell-off, bell-dot, bell-add, bell-remove, bell-check, bell-electric

### shield (10)
shield, shield-remove, shield-half, shield-keyhole, shield-lock, shield-ban,
shield-question, shield-user, shield-config, shield-ellipsis

### chart (14)
chart-column, chart-column-increasing, chart-column-decreasing,
chart-column-stacked, chart-bar-big, chart-bar-increasing, chart-bar-decreasing,
chart-bar-stacked, chart-gantt, chart-network, chart-spline, chart-no-axes-column,
chart-no-axes-combined, chart-no-axes-gantt

### cloud (5)
cloud-download, cloud-upload, cloud-sync, cloud-backup, cloud-config

## Optional — 120 (drawn only when the misses ask)

- **scan (8):** scan, scan-line, scan-qr-code, scan-barcode, scan-face, scan-text,
  scan-search, scan-eye
- **mouse (5):** mouse, mouse-pointer, mouse-pointer-click, mouse-pointer-ban, mouse-off
- **square (16):** square, square-dashed, square-check-big, square-dot, square-play,
  square-pen, square-slash, square-x, square-split-horizontal, square-split-vertical,
  square-kanban, square-gantt-chart, square-dashed-mouse-pointer, square-mouse-pointer,
  square-text, square-code
- **circle (14):** circle, circle-dashed, circle-dot, circle-dot-dashed,
  circle-check-big, circle-play, circle-slash, circle-x, circle-off, circle-small,
  circle-fading-plus, circle-fading-arrow-up, circle-question-mark, circle-user-round
- **map (7):** map, map-pin, map-pin-check, map-pin-off, map-pin-add, map-pin-remove,
  map-pinned
- **book (10):** book, book-open, book-marked, book-text, book-check, book-open-text,
  book-copy, book-search, book-key, book-lock
- **badge (5):** badge, badge-check, badge-alert, badge-x, badge-question
- **heart (6):** heart-crack, heart-handshake, heart-pulse, heart-off, heart-add,
  heart-remove
- **hand (5):** hand, hand-coins, hand-helping, hand-grab, hand-fist

## Deliberately not in this plan

Weather (cloud-rain, cloud-snow, …), currency badges and receipts, faces, zodiac,
clock-1 … clock-12, food, animals, vehicles, sport. They are not what this set is for,
and every one of them would compete with a generalist set on its own ground.

## Known risks

- **Mark saturation inside one body.** Thirty-eight `file-*` icons means thirty-eight
  marks on one page body. The 1k rounds showed the page body carries small inner marks
  badly (twins at 0.88–1.00); the marks here must be BIG ones from marks.ts, placed at
  the same corner every time, and the family label keeps the scan honest. If a mark
  cannot be made to read at 16 px it is a spare, not a compromise.
- **Alias collisions.** `file-plus` as an alias must not already be a slug or an alias
  elsewhere (`icons:validate` checks; the round stops on a hit).
- **Old near-twin left alone**: arrow-back ≈ arrow-left at 0.010 mean distance. Not
  this plan's problem, but the arrow round is the moment to give arrow-back its bar.
- **Count refreshes** are still hand-edited in README, the contribute page and every
  package description — same checklist as the 1k plan, same one push at the end.
