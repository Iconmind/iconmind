/**
 * The shapes an icon is drawn from.
 *
 * One path per shape, stroked, and nothing derived from it. The set's language is open
 * silhouettes — shapes that stop short of closing — and a shape with no inside cannot be
 * turned into a solid drawing worth having: the result is a band exactly as wide as the
 * stroke that drew it, indistinguishable from the outline it came from.
 *
 * That is what makes this file short. Three engines came before it, and all three existed
 * to compute a solid counterpart for each shape. The first offset composed paths: winding
 * -2 painted crossings back in as ink, mitres ran past the live area, and thin bodies came
 * out identical to their outlines anyway. The second had those paths typed by hand — three
 * of the first five were wrong. The third computed them correctly, and produced a drawing
 * with no job. The counterpart is gone, and with it every offset, band and winding rule.
 *
 * Every constructor asserts before it returns. A run too short to survive bold, an angle
 * that is not one of the three, a point off the half-unit grid — none can be built, so none
 * can reach a file. **Refuse, do not repair.**
 */
import { GRID_SNAP, ANCHOR_MIN, ANCHOR_MAX, MIN_ELEMENT_SIZE, WEIGHTS } from "@iconmind/shared";

/** The heaviest weight is what a segment has to survive; check against that, not the master. */
const MIN_RUN = MIN_ELEMENT_SIZE * (WEIGHTS.bold / WEIGHTS.regular);

/** 0, 45 and 90 only. Thirty and sixty are what made the previous set carry 604 waivers. */
const ANGLES = [0, 45, 90, 135, 180, -45, -90, -135] as const;
const ANGLE_TOLERANCE = 1.5;

/** How much of the top an open silhouette leaves: degrees for a circle, units for an edge. */
export const GAP_DEG = 50;
export const GAP = 6;
/** How far a chamfer cuts across a corner. */
export const CHAMFER = 4;

export interface Shape {
  /** Path data. Stroked in every cell; the weight is an attribute, not a second drawing. */
  d: string;
  /**
  * True when the shape has mass — when filling its path shows the object rather than a
  * sliver of it. This is what the duotone tint lands on.
  *
  * An open silhouette still has mass: SVG closes a fill across the gap, so an open ring
  * tints as a disc with a bite taken out of it and an open frame tints as its own box. A
  * tick, an arrowhead, a caret and a rail do not, and filling one paints a wedge that
  * reads as a mistake. Constructors that are silhouettes set this themselves; an open
  * polyline that is a body says so with `body()`.
  */
  closed: boolean;
  /**
   * A closed shape too small to read as mass — a dot mark (disc r ≤ 2). It still takes the
   * fill tint, but it must not decide the icon HAS a body: an icon whose only closed shape
   * is a dot would otherwise tint a two-unit speck and leave the drawing itself untinted,
   * which reads as "no duotone at all".
   */
  small?: boolean;
  /** An interior edge of a solid — a fold, a rim, a seam. Never tinted. */
  detail?: boolean;
  /** Why a hand-written path exists, for the shapes no constructor can express. */
  why?: string;
}

type Pt = readonly [number, number];

const n = (v: number) => (Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100));

function grid(v: number, what: string): number {
  if (Math.abs(v / GRID_SNAP - Math.round(v / GRID_SNAP)) > 1e-9)
    throw new Error(`${what}: ${v} is not a multiple of ${GRID_SNAP}`);
  return v;
}

function live(v: number, axis: string, what: string): number {
  if (v < ANCHOR_MIN - 1e-9 || v > ANCHOR_MAX + 1e-9)
    throw new Error(`${what}: ${axis}=${n(v)} is outside the live area ${ANCHOR_MIN}..${ANCHOR_MAX}`);
  return v;
}

function anchor(x: number, y: number, what: string): Pt {
  return [live(grid(x, what), "x", what), live(grid(y, what), "y", what)];
}

function segment(a: Pt, b: Pt, what: string) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < MIN_RUN - 1e-9)
    throw new Error(`${what}: a run of ${n(len)} vanishes at bold — minimum ${MIN_RUN}`);
  const deg = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  if (!ANGLES.some((t) => Math.abs(deg - t) <= ANGLE_TOLERANCE))
    throw new Error(`${what}: ${n(deg)}° is not 0, 45 or 90`);
}

