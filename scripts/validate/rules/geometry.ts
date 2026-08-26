import {
  ANCHOR_MIN, ANCHOR_MAX, GRID_SNAP, MIN_ELEMENT_SIZE, MIN_STROKE_GAP,
  MAX_CROSSINGS, ALLOWED_ANGLES, ANGLE_TOLERANCE, ELEMENT_BUDGET_WARN,
  STROKE_WIDTH, WEIGHTS, DEFAULT_WEIGHT,
  elementExtents, type ParsedSvg, type Segment, type Weight,
} from "@iconmind/shared";
import type { Report } from "../../lib/report.ts";

const EPS = 0.05;
const round2 = (n: number) => Math.round(n * 100) / 100;

const isAxis = (s: Segment) => Math.abs(s.a.x - s.b.x) < EPS || Math.abs(s.a.y - s.b.y) < EPS;
const overlap = (a1: number, a2: number, b1: number, b2: number) =>
  Math.min(Math.max(a1, a2), Math.max(b1, b2)) - Math.max(Math.min(a1, a2), Math.min(b1, b2));

function intersects(p: Segment, q: Segment) {
  const d = (a: number, b: number, c: number, e: number) => a * e - b * c;
  const r = { x: p.b.x - p.a.x, y: p.b.y - p.a.y };
  const s = { x: q.b.x - q.a.x, y: q.b.y - q.a.y };
  const den = d(r.x, s.x, r.y, s.y);
  if (Math.abs(den) < 1e-9) return false;
  const t = d(q.a.x - p.a.x, s.x, q.a.y - p.a.y, s.y) / den;
  const u = d(q.a.x - p.a.x, r.x, q.a.y - p.a.y, r.y) / den;
  // true interior crossing — a T-junction at an endpoint does not count
  return t > 0.02 && t < 0.98 && u > 0.02 && u < 0.98;
}

/**
 * Two thresholds are stated for the master's stroke and have to move with the weight.
 * A 2-unit interior gap is clear air at stroke 2 and closed at stroke 2.5 — doc 03 §3.10
 * calls for exactly this, and without it every corrected `bold` icon would pass a check
 * that no longer means anything.
 */
