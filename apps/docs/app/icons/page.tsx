import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { allCategories, allIcons, iconCount } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconGrid } from "@/components/icon-grid";
import { IconSvg } from "@/components/icon-svg";
import { JsonLd, breadcrumbs } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Browse icons",
  description:
    `Search all ${iconCount} IconMind icons by name, tag or alias. Outline and duotone, ` +
    "in three weights, with the code for whichever you land on. MIT licensed.",
  alternates: { canonical: "/icons/" },
};

/** How many cells the prerendered fallback carries — see the note on `Fallback`. */
const STATIC_CELLS = 60;

export default function IconsPage() {
  const icons = allIcons.map((i) => ({
    slug: i.slug,
    name: i.name,
    category: i.category,
    subcategory: i.subcategory,
    tags: [...i.tags, ...i.aliases].join(" "),
    body: svgBody(readSvg(i.category, i.slug)),
  }));
  const categories = allCategories.map((c) => ({ slug: c.slug, name: c.name, count: c.count }));

  return (
    <>
      {/* Outside the boundary on purpose: the grid below bails out to the client at build
          time, and structured data that only exists after hydration is structured data no
          crawler will read. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: "Browse icons",
              description: `All ${iconCount} IconMind icons, searchable by name, tag or alias.`,
              url: "https://iconmind.dev/icons/",
              isPartOf: { "@type": "WebSite", "@id": "https://iconmind.dev/#website" },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: iconCount,
                itemListElement: categories.map((c, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${c.name} icons`,
                  url: `https://iconmind.dev/categories/${c.slug}/`,
                })),
              },
            },
            breadcrumbs([{ name: "Icons", path: "/icons/" }]),
          ],
        }}
      />
      <Suspense fallback={<Fallback icons={icons.slice(0, STATIC_CELLS)} />}>
        <IconGrid icons={icons} categories={categories} />
      </Suspense>
    </>
  );
}

/**
 * What this page is before the interactive grid takes over.
 *
 * The grid reads the category and the query out of the URL, so it cannot be prerendered —
 * React bails the boundary out at build time and emits this instead. `fallback={null}` is
 * what was here, which meant the site's second-most-important URL prerendered to an empty
 * page: no heading, no copy, no links, nothing for a crawler that does not run JavaScript.
 *
 * It carries 60 cells rather than all 765. Every icon is reachable and indexable from its
 * category page and from the sitemap, so the remaining 645 would buy a crawler nothing it
 * does not already have, and they would put a second copy of 765 inline SVGs into the HTML
 * on top of the one already in the payload — and a fallback is serialised into the payload
 * as well, so every cell here costs twice. 60 is about a screen.
 */
function Fallback({ icons }: { icons: { slug: string; name: string; body: string }[] }) {
  return (
    <div className="px-5 pt-7 pb-24 sm:px-7">
      <h1 className="text-h1 font-semibold">All icons</h1>
      <p className="mt-1.5 max-w-[560px] text-body leading-relaxed text-muted">
        The complete set of {iconCount.toLocaleString("en-GB")} icons, drawn on a 24×24 grid
        in outline and duotone at three weights. Search by name, tag or alias.
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {allCategories.map((c) => (
          <Link
            key={c.slug}
            href={`/icons/?cat=${c.slug}`}
            className="flex items-center gap-1.5 rounded-pill border border-line bg-panel px-3 py-1.5 text-ui text-ink-2"
          >
            {c.name}
            <span className="font-mono text-[10.5px] tabular-nums opacity-60">{c.count}</span>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid overflow-hidden rounded-2xl border border-line bg-panel [grid-template-columns:repeat(auto-fill,minmax(118px,1fr))]">
        {icons.map((i) => (
          <Link
            key={i.slug}
            href={`/icons/${i.slug}/`}
            className="flex aspect-square flex-col items-center justify-center gap-[11px] bg-panel outline outline-line-2 -outline-offset-[0.5px]"
          >
            <IconSvg body={i.body} size={24} className="text-ink" />
            <span className="max-w-[88%] truncate font-mono text-[10.5px] text-muted">{i.slug}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
