/**
 * Batch 52 — round 1 of the 1k plan: the model lifecycle around the model itself.
 *
 * Family discipline: everything `model-*` shortens or quotes `model`'s machine and
 * diamond; `checkpoint-*` carries `checkpoint`'s flag on its pole; `model-fork` is
 * `fork`'s exact geometry with the source dot promoted to the model diamond. The
 * planned `epoch-cycle` was swapped for `gradient-descent` — three counted turns
 * already exist as `epoch`, and the same silhouette twice is an alias, not an icon.
 */
import { col, disc, frame, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

export const BATCH_52: Icon[] = [
  /* ── The model as a thing you describe ────────────────────────────────────────── */

  {
    slug: "model-card", category: "ai", subcategory: "model",
    name: "Model card", description: "What this model is, on one page",
    tags: ["spec", "sheet", "readme"], family: "page",
    aliases: [], keywords: ["model card", "spec sheet", "capabilities", "limitations"],
    // A page carrying the model's diamond where a portrait would go, facts below.
    shapes: [
      rect(5, 2, 14, 20, 2),
      poly([[12, 6.5], [14.5, 9], [12, 11.5], [9.5, 9]], true),
      row(15, 9, 15), row(18, 9, 13),
    ],
  },
  {
    slug: "model-registry-entry", category: "ai", subcategory: "model",
    name: "Model registry entry", description: "One model on the shelf, picked out",
    tags: ["catalog", "shelf", "version"], family: "machine",
    aliases: [], keywords: ["registry", "catalog entry", "model version", "artifact"],
    // `registry`'s window, holding one row whose bullet is the model's diamond —
    // the entry, in the place the catalog keeps it.
    shapes: [
      rect(2, 3, 20, 18, 2), row(8, 2, 22),
      poly([[7, 12.5], [9, 14.5], [7, 16.5], [5, 14.5]], true), row(14.5, 12, 18),
    ],
  },
  {
    slug: "model-license", category: "ai", subcategory: "model",
    name: "Model license", description: "What you may do with the weights",
    tags: ["terms", "seal", "open"], family: "machine",
    aliases: ["model-licence"], keywords: ["license", "open weights", "terms of use", "commercial"],
    // A certificate seal with the model's diamond struck into it, ribbons below.
    // machine()+check was drawn first and the twins gate returned IoU 1.00 against
    // `model-check` — that drawing is taken; the seal is the license, not the pass.
    shapes: [
      disc(12, 10, 7),
      poly([[12, 6.5], [15.5, 10], [12, 13.5], [8.5, 10]], true),
      col(9.5, 17.5, 21), col(14.5, 17.5, 21),
    ],
  },
  {
    slug: "model-size", category: "ai", subcategory: "model",
    name: "Model size", description: "How big the thing actually is",
    tags: ["parameters", "measure", "footprint"], family: "machine",
    aliases: [], keywords: ["parameter count", "7b", "70b", "vram fit", "footprint"],
    // The diamond at two parameter counts, side by side the way type sizes are
    // shown — the big one and the small one are the same model.
    shapes: [
      poly([[10, 3], [17, 10], [10, 17], [3, 10]], true),
      poly([[18, 14], [21.5, 17.5], [18, 21], [14.5, 17.5]], true),
    ],
  },

  /* ── Where models come from ───────────────────────────────────────────────────── */

  {
    slug: "model-family", category: "ai", subcategory: "model",
    name: "Model family", description: "One base, several descendants",
    tags: ["lineage", "variants", "tree"], family: "machine",
    aliases: [], keywords: ["model lineage", "base model", "variants", "sizes"],
    // `agent-hierarchy`'s orthogonal tree with diamonds for nodes: stem, rail and
    // drops meet the diamonds at their points — everything joins, nothing floats.
    shapes: [
      poly([[12, 2], [15, 5], [12, 8], [9, 5]], true),
      col(12, 8, 12), poly([[6, 15], [6, 12], [18, 12], [18, 15]]),
      poly([[6, 15], [9, 18], [6, 21], [3, 18]], true),
      poly([[18, 15], [21, 18], [18, 21], [15, 18]], true),
    ],
  },
  {
    slug: "model-fork", category: "ai", subcategory: "model",
    name: "Model fork", description: "Take the weights and go your own way",
    tags: ["diverge", "finetune", "copy"], family: "machine",
    aliases: [], keywords: ["fork model", "diverge", "custom weights", "derivative"],
    // `fork`'s drawing with the source dot promoted to the model diamond. The arms
    // start on the diamond's lower edges and land on the dots' strokes — connected,
    // the way `fork` itself connects.
    shapes: [
      poly([[12, 4], [14.5, 6.5], [12, 9], [9.5, 6.5]], true),
      poly([[10.5, 7.5], [5.5, 12.5]]), poly([[13.5, 7.5], [18.5, 12.5]]),
      disc(4.5, 14.5, 2), disc(19.5, 14.5, 2),
    ],
  },

  /* ── Saved states of the training run ─────────────────────────────────────────── */

  {
    slug: "checkpoint-save", category: "ai", subcategory: "training",
    name: "Checkpoint save", description: "Write the state down before going on",
    tags: ["flag", "write", "state"], family: "figure",
    aliases: [], keywords: ["save checkpoint", "snapshot weights", "resume point"],
    // `checkpoint`'s flag, and the state going down into storage beside it.
    shapes: [
      col(5, 3, 21), poly([[5, 5], [15, 5], [15, 11], [5, 11]]),
      col(19, 13, 19), poly([[16.5, 16.5], [19, 19], [21.5, 16.5]]),
    ],
  },
  {
    slug: "checkpoint-load", category: "ai", subcategory: "training",
    name: "Checkpoint load", description: "Pick up exactly where it stopped",
    tags: ["flag", "resume", "restore"], family: "figure",
    aliases: [], keywords: ["load checkpoint", "resume training", "restore weights"],
    // `checkpoint-save` with the arrow turned around — a direction pair, the way
    // `backup`/`restore` are.
    shapes: [
      col(5, 3, 21), poly([[5, 5], [15, 5], [15, 11], [5, 11]]),
      col(19, 13, 19), poly([[16.5, 15.5], [19, 13], [21.5, 15.5]]),
    ],
  },
  {
    slug: "checkpoint-compare", category: "ai", subcategory: "training",
    name: "Checkpoint compare", description: "This saved state against that one",
    tags: ["flags", "versus", "pick"], family: "figure",
    aliases: [], keywords: ["compare checkpoints", "best checkpoint", "eval per save"],
    // Two flags at different heights on their own poles — two moments of the same
    // run, side by side.
    shapes: [
      col(4, 3, 21), poly([[4, 5], [10.5, 5], [10.5, 10], [4, 10]]),
      col(14, 3, 21), poly([[14, 9], [20.5, 9], [20.5, 14], [14, 14]]),
    ],
  },

  /* ── Getting to the bottom ────────────────────────────────────────────────────── */

  {
    slug: "gradient-descent", category: "ai", subcategory: "training",
    name: "Gradient descent", description: "Downhill until there is no downhill left",
    tags: ["optimize", "minimum", "valley"], family: "chart",
    aliases: [], keywords: ["optimizer", "loss minimum", "converge", "training step"],
    // Steps down and to the right, and the dot on the lowest landing — each tread
    // one update, the dot the minimum every step was headed for.
    shapes: [
      poly([[3, 3], [9, 3], [9, 9], [15, 9], [15, 15], [21, 15]]),
      disc(19, 19, 2),
    ],
  },
];
