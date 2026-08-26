/**
 * The canonical form of a cell, as one function.
 *
 * Split out of `run.ts` because the freshness check needs it too: `iconforge` writes the
 * geometry and SVGO rewrites it, so comparing the forge's output to a committed file only
 * means anything once both have been through here.
 */
import { optimize } from "svgo";
import { parseSvg, elementExtents, GRID_SNAP, STROKE_WIDTH, SVG_ATTR_ORDER, SVG_CLOSE, svgOpen } from "@iconmind/shared";
import type { Variant, Weight } from "@iconmind/shared";
import { svgoConfig } from "./svgo.config.ts";

/** Root attributes, always in this order. */
// The canonical form lives in @iconmind/shared, where the scaffolder and the
// validator read it too — see SVG_OPEN there.
const ATTR_ORDER = SVG_ATTR_ORDER;

const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

/** Round to 2dp, then snap to the 0.5 grid when the value is already within 0.02. */
function canonNumber(raw: string): string {
  const n = Number(raw);
  if (!Number.isFinite(n)) return raw;
  let v = Math.round(n * 100) / 100;
  const snapped = Math.round(v / GRID_SNAP) * GRID_SNAP;
  if (Math.abs(v - snapped) <= 0.02) v = snapped;
  const out = String(Math.round(v * 100) / 100);
  return out === "-0" ? "0" : out;
}

const canonValue = (v: string) => v.replace(NUM, canonNumber);


/**
 * Tokenise a `d`, arc-aware.
 *
 * A generic number regex cannot do this. An arc's two flags are single characters and SVGO
 * writes them without separators, so `a1 1 0 011 0` reads as one number `011` to anything
 * that does not know it is looking at flags.
 */
function tokenisePath(d: string): string[] {
  const out: string[] = [];
  const NUMBER = /^[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/;
  let i = 0, cmd = "", arg = 0;
  while (i < d.length) {
    const ch = d[i]!;
    if (ch === " " || ch === "," || ch === "\n" || ch === "\t") { i++; continue; }
    if (/[A-Za-z]/.test(ch)) { cmd = ch; arg = 0; out.push(ch); i++; continue; }
    if (cmd.toLowerCase() === "a" && (arg % 7 === 3 || arg % 7 === 4)) {
      out.push(ch); i++; arg++; continue;
    }
    const m = NUMBER.exec(d.slice(i));
    if (!m) { i++; continue; }
    out.push(m[0]); i += m[0].length; arg++;
  }
  return out;
}

/**
 * Normalise a path `d`: single spaces, no redundant separators.
 *
 * Rebuilt from tokens rather than by rewriting numbers where they sit. Doing it in place
 * merged neighbours: SVGO writes `a.997.997` because a leading dot needs no separator, and
 * canonicalising each number to `1` turned two arc radii into the single number `11`. The
 * path was invalid from that point on, and 233 cells rendered as a stub — which only
 * surfaced once the optimizer started touching cells other than the master.
 */
function canonPath(d: string): string {
  const out: string[] = [];
  let prevWasCmd = false;
  for (const t of tokenisePath(d)) {
    if (/^[A-Za-z]$/.test(t)) { out.push(t); prevWasCmd = true; continue; }
    // The dot idiom `h.01` must survive: 0.01 is inside the snap tolerance of zero, and
    // snapping it would silently delete the dot.
    const keep = /^0?\.0*1$/.test(t) && out.length > 0 && /^[hv]$/i.test(out[out.length - 1] ?? "");
    out.push((prevWasCmd ? "" : " ") + (keep ? ".01" : canonNumber(t)));
    prevWasCmd = false;
  }
  return out.join("").trim();
}

function serialize(svg: string, variant: Variant, weight: Weight): string {
  const { children } = parseSvg(svg);

  const decorated = children.map((c) => {
    const attrs = Object.fromEntries(
      Object.entries(c.attrs).map(([k, v]) => [k, k === "d" ? canonPath(v) : canonValue(v)]),
    );
    const pts = elementExtents({ tag: c.tag, attrs }).points;
    const first = pts[0] ?? { x: 0, y: 0 };
    const minY = pts.length ? Math.min(...pts.map((p) => p.y)) : 0;
    const minX = pts.length ? Math.min(...pts.map((p) => p.x)) : 0;
    return { tag: c.tag, attrs, key: [c.tag, minY, minX, first.x, first.y] as const };
  });

  /*
   * Authored order is kept.
   *
   * This used to sort children into a deterministic order, and the comment justifying it
   * said "safe because every icon is stroke-only with fill:none, so z-order has no visual
   * effect". That stopped being true the moment duotone existed: its tint has to paint
   * first, behind the strokes, and sorting moved it. Determinism now comes from
   * `structure/canonical-form`, which fixes how a file is written without touching what
   * order it says to paint in.
   */
  const body = decorated
    .map(({ tag, attrs }) => {
      const keys = Object.keys(attrs).sort((a, b) => {
        const ia = ATTR_ORDER.indexOf(a), ib = ATTR_ORDER.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
      });
      return `<${tag} ${keys.map((k) => `${k}="${attrs[k]}"`).join(" ")}/>`;
    })
    .join("");

  /*
   * The root belongs to the cell, not to `outline-regular`.
   *
   * This used to stamp `SVG_OPEN` — the master's root — onto whatever it was given. That
   * was harmless while the optimizer only ever touched the master. The moment it started
   * canonicalising every cell it stamped one variant's root onto all of them, and 899
   * icons rendered as something the repo did not contain. A constant that is only correct
   * for one input is a constant waiting for a second caller.
   */
  return `${svgOpen(variant, weight)}${body}${SVG_CLOSE}`;
}


/**
 * One cell's raw SVG in, its committed form out.
 *
 * Run to a fixed point, because one pass is not one. SVGO's own multipass and the
 * serializer below feed each other: the serializer rewrites numbers, which gives SVGO new
 * material to shorten, which gives the serializer new numbers. Rendering the whole set and
 * canonicalising it once left 595 cells still moving, and a second pass left one. Three
 * passes and it is stable.
 *
 * It has to be a fixed point rather than "run it three times" because the freshness check
 * compares its own output to a committed file, and the two only agree if both have
 * stopped moving.
 */
export function canonicalise(
  svg: string,
  path: string,
  variant: Variant = "outline",
  weight: Weight = "regular",
): string {
  let out = serialize(optimize(svg, { ...svgoConfig, path }).data, variant, weight);
  // Five is a ceiling, not an expectation; the set converges in three.
  for (let i = 0; i < 5; i++) {
    const next = serialize(optimize(out, { ...svgoConfig, path }).data, variant, weight);
    if (next === out) return out;
    out = next;
  }
  return out;
}
