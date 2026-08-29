# 1k plan — 1,041 → 2,041 icons

One thousand new icons, drawn ten at a time, each round gated before the next
begins. Nothing in this file loosens the existing system; the system is the point.

## The contract (locked — no exceptions, no "just this once")

Inherited from the 1,041 that exist. Every new icon obeys all of it:

Every number below is the machine's number, with its enforcing gate named — the
prose here is documentation of the gates, never a substitute for them:

- **24px grid**, coordinates snap to **0.5** (`validate geometry/grid-snap`;
  curve endpoints exempt by design). Angles **0/45/90** (`geometry/angle-constraint`).
- Live area **2..22** (`geometry` anchors + `precheck` arc endpoints).
- Stroke gaps ≥ weight + 2.5 (`geometry/min-stroke-gap`; error under 1.5, warn under
  the minimum). Crossings **≤ 2** (`geometry/max-crossings`).
- **Size**: longer side incl. stroke **≥ 16** (`precheck`), capped ~22 by live area;
  short side **≥ 10** (`audit`, GLYPHS exempt with written reason).
- **Centre, both metrics**: bbox centre **≤ 2** from middle (`precheck`); ink
  centroid **< 2.5** (`audit`, ANCHORED exempt with written reason).
- **Ink at 16px < 45%** or it reads as a blot (`audit`). **Elements < 8** (`audit`;
  validator warns above budget).
- Six cells per icon: outline/duotone × thin/regular/bold. Duotone is derived
  (20% tint + halo weight+3) — never drawn by hand.
- **Bodies vocabulary is law**: ring = agent, chamfered frame = machine/MCP,
  plug = tool, page, shield, cylinder, window, `cycle()` loop. A new concept in an
  existing family reuses the family body; it never invents a rival.
- **Marks**: BIG/SMALL check/off/alert/add/pause from marks.ts — never redrawn ad hoc.
- **Banned shapes**: no sparkle, no robot, no brain, no magic wand. The set's whole
  identity is that AI concepts get real shapes, not the sparkle.
- **Frame/rect radius**: r is 2, or h/2 for a capsule. Stub minimum 5×5 at r2.
  Frame gap lips ≥ 2.5.
- Deliberate near-pairs stay: MCP chamfer convention, direction pairs Round 19 adds chat-forward/chat-reply (0.88, mirrored arrow in the same bubble) and grant/least-privilege (0.88, plus/minus beside the same key).
  (backup/restore, zoom-in/out), the rotation family, mark families. They are grammar,
  not accidents — `icons:twins` findings against them are dismissed, not "fixed".

## Naming (locked)

- kebab-case, singular, concrete: `train-loss`, not `losses` or `trainLoss`.
- Family prefix where a family exists: `agent-*`, `mcp-*`, `eval-*`, `memory-*`.
- A name must survive the 24px test: if two names would render the same silhouette,
  one of them is the alias of the other, not a second icon.
- Aliases welcome, but an alias counts as a taken name forever.
- Every slug below was checked against all 1,366 existing slugs+aliases on
  2026-08-27: zero collisions, zero internal duplicates.

## The loop (every round of 10, no skipping)

1. **Draw** 10 concepts from the list below, in order, into the next `batch-NN.ts`
   (one batch file per round, starting `batch-52.ts`), registered in `run.ts`.
2. `tsx scripts/review/precheck.mts scripts/draw/icons/batch-NN.ts` — the cheapest
   gate, one build cycle early: size band, centring, live area. Fix before building.
3. `pnpm icons:build && pnpm icons:optimize` — forge + canonicalise.
4. `pnpm icons:validate` — 0 failed, 0 warnings, or the round stops here.
5. `pnpm icons:audit` — new icons must not appear as outliers (size band, ink,
   centroid). A named exception needs a reason written into audit.mts, not a shrug.
6. `pnpm icons:twins` — no new pair ≥ 0.90 IoU against the whole set; anything
   0.72–0.90 gets looked at, and either redrawn or justified as family grammar.
7. **Visual check**: render the 10 at 24px next to their closest neighbours;
   anything mushy, ambiguous, or off-voice is redrawn *in this round*.
8. Only a fully green round unlocks the next 10. A concept that will not draw well
   is swapped for a spare from the same category — the list is a menu, not a vow.

