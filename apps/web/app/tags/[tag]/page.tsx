import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { iconCount } from "@/lib/icons";
import { allTags, nameList, relatedTags, tagOf, titleCase } from "@/lib/index-pages";
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
  return allTags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const t = tagOf(tag);
  if (!t) return {};
  return {
    title: `${titleCase(t.slug)} icons`,
    description: `${t.count} free icons tagged “${t.slug}” — ${nameList(t.icons)}. SVG, React, Vue, Svelte, Flutter and more; outline and duotone in three weights. MIT licensed.`,
    alternates: { canonical: `/tags/${t.slug}/` },
  };
}

/**
 * A tag is a list that cuts across the categories.
 *
 * `retry` lives in devops, in agents and in automation, and a reader looking for a retry
 * icon does not care which — this is the page where all of them stand together. The
 * groups are the categories the icons came from, so the page keeps the set's own map
 * visible, and every group heading is a link back to it.
 */
export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const t = tagOf(tag);
  if (!t) notFound();

  const sections = t.categories.map((c) => ({
    slug: c.slug,
    label: c.name,
    href: `/categories/${c.slug}/`,
    tiles: t.icons
      .filter((i) => i.category === c.slug)
      .map((i) => ({
        slug: i.slug,
        name: i.name,
        body: svgBody(readSvg(i.category, i.slug)),
        meta: i.description,
      })),
  }));
  const related = relatedTags(t);
  const title = `${titleCase(t.slug)} icons`;

  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-8 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: title,
              description: `${t.count} icons tagged ${t.slug}: ${nameList(t.icons, 6)}.`,
              url: `${SITE_URL}/tags/${t.slug}/`,
              isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: t.count,
                itemListElement: t.icons.slice(0, 24).map((i, n) => ({
                  "@type": "ListItem",
                  position: n + 1,
                  name: `${i.name} icon`,
                  url: `${SITE_URL}/icons/${i.slug}/`,
                })),
              },
            },
            breadcrumbs([
              { name: "Tags", path: "/tags/" },
              { name: t.slug, path: `/tags/${t.slug}/` },
            ]),
          ],
        }}
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tags/">tags</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t.slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[62ch]">
          <h1 className="text-h1 font-semibold">{title}</h1>
          <p className="mt-2 text-lead text-ink-2">
            {t.count} icons carry the tag <span className="font-mono text-ink">{t.slug}</span>
            {t.categories.length > 1 ? ", across " : ", all in "}
            {t.categories.map((c, n) => (
              <span key={c.slug}>
                {n > 0 && (n === t.categories.length - 1 ? " and " : ", ")}
                <Link href={`/categories/${c.slug}/`} className="text-ink underline decoration-line-2 underline-offset-[3px] transition-colors hover:decoration-accent">
                  {c.name}
                </Link>
              </span>
            ))}
            . {nameList(t.icons, 3)} — each in outline and duotone at three weights, with the
            code for React, Vue, Svelte, Flutter and more.
          </p>
        </div>
        <div className="flex flex-none flex-wrap items-center gap-2.5">
          <Badge variant="muted">{t.count} icons</Badge>
          <Button asChild variant="outline" size="sm">
            <Link href={`/icons/?q=${encodeURIComponent(t.slug)}`}>
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
        <IconTileGrid sections={sections} min={128} size={24} labels />
      </div>

      <DescribedList heading={`The ${t.count} ${t.slug} icons, described`} icons={t.icons} />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="label mb-3">Tags these icons also carry</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/tags/${r.slug}/`}
                className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-mono transition-colors hover:border-accent"
              >
                {r.slug}
                <span className="text-[11px] tabular-nums text-muted">{r.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <PageCta heading={`Every ${t.slug} icon, free to ship`} primary={{ href: "/tags/", label: "All tags" }}>
        {t.count} of {iconCount.toLocaleString("en-GB")} icons compiled from one grid — outline and
        duotone, three weights, every cell generated rather than redrawn. MIT licensed: commercial
        use, no attribution, no seat count.
      </PageCta>
    </div>
  );
}
