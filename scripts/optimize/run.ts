/**
 * Two phases. SVGO strips junk; phase two forces a canonical form.
 *
 * The canonical form is the point. Minifying saves a few hundred bytes; making two
 * visually identical icons produce byte-identical files is what makes duplicate
 * detection trustworthy and what makes `git diff` mean something.
 */
import { writeFile } from "node:fs/promises";
import { optimize } from "svgo";
import { parseSvg, elementExtents, GRID_SNAP, STROKE_WIDTH, VIEW_BOX } from "@iconmind/shared";
import { loadIcons } from "../lib/fs.ts";
import { svgoConfig } from "./svgo.config.ts";

/** Root attributes, always in this order. */
const ROOT_ORDER = [
  ["xmlns", "http://www.w3.org/2000/svg"],
  ["width", "24"],
  ["height", "24"],
  ["viewBox", VIEW_BOX],
  ["fill", "none"],
  ["stroke", "currentColor"],
  ["stroke-width", String(STROKE_WIDTH)],
  ["stroke-linecap", "round"],
  ["stroke-linejoin", "round"],
] as const;

/** Attribute order within a child, so two identical shapes serialise identically. */
const ATTR_ORDER = ["d", "points", "x", "y", "x1", "y1", "x2", "y2",
                    "cx", "cy", "r", "rx", "ry", "width", "height"];

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
 * The dot idiom `h.01` is shielded from number canonicalisation: 0.01 is within the
 * snap tolerance of zero, and snapping it would silently delete the dot.
 */
const DOT_MARK = "\u0001";
const shieldDots = (d: string) => d.replace(/([hv])\s*0?\.0*1(?![0-9])/gi, (_m, c: string) => c + DOT_MARK);
const restoreDots = (d: string) => d.replaceAll(DOT_MARK, ".01");

/** Normalise a path `d`: single spaces, no redundant separators. */
const canonPath = (d: string) =>
  restoreDots(canonValue(shieldDots(d))
    .replace(/,/g, " ")
    .replace(/\s*([A-Za-z])\s*/g, "$1")   // no whitespace touching a command letter
    .replace(/\s+/g, " ")                  // single space between numbers
    .trim());

function serialize(svg: string): string {
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

  // Deterministic order. Safe because every icon is stroke-only with fill:none,
  // so z-order has no visual effect.
  decorated.sort((a, b) => {
    for (let i = 0; i < a.key.length; i++) {
      const x = a.key[i]!, y = b.key[i]!;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  });

  const body = decorated
    .map(({ tag, attrs }) => {
      const keys = Object.keys(attrs).sort((a, b) => {
        const ia = ATTR_ORDER.indexOf(a), ib = ATTR_ORDER.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
      });
      return `<${tag} ${keys.map((k) => `${k}="${attrs[k]}"`).join(" ")}/>`;
    })
    .join("");

  const root = ROOT_ORDER.map(([k, v]) => `${k}="${v}"`).join(" ");
  return `<svg ${root}>${body}</svg>\n`;
}

const icons = (await loadIcons()).filter((i) => i.svg);
let changed = 0;

for (const icon of icons) {
  const step1 = optimize(icon.svg, { ...svgoConfig, path: icon.svgPath }).data;
  const out = serialize(step1);
  if (out !== icon.svg) {
    await writeFile(icon.svgPath, out, "utf8");
    changed++;
  }
}

const check = process.argv.includes("--check");
console.log(`Optimized ${icons.length} icons — ${changed} changed, ${icons.length - changed} already canonical`);
if (check && changed > 0) {
  console.error("::error::Icons were not canonical. Run 'pnpm icons:optimize' and commit the result.");
  process.exit(1);
}
