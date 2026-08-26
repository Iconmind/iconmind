import { configDefaults, defineConfig } from "vitest/config";

/**
 * Vitest and Playwright both claim `*.spec.ts` by default, and Vitest's default include
 * sweeps the whole repo. Left alone it loads `tests/visual/` and dies on the first
 * `test.describe()` with an error that says nothing about the real cause.
 */
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/visual/**"],
  },
});
