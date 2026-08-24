import type { Metadata } from "next";
import { Suspense } from "react";
import { allIcons } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { SearchResults } from "@/components/search-results";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every IconMind icon by name, tag, or meaning.",
};

export default function SearchPage() {
  const icons = allIcons.map((i) => ({
    slug: i.slug, name: i.name, category: i.category, subcategory: i.subcategory,
    description: i.description, tags: i.tags,
    body: svgBody(readSvg(i.category, i.slug)),
  }));
  return (
    <div className="pb-24 pt-16">
      <h1 className="text-hero font-semibold">Search</h1>
      <div className="mt-8">
        <Suspense fallback={<div className="h-14" />}>
          <SearchResults icons={icons} />
        </Suspense>
      </div>
    </div>
  );
}
