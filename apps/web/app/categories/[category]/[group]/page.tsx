import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allGroups, groupOf, groupsOf, nameList, titleCase, topTags } from "@/lib/index-pages";
import { readSvg, svgBody } from "@/lib/svg";
import { IconTileGrid } from "@/components/icon-tile-grid";
import { DescribedList } from "@/components/described-list";
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
  return allGroups.map((g) => ({ category: g.category, group: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; group: string }> }): Promise<Metadata> {
  const { category, group } = await params;
  const g = groupOf(category, group);
  if (!g) return {};
  return {
    title: `${titleCase(g.slug)} icons — ${g.categoryName}`,
    description: `${g.count} free ${g.slug} icons from the ${g.categoryName} set — ${nameList(g.icons)}. SVG, React, Vue, Svelte, Flutter and more; outline and duotone in three weights. MIT licensed.`,
    alternates: { canonical: `/categories/${g.category}/${g.slug}/` },
  };
}

/**
 * A group is one shelf of a category, on its own page.
 *
 * The category page shows all its groups in one grid, which is right for browsing and
 * wrong for arriving: somebody who searched "training icons" wants the sixty-one, not
 * the three hundred with a heading to scroll to. This is that page — the same tiles,
 * the words that name them, and the tags that narrow them further.
 */
export default async function GroupPage({ params }: { params: Promise<{ category: string; group: string }> }) {
  const { category, group } = await params;
  const g = groupOf(category, group);
  if (!g) notFound();

  const tiles = g.icons.map((i) => ({
    slug: i.slug,
    name: i.name,
    body: svgBody(readSvg(i.category, i.slug)),
    meta: i.description,
  }));
  const siblings = groupsOf(g.category).filter((o) => o.slug !== g.slug);
  const tags = topTags(g.icons);
  const title = `${titleCase(g.slug)} icons`;

  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-8 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: `${title} — ${g.categoryName}`,
              description: `${g.count} ${g.slug} icons in ${g.categoryName}: ${nameList(g.icons, 6)}.`,
              url: `${SITE_URL}/categories/${g.category}/${g.slug}/`,
              isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: g.count,
                itemListElement: g.icons.slice(0, 24).map((i, n) => ({
                  "@type": "ListItem",
                  position: n + 1,
                  name: `${i.name} icon`,
                  url: `${SITE_URL}/icons/${i.slug}/`,
                })),
              },
            },
            breadcrumbs([
              { name: "Categories", path: "/categories/" },
              { name: g.categoryName, path: `/categories/${g.category}/` },
              { name: titleCase(g.slug), path: `/categories/${g.category}/${g.slug}/` },
            ]),
          ],
        }}
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/categories/">categories</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/categories/${g.category}/`}>{g.category}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{g.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[62ch]">
          <p className="label">
            <Link href={`/categories/${g.category}/`} className="transition-colors hover:text-accent">
              {g.categoryName}
            </Link>
          </p>
          <h1 className="mt-1 text-h1 font-semibold">{title}</h1>
          <p className="mt-2 text-lead text-ink-2">
            {g.count} icons in the <span className="font-mono text-ink">{g.slug}</span> group of{" "}
            {g.categoryName}: {nameList(g.icons, 3)} — each in outline and duotone at three
            weights, with the code for React, Vue, Svelte, Flutter and more.
          </p>
        </div>
        <div className="flex flex-none flex-wrap items-center gap-2.5">
          <Badge variant="muted">
            {g.count} icons · 1 of {siblings.length + 1} groups
          </Badge>
          <Button asChild variant="outline" size="sm">
            <Link href={`/icons/?cat=${g.category}&q=${encodeURIComponent(g.slug)}`}>
              Open in browser
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h15M13.2 6l6 6-6 6" />
              </svg>
            </Link>
          </Button>
        </div>
      </header>

      <div className="mt-10">
        <IconTileGrid tiles={tiles} min={128} size={24} labels />
      </div>

      <DescribedList heading={`The ${g.count} ${g.slug} icons in ${g.categoryName}, described`} icons={g.icons} />

      {tags.length > 0 && (
        <section className="mt-12">
          <h2 className="label mb-3">Narrow it by tag</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.slug}
                href={`/tags/${t.slug}/`}
                className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-mono transition-colors hover:border-accent"
              >
                {t.slug}
                <span className="text-[11px] tabular-nums text-muted">{t.count} here · {t.total} in all</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <PageCta
        heading={`Every ${g.slug} icon in ${g.categoryName}, free to ship`}
        primary={{ href: `/categories/${g.category}/`, label: `All ${g.categoryName} icons` }}
      >
        {g.count} icons in outline and duotone at three weights, generated from one grid so
        nothing in the set can drift out of step. MIT licensed — commercial use, no attribution,
        no seat count.
      </PageCta>

      {siblings.length > 0 && (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="label mb-4">Other groups in {g.categoryName}</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((o) => (
              <Link
                key={o.slug}
                href={`/categories/${o.category}/${o.slug}/`}
                className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 text-ui transition-colors hover:border-accent"
              >
                {o.slug}
                <span className="font-mono text-[11px] tabular-nums text-muted">{o.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
