/**
 * One round, one command.
 *
 * A fifty-icon round used to mean six commands in the right order, and getting the order
 * wrong wasted the expensive ones: a full `icons:validate` reads 14,022 cells and takes two
 * and a half minutes, so running it before the free static check meant paying that to be
 * told about a corner radius. This runs them cheapest-first and stops at the first gate that
 * fails, so the slow gates only ever see geometry that already passed the fast ones.
 *
 *   npx tsx scripts/review/round.mts scripts/draw/icons/batch-88.ts [--sheet out.png]
 *
 * The order is the point:
 *   precheck    ~1s    the declaration's own rules, read from source, all faults at once
 *   build       ~0s    only this batch's icons, from their declarations
 *   optimize    ~3s    only this batch's cells, never left as the forge wrote them
 *   validate    ~2s    scoped to this batch's slugs, not the whole set
 *   audit       ~30s   short side, ink at 16px, centroid, elements — against the baseline
 *   duplicates  ~3s    warm ink-map cache; only the changed icons are rasterised
 */
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const batch = process.argv[2];
if (!batch || !existsSync(batch)) {
  console.error("usage: npx tsx scripts/review/round.mts scripts/draw/icons/batch-NN.ts [--sheet out.png]");
  process.exit(2);
}
const sheetAt = process.argv.indexOf("--sheet");
const sheet = sheetAt === -1 ? null : process.argv[sheetAt + 1] ?? "round.png";

/** The slugs this batch declares, read from its source — no need to be told them twice. */
const slugs = [...readFileSync(batch, "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"|\(\s*"([a-z0-9-]+)"/g)]
  .map((m) => m[1] ?? m[2]!)
  .filter((s, i, a) => a.indexOf(s) === i);
if (!slugs.length) { console.error(`no slugs found in ${batch}`); process.exit(2); }
console.log(`${slugs.length} icons declared in ${batch}\n`);

const run = (label: string, cmd: string, args: string[]) => {
  const started = Date.now();
  process.stdout.write(`── ${label} `.padEnd(30, "─") + " ");
  try {
    const out = execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64e6 });
    console.log(`ok ${((Date.now() - started) / 1000).toFixed(0)}s`);
    return out;
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string };
    console.log(`FAILED ${((Date.now() - started) / 1000).toFixed(0)}s\n`);
    process.stdout.write((err.stdout ?? "") + (err.stderr ?? ""));
    console.error(`\nStopped at: ${label}. Fix it and run this again — the later gates never saw this geometry.`);
    process.exit(1);
  }
};

run("precheck (declarations)", "npx", ["tsx", "scripts/review/precheck.mts", batch]);
run("build (scoped)", "npx", ["tsx", "scripts/draw/run.ts", "--only", ...slugs]);
run("optimize (scoped)", "npx", ["tsx", "scripts/optimize/run.ts", "--only", ...slugs]);
run("validate (scoped)", "npx", ["tsx", "scripts/validate/run.ts", "--only", ...slugs]);
run("audit (against baseline)", "npx", ["tsx", "scripts/review/audit.mts", "--check"]);
run("duplicates (perceptual)", "npx", ["tsx", "scripts/validate/duplicates.ts", "--perceptual"]);

if (sheet) {
  run("contact sheet", "npx", ["tsx", "scripts/review/sheet.mts", "outline-regular", sheet]);
  console.log(`\nSheet: ${sheet}`);
}
console.log("\nEvery gate green. Nothing is committed — look at the sheet first.");
