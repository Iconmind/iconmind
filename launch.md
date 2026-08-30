# Launch kit — the words, ready to post

Every draft below is written to be pasted by the user from their own accounts. Facts
are as of 0.5.0 (2,271 icons · 13,626 drawings · 9 npm packages, Flutter, Blade · MCP
server). Not pushed until the user says so.

## Show HN

**Title** (80 chars max): `Show HN: IconMind – 2,271 open-source icons for AI software, with an MCP server`

**Text:**

I build products with agents, models, tool calls and vector databases on screen, and
every icon set I tried had a robot and a sparkle and nothing else. So I drew the
vocabulary — 664 icons for LLMs, agents, MCP, RAG and the rest of the AI stack — and then
the ordinary interface families around them (files, folders, people, chat, calendars,
panels, arrows, git, charts…), 2,271 in all, so you don't need a second set beside it.

Two things are unusual about how it's made:

1. Every icon is a small declaration (a body from a fixed vocabulary plus a mark), and a
   compiler draws all six cells — outline and duotone in thin/regular/bold — and refuses
   geometry it can't draw correctly: off-grid anchors, angles that aren't 0/45/90, strokes
   that vanish at bold, icons that don't fill the same box as the rest. A nightly job
   rasterises all 13,626 cells and fails if two icons render the same. That's how 2k
   icons stay one set.
2. It ships an MCP server (`npx @iconmind/mcp`), so an assistant writing your UI can search
   the set and get the exact import instead of inventing `<AgentBrain />`. There's also an
   llms.txt with every name.

Packages for React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel Blade and
Flutter, all generated from the same source and released together. MIT.

Site: https://iconmind.dev · Code: https://github.com/Iconmind/iconmind

Happy to answer questions about the compiler, the duotone derivation, or why there's no
brain icon.

## Product Hunt

**Tagline** (60): `Open-source icons for the AI era, with an MCP server that picks them`

**Description:** 2,271 MIT icons drawn as one set — agents, models, tokens, tool calls,
MCP servers, RAG pipelines, plus every interface family a product needs. Outline and
duotone, three weights. Packages for React, Vue, Svelte, Solid, Preact, React Native,
Astro, Laravel and Flutter, one release. An MCP server so your coding assistant uses the
right names. No attribution, no seat count.

**First comment (maker):** the Show HN text, shortened to the two unusual things.

**Gallery:** (1) the studio switching variant and weight on `agent-run`; (2) the
`agent-dashboard` collection page; (3) the MCP server returning a snippet in Claude/Cursor;
(4) the family grid — folders with every mark; (5) the compare table vs Lucide.

## Reddit

### r/reactjs
**Title:** `IconMind: 2,271 MIT icons for AI-era apps (agents, MCP, RAG) as tree-shakable React components — 1 kB gz per icon`

One icon = one import = ~1.1 kB gzipped (`import { AgentRun } from "@iconmind/react/icons/agent-run"`), `sideEffects: false`, every icon its own entry so `React.lazy` has something to load. Outline and duotone, three weights, `strokeWidth`/`absoluteStrokeWidth` props. The AI vocabulary is the point — the generalist families are there so you don't need Lucide beside it (and a hundred Lucide names resolve as aliases if you do). MCP server for your assistant: `npx @iconmind/mcp`. https://iconmind.dev

### r/FlutterDev
See the draft already written in this conversation — `flutter pub add iconmind_flutter`, CustomPaint not a font, tree-shaken consts, 277 KB package.

### r/vuejs · r/sveltejs
Same text as r/reactjs with the import line swapped (`@iconmind/vue`, `@iconmind/svelte`) and the size numbers (Vue 1.08 kB gz, Svelte 175 B component).

### r/ClaudeAI · r/cursor
**Title:** `An MCP server that stops your assistant inventing icon names — searches 2,271 icons and returns the exact import`

`npx @iconmind/mcp` — search by name, tag or alias, get paste-ready code for React/Vue/Svelte/Flutter, never `<AgentBrain />` again. The set is the AI vocabulary itself (agents, tools, MCP, RAG) plus the ordinary UI families. Config snippet for Claude Desktop / Cursor in the post body; llms.txt at iconmind.dev/llms.txt for assistants without MCP.

