import type { Metadata } from "next";
import { releases } from "@/lib/changelog";
import { allIcons, iconCount, version } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every IconMind release and the icons it added.",
};

export default function ChangelogPage() {
  const list = releases();

  return (
    <div className="pb-24 pt-16">
      <h1 className="text-hero font-semibold">Changelog</h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
        Written by Changesets at release time, so it says what actually shipped rather
        than what someone remembered to write down.
      </p>

      {list.length === 0 ? (
        <>
          <div className="chamfer hairline mt-12 bg-surface px-7 py-12">
            <h2 className="text-title font-semibold">No releases yet</h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft">
              {iconCount} icons are drawn and the release pipeline is wired, but nothing has
              been published to npm. The first release is <code className="font-mono text-sm text-ink">v0.1.0</code>,
              and it lands quietly — the launch comes later, once there is enough of the set
              to be worth someone&rsquo;s time.
            </p>
            <p className="mt-4 text-sm text-ink-faint">
              Current working version: <code className="font-mono">{version}</code>
            </p>
          </div>

          <section className="mt-14">
            <h2 className="text-eyebrow font-semibold uppercase text-ink-faint">
              What v0.1.0 will contain
            </h2>
            <ul className="mt-6 grid grid-cols-6 gap-x-4 gap-y-8 sm:grid-cols-10 lg:grid-cols-13">
              {allIcons.map((i) => (
                <li key={i.slug} className="flex justify-center text-ink-soft" title={i.name}>
                  <IconSvg body={svgBody(readSvg(i.category, i.slug))} size={22} />
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <ol className="mt-12 space-y-12">
          {list.map((r) => (
            <li key={r.version} className="border-t border-line pt-8">
              <h2 className="font-mono text-title font-semibold">{r.version}</h2>
              <div className="mt-4 space-y-2 leading-relaxed text-ink-soft">
                {r.body.map((line, k) => <p key={k}>{line.replace(/^[-*]\s*/, "")}</p>)}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
