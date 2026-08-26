/**
 * Two phases. SVGO strips junk; phase two forces a canonical form.
 *
 * The canonical form is the point. Minifying saves a few hundred bytes; making two
 * visually identical icons produce byte-identical files is what makes duplicate
 * detection trustworthy and what makes `git diff` mean something.
 */
import { writeFile } from "node:fs/promises";
import { allCells, loadIcons } from "../lib/fs.ts";
import { canonicalise } from "./canonical.ts";

/*
 * Every cell, not one per concept.
 *
 * `IconFile.svg` is the master — `outline-regular` — so looping over concepts canonicalised
 * one cell in seven and left the other six as the forge wrote them. The canonical form is
 * what makes two visually identical icons produce byte-identical files, and it was only
 * ever true of a seventh of the set: 5472 of 6388 cells had never been through SVGO.
 */
const cells = allCells(await loadIcons()).filter((c) => c.svg);
let changed = 0;

for (const cell of cells) {
  const out = canonicalise(cell.svg, cell.svgPath, cell.variant, cell.weight);
  if (out !== cell.svg) {
    await writeFile(cell.svgPath, out, "utf8");
    changed++;
  }
}

const check = process.argv.includes("--check");
console.log(`Optimized ${cells.length} cells — ${changed} changed, ${cells.length - changed} already canonical`);
if (check && changed > 0) {
  console.error("::error::Icons were not canonical. Run 'pnpm icons:optimize' and commit the result.");
  process.exit(1);
}