const unit = (a: Pt, b: Pt): Pt => {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const len = Math.hypot(dx, dy);
  return [dx / len, dy / len];
};

/* ── Primitives ──────────────────────────────────────────────────────────────────── */

/** A horizontal run. */
export function row(y: number, x0: number, x1: number): Shape {
  const a = anchor(x0, y, "row"), b = anchor(x1, y, "row");
  segment(a, b, "row");
  return { d: `M${n(a[0])} ${n(a[1])}H${n(b[0])}`, closed: false };
}

/** A vertical run. */
export function col(x: number, y0: number, y1: number): Shape {
  const a = anchor(x, y0, "col"), b = anchor(x, y1, "col");
  segment(a, b, "col");
  return { d: `M${n(a[0])} ${n(a[1])}V${n(b[1])}`, closed: false };
}

/** A chain of runs, every one on a house angle and long enough to survive bold. */
export function poly(points: readonly Pt[], closed = false): Shape {
  if (points.length < 2) throw new Error("poly: needs two points");
  const p = points.map(([x, y]) => anchor(x, y, "poly"));
  const chain = closed ? [...p, p[0]!] : p;
  for (let i = 1; i < chain.length; i++) segment(chain[i - 1]!, chain[i]!, "poly");
  const d = p.map(([x, y], i) => `${i ? "L" : "M"}${n(x)} ${n(y)}`).join("") + (closed ? "Z" : "");
  return { d, closed };
}

/**
 * The three sizes a circle may be when it is a mark rather than a body.
 *
 * A circle in this set does one of four jobs: it is a point (the dot of an exclamation, a
 * bullet, a status light), a node (a step in a chain, a vertex in a graph), a core (the
 * middle of a body, the pupil of an eye), or it is the body itself.
 *
 * The first three are marks and they have a scale — 1, 2, 3. The fourth does not, because a
 * body's radius is decided by what it has to hold: `search`'s lens is 7 because that is what
 * fits with its handle, and `globe` is 9 because that is the canvas.
 *
 * Measured before this rule, the marks were drawn at five radii — 1, 1.5, 2, 2.5 and 3 —
 * across 100 discs. `warning`'s dot was 1, `more-horizontal`'s 1.5, `pipeline`'s node 2,
 * `dag`'s 2.5, `network`'s 3. None was wrong beside another; all five together were not a
 * scale.
 */
const MARK_RADII = [1, 2, 3];
/** At and above this a circle is a body, and its radius is whatever the drawing needs. */
const BODY_RADIUS = 3.5;

/** A circle. Its radius is its own; only its centre is held to the grid. */
export function disc(cx: number, cy: number, r: number): Shape {
  const [x, y] = anchor(cx, cy, "disc");
  if (r < 1) throw new Error(`disc: a radius of ${r} is a dot nobody can see move`);
  if (r < BODY_RADIUS && !MARK_RADII.includes(r))
    throw new Error(
      `disc: a radius of ${n(r)} is not on the set's mark scale — ${MARK_RADII.join(", ")} ` +
      `for a point, a node and a core. Above ${BODY_RADIUS} a circle is a body and may be ` +
      `any size the drawing needs`);
  for (const [v, axis] of [[x - r, "x"], [x + r, "x"], [y - r, "y"], [y + r, "y"]] as const)
    live(v as number, axis as string, "disc");
  const d = `M${n(x - r)} ${n(y)}a${n(r)} ${n(r)} 0 1 0 ${n(r * 2)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-r * 2)} 0Z`;
  return { d, closed: true, small: r <= 2 };
}

/**
 * A rounded rectangle.
 *
 * Both straight sides have to be a real run, or the corners meet and the shape is a stadium
 * pretending to be a box — which is how a 4×9 capsule once ended up with five units of wall
 * nobody had accounted for, two units from its neighbour.
 */
/**
 * The two corner radii this set has, and the reason there are exactly two.
 *
 * A container is rounded at 3 and a solid object at 2. That distinction carries meaning —
 * `frame()` is a thing that holds something and `rect()` is a thing — so the corner says
 * which one you are looking at before you have read anything else.
 *
 * Measured before this rule existed, the set had six different radii doing the job of these
 * two: 1, 1.5, 2, 2.5, 3 and 4, spread across 45 call sites. None of them was wrong on its
 * own. Side by side they were the difference between a set and a collection.
 *
 * The exception is a capsule, whose radius is half its short side by definition. There is no
 * third choice.
 */
