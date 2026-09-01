/**
 * The marks that go in the middle of a body, and why they are a fixed list.
 *
 * This is what the language was built for. A concept and its variants — `agent`,
 * `agent-add`, `agent-check`, `agent-off` — are one body with different things in its
 * hollow, so the body is byte-identical across the family and the family cannot drift.
 *
 * The set before this one hung a badge off the bottom-right corner instead. That meant
 * shrinking the body to make room, which made every variant a different drawing from its
 * own base, and it meant the badge collided with whatever the body's corner happened to
 * contain. Ninety families were then "fixed" by deleting each body's last shape to clear a
 * middle — which is usually the shape that names the icon. A speaker lost its waves, a flag
 * its banner, `user` became a pin. That is the failure this file exists to make impossible.
 *
 * Two sizes, not a scale factor. `BIG` fits `ring()`, `machine()` and `window_()` with three
 * units to spare; `SMALL` is for a hollow that narrows, like `shield()`, whose diagonals
 * close in below the middle. A continuous scale was tried first and produced anchors off the
 * half-unit grid and runs at 33° — every mark has to land on the grid at every size it is
 * offered at, and two sizes that do is worth more than a factor that does not.
 *
 * `cy` moves the whole mark up or down for a body whose hollow is not centred. `shield()`
 * needs it: its widest clear span is two units above the canvas centre.
 */
import { arc, col, disc, poly, raw, row, type Shape } from "./forms.ts";

/** Fits `ring()`, `machine()`, `window_()`, `panel()` at their full hollow. */
export const BIG = 4;
/** Fits a hollow that narrows: `shield()`, and anything with a diagonal wall. */
export const SMALL = 3;

type H = typeof BIG | typeof SMALL;

/** Add one. */
export const add = (h: H = BIG, cy = 12): Shape[] =>
  [col(12, cy - h, cy + h), row(cy, 12 - h, 12 + h)];

/** Take one away. */
export const remove = (h: H = BIG, cy = 12): Shape[] => [row(cy, 12 - h, 12 + h)];

/**
 * It passed.
 *
 * Written out per size rather than scaled. The tick's short arm is half the long one, and at
 * an arbitrary `h` that ratio puts its elbow at a quarter unit — off the grid, and the run
 * into it lands at an angle the set does not use.
 */
export const check = (h: H = BIG, cy = 12): Shape[] =>
  h === BIG
    ? [poly([[8, cy], [10, cy + 2], [16, cy - 4]])]
    : [poly([[9, cy], [11, cy + 2], [15, cy - 2]])];

/**
 * Something needs looking at.
 *
 * The bar stops three units short of the dot rather than a proportion of `h`: the gap in an
 * exclamation mark is a constant of the glyph, and scaling it makes the mark read as a
 * lower-case i at small sizes and as a broken bar at large ones.
 */
export const alert = (h: H = BIG, cy = 12): Shape[] =>
  [col(12, cy - h, cy + h - 3), disc(12, cy + h, 1)];

/**
 * Turned off, or failed.
 *
 * The cross is inscribed in the *circle* of radius `h`, not its box, so `-off` and `-check`
 * sit at the same visual weight inside the same hollow. Two separate paths, not one with two
 * subpaths: a single shape whose runs cross winds to -2 at the crossing, which is still ink,
 * and that is what painted a cross solid in the set before this one.
 */
export const off = (h: H = BIG, cy = 12): Shape[] => {
  const d = h === BIG ? 3 : 2;
  return [
    poly([[12 - d, cy - d], [12 + d, cy + d]]),
    poly([[12 + d, cy - d], [12 - d, cy + d]]),
  ];
};

/** Held, not stopped. Two bars, four apart, which is the least that survives bold. */
export const pause = (h: H = BIG, cy = 12): Shape[] =>
  [col(10, cy - h, cy + h), col(14, cy - h, cy + h)];

/**
 * Working on it. Uneven, because three level bars are a pause button.
 *
 * BIG only: at SMALL the outer bars come out two units long and the forge refuses them. No
 * icon asks for the small one, and widening them would change the eight that use the big one.
 */
export const working = (h: H = BIG, cy = 12): Shape[] => [
  col(7, cy - h + 2, cy + h - 2), col(12, cy - h, cy + h), col(17, cy - h + 2, cy + h - 2),
];

/**
 * Favourited.
 *
 * The proportions are `folder-heart`'s, which is where this shape was already being drawn by
 * hand: two lobes of radius h/2 meeting on the centre line, and a point h below them. Making
 * it a mark is what lets `favorite-label` and `folder-heart` carry the same heart instead of
 * two hearts that merely resemble each other.
 */
export const heartMark = (h: H = BIG, cy = 12): Shape[] =>
  [raw(`M${12 - h} ${cy}A${h / 2} ${h / 2} 0 0 1 12 ${cy}A${h / 2} ${h / 2} 0 0 1 ${12 + h} ${cy}L12 ${cy + h}Z`,
       "a heart is one line, not three strokes with visible seams", true)];

/* ── Marks that name a thing, not a state ───────────────────────────────────────── */

