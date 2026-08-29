/**
 * Whole-set visual twin hunt: pairwise ink-overlap (IoU) of 24px bitmaps.
 *
 * With slugs as arguments it becomes the round gate: only pairs touching a named
 * slug are scored, which turns an all-pairs sweep (minutes, and O(n²) as the set
 * grows) into new-versus-everything (seconds).
 *
 *   pnpm icons:twins                       # the full hunt
 *   pnpm icons:twins for-each mcp-batch    # these against the whole set
 */
import { Resvg } from "@resvg/resvg-js";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/icons/icons";
const S = 24;

function bits(svg: string): Uint8Array {
  const px = new Resvg(svg, { fitTo: { mode: "width", value: S }, background: "white" }).render().pixels;
  const b = new Uint8Array(S * S);
  for (let i = 0; i < S * S; i++) b[i] = px[i * 4]! < 128 ? 1 : 0;
  return b;
}

/*
 * Rendering is the whole cost — the pairwise loop is arithmetic. A content-hashed
 * cache means a run only rasterises icons whose SVG actually changed; the first
 * run pays for everything, every run after pays for the new batch.
 */
const CACHE_DIR = "node_modules/.cache";
const CACHE = join(CACHE_DIR, "twins-bitmaps.json");
type Entry = { h: string; ink: number; b64: string };
const cache: Record<string, Entry> = existsSync(CACHE)
  ? (JSON.parse(readFileSync(CACHE, "utf8")) as Record<string, Entry>)
  : {};

const icons: { id: string; b: Uint8Array; ink: number }[] = [];
let rendered = 0;
const seen = new Set<string>();
for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(d)) {
    const dir = join(d, slug);
    if (!statSync(dir).isDirectory()) continue;
    const id = `${cat}/${slug}`;
    seen.add(id);
    const svg = readFileSync(join(dir, "outline-regular.svg"), "utf8");
    const h = createHash("sha1").update(svg).digest("hex");
    let e = cache[id];
    if (!e || e.h !== h) {
      const b = bits(svg);
      let ink = 0; for (const v of b) ink += v;
      e = { h, ink, b64: Buffer.from(b).toString("base64") };
      cache[id] = e;
      rendered++;
    }
    icons.push({ id, b: new Uint8Array(Buffer.from(e.b64, "base64")), ink: e.ink });
  }
}
for (const id of Object.keys(cache)) if (!seen.has(id)) delete cache[id];
mkdirSync(CACHE_DIR, { recursive: true });
writeFileSync(CACHE, JSON.stringify(cache));
if (rendered) console.log(`rendered ${rendered} changed icons; ${icons.length - rendered} from cache`);

const only = new Set(process.argv.slice(2));
const scoped = only.size > 0;

const pairs: [number, string, string][] = [];
for (let i = 0; i < icons.length; i++)
  for (let j = i + 1; j < icons.length; j++) {
    const A = icons[i]!, B = icons[j]!;
    if (scoped && !only.has(A.id.split("/")[1]!) && !only.has(B.id.split("/")[1]!)) continue;
    // quick reject: very different ink amounts cannot be twins
    if (Math.min(A.ink, B.ink) / Math.max(A.ink, B.ink) < 0.75) continue;
    let inter = 0, union = 0;
    for (let k = 0; k < S * S; k++) {
      const a = A.b[k]!, b = B.b[k]!;
      inter += a & b; union += a | b;
    }
    const iou = inter / union;
    if (iou >= 0.72) pairs.push([iou, A.id, B.id]);
  }

pairs.sort((a, b) => b[0] - a[0]);
for (const [iou, a, b] of pairs) console.log(iou.toFixed(2), a, b);
console.log(`\n${icons.length} icons${scoped ? ` (scoped to ${only.size})` : ""}, ${pairs.length} suspicious pairs (IoU ≥ 0.72 at 24px)`);