export function checkGeometry(
  file: string,
  p: ParsedSvg,
  r: Report,
  weight: Weight = DEFAULT_WEIGHT,
  /**
   * Authoring rules apply to what a human wrote, and an `outline` cell is the declaration
   * verbatim. A cell that carries anything the declaration does not is checked by
   * `matrix/silhouette` and `matrix/ink-ordered` instead, which measure what it looks like
   * rather than how it is written.
   */
  authored = true,
) {
  const scale = WEIGHTS[weight] / STROKE_WIDTH;
  const minElement = MIN_ELEMENT_SIZE * scale;
  const minGap = WEIGHTS[weight] + MIN_STROKE_GAP;

  /**
   * Only stroked elements go into the stroke rules.
   *
   * A duotone tint carries `stroke="none"` and is a copy of geometry the outline already
   * has, so feeding it in makes every one of its edges collinear with itself: the first
   * derived set produced 456 collinear-overlap errors, every one of them an icon
   * complaining about its own tint.
   */
  // The root decides first: a cell whose <svg> says stroke="none" has children that say
  // nothing about stroke at all, and testing only the element read those as stroked.
  const rootStroked = p.root["stroke"] !== "none";
  // A halo (opacity + stroke-width, duotone's tint for mark-only icons) is likewise a copy
  // of geometry its own true strokes already carry — skip it for the same reason as the
  // body tint, or every mark complains about its own shadow.
  const stroked = (c: (typeof p.children)[number]) =>
    rootStroked && c.attrs["stroke"] !== "none" && c.attrs["opacity"] == null;

  const all: Segment[] = [];

  for (const c of p.children) {
    const { points, segments } = elementExtents(c);
    if (stroked(c)) all.push(...segments);
    if (!points.length) continue;

    // Endpoints of dot segments are idiom artefacts, not coordinates.
    // Curve endpoints land wherever the tangent falls; snapping them would flatten the
    // curve. Only straight-line anchors are held to the grid.
    //
    // Both ends, not just the far one. An arc's start is derived from exactly the same
    // centre, radius and angle as its finish, and holding one of the pair to the grid means
    // an open ring can only break at an angle whose sine and cosine are both rational —
    // measured, that is a single 74° gap at r=10 and nothing at all at r=7. The set's
    // signature is the open silhouette; the rule was banning it from one side.
    const curveEnds = new Set(
      segments.filter((s2) => s2.kind === "curve")
        .flatMap((s2) => [`${s2.a.x},${s2.a.y}`, `${s2.b.x},${s2.b.y}`]),
    );

    for (const pt of points) {
      // A circle's extreme points are derived from its radius, not authored. Judging
      // them against the grid would ban every radius that is not a multiple of 0.5.
      const derived = c.tag === "circle" || c.tag === "ellipse";
      const onCurve = derived || curveEnds.has(`${pt.x},${pt.y}`);
      if (pt.x < ANCHOR_MIN - EPS || pt.x > ANCHOR_MAX + EPS || pt.y < ANCHOR_MIN - EPS || pt.y > ANCHOR_MAX + EPS)
        r.add(file, "geometry/within-live-area",
          `<${c.tag}> point (${round2(pt.x)}, ${round2(pt.y)}) outside ${ANCHOR_MIN}..${ANCHOR_MAX}`);
      for (const [axis, v] of [["x", pt.x], ["y", pt.y]] as const) {
        if (onCurve || !authored) continue;
        const off = Math.abs(v / GRID_SNAP - Math.round(v / GRID_SNAP)) * GRID_SNAP;
        if (off > 0.02)
          r.add(file, "geometry/grid-snap", `<${c.tag}> ${axis}=${round2(v)} is not a multiple of ${GRID_SNAP}`);
      }
    }

    // A closed shape needs a body; its shortest side must be at least MIN_ELEMENT_SIZE.
    if (c.tag === "rect" || c.tag === "circle" || c.tag === "ellipse" || c.tag === "polygon") {
      const xs = points.map((q) => q.x), ys = points.map((q) => q.y);
      const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
      if (Math.min(w, h) < minElement - EPS)
        r.add(file, "geometry/min-element-size",
          `<${c.tag}> shortest side ${round2(Math.min(w, h))}, minimum ${round2(minElement)}`);
    }

    // Stubs and segment angles are facts about strokes. On an untinted shape these are
    // polygon edges, and a 2-unit edge of a solid form is not a wart — it is a side. The
    // duotone tint also repeats geometry the outline already carries, so counting it
    // reports the same shape twice.
    for (const s of stroked(c) ? segments : []) {
      if (s.kind !== "line") continue;
      const len = Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y);
      // A closed subpath ends where it began, and the parser reports that join as a
      // zero-length segment. It is not a stub — there is nothing there. The old dot
      // exemption (≤ 0.25) had been absorbing these silently, and removing it surfaced
      // 56 across three icons, not one of them a real fault.
      if (len < EPS) continue;

      if (len < minElement - EPS) {
        r.add(file, "geometry/stub-segment",
          `<${c.tag}> segment of length ${round2(len)} — minimum ${round2(minElement)}. A dot is a <circle>, not a short stroke`);
        continue;
      }
      let deg = (Math.atan2(s.b.y - s.a.y, s.b.x - s.a.x) * 180) / Math.PI;
      if (deg < 0) deg += 180;
      if (!ALLOWED_ANGLES.some((a) => Math.abs(deg - a) <= ANGLE_TOLERANCE || Math.abs(deg - a + 180) <= ANGLE_TOLERANCE))
        r.add(file, "geometry/angle-constraint",
          `<${c.tag}> segment at ${round2(deg)}°, prefer ${ALLOWED_ANGLES.join("/")}°`, "warn");
    }
  }

  // parallel-stroke spacing + collinear strokes
  const axis = all.filter((s) => s.kind === "line" && isAxis(s));
  for (let i = 0; i < axis.length; i++)
    for (let k = i + 1; k < axis.length; k++) {
      const a = axis[i]!, b = axis[k]!;
      const aH = Math.abs(a.a.y - a.b.y) < EPS, bH = Math.abs(b.a.y - b.b.y) < EPS;
      if (aH !== bH) continue;
      const gap = aH ? Math.abs(a.a.y - b.a.y) : Math.abs(a.a.x - b.a.x);
      const ov = aH ? overlap(a.a.x, a.b.x, b.a.x, b.b.x) : overlap(a.a.y, a.b.y, b.a.y, b.b.y);
      if (ov <= EPS) continue;
      if (gap < 0.25)
        r.add(file, "geometry/collinear-overlap",
          `two ${aH ? "horizontal" : "vertical"} strokes are collinear over ${round2(ov)} — they will cancel each other out`);
      else if (gap < minGap - EPS)
        r.add(file, "geometry/min-stroke-gap",
          // Naming the two strokes matters more here than in most rules: "2.5 apart" in an
          // icon with four parallel runs sends the reader hunting, and the answer is
          // usually the pair they were not thinking about.
          `${aH ? "horizontal" : "vertical"} strokes at ${aH ? "y" : "x"}=${round2(aH ? a.a.y : a.a.x)} `
          + `and ${round2(aH ? b.a.y : b.a.x)} are ${round2(gap)} apart, minimum ${round2(minGap)}`,
          gap < 1.5 ? "error" : "warn");
    }

  let crossings = 0;
  for (let i = 0; i < all.length; i++)
    for (let k = i + 1; k < all.length; k++)
      if (all[i]!.kind === "line" && all[k]!.kind === "line" && intersects(all[i]!, all[k]!)) crossings++;
  if (crossings > MAX_CROSSINGS)
    r.add(file, "geometry/max-crossings", `${crossings} stroke crossings, maximum ${MAX_CROSSINGS}`);

  const visible = p.children.filter(stroked).length || p.children.length;
  if (visible > ELEMENT_BUDGET_WARN)
    r.add(file, "lint/element-budget",
      `${visible} elements — above ${ELEMENT_BUDGET_WARN}, rarely survives at 16px`, "warn");
}
