/**
 * The contact sheet: every requested icon at 88, 24 and 16 px, labelled, on one image.
 *
 * Rendered with Resvg — the same rasterizer the validator trusts — by composing one big
 * SVG and rasterizing it once. It used to drive a headless browser for this, which meant
 * the review tool depended on Playwright while the product did not; the tool that looks
 * at icons now uses the same engine as the tool that measures them.
 *
 *   ONLY="slug slug…" npx tsx scripts/review/sheet.mts outline-regular out.png
 */
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/icons/icons";
const cell = process.argv[2] ?? "outline-regular";
const INK = process.env.INK ?? "#111";
const BG = process.env.BG ?? "#fff";
const LINE = process.env.LINE ?? "#e6e6e6";
const MUTED = process.env.MUTED ?? "#666";
const out = process.argv[3] ?? "sheet.png";

const icons: { slug: string; svg: string }[] = [];
for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(d)) {
    const f = join(d, slug, `${cell}.svg`);
    if (existsSync(f)) icons.push({ slug, svg: readFileSync(f, "utf8").trim() });
  }
}
icons.sort((a, b) => a.slug.localeCompare(b.slug));
const only = process.env.ONLY;
const keep = only ? new Set(only.split(/\s+/).filter(Boolean)) : null;
const shown = keep ? icons.filter((i) => keep.has(i.slug)) : icons;

/** An icon's cell, placed at (x, y): the three sizes side by side over the slug. */
const COLS = 5, CW = 164, CH = 148, PAD = 20;
/**
 * The root <svg> tag carries the cell's whole paint contract — fill="none", the stroke,
 * its width, the round caps. Unwrapping the tag without carrying those over paints every
 * path with SVG's defaults, which is a solid black fill.
 */
const inner = (svg: string) => {
  const attrs = (svg.match(/<svg([^>]*)>/)?.[1] ?? "")
    .replace(/\s(?:xmlns|width|height|viewBox)="[^"]*"/g, "");   // \s guard: "width" must not match inside stroke-width
  const body = svg.replace(/<svg[^>]*>/, "").replace("</svg>", "");
  return `<g${attrs}>${body}</g>`;
};
const place = (i: { slug: string; svg: string }, x: number, y: number) => {
  const g = inner(i.svg.replace(/currentColor/g, INK));
  return `
  <rect x="${x}" y="${y}" width="${CW - 14}" height="${CH - 14}" rx="8" fill="${BG}" stroke="${LINE}"/>
  <g transform="translate(${x + 14},${y + 16}) scale(${88 / 24})">${g}</g>
  <g transform="translate(${x + 108},${y + 80})">${g}</g>
  <g transform="translate(${x + 108 + 28},${y + 88}) scale(${16 / 24})">${g}</g>
  <text x="${x + (CW - 14) / 2}" y="${y + CH - 24}" text-anchor="middle"
        font-family="Menlo, monospace" font-size="11" fill="${MUTED}">${i.slug}</text>`;
};

const rows = Math.ceil(shown.length / COLS);
const W = PAD * 2 + COLS * CW, H = PAD * 2 + rows * CH;
const sheet =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
  `<rect width="${W}" height="${H}" fill="${BG}"/>` +
  shown.map((i, k) => place(i, PAD + (k % COLS) * CW, PAD + Math.floor(k / COLS) * CH)).join("") +
  `</svg>`;

const png = new Resvg(sheet, { fitTo: { mode: "width", value: W * 2 } }).render().asPng();
writeFileSync(out, png);
console.log(out, shown.length);
