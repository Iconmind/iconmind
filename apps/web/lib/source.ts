import { loader } from "fumadocs-core/source";
import { docs } from "@/.source/server";

/**
 * Fumadocs supplies the content layer — MDX loading, typed frontmatter, the page tree,
 * and headings for the table of contents.
 *
 * fumadocs-ui is deliberately not used. It ships its own layout and, through its
 * dependencies, renders Lucide icons in the chrome — decorating an icon library's own
 * documentation with a competitor's icons. The pages are rendered with our components
 * and our icons instead.
 */
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

/** Sidebar order. Anything not listed falls to the end, alphabetically. */
const ORDER = [
  "index", "installation",
  "react", "vue", "svelte", "solid", "preact", "react-native", "astro", "flutter", "laravel",
  "svg", "figma", "mcp",
  "design-guidelines", "contributing", "faq",
];

export function orderedPages() {
  const pages = source.getPages();
  return [...pages].sort((a, b) => {
    const key = (p: (typeof pages)[number]) => {
      const slug = p.slugs.length ? p.slugs.join("/") : "index";
      const i = ORDER.indexOf(slug);
      return i === -1 ? ORDER.length : i;
    };
    return key(a) - key(b) || a.url.localeCompare(b.url);
  });
}
