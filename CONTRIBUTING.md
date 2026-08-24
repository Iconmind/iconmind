# Contributing to IconMind

There are three ways to help, and the first one takes about a minute.

---

## 1. Request an icon — no design skills needed

[**Open an icon request →**](https://github.com/iconmind/iconmind/issues/new?template=icon-request.yml)

Tell us the concept, what it means in one sentence, and where you would use it.
That's it. Requests are the single most useful signal we get — they are real demand
rather than our guesses, and they go straight to the top of the backlog.

## 2. Submit an icon

```bash
git clone https://github.com/iconmind/iconmind.git
cd iconmind
pnpm install

pnpm icons:new agents agent-memory     # scaffolds the .svg and .json
# draw the icon, fill in description and tags
pnpm icons:validate                    # 30+ rules, runs in under 5 seconds
pnpm changeset                         # choose "minor" for a new icon
```

Open a pull request with **one icon** (or one family of icons) in it.

### The rules that matter

Everything mechanical is checked by `pnpm icons:validate`, so you do not need to
memorise it. The short version:

| | |
|---|---|
| Canvas | `24 × 24`, `viewBox="0 0 24 24"` |
| Anchors | inside `3..21` — ink stops at `2..22` because a 2px stroke bleeds 1px |
| Stroke | `2`, `currentColor`, round cap and join |
| Fill | `none` |
| Coordinates | multiples of `0.5` |
| Angles | horizontal, vertical, or 30° / 45° / 60° |
| Crossings | at most 2 — this, not element count, is what kills legibility at 16px |

Full guidelines: [`docs/masterplan/03-design-system.md`](docs/masterplan/03-design-system.md).

### What review actually looks at

The validator handles structure. Humans judge four things it cannot:

1. **Can you guess the meaning without a label?**
2. **Does it sit with its neighbours** in the same subcategory?
3. **Is it readable at 16px?**
4. **Does the outer shape match the entity type?** Circles are actors, hexagons are
   components, rounded squares are containers, cylinders are stored data. This one
   rule answers most "what shape should it be" questions before you start drawing.

We aim to give a first response within 48 hours. Every rejection comes with the
specific rule, the reason, and a suggested next step — never a silent close.

## 3. Contribute code

The repository is a pnpm + Turborepo monorepo. `packages/icons` is the source of
truth; the React, Vue, and MCP packages are generated from it at build time, which
is why component files are not committed.

```bash
pnpm typecheck
pnpm test
pnpm icons:validate
```

---

## Naming

| Thing | Form | Example |
|---|---|---|
| Icon slug | `kebab-case`, unique across every category | `agent-memory` |
| Branch | `icon/<slug>`, `feat/<topic>`, `fix/<topic>` | `icon/agent-memory` |
| Commit | [Conventional Commits](https://www.conventionalcommits.org) | `feat(agents): add agent-memory` |

Slugs are public API. Renaming one is a breaking change, so we would rather spend an
extra minute choosing the name than ship it twice.

Use the real term from the domain: `reranker`, not `sort-smart`. No brand names, no
abbreviations unless the industry already uses them (`llm`, `api`, `mcp`, `ci-cd`).

## Language

Everything a second person might read is written in **English**: metadata, code
comments, validator messages, issue templates, and documentation.

## Originality

Icons must be your own work. Shared industry metaphors — a cylinder for a database, a
shield for security — are common language and free to use. Copying the distinctive
shapes of another icon set is not. If a similarity is ever reported, we redraw first
and discuss afterwards.

## License

By contributing you agree that your work is released under the [MIT License](LICENSE).
There is no CLA.
