# @iconmind/astro

Astro components for [IconMind](https://iconmind.dev) — 2,271 tree-shakeable icons
for AI-era software: LLMs, agents, MCP, RAG, and everything around them.

```bash
npm i @iconmind/astro
```

```astro
---
import { Agent, ContextWindow } from "@iconmind/astro";
---

<Agent />
<ContextWindow size={32} />
```

Zero client JavaScript — icons render to plain SVG at build time.

## Size

Each icon is one small `.astro` wrapper plus its path data — about 1.8 kB of source and
roughly 0.3 kB gzipped — and only the icons you import are compiled into your site. There is
no client-side runtime at all.

Bundlephobia (and other tools that run webpack over a package entry) cannot measure this
package: `.astro` files are compiled by Astro, not by a JavaScript parser, so those tools stop
at the first `---` frontmatter with "Module parse failed". That is a limit of the measuring
tool, not a defect in the package — `npm run build` here proves every template with the
real Astro compiler.

Docs & search: [iconmind.dev](https://iconmind.dev) · MIT.
