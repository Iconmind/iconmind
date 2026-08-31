/**
 * How many icons are two motifs sitting side by side?
 *
 * Rendered, not read from the source: the ink is split into connected clusters, clusters
 * that nearly touch are merged (a key's shaft and its teeth are one motif, not two), and an
 * icon counts as a pair when what is left is two or more separated groups, each small, with
 * clear air between them left to right.
 */
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";

const ROOT = "packages/icons/icons", N = 96, U = N / 24;
type Box = { x0: number; y0: number; x1: number; y1: number; n: number };

function clusters(px: Uint8Array): Box[] {
  const seen = new Int32Array(N * N).fill(0);
  const out: Box[] = [];
  const stack: number[] = [];
  for (let i = 0; i < N * N; i++) {
    if (!px[i] || seen[i]) continue;
    let b: Box = { x0: N, y0: N, x1: -1, y1: -1, n: 0 };
    stack.push(i); seen[i] = 1;
    while (stack.length) {
      const k = stack.pop()!, x = k % N, y = (k / N) | 0;
      b.n++;
      if (x < b.x0) b.x0 = x; if (x > b.x1) b.x1 = x;
      if (y < b.y0) b.y0 = y; if (y > b.y1) b.y1 = y;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        const nk = ny * N + nx;
        if (px[nk] && !seen[nk]) { seen[nk] = 1; stack.push(nk); }
      }
    }
    out.push(b);
  }
  return out;
}
/** Two clusters within a stroke's width of each other are one motif. */
function merge(bs: Box[], gap = 0.75 * U): Box[] {
  let cur = bs.slice(), again = true;
  while (again) {
    again = false;
    outer: for (let i = 0; i < cur.length; i++) for (let j = i + 1; j < cur.length; j++) {
      const a = cur[i]!, b = cur[j]!;
      const dx = Math.max(0, Math.max(a.x0 - b.x1, b.x0 - a.x1));
      const dy = Math.max(0, Math.max(a.y0 - b.y1, b.y0 - a.y1));
      if (Math.hypot(dx, dy) <= gap) {
        cur[i] = { x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1), n: a.n + b.n };
        cur.splice(j, 1); again = true; break outer;
      }
    }
  }
  return cur;
}

const only = new Set(process.argv.slice(2));
const pairs: string[] = [];
let total = 0;
for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(d)) {
    const f = join(d, slug, "outline-regular.svg");
    if (!existsSync(f)) continue;
    if (only.size && !only.has(slug)) continue;
    total++;
    const png = PNG.sync.read(Buffer.from(new Resvg(readFileSync(f, "utf8"), { fitTo: { mode: "width", value: N } }).render().asPng()));
    const px = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) px[i] = png.data[i * 4 + 3]! >= 128 ? 1 : 0;
    const groups = merge(clusters(px)).filter((b) => b.n > 20);
    if (only.size) console.log(slug, "groups:", groups.map((b) => `${((b.x1-b.x0)/U).toFixed(1)}x${((b.y1-b.y0)/U).toFixed(1)}@${(b.x0/U).toFixed(1)}`).join(" "));
    if (groups.length < 2) continue;
    const wide = groups.some((b) => (b.x1 - b.x0) / U >= 14 || (b.y1 - b.y0) / U >= 15);
    if (wide) continue;                                    // one of them is the body
    const sorted = groups.slice().sort((a, b) => a.x0 - b.x0);
    let sideBySide = false;
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i]!.x0 > sorted[i - 1]!.x1 + 0.5 * U) sideBySide = true;
    if (sideBySide) pairs.push(`${cat}/${slug}`);
  }
}
console.log(`${pairs.length} of ${total} icons are two or more small motifs side by side\n`);
const byCat: Record<string, number> = {};
for (const p of pairs) byCat[p.split("/")[0]!] = (byCat[p.split("/")[0]!] ?? 0) + 1;
for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) console.log(`  ${c.padEnd(12)} ${n}`);
console.log("\nmodel / favorite among them:");
console.log("  " + pairs.filter((p) => /model|favorite/.test(p)).join("\n  "));
