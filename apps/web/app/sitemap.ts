import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { allCategories, allIcons } from "@/lib/icons";
import { allGroups, allTags } from "@/lib/index-pages";
import { source } from "@/lib/source";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

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
 *
 * Three layers of list pages sit between the home page and the icons, and all of them
 * are here: the twelve categories, their ninety-odd groups, and every tag that has a
 * page (three or more icons — `lib/index-pages.ts` sets the floor). A tag page is
 * listed above an icon page because it answers a broader query and links to several.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/icons/`, priority: 0.9 },
    { url: `${BASE}/categories/`, priority: 0.8 },
    ...source.getPages().map((p) => ({ url: `${BASE}${p.url}/`, priority: 0.8 })),
    { url: `${BASE}/contribute/`, priority: 0.6 },
    { url: `${BASE}/changelog/`, priority: 0.5 },
    { url: `${BASE}/tags/`, priority: 0.8 },
    ...allCategories.map((c) => ({ url: `${BASE}/categories/${c.slug}/`, priority: 0.7 })),
    ...allGroups.map((g) => ({ url: `${BASE}/categories/${g.category}/${g.slug}/`, priority: 0.7 })),
    ...allTags.map((t) => ({ url: `${BASE}/tags/${t.slug}/`, priority: 0.65 })),
    ...allIcons.map((i) => ({ url: `${BASE}/icons/${i.slug}/`, priority: 0.6 })),
  ];
}
