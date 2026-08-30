/**
 * Batch 32 — how much room is left, and what happens when there is none.
 *
 * The four `context-*` icons are one argument in four pictures: a window has a size, things
 * go into it, it fills, and then it spills. They are drawn as the same box seen four ways
 * rather than four unrelated diagrams, because that is how the concept is actually taught.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import { machine, page } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_32: Icon[] = [
  /* ── The window, and the four things that happen to it ────────────────────────── */

  {
    slug: "context-assembly", category: "rag", subcategory: "retrieval",
    name: "Context assembly", description: "Context assembly — the retrieved pieces gathered and composed into one prompt",
    tags: ["gather", "compose", "build"], family: "window",
    aliases: [], keywords: ["compose prompt", "stuffing", "gather", "assemble", "build context"],
    shapes: [rect(13, 6, 9, 12, 2), row(8, 2, 13), row(12, 2, 13), row(16, 2, 13)],
  },
  {
    slug: "context-budget", category: "rag", subcategory: "retrieval",
    name: "Context budget", description: "A context budget — how much room is left in the window for more tokens",
    tags: ["room", "remaining", "size"], family: "window",
    aliases: [], keywords: ["remaining tokens", "headroom", "window size", "capacity"],
    // A box with one line through it is `inbox-empty`. What is used has to be in it.
    shapes: [rect(2, 4, 20, 16, 2), row(8, 6, 18), row(11, 6, 14), row(14, 2, 22)],
  },
  {
    slug: "context-injection", category: "rag", subcategory: "retrieval",
    name: "Context injection", description: "Context injection — putting extra material into the prompt before the model sees it",
    tags: ["insert", "prepend", "add"], family: "window",
    aliases: [], keywords: ["inject", "prepend", "system prompt", "insert", "augment"],
    shapes: [rect(9, 3, 12, 18, 2), row(12, 2, 9), poly([[6, 9], [9, 12], [6, 15]])],
  },
  {
    slug: "context-overflow", category: "rag", subcategory: "retrieval",
    name: "Context overflow", description: "Context overflow — more tokens than the window will hold, so something gets truncated",
    tags: ["spill", "too-much", "truncate"], family: "window",
    aliases: [], keywords: ["too long", "truncated", "exceeds window", "spill", "dropped"],
    // The lines run out through the right wall rather than stopping at it. That is the whole
    // difference between this and `context-budget`, and it is the whole meaning.
    shapes: [rect(2, 6, 16, 12, 2), row(9, 14, 22), row(15, 14, 22)],
  },

  /* ── Quantities, measured ─────────────────────────────────────────────────────── */

  {
    slug: "confidence", category: "ai", subcategory: "inference",
    name: "Confidence", description: "Confidence — how sure the model is about its answer, a certainty score",
    tags: ["certainty", "score", "sure"], family: "meter",
    aliases: ["certainty"], keywords: ["probability", "certainty", "logprob", "score", "sure"],
    shapes: [disc(5, 19, 2), disc(12, 12, 2), disc(19, 5, 3)],
  },
  {
    slug: "counter", category: "analytics", subcategory: "metric",
    name: "Counter", description: "A counter — a number that only ever goes up, a running tally",
    tags: ["tally", "count", "odometer"], family: "meter",
    aliases: ["tally"], keywords: ["count", "increment", "odometer", "total", "monotonic"],
    shapes: [rect(2, 7, 20, 10, 2), col(9, 7, 17), col(15, 7, 17)],
  },
  {
    slug: "delta", category: "analytics", subcategory: "metric",
    name: "Delta", description: "A delta — how much a value moved since last time, the difference",
    tags: ["change", "difference", "since"], family: "figure",
    aliases: ["change"], keywords: ["difference", "change", "diff value", "since last", "shift"],
    shapes: [poly([[3, 17], [12, 8], [21, 17]], true)],
  },
  {
    slug: "conversion", category: "analytics", subcategory: "segment",
    name: "Conversion", description: "A conversion — one thing became another, a visitor turned into a customer",
    tags: ["became", "turned", "rate"], family: "figure",
    aliases: [], keywords: ["converted", "signup rate", "became", "funnel end", "turned into"],
    shapes: [
      disc(6, 6, 3), poly([[10, 10], [12, 12]]),
      poly([[14.5, 11.5], [14.5, 14.5], [11.5, 14.5]]),
      poly([[18.5, 15], [22, 18.5], [18.5, 22], [15, 18.5]], true),
    ],
  },
  {
    slug: "cosine", category: "rag", subcategory: "vector",
    name: "Cosine similarity", description: "Cosine similarity — the angle between two vectors as a closeness score",
    tags: ["angle", "distance", "score"], family: "figure",
    aliases: [], keywords: ["cosine", "angle", "dot product", "similarity metric", "vectors"],
    shapes: [poly([[4, 20], [20, 4]]), poly([[4, 20], [20, 20]]), arc(4, 20, 7, 270, 315)],
  },

  /* ── Ordering, and looking closer ─────────────────────────────────────────────── */

  {
    slug: "bm25", category: "rag", subcategory: "ranking",
    name: "BM25", description: "BM25 — results ranked by how well the query's words match the document",
    tags: ["ranking", "keyword", "score"], family: "figure",
    aliases: [], keywords: ["okapi", "keyword ranking", "lexical", "tf-idf", "sparse"],
    shapes: [
      disc(3, 7, 1), row(7, 6, 21), disc(3, 12, 1), row(12, 6, 17), disc(3, 17, 1), row(17, 6, 13),
    ],
  },
  {
    slug: "drilldown", category: "analytics", subcategory: "dashboard",
    name: "Drill down", description: "Drill down — open the thing inside the thing and go a level deeper",
    tags: ["expand", "deeper", "nested"], family: "figure",
    aliases: [], keywords: ["expand", "nested", "break down", "explore", "deeper"],
    shapes: [row(5, 3, 21), poly([[6, 9], [6, 13], [21, 13]]), poly([[10, 15], [10, 19], [21, 19]])],
  },
  {
    slug: "bring-front", category: "interface", subcategory: "layout",
    name: "Bring to front", description: "Bring to front — put this object on top of the others in the stack",
    tags: ["layer", "raise", "above"], family: "figure",
    aliases: [], keywords: ["z-order", "raise", "on top", "front", "layer"],
    shapes: [rect(2, 10, 12, 10, 2), rect(10, 4, 12, 10, 2)],
  },
  {
    slug: "drag-handle", category: "interface", subcategory: "action",
    name: "Drag handle", description: "A drag handle — the grip you take hold of to move or reorder an item",
    tags: ["grip", "move", "reorder"], family: "figure",
    aliases: ["grip"], keywords: ["grip", "reorder", "handle", "move", "drag"],
    shapes: [
      disc(8, 6, 1), disc(16, 6, 1), disc(8, 12, 1),
      disc(16, 12, 1), disc(8, 18, 1), disc(16, 18, 1),
    ],
  },

  /* ── Data, and what leaves with it ────────────────────────────────────────────── */

  {
    slug: "data-contract", category: "data", subcategory: "quality",
    name: "Data contract", description: "A data contract — the schema both producer and consumer agreed on",
    tags: ["schema", "agreed", "promise"], family: "page",
    aliases: [], keywords: ["schema agreement", "producer consumer", "promise", "interface"],
    shapes: [page(), row(11, 7, 17), col(12, 11, 18)],
  },
  {
    slug: "data-catalog", category: "data", subcategory: "catalog",
    name: "Data catalogue", description: "A data catalogue — an inventory of what data there is and where it lives",
    tags: ["inventory", "index", "registry"], family: "figure",
    aliases: [], keywords: ["inventory", "metadata store", "discovery", "registry", "glossary"],
    shapes: [rect(2, 3, 20, 7, 2), row(6.5, 5, 10), rect(2, 14, 20, 7, 2), row(17.5, 5, 10)],
  },
  {
    slug: "data-exfiltration", category: "security", subcategory: "threat",
    name: "Data exfiltration", description: "Data exfiltration — data that left the system when it should not have, a leak",
    tags: ["leak", "stolen", "out"], family: "figure",
    aliases: ["data-leak"], keywords: ["leak", "stolen data", "egress", "breach", "siphoned"],
    shapes: [rect(2, 6, 12, 12, 2), row(12, 10, 20), poly([[17, 9], [20, 12], [17, 15]])],
  },
  {
    slug: "date-range", category: "interface", subcategory: "time",
    name: "Date range", description: "A date range — from one day to another, a period between two dates",
    tags: ["period", "between", "span"], family: "window",
    aliases: [], keywords: ["period", "from to", "between dates", "span", "calendar range"],
    shapes: [
      rect(2, 5, 20, 15, 2), row(9, 2, 22), disc(7, 14, 1), row(14, 8, 16), disc(17, 14, 1),
    ],
  },
  {
    slug: "description", category: "interface", subcategory: "action",
    name: "Description", description: "A description — the longer text field beneath a name where the notes go",
    tags: ["text", "field", "notes"], family: "window",
    aliases: ["notes"], keywords: ["textarea", "notes", "detail", "body text", "long field"],
    shapes: [rect(2, 5, 20, 14, 2), row(10, 6, 18), row(14, 6, 14)],
  },

  /* ── Models for things that are not words ─────────────────────────────────────── */

  {
    slug: "audio-model", category: "ai", subcategory: "multimodal",
    name: "Audio model", description: "An audio model — a model that works on sound, listening or transcribing speech",
    tags: ["speech", "whisper", "listen"], family: "machine",
    aliases: [], keywords: ["whisper", "asr", "speech model", "sound", "listening"],
    shapes: [machine(), col(9, 9, 15), col(12, 7, 17), col(15, 9, 15)],
  },
  {
    slug: "diffusion", category: "ai", subcategory: "model",
    name: "Diffusion", description: "Diffusion — noise resolved step by step into a picture by a generative model",
    tags: ["denoise", "image", "steps"], family: "figure",
    aliases: [], keywords: ["stable diffusion", "denoising", "latent", "image model", "steps"],
    shapes: [disc(4, 8, 1), disc(4, 16, 1), disc(8, 12, 1), rect(12, 6, 10, 12, 2)],
  },
  {
    slug: "alignment", category: "ai", subcategory: "training",
    name: "Alignment", description: "Alignment — bringing a model round to what people actually want, steering with feedback",
    tags: ["rlhf", "steer", "agree"], family: "figure",
    aliases: [], keywords: ["rlhf", "dpo", "steering", "values", "helpful harmless"],
    shapes: [
      poly([[3, 7], [9, 7], [13, 11]]), poly([[3, 17], [9, 17], [13, 13]]),
      row(12, 13, 18), poly([[16, 9], [19, 12], [16, 15]]),
    ],
  },
  {
    slug: "blur", category: "interface", subcategory: "media",
    name: "Blur", description: "Blur — softened until it is no longer readable, hidden or obscured",
    tags: ["soften", "hide", "obscure"], family: "orbit",
    aliases: [], keywords: ["gaussian", "soften", "obscure", "out of focus", "redact visually"],
    shapes: [disc(12, 12, 4), arc(12, 12, 8, 20, 160), arc(12, 12, 8, 200, 340)],
  },
];
