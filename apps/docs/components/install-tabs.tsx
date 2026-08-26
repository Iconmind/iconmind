"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/*
 * Only what is published.
 *
 * Vue is generated from the same intermediate representation as React and is documented
 * as phase 2 — but it is not on npm, and a tab offering `npm i @iconmind/vue` is an
 * install command that fails. The docs say "not yet"; this said "here you go".
 */
const WAYS = [
  {
    id: "react",
    label: "React",
    badge: "npm",
    install: "npm i @iconmind/react",
    code: `import { Agent, VectorDatabase } from "@iconmind/react";

<Agent />
<Agent variant="duotone" weight="bold" />
<VectorDatabase size={32} color="#C2410C" />

// Each weight is its own drawing, not a stroke-width — and \`variant\`
// is narrowed per icon, so asking for a drawing an icon does not have
// is a compile error rather than a silent fallback.`,
    note: "Tree-shakeable: you ship the icons you import and nothing else. Same API in Vue, Svelte, Solid, Preact, React Native, Astro and Laravel — pick your target on any icon page.",
  },
  {
    id: "svg",
    label: "SVG",
    badge: "file",
    install: "curl -O https://iconmind.dev/icons/agent.svg",
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16.23 2.94a10 10 0 1 1 -8.46 0"/>
  <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0 -8 0"/>
</svg>`,
    note: "Every cell is a real file on disk. Copy one, or download the lot as a zip.",
  },
  {
    id: "sprite",
    label: "Sprite",
    badge: "1 request",
    install: "curl -O https://iconmind.dev/sprite.svg",
    code: `<svg width="24" height="24">
  <use href="/sprite.svg#im-agent" />
</svg>`,
    note: "One request for the whole set, cached once. Best when a page shows many icons.",
  },
  {
    id: "mcp",
    label: "MCP",
    badge: "for agents",
    install: "npx @iconmind/mcp",
    code: `{
  "mcpServers": {
    "iconmind": { "command": "npx", "args": ["-y", "@iconmind/mcp"] }
  }
}`,
    note: "Lets an assistant search the set and hand back paste-ready code, without guessing names.",
  },
] as const;

/**
 * Four ways in, and the install line for each.
 *
 * The copy button is on the install command rather than the sample, because that is the
 * line somebody actually wants in a terminal — the sample is there to show what the import
 * looks like, and people read that rather than paste it.
 */
export function InstallTabs() {
  const [id, setId] = useState<(typeof WAYS)[number]["id"]>("react");

  const copy = (text: string) => async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Install command copied", { description: text });
    } catch {
      toast.error("Clipboard blocked", { description: "The command is on screen — select and copy." });
    }
  };

  return (
    <Tabs value={id} onValueChange={(v) => setId(v as typeof id)} className="gap-0">
      <div className="overflow-hidden rounded-2xl border border-line bg-panel">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-2 px-3 py-2.5">
          <TabsList className="bg-transparent p-0">
            {WAYS.map((w) => (
              <TabsTrigger key={w.id} value={w.id} className="h-8 data-[state=active]:bg-sunk">
                {w.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <span className="hidden pr-1 font-mono text-mono text-muted sm:inline">
            {WAYS.find((w) => w.id === id)?.badge}
          </span>
        </div>

        {WAYS.map((way) => (
          <TabsContent key={way.id} value={way.id} className="m-0">
            <div className="grid gap-px bg-line-2 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
              <div className="bg-panel px-5 py-5">
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="label">Install</p>
                  <Badge variant="muted">{way.badge}</Badge>
                </div>
                <button
                  onClick={copy(way.install)}
                  className="group flex w-full items-center justify-between gap-4 rounded-lg border border-line bg-sunk px-3.5 py-3 text-left font-mono text-[13px] transition-colors hover:border-accent"
                >
                  <span className="truncate">
                    <span className="text-muted select-none">$ </span>
                    {way.install}
                  </span>
                  <svg
                    className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    <rect x="9" y="9" width="11.5" height="11.5" rx="2.2" />
                    <path d="M5.5 15H4.6a1.1 1.1 0 0 1-1.1-1.1V4.6a1.1 1.1 0 0 1 1.1-1.1h9.3a1.1 1.1 0 0 1 1.1 1.1v.9" />
                  </svg>
                </button>
                <p className="mt-3.5 text-body leading-relaxed text-ink-2">{way.note}</p>
                <Button asChild variant="link" size="sm" className="mt-2 h-auto px-0">
                  <a href={`/docs/${way.id === "sprite" ? "svg" : way.id}/`}>
                    Read the {way.label} docs →
                  </a>
                </Button>
              </div>

              <pre className="m-0 overflow-x-auto bg-panel px-5 py-5 font-mono text-[12.5px] leading-[1.7] text-ink-2">
                {way.code}
              </pre>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
