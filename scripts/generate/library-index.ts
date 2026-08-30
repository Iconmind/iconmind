/**
 * A small index for the tools that build a library out of the set — the Figma plugin
 * above all: slug, name, category and description, nothing else.
 *
 * The full `metadata.json` is 3.5 MB and carries shapes, hashes and relations no plugin
 * needs; the search index is interned for the site's own matcher. This is 250 KB of
 * plain records, served from the site so a plugin is always looking at the current
 * release without shipping the set inside itself.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { fromRoot, loadIcons } from "../lib/fs.ts";
import { readFile } from "node:fs/promises";

const icons = (await loadIcons()).filter((i) => i.svg && i.json);
const version = JSON.parse(await readFile(fromRoot("packages/icons/package.json"), "utf8")).version as string;
const categories = JSON.parse(await readFile(fromRoot("packages/icons/dist/metadata.json"), "utf8")).categories as { slug: string; name: string }[];
const named = new Map(categories.map((c) => [c.slug, c.name]));

const out = {
  version,
  categories: categories.map((c) => ({ slug: c.slug, name: c.name })),
  icons: icons.map((i) => {
    const m = JSON.parse(i.json!) as { name: string; description: string };
    return { s: i.slug, n: m.name, c: i.category, cn: named.get(i.category) ?? i.category, d: m.description };
  }).sort((a, b) => a.s.localeCompare(b.s)),
};
await mkdir(fromRoot("apps/web/public"), { recursive: true });
await writeFile(fromRoot("apps/web/public/library.json"), JSON.stringify(out));
console.log(`apps/web/public/library.json — ${out.icons.length} icons, ${(JSON.stringify(out).length / 1024).toFixed(0)} KB`);
