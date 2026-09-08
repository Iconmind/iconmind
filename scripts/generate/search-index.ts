/**
 * Builds the static search index the website loads in the browser.
 *
 * Array-of-arrays rather than array-of-objects: field names repeated 1000 times cost
 * about 40% of the payload, and this file is downloaded by every visitor who types.
 * Categories and subcategories are integer indices into lookup tables for the same
 * reason. Shape is documented in doc 09 §9.3.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { DOMAINS, SUBCATEGORIES, type Domain } from "@iconmind/shared";
import { fromRoot, loadIcons } from "../lib/fs.ts";
import { IconMetaInput } from "@iconmind/shared";

const OUT = fromRoot("apps/web/public");
const BUDGET_GZIP = 150 * 1024;   // doc 09 §9.4 — hard ceiling

const subList: string[] = [];
for (const d of DOMAINS) for (const s of SUBCATEGORIES[d as Domain]) if (!subList.includes(s)) subList.push(s);

const icons = (await loadIcons()).filter((i) => i.svg && i.json);

/**
 * Keywords are compacted, not dropped.
 *
 * A keyword list is written as the phrase somebody would type ("roll the dough", "the
 * rolling pin"), so most of its words are already in the slug, the name or the tags, and
 * the joiners between them match nothing. Both are paid for by every visitor who opens
 * the palette. What is left after the overlap and the joiners come out is the words this
 * icon has and no other field carries — which is the whole reason the field exists.
 */
const JOINERS = new Set(
  ("a an the of in on at to for it its is are and or your you they them this that with " +
   "without by from as be no not what who how when where do does done off out up").split(" "),
);
const wordsIn = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

function compactKeywords(kw: string[], covered: string[]): string {
  const have = new Set(covered.flatMap(wordsIn));
  const out: string[] = [];
  const seen = new Set<string>();
  for (const word of kw.flatMap((k) => k.split(" "))) {
    const w = word.toLowerCase();
    if (!w || have.has(w) || JOINERS.has(w) || seen.has(w)) continue;
    seen.add(w);
    out.push(word);
  }
  return out.join(" ");
}

const rows = icons
  .map((i) => IconMetaInput.parse(JSON.parse(i.json!)))
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((m) => [
    m.slug,
    m.name,
    DOMAINS.indexOf(m.category),
    subList.indexOf(m.subcategory),
    m.tags.join(" "),
    m.aliases.join(" "),
    compactKeywords(m.keywords, [m.slug, m.name, ...m.tags, ...m.aliases, m.category, m.subcategory]),
  ]);

// description is deliberately absent: it roughly doubles the payload and is almost
// never the phrase someone types into a search box.
const index = {
  v: process.env["npm_package_version"] ?? "0.0.0",
  f: ["slug", "name", "cat", "sub", "tags", "aliases", "kw"],
  c: DOMAINS,
  s: subList,
  i: rows,
};

await mkdir(OUT, { recursive: true });
const json = JSON.stringify(index);
await writeFile(`${OUT}/search-index.json`, json);

const gz = gzipSync(json).length;
const pct = Math.round((gz / BUDGET_GZIP) * 100);
console.log(
  `search-index.json — ${rows.length} icons, ${(json.length / 1024).toFixed(1)} KB raw, ` +
  `${(gz / 1024).toFixed(1)} KB gzip (${pct}% of the ${BUDGET_GZIP / 1024} KB budget)`,
);
if (gz > BUDGET_GZIP) {
  console.error("::error::Search index is over budget. See doc 09 §9.4 for what to drop first.");
  process.exit(1);
}