### r/LocalLLaMA
**Title:** `Free icon set for agent dashboards and RAG UIs (MIT, 2,271 icons)` — lead with the
`agent-dashboard` and `rag-pipeline` collection pages.

## dev.to / Hashnode article

**Title:** `We drew 2,271 icons with a compiler that refuses bad geometry`

Outline: (1) the problem — AI products with five icon styles on one screen; (2) the
declaration language: bodies, marks, families; (3) the gates: grid, angles, live area,
size band, ink at 16 px, twins by IoU, a perceptual scan by peak difference; (4) duotone
derived, never drawn; (5) what the nightly caught (the halo bug, 79 near-pairs); (6) the
MCP server and llms.txt — icons for assistants; (7) what's next. Code and images from
`parity-icons.md` and the contact sheets. Canonical URL: the article, with a link back.

## X / LinkedIn thread

1/ 2,271 open-source icons for the AI era — agents, models, tokens, tool calls, MCP, RAG —
drawn as one set, MIT. [10 s GIF of the studio]
2/ Outline and duotone, three weights, every cell generated from one grid by a compiler that
refuses geometry it can't draw right. [family grid image]
3/ React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel, Flutter — one source,
one release. ~1 kB per icon.
4/ And an MCP server: `npx @iconmind/mcp` — your assistant searches the set and returns the
exact import. No more `<AgentBrain />`. [screenshot]
5/ iconmind.dev — no attribution, no seat count.

## Newsletter submissions (one paragraph each, same facts)

JavaScript Weekly · React Status · Frontend Focus · Bytes · TLDR Web Dev · Flutter Weekly ·
Svelte Society newsletter · Astro newsletter · Laravel News · Vue.js News. Submit via each
site's form with the r/reactjs paragraph and the site link; mention "2,271 icons",
"MIT", "MCP server".

## Awesome-list PRs (one line, in each list's format)

- awesome-icons: `[IconMind](https://iconmind.dev) - 2,271 MIT icons for AI-era software (agents, MCP, RAG) plus the interface families; outline/duotone × 3 weights; React, Vue, Svelte, Solid, Preact, RN, Astro, Laravel, Flutter; MCP server.`
- awesome-react-components (Icons): `[@iconmind/react](https://github.com/Iconmind/iconmind) - 2,271 tree-shakable icons for AI products; ~1 kB per icon.`
- awesome-vue / awesome-svelte / awesome-solid / awesome-astro / awesome-flutter / awesome-laravel: the same line with the package name swapped.
- awesome-mcp-servers (Design / Developer tools): `[iconmind](https://github.com/Iconmind/iconmind/tree/main/packages/mcp) - Search 2,271 open-source icons and get paste-ready code for React, Vue, Svelte, Flutter and more.`
- awesome-llm-apps / awesome-ai-tools: the MCP line.

## MCP registry listings

**Name:** IconMind · **Package:** `@iconmind/mcp` · **Command:** `npx -y @iconmind/mcp`
**Description:** Search 2,271 open-source icons for AI-era software by name, tag or alias and get paste-ready code for React, Vue, Svelte, Solid, Preact, React Native, Astro, Laravel and Flutter. MIT.
**Tools:** search icons · get icon · list categories · code snippet.
Submit to: Smithery, Glama, mcp.so, PulseMCP, Cursor directory, the official MCP registry.

## Iconify PR

Repo: `iconify/icon-sets`. Add to `collections.json`:

```json
"iconmind": {
  "name": "IconMind",
  "total": 4542,
  "author": { "name": "IconMind", "url": "https://github.com/Iconmind/iconmind" },
  "license": { "title": "MIT", "spdx": "MIT", "url": "https://github.com/Iconmind/iconmind/blob/main/LICENSE" },
  "samples": ["agent", "vector-database", "mcp-server"],
  "height": 24,
  "category": "General",
  "palette": false
}
```

The collection JSON is published as `@iconmind/icons/iconify.json` (prefix `iconmind`,
2,271 outline icons + 2,271 `-duotone` twins, 688 aliases), regenerated every release.
Point the import script at the npm package.
