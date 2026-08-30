# @iconmind/vue

Vue 3 components for [IconMind](https://iconmind.dev) — 2,041 tree-shakeable icons
for AI-era software: LLMs, agents, MCP, RAG, and everything around them.

```bash
npm i @iconmind/vue
```

```vue
<script setup>
import { Agent, ContextWindow, VectorDatabase } from "@iconmind/vue";
</script>

<template>
  <Agent />
  <ContextWindow :size="32" />
  <VectorDatabase :stroke-width="1.5" class="text-violet-500" />
</template>
```

- 24×24 grid, 2px stroke — sits cleanly next to Lucide
- `size`, `color`, `variant`, `weight`, `strokeWidth` props; everything else falls through to the `<svg>`

Docs & search: [iconmind.dev](https://iconmind.dev) · MIT.
