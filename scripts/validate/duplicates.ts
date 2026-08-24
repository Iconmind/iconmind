/**
 * Three layers, cheapest first.
 *
 * The third layer earns its cost twice: it catches near-duplicates, and the pairs it
 * finds at a middling distance become the "related icons" list on each icon's page.
 * A quality check that also produces a product feature.
 */
import { loadIcons } from "../lib/fs.ts";
import { Report } from "../lib/report.ts";
import { contentHash, structuralHash, inkMap, inkDistance } from "../lib/hash.ts";

const perceptual = process.argv.includes("--perceptual");
const icons = (await loadIcons()).filter((i) => i.svg);
const r = new Report();
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

// Layer 2 — same shapes, different coordinates.
const byStructure = new Map<string, string[]>();
for (const i of icons) {
  const h = structuralHash(i.svg);
  byStructure.set(h, [...(byStructure.get(h) ?? []), i.svgPath]);
}
for (const [, files] of byStructure) {
  if (files.length > 1)
    for (const f of files)
      r.add(f, "duplicate/structural",
        `same shape composition as ${files.filter((x) => x !== f).join(", ")} — review`, "warn");
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
const FAMILY_IDENTICAL = 0.025;
const FAMILY_SIMILAR   = 0.050;
const head = (slug: string) => slug.split("-")[0];
const sameFamily = (a: { slug: string; category: string }, b: { slug: string; category: string }) =>
  a.category === b.category && (head(a.slug) === head(b.slug) || a.slug.startsWith(b.slug) || b.slug.startsWith(a.slug));

const related = new Map<string, string[]>();
if (perceptual) {
  const maps = icons.map((i) => ({ icon: i, m: inkMap(i.svg) }));
  const pairs: Array<{ a: typeof maps[0]; b: typeof maps[0]; d: number }> = [];
  for (let a = 0; a < maps.length; a++)
    for (let b = a + 1; b < maps.length; b++)
      pairs.push({ a: maps[a]!, b: maps[b]!, d: inkDistance(maps[a]!.m, maps[b]!.m) });

  for (const { a, b, d } of pairs) {
    const t = d.toFixed(3);
    const fam = sameFamily(a.icon, b.icon);
    const NEAR = fam ? FAMILY_IDENTICAL : NEAR_IDENTICAL;
    const SIM = fam ? FAMILY_SIMILAR : VERY_SIMILAR;
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
const ok = r.print();
if (perceptual && related.size)
  console.log(`\n${related.size} icons picked up "related" suggestions — consumed by the metadata generator.`);
process.exit(ok ? 0 : 1);
