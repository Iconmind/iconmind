/**
 * The pictures at the top of the README, drawn from the real icons.
 *
 * Two of them, because a set this size has two things to show and one grid cannot do
 * both. The **hero** is a wide band of icons spread evenly across all 2,271 — proof of
 * range in one screen, not the first hundred alphabetically, and not a 228-row wall.
 * The **variants** strip shows a handful of icons in all six cells at once, which is
 * the claim readers most often disbelieve: outline and duotone, each at three weights,
 * every one its own drawing.
 *
 * Both are transparent PNGs in a light and a dark cut, so the README's <picture> can
 * hand GitHub whichever the reader's theme needs.
 *
 *   pnpm icons:preview
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { parseSvg } from "@iconmind/shared";
import { fromRoot, loadIcons } from "../lib/fs.ts";

const OUT = fromRoot(".github/assets");
const ICONS_DIR = fromRoot("packages/icons/icons");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const all = (await loadIcons()).filter((i) => i.svg).sort((a, b) => a.slug.localeCompare(b.slug));

const body = (svg: string) =>
  parseSvg(svg).children
    .map((c) => `<${c.tag} ${Object.entries(c.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(" ")}/>`)
    .join("");

/** `n` icons taken at an even stride, so the picture is the range and not the letter A. */
const spread = <T,>(list: T[], n: number) =>
  Array.from({ length: n }, (_, i) => list[Math.floor((i * list.length) / n)]!);

const png = (svg: string, width: number) =>
  new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();

/* ── the hero: a wide band across the whole set ───────────────────────────────────── */
const COLS = 26, ROWS = 6, DRAW = 40, CELL = DRAW + 30;

function hero(stroke: string) {
  const picked = spread(all, COLS * ROWS);
  const cells = picked.map((icon, i) => {
    const x = (i % COLS) * CELL + 15;
    const y = Math.floor(i / COLS) * CELL + 15;
    return `<g transform="translate(${x} ${y}) scale(${DRAW / 24})">${body(icon.svg)}</g>`;
  });
  const w = COLS * CELL, h = ROWS * CELL;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
    fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${cells.join("")}</svg>`;
}

/* ── the variants strip: a few icons in all six cells ─────────────────────────────── */
const SHOWN = ["agent", "vector-database", "mcp-server", "retriever", "guardrail", "tool-calling"];
const CELLS = [
  ["outline-thin", "Outline · thin"], ["outline-regular", "Outline · regular"], ["outline-bold", "Outline · bold"],
  ["duotone-thin", "Duotone · thin"], ["duotone-regular", "Duotone · regular"], ["duotone-bold", "Duotone · bold"],
] as const;

async function variants(stroke: string, label: string) {
  const size = 44, gapX = 116, gapY = 78, padX = 26, padY = 56;
  const rows: string[] = [];
  for (const [r, slug] of SHOWN.entries()) {
    const icon = all.find((i) => i.slug === slug);
    if (!icon) continue;
    for (const [c, [cell]] of CELLS.entries()) {
      const svg = await readFile(join(ICONS_DIR, icon.category, icon.slug, `${cell}.svg`), "utf8").catch(() => null);
      if (!svg) continue;
      const x = padX + c * gapX + (gapX - size) / 2;
      const y = padY + r * gapY;
      // Each cell carries its own stroke width on its root tag — the whole point of the
      // strip. Taking only the children would draw all three weights at the root width
      // set on the sheet, which is a picture of the claim being false.
      const w = /stroke-width="([0-9.]+)"/.exec(svg.slice(0, svg.indexOf(">")))?.[1] ?? "2";
      rows.push(`<g transform="translate(${x} ${y}) scale(${size / 24})" stroke-width="${w}">${body(svg)}</g>`);
    }
  }
  const heads = CELLS.map(([, name], c) =>
    `<text x="${padX + c * gapX + gapX / 2}" y="34" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
       font-size="15" fill="${label}" stroke="none">${name}</text>`).join("");
  const w = padX * 2 + CELLS.length * gapX, h = padY + SHOWN.length * gapY + 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
    fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${heads}${rows.join("")}</svg>`;
}

/* ── the social preview: what a link to the repo unfurls into ─────────────────────── */
const CREAM = "#FAF8F5", INK = "#14110E", MUTED = "#5C554D", ACCENT = "#C2410C";

/**
 * GitHub, X, Slack and Discord all show one image for a repository link, and a repo with
 * none shows a grey placeholder with an owner avatar. 1280×640 is GitHub's own size.
 * Painted rather than transparent: a social card is composited on backgrounds we do not
 * control, and the count is drawn in so it cannot go stale.
 */
function social() {
  const band = (list: typeof all, y: number, size: number, gap: number) =>
    list.map((icon, i) => `<g transform="translate(${72 + i * (size + gap)} ${y}) scale(${size / 24})">${body(icon.svg)}</g>`).join("");
  const picked = spread(all, 28);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640">
    <rect width="1280" height="640" fill="${CREAM}"/>
    <g fill="none" stroke="${INK}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
       transform="translate(72 64) scale(2)">
      <path d="M12 4 20 8 20 16 12 20 4 16 4 8Z"/><path d="M12 4v8l8 4"/><path d="m12 12-8 4"/>
      <path d="m12 12 8-4" stroke="${ACCENT}"/><circle cx="12" cy="12" r="1.7" fill="${ACCENT}" stroke="none"/>
    </g>
    <text x="140" y="96" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="${INK}" letter-spacing="-1.4">IconMind</text>
    <text x="72" y="250" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="${INK}" letter-spacing="-2.4">${all.length.toLocaleString("en-US")} icons for AI-era software</text>
    <text x="72" y="312" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${MUTED}">Agents · MCP · RAG · models · and every interface family around them</text>
    <text x="72" y="372" font-family="Helvetica, Arial, sans-serif" font-size="27" font-weight="600" fill="${ACCENT}">Outline and duotone · thin, regular, bold · MIT · 10 packages · MCP server</text>
    <g fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${band(picked.slice(0, 14), 452, 44, 42)}${band(picked.slice(14), 552, 44, 42)}
    </g>
  </svg>`;
}

await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, "social-preview.png"), png(social(), 1280));
for (const [name, stroke, label] of [["light", "#18181b", "#71717a"], ["dark", "#fafafa", "#a1a1aa"]] as const) {
  const h = hero(stroke);
  await writeFile(join(OUT, `preview-${name}.png`), png(h, 26 * CELL));
  const v = await variants(stroke, label);
  await writeFile(join(OUT, `variants-${name}.png`), png(v, 6 * 116 + 52));
}
console.log(`.github/assets — hero ${COLS}×${ROWS} of ${all.length} icons, variants ${SHOWN.length}×6`);
