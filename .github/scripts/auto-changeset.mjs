// Guarantees every release run has a changeset. If the push already carries one
// (hand-written, with a real description), that one wins and this script does
// nothing. Otherwise it derives the bump from the head commit message:
// "feat!:" or "BREAKING" → major, "feat:" → minor, anything else → patch.
// The packages are a fixed group, so bumping @iconmind/icons bumps all of them.
import { readdirSync, writeFileSync } from "node:fs";

const existing = readdirSync(".changeset").filter(
  (f) => f.endsWith(".md") && f !== "README.md",
);
if (existing.length > 0) {
  console.log(`changeset already present: ${existing.join(", ")}`);
  process.exit(0);
}

const msg = (process.env.HEAD_COMMIT_MESSAGE ?? "").trim();
const firstLine = msg.split("\n")[0] || "automated release";
const bump = /^[a-z]+(\(.+\))?!:|BREAKING/.test(msg)
  ? "major"
  : /^feat/.test(msg)
    ? "minor"
    : "patch";

writeFileSync(
  ".changeset/auto-release.md",
  `---\n"@iconmind/icons": ${bump}\n---\n\n${firstLine}\n`,
);
console.log(`wrote auto changeset: ${bump} — ${firstLine}`);
