/**
 * One sprite sheet of <symbol> elements, for consumers with no build step at all.
 * Referenced as <svg><use href="sprite.svg#im-agent"/></svg>.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { parseSvg, VIEW_BOX } from "@iconmind/shared";
import { fromRoot, loadIcons } from "../lib/fs.ts";

const OUT = fromRoot("packages/icons/dist");
const icons = (await loadIcons()).filter((i) => i.svg).sort((a, b) => a.slug.localeCompare(b.slug));

const symbols = icons.map((icon) => {
  const body = parseSvg(icon.svg).children
    .map((c) => `<${c.tag} ${Object.entries(c.attrs).map(([k, v]) => `${k}="${v}"`).join(" ")}/>`)
    .join("");
  return `<symbol id="im-${icon.slug}" viewBox="${VIEW_BOX}">${body}</symbol>`;
}).join("");

const sprite =
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" ` +
  `stroke-linecap="round" stroke-linejoin="round" style="display:none">${symbols}</svg>\n`;

await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}/sprite.svg`, sprite);
console.log(`sprite.svg — ${icons.length} symbols, ${(Buffer.byteLength(sprite) / 1024).toFixed(1)} KB`);
