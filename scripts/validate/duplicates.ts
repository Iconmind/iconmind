/**
 * Three layers, cheapest first.
 *
 * The third layer earns its cost twice: it catches near-duplicates, and the pairs it
 * finds at a middling distance become the "related icons" list on each icon's page.
 * A quality check that also produces a product feature.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { loadIcons } from "../lib/fs.ts";
import { Report } from "../lib/report.ts";
import { WAIVABLE_DUPLICATE_RULES } from "@iconmind/shared";
import { contentHash, structuralHash, inkMap, inkDistance, inkPeak } from "../lib/hash.ts";

const perceptual = process.argv.includes("--perceptual");
const icons = (await loadIcons()).filter((i) => i.svg);
const r = new Report();

// `duplicate/structural` and `duplicate/similar` are both answerable, so this script has
// to read the same acceptances the validator does — otherwise an icon could record a
// reason here and still be shouted at by the other command.
for (const ic of icons) {
  if (!ic.json) continue;
  try {
    const accepted = (JSON.parse(ic.json) as { accepted?: Record<string, string> }).accepted;
    for (const [rule, reason] of Object.entries(accepted ?? {})) r.accept(ic.svgPath, rule, reason);
  } catch { /* pnpm icons:validate reports a malformed metadata file */ }
}
for (const i of icons) r.touch(i.svgPath);

// Layer 1 — identical bytes after canonicalisation.
const byContent = new Map<string, string[]>();
for (const i of icons) {
  const h = contentHash(i.svg);
  byContent.set(h, [...(byContent.get(h) ?? []), i.svgPath]);
}
for (const [, files] of byContent) {
  if (files.length > 1)
    for (const f of files)
      r.add(f, "duplicate/exact", `identical to ${files.filter((x) => x !== f).join(", ")}`);
}

/**
 * Ink maps, computed once. Layer 3 is the only layer that needs them to *find* anything,
 * but layer 2 needs them to stay believable — see below.
 */
/**
 * Cached on the cell's own bytes. Rasterising 2,300 icons is most of this command's cost and
 * almost none of it changes between two runs of the same round: the first run pays for
 * everything, every run after pays only for the icons whose SVG actually moved. Entries for
 * icons that no longer exist are dropped, so the file cannot grow stale.
 */
const CACHE_DIR = "node_modules/.cache";
const CACHE = join(CACHE_DIR, "duplicate-inkmaps.json");
type Cached = { h: string; m: number[] };
const cache: Record<string, Cached> = perceptual && existsSync(CACHE)
  ? (JSON.parse(readFileSync(CACHE, "utf8")) as Record<string, Cached>)
  : {};
let rasterised = 0;
const maps = perceptual
  ? icons.map((i) => {
      const h = createHash("sha1").update(i.svg).digest("hex");
      const hit = cache[i.svgPath];
      if (hit?.h !== h) {
        cache[i.svgPath] = { h, m: Array.from(inkMap(i.svg)) };
        rasterised++;
      }
      return { icon: i, m: cache[i.svgPath]!.m as unknown as ReturnType<typeof inkMap> };
    })
  : null;
if (perceptual) {
  for (const k of Object.keys(cache)) if (!icons.some((i) => i.svgPath === k)) delete cache[k];
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(CACHE, JSON.stringify(cache));
  console.log(`ink maps: ${rasterised} rendered, ${icons.length - rasterised} from cache`);
}
const byPath = new Map(maps?.map((x) => [x.icon.svgPath, x.m]));
const looksAlike = (a: string, b: string) => {
  const ma = byPath.get(a), mb = byPath.get(b);
  return ma && mb ? inkDistance(ma, mb) <= 0.180 : true;
};

// Layer 2 — same shapes, different coordinates.
const head = (slug: string) => slug.split("-")[0];
const tail = (slug: string) => slug.includes("-") ? slug.slice(slug.lastIndexOf("-") + 1) : "";

/*
 * A family runs along either axis. `agent-add` and `agent-check` share a base, and
 * `agent-add` and `model-add` share a mark — both pairs are close for the same reason,
 * that most of the canvas is by design identical, and both are answered by the same
 * question: is there anywhere they plainly differ?
 */
type Named = { slug: string; category: string; family?: string };
const sameFamily = (a: Named, b: Named) =>
  (!!a.family && a.family === b.family) ||
  (a.category === b.category &&
   (head(a.slug) === head(b.slug) || a.slug.startsWith(b.slug) || b.slug.startsWith(a.slug))) ||
  (tail(a.slug) !== "" && tail(a.slug) === tail(b.slug));

const byIcon = new Map(icons.map((i) => [i.svgPath, i]));
const familyPaths = (a: string, b: string) => {
  const x = byIcon.get(a), y = byIcon.get(b);
  return !!x && !!y && sameFamily(x, y);
};

