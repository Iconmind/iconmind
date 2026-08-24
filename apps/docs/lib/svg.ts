import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "..", "..", "packages", "icons", "icons");

/**
 * Reads an icon's raw SVG at build time.
 *
 * The site renders icons as inline SVG rather than <img> per icon: a thousand image
 * requests would undo every other performance decision on the page.
 */
export function readSvg(category: string, slug: string): string {
  return readFileSync(join(ROOT, category, `${slug}.svg`), "utf8").trim();
}

/** Strips the wrapper so the paths can be dropped into a differently-sized <svg>. */
export function svgBody(svg: string): string {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}
