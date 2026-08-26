/**
 * Scaffolds one icon: `pnpm icons:new <category> <slug> [subcategory]`
 *
 * The scaffold is deliberately a valid, drawable starting point rather than an empty
 * file — it hands the contributor the house container so the first thing they see is
 * the design language, not a blank canvas. Metadata is seeded with TODO markers that
 * the validator rejects by name — lower-case so they clear the tag charset rule and
 * reach that check, rather than dying on a regex the contributor has to decode.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import { ACRONYMS, DOMAINS, SUBCATEGORIES, SCAFFOLD_DESCRIPTION, SCAFFOLD_TAGS, isValidSlug, type Domain } from "@iconmind/shared";
import { fromRoot, loadIcons } from "../lib/fs.ts";

const [category, slug, subcategoryArg] = process.argv.slice(2);

const die = (msg: string): never => { console.error(`\x1b[31m${msg}\x1b[0m`); process.exit(1); };

if (!category || !slug) {
  die(`Usage: pnpm icons:new <category> <slug> [subcategory]\n\n` +
      `Categories: ${DOMAINS.join(", ")}\n` +
      `Example:    pnpm icons:new agents agent-memory memory`);
}
if (!(DOMAINS as readonly string[]).includes(category!)) {
  die(`'${category}' is not a category.\nPick one of: ${DOMAINS.join(", ")}`);
}
if (!isValidSlug(slug!)) {
  die(`'${slug}' is not a valid slug — kebab-case, 2 to 40 characters, letters and digits only.`);
}

const subs = SUBCATEGORIES[category as Domain];
const subcategory = subcategoryArg ?? subs[0]!;
if (!subs.includes(subcategory)) {
  die(`'${subcategory}' is not a subcategory of '${category}'.\nPick one of: ${subs.join(", ")}`);
}

// Slugs are the public API and must be unique across every category, not just this one.
const clash = (await loadIcons()).find((i) => i.slug === slug);
if (clash) die(`'${slug}' already exists in '${clash.category}'.`);

// One directory per concept, holding its metadata and every matrix cell it has.
// Only the master is scaffolded; the other eight are derived from it later.
const dir = join(fromRoot("packages/icons/icons"), category!, slug!);
const jsonPath = join(dir, `${slug}.json`);
if (await access(jsonPath).then(() => true, () => false)) die(`${jsonPath} already exists.`);

const title = slug!.split("-")
  .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w[0]!.toUpperCase() + w.slice(1)))
  .join(" ");

/**
 * A starting declaration, not an empty field.
 *
 * `d` is ordinary SVG path data and `closed` marks a shape as part of the silhouette —
 * the two things a contributor has to understand before they can draw anything. Handing
 * them an empty array means reading the docs to learn that.
 */
const seedShapes = [
  { d: "M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z", closed: true },
  { d: "M8 12h8" },
];

const json = JSON.stringify({
  $schema: "https://iconmind.dev/schema/icon.json",
  slug, category, subcategory,
  name: title,
  description: SCAFFOLD_DESCRIPTION,
  tags: [...SCAFFOLD_TAGS],
  shapes: seedShapes,
  aliases: [], keywords: [], contributors: [],
}, null, 2) + "\n";

await mkdir(dir, { recursive: true });
await writeFile(jsonPath, json);

console.log(`\x1b[32m✓\x1b[0m ${jsonPath}

Next:
  1. Draw. Edit 'shapes' in the .json — SVG path data, one entry per shape.
     'closed: true' marks a shape as enclosing an area, which is what the duotone
     tint lands on. Anchors stay inside 3..21 so the painted edge lands on 2..22.
  2. Replace the TODO description and tags.
  3. pnpm icons:cells        — writes all 6 cells from the declaration
  4. pnpm icons:validate     — 30+ rules, under 5 seconds
  5. pnpm icons:duplicates   — make sure it is not a twin of something we have
  6. pnpm changeset          — choose "minor"

You never write an SVG. All six cells come from the declaration, so no cell can
drift from another — they are the same paths at a stroke width, with a tint on the
closed shapes. Editing a generated SVG by hand is caught as stale.

Design language: scripts/draw/forms.ts — the constructors are the rules.`);
