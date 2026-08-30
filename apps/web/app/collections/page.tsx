import type { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS, iconsOf } from "@/lib/collections";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collections",
  description: "Icons picked for the screens AI products actually have — chat interfaces, agent dashboards, RAG pipelines, MCP servers and LLM observability.",
  alternates: { canonical: "/collections/" },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", name: "Icon collections", url: `${SITE_URL}/collections/`, mainEntity: { "@type": "ItemList", numberOfItems: COLLECTIONS.length, itemListElement: COLLECTIONS.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.name} icons`, url: `${SITE_URL}/collections/${c.slug}/` })) } }, breadcrumbs([{ name: "Collections", path: "/collections/" }])] }} />
      <h1 className="text-h1 font-semibold">Collections</h1>
      <p className="mt-2 max-w-[62ch] text-lead text-ink-2">The icons one kind of screen needs, picked by hand across the set — because "icons for an agent dashboard" is the question, and no category answers it.</p>
      <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c) => {
          const strip = iconsOf(c).slice(0, 6);
          return (
            <Link key={c.slug} href={`/collections/${c.slug}/`} className="group block rounded-2xl border border-line bg-panel px-4 pt-4 pb-3.5 transition-all hover:-translate-y-0.5 hover:border-accent">
              <div className="mb-4 flex justify-between gap-2 text-ink">
                {strip.map((i) => <IconSvg key={i.slug} body={svgBody(readSvg(i.category, i.slug))} size={19} />)}
              </div>
              <p className="text-[14.5px] font-semibold">{c.name}</p>
              <p className="mt-1 text-meta leading-relaxed text-ink-2">{c.lead}</p>
              <p className="mt-3 font-mono text-[10.5px] text-muted">{c.icons.length} icons</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
