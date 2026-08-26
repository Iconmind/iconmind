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

pnpm icons:new agents agent-memory     # scaffolds the concept directory
# draw outline-regular.svg, fill in description and tags
pnpm icons:derive                      # writes the other 6 cells from your master
pnpm icons:validate                    # 30+ rules, runs in under 5 seconds
pnpm changeset                         # choose "minor" for a new icon
```

Open a pull request with **one icon** (or one family of icons) in it.

### You declare shapes, the pipeline draws seven cells

You do not author SVG files. A concept's `.json` carries a `shapes` declaration, and
`pnpm icons:cells` writes all seven from it:

```jsonc
"shapes": [
  { "d": "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z", "closed": true },
  { "d": "M8 4v3" }
]
```

`d` is ordinary SVG path data. `closed: true` marks a shape as enclosing an area, which is
what the duotone tint lands on; anything else is a stroke drawn through it and stays
untinted.

**Why generated.** All six cells come from that one declaration — the same paths at three
stroke widths, with a tint on the closed shapes for duotone. Nothing is offset, derived or
redrawn, so no cell can drift from another, and `matrix/silhouette` and `matrix/stale` both
fail if one does. Neither can be satisfied by editing an SVG.

**The generator is TypeScript**, in `scripts/draw`. Its constructors assert before they
return: a run too short to survive the bold weight, a segment at an angle the set does not
use, an anchor off the half-unit grid — none can be built, so none can reach a file. Refuse,
do not repair.

The SVGs are committed, so installing the packages, running the site, and reading the icons
need nothing beyond `pnpm install`.

### When a warning is wrong

Errors are not negotiable. Warnings are judgement calls, and some of them are calls the
drawing has already made — `debug`'s beetle is a body and six legs, and
`lint/element-budget` will count seven. Answer it in the icon's own metadata:

```json
"accepted": {
  "lint/element-budget": "a beetle is a body and six limbs; drawing fewer legs draws a different insect"
}
```

The reason is the entire mechanism. Anyone can silence a warning; writing down why is what
makes the silence reviewable. A reason under ten characters is rejected, only warnings can
be accepted at all, and an acceptance that stops being needed becomes an error — so these
cannot quietly rot into a list nobody reads.

### What review actually looks at

The validator handles structure. Humans judge four things it cannot:

1. **Can you guess the meaning without a label?**
2. **Does it sit with its neighbours** in the same subcategory?
3. **Is it readable at 16px?**
4. **Does the body match the entity type?** Open rings are agents, chamfered boxes are
   machines (the chamfer is MCP's mark), pronged plugs are capabilities, folded pages
   are documents, squared shields protect, square loops go round, cylinders store.
   This one rule answers most "what shape should it be" questions before you draw.

We aim to give a first response within 48 hours. Every rejection comes with the
specific rule, the reason, and a suggested next step — never a silent close.

## 3. Contribute code

The repository is a pnpm + Turborepo monorepo. `packages/icons` is the source of
truth; the React and MCP packages are generated from it at build time, which
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
