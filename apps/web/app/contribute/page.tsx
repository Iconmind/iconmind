import type { Metadata } from "next";
import Link from "next/link";
import { allCategories, allIcons } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  alternates: { canonical: "/contribute/" },
  title: "Contribute an icon",
  description:
    "How an icon gets into IconMind: the checks that run before a human looks at it, and where to open the pull request.",
};

const REPO = "https://github.com/iconmind/iconmind";

/*
 * The deck draws this screen as an upload form with a live review panel. The form is
 * drawn here as what it actually is — a description of the checks and a link to the
 * place the work happens — because there is no service behind this static site to
 * upload to, and a drop zone that quietly does nothing is worse than no drop zone.
 */
const CHECKS: Array<{ rule: string; says: string; level: "pass" | "warn" }> = [
  { rule: "structure/viewbox-exact", says: "24 × 24 viewBox, no width or height", level: "pass" },
  { rule: "attributes/fill-none", says: "Stroke only — duotone's tint is derived, never drawn", level: "pass" },
  { rule: "geometry/grid-snap", says: "Every anchor on the 0.5 grid", level: "pass" },
  { rule: "geometry/live-area", says: "Anchors inside 2..22 — ink bleeds to 1..23 and no further", level: "pass" },
  { rule: "geometry/size-band", says: "The longer side spans 18–22 units, so no icon reads small", level: "pass" },
  { rule: "geometry/min-stroke-gap", says: "Strokes at least 2.5 units apart — 3 at bold, or they fuse", level: "pass" },
  { rule: "geometry/stub-segment", says: "No run under 2.5 — a dot is a circle, not a short stroke", level: "pass" },
  { rule: "geometry/angle-constraint", says: "Segments on multiples of 45°", level: "warn" },
  { rule: "geometry/optical-centre", says: "The mass sits within 2 units of the canvas centre", level: "warn" },
  { rule: "duplicate/structural", says: "Nothing already in the set is the same composition", level: "warn" },
];

/* The real declaration of security/phishing, verbatim from scripts/draw/icons. */
const SAMPLE = `{
  slug: "phishing", category: "security", subcategory: "threat",
  name: "Phishing", description: "The hook, waiting for a bite",
  tags: ["lure", "scam", "bait"], family: "figure",
  shapes: [
    disc(15, 4, 2), col(15, 6, 15.5),
    arc(10.5, 15.5, 4.5, 0, 180), col(6, 11, 15.5),
  ],
}`;

export default function ContributePage() {
  const sample = allIcons.find((i) => i.slug === "phishing") ?? allIcons[0]!;
  const body = svgBody(readSvg(sample.category, sample.slug));
  const blocking = CHECKS.filter((c) => c.level === "pass").length;

  return (
    <div className="mx-auto max-w-[84rem] px-5 pt-16 pb-24 sm:px-7">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[54ch]">
          <h2 className="label">Contribute</h2>
          <h1 className="mt-3 text-h1 font-semibold">Submit an icon</h1>
          <p className="mt-3 text-lead leading-relaxed text-ink-2">
            All 1,008 icons are written, not drawn: declare the shapes in TypeScript and
            the build compiles all six cells. The constructors throw on illegal geometry
            and every rule below runs before a human ever looks at it. Everything merged
            stays MIT.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/docs/contributing/">Guidelines</Link>
          </Button>
          <Button asChild>
            <a href={`${REPO}/compare`}>Open pull request</a>
          </Button>
        </div>
      </header>

      {/* ── What you write, and what it comes out as ───────────────────────── */}
      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line-2 px-5 py-3">
            <p className="label">One declaration per concept</p>
            <a
              href={`${REPO}/tree/main/scripts/draw/icons`}
              className="font-mono text-mono text-muted transition-colors hover:text-accent"
            >
              see the folder →
            </a>
          </div>
          <pre className="m-0 overflow-x-auto bg-sunk px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-ink-2">
            {SAMPLE}
          </pre>
          <p className="border-t border-line-2 px-5 py-3.5 text-meta leading-[1.55] text-muted">
            A slug, a description, tags, and a <span className="font-mono">shapes</span> array
            built from a small vocabulary — <span className="font-mono">disc</span>,{" "}
            <span className="font-mono">col</span>, <span className="font-mono">arc</span>,{" "}
            <span className="font-mono">poly</span>, <span className="font-mono">frame</span>,
            and the shared bodies. Nothing else is hand-written: the six SVG cells and the
            components for all ten packages are generated from this one declaration.
          </p>
        </Card>

        <div className="grid content-start gap-4">
          <Card className="overflow-hidden">
            <p className="label border-b border-line-2 px-5 py-3">What comes out</p>
            <div className="grid grid-cols-2 gap-px bg-line-2">
              {[24, 16].map((s) => (
                <div key={s} className="relative grid place-items-center bg-panel py-8">
                  <div className="dotted absolute inset-0" aria-hidden="true" />
                  <IconSvg body={body} size={s} className="relative text-ink" />
                  <span className="relative mt-3 font-mono text-[10.5px] text-muted">{s} px</span>
                </div>
              ))}
            </div>
            <p className="border-t border-line-2 px-5 py-3.5 text-meta leading-[1.55] text-muted">
              Both sizes from one declaration. The 16px cell is where a rule that was waived
              usually shows up.
            </p>
          </Card>

          <Card className="border-accent bg-accent-soft px-5 py-4">
            <p className="text-meta leading-[1.6] text-accent">
              A waivable rule can be accepted in the icon&rsquo;s own metadata with a written
              reason. A blocking rule cannot — it has to be redrawn.
            </p>
          </Card>
        </div>
      </div>

      {/* ── What the checks say ────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="label">Automated review</h2>
          <span className="font-mono text-mono text-muted">
            {blocking} blocking · {CHECKS.length - blocking} waivable
          </span>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line-2 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((c) => (
            <li key={c.rule} className="flex flex-col gap-2 bg-panel px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-mono text-ink">{c.rule}</p>
                <span
                  className={`shrink-0 rounded-sm px-2 py-0.5 font-mono text-label tracking-[0.1em] uppercase ${
                    c.level === "pass" ? "bg-ok/12 text-ok" : "bg-warn/12 text-warn"
                  }`}
                >
                  {c.level === "pass" ? "Blocks" : "Waivable"}
                </span>
              </div>
              <p className="text-meta leading-[1.5] text-muted">{c.says}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Where it lands ─────────────────────────────────────────────────── */}
      <section className="mt-12">
        <h2 className="label mb-4">Where an icon lands</h2>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
          {allCategories.map((c) => (
            <li key={c.slug} className="bg-panel p-5">
              <div className="flex items-baseline justify-between gap-3">
                <Link href={`/categories/${c.slug}/`} className="font-medium transition-colors hover:text-accent">
                  {c.name}
                </Link>
                <span className="font-mono text-mono tabular-nums text-muted">{c.count}</span>
              </div>
              <p className="mt-2 font-mono text-meta leading-relaxed text-muted">
                {c.subcategories.map((s) => s.slug).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
