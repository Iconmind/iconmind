// Bundles the set for the editor: name, slug, description and the outline-regular body,
// from the same metadata the site uses. Regenerate on every release (`pnpm build` here).
import { readFileSync, writeFileSync } from "node:fs";
const root = new URL("../../../", import.meta.url).pathname;
const m = JSON.parse(readFileSync(root + "packages/icons/dist/metadata.json", "utf8"));
const out = m.icons.map((i) => ({
  slug: i.slug, name: i.componentName, dart: i.componentName[0].toLowerCase() + i.componentName.slice(1),
  d: i.description, tags: [...i.tags, ...(i.aliases || [])].join(" "),
  body: i.shapes.map((s) => `<path d="${s.d}"/>`).join(""),
}));
writeFileSync(new URL("../icons.json", import.meta.url), JSON.stringify({ version: m.version, icons: out }));
console.log(`icons.json — ${out.length} icons (${m.version})`);
