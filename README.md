<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/assets/preview-dark.png">
    <img src=".github/assets/preview-light.png" alt="IconMind icons" width="100%">
  </picture>
</p>

<h1 align="center">IconMind</h1>

<p align="center">
  Open-source icons for AI-era software —<br>
  LLMs, agents, MCP, RAG, and everything around them.
</p>

<p align="center">
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue"></a>
  <img alt="icons" src="https://img.shields.io/badge/icons-53-black">
  <img alt="status" src="https://img.shields.io/badge/status-early%20development-orange">
</p>

---

> **Status: early development.** Nothing is published to npm yet. The design system is
> settled and the first 20 icons — the anchor set that defines the visual language —
> are done. Target for the first release is 100 icons.
> Progress: [`docs/masterplan/18-timeline.md`](docs/masterplan/18-timeline.md).

## Why this exists

Build a UI for an agent, a RAG pipeline, or an MCP server and you run out of icons
almost immediately. There is no `context window`, no `reranker`, no `tool calling`, no
`MCP resource` in any mainstream icon set — so people reach for a generic robot, a
generic database, a generic lightning bolt, and the meaning is lost.

Lucide, Heroicons, and Phosphor are excellent, and 500 domain-specific AI icons would
be scope creep for any of them. **IconMind is meant to sit next to them, not replace
them.** The 24px grid and 2px stroke match Lucide deliberately, so the two can appear
in the same interface without clashing.

## Install

```bash
# not published yet — this is what it will look like
npm i @iconmind/react
```

```tsx
import { Agent, ContextWindow, VectorDatabase } from "@iconmind/react";

<Agent />
<ContextWindow size={32} />
<VectorDatabase strokeWidth={1.5} className="text-violet-500" />
```

Every icon ships as a plain SVG too, so no framework is required.

## Categories

Twelve domains, 621 concepts mapped out, 1000 icons planned for the first year.

| | | |
|---|---|---|
| **AI & LLM** — models, prompts, tokens, embeddings, evaluation, safety | **Agents** — planning, memory, tool use, multi-agent | **MCP** — servers, clients, resources, tools, transports |
| **RAG & Search** — chunking, retrieval, reranking, vectors | **Data Engineering** — pipelines, warehouses, streaming | **DevOps** — CI/CD, containers, observability |
| **Cloud** — compute, storage, network, edge | **Security** — auth, secrets, policy, AI security | **Automation** — workflows, triggers, conditions |
| **Analytics** — charts, metrics, LLM observability | **Developer Tools** — code, terminal, VCS, API, testing | **Interface** — arrows, actions, states, layout |

Full catalog: [`docs/masterplan/02b-icon-catalog.md`](docs/masterplan/02b-icon-catalog.md).

## Design system

Every icon obeys the same rules, and a validator enforces the ones a machine can check:

```
24 × 24 canvas   ·   anchors inside 3..21   ·   2px stroke, round caps
0.5px grid       ·   angles at 0/30/45/60/90°   ·   max 2 stroke crossings
```

One rule does most of the work: **the outer shape encodes what kind of thing it is.**

| Shape | Meaning | Example |
|---|---|---|
| Circle | An actor — has state, acts on its own | `agent` |
| Hexagon | A component — gets invoked | `model`, `inference` |
| Rounded square | A container or system | `mcp-server`, `memory` |
| Cylinder | Stored data | `vector-database` |
| Puzzle piece | A capability you plug in | `mcp-tool` |
| Bracket pair | A scope or boundary | `context-window` |

So you can usually guess the next icon in a family before you see it.
Details: [`docs/masterplan/03-design-system.md`](docs/masterplan/03-design-system.md).

## Contributing

Requesting an icon takes about a minute and needs no design skills — and requests are
the most useful thing we get, because they are real demand instead of our guesses.

[**Request an icon →**](https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml)
&nbsp;·&nbsp;
[**Contributing guide →**](CONTRIBUTING.md)

```bash
pnpm install
pnpm icons:new agents agent-memory   # scaffold
pnpm icons:validate                  # 30+ rules, under 5 seconds
```

## License

[MIT](LICENSE) — code and icons alike. Free for commercial use, no attribution
required, no conditions. Forever.
