import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "..", "..", "packages", "icons", "icons");

/**
 * Reads an icon's raw SVG at build time.
 *
 * The site renders icons as inline SVG rather than <img> per icon: a thousand image
 * requests would undo every other performance decision on the page.
 */
export function readSvg(category: string, slug: string, cell = "outline-regular"): string {
  return readFileSync(join(ROOT, category, slug, `${cell}.svg`), "utf8").trim();
}

/** Strips the wrapper so the paths can be dropped into a differently-sized <svg>. */
export function svgBody(svg: string): string {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

export interface Cell { variant: string; weight: string; body: string }

const VARIANTS = ["outline", "duotone"];
const WEIGHTS = ["thin", "regular", "bold"];

/**
 * Every matrix cell a concept actually has, at build time.
 *
 * Missing cells are omitted rather than faked. Offering a dead control is worse than
 * showing the reader that the cell does not exist.
 */
export function readCells(category: string, slug: string): Cell[] {
  const out: Cell[] = [];
  for (const variant of VARIANTS)
    for (const weight of WEIGHTS) {
      const p = join(ROOT, category, slug, `${variant}-${weight}.svg`);
      if (!existsSync(p)) continue;
      out.push({ variant, weight, body: svgBody(readFileSync(p, "utf8").trim()) });
    }
  return out;
}

/**
 * The elements of a cell, as tag and attributes — what an Open Graph card needs to
 * redraw the icon with satori. A cell is the forge's own output: flat, one element per
 * line, double-quoted attributes, no nesting — so a regex is the whole parser, and the
 * site does not have to compile `@iconmind/shared` to draw a card.
 */
export function svgElements(svg: string): { tag: string; attrs: Record<string, string> }[] {
  const out: { tag: string; attrs: Record<string, string> }[] = [];
  for (const m of svg.matchAll(/<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)\/?>/g)) {
    const attrs: Record<string, string> = {};
    for (const a of m[2]!.matchAll(/([a-zA-Z-]+)="([^"]*)"/g)) attrs[a[1]!] = a[2]!;
    out.push({ tag: m[1]!, attrs });
  }
  return out;
}
