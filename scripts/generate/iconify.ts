/**
 * The set as an Iconify collection.
 *
 * Iconify is where developers already pick icons — its one JSON format feeds the Figma
 * plugin, VS Code, unplugin-icons, the Tailwind and Nuxt and Astro icon modules, and
 * icones.js.org. A set that is in it is in all of them. This writes
 * `packages/icons/iconify.json` — tracked, so Iconify has a stable raw URL to pull: prefix `iconmind`, one icon per slug (outline
 * regular, the set's default), a `-duotone` twin for each, and every alias the set
 * knows, so the names people type in Iconify's search are the names that resolve here.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseSvg } from "@iconmind/shared";
import { fromRoot, loadIcons } from "../lib/fs.ts";

const icons = (await loadIcons()).filter((i) => i.svg).sort((a, b) => a.slug.localeCompare(b.slug));
const version = JSON.parse(await readFile(fromRoot("packages/icons/package.json"), "utf8")).version as string;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const body = (svg: string) => {
  const { children } = parseSvg(svg);
  return children.map((c) => `<${c.tag} ${Object.entries(c.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(" ")}/>`).join("");
};
// Iconify bodies carry no root attributes; the stroke attributes the set puts on <svg>
// move onto a wrapping <g> so the icon draws the same in every host.
const STROKE = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;

const out: { prefix: string; info: object; width: number; height: number; icons: Record<string, { body: string }>; aliases: Record<string, { parent: string }> } = {
  prefix: "iconmind",
  info: {
    name: "IconMind", total: 0, version, author: { name: "IconMind", url: "https://github.com/Iconmind/iconmind" },
    license: { title: "MIT", spdx: "MIT", url: "https://github.com/Iconmind/iconmind/blob/main/LICENSE" },
    samples: ["agent", "vector-database", "mcp-server"], height: 24, category: "General", palette: false,
  },
  // No lastModified: the file is tracked, and a timestamp made every CI build a diff.
  width: 24, height: 24, icons: {}, aliases: {},
};
for (const icon of icons) {
  out.icons[icon.slug] = { body: `<g ${STROKE}>${body(icon.svg)}</g>` };
  const duo = join(fromRoot("packages/icons/icons"), icon.category, icon.slug, "duotone-regular.svg");
  try { out.icons[`${icon.slug}-duotone`] = { body: `<g ${STROKE}>${body(await readFile(duo, "utf8"))}</g>` }; } catch { /* no duotone cell */ }
  const meta = JSON.parse(icon.json ?? "{}") as { aliases?: string[] };
  for (const a of meta.aliases ?? []) if (!out.icons[a] && !out.aliases[a]) out.aliases[a] = { parent: icon.slug };
}
(out.info as { total: number }).total = Object.keys(out.icons).length;
await writeFile(fromRoot("packages/icons/iconify.json"), JSON.stringify(out));
console.log(`packages/icons/iconify.json — ${out.info && (out.info as { total: number }).total} icons, ${Object.keys(out.aliases).length} aliases`);
