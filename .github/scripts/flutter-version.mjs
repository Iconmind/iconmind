// Keeps iconmind_flutter on the same version as the npm packages. Changesets bumps
// package.json files only, so pub.dev sat on 0.8.0 while npm moved on. Run after
// `changeset version`: it sets pubspec.yaml's version and copies the release's section
// of the icons changelog into the Flutter changelog, which pub.dev shows.
import { readFileSync, writeFileSync } from "node:fs";

const version = JSON.parse(readFileSync("packages/icons/package.json", "utf8")).version;

const pubspec = "packages/flutter/pubspec.yaml";
writeFileSync(pubspec, readFileSync(pubspec, "utf8").replace(/^version: .*$/m, `version: ${version}`));

const log = "packages/flutter/CHANGELOG.md";
const flutter = readFileSync(log, "utf8");
if (!flutter.startsWith(`## ${version}\n`)) {
  const icons = readFileSync("packages/icons/CHANGELOG.md", "utf8");
  const start = icons.indexOf(`## ${version}\n`);
  const end = icons.indexOf("\n## ", start + 1);
  const section = start < 0 ? `## ${version}\n\nSame icons as @iconmind/icons ${version}.\n`
    : icons.slice(start, end < 0 ? undefined : end).trimEnd() + "\n";
  writeFileSync(log, `${section}\n${flutter}`);
}
console.log(`iconmind_flutter ${version}`);
