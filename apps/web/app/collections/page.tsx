import type { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS, iconsOf, type Collection } from "@/lib/collections";
import { iconCount } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const picked = COLLECTIONS.reduce((n, c) => n + c.icons.length, 0);

export const metadata: Metadata = {
  title: "Collections",
  description:
    `${COLLECTIONS.length} sets of icons picked for the screens software actually has — chat interfaces, agent dashboards, RAG pipelines, MCP servers, voice agents, CI/CD, data platforms, security, cloud consoles, automation canvases, analytics and device fleets.`,
  alternates: { canonical: "/collections/" },
};

const BANDS: { id: Collection["group"]; title: string; lead: string }[] = [
  {
    id: "models",
    title: "Building with models",
    lead: "The screens that did not exist three years ago: a chat with a model, agents at work, a retrieval pipeline, an MCP server, a voice call, and the dashboard watching all of it.",
  },
  {
    id: "platform",
    title: "The platform around it",
    lead: "The rest of the product an AI feature ships inside — pipelines, data, security, cloud, automation, analytics and the machines it all runs on — drawn to the same grid so one screen never looks like two products.",
  },
];

function Card({ c }: { c: Collection }) {
  const strip = iconsOf(c).slice(0, 10);
  return (
    <Link
      href={`/collections/${c.slug}/`}
      className="group flex flex-col rounded-2xl border border-line bg-panel px-5 pt-5 pb-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-panel"
    >
      {/* The icons do the arguing; the sentence underneath only has to say which screen. */}
      <div className="mb-4 flex flex-wrap gap-3 text-ink">
        {strip.map((i) => (
          <IconSvg key={i.slug} body={svgBody(readSvg(i.category, i.slug))} size={22} />
        ))}
      </div>
      <p className="text-[15px] font-semibold">{c.name}</p>
      <p className="mt-1.5 text-meta leading-relaxed text-ink-2">{c.lead}</p>
      <p className="mt-auto pt-3.5 font-mono text-[10.5px] text-muted">
        {c.icons.length} icons
        <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
          <span className="px-1.5 text-line">·</span>open →
        </span>
      </p>
    </Link>
  );
}

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1560px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: "Icon collections",
              description: `${COLLECTIONS.length} hand-picked sets of icons for particular screens.`,
              url: `${SITE_URL}/collections/`,
              isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: COLLECTIONS.length,
                itemListElement: COLLECTIONS.map((c, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${c.name} icons`,
                  url: `${SITE_URL}/collections/${c.slug}/`,
                })),
              },
            },
            breadcrumbs([{ name: "Collections", path: "/collections/" }]),
          ],
        }}
      />

      <header className="max-w-[64ch]">
        <h1 className="text-h1 font-semibold">Collections</h1>
        <p className="mt-2 text-lead text-ink-2">
          The icons one kind of screen needs, picked by hand across the set — because
          &ldquo;icons for an agent dashboard&rdquo; is the question somebody actually asks, and no
          category page answers it.
        </p>
        <p className="mt-3 text-meta text-muted">
          {COLLECTIONS.length} collections · {picked.toLocaleString("en-GB")} picks from{" "}
          {iconCount.toLocaleString("en-GB")} icons · every one links to its own page with the
          code for nine frameworks.
        </p>
      </header>

      {BANDS.map((band) => {
        const list = COLLECTIONS.filter((c) => c.group === band.id);
        return (
          <section key={band.id} className="mt-12">
            <div className="max-w-[64ch]">
              <h2 className="text-h2 font-semibold">{band.title}</h2>
              <p className="mt-1.5 text-ui leading-relaxed text-ink-2">{band.lead}</p>
            </div>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => <Card key={c.slug} c={c} />)}
            </div>
          </section>
        );
      })}

      <PageCta heading="Nothing here matches your screen?">
        Every collection is a hand-picked slice of the same {iconCount.toLocaleString("en-GB")}
        {" "}icons — browse them all, or ask for the one that is missing and it usually ships in the
        next release. MIT, no attribution, no seat count.
      </PageCta>
    </div>
  );
}