export const CORNER_SOLID = 2;
export const CORNER_CONTAINER = 3;

function corner(r: number, short: number, want: number, what: string): number {
  if (r === want || Math.abs(r - short / 2) < 1e-9) return r;
  throw new Error(
    `${what}: a corner radius of ${n(r)} is not on the set's scale — ${want} for a ` +
    `${what === "rect" ? "solid" : "container"}, or ${n(short / 2)} to make it a capsule`);
}

export function rect(x: number, y: number, w: number, h: number, r: number): Shape {
  anchor(x, y, "rect");
  anchor(x + w, y + h, "rect");
  corner(r, Math.min(w, h), CORNER_SOLID, "rect");
  for (const [side, len] of [["width", w - 2 * r], ["height", h - 2 * r]] as const)
    if (len > 1e-9 && len < MIN_RUN - 1e-9)
      throw new Error(`rect ${w}×${h} r${r}: ${n(len)} of straight ${side} is a stub`);
  const [X, Y, R] = [x, y, r].map(n);
  const d = `M${X} ${n(y + r)}A${R} ${R} 0 0 1 ${n(x + r)} ${Y}H${n(x + w - r)}` +
            `A${R} ${R} 0 0 1 ${n(x + w)} ${n(y + r)}V${n(y + h - r)}` +
            `A${R} ${R} 0 0 1 ${n(x + w - r)} ${n(y + h)}H${n(x + r)}` +
            `A${R} ${R} 0 0 1 ${X} ${n(y + h - r)}Z`;
  return { d, closed: true };
}

/** An arc, in degrees clockwise from three o'clock. */
export function arc(cx: number, cy: number, r: number, from: number, to: number): Shape {
  anchor(cx, cy, "arc");
  const at = (deg: number): Pt => {
    const t = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  };
  const [ax, ay] = at(from), [bx, by] = at(to);
  // Endpoints fall where the radius and the angle put them — derived, not authored — so they
  // are held to the live area and not to the grid. At r=10 only the four cardinals land on a
  // half-unit, which would make every gap in an open silhouette a full quadrant.
  live(ax, "x", "arc"); live(ay, "y", "arc"); live(bx, "x", "arc"); live(by, "y", "arc");
  const large = ((to - from) % 360 + 360) % 360 > 180 ? 1 : 0;
  return {
    d: `M${n(ax)} ${n(ay)}A${n(r)} ${n(r)} 0 ${large} 1 ${n(bx)} ${n(by)}`,
    closed: false,
  };
}

/* ── The set's own language ──────────────────────────────────────────────────────── */

/**
 * A circle that will not close, with the gap at the top.
 *
 * The gap is not decoration. It is the same idea as the hollow middle a modifier sits in,
 * so the family system falls out of the language rather than being fitted to it — and at
 * eighteen pixels it is what separates this from every closed ring in every other set.
 */
export function openDisc(cx: number, cy: number, r: number, gapDeg = GAP_DEG): Shape {
  return { ...arc(cx, cy, r, 270 + gapDeg / 2, 270 - gapDeg / 2), closed: true };
}

/**
 * A frame: the shape that holds something else.
 *
 * One constructor, because a frame's two forms have to come from one set of corners. Both
 * outlines — the outer edge at half a stroke out, the inner at half a stroke in — are the
 * same corner list at two offsets, so the painted form is a band with the same gap and the
 * same chamfer as the stroked one, and it cannot disagree with it.
 *
 * A frame is **open** by default. That is the language, and it is also what makes a frame
 * usable: painted, an open frame is a band, so whatever sits inside it stays visible. A
 * closed frame fills solid and swallows its own contents — which is exactly how `terminal`
 * came out as a black slab with the prompt gone.
 *
 * `chamfer` cuts the top-left corner at 45° instead of turning it: the register for things
 * that are machines, announced at the corner the eye reaches first.
 */
