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

Allocation by category, chosen from where the vocabulary is thinnest against how the
field has grown. Names below are candidate directions, not final slugs — every batch
starts with `pnpm icons:duplicates` and the naming rules in CONTRIBUTING.

| Category | + | Directions (examples) |
|---|---|---|
| ai | 90 | serving internals (kv-cache, paged-attention, speculative-decode, batching, warm-pool), quantisation/distillation (int8, awq, teacher-student), preference training (dpo, rlhf, reward-model), multimodal (image-gen, video-gen, audio-gen, ocr, caption), synthetic data, evals (rubric, judge, leaderboard, contamination) |
| agents | 70 | computer-use (screen, click, type, browse), browser agents, voice agents (listen, speak, interrupt), guardrails (policy-check, refusal, escalate-human), A2A (discover, capability-card), skills, session/resume, sandbox levels |
| devtools | 40 | notebooks (cell-run, kernel, restart), profiling (allocation, gc-pause), testing (property-test, snapshot-test, mutation-test), editors (multi-cursor, refactor-rename) |
| rag | 40 | graph-rag, hybrid-search, chunk overlap/window, citation-check, freshness, index-rebuild, late-interaction, reranker families |
| data | 40 | lakehouse, iceberg-style tables, cdc, schema-evolve, data-contract, quality-gate, lineage-column, materialise |
| devops | 40 | gpu fleet (gpu, vram, mig, node-pool), model-deploy (shadow, ab-serve, warm-start), incident (sev1, runbook-run, page-escalate) |
| security | 40 | AI security (prompt-injection, jailbreak, data-exfil, model-theft, pii-redact, watermark), plus classic gaps (mfa-push, session-hijack) |
| analytics | 30 | LLM observability (trace-tree, token-cost, latency-p99, feedback-thumbs), cost dashboards |
| automation | 30 | triggers (email, form, cron-miss), human-in-the-loop (approve-step, reject-step, handback), retries/backoff |
| cloud | 30 | finops (commitment, rightsize, spot), serverless (cold-start, concurrency), networking (private-endpoint, egress) |
| mcp | 30 | elicitation, structured-output, roots-add, auth-flow, gateway, server-marketplace, well-known |
| interface | 20 | real gaps only — media controls, file types, editor chrome — checked against Lucide overlap first: we sit beside generalist sets, not inside them |

**Total: 500.**

---

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