/*
 * The seven above answer "what happened to it": added, removed, checked, failed. These
 * answer "which kind of it", and they exist because the set kept drawing them by hand.
 * `folder-heart` and `favorite-label` were carrying two hearts that merely resembled each
 * other; now they carry the same one. That is the whole point — a family looks drawn by one
 * hand when the qualifier is literally the same path everywhere it appears.
 *
 * Same rules as the states: two sizes, a `cy` for a hollow that is not centred, every
 * diagonal at 45, every run clearing 2.5 at both sizes. Nothing here is wider than it is
 * tall, because the hollows that narrow — `shield()`, `page()`, a tag's point — are the
 * ones that decide what fits.
 *
 * What is NOT here is as deliberate: there is no heart *body*, no play *body*, no funnel or
 * coin or bolt body. Those shapes have no usable middle — a mark set in a heart lands on the
 * notch between its lobes and breaks the outline — so they can be the mark and never the
 * body. Both attempts to make them bodies were reverted.
 */

/** Labelled: a tag, point leading. */
export const tagMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h, cy - h], [12, cy - h], [12 + h, cy], [12, cy + h], [12 - h, cy + h]], true)];

/** Saved: a bookmark, notched at the foot. */
export const bookmarkMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h + 1, cy - h], [12 + h - 1, cy - h], [12 + h - 1, cy + h],
         [12, cy + 1], [12 - h + 1, cy + h]], true)];

/** Locked: the padlock, shackle above the body. */
export const lockMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h, cy], [12 + h, cy], [12 + h, cy + h], [12 - h, cy + h]], true),
   arc(12, cy, h - 1.5, 180, 360)];

/** Timed: a clock, hands at the quarter. */
export const clockMark = (h: H = BIG, cy = 12): Shape[] =>
  [disc(12, cy, h), col(12, cy - h, cy), row(cy, 12, 12 + h - 0.5)];

/** Run: the play triangle, sides at 45 so it fits a hollow that narrows. */
export const playMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h / 2, cy - h], [12 + h / 2, cy], [12 - h / 2, cy + h]], true)];

/** Stopped: the square a stop button is. */
export const squareMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h, cy - h], [12 + h, cy - h], [12 + h, cy + h], [12 - h, cy + h]], true)];

/** Idle: the sleeping Z. */
export const idleMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h, cy - h], [12 + h, cy - h], [12 - h, cy + h], [12 + h, cy + h]])];

/**
 * Filtered: the funnel.
 *
 * Written out per size, like `check`. At BIG it is the closed outline `filter` itself uses,
 * because a bare V inside a ring is `attention-head` — the two scored 0.046 apart until the
 * mouth was drawn. At SMALL the shoulders would come out 1.4 units, so it stays a V and a
 * stem, which no small hollow confuses with anything.
 */
export const funnelMark = (h: H = BIG, cy = 12): Shape[] =>
  h === BIG
    ? [poly([[12 - h, cy - h], [12 + h, cy - h], [12 + 2, cy - 2], [12 + 2, cy + h],
             [12 - 2, cy + h], [12 - 2, cy - 2]], true)]
    : [poly([[12 - h, cy - h], [12, cy], [12 + h, cy - h]]), col(12, cy, cy + h)];

/** A goal: the ring and the middle it is aimed at. */
export const targetMark = (h: H = BIG, cy = 12): Shape[] =>
  [disc(12, cy, h), disc(12, cy, 1)];

/** Keyed: bow above, shaft and tooth below. */
export const keyMark = (h: H = BIG, cy = 12): Shape[] =>
  [disc(12, cy - h + 1.5, 2), col(12, cy - h + 3.5, cy + h), row(cy + h - 1.5, 12, 14.5)];

/** An event: the bolt, two 45 runs and the flat between them. */
export const boltMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 + h, cy - h], [12, cy], [12 + h - 0.5, cy], [12 - 0.5, cy + h]])];

/** A place: the pin, head and point. */
export const pinMark = (h: H = BIG, cy = 12): Shape[] =>
  [disc(12, cy - h + 2, 2), poly([[12 - 2.5, cy + h - 2.5], [12, cy + h], [12 + 2.5, cy + h - 2.5]])];

/** A price: the coin on edge. */
export const coinMark = (h: H = BIG, cy = 12): Shape[] =>
  [disc(12, cy, h), col(12, cy - h + 1, cy + h - 1)];

/** A checkpoint: the flag, pole and banner. */
export const flagMark = (h: H = BIG, cy = 12): Shape[] =>
  [col(12 - h, cy - h, cy + h),
   // a plain banner, open at the pole - the pole is its left edge. The swallow-tail
   // notch it had read as a letter B once it sat in a hollow.
   poly([[12 - h, cy - h + 1], [12 + h - 1, cy - h + 1], [12 + h - 1, cy - h + 5],
         [12 - h, cy - h + 5]])];

/** Protected: the shield, squared above and pointed below like `shield()`. */
export const shieldMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h, cy - h], [12 + h, cy - h], [12 + h, cy], [12, cy + h], [12 - h, cy]], true)];

/** A model: the diamond `model` is built on. */
export const diamondMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12, cy - h], [12 + h, cy], [12, cy + h], [12 - h, cy]], true)];

/** A trend: the line that rises. */
export const trendMark = (h: H = BIG, cy = 12): Shape[] =>
  [poly([[12 - h, cy + h], [12 - 1, cy + 1], [12 + 1, cy + 3], [12 + h, cy + 3 - (h - 1)]])];

/** Searched: the lens and its handle. */
export const searchMark = (h: H = BIG, cy = 12): Shape[] =>
  [disc(12 - 1, cy - 1, h - 1), poly([[12 + h - 3.5, cy + h - 3.5], [12 + h, cy + h]])];

/** Listed: three short rows. */
export const listMark = (h: H = BIG, cy = 12): Shape[] =>
  [row(cy - h, 12 - h, 12 + h), row(cy, 12 - h, 12 + h), row(cy + h, 12 - h, 12 + h)];
