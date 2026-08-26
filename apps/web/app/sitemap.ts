import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { allCategories, allIcons } from "@/lib/icons";
import { source } from "@/lib/source";

const BASE = "https://iconmind.dev";

/**
 * Every icon gets its own indexable page. With a thousand icons that is a thousand
 * entry points from search — the largest acquisition channel this project has, and the
 * only one that keeps working after a launch week ends.
 *
 * Two corrections. `/contribute/` is a real page and was never listed. `/search/` was,
 * and should not be: it is an internal search results page, which is the one thing
 * Google's own guidelines ask you not to submit — it has no content of its own until
 * somebody types, and every query would be a near-duplicate of the browse grid. It is
 * `noindex, follow` in its own metadata now, so the links on it are still crawled.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/icons/`, priority: 0.9 },
    { url: `${BASE}/categories/`, priority: 0.8 },
    ...source.getPages().map((p) => ({ url: `${BASE}${p.url}/`, priority: 0.8 })),
    { url: `${BASE}/contribute/`, priority: 0.6 },
    { url: `${BASE}/roadmap/`, priority: 0.6 },
    { url: `${BASE}/changelog/`, priority: 0.5 },
    ...allCategories.map((c) => ({ url: `${BASE}/categories/${c.slug}/`, priority: 0.7 })),
    ...allIcons.map((i) => ({ url: `${BASE}/icons/${i.slug}/`, priority: 0.6 })),
  ];
}
