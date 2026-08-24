import {
  ANCHOR_MIN, ANCHOR_MAX, GRID_SNAP, MIN_ELEMENT_SIZE, MIN_STROKE_GAP,
  MAX_CROSSINGS, ALLOWED_ANGLES, ANGLE_TOLERANCE, ELEMENT_BUDGET_WARN, DOT_MAX,
  elementExtents, type ParsedSvg, type Segment,
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

export function checkGeometry(file: string, p: ParsedSvg, r: Report) {
  const all: Segment[] = [];

  for (const c of p.children) {
    const { points, segments } = elementExtents(c);
    all.push(...segments);
    if (!points.length) continue;

    // Endpoints of dot segments are idiom artefacts, not coordinates.
    // Curve endpoints land wherever the tangent falls; snapping them would flatten the
    // curve. Only straight-line anchors are held to the grid.
    const curveEnds = new Set(
      segments.filter((s2) => s2.kind === "curve").map((s2) => `${s2.b.x},${s2.b.y}`),
    );
    const dotEnds = new Set(
      segments
        .filter((s2) => s2.kind === "line" && Math.hypot(s2.b.x - s2.a.x, s2.b.y - s2.a.y) <= DOT_MAX)
        .map((s2) => `${s2.b.x},${s2.b.y}`),
    );

    for (const pt of points) {
      if (dotEnds.has(`${pt.x},${pt.y}`)) continue;
      // A circle's extreme points are derived from its radius, not authored. Judging
      // them against the grid would ban every radius that is not a multiple of 0.5.
      const derived = c.tag === "circle" || c.tag === "ellipse";
      const onCurve = derived || curveEnds.has(`${pt.x},${pt.y}`);
      if (pt.x < ANCHOR_MIN - EPS || pt.x > ANCHOR_MAX + EPS || pt.y < ANCHOR_MIN - EPS || pt.y > ANCHOR_MAX + EPS)
        r.add(file, "geometry/within-live-area",
          `<${c.tag}> point (${round2(pt.x)}, ${round2(pt.y)}) outside ${ANCHOR_MIN}..${ANCHOR_MAX}`);
      for (const [axis, v] of [["x", pt.x], ["y", pt.y]] as const) {
        if (onCurve) continue;
        const off = Math.abs(v / GRID_SNAP - Math.round(v / GRID_SNAP)) * GRID_SNAP;
        if (off > 0.02)
          r.add(file, "geometry/grid-snap", `<${c.tag}> ${axis}=${round2(v)} is not a multiple of ${GRID_SNAP}`);
      }
    }

    // A closed shape needs a body; its shortest side must be at least MIN_ELEMENT_SIZE.
    if (c.tag === "rect" || c.tag === "circle" || c.tag === "ellipse" || c.tag === "polygon") {
      const xs = points.map((q) => q.x), ys = points.map((q) => q.y);
      const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
      if (Math.min(w, h) < MIN_ELEMENT_SIZE - EPS)
        r.add(file, "geometry/min-element-size",
          `<${c.tag}> shortest side ${round2(Math.min(w, h))}, minimum ${MIN_ELEMENT_SIZE}`);
    }

    for (const s of segments) {
      if (s.kind !== "line") continue;
      const len = Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y);
      // A near-zero segment with a round linecap is the dot idiom — valid, and it
      // renders as a circle of diameter STROKE_WIDTH. What is banned is the range in
      // between: too long to read as a dot, too short to read as a line.
      if (len <= DOT_MAX) continue;
      if (len < MIN_ELEMENT_SIZE - EPS) {
        r.add(file, "geometry/stub-segment",
          `<${c.tag}> segment of length ${round2(len)} — make it a dot (≤ ${DOT_MAX}) or a line (≥ ${MIN_ELEMENT_SIZE})`);
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
      else if (gap < MIN_STROKE_GAP - EPS)
        r.add(file, "geometry/min-stroke-gap",
          `parallel strokes ${round2(gap)} apart, minimum ${MIN_STROKE_GAP}`, gap < 1.5 ? "error" : "warn");
    }

  let crossings = 0;
  for (let i = 0; i < all.length; i++)
    for (let k = i + 1; k < all.length; k++)
      if (all[i]!.kind === "line" && all[k]!.kind === "line" && intersects(all[i]!, all[k]!)) crossings++;
  if (crossings > MAX_CROSSINGS)
    r.add(file, "geometry/max-crossings", `${crossings} stroke crossings, maximum ${MAX_CROSSINGS}`);

  if (p.children.length > ELEMENT_BUDGET_WARN)
    r.add(file, "lint/element-budget",
      `${p.children.length} elements — above ${ELEMENT_BUDGET_WARN}, rarely survives at 16px`, "warn");
}
