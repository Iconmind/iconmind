/**
 * One PNG per icon, for the machines that cannot read our SVG.
 *
 * The site draws every icon inline, which is right for people and invisible to Google
 * Images and to every social card: a crawler needs a real image at a real URL, and the
 * page has never had one. This writes `apps/web/public/p/<slug>.png` — outline regular,
 * the set's default black on a transparent ground, 512 px so it survives being cropped
 * into a card or a thumbnail. One file per icon, not one per cell: the variants and
 * weights and colours a person wants are rendered in their browser when they ask.
 *
 * Tracked like `public/i`, on purpose (the user's call): the site is open source and a
 * clone should be the site.
 */
import { mkdir, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { fromRoot, loadIcons } from "../lib/fs.ts";

const OUT = fromRoot("apps/web/public/p");
const SIZE = 512;

const icons = (await loadIcons()).filter((i) => i.svg);
await mkdir(OUT, { recursive: true });

// Remove previews of icons that no longer exist, so a dropped icon does not keep a face.
const keep = new Set(icons.map((i) => `${i.slug}.png`));
for (const f of await readdir(OUT)) if (f.endsWith(".png") && !keep.has(f)) await rm(join(OUT, f));

let bytes = 0;
for (const icon of icons) {
  const svg = icon.svg.replace(/currentColor/g, "#000000");
  const png = new Resvg(svg, { fitTo: { mode: "width", value: SIZE } }).render().asPng();
  bytes += png.length;
  await writeFile(join(OUT, `${icon.slug}.png`), png);
}
console.log(`apps/web/public/p — ${icons.length} previews, ${(bytes / 1024).toFixed(0)} KB`);
