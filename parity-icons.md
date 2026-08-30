# Parity plan — the generic layer, family by family

The set is 2,041 icons, the same count as Lucide 1.37 (2,048). Its AI-native third —
ai 300, agents 204, rag 101, mcp 59 — has no equal. Its generic layer does not: measured
against Lucide's names, only 204 (10 %) exist here by the same name, and the gaps sit in
the families that make somebody install a second set beside this one — a dashboard that
takes `agent-run` from IconMind still opens Lucide for `file-plus`, `user-check`,
`folder-open`, `calendar-days` and `panel-left`.

| family | Lucide | here (prefix) |
|---|---|---|
| file-* (here: document-*) | 82 | 8 |
| arrow-* | 70 | 6 |
| folder-* | 33 | 6 |
| user-* | 32 | 6 |
| message-* (here: chat-*) | 31 | 16 |
| align / list / text | 63 | 14 |
| panel / grid / table | 43 | 7 |
| calendar / clock (here: time-*) | 42 | 15 |
| git-* | 18 | 3 |
| clipboard / monitor / mail / database / bell | 58 | 5 |

This plan closes those gaps with **~320 core icons** and **120 optional ones**, drawn
family by family on the bodies the set already has — never a new body where one
exists. Not one more icon in ai/agents/rag/mcp except from a real request: those
categories are saturated (the 1k rounds ended with 79 near-pairs there), and what they
need next is the visual audit, not volume. Target after the core: ~2,360.

## The contract (locked — the same numbers as every icon that exists)

Every number is the machine's number, with its gate named. The prose documents the
gates; it never replaces them.

- **Canvas 24 × 24**, coordinates snap to **0.5** (`geometry/grid-snap`; curve endpoints
  exempt). Angles **0 / 45 / 90 only** (`geometry/angle-constraint`).
- **Live area 2..22** for every anchor and arc endpoint (`geometry`, `precheck`).
- **Stroke** 1.5 thin / 2 regular / 2.5 bold (`WEIGHTS`), round caps and joins. Parallel
  strokes **≥ weight + 2.5 apart** (`geometry/min-stroke-gap`: error under 1.5, warning
  under the minimum). No stroke run shorter than **2.5** (it vanishes at bold).
  Crossings **≤ 2** (`geometry/max-crossings`). No collinear overlap.
- **Size**: longer side including stroke **≥ 16** and ≤ ~22 (`precheck`, `matrix
  optical-size`); short side **≥ 10** (`audit`, GLYPHS exempt with a written reason).
- **Centre, both metrics**: bbox centre **≤ 2** from (12, 12) (`precheck`); ink centroid
  **< 2.5** (`audit`, ANCHORED exempt with a written reason).
- **Ink at 16 px < 45 %** (`audit`). **Elements < 8** (`audit`; validator warns above the
  budget). A body plus one mark is 2–4 elements; a body plus a compound mark is ≤ 6.
- **Six cells** per icon: outline and duotone × thin / regular / bold. Duotone is
  derived — 20 % tint on closed bodies, halo at weight + 3 on open strokes — never
  drawn by hand.
- **Corner radius** 2, or h/2 for a capsule (`forms.rect`, `frame`). Stub minimum 5 × 5
  at r 2. Frame gap lips ≥ 2.5.
- **Bodies vocabulary is law** — the table below. A new concept in a family reuses the
  family body; it never invents a rival.
- **Marks come from `marks.ts`** — `add`, `remove`, `check`, `alert`, `off`, `pause`,
  `working` at `BIG` (4) or `SMALL` (3), placed at the family's slot — never redrawn ad
  hoc. `off` is the X; `remove` is the minus.
