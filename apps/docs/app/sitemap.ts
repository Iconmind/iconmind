import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { allCategories, allIcons } from "@/lib/icons";

const BASE = "https://iconmind.dev";

/**
 * Every icon gets its own indexable page. With a thousand icons that is a thousand
 * entry points from search — the largest acquisition channel this project has, and the
 * only one that keeps working after a launch week ends.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/icons/`, priority: 0.9 },
    { url: `${BASE}/categories/`, priority: 0.8 },
    { url: `${BASE}/docs/`, priority: 0.8 },
    { url: `${BASE}/search/`, priority: 0.6 },
    { url: `${BASE}/roadmap/`, priority: 0.6 },
    { url: `${BASE}/changelog/`, priority: 0.5 },
    ...allCategories.map((c) => ({ url: `${BASE}/categories/${c.slug}/`, priority: 0.7 })),
    ...allIcons.map((i) => ({ url: `${BASE}/icons/${i.slug}/`, priority: 0.6 })),
  ];
}
