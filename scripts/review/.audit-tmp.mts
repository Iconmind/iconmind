/**
 * Whole-set consistency audit — the checks the validator does NOT make.
 *
 * Pixel-based, using the same rasterizer the validator trusts. For every icon:
 *   - bbox width/height in grid units (from a 10x render of outline-regular)
 *   - centroid offset from canvas centre
 *   - ink coverage at 24px, and at 16px (mush proxy)
 *   - bold ink ratio: bold-16px coverage vs regular-16px (fusion proxy)
 *   - element count (path nodes in the SVG)
 * Prints one JSON line per icon; aggregation happens downstream.
 */
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packages/icons/icons";

function pixels(svg: string, size: number): Uint8Array {
  const r = new Resvg(svg, { fitTo: { mode: "width", value: size }, background: "white" });
  return r.render().pixels; // RGBA
}
const dark = (px: Uint8Array, i: number) => px[i * 4]! < 128;

function inkStats(svg: string, size: number) {
  const px = pixels(svg, size);
  const n = size * size;
  let ink = 0, sx = 0, sy = 0, minX = size, maxX = -1, minY = size, maxY = -1;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      if (dark(px, i)) {
        ink++; sx += x; sy += y;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  return {
    cover: ink / n,
    cx: ink ? sx / ink : size / 2,
    cy: ink ? sy / ink : size / 2,
    w: maxX - minX + 1, h: maxY - minY + 1, minX, minY,
  };
}

const rows: string[] = [];
for (const cat of readdirSync(ROOT)) {
  const d = join(ROOT, cat);
  if (!statSync(d).isDirectory()) continue;
  for (const slug of readdirSync(join(d))) {
    const dir = join(d, slug);
    if (!statSync(dir).isDirectory()) continue;
    const reg = readFileSync(join(dir, "outline-regular.svg"), "utf8");
    const bold = readFileSync(join(dir, "outline-bold.svg"), "utf8");
    const elements = (reg.match(/<path/g) ?? []).length;

    const S = 240; // 10x grid
    const a = inkStats(reg, S);
    const r16 = inkStats(reg, 16);
    const b16 = inkStats(bold, 16);

    rows.push(JSON.stringify({
      icon: `${cat}/${slug}`,
      w: +(a.w / 10).toFixed(1), h: +(a.h / 10).toFixed(1),
      // centroid offset from centre, grid units
      dx: +((a.cx - S / 2) / 10).toFixed(2), dy: +((a.cy - S / 2) / 10).toFixed(2),
      cover24: +a.cover.toFixed(4),
      cover16: +r16.cover.toFixed(4),
      boldRatio: +(b16.cover / Math.max(r16.cover, 1e-6)).toFixed(3),
      elements,
    }));
  }
}
console.log(rows.join("\n"));