- **Banned**: sparkle, robot, brain, magic wand.
- **Family first, declared up front.** Every icon in this plan is a body plus a mark or a
  body plus a direction, and its batch entry declares the family's label before it is
  drawn. The perceptual scan judges same-family pairs by *peak* difference and everything
  else by *mean* (≤ 0.050 fails); labels are a partition — an icon shares its label with
  every neighbour under 0.050. Measure with `inkMap`/`inkDistance` from
  `scripts/lib/hash.ts` when in doubt (seconds), not with the full scan (three minutes).
- **`duplicate/perceptual` is an error and cannot be accepted** (the schema rejects it).
  A failing pair is fixed by its family label if they are siblings, by a redraw if not.
  Never by a threshold.
- **Descriptions 60–110 characters**, written for search (the web meta appends ~95).
  Tags never repeat the category; aliases are JavaScript identifiers.

## Bodies and slots (locked to the icons that exist)

Each family draws on exactly this geometry — the same form calls as its existing
members — and puts its mark where its existing members put theirs.

| family | body (form calls, from `bodies.ts` / the existing icon) | mark slot, from existing siblings | label |
|---|---|---|---|
| document (Lucide file) | `page()` = `body(poly([[13,3],[6,3],[6,21],[18,21],[18,8]]))` | `SMALL @ cy 12` (document-add/check/off/alert); inner glyphs 8..16 × 9..15 (file-code) | `page` |
| folder | `folder()` = `body(poly([[20,7],[20,20],[4,20],[4,4],[9,4],[12,7],[16,7]]))` | `SMALL @ cy 13` (folder-add/check/off/alert) | `folder` |
| user | `disc(12,8,3)`, `body(arc(12,21,7,180,360))` (= `figure()`) | right shoulder: add = `col(18,9,15), row(12,15,21)`; off = X in 15..21 × 9..15 (user-add, user-off) | `figure` |
| chat (Lucide message) | `rect(3,3,18,15,2)`, tail `poly([[7,18],[7,21],[10,18]])` (chat-check) — bubble height 14–15.5 flexes with the mark | inside, 8..16 × 7..13 (chat-check/code/reply/forward/lock) | `bubble` |
| calendar | `calendarParts()` = `window_()` + `row(10,3,21)`, `col(8,2.5,5)`, `col(16,2.5,5)` | `SMALL @ cy 15` (calendar-add/check/off/alert) | `window` |
| time (Lucide clock) | `CLOCK_L` = `disc(7.5,12,5.5)` + hands `poly([[7.5,9],[7.5,12],[10,12]])` — the clock at left | right-hand mark at x 16..22 (time-alert, timer-pause, time-shift) | `clock` |
| panel / layout / table / grid | `frame(2,4,20,16,3,{ gap: 4 })` with rules inside (panel-top, sidebar, table); grid = `frame(2,2,20,20,3,{ gap: 4 })` | dividers at 9 / 15 (rows), 9 / 15 (cols); dashed = dashed rule | `window` |
| list / align / text | rails: `row(6,3,21)`, `row(12,…)`, `row(18,…)`; list = `disc(4,y,1)` + `row(y,8,20)`; right-hand mark `ROWS_L + *_R` (list-alert) | right of the rails, x 16..22 | `rails` |
| arrow | shaft `col(12,4,20)` / `row(12,4,20)`, head `poly` 5 wide (arrow-up); to-line = `row(4,7,17)` / from-line = `row(20,7,17)` | — | `arrow` (arrow-left/right/back live in `mark`, see the 0.050 rule) |
| chevron / corner / move | `poly([[5,15],[12,8],[19,15]])` (chevron-up); corner = shaft + one 45° bend; move = 4-way arrow (move) | — | `chevron` / `arrow` |
| git | chain: `disc(…,2)` nodes on 45° / 90° lines (git-merge, branch-git) | — | `chain` |
| clipboard | `rect(4,5,16,16,2)`, clip `rect(8,2,8,7,2)` | `SMALL @ cy 14` inside the board | `window` |
| monitor | `frame(2,4,20,13,3,{ gap: 4 })`, stand `col(12,17,20)`, `row(20,7,17)` | `SMALL @ cy 10.5` inside the screen | `window` |
| mail | `rect(2,5,20,14,2)`, flap `poly([[4,6],[12,14],[20,6]])` | right-top badge x 17..21, or `SMALL @ cy 15` below the flap | `window` |
| database | `machine()` + `row(11,7,17)`, `row(15.5,7,17)` | `BIG @ cy 11` (server family) | `machine` |
| bell | `arc(12,13,6,180,360)`, `col(6,13,17)`, `col(18,13,17)`, `row(17,4,20)`, `disc(12,20,1)` | right-top badge x 17..21 | `figure` |
| shield | `shield()` = `body(poly([[15,5],[20,5],[20,13],[12,21],[4,13],[4,5],[9,5]]))` | `SMALL @ cy 11` (shield-add/check/off/alert) | `shield` |
| chart | axes `col(4,4,20)`, `row(20,4,20)` + bars/line (chart-bar, chart-line) | — | `axes` |
| cloud | `cloud()` (three-lobe area); `cloud(4)` lifted when a mark sits below | `SMALL @ cy 12` (cloud-add/check/off/alert) | `cloud` |

