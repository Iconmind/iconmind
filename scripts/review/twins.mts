/** Whole-set visual twin hunt: pairwise ink-overlap (IoU) of 24px bitmaps. */
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/icons/icons";
const S = 24;

function bits(svg: string): Uint8Array {
  const px = new Resvg(svg, { fitTo: { mode: "width", value: S }, background: "white" }).render().pixels;
  const b = new Uint8Array(S * S);
  for (let i = 0; i < S * S; i++) b[i] = px[i * 4]! < 128 ? 1 : 0;
  return b;
}

const icons: { id: string; b: Uint8Array; ink: number }[] = [];
for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(d)) {
    const dir = join(d, slug);
    if (!statSync(dir).isDirectory()) continue;
    const b = bits(readFileSync(join(dir, "outline-regular.svg"), "utf8"));
    let ink = 0; for (const v of b) ink += v;
    icons.push({ id: `${cat}/${slug}`, b, ink });
  }
}

const pairs: [number, string, string][] = [];
for (let i = 0; i < icons.length; i++)
  for (let j = i + 1; j < icons.length; j++) {
    const A = icons[i]!, B = icons[j]!;
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
console.log(`\n${icons.length} icons, ${pairs.length} suspicious pairs (IoU ≥ 0.72 at 24px)`);
