/**
 * One bundle per matrix cell: `{ slug: body }` for the whole set.
 *
 * The browse grid ships `outline-regular` inline, the way it always has. A duotone body is
 * a different string from its outline — the tint is an attribute on the shapes, not on the
 * root — so switching variant means switching bodies for the whole grid at once. Inlining
 * all six is about 1.2 MB; fetched on demand it is one 190 KB file, gzipped to about 40,
 * and only for the readers who touch the control.
 *
 * Cells an icon does not have are simply absent from its bundle, and the grid falls back
 * to the outline rather than showing a hole.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fromRoot } from "../lib/fs.ts";

const ICONS = fromRoot("packages/icons/icons");
const OUT = fromRoot("apps/web/public/v");

const CELLS = [
  "outline-thin", "outline-regular", "outline-bold",
  "duotone-thin", "duotone-regular", "duotone-bold",
] as const;

const body = (svg: string) =>
  svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();

const metadata = JSON.parse(
  await readFile(fromRoot("packages/icons/dist/metadata.json"), "utf8"),
) as { icons: { slug: string; category: string }[] };

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const cell of CELLS) {
  const map: Record<string, string> = {};
  for (const icon of metadata.icons) {
    const file = join(ICONS, icon.category, icon.slug, `${cell}.svg`);
    if (!existsSync(file)) continue;
    map[icon.slug] = body(await readFile(file, "utf8"));
  }
  const json = JSON.stringify(map);
  await writeFile(join(OUT, `${cell}.json`), json);
  console.log(`  ${cell.padEnd(16)} ${Object.keys(map).length} icons, ${Math.round(json.length / 1024)} KB`);
}

console.log(`apps/web/public/v — ${CELLS.length} bundles`);
