/**
 * Builds packages/icons/dist/metadata.json — the single artifact the website, the MCP
 * server, the Figma builder, and the search index all read.
 *
 * Every derived field is computed here and never written by hand. A contributor who
 * types an `addedIn` version will be wrong by icon 200, and metadata that is wrong is
 * worse than metadata that is missing.
 */
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import {
  IconMetaInput, toComponentName, parseSvg,
  DOMAINS, DOMAIN_TITLE, SUBCATEGORIES, type Domain,
} from "@iconmind/shared";
import { readFile } from "node:fs/promises";
import { fromRoot, loadIcons } from "../lib/fs.ts";
import { contentHash, structuralHash, inkMap, inkDistance } from "../lib/hash.ts";

const OUT = fromRoot("packages/icons/dist");

/*
 * Read from the package, not from the environment.
 *
 * `npm_package_version` is only set when the script is run *through* that package's own
 * scripts. Run as `pnpm icons:metadata` from the root it is undefined, and every icon in
 * the file said it was added in 0.0.0 — which is what the site was showing.
 */
const VERSION = (
  JSON.parse(await readFile(fromRoot("packages/icons/package.json"), "utf8")) as { version: string }
).version;
const RELATED_MAX_DISTANCE = 0.180;
const RELATED_LIMIT = 6;

/**
 * First and last release that touched a file, read from git rather than trusted to a human.
 *
 * Every path the file has ever had is passed explicitly, and `--follow` is *not* used.
 * `--follow` detects renames by content similarity, and on a hundred small SVGs that all
 * share a header and a stroke language it lands on the wrong ancestor routinely — asked
 * for the history of `data/dag`, drawn last week, it returned a commit from the first
 * batch of fifty-two. At nine near-identical cells per concept it would be wrong more
 * often than right. Listing the paths is exact, and a rename is a deliberate event that
 * can afford a line here.
 *
 * `--diff-filter=AM` counts commits that added or modified content and skips pure
 * renames, so moving every icon into its own directory did not restamp all 100 as
 * updated in the next release.
 */
function gitVersions(paths: string[]): { addedIn: string; updatedIn: string } {
  try {
    const tags = execFileSync("git", ["log", "--diff-filter=AM", "--format=%H", "--", ...paths], {
      encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
    }).trim().split("\n").filter(Boolean);
    if (!tags.length) return { addedIn: VERSION, updatedIn: VERSION };
    // The first release that *contains* the commit, which is not what `git describe`
    // answers. `describe --tags` finds the newest tag the commit descends from, so for
    // anything written before the first release it fails outright and falls through to
    // the current version — every icon in v0.1.0 was reporting 0.2.0.
    const at = (sha: string) => {
      try {
        const tags = execFileSync("git", ["tag", "--contains", sha, "--sort=creatordate"], {
          encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
        }).trim().split("\n").filter(Boolean);
        // Versions are fixed across the packages, but the icons tag is the one that
        // means "this drawing shipped".
        const tag = tags.find((t) => t.startsWith("@iconmind/icons@")) ?? tags[0];
        return tag ? tag.replace(/^@iconmind\/icons@/, "").replace(/^v/, "") : VERSION;
      } catch { return VERSION; }
    };
    return { addedIn: at(tags.at(-1)!), updatedIn: at(tags[0]!) };
  } catch {
    return { addedIn: VERSION, updatedIn: VERSION };
  }
}

const icons = (await loadIcons()).filter((i) => i.svg && i.json);
const maps = new Map(icons.map((i) => [i.slug, inkMap(i.svg)]));

const built = icons.map((icon) => {
  const parsed = IconMetaInput.safeParse(JSON.parse(icon.json!));
  if (!parsed.success) {
    console.error(`✗ ${icon.svgPath}: ${parsed.error.issues.map((i) => i.message).join("; ")}`);
    process.exit(1);
  }
  const { $schema: _schema, ...m } = parsed.data;   // editor hint, not payload
  const { children } = parseSvg(icon.svg);

  const near = icons
    .filter((o) => o.slug !== icon.slug)
    .map((o) => ({ slug: o.slug, d: inkDistance(maps.get(icon.slug)!, maps.get(o.slug)!) }))
    .filter((o) => o.d <= RELATED_MAX_DISTANCE)
    .sort((a, b) => a.d - b.d)
    .slice(0, RELATED_LIMIT)
    .map((o) => o.slug);

  return {
    ...m,
    componentName: toComponentName(m.slug),
    contentHash: contentHash(icon.svg),
    structuralHash: structuralHash(icon.svg),
    elementCount: children.length,
    byteSize: Buffer.byteLength(icon.svg, "utf8"),
    related: m.relatedOverride ?? near,
    // The pre-matrix path, from before every concept became a directory.
    ...gitVersions([icon.svgPath, fromRoot("packages/icons/icons", icon.category, `${icon.slug}.svg`)]),
  };
}).sort((a, b) => a.slug.localeCompare(b.slug));

const byCategory = Object.fromEntries(
  DOMAINS.map((d) => [d, built.filter((i) => i.category === d).length]),
);

const metadata = {
  version: VERSION,
  generatedAt: new Date().toISOString(),
  counts: { total: built.length, byCategory },
  categories: DOMAINS.map((d) => ({
    slug: d,
    name: DOMAIN_TITLE[d as Domain],
    count: byCategory[d],
    subcategories: SUBCATEGORIES[d as Domain].map((s) => ({
      slug: s,
      count: built.filter((i) => i.category === d && i.subcategory === s).length,
    })).filter((s) => s.count > 0),
  })).filter((c) => c.count! > 0),
  icons: built,
};

await mkdir(OUT, { recursive: true });
await writeFile(`${OUT}/metadata.json`, JSON.stringify(metadata, null, 2) + "\n");

const bytes = Buffer.byteLength(JSON.stringify(metadata));
console.log(
  `metadata.json — ${built.length} icons, ${metadata.categories.length} categories, ` +
  `${(bytes / 1024).toFixed(1)} KB`,
);
