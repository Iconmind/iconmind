import { existsSync, writeFileSync, rmSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";
import { describe, expect, it } from "vitest";

/**
 * Tree shaking is the whole argument for shipping 1000 components, so it gets a test
 * rather than a promise. These numbers are gzip bytes of a real bundle; if importing
 * three icons ever starts pulling in the whole library, this fails loudly.
 */
const DIST = new URL("../dist/index.js", import.meta.url).pathname;
const has = existsSync(DIST);

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
  it("one icon stays under 600 B gzip", async () => {
    const n = await bundleGzip(`import { Agent } from "${DIST}"; export default Agent;`);
    expect(n).toBeLessThan(600);
  });

  it("three icons stay under 1 KB gzip", async () => {
    const n = await bundleGzip(
      `import { Agent, Llm, VectorDatabase } from "${DIST}"; export default [Agent, Llm, VectorDatabase];`,
    );
    expect(n).toBeLessThan(1024);
  });

  it("importing three costs much less than importing everything", async () => {
    const three = await bundleGzip(
      `import { Agent, Llm, VectorDatabase } from "${DIST}"; export default [Agent, Llm, VectorDatabase];`,
    );
    const all = await bundleGzip(`import * as all from "${DIST}"; export default all;`);
    expect(three).toBeLessThan(all * 0.6);
  });
});
