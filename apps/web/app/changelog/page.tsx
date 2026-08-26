import type { Metadata } from "next";
import Link from "next/link";
import { releases } from "@/lib/changelog";
import { allCategories, iconCount, version } from "@/lib/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/changelog/" },
  title: "Changelog",
  description: "Every IconMind release and the icons it added.",
};

export default function ChangelogPage() {
  const list = releases();

  return (
    <div className="mx-auto max-w-[70rem] px-5 pt-16 pb-24 sm:px-7">
      <header className="max-w-[62ch]">
        <Badge variant="accent" className="mb-4">v{version}</Badge>
        <h1 className="text-h1 font-semibold">Changelog</h1>
        <p className="mt-3 text-lead text-ink-2">
          Written by Changesets at release time, so it says what actually shipped rather
          than what someone remembered to write down.
        </p>
      </header>

      {list.length === 0 ? (
        <>
          <Card className="mt-10 rounded-2xl px-7 py-10 shadow-panel">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-[56ch]">
                <h2 className="text-h2 font-semibold">No releases yet</h2>
                <p className="mt-3 leading-relaxed text-ink-2">
                  {iconCount.toLocaleString("en-GB")} icons are drawn and the release
                  pipeline is wired; the changelog for the next release has not been cut
                  yet. Releases are automatic — every merged change steps the version and
                  publishes all the packages together.
                </p>
              </div>
              <dl className="grid shrink-0 gap-4">
                <Fact k="Working version" v={version} />
                <Fact k="Icons drawn" v={iconCount.toLocaleString("en-GB")} />
                <Fact k="Categories" v={String(allCategories.length)} />
              </dl>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5 border-t border-line-2 pt-6">
              <Button asChild>
                <Link href="/icons/">Browse what is drawn</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/docs/installation/">Install a package</Link>
              </Button>
            </div>
          </Card>

          <section className="mt-12">
            <h2 className="label mb-4">What the set contains</h2>
            {/* Counts by domain rather than 756 anonymous glyphs. The wall of icons that
                used to be here was a second copy of the landing page's, four screens tall,
                and it answered a question nobody had asked on this page. */}
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line-2 sm:grid-cols-2 lg:grid-cols-3">
              {allCategories
                .slice()
                .sort((a, b) => b.count - a.count)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/categories/${c.slug}/`}
                      className="flex items-baseline justify-between gap-3 bg-panel px-5 py-4 transition-colors hover:bg-sunk"
                    >
                      <span className="text-ui font-medium">{c.name}</span>
                      <span className="font-mono text-mono tabular-nums text-muted">{c.count}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </>
      ) : (
        <ol className="mt-12 grid gap-4">
          {list.map((r) => (
            <li key={r.version}>
              <Card className="rounded-2xl px-6 py-6">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-mono text-h2 font-semibold">{r.version}</h2>
                </div>
                <div className="mt-4 grid gap-2 leading-relaxed text-ink-2">
                  {r.body.map((line, k) => (
                    <p key={k}>{line.replace(/^[-*]\s*/, "")}</p>
                  ))}
                </div>
              </Card>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="label">{k}</dt>
      <dd className="font-mono text-[13px] tabular-nums">{v}</dd>
    </div>
  );
}
