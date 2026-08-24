import { XMLParser } from "fast-xml-parser";

export interface SvgNode {
  tag: string;
  attrs: Record<string, string>;
}
export interface ParsedSvg {
  root: Record<string, string>;
  children: SvgNode[];
  /** Disallowed elements, surfaced by the validator. */
  unknown: string[];
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  preserveOrder: true,
  parseAttributeValue: false,
  trimValues: true,
});

export function parseSvg(source: string): ParsedSvg {
  const tree = parser.parse(source) as Array<Record<string, unknown>>;
  const svgEntry = tree.find((n) => "svg" in n);
  if (!svgEntry) throw new Error("root element is not <svg>");

  const root = ((svgEntry as Record<string, unknown>)[":@"] ?? {}) as Record<string, string>;
  const kids = (svgEntry["svg"] ?? []) as Array<Record<string, unknown>>;

  const children: SvgNode[] = [];
  const unknown: string[] = [];
  for (const k of kids) {
    const tag = Object.keys(k).find((key) => key !== ":@");
    if (!tag || tag === "#text") continue;
    const attrs = ((k[":@"] ?? {}) as Record<string, string>) ?? {};
    children.push({ tag, attrs });
    if (Array.isArray(k[tag]) && (k[tag] as unknown[]).length) unknown.push(`${tag} (bersarang)`);
  }
  return { root, children, unknown };
}

export interface Point { x: number; y: number }
/** Straight segment; curves and arcs are marked `curve` and skip the angle check. */
export interface Segment { a: Point; b: Point; kind: "line" | "curve" }

const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
const CMD = /[MmLlHhVvCcSsQqTtAaZz]/;

/** Tokenize a `d` attribute into anchor points and segments. */
export function parsePath(d: string): { points: Point[]; segments: Segment[] } {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const points: Point[] = [];
  const segments: Segment[] = [];
  let cur: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let cmd = "";
  let i = 0;

  const num = () => Number(tokens[i++]);
  const push = (p: Point, kind: Segment["kind"]) => {
    segments.push({ a: cur, b: p, kind });
    points.push(p);
    cur = p;
  };

  while (i < tokens.length) {
    const t = tokens[i]!;
    if (CMD.test(t) && t.length === 1) { cmd = t; i++; }
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();

    switch (C) {
      case "M": {
        const x = num(), y = num();
        cur = rel ? { x: cur.x + x, y: cur.y + y } : { x, y };
        start = cur; points.push(cur);
        cmd = rel ? "l" : "L";                       // an implicit M continues as L
        break;
      }
      case "L": { const x = num(), y = num(); push(rel ? { x: cur.x + x, y: cur.y + y } : { x, y }, "line"); break; }
      case "H": { const x = num(); push({ x: rel ? cur.x + x : x, y: cur.y }, "line"); break; }
      case "V": { const y = num(); push({ x: cur.x, y: rel ? cur.y + y : y }, "line"); break; }
      case "C": { const c: number[] = [num(), num(), num(), num(), num(), num()];
        push(rel ? { x: cur.x + c[4]!, y: cur.y + c[5]! } : { x: c[4]!, y: c[5]! }, "curve"); break; }
      case "S": case "Q": { const c = [num(), num(), num(), num()];
        push(rel ? { x: cur.x + c[2]!, y: cur.y + c[3]! } : { x: c[2]!, y: c[3]! }, "curve"); break; }
      case "T": { const x = num(), y = num(); push(rel ? { x: cur.x + x, y: cur.y + y } : { x, y }, "curve"); break; }
      case "A": { num(); num(); num(); num(); num(); const x = num(), y = num();
        push(rel ? { x: cur.x + x, y: cur.y + y } : { x, y }, "curve"); break; }
      case "Z": { segments.push({ a: cur, b: start, kind: "line" }); cur = start; break; }
      default: i++;
    }
  }
  return { points, segments };
}

/** Extreme points of an element — used by `within-live-area` and `min-element-size`. */
export function elementExtents(n: SvgNode): { points: Point[]; segments: Segment[] } {
  const a = n.attrs;
  const N = (k: string, dflt = 0) => (a[k] === undefined ? dflt : Number(a[k]));
  switch (n.tag) {
    case "path": return parsePath(a["d"] ?? "");
    case "line": {
      const p = { x: N("x1"), y: N("y1") }, q = { x: N("x2"), y: N("y2") };
      return { points: [p, q], segments: [{ a: p, b: q, kind: "line" }] };
    }
    case "circle": {
      const cx = N("cx"), cy = N("cy"), r = N("r");
      return { points: [{ x: cx - r, y: cy }, { x: cx + r, y: cy }, { x: cx, y: cy - r }, { x: cx, y: cy + r }], segments: [] };
    }
    case "ellipse": {
      const cx = N("cx"), cy = N("cy"), rx = N("rx"), ry = N("ry");
      return { points: [{ x: cx - rx, y: cy }, { x: cx + rx, y: cy }, { x: cx, y: cy - ry }, { x: cx, y: cy + ry }], segments: [] };
    }
    case "rect": {
      const x = N("x"), y = N("y"), w = N("width"), h = N("height");
      const c = [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
      return {
        points: c,
        segments: [
          { a: c[0]!, b: c[1]!, kind: "line" }, { a: c[1]!, b: c[2]!, kind: "line" },
          { a: c[2]!, b: c[3]!, kind: "line" }, { a: c[3]!, b: c[0]!, kind: "line" },
        ],
      };
    }
    case "polyline": case "polygon": {
      const nums = (a["points"] ?? "").match(NUM)?.map(Number) ?? [];
      const pts: Point[] = [];
      for (let i = 0; i + 1 < nums.length; i += 2) pts.push({ x: nums[i]!, y: nums[i + 1]! });
      const segs: Segment[] = [];
      for (let i = 0; i + 1 < pts.length; i++) segs.push({ a: pts[i]!, b: pts[i + 1]!, kind: "line" });
      if (n.tag === "polygon" && pts.length > 1) segs.push({ a: pts.at(-1)!, b: pts[0]!, kind: "line" });
      return { points: pts, segments: segs };
    }
    default: return { points: [], segments: [] };
  }
}
