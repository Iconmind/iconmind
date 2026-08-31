# @iconmind/react

React components for [IconMind](https://iconmind.dev) — 2,437 tree-shakeable icons
for AI-era software: LLMs, agents, MCP, RAG, and everything around them.

```bash
npm i @iconmind/react
```

```tsx
import { Agent, ContextWindow, VectorDatabase } from "@iconmind/react";

<Agent />
<ContextWindow size={32} />
<VectorDatabase strokeWidth={1.5} className="text-violet-500" />
```

- 24×24 grid, 2px stroke — sits cleanly next to Lucide
- `size`, `strokeWidth`, `color` props; everything else spreads to the `<svg>`
- Variants and weights available per icon via subpath imports

Docs & search: [iconmind.dev](https://iconmind.dev) · MIT.
