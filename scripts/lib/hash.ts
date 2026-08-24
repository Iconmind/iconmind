import { createHash } from "node:crypto";
import { Resvg } from "@resvg/resvg-js";
import { parseSvg } from "@iconmind/shared";

/** Layer 1 — exact match. Trustworthy only because the optimizer output is canonical. */
export const contentHash = (svg: string) =>
  "sha256:" + createHash("sha256").update(svg.trim()).digest("hex");

/**
 * Layer 2 — shape without coordinates. Catches the same icon drawn a hair off, which
 * layer 1 misses and which a human reviewer usually misses too.
 */
export function structuralHash(svg: string): string {
  const { children } = parseSvg(svg);
  return children
    .map((c) =>
      c.tag === "path"
        ? `path:${(c.attrs["d"] ?? "").replace(/[^A-Za-z]/g, "").toUpperCase()}`
        : c.tag,
    )
    .sort()
    .join("|");
}

const GRID = 16;   // 16x16 ink-coverage map

/**
 * Layer 3 — perceptual. A downsampled ink-coverage map, compared directly.
 *
 * The obvious choice here is dHash, and it was the first thing tried. It does not work
 * on stroke-only line art: with 16 icons on a 24px canvas the gradient bits are
 * dominated by the outer silhouette, so a rounded rectangle full of bars scored a
 * distance of 4 from a speech bubble. Comparing ink coverage cell by cell keeps the
 * interior detail that actually distinguishes these icons.
 */
export function inkMap(svg: string): Float64Array {
  const r = new Resvg(svg.replace(/currentColor/g, "#000"), {
    fitTo: { mode: "width", value: 96 },
    background: "#fff",
  }).render();
  const { pixels, width, height } = r;

  const sum = new Float64Array(GRID * GRID);
  const count = new Float64Array(GRID * GRID);
  for (let y = 0; y < height; y++) {
    const gy = Math.min(GRID - 1, Math.floor((y / height) * GRID));
    for (let x = 0; x < width; x++) {
      const gx = Math.min(GRID - 1, Math.floor((x / width) * GRID));
      const i = (y * width + x) * 4;
      const lum = (0.299 * pixels[i]! + 0.587 * pixels[i + 1]! + 0.114 * pixels[i + 2]!) / 255;
      sum[gy * GRID + gx]! += 1 - lum;      // 1 = fully inked
      count[gy * GRID + gx]! += 1;
    }
  }
  const out = new Float64Array(GRID * GRID);
  for (let i = 0; i < out.length; i++) out[i] = sum[i]! / count[i]!;
  return out;
}

/** Mean absolute difference of ink coverage. 0 = identical, 1 = opposite. */
export function inkDistance(a: Float64Array, b: Float64Array): number {
  let d = 0;
  for (let i = 0; i < a.length; i++) d += Math.abs(a[i]! - b[i]!);
  return d / a.length;
}
