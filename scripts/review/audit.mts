/**
 * The consistency audit — what the validator's hard rules cannot see.
 *
 * The validator proves each drawing is legal; this measures whether it is CONSISTENT:
 * rendered with the same rasterizer the validator trusts, every icon gets
 *
 *   short side   the bbox's shorter side, in grid units — the size-band rule bounds the
 *                longer side, so a 22×6 stripe passes it while reading half the size of
 *                its neighbours. Guideline: ≥ 10, unless the icon is a deliberate glyph.
 *   ink 16px     fraction of dark pixels at 16px — past ~0.40 an icon reads as a blot.
 *   centroid     how far the ink's centre of mass sits from the canvas centre.
 *                Guideline: ≤ 2.5 units, unless the metaphor is inherently anchored
 *                (a bar chart stands on its baseline; nested frames sit in a corner).
 *   elements     path count — ≥ 8 is worth a look.
 *
 * These are guidelines with named exceptions, not hard rules — which is exactly why they
 * live here and not in the validator. Run it after drawing a batch; anything it flags
 * gets looked at on a contact sheet before it ships, and either redrawn or added to
 * GLYPHS below with a reason.
 *
 *   pnpm icons:audit             # flag outliers
 *   pnpm icons:audit --all       # dump every icon's metrics as JSON lines
 */
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/icons/icons";

/** Deliberate small glyphs: universal marks whose whole identity is their shape. */
const GLYPHS = new Set([
  "interface/minus", "interface/more-horizontal", "interface/more-vertical",
  "interface/chevron-up", "interface/chevron-down", "interface/chevron-left",
  "interface/chevron-right", "interface/pause", "interface/link", "automation/action",
]);
/** Metaphors that are inherently anchored, so their centroid legitimately sits off-centre. */
const ANCHORED = new Set([
  "devtools/stack-trace", "ai/softmax", "analytics/chart-bar", "analytics/chart-line",
  "analytics/retention", "interface/corner-radius", "rag/bm25", "security/login",
  "devtools/request", "automation/workflow-template", "agents/step-limit",
  "cloud/budget-alert", "analytics/latency-p99",
  // bin-pack hugs the bin's corner because packing toward the corner IS the metaphor.
  "devops/bin-pack",
  // score-distribution's bars stand on their baseline, exactly as chart-bar does.
  "analytics/score-distribution",
  // Lines drawn on axes put their ink where the axes are — chart-line's own reason.
  "ai/lr-schedule", "ai/train-loss", "ai/warmup", "ai/gradient-clip", "devops/scale-to-zero",
  // The catch tray is at the bottom because that is where thrown things land.
  "automation/catch-block",
  // A boom gate hinges on its post; a warm pool sits on the ground it is dug into.
  "devops/admission-control", "devops/prewarm-pool",
  // Bars stand on their baseline; a funnel hangs from its mouth; an axes chart
  // keeps its ink where the axes are.
  "analytics/leaderboard-internal", "analytics/uplift", "analytics/regression-eval",
  "analytics/funnel-leak",
  "devtools/flame-graph", "security/sandbag",
  "analytics/novelty-effect",
  // Bracket-led compositions lean on their wall — bin-pack's own reason.
  "ai/kv-evict",
  // A pointer is held at one edge; its dot lands at the other — the beam is the picture.
  "interface/laser-pointer",
  // Axes charts and bars on a baseline keep their ink low and left; an object
  // aligned to its edge is, by definition, on that edge.
  "ai/activation", "analytics/significance-test", "analytics/trend-break", "interface/align-left-obj",
  // The locked layer is the lid; the lock hangs beneath it.
  "interface/layer-lock",
  "devtools/precondition", // the check sits before the block by design
  "devtools/postcondition", // the check sits after the block by design
  // A boom gate hinges on its post; a warm pool sits on the ground it is dug into.
  "devops/admission-control", "devops/prewarm-pool",
  // Bars stand on their baseline; a funnel hangs from its mouth; an axes chart
  // keeps its ink where the axes are.
  "analytics/leaderboard-internal", "analytics/uplift", "analytics/regression-eval",
  "analytics/funnel-leak",
  "devtools/flame-graph", "security/sandbag",
  "analytics/novelty-effect",
  // Bracket-led compositions lean on their wall — bin-pack's own reason.
  "ai/kv-evict",
  // A pointer is held at one edge; its dot lands at the other — the beam is the picture.
  "interface/laser-pointer",
  // Axes charts and bars on a baseline keep their ink low and left; an object
  // aligned to its edge is, by definition, on that edge.
  "ai/activation", "analytics/significance-test", "analytics/trend-break", "interface/align-left-obj",
  // The locked layer is the lid; the lock hangs beneath it.
  "interface/layer-lock",
  "devtools/precondition", // the check sits before the block by design
  "devtools/postcondition", // the check sits after the block by design
]);

function inkStats(svg: string, size: number) {
  const px = new Resvg(svg, { fitTo: { mode: "width", value: size }, background: "white" })
    .render().pixels;
  let ink = 0, sx = 0, sy = 0, minX = size, maxX = -1, minY = size, maxY = -1;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (px[(y * size + x) * 4]! < 128) {
        ink++; sx += x; sy += y;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
  return { cover: ink / (size * size), cx: sx / Math.max(ink, 1), cy: sy / Math.max(ink, 1),
    w: maxX - minX + 1, h: maxY - minY + 1 };
}

const all = process.argv.includes("--all");
const flags: string[] = [];
let count = 0;

for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(d)) {
    const dir = join(d, slug);
    if (!statSync(dir).isDirectory()) continue;
    const id = `${cat}/${slug}`;
    const reg = readFileSync(join(dir, "outline-regular.svg"), "utf8");
    const a = inkStats(reg, 240);
    const r16 = inkStats(reg, 16);
    const short = +(Math.min(a.w, a.h) / 10).toFixed(1);
    const off = +Math.max(Math.abs(a.cx - 120), Math.abs(a.cy - 120)).toFixed(0) / 10;
    const elements = (reg.match(/<path/g) ?? []).length;
    count++;

    if (all) {
      console.log(JSON.stringify({ icon: id, short, off, cover16: +r16.cover.toFixed(3), elements }));
      continue;
    }
    if (short < 10 && !GLYPHS.has(id)) flags.push(`${id}: short side ${short} — reads smaller than the set`);
    if (r16.cover >= 0.45) flags.push(`${id}: ${(r16.cover * 100).toFixed(0)}% ink at 16px — reads as a blot`);
    if (off >= 2.5 && !ANCHORED.has(id)) flags.push(`${id}: ink centroid ${off} off centre — floats in its frame`);
    if (elements >= 8) flags.push(`${id}: ${elements} elements — worth a look at 16px`);
  }
}

if (!all) {
  for (const f of flags.sort()) console.log(`⚠ ${f}`);
  console.log(`\n${count} icons audited · ${flags.length} flagged (guidelines, not law — redraw or add to the named exceptions with a reason)`);
}