**Push cadence** (revised, the user's call 2026-08-29): NO push until all 1,000
are drawn. Everything accumulates as local commits. Before the one push at the
end: update README (icon/cell counts are hardcoded there), the landing page's
copy and counts, the docs pages that quote numbers, and re-run icons:generate —
then a single push mints one release with the whole set.
**Never** touch versions by hand; `[skip release]` only for non-icon fixes.

## Phases

Ten phases of ~100. Rounds are 50 icons from round 8 on (the user's call, 2026-08-29; 20 from round 5, 10 before that) — two category slices per round, same gates, same sheet. Rounds rotate through the categories in the order
listed — round 1 is the first 10 of `ai`, round 2 the first 10 of `agents`, and so
on, wrapping back to `ai` and skipping a category once its list is exhausted. Every
phase is therefore a cross-section of the whole set, which is what makes voice
drift show up in round 12 instead of round 90. Each phase ends with: full audit +
full twins + one push (one patch release) + a look at the live site.

## Allocation

| category | now | + | after |
|---|---|---|---|
| ai | 135 | +200 | 335 |
| agents | 92 | +130 | 222 |
| interface | 189 | +130 | 319 |
| devtools | 90 | +90 | 180 |
| data | 74 | +80 | 154 |
| rag | 66 | +70 | 136 |
| security | 85 | +70 | 155 |
| devops | 66 | +60 | 126 |
| analytics | 70 | +60 | 130 |
| cloud | 63 | +50 | 113 |
| automation | 62 | +50 | 112 |
| mcp | 49 | +10 | 59 |
| **total** | **1041** | **+1000** | **2041** |

## The 1,000

In drawing order within each category. Ten consecutive names = one round.

### ai (+200)

  1. model-card, model-registry-entry, model-license, model-size, model-family, model-fork, checkpoint-save, checkpoint-load, checkpoint-compare, gradient-descent
  2. lr-schedule, grad-flow, gradient-clip, train-loss, overfit-gap, underfit-gap, stop-patience, warmup, dropout, frozen-layer
  3. frozen-layer, layer-unfreeze, rank-adapter, lora-merge, adapter-swap, quantize-4bit, quantize-8bit, dequantize, weight-prune, sparsity
  4. moe, expert-router, expert-active, context-length, context-extend, rope, attention-cache, kv-evict, logit-lens, logit-bias
  5. top-k-sample, nucleus-sample, min-p, temperature-high, temperature-low, greedy-decode, draft-verify, draft-model, token-in, token-out
  6. token-meter, token-ceiling, detokenize, byte-pair, vocabulary, special-token, stop-sequence, system-token, embedding-3d, embedding-compare
  7. embedding-cluster, embedding-drift, latent-project, pooling, probability-curve, activation, transformer-block, decoder-only, encoder-decoder, cross-attention
  8. self-attention, attention-mask, attention-sink, flash-attention, multi-query, positional-encoding, vision-encoder, image-caption, image-variation, inpaint-mask
  9. outpaint, upscale-ai, style-transfer, controlnet, img2img, txt2img, negative-prompt, seed, seed-lock, cfg-scale
 10. noise-schedule, diffusion-model, diffusion-step, latent, vae, ocr-ai, object-detect, segment-mask, depth-map, pose-estimate
 11. face-detect, scene-graph, text-to-video, video-frame-ai, frame-interpolate, motion-brush, lip-sync, speech-synth, speech-recognize, voice-clone
 12. voice-style, speaker-diarize, audio-denoise, music-gen, sound-effect, transcribe-live, translate-speech, multimodal-fuse, modality-switch, any-to-any
 13. visual-grounding, spatial-reason, world-model, physics-sim, 3d-gen, mesh-gen, texture-gen, nerf, gaussian-splat, point-cloud
 14. robot-arm, robot-policy, teleoperate, sim-to-real, reasoning-trace, reasoning-budget, think-longer, self-reflect, sample-consensus, thought-tree
 15. scratchpad-ai, context-scratch, deliberate, fast-thinking, slow-thinking, confidence-score, calibration, uncertainty, abstain, refuse
 16. partial-answer, cite-sources, fact-check, claim-verify, contradiction, entailment, paraphrase, style-match, tone-shift, simplify-text
 17. elaborate, proofread, draft-mode, revision, diff-text, merge-text, outline-gen, brainstorm, mind-map, flashcard-gen
 18. quiz-gen, tutor, socratic, curriculum-path, skill-tree, knowledge-cutoff, recency, knowledge-stale, model-diff, model-soup
 19. ensemble, cascade, fallback-model, router-model, cheap-model, frontier-model, local-model, edge-model, tiny-model, model-server
 20. warm-model, cold-model, pin-model, model-alias, canary-model, shadow-model, champion-model, challenger-model, model-retire, model-archive

### agents (+130)

  1. agent-spawn, agent-pool, agent-lease, agent-quota, agent-badge, agent-rank, agent-clone, agent-priority, agent-toolbelt, agent-persona
  2. goal-drift, plan-tree, task-queue-agent, task-claim, task-yield, task-split, task-merge, turn-limit, nudge, escalate-human
  3. task-claim, task-yield, task-steal, task-split, task-merge, goal-milestone, deadline-agent, budget-agent, spend-cap, token-budget-agent
  4. turn-limit, cycle-guard, loop-break, stuck-agent, nudge, escalate-human, approval-gate, approval-grant, approval-deny, autonomy-level
  5. leash-short, leash-long, guarded-action, dry-run-agent, preview-action, undo-action, checkpoint-agent, rollback-agent, agent-memory-write, agent-memory-read
  6. memory-consolidate, memory-decay, memory-pin, memory-search, episodic-memory, semantic-memory, procedural-memory, memory-graph, memory-forget, remember-this
  7. context-handout, context-inherit, context-fork, context-merge-agent, scratch-file, workspace-agent, sandbox-agent, sandbox-escape-alert, container-agent, vm-agent
  8. web-navigator, desktop-agent, screen-read, click-agent, type-agent, scroll-agent, form-fill, captcha-block, file-agent, shell-agent
  9. code-agent, review-agent, test-agent, deploy-agent, research-agent, browse-agent, scrape-agent, summarize-agent, email-agent, calendar-agent
 10. crm-agent, support-agent, triage-agent, oncall-agent, data-agent, sql-agent, swarm-formation, swarm-split, swarm-merge, vote-quorum
 11. vote-agent, consensus-agent, debate, critic-agent, judge-agent, referee, red-team-agent, blue-team-agent, pair-agents, leader-elect
 12. follower, role-swap, team-topology, org-chart-agents, agent-market, agent-hire, agent-fire, agent-review-score, reputation, trust-score
 13. handoff-note, baton, relay, broadcast-ack, subscribe-agent, unsubscribe-agent, heartbeat-agent, liveness, watchdog-agent, supervisor-tree

### interface (+130)

  1. composer, composer-attach, composer-expand, slash-command, at-mention, text-cursor, chip, chip-add, chip-remove, segmented
  2. stepper-input, fader, joystick, dpad, hotkey, key-combo, reading-list, tab-new, tab-close, split-pane
  3. spotlight, quick-switch, recent-items, frecency, pin-item, unpin-item, favorite-add, favorite-remove, bookmark-folder, reading-list
  4. tab-new, tab-close, tab-group, tab-pin, tab-overflow, split-pane, pane-left, pane-right, pane-bottom, pane-float
  5. dock-left, dock-right, undock, picture-in-picture, kiosk, presenter, spotlight-cursor, laser-pointer, annotate-screen, highlighter
  6. underline-wavy, strike-through, subscript, superscript, text-color, fill-color, border-color, color-sample, swatch, gradient-fill
  7. opacity-slider, blend-mode, layer-up, layer-down, layer-lock, group-objects, ungroup-objects, align-left-obj, align-center-obj, space-evenly
  8. snap-grid, ruler, guide-line, artboard, canvas-pan, zoom-fit, zoom-selection, handle-resize, handle-rotate, crop-free
  9. crop-ratio, flip-h, flip-v, nudge-arrow, smart-guide, auto-layout, constraint-pin, breakpoint-ui, responsive-mode, device-rotate
 10. safe-area, status-bar-ui, navbar, toolbar-collapse, sidebar-resize, breadcrumb-collapse, pagination-dots, infinite-scroll, pull-refresh, swipe-action
 11. long-press, double-tap, pinch, haptic, gesture-lock, grip-dots, drop-target, reorder, sortable, kanban-card
 12. kanban-column, swimlane, timeline-zoom, gantt-bar, dependency-arrow, milestone-flag, today-line, date-span, time-slot, recurrence
 13. reminder-snooze, toast-stack, banner-dismiss, inline-alert, empty-state, skeleton-text, shimmer, progress-steps, done-all, celebration

### devtools (+90)

  1. live-breakpoint-conditional, breakpoint-log, step-out, stack-frame, debug-step-in, step-out, call-stack, stack-frame, frame-select, locals
  2. closure, this-binding, hot-reload, fast-refresh, source-map, minify, bundle-analyze, bundle-chunk, code-split, lazy-import
  3. circular-dep, dep-graph, peer-dep, dep-pin, lockfile-tool, multi-package, workspace-link, symlink, path-alias, barrel-file
  4. lint-fix, format-on-save, organize-imports, dead-code, unused-export, type-error, type-infer, generic-type, union-type, strict-mode
  5. any-type, nullable, assert-check, invariant, precondition, postcondition, fuzz, generative-test, snapshot-test, golden-file
  6. test-double, spy, stub-tool, fake-timer, test-shard, test-retry, flaky-detect, test-select, coverage-diff, mutant-kill
  7. bench-run, flame-graph, allocation, heap-snapshot, gc-cycle, event-loop, microtask, worker-pool, thread-view, deadlock
  8. race-detect, atomic-op, profiler-cpu, profiler-io, span-tool, instrument, pragma, codegen, scaffold, template-repo
  9. boilerplate, codemod, ast, ast-transform, parser-tool, lexer, token-stream, grammar, syntax-highlight, language-server

### data (+80)

  1. dataset-card, dataset-version, dataset-split, holdout, sample-rows, stratified-sample, class-balance, label, data-augment, synthetic-row
  2. class-balance, label, label-queue, label-review, annotator, inter-annotator, gold-label, weak-label, synthetic-row, synthetic-flag
  3. data-augment, perturb, noise-inject, dedupe-fuzzy, canonicalize, entity-resolve, record-link, survivorship, null-fill, impute
  4. outlier-remove, winsorize, normalize-data, standardize, bin, bucket-data, one-hot, feature, feature-cross, feature-store
  5. feature-drift, target-leak, cardinality, dtype, schema-infer, schema-pin, schema-diff, contract-data, expectation, great-expectation
  6. row-count-check, sla-freshness, volume-anomaly, distribution-shift, parquet, columnar, row-store, delta-table, iceberg-table, compaction
  7. partition-data, z-order, manifest-file, merge-upsert, merge-into, change-capture, changefeed, event-watermark, late-arrival, backfill-data
  8. replay-data, tombstone, vacuum, time-travel, snapshot-data, branch-data, lineage-node, lineage-edge, provenance-stamp, data-contract-break

### rag (+70)

  1. corpus-add, table-extract, matryoshka, parent-chunk, child-chunk, sliding-window, embed-batch, embed-cache, reembed, hybrid-fuse
  2. nested-split, token-split, overlap-tune, chunk-viz, parent-chunk, child-chunk, sliding-window, late-chunk, embed-batch, embed-cache
  3. embed-version, reembed, dimension-reduce, matryoshka, index-hnsw, index-ivf, index-flat, index-merge, index-warm, shard-index
  4. ann-search, exact-search, prefilter, postfilter, metadata-filter, hybrid-fuse, rrf, alpha-blend, rerank-cross, rerank-llm
  5. colbert, score-threshold, top-n-tune, diversity-mmr, dedup-results, context-order, lost-in-middle, prompt-compress, summary-index, raptor
  6. graph-rag, entity-link-rag, community-summary, hop-question, multi-hop, subquestion, query-rewrite, query-expand, hyde, step-back
  7. self-query, router-rag, corrective-rag, fusion-rag, agentic-rag, cache-rag, eval-rag, groundedness, context-precision, context-recall

### security (+70)

  1. prompt-shield, input-sanitize, policy-allow, policy-block, harm-category, data-exfil, canary-token, weight-leak, kill-switch, tripwire
  2. redact-fields, deanonymize-risk, data-exfil, canary-token, honeypot-ai, model-theft, weight-leak, membership-inference, model-inversion, adversarial-example
  3. perturbation-attack, evasion, poisoning, backdoor-model, trigger-phrase, sleeper, alignment-fake, sandbag, scheming, oversight
  4. interpretability, probe-safety, circuit-break, kill-switch, tripwire, containment, eval-dangerous, capability-eval, misuse, dual-use
  5. export-control, watermark-ai, detect-ai-text, deepfake-detect, c2pa, content-credential, signature-media, chain-of-custody, secret-scan, key-rotate-auto
  6. vault-secret, short-lived-token, scoped-token, least-privilege, just-in-time-access, break-glass, session-record, admin-audit, user-consent, data-residency
  7. data-retention, legal-hold, dpa, subprocessor, bug-bounty, responsible-disclosure, cvss, exploit-poc, patch-diff, virtual-patch

### devops (+60)

  1. gpu-queue, gpu-util, vram, vram-full, bin-pack, preempt, node-drain, cordon, taint, spot-node
  2. bin-pack, preempt, spot-node, reserved-node, autoscale-gpu, scale-to-zero, prewarm-pool, node-drain, cordon, taint
  3. toleration, affinity, anti-affinity, pod-ai, inference-server, batch-window, dynamic-batch, continuous-batch, paged-attention, tensor-parallel
  4. pipeline-parallel, data-parallel, zero-offload, cpu-offload, disk-offload, tokens-per-second, latency-p50, goodput, queue-depth, admission-control
  5. load-shed, brownout, circuit-open, circuit-close, bulkhead, cell-arch, shuffle-shard, static-stability, chaos-experiment, fault-inject
  6. latency-inject, packet-loss, game-day, runbook-auto, auto-remediate, self-heal, state-drift, reconcile, gitops-sync, fleet

### analytics (+60)

  1. rubric, pairwise-compare, elo, win-rate, score-distribution, percentile-rank, forecast-spend, cost-per-call, spend-alert, budget-burn
  2. elo, leaderboard-internal, win-rate, regression-eval, reference-set, canary-eval, live-eval, offline-eval, rater, choice-pair
  3. annotation-ui, score-distribution, percentile-rank, p95-metric, cost-per-call, token-price, spend-alert, budget-burn, forecast-spend, unit-economics
  4. cohort-ai, funnel-leak, retention-curve, daily-active, stickiness, north-star, guardrail-metric, counter-metric, experiment-arm, holdout-group
  5. uplift, significance-test, p-value, confidence-interval, bayesian, sequential-test, cuped, srm-check, sample-ratio, novelty-effect
  6. primacy-effect, dashboard-pin, metric-tree, driver-tree, anomaly-band, seasonal-cycle, trend-break, changepoint, attribution-model, marginal-roi

### cloud (+50)

  1. region-pair, zone-spread, failover-region, active-active, active-passive, pilot-light, warm-standby, object-lock, lifecycle-rule, egress-fee
  2. dr-drill, pilot-light, warm-standby, backup-tier, object-lock, glacier-tier, lifecycle-rule, intelligent-tier, egress-fee, ingress-free
  3. vpc-peering, transit-gateway, endpoint-private, service-endpoint, nat-gw, elastic-ip, ipv6, dual-stack, dns-failover, health-probe
  4. origin-shield, cache-hit, cache-miss, purge-cache, stale-while-revalidate, edge-config, kv-edge, durable-object, queue-cloud, fanout-sns
  5. dead-letter-cloud, event-bus, schema-registry-cloud, api-quota, burst-limit, reserved-capacity, reserved-discount, commitment, cost-anomaly, rightsizing

### automation (+50)

  1. for-each, try-block, catch-block, finally-block, throw-error, rate-window, concurrency-limit, semaphore, backoff-exponential, scatter-gather
  2. while-loop, until-loop, break-loop, continue-loop, try-block, catch-block, finally-block, throw-error, wait-until, wait-event
  3. debounce-flow, throttle-flow, rate-window, concurrency-limit, semaphore, mutex-flow, queue-worker, queue-priority, delay-queue, cron-expression
  4. jitter, backoff-exponential, idempotency-key, exactly-once, at-least-once, dedupe-window, saga, compensate, two-phase, outbox
  5. inbox-pattern, claim-check, scatter-gather, aggregate-flow, enrich-step, content-router, message-split, resequencer, human-in-loop, form-step

### mcp (+10)

  1. mcp-batch, mcp-timeout, mcp-elicit-confirm, mcp-version, mcp-oauth, mcp-scope, mcp-server-dev, mcp-server-test, mcp-subscribe, mcp-ping

## Legacy debt (recorded 2026-08-29)

Nine pre-existing pairs sit at IoU >= 0.90 without being family grammar:
log/audit-log, vote/stash, chart-gauge/metric, fine-tune/instruct-model,
lint-run/firewall-rule, migrate/websocket, scale-up+scale-down/null,
approval/billing, calendar-trigger/calendar-off+alert. They predate the plan;
fixing them is its own round, on the user's word.

## Known risks, written down before they bite

- **Release noise**: 10 phases = 10 patch releases (0.3.7 … 0.3.16). Fine by the
  patch-only policy; do not hand-bump.
- **Flutter package weight**: lib/src/generated doubles. pub.dev caps packages at
  100 MB compressed — measure the tarball at phase 3 and phase 6; if the trend
  breaks the cap before 2,041, split data out before it becomes an emergency.
- **twins runtime is O(n²)**: ~4× slower at 2,041. Still fine; revisit before any 5k.
- **Web export**: ~2× pages (~15k files). Watch the first phase deploy's build time.
- **Vocabulary exhaustion is real**: 98 of the first 1,008 candidate names were
  already taken. The reserve rule: a swapped-out concept is struck through here,
  its replacement checked against taken names *before* drawing.
