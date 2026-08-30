import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { DEFAULT_VARIANT, DEFAULT_WEIGHT, VARIANTS, WEIGHTS, cellName, hasWeight, svgOpen, SVG_CLOSE } from "@iconmind/shared";
import type { Variant, Weight } from "@iconmind/shared";
import { inkBox, inkDistance, inkMap, inkTotal } from "../../lib/hash.ts";
import { ICONS_DIR } from "../../lib/fs.ts";
import type { IconFile } from "../../lib/fs.ts";
import type { Report } from "../../lib/report.ts";

/**
 * Rules about a concept as a whole, rather than about one file.
 *
 * Every other rule in the validator reads a single file. That leaves a gap wide enough
 * to walk a broken concept through: draw the master, fill in the metadata, watch the
 * validator go green, and ship one cell out of nine. Nothing was wrong with the file that
 * existed — the problem was the eight that did not.
 */
/**
 * The least an icon may cover on its longer side.
 *
 * Every drawing here is on the same 24-unit canvas, on the same half-unit grid, with its
 * anchors confined to the same live area — and none of that stops two correct drawings from
 * being different sizes. A capsule nine units tall and a ring twenty across both obey every
 * rule in the validator and look nothing like a set when they sit next to each other.
 *
 * Measured across the first four hundred, the median icon covers twenty of the twenty
 * available units and nine in ten cover eighteen. Sixteen is the floor: below it a drawing
 * reads as a shrunken version of the set rather than a member of it.
 *
 * The *longer* side, not both. A chevron is nine units wide and it should be — its width is
 * not what a reader measures it by. What must not happen is an icon that is small in both
 * directions, which is the one thing this catches.
 */
const MIN_EXTENT = 16;

/**
 * How far an icon's ink may sit from the middle of its canvas.
 *
 * Filling the same box is half of looking like one set; sitting in the same place is the
 * other half. An icon whose ink centre is three units above the canvas centre floats when it
 * is set in a row beside its neighbours, and nothing else here catches that — every anchor
 * can be on the grid, inside the live area, at a legal angle, and the whole drawing still
 * be pinned to the top of the frame.
 *
 * Measured across the first five hundred and fifty, every icon but six sat within two units
 * of centre and those six sat at three or more, so this is the set's own habit written down
 * rather than a number chosen for it. Two rather than one: a bell hangs low and a pin's
 * point reaches below its head, and those are drawings that are *right* off centre.
 */
const MAX_OFFSET = 2;

/**
 * A cell with its translucent elements removed — the silhouette is the ink at full strength.
 *
 * Duotone cells carry two things drawn at the tint opacity: a fill behind each closed body,
 * and a halo three units wider than the true stroke behind each open one (`draw/build.ts`).
 * The halo is *meant* to reach a unit and a half past the outline's edge; that is the glow.
 * The rasteriser counts anything darker than near-white as ink, and twenty percent grey is,
 * so measured whole a duotone cell sits 1.25 to 1.75 units outside its master and the rule
 * reported every one of them as the wrong size — 1,674 cells a night, all of them right.
 * The forge marks every translucent element with an `opacity` attribute, so this strips
 * exactly those; if nothing solid remains the caller falls back to the whole cell.
 */
function solidOnly(svg: string): string {
  return svg.replace(/<(?:path|circle|rect|line|polyline|polygon|ellipse)\b[^>]*\bopacity="[^"]*"[^>]*\/>/g, "");
}

