/**
 * Renders the README preview grid from the real icon sources.
 *
 * Committing a hand-made preview image guarantees it goes stale; generating it means
 * the picture at the top of the README is always the set as it actually is.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { parseSvg } from "@iconmind/shared";
import { fromRoot, loadIcons } from "../lib/fs.ts";

const COLS = 10;
const SCALE = 2;          // a 24px icon drawn at 48px
const CELL = 24 * SCALE + 24;
const OUT = fromRoot(".github/assets");

const icons = (await loadIcons()).filter((i) => i.svg).sort((a, b) => a.slug.localeCompare(b.slug));
const rows = Math.ceil(icons.length / COLS);
const width = COLS * CELL;
const height = rows * CELL;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function sheet(stroke: string) {
  const cells = icons.map((icon, i) => {
    const { children } = parseSvg(icon.svg);
    const body = children
      .map((c) => `<${c.tag} ${Object.entries(c.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(" ")}/>`)
      .join("");
    const x = (i % COLS) * CELL + 12;
    const y = Math.floor(i / COLS) * CELL + 12;
    return `<g transform="translate(${x} ${y}) scale(${SCALE})">${body}</g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
    fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${cells.join("")}</svg>`;
}

await mkdir(OUT, { recursive: true });
for (const [name, stroke] of [["light", "#18181b"], ["dark", "#fafafa"]] as const) {
  const png = new Resvg(sheet(stroke), { fitTo: { mode: "width", value: width * 2 } })
    .render()
    .asPng();
  await writeFile(`${OUT}/preview-${name}.png`, png);
}

// The README badge is part of the same generated surface. A hand-typed count is a
// promise to keep updating it, and that promise always breaks around icon 40.
const readme = fromRoot("README.md");
const before = await readFile(readme, "utf8");
const after = before.replace(/icons-\d+-black/, `icons-${icons.length}-black`);
if (after !== before) {
  await writeFile(readme, after);
  console.log(`README badge updated to ${icons.length}`);
}

console.log(`Preview grid: ${icons.length} icons, ${COLS}x${rows} -> ${OUT}/preview-{light,dark}.png`);