const byStructure = new Map<string, string[]>();
for (const i of icons) {
  const h = structuralHash(i.svg);
  byStructure.set(h, [...(byStructure.get(h) ?? []), i.svgPath]);
}
/**
 * The signature keeps a path's command letters and throws its numbers away, which is
 * what lets it catch a shape that was merely moved or scaled. The cost is that a
 * straight line and a dot are both `MH`, so every icon built from a box and three
 * horizontal strokes lands in the same bucket — `secret` was grouped with the three
 * MCP panels, and a bucket with a release tag, on no evidence beyond that.
 *
 * So when the ink maps are available, a structural match is only reported if the two
 * icons also look at all alike. On the fast path they are not available and every match
 * is reported, which is the right trade for a screen you run while drawing.
 */
for (const [, files] of byStructure) {
  if (files.length < 2) continue;
  for (const f of files) {
    const others = files.filter((x) => x !== f && looksAlike(f, x) && !familyPaths(f, x));
    if (others.length)
      r.add(f, "duplicate/structural", `same shape composition as ${others.join(", ")} — review`, "warn");
  }
}

// Layer 3 — looks the same. Thresholds calibrated against the set, see hash.ts.
const NEAR_IDENTICAL = 0.050;
const VERY_SIMILAR   = 0.100;
const RELATED        = 0.180;

/**
 * Family members are supposed to resemble each other.
 *
 * `agent` and `agent-run` are the same octagon with a different mark inside, and the
 * ink map scores them close no matter how large the mark gets — enlarging the play
 * triangle actually moved them from 0.048 to 0.041. That is the metric measuring
 * overall distribution, not the thing a person looks at. The rule exists to catch
 * *accidental* duplicates, so deliberate families get a much tighter bar instead of a
 * false alarm.
 */
/*
 * Tightening the mean threshold was the first answer and it does not survive a badge
 * family. `agent-add` through `agent-pause` share a base and differ only in a 5x5 mark,
 * which moves the mean by 0.02 or less — below any bar that still catches a real
 * accident. Measured across every family pair in the set, the mean spans 0.012 to 0.214
 * and tells you nothing; the *peak* cell difference never drops under 0.44.
 *
 * So family pairs are judged on the peak instead: is there anywhere on the canvas where
 * these two are plainly not the same picture? A badged pair has several such places. Two
 * icons drawn the same by accident have none — antialiasing alone moves a cell by about
 * 0.02. 0.25 sits between the two by a wide margin at both ends.
 */
const FAMILY_PEAK = 0.25;

const related = new Map<string, string[]>();
if (maps) {
  const pairs: Array<{ a: typeof maps[0]; b: typeof maps[0]; d: number }> = [];
  for (let a = 0; a < maps.length; a++)
    for (let b = a + 1; b < maps.length; b++)
      pairs.push({ a: maps[a]!, b: maps[b]!, d: inkDistance(maps[a]!.m, maps[b]!.m) });

  for (const { a, b, d } of pairs) {
    const t = d.toFixed(3);
    const fam = sameFamily(a.icon, b.icon);
    if (fam) {
      // A family that did not differ anywhere is the only duplicate a family can have.
      const p = inkPeak(a.m, b.m);
      if (p < FAMILY_PEAK) {
        const q = p.toFixed(3);
        r.add(a.icon.svgPath, "duplicate/perceptual", `nothing distinguishes it from ${b.icon.slug} (peak ${q})`);
        r.add(b.icon.svgPath, "duplicate/perceptual", `nothing distinguishes it from ${a.icon.slug} (peak ${q})`);
      }
      continue;
    }
    const NEAR = NEAR_IDENTICAL;
    const SIM = VERY_SIMILAR;
    if (d <= NEAR) {
      r.add(a.icon.svgPath, "duplicate/perceptual", `renders almost identically to ${b.icon.slug} (${t})`);
      r.add(b.icon.svgPath, "duplicate/perceptual", `renders almost identically to ${a.icon.slug} (${t})`);
    } else if (d <= SIM) {
      r.add(a.icon.svgPath, "duplicate/similar", `looks very close to ${b.icon.slug} (${t})`, "warn");
      r.add(b.icon.svgPath, "duplicate/similar", `looks very close to ${a.icon.slug} (${t})`, "warn");
    } else if (d <= RELATED) {
      related.set(a.icon.slug, [...(related.get(a.icon.slug) ?? []), b.icon.slug]);
      related.set(b.icon.slug, [...(related.get(b.icon.slug) ?? []), a.icon.slug]);
    }
  }

  if (process.argv.includes("--matrix")) {
    console.log("Closest pairs:");
    for (const { a, b, d } of pairs.sort((x, y) => x.d - y.d).slice(0, 12))
      console.log(`  ${d.toFixed(3)}  ${a.icon.slug} <-> ${b.icon.slug}`);
    console.log();
  }
}

console.log(`Duplicate scan: ${icons.length} icons, layers 1-2${perceptual ? " + 3 (perceptual)" : ""}\n`);
// Without --perceptual this run cannot produce duplicate/similar, so it must not judge
// those acceptances stale.
r.finish(perceptual ? WAIVABLE_DUPLICATE_RULES : ["duplicate/structural"]);
const ok = r.print();
if (perceptual && related.size)
  console.log(`\n${related.size} icons picked up "related" suggestions — consumed by the metadata generator.`);
process.exit(ok ? 0 : 1);
