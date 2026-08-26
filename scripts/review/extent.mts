/**
 * How much of the canvas each icon actually covers.
 *
 * Every icon in this set is drawn on the same 24-unit canvas, held to the same half-unit
 * grid, with anchors confined to the same live area of 2..22. That is enforced per drawing.
 * What is *not* enforced is that two icons drawn correctly end up the same visual size — a
 * capsule nine units tall and a ring twenty units across both obey every rule and look
 * nothing alike beside each other.
 *
 * This measures the painted extent, rasterised, so a stroke's width counts. It is the same
 * `inkBox` the validator uses to keep an icon's own six cells aligned; here it is turned
 * sideways, across icons rather than across cells.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { inkBox } from "../lib/hash.ts";

const ROOT = "packages/icons/icons";
const rows: { slug: string; w: number; h: number; span: number }[] = [];

for (const cat of readdirSync(ROOT)) {
  const dir = join(ROOT, cat);
  if (!statSync(dir).isDirectory()) continue;
  for (const slug of readdirSync(dir)) {
    const f = join(dir, slug, "outline-regular.svg");
    if (!existsSync(f)) continue;
    const box = inkBox(readFileSync(f, "utf8"));
    if (!box) continue;
    const w = box.x1 - box.x0, h = box.y1 - box.y0;
    rows.push({ slug, w: +w.toFixed(1), h: +h.toFixed(1), span: +Math.max(w, h).toFixed(1) });
  }
}

rows.sort((a, b) => a.span - b.span);
const spans = rows.map((r) => r.span);
const at = (p: number) => spans[Math.floor((spans.length - 1) * p)];

console.log(`${rows.length} icons`);
console.log(`longer side: min ${at(0)}  p10 ${at(0.1)}  median ${at(0.5)}  p90 ${at(0.9)}  max ${at(1)}`);

const floor = Number(process.argv[2] ?? 17);
const small = rows.filter((r) => r.span < floor);
console.log(`\n${small.length} under ${floor} units:`);
for (const r of small) console.log(`  ${r.slug.padEnd(22)} ${String(r.w).padStart(5)} × ${r.h}`);
