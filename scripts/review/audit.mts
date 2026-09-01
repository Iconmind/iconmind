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
 *   pnpm icons:audit --check     # exit 1 on any flag not in the baseline
 *
 * `--check` is what nightly runs. The set carries flags that predate the gate and are
 * being left alone deliberately, so a bare run would be red forever and tell nobody
 * anything; the baseline records exactly those, and anything NEW fails the build. That
 * is the gate this audit never had, and its absence is why centring drifted back once
 * already: the pass that fixed six leaning compositions (b485c7d17) was never defended.
 * A flag that disappears is reported as stale and does not fail — fixing an icon must
 * never break the build. Refresh with `pnpm icons:audit --baseline > <the file>`.
 */
import { Resvg } from "@resvg/resvg-js";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const ROOT = "packages/icons/icons";

/** Deliberate small glyphs: universal marks whose whole identity is their shape. */
const GLYPHS = new Set([
  // A commit on a vertical line is a line with a node on it; its width is the node's.
  "devtools/git-commit-vertical",
  "interface/minus", "interface/more-horizontal", "interface/more-vertical",
  "interface/chevron-up", "interface/chevron-down", "interface/chevron-left",
  "interface/chevron-right", "interface/pause", "interface/link", "automation/action",
]);
/** Metaphors that are inherently anchored, so their centroid legitimately sits off-centre. */
const ANCHORED = new Set([
  // A pin's tip is the point it marks; the payload rides in the head. The whole family
  // shares `location`'s teardrop, so it shares its centroid too — that is the metaphor.
  "interface/location", "interface/add-location", "interface/dormant-location",
  "interface/favorite-place", "interface/goal-location", "interface/location-removed",
  "interface/location-trend", "interface/place-label", "interface/place-search",
  "interface/private-location", "interface/saved-location", "interface/verified-location",
  "interface/navigate", "interface/move-pin", "interface/address", "interface/destination",
  "security/geo-key", "cloud/local-pricing", "cloud/geo-filter", "automation/geo-event",
  // A funnel is its mouth; what passed through collects below the stem. The mass sits
  // where the metaphor puts it - same standing as the pin above.
  "interface/remove-filter", "interface/filter-alert", "interface/apply-filter",
  "interface/filter-applied", "interface/filter-cleared", "interface/filter-trend",
  "interface/favorites-filter", "devtools/filter-run", "automation/event-filter",
  "analytics/filtered-list",
  // A bell is its dome - the mass hangs where a bell hangs it.
  "interface/favorite-alert",
  "devtools/stack-trace", "ai/softmax", "analytics/chart-bar", "analytics/chart-line",
  "analytics/retention", "interface/corner-radius", "rag/bm25", "security/login",
  "devtools/request", "automation/workflow-template", "agents/step-limit",
  "cloud/budget-alert", "analytics/latency-p99",
  // An alignment icon is a line at the edge and the boxes that meet it; the ink sits where
  // the edge is because the edge is what it is about. Same for a to-do list's boxes and a
  // quotation's marks, which stand at the start of their lines by definition.
  "interface/align-start-horizontal", "interface/align-end-horizontal",
  "interface/align-start-vertical", "interface/align-end-vertical",
  "interface/list-todo", "interface/text-quote",
  // bin-pack hugs the bin's corner because packing toward the corner IS the metaphor.
  "devops/bin-pack",
  // score-distribution's bars stand on their baseline, exactly as chart-bar does.
  "analytics/score-distribution",
  "analytics/chart-bar-horizontal", "analytics/chart-bar-increasing", "analytics/chart-bar-decreasing",
  "analytics/chart-column-increasing", "analytics/chart-column-decreasing", "analytics/chart-column-stacked",
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
  "ai/activation", "analytics/significance-test", "analytics/trend-break", "interface/align-left-obj", "data/volume-anomaly", "ai/roc-curve", "analytics/retention-curve", "ai/grokking", "analytics/stacked-bar",
  // The locked layer is the lid; the lock hangs beneath it.
  "interface/layer-lock",
  "devtools/precondition", // the check sits before the block by design
  "devtools/postcondition", // the check sits after the block by design
  "ai/noise-schedule", // the schedule shrinks along the diagonal; the big dot leads by design
  "interface/resize-handle", // a corner grip lives in its corner by definition
  "analytics/trend-milestone", // the flag stands top-left and the trend climbs bottom-right by design
  "devtools/run-alert", "devtools/run-trend", // a play button keeps its ink on its left edge; the mark beside it cannot balance that
  "devtools/add-run", "devtools/run-idle", // same play button, same left edge
  "devtools/run-next", // same play button again
  "security/remove-lock", // a padlock is a heavy left body; the minus beside it cannot balance that
  "ai/checkpoint-alert", "ai/remove-checkpoint", "ai/next-milestone", // a flag pole is a heavy left edge; the small mark beside it cannot balance that
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
  "ai/activation", "analytics/significance-test", "analytics/trend-break", "interface/align-left-obj", "data/volume-anomaly", "ai/roc-curve", "analytics/retention-curve", "ai/grokking", "analytics/stacked-bar",
  // The locked layer is the lid; the lock hangs beneath it.
  "interface/layer-lock",
  "devtools/precondition", // the check sits before the block by design
  "devtools/postcondition", // the check sits after the block by design
  "ai/noise-schedule", // the schedule shrinks along the diagonal; the big dot leads by design
  "interface/resize-handle", // a corner grip lives in its corner by definition
  "analytics/trend-milestone", // the flag stands top-left and the trend climbs bottom-right by design
  "devtools/run-alert", "devtools/run-trend", // a play button keeps its ink on its left edge; the mark beside it cannot balance that
  "devtools/add-run", "devtools/run-idle", // same play button, same left edge
  "devtools/run-next", // same play button again
  "security/remove-lock", // a padlock is a heavy left body; the minus beside it cannot balance that
  "ai/checkpoint-alert", "ai/remove-checkpoint", "ai/next-milestone", // a flag pole is a heavy left edge; the small mark beside it cannot balance that
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

const CACHE_DIR = "node_modules/.cache";
const MEASURED = join(CACHE_DIR, "audit-metrics.json");
type Measured = { h: string; short: number; off: number; cover16: number; elements: number };
const measured: Record<string, Measured> = existsSync(MEASURED)
  ? (JSON.parse(readFileSync(MEASURED, "utf8")) as Record<string, Measured>)
  : {};
const seenIds = new Set<string>();
let fresh = 0;

const all = process.argv.includes("--all");
const check = process.argv.includes("--check");
const writeBaseline = process.argv.includes("--baseline");
const BASELINE = "scripts/review/audit-baseline.json";
// Scoped mode: pass slugs (or category/slug) to audit only those — a full run renders every icon.
const only = new Set(process.argv.slice(2).filter((x) => !x.startsWith("--")));
const flags: string[] = [];
let count = 0;

for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(d)) {
    if (only.size && !only.has(slug) && !only.has(cat + "/" + slug)) continue;
    const dir = join(d, slug);
    if (!statSync(dir).isDirectory()) continue;
    const id = `${cat}/${slug}`;
    const reg = readFileSync(join(dir, "outline-regular.svg"), "utf8");
    // Rasterising every icon twice is the whole cost of this command and almost none of it
    // changes between two runs of the same round. Keyed on the cell's own bytes: the first
    // run pays for the set, every run after pays only for the icons that actually moved.
    const h = createHash("sha1").update(reg).digest("hex");
    let m = measured[id];
    if (m?.h !== h) {
      const a = inkStats(reg, 240);
      const r16 = inkStats(reg, 16);
      m = {
        h,
        short: +(Math.min(a.w, a.h) / 10).toFixed(1),
        off: +Math.max(Math.abs(a.cx - 120), Math.abs(a.cy - 120)).toFixed(0) / 10,
        cover16: r16.cover,
        elements: (reg.match(/<path/g) ?? []).length,
      };
      measured[id] = m;
      fresh++;
    }
    const { short, off, elements } = m;
    const r16 = { cover: m.cover16 };
    seenIds.add(id);
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

for (const id of Object.keys(measured)) if (!seenIds.has(id)) delete measured[id];
mkdirSync(CACHE_DIR, { recursive: true });
writeFileSync(MEASURED, JSON.stringify(measured));

if (writeBaseline) {
  console.log(JSON.stringify(flags.slice().sort(), null, 1));
} else if (!all) {
  for (const f of flags.sort()) console.log(`⚠ ${f}`);
  console.log(`\n${count} icons audited · ${flags.length} flagged (guidelines, not law — redraw or add to the named exceptions with a reason)`);

  if (check) {
    const known: string[] = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, "utf8")) : [];
    const before = new Set(known);
    const fresh = flags.filter((f) => !before.has(f));
    const gone = known.filter((f) => !flags.includes(f));
    if (gone.length) console.log(`\n${gone.length} baselined flag(s) no longer raised — trim them from ${BASELINE}:\n  ${gone.join("\n  ")}`);
    if (fresh.length) {
      console.error(`\n${fresh.length} NEW flag(s) not in the baseline:\n  ${fresh.join("\n  ")}`);
      console.error(`\nRedraw them, or — only when the metaphor is genuinely anchored — add the icon to ANCHORED/GLYPHS with its reason. Do not widen the baseline to make this pass.`);
      process.exit(1);
    }
    console.log(`\nNo new flags against ${BASELINE} (${known.length} baselined).`);
  }
}
