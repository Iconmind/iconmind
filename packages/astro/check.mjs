/** Astro ships source; build is proof: the real Astro compiler must accept the templates. */
import { transform } from "@astrojs/compiler";
import { readFileSync } from "node:fs";

for (const f of ["src/Icon.astro", "src/generated/agent.astro"]) {
  const r = await transform(readFileSync(f, "utf8"), { filename: f });
  if (!r.code) throw new Error(`${f}: compiler produced nothing`);
}
console.log("astro templates compile ✓");
