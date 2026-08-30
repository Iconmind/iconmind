# iconmind_flutter

2,271 open-source icons for AI-era software — agents, MCP, RAG, prompts, vector
databases — as Flutter widgets. The vocabulary generalist sets don't have, drawn
on a 24px grid with machine-validated consistency.

Every icon ships in **two variants** (outline, duotone) across **three weights**
(thin, regular, bold), rendered from one source of truth shared with the
[React, Vue, Svelte, Solid, Preact, React Native, Astro and Laravel packages](https://iconmind.dev/docs/installation/).

```dart
import 'package:iconmind_flutter/iconmind_flutter.dart';

IconMind(IconMindIcons.agent)
IconMind(IconMindIcons.vectorDatabase,
    variant: IconMindVariant.duotone,
    weight: IconMindWeight.bold,
    size: 32,
    color: Colors.deepPurple)
```

## Properties

| Property | Default | What it does |
|---|---|---|
| `size` | `24` | Width and height, in logical pixels |
| `color` | ambient `IconTheme` | Stroke colour |
| `variant` | `outline` | `outline` or `duotone` |
| `weight` | `regular` | `thin`, `regular` or `bold` |
| `strokeWidth` | per weight | Fine adjustment; picking a weight is the intended control |
| `absoluteStrokeWidth` | `false` | Keeps stroke thickness constant as size changes |
| `semanticLabel` | — | Announced by screen readers; icons are decorative without it |

## Tree shaking

Icons are compile-time constants — one per file, referenced through
`IconMindIcons`. Flutter's AOT compiler drops every icon you don't use; an app
that shows three icons carries three icons.

## Not a font

This package draws real strokes with `CustomPaint` instead of shipping an icon
font. That is what keeps duotone (a second, tinted layer) and the three weights
honest — a font would have flattened all six drawings into one filled glyph.

## Browse the set

Every icon, searchable, with live code for every framework:
[iconmind.dev](https://iconmind.dev)
