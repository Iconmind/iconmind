import type { Metadata } from "next";
import Link from "next/link";
import roadmap from "@/data/roadmap.json";
import { allIcons, iconCount } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What IconMind is aiming at, and how far along it actually is.",
};

const shippedIn = (slug: string) => allIcons.filter((i) => i.category === slug).length;

function Bar({ done, total }: { done: number; total: number }) {
  const pct = Math.min(100, Math.round((done / total) * 100));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-pill bg-line">
      <div className="h-full rounded-pill bg-accent" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function RoadmapPage() {
  const today = new Date().toISOString().slice(0, 10);
  const current = roadmap.phases.find((p) => today >= p.start && today <= p.end) ?? roadmap.phases[0]!;

  return (
    <div className="pb-24 pt-16">
      <h1 className="text-hero font-semibold">Roadmap</h1>
      <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-ink-soft">
        Rendered from the same data the icons are drawn against, so it cannot go stale.
        Shipped counts come from the published set; targets come from the catalog of{" "}
        {roadmap.totalConcepts} mapped concepts.
      </p>

      <section className="mt-14">
        <h2 className="text-eyebrow font-semibold uppercase text-ink-faint">Phases</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
          {roadmap.phases.map((p) => {
            const done = p.n === current.n ? iconCount : p.target <= iconCount ? p.target : 0;
            return (
              <li key={p.n} className="bg-canvas p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">
                    Phase {p.n} — {p.name}
                    {p.n === current.n && (
                      <span className="ml-2 rounded-pill bg-accent-soft px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
                        now
                      </span>
                    )}
                  </h3>
                  <span className="shrink-0 text-sm tabular-nums text-ink-faint">
                    {done}/{p.target}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-soft">{p.goal}</p>
                <div className="mt-5"><Bar done={done} total={p.target} /></div>
                <p className="mt-3 font-mono text-xs text-ink-faint">
                  W{p.weeks[0]}–{p.weeks[1]} · {p.start} → {p.end}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-eyebrow font-semibold uppercase text-ink-faint">By domain</h2>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-ink-soft">
          Targets are cumulative. The four AI-native domains carry 44% of the first year
          on purpose — that is where nothing else covers the vocabulary.
        </p>
        <ul className="mt-6 divide-y divide-line-soft">
          {roadmap.domains.map((d) => {
            const done = shippedIn(d.slug);
            const target = d.targets[2]!;
            return (
              <li key={d.slug} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-4 sm:grid-cols-[11rem_1fr_5rem]">
                <Link href={`/categories/${d.slug}/`} className="font-medium transition-colors hover:text-accent">
                  {d.name}
                </Link>
                <div className="order-3 sm:order-none"><Bar done={done} total={target} /></div>
                <span className="text-right font-mono text-xs tabular-nums text-ink-faint">
                  {done}/{target}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-16 chamfer bg-accent-soft px-7 py-6">
        <h2 className="font-medium">What decides the order</h2>
        <p className="mt-2 max-w-[58ch] text-sm leading-relaxed">
          Requests outrank everything else. A search on this site that returns nothing is
          logged, and the queries that keep coming back become the next batch — real
          demand beats a table someone wrote on day one.
        </p>
        <a className="mt-5 inline-block chamfer-sm bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-88"
          href="https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml">
          Request an icon
        </a>
      </section>
    </div>
  );
}
