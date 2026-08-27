# 500 more icons — the plan, and the locks that keep them consistent

The set stands at **1,008 concepts × 6 cells**. This document plans the growth to
**~1,508** without loosening anything: the same grid, the same bodies, the same
machine-enforced geometry, and a measured audit that catches what rules cannot.

Nothing here is aspirational tooling — every lock listed below already exists and
already gates the first 1,008.

---

## The consistency locks

Three layers. A drawing has to get through all of them, in order, and none of them
is a human squinting at a pull request.

### Lock 1 — the constructors throw (`scripts/draw/forms.ts`)

Illegal geometry cannot be *written*. The shape functions reject, at build time:

| Rule | Value |
|---|---|
| Grid | 24×24, every anchor on the **0.5 grid** |
| Angles | multiples of **45°** only |
| Runs | no stroke run under **2.5** (it vanishes at bold) |
| Dots | disc radius **1, 2 or 3** — a point, a node, a core |
| Corners | rect radius **2** (solid) or **height/2** (capsule); frames carry their own |
| Raw paths | `raw()` demands a written reason ≥ 12 characters |

### Lock 2 — the validator (`pnpm icons:validate`, 30+ rules, also CI)

Every cell of every icon, on every build:

| Rule | Value |
|---|---|
| Live area | anchors inside **2..22**, ink bleeds to 1..23 and no further |
| Size band | the **longer side spans 18–22** units |
| Optical centre | bbox centre within **2** of the canvas centre |
| Stroke gaps | parallel strokes ≥ **2.5** apart — **3 at bold** |
| Crossings | at most **2** |
| Duotone | tint 20% on closed shapes; halo (weight+3) for open drawings — **derived, never drawn** |
| Weights | geometry identical across thin/regular/bold (the Flutter emitter asserts it too) |

### Lock 3 — the audit (`pnpm icons:audit`)

The lesson of the 2026-08-27 whole-set audit: rules can all pass while an icon still
reads wrong *next to its neighbours*. So the measured guidelines are now a tool,
run per batch:

| Metric | Guideline | Why |
|---|---|---|
| Short bbox side | **≥ 10** units | the size band bounds the longer side; a 22×6 stripe passed it and read half-size — 32 icons had to be redrawn |
| Ink at 16px | **< 45%** | past it, an icon is a blot at list size |
| Ink centroid | within **2.5** of centre | further, the drawing floats in its frame |
| Elements | **< 8** | more is usually two icons fighting |

Guidelines, not law: `interface/pause` is legitimately 8 wide, a bar chart
legitimately stands on its baseline. Exceptions are **named in the script with a
reason** — an exception that is not written down is a regression waiting to recur.

### Lock 4 — the vocabulary (`scripts/draw/bodies.ts`, `marks.ts`)

What kind of thing a concept is decides its outer shape, from one file so families
cannot drift: ring = agent · chamfered frame = machine/MCP · plug = tool ·
page = document · cylinder = stored data · shield = security · window = interface ·
square loop = rotation. Family variants are **the same body byte-for-byte** with a
different mark in the hollow. New bodies may be added — by adding to `bodies.ts`,
never by drawing one inline.

---

## Where the 500 come from

**Honest first step: the inventory, not memory.** A draft of this section named
"kv-cache", "image-gen" and "prompt-injection" as candidate directions — a spot
check found more than half of them already drawn. The set is more complete than
anyone's recollection of it, so every batch's naming phase starts from the actual
list, not from a brainstorm:

```bash
node -e "const m=require('./packages/icons/dist/metadata.json');
  for (const i of m.icons) console.log(i.category+'/'+i.slug)" | sort
pnpm icons:duplicates        # then check the metaphor, not just the name
```

The allocation below is a **budget**, not a promise — where the vocabulary is
thinnest against how the field has grown. The example directions are ones verified
absent from the set at the time of writing; each still gets the duplicates check
before drawing, and a category that runs out of *good* concepts hands its budget to
one that has not. If the set runs dry of concepts a person could guess without a
label at 1,400, the right total is 1,400 — padding to a round number with jargon
nobody searches for is how a vocabulary rots.

| Category | + | Verified-absent example directions |
|---|---|---|
| ai | 90 | speculative-decode, dpo, rlhf, reward-model, teacher-student, contamination-check, best-of-n, logprobs, curriculum |
| agents | 70 | computer-use, click-action, type-action, browser-agent, voice-agent, interrupt, capability-card, handback, skill-install |
| devtools | 40 | property-test, mutation-test, snapshot-test, kernel-restart, multi-cursor, refactor-rename, gc-pause |
| rag | 40 | graph-rag, late-interaction, chunk-overlap, citation-check, index-rebuild, freshness-probe |
| data | 40 | cdc, data-contract, schema-evolve, quality-gate, materialised-view, iceberg-table |
| devops | 40 | shadow-deploy, ab-serve, warm-start, vram, node-pool, sev1, page-escalate |
| security | 40 | jailbreak, pii-redact, data-exfil, model-theft, mfa-push, session-hijack |
| analytics | 30 | trace-tree, latency-p99, feedback-thumbs, eval-dashboard |
| automation | 30 | approve-step, reject-step, trigger-email, cron-miss, backoff |
| cloud | 30 | commitment, rightsize, private-endpoint, egress-cost, concurrency-limit |
| mcp | 30 | elicitation, structured-output, roots-add, auth-flow, gateway, well-known |
| interface | 20 | real gaps only, checked against Lucide overlap first — we sit beside generalist sets, not inside them |

**Total budget: 500.**

### Metadata is half the work

An icon nobody can find does not exist. Every new concept ships with the same
metadata quality bar as the drawing: a one-sentence description that says what the
thing *is*, tags a user would type, keywords covering the synonyms, and `related`
links both ways. The search index and the MCP server are only as good as this.

## The batch loop

25 batches of ~20, exactly the loop that built the first 1,008:

1. **Name** — pick concepts from one or two categories; `pnpm icons:duplicates`
   against slugs *and* metaphors; naming rules from CONTRIBUTING (real domain terms,
   no brands, no invented abbreviations).
2. **Declare** — a `batch-NN.ts` in `scripts/draw/icons/`; bodies from `bodies.ts`,
   marks from `marks.ts`; a comment on any drawing whose reasoning is not obvious.
3. **Build + validate** — `pnpm icons:build && pnpm icons:validate` until 0/0.
4. **Audit** — `pnpm icons:audit`; flags are redrawn or become named exceptions.
5. **Look** — contact sheet at 88/24/16px, outline-regular **and** outline-bold and
   duotone-regular: `ONLY="…" npx tsx scripts/review/sheet.mts <cell> out.png`.
   Fusion at bold and mush at 16px are decided by eyes, on the render.
6. **Ship** — `pnpm icons:optimize && pnpm icons:generate`, commit, push. The
   release train versions, publishes all ten packages and redeploys the site on its
   own; the docs, search index and framework components need no manual step.

### Phase 0, before any new icon

The audit currently flags **39 residual outliers** in the existing set (mild
centroids in rag/, security/ and friends — the tail behind the 43 already redrawn).
Batch 0 clears that list to zero-or-named-exception, so growth starts from a clean
baseline.

---

## What is deliberately NOT in this plan

- **No new stroke widths, grid sizes or corner treatments.** The matrix is settled.
- **No decorative variants.** Six cells per concept, derived from one declaration.
- **No brand icons.** The MCP/agent ecosystem moves fast; concepts age better than
  logos, and logos carry trademark weight this set does not want.
- **No relaxation of the element budget to fit a complicated concept.** A concept
  that needs nine elements is usually two concepts; split it.
