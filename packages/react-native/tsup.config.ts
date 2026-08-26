import { readdirSync } from "node:fs";
import { defineConfig } from "tsup";

const icons = readdirSync("src/generated").filter((f) => f.endsWith(".ts"));

export default defineConfig({
  entry: ["src/index.ts", ...icons.map((f) => `src/generated/${f}`)],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  external: ["react", "react-native-svg"],
  outDir: "dist",
  clean: true,
});
