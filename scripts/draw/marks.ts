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
import { col, disc, poly, row, type Shape } from "./forms.ts";

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

/** Working on it. Uneven, because three level bars are a pause button. */
export const working = (h: H = BIG, cy = 12): Shape[] => [
  col(7, cy - h + 2, cy + h - 2), col(12, cy - h, cy + h), col(17, cy - h + 2, cy + h - 2),
];
