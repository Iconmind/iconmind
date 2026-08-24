import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  // The icon data is bundled rather than fetched: the server must work offline, start
  // in well under a second, and never depend on a network that might not be there.
  noExternal: ["@iconmind/shared", "@iconmind/icons"],
  external: ["@modelcontextprotocol/sdk"],
  banner: { js: "#!/usr/bin/env node" },
  outDir: "dist",
  clean: true,
});
