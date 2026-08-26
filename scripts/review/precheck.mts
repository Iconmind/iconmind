/**
 * Every rule a declaration can break, reported at once, without building anything.
 *
 * The constructors throw on the first illegal thing they meet, which is right — nothing
 * illegal should reach a file — but it means a batch with six faults takes six builds to
 * find them. This reads the source and reports all of them together.
 *
 * It is a *pre*-check, not a replacement: the constructors remain the authority, and this
 * only knows about the faults that can be seen in the call itself. Anything that depends on
 * two shapes at once — stroke gaps, crossings, optical size — is the validator's job and
 * still has to run.
 *
 *   npx tsx scripts/review/precheck.mts scripts/draw/icons/batch-NN.ts
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { boxOf } from "../lib/pathbox.ts";

const ANGLES = [0, 45, 90, 135, 180, -45, -90, -135, -180];
const MIN_RUN = 2.5;
const MARK_RADII = [1, 2, 3];
const src = readFileSync(process.argv[2], "utf8");
const bad: string[] = [];
const near = (v: number, t: number) => Math.abs(v - t) < 1e-9;

for (const m of src.matchAll(/poly\(\[(\[[^\]]*\](?:,\s*\[[^\]]*\])*)\]/g)) {
  const pts = [...m[1].matchAll(/\[\s*([\d.-]+),\s*([\d.-]+)\s*\]/g)]
    .map((p) => [Number(p[1]), Number(p[2])] as const);
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1]!, pts[i]!];
    const deg = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (Math.min(...ANGLES.map((t) => Math.abs(deg - t))) > 1.5)
      bad.push(`angle ${deg.toFixed(2)}°  [${a}] -> [${b}]   ${m[0].slice(0, 56)}`);
    if (len < MIN_RUN - 1e-9)
      bad.push(`run ${len.toFixed(2)}  [${a}] -> [${b}]   ${m[0].slice(0, 56)}`);
  }
}

for (const m of src.matchAll(/(rect|frame)\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\s*(?:,\s*\{([^}]*)\})?/g)) {
  const kind = m[1]!;
  const [x, y, w, h, r] = [m[2], m[3], m[4], m[5], m[6]].map(Number) as number[];
  const short = Math.min(w!, h!);
  const want = kind === "frame" ? 3 : 2;
  if (!near(r!, want) && !near(r!, short / 2))
    bad.push(`radius ${r}  ${m[0].slice(0, 48)}  — ${want} for a ${kind}, or ${short / 2} for a capsule`);
  for (const [side, L] of [["w", w!], ["h", h!]] as const) {
    const run = L - 2 * r!;
    if (run > 1e-9 && run < MIN_RUN - 1e-9)
      bad.push(`straight ${side} ${run}  ${m[0].slice(0, 48)}`);
  }
  if (kind === "frame") {
    const o = m[7] ?? "";
    const gap = Number(/gap:\s*([\d.]+)/.exec(o)?.[1] ?? 6);
    const cut = Number(/chamfer:\s*([\d.]+)/.exec(o)?.[1] ?? 0);
    const lip = (w! - r! - Math.max(r!, cut) - gap) / 2;
    if (lip < MIN_RUN - 1e-9) bad.push(`lip ${lip}  ${m[0].slice(0, 56)}`);
    if (cut && h! - cut - r! < MIN_RUN - 1e-9) bad.push(`chamfer wall ${h! - cut - r!}  ${m[0].slice(0, 56)}`);
  }
}

for (const m of src.matchAll(/(row|col)\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\s*\)/g)) {
  const len = Math.abs(Number(m[4]) - Number(m[3]));
  if (len < MIN_RUN - 1e-9) bad.push(`run ${len}  ${m[0]}`);
}

for (const m of src.matchAll(/disc\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\s*\)/g)) {
  const r = Number(m[3]);
  if (r < 3.5 && !MARK_RADII.includes(r))
    bad.push(`disc radius ${r}  ${m[0]}  — 1, 2 or 3 for a mark, or 3.5 and up for a body`);
}

for (const m of src.matchAll(/arc\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*(-?[\d.]+),\s*(-?[\d.]+)\s*\)/g)) {
  const [cx, cy, r, a, b] = [m[1], m[2], m[3], m[4], m[5]].map(Number) as number[];
  for (const ang of [a!, b!]) {
    const px = cx! + r! * Math.cos((ang * Math.PI) / 180);
    const py = cy! + r! * Math.sin((ang * Math.PI) / 180);
    if (px < 2 || px > 22 || py < 2 || py > 22)
      bad.push(`arc endpoint (${px.toFixed(2)}, ${py.toFixed(2)}) outside 2..22   ${m[0]}`);
  }
}

/**
 * The band the set holds, from `icons:scale`: the longer side reaches 16, and the ink sits
 * within 2 units of the middle. Both are also validator rules — this is the same numbers,
 * one build cycle earlier.
 */
const MIN_EXTENT = 16, MAX_OFFSET = 2;

if (!bad.length) {
  const mod = await import(resolve(process.argv[2]!));
  const icons = Object.values(mod).find(
    (v): v is { slug: string; shapes: { d: string }[] }[] =>
      Array.isArray(v) && v.length > 0 && typeof (v[0] as { slug?: unknown })?.slug === "string");
  for (const ic of icons ?? []) {
    const b = boxOf(ic.shapes.map((sh) => sh.d));
    if (!Number.isFinite(b.x0)) continue;
    // Plus the stroke: a path is the centre line, and half a regular stroke lands either side.
    const w = b.x1 - b.x0 + 2, h = b.y1 - b.y0 + 2;
    if (Math.max(w, h) < MIN_EXTENT - 0.05)
      bad.push(`size ${w.toFixed(1)} × ${h.toFixed(1)}  ${ic.slug} — longer side under ${MIN_EXTENT}`);
    const dx = (b.x0 + b.x1) / 2 - 12, dy = (b.y0 + b.y1) / 2 - 12;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > MAX_OFFSET + 0.05)
      bad.push(`centre ${dx > 0 ? "+" : ""}${dx.toFixed(1)}, ${dy > 0 ? "+" : ""}${dy.toFixed(1)}  ${ic.slug} — over ${MAX_OFFSET} from the middle`);
  }
}

for (const b of bad) console.log(`  ${b}`);
console.log(bad.length ? `${bad.length} to fix` : "clean");
process.exit(bad.length ? 1 : 0);
