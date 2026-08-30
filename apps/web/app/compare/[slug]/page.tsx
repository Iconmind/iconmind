import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISONS, compareOf } from "@/lib/compare";
import { iconCount } from "@/lib/icons";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = compareOf(slug);
  if (!c) return {};
  return {
    title: `IconMind vs ${c.name}`,
    description: `${c.lead} Icons, AI vocabulary, variants, frameworks, licence and downloads, side by side.`,
    alternates: { canonical: `/compare/${c.slug}/` },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = compareOf(slug);
  if (!c) notFound();
  return (
    <div className="mx-auto max-w-[900px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebPage", name: `IconMind vs ${c.name}`, description: c.lead, url: `${SITE_URL}/compare/${c.slug}/`, isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` } },
            { "@type": "FAQPage", mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
            breadcrumbs([{ name: "Compare", path: "/compare/" }, { name: c.name, path: `/compare/${c.slug}/` }]),
          ],
        }}
      />
      <p className="label">Compared</p>
      <h1 className="mt-2 text-h1 font-semibold">IconMind vs {c.name}</h1>
      <p className="mt-3 max-w-[62ch] text-lead text-ink-2">{c.lead}</p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-ui">
          <thead className="bg-sunk text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-muted">&nbsp;</th>
              <th className="px-4 py-3 font-semibold">IconMind</th>
              <th className="px-4 py-3 font-semibold"><a href={c.url} rel="noopener" className="hover:text-accent">{c.name}</a></th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map(([label, ours, theirs]) => (
              <tr key={label} className="border-t border-line-2 align-top">
                <th scope="row" className="px-4 py-3 text-left font-medium text-muted">{label}</th>
                <td className="px-4 py-3 text-ink">{ours}</td>
                <td className="px-4 py-3 text-ink-2">{theirs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 max-w-[65ch] space-y-4 text-ui leading-relaxed text-ink-2">
        {c.verdict.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <section className="mt-12">
        <h2 className="text-h2 font-semibold">Questions</h2>
        <dl className="mt-4 divide-y divide-line-2">
          {c.faq.map(([q, a]) => (
            <div key={q} className="py-4">
              <dt className="text-ui font-semibold">{q}</dt>
              <dd className="mt-1.5 max-w-[65ch] text-ui leading-relaxed text-ink-2">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 border-t border-line pt-6">
        <h2 className="label mb-3">Other comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {COMPARISONS.filter((o) => o.slug !== c.slug).map((o) => (
            <Link key={o.slug} href={`/compare/${o.slug}/`} className="rounded-md border border-line bg-panel px-3 py-1.5 text-ui transition-colors hover:border-accent">vs {o.name}</Link>
          ))}
        </div>
      </section>

      <PageCta heading={`${iconCount.toLocaleString("en-GB")} icons, one set`}>
        Outline and duotone at three weights, compiled from one grid, with the code for eleven
        frameworks and an MCP server that picks them. MIT — commercial use, no attribution.
      </PageCta>
    </div>
  );
}
