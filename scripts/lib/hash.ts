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

/** Total ink in a map — how much of the canvas the drawing covers, 0..1. */
export const inkTotal = (m: Float64Array) => {
  let s = 0;
  for (const v of m) s += v;
  return s / m.length;
};

/** The ink bounding box of a rendered cell, in canvas units. Null when nothing is drawn. */
export function inkBox(svg: string): { x0: number; y0: number; x1: number; y1: number } | null {
  const r = new Resvg(svg.replace(/currentColor/g, "#000"), {
    fitTo: { mode: "width", value: 96 }, background: "#fff",
  }).render();
  const { pixels, width, height } = r;
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      // Any pixel darker than near-white counts as ink; antialiased edges included.
      if (pixels[(y * width + x) * 4]! < 224) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  if (x1 < 0) return null;
  const k = 24 / width;
  return { x0: x0 * k, y0: y0 * k, x1: (x1 + 1) * k, y1: (y1 + 1) * k };
}

/**
 * The largest single-cell difference between two ink maps.
 *
 * The mean is the wrong instrument for a badge family. `agent-add` and `agent-check`
 * share a base and differ only in a 5×5 mark, so the mean difference is 0.02 — under the
 * threshold that says "these are the same icon" — while a person tells them apart
 * instantly. The peak asks the question that actually matters: is there anywhere on the
 * canvas where these two are plainly not the same? A real accidental duplicate has no
 * such place; a badged pair has several.
 */
export function inkPeak(a: Float64Array, b: Float64Array): number {
  let p = 0;
  for (let i = 0; i < a.length; i++) p = Math.max(p, Math.abs(a[i]! - b[i]!));
  return p;
}
