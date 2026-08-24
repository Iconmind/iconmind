import { readdirSync } from "node:fs";
import { defineConfig } from "tsup";

// Every icon is its own entry point, so bundlers that cannot tree-shake a barrel can
// still import a single icon, and React.lazy has something to load.
const icons = readdirSync("src/generated").filter((f) => f.endsWith(".tsx"));

export default defineConfig({
  entry: ["src/index.ts", ...icons.map((f) => `src/generated/${f}`)],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  external: ["react"],
  outDir: "dist",
  clean: true,
});