A body that needs to shrink to make room for a mark shrinks the way its siblings did
(chat-code's bubble is 14 tall, chat-lock's 15.5) — never a fresh outline.

## Naming

Lucide's names are what people type, so they resolve here — as the slug where the set
already uses the same head, as an **alias** where the set's head differs:

| Lucide | here | rule |
|---|---|---|
| `file-*` | `document-*` | the page body's family is `document-` (document-add, document-check…); `file-*` goes in `aliases` |
| `message-square-*`, `message-circle-*` | `chat-*` | the bubble family is `chat-`; both Lucide forms alias to it |
| `clock-*` | `time-*` | the clock-at-left family is `time-` (time-alert, time-lock…) |
| `-plus` | `-add` | `-x` → `-off` (the X mark), `-minus` → `-remove` (the minus) |
| `-cog` | `-config` | `-pen` / `-pen-line` → `-edit`; `-warning` → `-alert` |
| `-2`, `-corner`, `-round`, `-big` variants | dropped | one drawing per concept; the Lucide spelling becomes an alias |

Directions keep Lucide's wording (`arrow-up-to-line`, `panel-left-close`,
`chevrons-up-down`) — already the set's convention. kebab-case, singular, concrete.

## Round 0 — aliases only, no drawing

These Lucide names are concepts the set already has. They become aliases on the
existing icon (one batch edit, `icons:validate` checks alias collisions), so the
searches resolve today:

`file-plus`→document-add · `file-check`→document-check · `file-x`→document-off ·
`file-warning`→document-alert · `file-diff`→diff-file · `folder-x`→folder-off ·
`folder-closed`→folder · `folder-bookmark`→bookmark-folder · `user-x`→user-off ·
`user-round`/`circle-user-round`→user · `message-square-check`→chat-check ·
`message-square-code`→chat-code · `message-square-reply`→chat-reply ·
`message-square-share`→chat-forward · `message-square-heart`→chat-heart ·
`message-square-lock`→chat-lock · `message-square-x`→chat-cancel ·
`message-circle-off`→chat-mute · `calendar-x`→calendar-off · `calendar-range`→date-range ·
`clock-alert`→time-alert · `panel-left`→sidebar · `list-chevrons-down-up`→list-collapse ·
`grid-2x2`→grid-view · `arrow-up-right`→arrow-external · `git-branch`→branch-git ·
`cloud-download`→download-cloud · `cloud-upload`→upload-cloud · `shield-x`→shield-off ·
`cloud-x`→cloud-off

## The loop (every round, no skipping)

