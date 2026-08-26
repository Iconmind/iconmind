/**
 * Does every icon sit at the same size on the canvas?
 *
 * Lucide's whole set reads as one set because its drawings all fill a similar box and all
 * sit in the middle of it. Ours is checked one icon at a time by `geometry/optical-size`,
 * which only asks that the longer side reach 16. That passes an icon that is 16×4 and an
 * icon that is 22×22, and side by side those do not look like the same set.
 *
 * This measures the ink of every icon and reports the ones that sit outside the set's own
 * band, so a decision about the band is made against the numbers rather than a feeling.
 */
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { join } from "node:path";
import { boxOf } from "../lib/pathbox.ts";

const ROOT = join(import.meta.dirname, "../../packages/icons/icons");
const STROKE = 2;

type Row = { slug: string; w: number; h: number; long: number; dx: number; dy: number };
const rows: Row[] = [];

for (const file of globSync("*/*/outline-regular.svg", { cwd: ROOT })) {
  const b = boxOf([...readFileSync(join(ROOT, file), "utf8").matchAll(/ d="([^"]+)"/g)].map((m) => m[1]!));
  if (!Number.isFinite(b.x0)) continue;
  const w = b.x1 - b.x0 + STROKE, h = b.y1 - b.y0 + STROKE;
  rows.push({
    slug: file.split("/")[1], w, h, long: Math.max(w, h),
    dx: (b.x0 + b.x1) / 2 - 12, dy: (b.y0 + b.y1) / 2 - 12,
  });
}

const pct = (p: number) => [...rows].sort((a, c) => a.long - c.long)[Math.floor(rows.length * p)].long;
console.log(`${rows.length} icons`);
console.log(`longer side   p5 ${pct(0.05).toFixed(1)}  median ${pct(0.5).toFixed(1)}  p95 ${pct(0.95).toFixed(1)}`);

const small = rows.filter((r) => r.long < 18).sort((a, b) => a.long - b.long);
const thin = rows.filter((r) => Math.min(r.w, r.h) < 10).sort((a, b) => Math.min(a.w, a.h) - Math.min(b.w, b.h));
const off = rows.filter((r) => Math.abs(r.dx) > 1.5 || Math.abs(r.dy) > 1.5)
  .sort((a, b) => Math.hypot(b.dx, b.dy) - Math.hypot(a.dx, a.dy));

const show = (t: string, rs: Row[], f: (r: Row) => string) => {
  console.log(`\n${t} — ${rs.length}`);
  for (const r of rs.slice(0, 40)) console.log(`  ${r.slug.padEnd(24)} ${f(r)}`);
  if (rs.length > 40) console.log(`  … ${rs.length - 40} more`);
};
show("shorter than 18 across", small, (r) => `${r.w.toFixed(1)} × ${r.h.toFixed(1)}`);
show("narrower than 10 one way", thin, (r) => `${r.w.toFixed(1)} × ${r.h.toFixed(1)}`);
show("off centre by more than 1.5", off, (r) => `${r.dx > 0 ? "+" : ""}${r.dx.toFixed(1)}, ${r.dy > 0 ? "+" : ""}${r.dy.toFixed(1)}`);
