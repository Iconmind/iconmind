# @iconmind/mcp

An MCP server for [IconMind](https://iconmind.dev), so an AI assistant writing your UI
can search the real icon set instead of guessing icon names that do not exist.

```bash
claude mcp add iconmind -- npx -y @iconmind/mcp
```

Any other MCP client takes the same command in its config — Cursor and Windsurf in `mcp.json`,
VS Code under `"servers"` in `.vscode/mcp.json`, Codex in `~/.codex/config.toml`:

```json
{ "mcpServers": { "iconmind": { "command": "npx", "args": ["-y", "@iconmind/mcp"] } } }
```

Listed in the MCP registry as `io.github.iconmind/iconmind`; the docs are at
https://iconmind.dev/docs/mcp/.

- Runs offline — the icon data is bundled
- Starts in well under a second
- Search by name, tag, alias, or category; returns real slugs and import lines

MIT.
