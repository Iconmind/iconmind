/**
 * Declarations in, cells out.
 *
 * Six cells, and no geometry is derived for any of them:
 *
 * - the three outline weights are the same paths at three `stroke-width` values
 * - the three duotone weights are those paths again, with the closed ones tinted at a
 *   reduced opacity — an attribute, not an offset
 *
 * There is no seventh cell. A solid variant went with the decision to draw open
 * silhouettes: a shape that will not close has no inside, so its solid form is a band as
 * wide as the stroke that drew it and reads indistinguishably from the outline. Dropping
 * it took every offset, band and winding rule out of the engine along with it.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { VARIANTS, WEIGHTS, SVG_CLOSE, svgOpen, hasWeight, cellName, DUOTONE_OPACITY } from "@iconmind/shared";
import type { Variant, Weight } from "@iconmind/shared";
import type { Shape } from "./forms.ts";

export interface Icon {
  slug: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  tags: readonly string[];
  /**
   * Other slugs people type when they mean this one.
   *
   * Not synonyms in general — slugs, so a search for `bot` lands on `agent` rather than on
   * a list. Every alias the set does not carry is a reader who concludes it has no icon
   * for the thing it plainly has.
   */
  aliases?: readonly string[];
  /** Words worth matching that are not slugs and not tags: jargon, spellings, product names. */
  keywords?: readonly string[];
  /**
   * The drawing. One list, and the only one.
   *
   * All six cells come from it. What separates them is `stroke-width` and, for duotone, a
   * fill opacity — attributes, not geometry. Nothing here is offset, derived or redrawn.
   */
  shapes: readonly Shape[];
  /** The shape family this belongs to, so the duplicate scanner can tell siblings from twins. */
  family?: string;
  /**
   * Warnings this drawing has already answered, and why.
   *
   * Only warnings — an error is not negotiable. A warning is a judgement call, and some of
   * them are calls the drawing made on purpose: a beetle needs more parts than the element
   * budget likes, and drawing it with fewer makes it a chip. The reason is required and is
   * checked for staleness, so the list cannot quietly rot.
   */
  accepted?: Readonly<Record<string, string>>;
}

/**
 * One cell's elements.
 *
 * A duotone is the outline with a tint laid *behind* it, and the tint is its own element:
 * a path carrying `fill`, `opacity` and `stroke="none"`, emitted before the strokes so it
 * sits underneath. Putting the fill on the stroked path instead — which is what the first
 * version of this did — leaves an element that is both tinted and stroked, doubling the
 * outline it is meant to sit behind, and it is why nine icons rendered with no tint at all.
 *
 * Only a shape that has mass gets one. An open silhouette still has mass — SVG closes a
 * fill across the gap, so an open ring tints as a disc with a bite out of it, which is the
 * language showing through rather than fighting it. A tick, an arrowhead, a caret and a
 * rail do not: filling them paints a sliver that reads as a mistake. The constructors
 * decide, so nobody has to remember.
 */
function paint(shapes: readonly Shape[], variant: Variant, weight: Weight): string {
  if (variant !== "duotone")
    return shapes.map((s) => `<path d="${s.d}"/>`).join("");

  const closed = shapes.filter((s) => s.closed);
  const bodies = closed.filter((s) => !s.small);
  if (bodies.length)
    return closed.map((s) =>
        `<path d="${s.d}" fill="currentColor" opacity="${DUOTONE_OPACITY}" stroke="none"/>`).join("")
      + shapes.map((s) => `<path d="${s.d}"/>`).join("");

  /*
   * An icon made only of marks has nothing to fill, and for a long time its duotone cell
   * was byte-identical to its outline — a third of the grid not answering the variant
   * switch. The tint for a mark is the mark's own halo: the same strokes, three units
   * wider, at the tint opacity, behind the true strokes. One rule, no second geometry,
   * and a tick keeps being a tick.
   */
  const halo = shapes.filter((s) => !s.closed).map((s) =>
    `<path d="${s.d}" opacity="${DUOTONE_OPACITY}" stroke-width="${WEIGHTS[weight] + 3}"/>`).join("");
  return closed.map((s) =>
      `<path d="${s.d}" fill="currentColor" opacity="${DUOTONE_OPACITY}" stroke="none"/>`).join("")
    + halo + shapes.map((s) => `<path d="${s.d}"/>`).join("");
}

export function cells(icon: Icon): Map<string, string> {
  const out = new Map<string, string>();
  for (const variant of VARIANTS) {
    const shapes = icon.shapes;
    const weights: Weight[] = hasWeight(variant) ? (Object.keys(WEIGHTS) as Weight[]) : ["regular"];
    for (const weight of weights)
      out.set(cellName(variant, weight), svgOpen(variant, weight) + paint(shapes, variant, weight) + SVG_CLOSE);
  }
  return out;
}

export async function write(icon: Icon, root = "packages/icons/icons"): Promise<number> {
  const dir = join(root, icon.category, icon.slug);
  await mkdir(dir, { recursive: true });
  const meta = {
    slug: icon.slug, category: icon.category, subcategory: icon.subcategory,
    name: icon.name, description: icon.description, tags: icon.tags,
    ...(icon.aliases?.length ? { aliases: icon.aliases } : {}),
    ...(icon.accepted ? { accepted: icon.accepted } : {}),
    ...(icon.keywords?.length ? { keywords: icon.keywords } : {}),
    ...(icon.family ? { family: icon.family } : {}),
    shapes: icon.shapes.map(({ d, closed, detail, why }) =>
      ({ d, closed, ...(detail ? { detail } : {}), ...(why ? { _why: why } : {}) })),
  };
  await writeFile(join(dir, `${icon.slug}.json`), JSON.stringify(meta, null, 2) + "\n");
  let n = 0;
  for (const [cell, svg] of cells(icon)) {
    await writeFile(join(dir, `${cell}.svg`), svg);
    n++;
  }
  return n;
}

/** Every declared icon, built and written. Called by `pnpm icons:build`. */
export async function buildAll(icons: readonly Icon[], root?: string) {
  let cellCount = 0;
  for (const icon of icons) cellCount += await write(icon, root);
  return { icons: icons.length, cells: cellCount };
}

export { dirname };
