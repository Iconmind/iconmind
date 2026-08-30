import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COLLECTIONS, collectionOf, iconsOf } from "@/lib/collections";
import { readSvg, svgBody } from "@/lib/svg";
import { IconTileGrid } from "@/components/icon-tile-grid";
import { DescribedList } from "@/components/described-list";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionOf(slug);
  if (!c) return {};
  return {
    title: `${c.name} icons`,
    description: `${c.lead} ${c.icons.length} icons, outline and duotone in three weights, for React, Vue, Svelte, Flutter and more. MIT.`,
    alternates: { canonical: `/collections/${c.slug}/` },
  };
}

/**
 * A collection is a use case, not a category: the icons one kind of screen needs,
 * picked by hand across the set and written up as such. It exists because that is how
 * the question is asked — "icons for an agent dashboard" — and no category page answers it.
 */
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collectionOf(slug);
  if (!c) notFound();
  const icons = iconsOf(c);
  const tiles = icons.map((i) => ({ slug: i.slug, name: i.name, body: svgBody(readSvg(i.category, i.slug)), meta: i.description }));
  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-8 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage", name: `${c.name} icons`, description: c.lead, url: `${SITE_URL}/collections/${c.slug}/`,
              isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
              mainEntity: { "@type": "ItemList", numberOfItems: icons.length, itemListElement: icons.slice(0, 24).map((i, n) => ({ "@type": "ListItem", position: n + 1, name: `${i.name} icon`, url: `${SITE_URL}/icons/${i.slug}/` })) },
            },
            breadcrumbs([{ name: "Collections", path: "/collections/" }, { name: c.name, path: `/collections/${c.slug}/` }]),
          ],
        }}
      />
      <p className="label"><Link href="/collections/" className="transition-colors hover:text-accent">Collections</Link></p>
      <h1 className="mt-2 text-h1 font-semibold">{c.name} icons</h1>
      <p className="mt-3 max-w-[62ch] text-lead text-ink-2">{c.lead}</p>
      <div className="mt-10">
        <IconTileGrid tiles={tiles} min={128} size={24} labels />
      </div>
      <div className="mt-10 max-w-[65ch] space-y-4 text-ui leading-relaxed text-ink-2">
        {c.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <pre className="mt-6 max-w-[65ch] overflow-x-auto rounded-xl border border-line-2 bg-sunk px-4 py-3.5 font-mono text-[12px] leading-[1.6] text-ink-2">{c.snippet}</pre>
      <DescribedList heading={`The ${icons.length} icons, described`} icons={icons} />
      <section className="mt-12 border-t border-line pt-6">
        <h2 className="label mb-3">Other collections</h2>
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.filter((o) => o.slug !== c.slug).map((o) => (
            <Link key={o.slug} href={`/collections/${o.slug}/`} className="rounded-md border border-line bg-panel px-3 py-1.5 text-ui transition-colors hover:border-accent">{o.name}</Link>
          ))}
        </div>
      </section>
      <PageCta heading={`Every ${c.name.toLowerCase()} icon, free to ship`} primary={{ href: "/icons/", label: "Browse the whole set" }}>
        {icons.length} icons drawn on one grid, in outline and duotone at three weights, with the
        code for eleven frameworks. MIT — commercial use, no attribution, no seat count.
      </PageCta>
    </div>
  );
}
