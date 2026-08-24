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
import { DOMAINS, SUBCATEGORIES, STROKE_WIDTH, VIEW_BOX, SCAFFOLD_DESCRIPTION, SCAFFOLD_TAGS, isValidSlug, type Domain } from "@iconmind/shared";
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

const dir = join(fromRoot("packages/icons/icons"), category!);
const svgPath = join(dir, `${slug}.svg`);
const jsonPath = join(dir, `${slug}.json`);
for (const p of [svgPath, jsonPath]) {
  if (await access(p).then(() => true, () => false)) die(`${p} already exists.`);
}

const title = slug!.split("-").map((w) => w[0]!.toUpperCase() + w.slice(1)).join(" ");

/** The house container, so the starting point already speaks the design language. */
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${VIEW_BOX}" ` +
  `fill="none" stroke="currentColor" stroke-width="${STROKE_WIDTH}" ` +
  `stroke-linecap="round" stroke-linejoin="round">` +
  `<path d="M6 2h12l4 4v12l-4 4H6l-4-4V6z"/>` +
  `</svg>\n`;

const json = JSON.stringify({
  $schema: "https://iconmind.dev/schema/icon.json",
  slug, category, subcategory,
  name: title,
  description: SCAFFOLD_DESCRIPTION,
  tags: [...SCAFFOLD_TAGS],
  aliases: [], keywords: [], contributors: [],
}, null, 2) + "\n";

await mkdir(dir, { recursive: true });
await writeFile(svgPath, svg);
await writeFile(jsonPath, json);

console.log(`\x1b[32m✓\x1b[0m ${svgPath}
\x1b[32m✓\x1b[0m ${jsonPath}

Next:
  1. Draw it. Anchors stay inside 2..22; containers cut corners at 45°, not rounded.
  2. Replace the TODO description and tags in the .json.
  3. pnpm icons:validate     — 30+ rules, under 5 seconds
  4. pnpm icons:duplicates   — make sure it is not a twin of something we have
  5. pnpm changeset          — choose "minor"

Design language: docs/masterplan/03-design-system.md`);
