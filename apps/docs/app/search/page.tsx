import type { Metadata } from "next";
import { Suspense } from "react";
import { allIcons } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = {
  alternates: { canonical: "/search/" },
  title: "Search",
  description: "Search every IconMind icon by name, tag, or meaning.",
  /*
   * Kept out of the index, kept in the crawl.
   *
   * An internal search results page has nothing on it until somebody types, and every
   * query that did get indexed would be a thinner duplicate of the browse grid — which
   * is why Google asks not to submit them. `follow` stays on so the links a query
   * produces are still a path into the icon pages.
   */
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const icons = allIcons.map((i) => ({
    slug: i.slug, name: i.name, category: i.category, subcategory: i.subcategory,
    description: i.description, tags: i.tags,
    body: svgBody(readSvg(i.category, i.slug)),
  }));
  return (
    <div className="mx-auto max-w-[70rem] px-5 pt-16 pb-24 sm:px-7">
      <h1 className="text-h1 font-semibold">Search</h1>
      <p className="mt-3 max-w-[56ch] text-lead text-ink-2">
        Every icon, by name, tag, alias or meaning — and when nothing matches, the nearest
        thing that does.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-14" />}>
          <SearchResults icons={icons} />
        </Suspense>
      </div>
    </div>
  );
}
