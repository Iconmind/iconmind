# iconmind/blade-iconmind

Blade components for [IconMind](https://iconmind.dev) — 2,437 icons for AI-era
software: LLMs, agents, MCP, RAG, and everything around them.

```bash
composer require iconmind/blade-iconmind
```

```blade
<x-im-agent class="w-6 h-6" />
<x-im-context-window class="w-8 h-8 text-violet-500" />

{{-- other cells by suffix: --}}
<x-im-agent-duotone class="w-6 h-6" />
<x-im-agent-outline-bold class="w-6 h-6" />
```

Built on [Blade Icons](https://github.com/blade-ui-kit/blade-icons). The default name is
the outline-regular cell; every other cell is available as `{name}-{variant}-{weight}`,
with `-duotone` shorthand for duotone-regular.

MIT.