export function checkMatrix(icons: IconFile[], r: Report, measureInk = false) {

  for (const ic of icons) {
    if (!ic.svg) continue;
    const dir = dirname(ic.svgPath);
    const missing: string[] = [];

    if (missing.length)
      r.add(ic.svgPath, "matrix/underived",
        `${missing.length} cell(s) can be derived but do not exist — run \`pnpm icons:derive\`\n  ${missing.join(", ")}`);

    // Not behind `measureInk`. That flag guards the rules that rasterise every cell of
    // every icon, which is minutes; this one rasterises one cell per concept and takes
    // seconds. A rule that only runs behind a flag nobody passes is a rule that does not
    // run — which is exactly how the visual baselines came to guard nothing.
    {
      const box = inkBox(ic.svg);
      if (box) {
        const w = box.x1 - box.x0, h = box.y1 - box.y0;
        const span = Math.max(w, h);
        if (span < MIN_EXTENT - 0.05)
          r.add(ic.svgPath, "geometry/optical-size",
            `covers ${w.toFixed(1)} × ${h.toFixed(1)} — its longer side is ${span.toFixed(1)}, ` +
            `minimum ${MIN_EXTENT}. Beside an icon that fills the canvas this reads as the ` +
            `same drawing at a smaller size`);

        const dx = (box.x0 + box.x1) / 2 - 12, dy = (box.y0 + box.y1) / 2 - 12;
        if (Math.max(Math.abs(dx), Math.abs(dy)) > MAX_OFFSET + 0.05)
          r.add(ic.svgPath, "geometry/optical-centre",
            `its ink sits ${dx.toFixed(1)}, ${dy.toFixed(1)} from the middle of the canvas — ` +
            `at most ${MAX_OFFSET} either way. In a row beside its neighbours this one floats`);
      }
    }

    /**
     * Every cell has to occupy the same box.
     *
     * A stroke extends half its width beyond the path that carries it, so cells drawn at
     * different weights only agree if that is accounted for. Ignoring it made icons *jump*
     * size when the control changed, which was the most obvious fault in the first attempt
     * at this set: anchors live in 3..21 so a regular stroke's painted edge lands on 2..22,
     * and this measures whether the cells actually agree about where that edge is.
     */
    if (measureInk) {
      const master = inkBox(ic.svg);
      if (master) {
        for (const cell of ic.cells) {
          if (cell.variant === DEFAULT_VARIANT && cell.weight === DEFAULT_WEIGHT) continue;
          const box = inkBox(solidOnly(cell.svg)) ?? inkBox(cell.svg);
          if (!box) { r.add(cell.svgPath, "matrix/silhouette", "draws nothing"); continue; }
          const off = Math.max(
            Math.abs(box.x0 - master.x0), Math.abs(box.y0 - master.y0),
            Math.abs(box.x1 - master.x1), Math.abs(box.y1 - master.y1));
          // Weights legitimately differ by half a stroke either side; beyond that the cell
          // is a different size, not a different weight.
          if (off > 0.75)
            r.add(cell.svgPath, "matrix/silhouette",
              `sits ${off.toFixed(2)} units off the master's box — ` +
              `master ${master.x0.toFixed(1)},${master.y0.toFixed(1)}..${master.x1.toFixed(1)},${master.y1.toFixed(1)} ` +
              `vs ${box.x0.toFixed(1)},${box.y0.toFixed(1)}..${box.x1.toFixed(1)},${box.y1.toFixed(1)}`);
        }
      }
    }

    if (measureInk) {
      const order: Weight[] = ["thin", "regular", "bold"];
      for (const variant of VARIANTS) {
        if (!hasWeight(variant)) continue;   // one cell, nothing to order
        const cells = ic.cells.filter((c) => c.variant === variant);
        if (cells.length < 2) continue;
        const ink = new Map(cells.map((c) => [c.weight, inkTotal(inkMap(c.svg))]));
        const present = order.filter((w) => ink.has(w));
        for (let i = 1; i < present.length; i++) {
          const lo = present[i - 1]!, hi = present[i]!;
          if (ink.get(hi)! <= ink.get(lo)!)
            r.add(join(dir, `${variant}-${hi}.svg`), "matrix/ink-ordered",
              `covers ${(ink.get(hi)! * 100).toFixed(2)}%, the same as or less than ` +
              `${variant}-${lo} at ${(ink.get(lo)! * 100).toFixed(2)}% — a heavier weight must draw more`);
        }
      }
    }
  }
}
