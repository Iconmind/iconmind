import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISONS } from "@/lib/compare";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare",
  description: "IconMind next to Lucide, Tabler, Heroicons and SVG Repo — icon counts, AI vocabulary, variants, frameworks, licences and downloads, in plain tables.",
  alternates: { canonical: "/compare/" },
};

export default function ComparesPage() {
  return (
    <div className="mx-auto max-w-[900px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumbs([{ name: "Compare", path: "/compare/" }])] }} />
      <h1 className="text-h1 font-semibold">Compare</h1>
      <p className="mt-3 max-w-[62ch] text-lead text-ink-2">The sets people already know, next to this one — facts either side would sign, and the case for each.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {COMPARISONS.map((c) => (
          <li key={c.slug}>
            <Link href={`/compare/${c.slug}/`} className="block rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-accent">
              <p className="text-[15px] font-semibold">IconMind vs {c.name}</p>
              <p className="mt-1.5 text-meta leading-relaxed text-ink-2">{c.lead}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-meta text-muted">Counts for other sets are the ones their sites publish and are approximate; tell us if one is out of date.</p>
    </div>
  );
}
