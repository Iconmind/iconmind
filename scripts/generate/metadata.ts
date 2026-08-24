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
import { loadIcons } from "../lib/fs.ts";
import { contentHash, structuralHash, inkMap, inkDistance } from "../lib/hash.ts";

const OUT = "packages/icons/dist";
const VERSION = process.env["npm_package_version"] ?? "0.0.0";
const RELATED_MAX_DISTANCE = 0.180;
const RELATED_LIMIT = 6;

/** First and last release that touched a file, read from git rather than trusted to a human. */
function gitVersions(path: string): { addedIn: string; updatedIn: string } {
  try {
    const tags = execFileSync("git", ["log", "--follow", "--format=%H", "--", path], {
      encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
    }).trim().split("\n").filter(Boolean);
    if (!tags.length) return { addedIn: VERSION, updatedIn: VERSION };
    const at = (sha: string) => {
      try {
        return execFileSync("git", ["describe", "--tags", "--abbrev=0", sha], {
          encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
        }).trim().replace(/^v/, "") || VERSION;
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
    ...gitVersions(icon.svgPath),
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