1. **Draw** the round's family into the next `batch-NN.ts` (one file per round, from
   `batch-77.ts`), registered in `run.ts`; the family label on every entry; the body from
   the table above by its form call; the mark from `marks.ts` at the family's slot; the
   description 60–110 characters; Lucide's spelling in `aliases`.
2. `tsx scripts/review/precheck.mts scripts/draw/icons/batch-NN.ts` — size band,
   centring, live area, before a build.
3. `pnpm icons:build && pnpm icons:optimize`.
4. `pnpm icons:validate` — 0 failed, 0 warnings.
5. `pnpm icons:audit <slugs>` — no outliers; a named exception carries a reason.
6. `npx tsx scripts/review/twins.mts <slugs>` — no new pair ≥ 0.88 IoU; 0.72–0.88 looked
   at and either redrawn or recorded below as family grammar (plus/minus, mirrored
   direction, mark families).
7. `pnpm icons:duplicates --perceptual` — **new gate**, once per round, 0 failed. What
   the Nightly runs.
8. **Contact sheet** at 24 px beside the closest existing siblings (`sheet.mjs`);
   anything mushy, ambiguous or off-voice is redrawn in this round.
9. A green round is a local commit. Push cadence is the user's call; a push touching
   `packages/` mints a patch release by itself.

## Rounds

One family per round where it is big enough, otherwise two or three that share a body
register. ~35–45 icons each, so a family's grammar is settled in one sitting and the
scan sees the whole family at once.

| round | batch | families (body) | icons |
|---|---|---|---|
| 0 | edit only | aliases above | 0 |
| 1 | batch-77 | document (page) | 33 |
| 2 | batch-78 | folder (folder) · user (figure) | 33 |
| 3 | batch-79 | chat (bubble) · calendar (calendarParts) · time (CLOCK_L) | 32 |
| 4 | batch-80 | panel · layout (frame) · align (rails) | 33 |
| 5 | batch-81 | list · text (rails) · grid · table (frame) | 42 |
| 6 | batch-82 | arrow | 33 |
| 7 | batch-83 | chevron · corner · move | 29 |
| 8 | batch-84 | git (chain) · clipboard · monitor (frame) | 35 |
| 9 | batch-85 | mail · database (machine) · bell · shield · cloud | 37 |
| 10 | batch-86 | chart (axes) | 14 (+ spares) |
| 11–13 | batch-87…89 | optional families, in the order the misses ask | ≤ 120 |

After round 10: full audit, full twins, full perceptual scan, refresh the hardcoded
counts (README badges and lines, the contribute page, every package README and
package.json description, Flutter pubspec + CHANGELOG), `pnpm icons:generate`, one
push, one minor release.

## The demand loop

Nothing in the optional list is drawn on a guess. Two signals decide the order:

- `search-miss` — the Vercel Analytics event fired from the browser, the search page and
  the palette when a query of two or more characters finds nothing
  (`apps/web/lib/search-miss.ts`, once per query per session; visible on paid plans).
- Icon-request issues — every zero-result state on the site links to the
  `icon-request.yml` template with the query prefilled.

Read both before each optional round. A name that shows up in either jumps the queue;
a family nobody asked for stays undrawn.

## Core — ~320

Names are the set's; the Lucide spelling in brackets is the alias. Concepts the set
already has are not listed (they are in Round 0).

### document — page body, SMALL @ 12 (33)
document-remove [file-minus], document-search, document-lock, document-key,
document-json, document-text, document-image, document-video, document-audio
[file-audio, file-music], document-archive, document-spreadsheet, document-chart
[file-bar-chart, file-chart-column], document-edit [file-pen, file-pen-line],
document-clock, document-config [file-cog], document-input, document-output,
document-up, document-down, document-user, document-question,
document-stack, document-box, document-symlink, document-type, document-terminal,
document-scan, document-signature, document-badge, document-play, document-heart,
document-braces, document-digit, document-sliders

