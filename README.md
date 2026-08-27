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
  <a href="https://iconmind.vercel.app"><b>Website</b></a> ·
  <a href="https://iconmind.vercel.app/icons/"><b>Browse all icons</b></a> ·
  <a href="https://iconmind.vercel.app/docs/installation/"><b>Docs</b></a> ·
  <a href="https://iconmind.vercel.app/docs/mcp/"><b>MCP server</b></a>
</p>

<p align="center">
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue"></a>
  <img alt="icons" src="https://img.shields.io/badge/icons-1041-black">
  <img alt="cells" src="https://img.shields.io/badge/SVGs-6246-black">
  <a href="https://www.npmjs.com/package/@iconmind/react"><img alt="npm" src="https://img.shields.io/npm/v/%40iconmind%2Freact?label=npm&color=blue"></a>
</p>

---

> **Live on npm.** All 1,041 icons — six cells each (outline & duotone ×
> thin / regular / bold), every geometric rule machine-enforced. What comes next is
> more targets, not more pictures.

## Why this exists

Build a UI for an agent, a RAG pipeline, or an MCP server and you run out of icons
almost immediately. There is no `context-window`, no `reranker`, no `tool-calling`, no
`mcp-resource` in any mainstream set — so interfaces reach for a generic robot, a generic
database, a generic lightning bolt, and the meaning is lost.

Lucide, Heroicons and Phosphor are excellent, and a thousand domain-specific AI icons
would be scope creep for any of them. **IconMind sits next to them, not instead of
them** — the 24px grid and 2px regular stroke match Lucide on purpose, so the two can
share an interface without clashing.

## The set

**1,041 icons · 12 domains · 6 cells each.** Outline and duotone variants, each at
three weights (1.5 / 2 / 2.5). Duotone tints every closed body at 20% — and icons made
only of marks (a check, an arrow) tint with their own halo, so the whole grid answers
the variant switch.

| | | |
|---|---|---|
| **AI & LLM** — models, prompts, tokens, embeddings, evaluation, safety | **Agents** — planning, memory, tool use, multi-agent | **MCP** — servers, clients, resources, tools, transports |
| **RAG & Search** — chunking, retrieval, ranking, vectors, grounding | **Data Engineering** — pipelines, warehouses, streaming, quality | **DevOps** — CI/CD, containers, observability, incidents |
| **Cloud** — compute, storage, network, edge, cost | **Security** — auth, secrets, policy, AI security | **Automation** — workflows, triggers, conditions, human-in-the-loop |
| **Analytics** — charts, metrics, experiments, LLM observability | **Developer Tools** — code, terminal, VCS, API, testing | **Interface** — arrows, actions, states, layout, media |

## Install

```bash
npm i @iconmind/react
```

```tsx
import { Agent, ContextWindow, VectorDatabase } from "@iconmind/react";

<Agent />
<ContextWindow size={32} />
<VectorDatabase strokeWidth={1.5} className="text-violet-500" />
```

The same API ships for every major target, all generated from one source so they can
never drift:

| Stack | Install |
|---|---|
| [React](https://iconmind.vercel.app/docs/react/) | `npm i @iconmind/react` |
| [Vue 3](https://iconmind.vercel.app/docs/vue/) | `npm i @iconmind/vue` |
| [Svelte](https://iconmind.vercel.app/docs/svelte/) | `npm i @iconmind/svelte` |
| [Solid](https://iconmind.vercel.app/docs/solid/) | `npm i @iconmind/solid` |
| [Preact](https://iconmind.vercel.app/docs/preact/) | `npm i @iconmind/preact` |
| [React Native](https://iconmind.vercel.app/docs/react-native/) | `npm i @iconmind/react-native react-native-svg` |
| [Astro](https://iconmind.vercel.app/docs/astro/) | `npm i @iconmind/astro` |
| [Flutter](https://iconmind.vercel.app/docs/flutter/) | `flutter pub add iconmind_flutter` *(first pub.dev release pending)* |
| [Laravel Blade](https://iconmind.vercel.app/docs/laravel/) | `composer require iconmind/blade-iconmind` |
| [Plain SVG / sprite](https://iconmind.vercel.app/docs/svg/) | `npm i @iconmind/icons` |

Same component names, same `size` / `color` / `variant` / `weight` props, same defaults
in every one of them — the components are generated from one source, so they cannot
drift. In Flutter that means real strokes on a `CustomPaint`, not an icon font, so
duotone and the three weights survive intact:

```dart
IconMind(IconMindIcons.agent, variant: IconMindVariant.duotone, weight: IconMindWeight.bold)
```

```blade
<x-im-agent-duotone class="w-6 h-6 text-violet-500" />
```

Angular and Figma are next.

## For AI assistants

There is an MCP server, so an assistant writing your UI can search the real set instead
of guessing icon names that do not exist.

```bash
claude mcp add iconmind -- npx -y @iconmind/mcp
```

It runs offline, bundles the icon data, and starts in well under a second.

## Design system

Every rule a machine can hold is held by a machine — an illegal drawing cannot reach a
file, because the constructors throw before it does:

```
24 × 24 canvas  ·  0.5 grid  ·  live area 2..22  ·  angles 0 / 45 / 90 only
round caps      ·  ≤ 2 stroke crossings  ·  ink centred within 2 units
longer side 18–22 across the whole set  ·  duotone tint 20%, halo = weight + 3
```

The vocabulary does the rest: a family shares one body and differs only in the mark
inside it, so siblings are byte-identical where they agree.

| Body | Meaning | Example |
|---|---|---|
| Open ring | An agent — acts on its own | `agent`, `agent-check` |
| Chamfered box | A machine; the chamfer is MCP's mark | `model`, `mcp-server` |
| Two-pronged plug | A capability an agent can pick up | `tool-calling`, `mcp-tool` |
| Page with a fold | A document | `mcp-resource`, `policy` |
| Squared shield | Protection | `shield-check`, `encryption` |
| Square loop | Anything that goes round | `refresh`, `retry`, `sync` |
| Cylinder | Stored data | `database`, `backup` |

So you can usually guess the next icon in a family before you see it.

Beyond the validator, two measuring tools keep the set honest at scale — both grew out
of real audits that redrew over sixty icons:

```bash
pnpm icons:audit   # size, ink density and centred-ness outliers, with named exceptions
pnpm icons:twins   # renders all 1,041 icons and pixel-compares every pair for lookalikes
```

## Contributing

Requesting an icon takes a minute and needs no design skills — requests are real demand
instead of our guesses.

[**Request an icon →**](https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml)
&nbsp;·&nbsp;
[**Contributing guide →**](CONTRIBUTING.md)

```bash
pnpm install
pnpm icons:build       # draw every icon from source
pnpm icons:validate    # every rule, all 6,246 cells
pnpm icons:scale       # the size band, measured
```

## Support the project

If this set saves you from mapping `reranker` to a generic sort icon, a ⭐ helps other
people building AI interfaces find it.

## License

[MIT](LICENSE) — code and icons alike. Free for commercial use, no attribution
required, no conditions. Forever.
