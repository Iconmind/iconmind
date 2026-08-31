# IconMind Icons for VS Code

Autocomplete every IconMind icon inside `import { … } from "@iconmind/react"` (and vue,
svelte, solid, preact, react-native, astro) and after `IconMindIcons.` in Flutter — each
with its description and a preview — and hover any icon name to see the drawing and a
link to its page. 2,387 icons, regenerated per release.

## Build and install locally

```bash
pnpm --filter iconmind-vscode package   # writes iconmind-vscode-0.1.0.vsix
code --install-extension packages/vscode-extension/iconmind-vscode-0.1.0.vsix
```

## Publish

`npx @vscode/vsce publish` with a Marketplace personal access token for the `iconmind`
publisher (create the publisher once at https://marketplace.visualstudio.com/manage).
