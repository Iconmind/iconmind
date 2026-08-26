import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

// Deep import on purpose. The barrel re-exports the metadata schema and the SVG parser,
// which drags Zod and fast-xml-parser into a server that validates nothing — 200 KB for
// code that never runs.
import { searchIcons, suggest, type SearchableIcon } from "@iconmind/shared/search";

/*
 * Read at runtime, not imported.
 *
 * `import metadata from "…json" with { type: "json" }` inlines the whole catalogue into
 * the bundle as an object literal, which V8 then has to parse as *code*. At 537 icons that
 * was 670 KB of source and 536 ms of startup — past the threshold below which nobody waits
 * for the process, and growing with every icon. Read as a file it is one syscall and a
 * JSON.parse: five milliseconds, and flat in the size of the set.
 *
 * `createRequire` rather than a bare import so the bundler leaves the path alone.
 */
const metadata = JSON.parse(
  readFileSync(createRequire(import.meta.url).resolve("@iconmind/icons/metadata.json"), "utf8"),
) as {
  version: string;
  icons: unknown[];
  categories: unknown[];
};

export interface Icon extends SearchableIcon {
  componentName: string;
  related: string[];
  addedIn: string;
}

export const version: string = metadata.version;
export const icons = metadata.icons as unknown as Icon[];
export const categories = metadata.categories as unknown as
  { slug: string; name: string; count: number; subcategories: { slug: string; count: number }[] }[];

const bySlug = new Map(icons.map((i) => [i.slug, i]));
for (const i of icons) for (const a of i.aliases ?? []) bySlug.set(a, i);

export const find = (slug: string) => bySlug.get(slug.trim().toLowerCase());
export const search = (q: string, o?: { category?: string; limit?: number }) => searchIcons(icons, q, o);
export const nearest = (q: string) => suggest(icons, q);
export const inCategory = (c: string, sub?: string) =>
  icons.filter((i) => i.category === c && (!sub || i.subcategory === sub));

/** Paste-ready code. An assistant handed raw data has to assemble this itself, and gets
 *  it subtly wrong often enough that returning it is worth the bytes. */
export function snippets(icon: Icon, size = 24) {
  return {
    import: `import { ${icon.componentName} } from "@iconmind/react";`,
    react: size === 24 ? `<${icon.componentName} />` : `<${icon.componentName} size={${size}} />`,
    html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="sprite.svg#im-${icon.slug}"/></svg>`,
  };
}
