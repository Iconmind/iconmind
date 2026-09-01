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
import { arc, area, col, disc, frame, openDisc, poly, rect, row, body, type Shape, raw } from "./forms.ts";

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


/** `timer` with its hands left off: the crown says time, the dial is the hollow. */
export const dial = (): Shape[] => [arc(12, 14, 8, 295, 245), col(12, 3, 6), row(3, 9, 15)];


/** A flag flown big: full-height pole, the banner is the hollow a mark sits in.
 * Open at the pole - the pole is the banner's left edge, as flagMark does it. */
export const banner = (): Shape[] => [col(4, 3, 21), poly([[4, 4], [20, 4], [20, 16], [4, 16]])];


/** A padlock a size up from `lock`: the body is the hollow a mark sits in. */
export const padlock = (): Shape[] => [rect(5, 9.5, 14, 12, 2), arc(12, 9.5, 4, 180, 360)];


/** `filter`'s funnel cut short: mouth and stem only, so what passed can sit below.
 * A funnel converges at 45 - there is no room inside it, and there never will be. */
export const funnel = (): Shape =>
  body(poly([[9, 2.5], [3, 2.5], [10, 9.5], [10, 12], [14, 12], [14, 9.5], [21, 2.5], [15, 2.5]]));


/** A trophy: the bowl is the hollow a mark sits in. A goal drawn as a target has no
 * room anywhere - the centre is the bullseye's own - so the goal family holds a cup. */
export const trophy = (): Shape[] => [
  raw("M5.5 3V8.5A6.5 6.5 0 0 0 18.5 8.5V3", "a bowl is one line - two lips into the arc they share", false),
  col(12, 15, 20.5), row(20.5, 8.5, 15.5),
];


/** The runner's card: a tall closed card, a small play up top saying "this is a run",
 * the state below it - both inside one body. The composition Lucide's file-play class
 * uses; a play beside or stacked against its state kept reading as two glyphs. */
export const runCard = (): Shape[] =>
  [rect(3, 2, 18, 20, 2), poly([[11, 5], [11, 10], [13.5, 7.5]], true)];


/** A bracket pair: the hollow between them is where the block's content goes. The pair is
 * context-scratch's, byte for byte - the family that already holds things this way. */
export const brackets = (): Shape[] =>
  [poly([[7, 3], [3, 3], [3, 21], [7, 21]]), poly([[17, 3], [21, 3], [21, 21], [17, 21]])];


/** runCard's card with a bolt where the play sits: "this card is an event". The bolt
 * is drawn small, per size, the way funnelMark is - boltMark at SMALL is eight units
 * tall and two marks that size do not share a 20-unit card. */
export const eventCard = (): Shape[] =>
  [rect(3, 2, 18, 20, 2), poly([[14, 5], [11.5, 7.5], [14, 7.5], [11.5, 10]])];


/** A banknote: the wide bill with its value ticks at the sides, the state sitting
 * where the portrait circle goes. Money gets its own silhouette - a third card in a
 * row would have made every family the same shape with a different pip on top. */
export const banknote = (): Shape[] =>
  [rect(2, 6, 20, 12, 2), col(5.5, 10.5, 13.5), col(18.5, 10.5, 13.5)];


/** A clipboard: the board, and the clip straddling its top edge - two crossings, the
 * most the set allows, and exactly what a clip does. The list family's own silhouette. */
export const clipboard = (): Shape[] =>
  [rect(4, 5.5, 16, 15.5, 2), poly([[9.5, 7], [9.5, 2.5], [14.5, 2.5], [14.5, 7]])];


/** A bell flown big: the dome and its base bar, the clapper's spot left for a mark.
 * `bell` itself keeps its small dome and clapper; this is the notification body. */
export const bell = (): Shape[] => [arc(12, 17, 9, 180, 360), row(20, 3, 21)];

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
