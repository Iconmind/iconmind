// Guarantees every release run has a changeset. If the push already carries one
// (hand-written, with a real description), that one wins and this script does
// nothing. Otherwise it writes a PATCH changeset from the head commit message.
//
// Automatic releases only ever step 0.3.1 → 0.3.2 → 0.3.3 (the user's explicit
// choice — no surprise 0.4.0 from a commit prefix). A minor or major release is a
// decision, made by committing a hand-written changeset that says so.
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

writeFileSync(
  ".changeset/auto-release.md",
  `---\n"@iconmind/icons": patch\n---\n\n${firstLine}\n`,
);
console.log(`wrote auto changeset: patch — ${firstLine}`);
