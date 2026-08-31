import { glob } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { DEFAULT_VARIANT, DEFAULT_WEIGHT, parseSvg, WAIVABLE_SHAPE_RULES } from "@iconmind/shared";
import { loadIcons, parseCell } from "../lib/fs.ts";
import { Report } from "../lib/report.ts";
import { checkStructure } from "./rules/structure.ts";
import { checkAttributes } from "./rules/attributes.ts";
import { checkGeometry } from "./rules/geometry.ts";
import { checkMetadata } from "./rules/metadata.ts";
import { checkMatrix } from "./rules/matrix.ts";

const argv = process.argv.slice(2);
const filesFlag = argv.indexOf("--files");

/**
 * Draft mode (`--files <glob>`): shape rules only, no metadata. Used while drafting
 * candidates so machine-checkable faults never reach human review (doc 04 §4.7).
 */
if (filesFlag !== -1) {
  const pattern = argv[filesFlag + 1] ?? "**/*.svg";
  const r = new Report();
  let n = 0;
  for await (const file of glob(pattern)) {
    n++;
    r.touch(file);
    const svg = await readFile(file, "utf8");
    // Drafts are named freely, so the cell is read from the filename when it looks like
    // one and falls back to the master otherwise — a draft called `bold.svg` should be
    // held to the bold thresholds, not to the master's.
    const cell = parseCell(basename(file)) ?? { variant: DEFAULT_VARIANT, weight: DEFAULT_WEIGHT };
    try {
      const parsed = parseSvg(svg);
      checkStructure(file, svg, parsed, r, cell.variant, cell.weight);
      checkAttributes(file, parsed, r, cell.variant, cell.weight);
      // The same `authored` flag the full run passes, so a draft is held to the same
      // thresholds as the cell it will become rather than to the master's.
      checkGeometry(file, parsed, r, cell.weight, cell.variant === "outline");
    } catch (e) {
      r.add(file, "structure/root-is-svg", (e as Error).message);
    }
  }
  console.log(`Draft check: ${n} candidates\n`);
  process.exit(r.print() ? 0 : 1);
}

/**
 * Scoped mode (`--only slug slug…`): a full run reads 14,022 cells and takes minutes, which
 * is the right cost before a release and the wrong one between two edits of a fifty-icon
 * round. The rules are unchanged; only the set they run over is narrower. Cross-icon rules
 * still see the whole set — nothing here compares one icon against another.
 */
const onlyFlag = argv.indexOf("--only");
const only = onlyFlag === -1 ? null
  : new Set(argv.slice(onlyFlag + 1).filter((a) => !a.startsWith("--")).map((a) => a.replace(/^.*\//, "")));

const loaded = await loadIcons();
const icons = only ? loaded.filter((i) => only.has(i.svgPath.split("/").at(-2)!)) : loaded;
if (only && !icons.length) {
  console.error(`--only matched no icons`);
  process.exit(1);
}
if (only) console.log(`Scoped to ${icons.length} icon(s).\n`);
const r = new Report();

// Registered before any rule runs, so a warning an icon has already answered never
// reaches the report. Parsed loosely here — the schema is what actually validates the
// field, and a malformed metadata file must fail on the schema error, not on this.
for (const ic of icons) {
  if (!ic.json) continue;
  try {
    const accepted = (JSON.parse(ic.json) as { accepted?: Record<string, string> }).accepted;
    // Registered for every cell, not just the master. If a flask tapers, it tapers in
    // all nine; making the author answer the same warning nine times would turn the
    // mechanism into the paperwork it exists to avoid.
    for (const [rule, reason] of Object.entries(accepted ?? {}))
      for (const cell of ic.cells) r.accept(cell.svgPath, rule, reason, ic.slug);
  } catch { /* the schema check reports it */ }
}

// Every cell, not just the master. A concept whose bold weight is broken is broken in
// one import path, and only a consumer would find it.
let cells = 0;
for (const ic of icons) {
  r.touch(ic.svgPath);
  for (const cell of ic.cells) {
    cells++;
    r.touch(cell.svgPath);
    let parsed;
    try { parsed = parseSvg(cell.svg); }
    catch (e) { r.add(cell.svgPath, "structure/root-is-svg", (e as Error).message); continue; }
    checkStructure(cell.svgPath, cell.svg, parsed, r, cell.variant, cell.weight);
    checkAttributes(cell.svgPath, parsed, r, cell.variant, cell.weight);
    checkGeometry(cell.svgPath, parsed, r, cell.weight, cell.variant === "outline");
  }
  if (!ic.cells.length) r.add(ic.svgPath, "structure/empty", "concept has no drawable cell");
}
checkMetadata(icons, r);
// Rasterising 519 cells costs a few seconds, so the ink ordering runs on demand and
// in nightly rather than on every save.
checkMatrix(icons, r, argv.includes("--ink"));
r.finish(WAIVABLE_SHAPE_RULES);

console.log(`Validating ${icons.length} concepts, ${cells} cells\n`);
process.exit(r.print() ? 0 : 1);
