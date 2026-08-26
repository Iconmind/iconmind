import type { Metadata } from "next";
import Link from "next/link";
import roadmap from "@/data/roadmap.json";
import { allCategories, allIcons, iconCount } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/roadmap/" },
  title: "Roadmap",
  description: "What IconMind is aiming at, and how far along it actually is.",
};

const shippedIn = (slug: string) => allIcons.filter((i) => i.category === slug).length;

function Bar({ done, total }: { done: number; total: number }) {
  const pct = Math.min(100, Math.round((done / total) * 100));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-pill bg-sunk" role="img" aria-label={`${pct}% of ${total}`}>
      <div className="h-full rounded-pill bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function RoadmapPage() {
  const today = new Date().toISOString().slice(0, 10);
  const current = roadmap.phases.find((p) => today >= p.start && today <= p.end) ?? roadmap.phases[0]!;

  return (
    <div className="mx-auto max-w-[70rem] px-5 pt-16 pb-24 sm:px-7">
      <h1 className="text-h1 font-semibold">Roadmap</h1>
      <p className="mt-3 max-w-[56ch] text-lead text-ink-2">
        Rendered from the same data the icons are drawn against, so it cannot go stale.
        Shipped counts come from the published set; targets come from the catalog of{" "}
        {roadmap.totalConcepts} mapped concepts.
      </p>

      <section className="mt-12">
        <h2 className="label mb-4">Phases</h2>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line-2 sm:grid-cols-2">
          {roadmap.phases.map((p) => {
            const done = p.n === current.n ? iconCount : p.target <= iconCount ? p.target : 0;
            return (
              <li key={p.n} className="bg-panel p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="flex items-center gap-2 text-ui font-semibold">
                    Phase {p.n} — {p.name}
                    {p.n === current.n && <Badge variant="accent">now</Badge>}
                  </h3>
                  <span className="shrink-0 font-mono text-mono tabular-nums text-muted">
                    {done}/{p.target}
                  </span>
                </div>
                <p className="mt-1.5 text-meta leading-[1.5] text-muted">{p.goal}</p>
                <div className="mt-5"><Bar done={done} total={p.target} /></div>
                <p className="mt-3 font-mono text-[10.5px] text-muted">
                  W{p.weeks[0]}–{p.weeks[1]} · {p.start} → {p.end}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="label mb-3">By domain</h2>
        <p className="max-w-[56ch] text-body leading-relaxed text-ink-2">
          The set is drawn. These are the shipped counts, straight from the icon data —
          what changes from here is packages, not pictures.
        </p>
        <ul className="mt-5 overflow-hidden rounded-2xl border border-line bg-panel">
          {allCategories.map((d) => {
            const done = shippedIn(d.slug);
            return (
              <li
                key={d.slug}
                className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 border-b border-line-2 px-5 py-3.5 last:border-0 sm:grid-cols-[11rem_1fr_5rem]"
              >
                <Link href={`/categories/${d.slug}/`} className="text-ui font-medium transition-colors hover:text-accent">
                  {d.name}
                </Link>
                <div className="order-3 sm:order-none"><Bar done={done} total={done} /></div>
                <span className="text-right font-mono text-mono tabular-nums text-muted">
                  {done}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <Card className="mt-14 rounded-2xl border-accent bg-accent-soft px-7 py-6">
        <h2 className="text-ui font-semibold">What decides the order</h2>
        <p className="mt-2 max-w-[58ch] text-body leading-relaxed text-ink-2">
          Requests outrank everything else. A search on this site that returns nothing is
          logged, and the queries that keep coming back become the next batch — real
          demand beats a table someone wrote on day one.
        </p>
        <Button asChild className="mt-5">
          <a href="https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml">
            Request an icon
          </a>
        </Button>
      </Card>
    </div>
  );
}
