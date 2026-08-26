/**
 * Svelte ships source, so "build" here is proof, not artifacts: compile the runtime and
 * one generated icon with the real Svelte compiler so a broken template can never
 * publish.
 */
import { compile } from "svelte/compiler";
import { readFileSync } from "node:fs";

for (const f of ["src/Icon.svelte", "src/generated/agent.svelte"]) {
  compile(readFileSync(f, "utf8"), { filename: f, generate: "server" });
}
console.log("svelte templates compile ✓");
