import type { Metadata } from "next";
import type { TOCItemType } from "fumadocs-core/toc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISONS, compareOf } from "@/lib/compare";
import { iconCount } from "@/lib/icons";
import { PageCta } from "@/components/page-cta";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { TocNav } from "@/components/toc-nav";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

const anchor = (heading: string) =>
  heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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
  const toc: TOCItemType[] = [
    { title: "The short answer", url: "#short-answer", depth: 2 },
    ...c.sections.map((sec) => ({ title: sec.heading, url: `#${anchor(sec.heading)}`, depth: 2 })),
    { title: "The verdict", url: "#verdict", depth: 2 },
    { title: "Questions", url: "#questions", depth: 2 },
  ];

  return (
    <div className="mx-auto grid max-w-[84rem] px-5 pb-24 sm:px-7 lg:grid-cols-[minmax(0,1fr)_12rem] lg:gap-10 xl:grid-cols-[12rem_minmax(0,1fr)_12rem]">
      <nav
        aria-label="Comparisons"
        className="hidden xl:sticky xl:top-[60px] xl:block xl:h-[calc(100vh-60px)] xl:self-start xl:overflow-y-auto xl:border-r xl:border-line xl:py-14 xl:pr-6"
      >
        <h2 className="label mb-2">Compare</h2>
        <ul className="grid gap-px">
          {COMPARISONS.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/compare/${o.slug}/`}
                aria-current={o.slug === c.slug ? "page" : undefined}
                className={`block rounded-md px-2.5 py-1.5 text-ui transition-colors ${
                  o.slug === c.slug ? "bg-accent-soft font-semibold text-accent" : "text-ink-2 hover:bg-sunk hover:text-ink"
                }`}
              >
                vs {o.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/icons/" className="mt-5 block px-2.5 text-meta text-muted transition-colors hover:text-ink">
          Browse all {iconCount.toLocaleString("en-GB")} icons →
        </Link>
      </nav>

      <article className="w-full max-w-[900px] pt-14 lg:pt-14">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: `IconMind vs ${c.name}`,
                description: c.lead,
                url: `${SITE_URL}/compare/${c.slug}/`,
                author: { "@type": "Organization", name: "IconMind", url: SITE_URL },
                publisher: { "@type": "Organization", name: "IconMind", url: SITE_URL },
                isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
                articleSection: c.sections.map((s) => s.heading),
              },
              { "@type": "FAQPage", mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
              breadcrumbs([{ name: "Compare", path: "/compare/" }, { name: c.name, path: `/compare/${c.slug}/` }]),
            ],
          }}
        />
        <p className="label">Compared</p>
        <h1 className="mt-2 text-h1 font-semibold">IconMind vs {c.name}</h1>
        <p className="mt-3 max-w-[62ch] text-lead text-ink-2">{c.lead}</p>

        <section id="short-answer" className="mt-9 scroll-mt-24 rounded-2xl border border-line bg-panel px-5 py-5 sm:px-6">
          <h2 className="label">The short answer</h2>
          <div className="mt-3 max-w-[64ch] space-y-3.5 text-ui leading-relaxed text-ink-2">
            {c.answer.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

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

        <nav className="mt-8 border-y border-line-2 py-4 lg:hidden" aria-label="Sections">
          <p className="label mb-2.5">In detail</p>
          <ol className="flex flex-wrap gap-x-5 gap-y-1.5 text-ui text-ink-2">
            {c.sections.map((s, i) => (
              <li key={s.heading} className="flex gap-2">
                <span className="font-mono text-[11px] tabular-nums text-muted">{i + 1}</span>
                <a href={`#${anchor(s.heading)}`} className="transition-colors hover:text-accent">{s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>

        {c.sections.map((s) => (
          <section key={s.heading} id={anchor(s.heading)} className="mt-11 scroll-mt-24">
            <h2 className="text-h2 font-semibold">{s.heading}</h2>
            <div className="mt-3.5 max-w-[65ch] space-y-3.5 text-ui leading-relaxed text-ink-2">
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {s.table && (
              <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full text-ui">
                  <thead className="bg-sunk text-left">
                    <tr>
                      {s.table.head.map((h, i) => (
                        <th key={i} className={i === 0 ? "px-4 py-3 font-medium text-muted" : "px-4 py-3 font-semibold"}>{h || " "}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map(([label, a, b]) => (
                      <tr key={label} className="border-t border-line-2 align-top">
                        <th scope="row" className="px-4 py-3 text-left font-medium text-muted">{label}</th>
                        <td className="px-4 py-3 text-ink">{a}</td>
                        <td className="px-4 py-3 text-ink-2">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.code && (
              <pre className="mt-5 max-w-[65ch] overflow-x-auto rounded-xl border border-line-2 bg-sunk px-4 py-3.5 font-mono text-[12px] leading-[1.7] whitespace-pre text-ink-2">{s.code}</pre>
            )}
          </section>
        ))}

        <section id="verdict" className="mt-12 scroll-mt-24 border-t border-line pt-7">
          <h2 className="text-h2 font-semibold">The verdict</h2>
          <div className="mt-3.5 max-w-[65ch] space-y-4 text-ui leading-relaxed text-ink-2">
            {c.verdict.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>

        <section id="questions" className="mt-12 scroll-mt-24">
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

        <section className="mt-10 border-t border-line pt-6 xl:hidden">
          <h2 className="label mb-3">Other comparisons</h2>
          <div className="flex flex-wrap gap-2">
            {COMPARISONS.filter((o) => o.slug !== c.slug).map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}/`} className="rounded-md border border-line bg-panel px-3 py-1.5 text-ui transition-colors hover:border-accent">vs {o.name}</Link>
            ))}
          </div>
        </section>

        <PageCta heading={`${iconCount.toLocaleString("en-GB")} icons, one set`}>
          Outline and duotone at three weights, compiled from one grid, with the code for nine
          frameworks and an MCP server that picks them. MIT — commercial use, no attribution.
        </PageCta>
      </article>

      <nav
        aria-label="On this page"
        className="hidden lg:sticky lg:top-[60px] lg:block lg:max-h-[calc(100vh-60px)] lg:self-start lg:overflow-y-auto lg:py-14"
      >
        <h2 className="label mb-3">On this page</h2>
        <TocNav items={toc} />
      </nav>
    </div>
  );
}
