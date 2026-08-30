import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allCategories, categoryOf, iconsIn } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { BLURB } from "@/lib/blurbs";
import { topTags } from "@/lib/index-pages";
import { IconTileGrid } from "@/components/icon-tile-grid";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/site";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function generateStaticParams() {
  return allCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = categoryOf(category);
  if (!c) return {};
  const blurb = BLURB[c.slug];
  return {
    title: `${c.name} icons`,
    description: `${c.count} free ${c.name} icons${blurb ? ` — ${blurb.toLowerCase()}` : ""}. SVG, React, Vue, Flutter and more; outline and duotone in three weights. MIT licensed.`,
    alternates: { canonical: `/categories/${c.slug}/` },
  };
}

/**
 * A category is a collection, and it is a level in a trail.
 *
 * `ItemList` names the first two dozen icons so the entry has something concrete in it
 * rather than a bare page title — the full list is on the page and in the sitemap either
 * way, and a 149-entry list in the head would be most of the document.
 */
function schema(c: { slug: string; name: string; count: number }, blurb: string, tiles: { slug: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${c.name} icons`,
        description: blurb,
        url: `${SITE_URL}/categories/${c.slug}/`,
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: c.count,
          itemListElement: tiles.slice(0, 24).map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${t.name} icon`,
            url: `${SITE_URL}/icons/${t.slug}/`,
          })),
        },
      },
      breadcrumbs([
        { name: "Categories", path: "/categories/" },
        { name: c.name, path: `/categories/${c.slug}/` },
      ]),
    ],
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = categoryOf(category);
  if (!c) notFound();

  const icons = iconsIn(c.slug);
  const others = allCategories.filter((o) => o.slug !== c.slug);

  const groups = c.subcategories
    .map((sub) => ({
      slug: sub.slug,
      href: `/categories/${c.slug}/${sub.slug}/`,
      tiles: icons
        .filter((i) => i.subcategory === sub.slug)
        .map((i) => ({
          slug: i.slug,
          name: i.name,
          body: svgBody(readSvg(i.category, i.slug)),
          meta: i.description,
        })),
    }))
    .filter((g) => g.tiles.length > 0);

  const blurb = BLURB[c.slug] ?? `${c.count} icons.`;
  const flat = groups.flatMap((g) => g.tiles);
  const tags = topTags(icons, 16);

  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-8 pb-24 sm:px-7">
      <JsonLd data={schema(c, blurb, flat)} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/categories/">categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{c.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[62ch]">
          <h1 className="text-h1 font-semibold">{c.name}</h1>
          <p className="mt-2 text-lead text-ink-2">{blurb}</p>
        </div>
        <div className="flex flex-none flex-wrap items-center gap-2.5">
          <Badge variant="muted">
            {c.count} icons · {c.subcategories.length} groups
          </Badge>
          <Button asChild variant="outline" size="sm">
            <Link href={`/icons/?cat=${c.slug}`}>
              Open in browser
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h15M13.2 6l6 6-6 6" />
              </svg>
            </Link>
          </Button>
        </div>
      </header>

      {/* The groups, as anchors. A category with eleven of them is a page somebody scrolls
          past looking for one — the rail gives them the jump. */}
      {groups.length > 3 && (
        <div className="fade-r mt-8 overflow-x-auto border-y border-line py-2.5">
          <div className="flex w-max gap-1.5">
            {groups.map((g) => (
              <a
                key={g.slug}
                href={`#${g.slug}`}
                className="flex items-center gap-1.5 rounded-pill border border-line bg-panel px-3 py-1.5 font-mono text-mono whitespace-nowrap text-ink-2 transition-colors hover:border-accent hover:text-ink"
              >
                {g.slug}
                <span className="tabular-nums opacity-55">{g.tiles.length}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* One grid for the whole category, not one per group.
          Nine separately-sized shelves gave the page nine different right-hand edges. The
          headings span every column instead, so a group still starts on its own row and
          the page keeps one left and one right edge all the way down. */}
      <div className="mt-10">
        <IconTileGrid sections={groups} min={128} size={24} labels />
      </div>

      <PageCta
        heading={`Every ${c.name} icon, free to ship`}
        primary={{ href: "/icons/?cat=" + c.slug, label: "Open in the browser" }}
      >
        {c.count} {c.name} icons in outline and duotone at three weights, generated from one
        grid so nothing in the set can drift out of step. MIT licensed — commercial use, no
        attribution, no seat count.
      </PageCta>

      {tags.length > 0 && (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="label mb-4">Tags across {c.name}</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.slug}
                href={`/tags/${t.slug}/`}
                className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-mono transition-colors hover:border-accent"
              >
                {t.slug}
                <span className="text-[11px] tabular-nums text-muted">{t.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 border-t border-line pt-8">
        <h2 className="label mb-4">Groups in {c.name}</h2>
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <Link
              key={g.slug}
              href={g.href}
              className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 text-ui transition-colors hover:border-accent"
            >
              {g.slug}
              <span className="font-mono text-[11px] tabular-nums text-muted">{g.tiles.length}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <h2 className="label mb-4">Other categories</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/categories/${o.slug}/`}
              className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 text-ui transition-colors hover:border-accent"
            >
              {o.name}
              <span className="font-mono text-[11px] tabular-nums text-muted">{o.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
