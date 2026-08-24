import { glob } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { parseSvg } from "@iconmind/shared";
import { loadIcons } from "../lib/fs.ts";
import { Report } from "../lib/report.ts";
import { checkStructure } from "./rules/structure.ts";
import { checkAttributes } from "./rules/attributes.ts";
import { checkGeometry } from "./rules/geometry.ts";
import { checkMetadata } from "./rules/metadata.ts";

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
    try {
      const parsed = parseSvg(svg);
      checkStructure(file, svg, parsed, r);
      checkAttributes(file, parsed, r);
      checkGeometry(file, parsed, r);
    } catch (e) {
      r.add(file, "structure/root-is-svg", (e as Error).message);
    }
  }
  console.log(`Draft check: ${n} candidates\n`);
  process.exit(r.print() ? 0 : 1);
}

const icons = await loadIcons();
const r = new Report();

for (const ic of icons) {
  r.touch(ic.svgPath);
  if (!ic.svg) continue;
  let parsed;
  try { parsed = parseSvg(ic.svg); }
  catch (e) { r.add(ic.svgPath, "structure/root-is-svg", (e as Error).message); continue; }
  checkStructure(ic.svgPath, ic.svg, parsed, r);
  checkAttributes(ic.svgPath, parsed, r);
  checkGeometry(ic.svgPath, parsed, r);
}
checkMetadata(icons, r);

console.log(`Validating ${icons.length} icons\n`);
process.exit(r.print() ? 0 : 1);
