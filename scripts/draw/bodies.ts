/**
 * The bodies every icon is built from, and the reason there is a fixed list of them.
 *
 * A thousand icons drawn one at a time drift. Not in any single drawing — in the accumulation:
 * one box is 16 wide and the next is 17, one ring breaks at 50° and the next at 45°, and by
 * the four-hundredth nobody can say what the set's proportions are because there aren't any.
 * The defence is not discipline, it is a short list of bodies that every icon composes from,
 * so a proportion is decided once and then inherited.
 *
 * Two registers, and the difference carries meaning rather than decoration:
 *
 * - **chamfered** — one corner cut at 45°, for things that are machines: a model, a database,
 *   a processor, a terminal. The cut is at the top left, the first corner the eye reaches.
 * - **rounded** — for things a person handles: a panel, a page, a calendar, a card.
 *
 * Every body is open at the top, and the gap is not decoration either: it is the same hollow
 * a modifier sits in, so `model` and `model-add` are the same drawing with something in the
 * middle rather than two drawings that have to be kept in step.
 */
import { area, col, disc, frame, openDisc, poly, row, body, type Shape, raw } from "./forms.ts";

/* ── Machines: the chamfered register ───────────────────────────────────────────── */

/** The standard machine: a 16×16 chamfered box, centred, with room for a core. */
export const machine = (): Shape => frame(4, 4, 16, 16, 3, { chamfer: 4, gap: 4 });

/** A machine that holds text or a screen: wider, shorter, same cut. */
export const machineWide = (): Shape => frame(2, 4, 20, 16, 3, { chamfer: 4 });

/** A machine small enough to leave room for pins or ports around it. */
export const machineInset = (): Shape => frame(5, 5, 14, 14, 3, { chamfer: 3, gap: 3 });

/* ── Things a person handles: the rounded register ──────────────────────────────── */

/** A field, a card, a message: something with content in it, wider than tall. */
export const panel = (): Shape => frame(3, 6, 18, 12, 3);

/** A window, a sheet, a month: something with content in it, nearly square. */
export const window_ = (): Shape => frame(3, 5, 18, 16, 3);

/** A chip, a tag, a fragment of something longer. */
export const pill = (): Shape => frame(3, 9, 18, 6, 3, { gap: 4 });

/* ── Silhouettes ────────────────────────────────────────────────────────────────── */

/** The set's opening sentence: a circle that will not close. */
export const ring = (): Shape => openDisc(12, 12, 10);

/** A ring's angular twin — structure rather than continuity. */
export const lattice = (): Shape => body(poly([[15, 7], [20, 12], [12, 20], [4, 12], [9, 7]]));

/** What sits in the middle of a body, and what a modifier displaces. */
export const core = (r = 4): Shape => disc(12, 12, r);

/** A folder: the tab is at the top left and steps up, and the gap is past the step. */
export const folder = (): Shape =>
  body(poly([[20, 7], [20, 20], [4, 20], [4, 4], [9, 4], [12, 7], [16, 7]]));

/** A page: the fold is the break, because a page already has one place it opens. */
export const page = (): Shape => body(poly([[13, 3], [6, 3], [6, 21], [18, 21], [18, 8]]));

/**
 * A shield: the body for things that protect.
 *
 * Squared at the top and pointed at the bottom, because the rounded shield everyone draws
 * needs curves at angles this set does not use. The point is two 45° runs meeting, which is
 * the same corner `embedding` and `model` are made of.
 */
export const shield = (): Shape =>
  body(poly([[15, 5], [20, 5], [20, 13], [12, 21], [4, 13], [4, 5], [9, 5]]));

/**
 * A cloud: three lobes, each an arc whose radius is set by the chord it has to span.
 *
 * `raw()` rather than a constructor, because a lobe's radius is decided by its chord and no
 * constructor in `forms.ts` takes one. `lift` moves the whole shape up to leave room for an
 * arrow under it, which is the only thing four concepts wanted to change about it.
 */
export const cloud = (lift = 0): Shape =>
  area(
    `M4 ${18 - lift}A4 4 0 0 1 6 ${10.5 - lift}A5 5 0 0 1 15.5 ${9 - lift}A5.5 5.5 0 0 1 20 ${18 - lift}Z`,
    "three lobes, each an arc whose radius is set by the chord it spans — 4 across 7.76, "
    + "5 across 9.62, 5.5 across 10.06 — which no constructor takes as an argument",
  );

/**
 * A page with its top-left corner cut, which is how this set says a thing belongs to MCP.
 *
 * The chamfer is the machine register, and a protocol's artefacts are machine things: a
 * resource is a file a server hands over rather than a file somebody wrote. `page()` and
 * this differ by one corner, which is the whole claim.
 */
export const machinePage = (): Shape =>
  body(poly([[13, 3], [9, 3], [6, 6], [6, 21], [18, 21], [18, 8]]));

/**
 * A server: a tall chamfered tower with a port and a status light along its foot.
 *
 * The identifying detail is at the bottom rather than through the middle, which is the whole
 * reason this body exists. `mcp-server` was two stacked racks first — a good drawing, and one
 * with no hollow anywhere in it, so `mcp-server-check` had nowhere to put its mark except
 * over a rack. A body that a family hangs off has to keep its middle clear.
 */
export const server = (): Shape[] => [
  frame(4, 3, 16, 18, 3, { chamfer: 3, gap: 3 }),
  row(18, 7, 12),
  disc(16, 18, 1),
];

/** A ribbon with a notch cut into it, open at the top where the language opens everything. */
export const bookmark = (): Shape =>
  body(poly([[15, 3], [18, 3], [18, 21], [12, 15], [6, 21], [6, 3], [9, 3]]));


/** A key with a fob head: the rounded square is the hollow a mark sits in, the blade
 * below carries two bites. A round bow always came out a lollipop — the head must hold
 * a mark, so it cannot shrink, and whatever angle the shaft took it read as a stick. */
export const key = (): Shape[] => [frame(4.5, 2, 15, 13, 3, { gap: 4 }), col(12, 15, 21),
  row(18, 12, 15), row(21, 12, 14.5)];

/** A tray, mouth up: what things are put into or taken out of. */
export const tray = (): Shape => body(poly([[4, 15], [4, 19], [20, 19], [20, 15]]));

/**
 * The cycle: the one rotation loop this set draws — and it is not a circle.
 *
 * This set's identity is the box: open silhouettes, rounded rectangles, 45° cuts. Its
 * rotation glyph is the same square loop the repeat/ci/cd family already speaks — a rounded
 * frame open at the top, the chevron head at the gap's end pointing the way round. Every
 * icon that means "goes round" is this body with a different mark in its hollow.
 *
 * The circle version lasted one day: legal, tidy, and indistinguishable from every other
 * set's rotation arrows. A loop that shares the set's own body language is the one nobody
 * else has.
 */
export const cycle = (dir: "cw" | "ccw" = "cw"): Shape[] =>
  dir === "cw"
    ? [
        frame(3, 5, 18, 15, 3, { gap: 6 }),
        poly([[12, 2], [15, 5], [12, 8]]),
      ]
    : [
        frame(3, 5, 18, 15, 3, { gap: 6 }),
        poly([[12, 2], [9, 5], [12, 8]]),
      ];
