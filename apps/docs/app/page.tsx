import Link from "next/link";
import { allCategories, allIcons, iconCount } from "@/lib/icons";
import { readSvg, svgBody } from "@/lib/svg";
import { IconSvg } from "@/components/icon-svg";
import { CopyButton } from "@/components/copy-button";

const BLURB: Record<string, string> = {
  ai: "Models, prompts, tokens, embeddings, evaluation, safety",
  agents: "Planning, memory, tool use, lifecycle, multi-agent",
  mcp: "Servers, clients, resources, tools, transports",
  rag: "Chunking, retrieval, reranking, vectors, grounding",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <h2 className="text-eyebrow font-semibold uppercase text-ink-faint">{children}</h2>;
}

export default function Home() {
  const icons = allIcons.map((i) => ({ ...i, body: svgBody(readSvg(i.category, i.slug)) }));

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32">
        <span className="inline-flex items-center gap-2 rounded-pill bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          Early development · {iconCount} icons
        </span>
        <h1 className="mt-7 max-w-[16ch] text-hero font-semibold text-balance">
          Icons for AI-era software
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          LLMs, agents, MCP, RAG, and everything around them. One grid, one stroke weight,
          one licence that never changes.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/icons/"
            className="chamfer-sm bg-ink px-6 py-3 text-sm font-medium text-canvas transition-opacity hover:opacity-88">
            Browse icons
          </Link>
          <Link href="/docs/"
            className="chamfer-sm hairline px-6 py-3 text-sm font-medium transition-colors hover:bg-raised">
            Get started
          </Link>
        </div>
      </section>

      {/* Icon wall */}
      <section className="chamfer hairline bg-surface px-8 py-12">
        <ul className="grid grid-cols-5 gap-x-4 gap-y-10 sm:grid-cols-8 lg:grid-cols-12">
          {icons.map((i) => (
            <li key={i.slug} className="flex justify-center">
              <Link href={`/icons/${i.slug}/`} title={i.name}
                className="text-ink-soft transition-colors hover:text-accent">
                <IconSvg body={i.body} size={26} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Positioning */}
      <section className="grid gap-10 py-24 md:grid-cols-[14rem_1fr]">
        <Eyebrow>Why this exists</Eyebrow>
        <div className="max-w-[58ch] space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
          <p>
            Build a UI for an agent or a RAG pipeline and you run out of icons almost
            immediately. There is no <em className="not-italic text-ink">context window</em>,
            no <em className="not-italic text-ink">reranker</em>, no{" "}
            <em className="not-italic text-ink">MCP resource</em> in any mainstream set — so
            people reach for a generic robot, a generic database, and the meaning is lost.
          </p>
          <p>
            IconMind is built for that vocabulary and nothing else. Containers cut their
            corners at 45° instead of rounding them, which is how you know a screen is using
            it from across the room.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-line py-20">
        <Eyebrow>Categories</Eyebrow>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
          {allCategories.map((c) => (
            <li key={c.slug}>
              <Link href={`/categories/${c.slug}/`}
                className="flex h-full flex-col justify-between gap-6 bg-canvas p-7 transition-colors hover:bg-raised">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[1.0625rem] font-medium">{c.name}</span>
                    <span className="text-sm tabular-nums text-ink-faint">{c.count}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{BLURB[c.slug]}</p>
                </div>
                <div className="flex gap-4 text-ink-faint">
                  {icons.filter((i) => i.category === c.slug).slice(0, 6)
                    .map((i) => <IconSvg key={i.slug} body={i.body} size={20} />)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Install */}
      <section className="border-t border-line py-20">
        <Eyebrow>Install</Eyebrow>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="chamfer hairline flex items-center justify-between gap-4 bg-surface px-6 py-5">
            <code className="font-mono text-sm">npm i @iconmind/react</code>
            <CopyButton value="npm i @iconmind/react" label="Copy" />
          </div>
          <pre className="chamfer hairline overflow-x-auto bg-surface px-6 py-5 font-mono text-sm leading-relaxed text-ink-soft">
{`import { Agent, Prompt } from "@iconmind/react";

<Agent />
<Prompt size={32} />`}
          </pre>
        </div>
        <p className="mt-5 text-sm text-ink-faint">
          Not on npm yet — the package ships with the first release. Every icon is a plain
          SVG too, so no framework is required.
        </p>
      </section>
    </>
  );
}