### folder — folder body, SMALL @ 13 (21)
folder-remove [folder-minus], folder-search, folder-lock, folder-key, folder-code,
folder-config [folder-cog], folder-git, folder-tree, folder-root, folder-sync,
folder-clock, folder-input, folder-output, folder-up, folder-down, folder-edit
[folder-pen], folder-archive, folder-heart, folder-dot, folder-symlink, folder-kanban

### user — figure body, mark at the right shoulder (12)
user-remove [user-minus], user-check, user-config [user-cog], user-key, user-lock,
user-search, user-edit [user-pen], user-star, user-shield, user-circle, user-square,
user-back [user-round-arrow-left]

### chat — bubble body, mark inside (10)
chat-add [message-square-plus, message-circle-plus], chat-remove, chat-quote
[message-square-quote], chat-alert [message-square-warning], chat-more
[message-square-more, message-circle-more], chat-dashed [message-square-dashed],
chat-diff [message-square-diff], chat-dot [message-square-dot], chat-text
[message-square-text], chat-question [message-circle-question]

### calendar — calendarParts, SMALL @ 15 (11)
calendar-days, calendar-remove [calendar-minus], calendar-clock, calendar-search,
calendar-sync, calendar-config [calendar-cog], calendar-heart, calendar-fold,
calendar-up [calendar-arrow-up], calendar-down [calendar-arrow-down], calendar-1

### time — CLOCK_L + right mark (11)
time-check [clock-check], time-add [clock-plus], time-fading [clock-fading],
time-arrow-up, time-arrow-down, time-arrow-left, time-arrow-right [clock-arrow-*],
alarm-clock, alarm-clock-off, alarm-clock-check, alarm-clock-add

### panel — frame 2,4,20,16 gap 4 (13)
panel-right, panel-left-open, panel-left-close, panel-right-open, panel-right-close,
panel-top-open, panel-top-close, panel-bottom-open, panel-bottom-close,
panel-left-dashed, panel-right-dashed, panel-top-dashed, panel-bottom-dashed

### layout — frame 2,4,20,16 (7)
layout-dashboard, layout-grid, layout-list, layout-template, layout-panel-left,
layout-panel-top, layout-freeform

### align — rails (13)
align-justify, align-start-horizontal, align-start-vertical, align-center-horizontal,
align-center-vertical, align-end-horizontal, align-end-vertical,
align-horizontal-distribute-center, align-vertical-distribute-center,
align-horizontal-space-between, align-vertical-space-between,
align-horizontal-justify-center, align-vertical-justify-center

### list — rails with dots, right mark (15)
list-check, list-checks, list-todo, list-ordered, list-tree, list-filter, list-add
[list-plus], list-remove [list-minus, list-x], list-start, list-end,
list-indent-increase, list-indent-decrease, list-restart, list-video, list-music

### text — rails (14)
text-wrap, text-quote, text-select, text-cursor-input, text-search, text-initial,
text-align-start, text-align-center, text-align-end, text-align-justify, heading,
heading-1, heading-2, heading-3

### arrow — shaft + head (33)
arrow-up-left, arrow-down-right, arrow-down-left, arrow-left-right, arrow-up-down,
arrow-right-left, arrow-down-up, arrow-up-to-line, arrow-down-to-line,
arrow-left-to-line, arrow-right-to-line, arrow-up-from-line, arrow-down-from-line,
arrow-left-from-line, arrow-right-from-line, arrow-up-from-dot, arrow-down-to-dot,
arrow-down-a-z, arrow-up-a-z, arrow-down-z-a, arrow-up-z-a, arrow-down-0-1,
arrow-up-0-1, arrow-down-1-0, arrow-up-1-0, arrow-down-narrow-wide,
arrow-down-wide-narrow, arrow-up-narrow-wide, arrow-up-wide-narrow, arrow-big-up,
arrow-big-down, arrow-big-left, arrow-big-right

