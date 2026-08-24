import type { Metadata } from "next";
import { CopyButton } from "@/components/copy-button";
import { iconCount } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Docs",
  description: "Install and use IconMind in React or plain HTML.",
};

function Code({ children }: { children: string }) {
  return (
    <div className="relative mt-4">
      <pre className="chamfer hairline overflow-x-auto bg-surface px-6 py-5 font-mono text-sm leading-relaxed">{children}</pre>
      <div className="absolute right-3 top-3"><CopyButton value={children} /></div>
    </div>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-16 text-title font-semibold">{children}</h2>;
}

const PROPS = [
  ["size", "24", "Width and height, in px or any CSS length"],
  ["color", "currentColor", "Stroke colour"],
  ["strokeWidth", "2", "Stroke thickness"],
  ["absoluteStrokeWidth", "false", "Keeps the stroke looking the same weight as size changes"],
];

export default function DocsPage() {
  return (
    <article className="max-w-[46rem] pb-24 pt-16">
      <h1 className="text-hero font-semibold">Docs</h1>

      <div className="chamfer mt-8 bg-accent-soft px-6 py-5 text-sm leading-relaxed">
        <strong className="font-medium">Early development.</strong> Nothing is on npm yet.
        The design system is settled and {iconCount} icons are done; the first release
        targets 100.
      </div>

      <H2>Install</H2>
      <Code>{`npm i @iconmind/react`}</Code>

      <H2>React</H2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Every icon is a named export. Import only what you use — three icons cost about
        600 bytes gzipped, measured by a test that fails if it grows.
      </p>
      <Code>{`import { Agent, Prompt, VectorDatabase } from "@iconmind/react";

<Agent />
<Prompt size={32} />
<VectorDatabase color="#5b4bde" strokeWidth={1.5} />
<Agent aria-label="Agent" />`}</Code>

      <h3 className="mt-10 font-medium">Props</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              {["Prop", "Default", "What it does"].map((h) => (
                <th key={h} className="pb-3 pr-6 text-eyebrow font-semibold uppercase text-ink-faint">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROPS.map(([p, d, w]) => (
              <tr key={p} className="border-b border-line-soft">
                <td className="py-3 pr-6 font-mono text-xs">{p}</td>
                <td className="py-3 pr-6 font-mono text-xs text-ink-faint">{d}</td>
                <td className="py-3 text-ink-soft">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Accessibility</H2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Icons are decorative by default — <code className="font-mono text-[0.8125rem] text-ink">aria-hidden</code> and{" "}
        <code className="font-mono text-[0.8125rem] text-ink">focusable=&quot;false&quot;</code>. Give one an{" "}
        <code className="font-mono text-[0.8125rem] text-ink">aria-label</code> and it becomes{" "}
        <code className="font-mono text-[0.8125rem] text-ink">role=&quot;img&quot;</code> instead. You opt into meaning;
        you never opt out of noise.
      </p>

      <H2>Server components</H2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        No hooks, no state, no browser APIs. Icons render on the server and ship{" "}
        <strong className="font-medium text-ink">zero bytes of client JavaScript</strong> in a
        Next.js App Router page.
      </p>

      <H2>Plain SVG</H2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        No framework needed. Every icon page has a copy button for the raw file.
      </p>
      <Code>{`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- paste the paths -->
</svg>`}</Code>

      <H2>License</H2>
      <p className="mt-4 leading-relaxed text-ink-soft">
        MIT, code and icons alike. Free for commercial use, no attribution required, no
        conditions.
      </p>
    </article>
  );
}