export function frame(
  x: number, y: number, w: number, h: number, r: number,
  opts: { gap?: number; chamfer?: number } = {},
): Shape {
  const gap = opts.gap ?? GAP;
  const cut = opts.chamfer ?? 0;
  corner(r, Math.min(w, h), CORNER_CONTAINER, "frame");
  anchor(x, y, "frame");
  anchor(x + w, y + h, "frame");
  if (cut) anchor(x + cut, y + cut, "frame");
  // The gap is centred on the top edge's own straight run, not on the box. A chamfer eats
  // into that run from the left only, so centring on the box left `model` with a 1-unit lip
  // on one side and a 2-unit one on the other — two stubs, in eight cells, from one default.
  const from = x + Math.max(r, cut), to = x + w - r;
  const mid = (from + to) / 2;
  const right = mid + gap / 2, left = mid - gap / 2;
  const lip = (to - from - gap) / 2;
  // With no gap the path still starts in the middle of the top edge and comes back to it,
  // so the edge is drawn as two halves and each of them has to survive bold on its own.
  // A 7-wide frame with a 2-unit cut leaves halves of 1.5, which shipped once as a stub.
  if (!gap && lip < MIN_RUN - 1e-9)
    throw new Error(
      `frame: a closed ${n(to - from)}-unit edge is drawn as two ${n(lip)}-unit halves — ` +
      `minimum ${MIN_RUN} each. Widen the shape or shrink its corners`);
  if (gap && lip < MIN_RUN - 1e-9)
    throw new Error(
      `frame: a gap of ${gap} across a ${n(to - from)}-unit edge leaves ${n(lip)}-unit lips — ` +
      `minimum ${MIN_RUN}. Narrow the gap or widen the shape`);
  grid(left, "frame gap"); grid(right, "frame gap");

  // The cut takes a bite out of the left wall as well as the top edge. On a short frame
  // that bite can leave a run of 2 between the chamfer and the bottom corner — legal at
  // regular, gone at bold, and it shipped that way in `mcp-server` before this check.
  const wall = cut ? h - cut - r : h - 2 * r;
  if (cut && wall < MIN_RUN - 1e-9)
    throw new Error(
      `frame: a chamfer of ${cut} on a ${h}-tall shape leaves a ${n(wall)}-unit wall — ` +
      `minimum ${MIN_RUN}. Shorten the cut or make it taller`);

  const R = Math.max(r, 0.5);
  const A = (rx: number, ry: number) => `A${n(R)} ${n(R)} 0 0 1 ${n(rx)} ${n(ry)}`;
  // Clockwise from the right lip of the gap, all the way round to the left one.
  const d =
    `M${n(right)} ${n(y)}H${n(x + w - R)}${A(x + w, y + R)}` +
    `V${n(y + h - R)}${A(x + w - R, y + h)}` +
    `H${n(x + R)}${A(x, y + h - R)}` +
    (cut ? `V${n(y + cut)}L${n(x + cut)} ${n(y)}` : `V${n(y + R)}${A(x + R, y)}`) +
    `H${n(left)}`;

  // A frame has mass either way: open, the tint closes across the gap and paints the box.
  return { d: gap ? d : d.replace(/H[\d.]+$/, "Z"), closed: true };
}

/**
 * A path no constructor can express, and the reason it exists.
 *
 * The reason is required. Every hand-written path this project has shipped that turned out
 * wrong was one where nobody had written down what it was for.
 */
export function raw(d: string, why: string, closed = false): Shape {
  if (why.length < 12) throw new Error("raw: say what this is and why no constructor makes it");
  return { d, closed, why };
}

/** A closed hand-written shape: one that encloses an area, so the duotone tint lands on it. */
export const area = (d: string, why: string): Shape => raw(d, why, true);

/** An interior edge: it describes a surface rather than bounding an area, so it stays untinted. */
export const detail = (s: Shape): Shape => ({ ...s, detail: true });

/**
 * Marks an open run as the object's body, so the duotone tint fills it.
 *
 * For a polyline this cannot be inferred. A folder, a page, a bookmark and a funnel are all
 * open chains that enclose the thing they name; a tick and an arrowhead are open chains
 * whose filled form is a wedge nobody drew. The difference is what the author meant, so the
 * author says it.
 */
export const body = (s: Shape): Shape => ({ ...s, closed: true });