### chevron (10) · corner (8) · move (11)
chevrons-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up-down,
chevrons-down-up, chevrons-left-right, chevrons-right-left, chevron-first, chevron-last ·
corner-down-left, corner-down-right, corner-up-left, corner-up-right, corner-left-down,
corner-left-up, corner-right-down, corner-right-up · move-horizontal, move-vertical,
move-diagonal, move-up, move-down, move-left, move-right, move-up-left, move-up-right,
move-down-left, move-down-right

### git — chain nodes (13)
git-branch-add [git-branch-plus], git-branch-remove [git-branch-minus],
git-commit-vertical, git-compare, git-compare-arrows, git-fork, git-graph,
git-merge-conflict, git-pull-request, git-pull-request-closed, git-pull-request-draft,
git-pull-request-create, git-pull-request-arrow

### clipboard — board + clip, SMALL @ 14 (10)
clipboard-check, clipboard-copy, clipboard-paste, clipboard-list, clipboard-add
[clipboard-plus], clipboard-remove [clipboard-minus, clipboard-x], clipboard-edit
[clipboard-pen, clipboard-pen-line], clipboard-clock, clipboard-signature, clipboard-type

### monitor — screen + stand, SMALL @ 10.5 (12)
monitor-check, monitor-off, monitor-play, monitor-pause, monitor-stop, monitor-up,
monitor-down, monitor-config [monitor-cog], monitor-dot, monitor-cloud,
monitor-smartphone, monitor-speaker

### mail — envelope (9)
mail-open, mail-check, mail-add [mail-plus], mail-remove [mail-minus, mail-x],
mail-search, mail-alert [mail-warning], mail-clock, mail-question, mail-badge

### database — machine + rows, BIG @ 11 (8)
database-add [database-plus], database-remove [database-minus, database-x],
database-check, database-search, database-backup, database-zap, database-arrow-up,
database-arrow-down

### table (8) · grid (5)
table-2, table-config, table-properties, table-of-contents, table-cells-merge,
table-cells-split, table-columns-split, table-rows-split · grid-3x3, grid-3x2,
grid-2x2-check, grid-2x2-add [grid-2x2-plus], grid-2x2-remove [grid-2x2-x]

### bell — right-top badge (7)
bell-ring, bell-off, bell-dot, bell-add [bell-plus], bell-remove [bell-minus],
bell-check, bell-electric

### shield — shield body, SMALL @ 11 (10)
shield, shield-remove [shield-minus], shield-half, shield-keyhole, shield-lock,
shield-ban, shield-question, shield-user, shield-config [shield-cog], shield-ellipsis

### chart — axes (14)
chart-column, chart-column-increasing, chart-column-decreasing, chart-column-stacked,
chart-bar-big, chart-bar-increasing, chart-bar-decreasing, chart-bar-stacked,
chart-gantt, chart-network, chart-spline, chart-no-axes-column,
chart-no-axes-combined, chart-no-axes-gantt

### cloud — cloud body, SMALL @ 12 (3)
cloud-sync, cloud-backup, cloud-config [cloud-cog]

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
and every one would compete with a generalist set on its own ground.

## Known risks

- **Mark saturation on one body.** Thirty-three marks on the page body. The 1k rounds
  showed the page and machine bodies carry small inner marks badly (twins at 0.88–1.00):
  marks here are `SMALL` from marks.ts at the family slot, one per icon, and the family
  label keeps the scan honest. A mark that cannot be read at 16 px is a spare, not a
  compromise.
- **Alias collisions.** A Lucide spelling used as an alias must not already be a slug or
  an alias elsewhere (`icons:validate` checks; the round stops on a hit).
- **Old near-twin left alone**: arrow-back ≈ arrow-left at 0.010 mean distance. Not this
  plan's problem, but the arrow round is the moment to give arrow-back its bar.
- **Count refreshes** are still hand-edited in README, the contribute page and every
  package description — same checklist as the 1k plan, same one push at the end.
