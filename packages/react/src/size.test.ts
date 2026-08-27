import { existsSync, readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";
import { describe, expect, it } from "vitest";

/**
 * Tree shaking is the whole argument for shipping 1000 components, so it gets a test
 * rather than a promise. These numbers are gzip bytes of a real bundle; if importing
 * three icons ever starts pulling in the whole library, this fails loudly.
 *
 * The ceilings come from `.size-limit.json` rather than being typed here. They were typed
 * here once, and when the variant matrix moved the budget the two disagreed — `pnpm size`
 * passed and `pnpm test` failed on the same bundle. A budget written down twice is a
 * budget that will be wrong in one place.
 */
const DIST = new URL("../dist/index.js", import.meta.url).pathname;

const LIMITS: Array<{ name: string; limit: string }> = JSON.parse(
  readFileSync(new URL("../../../.size-limit.json", import.meta.url).pathname, "utf8"),
);
const budget = (name: string) => {
  const row = LIMITS.find((l) => l.name === name);
  if (!row) throw new Error(`.size-limit.json has no entry called '${name}'`);
  const m = /^([\d.]+)\s*(B|KB)$/.exec(row.limit);
  if (!m) throw new Error(`cannot read limit '${row.limit}'`);
  return Number(m[1]) * (m[2] === "KB" ? 1024 : 1);
};
const has = existsSync(DIST);
/*
 * How many components the package exports.
 *
 * Counted from the source directory, not from the bundle. tsup emits one `export { X }`
 * line per chunk rather than a single brace list, so the obvious regex over `dist` matched
 * the first line and reported one component — which made the per-icon figure the whole
 * package and the test fail by a factor of the set size.
 */
const EXPORTS = readdirSync(new URL("./generated/", import.meta.url).pathname)
  .filter((f) => f.endsWith(".tsx") && f !== "index.tsx").length;

async function bundleGzip(source: string): Promise<number> {
  const entry = join(tmpdir(), `iconmind-size-${Math.abs(hash(source))}.mjs`);
  writeFileSync(entry, source);
  try {
    const out = await build({
      entryPoints: [entry], bundle: true, minify: true, format: "esm",
      external: ["react"], write: false, logLevel: "silent",
    });
    return gzipSync(out.outputFiles[0]!.contents).length;
  } finally {
    rmSync(entry, { force: true });
  }
}
const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7);

describe.skipIf(!has)("bundle size", () => {
  it("one icon stays inside the budget in .size-limit.json", async () => {
    const n = await bundleGzip(`import { Agent } from "${DIST}"; export default Agent;`);
    expect(n).toBeLessThan(budget("1 icon"));
  });

  /*
   * The whole package is measured per icon, not in total.
   *
   * There used to be an absolute ceiling on importing everything, and it was worthless:
   * it was set when the set had three icons and had to be raised every time the set grew,
   * which is a budget that passes by being rewritten. What should not drift is the
   * marginal cost — 51 icons at 272 bytes each is the same product as 500 at 272, and a
   * jump in that number means a component got heavier, which is the thing worth catching.
   */
  it("the whole package costs a flat amount per icon", async () => {
    const n = await bundleGzip(`export * from "${DIST}";`);
    const each = n / EXPORTS;
    expect(each).toBeLessThan(340);
  });

  it("three icons stay well inside the ten-icon budget", async () => {
    const n = await bundleGzip(
      `import { Agent, Model, Prompt } from "${DIST}"; export default [Agent, Model, Prompt];`,
    );
    expect(n).toBeLessThan(budget("three icons"));
  });

  /**
   * Meaningless until the set is bigger than the sample. With three icons published,
   * "import three" and "import everything" are the same bundle, and the assertion was
   * failing on arithmetic rather than on a regression. Skipped rather than deleted, and
   * rather than loosened to something that would pass — it starts checking again on its
   * own once there is something to check.
   */
  it.skipIf(EXPORTS < 10)("importing three costs much less than importing everything", async () => {
    const three = await bundleGzip(
      `import { Agent, Model, Prompt } from "${DIST}"; export default [Agent, Model, Prompt];`,
    );
    const all = await bundleGzip(`import * as all from "${DIST}"; export default all;`);
    expect(three).toBeLessThan(all * 0.6);
  });
});
