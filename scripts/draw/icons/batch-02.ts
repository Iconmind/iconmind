/**
 * Batch 02 — the vocabulary in use.
 *
 * Batch 01 invented every body it needed. This one mostly composes: `machine()` where the
 * thing is built, `panel()` where a person handles it, `ring()` and `lattice()` where the
 * thing is a whole with a middle. That is the point of `bodies.ts` — a proportion is decided
 * once and then inherited, so batch forty looks like batch one without anybody remembering
 * how wide a box was.
 *
 * Where a concept needs a shape the vocabulary does not have, the shape is built from the
 * primitives and left here until a second concept wants it. Bodies earn their place by being
 * used twice; promoting one on first use is how a vocabulary fills up with things nobody
 * needs.
 */
import { col, disc, frame, openDisc, poly, rect, row } from "../forms.ts";
import { core, machine, machineWide, page, panel, ring } from "../bodies.ts";
import type { Icon } from "../build.ts";

export const BATCH_02: Icon[] = [
  /* ── What a model is, and what it does ────────────────────────────────────────── */

  {
    slug: "llm", category: "ai", subcategory: "model",
    name: "LLM", description: "A large language model — the generative AI system behind chat, completion and reasoning",
    tags: ["language", "model", "generative"], family: "machine",
    aliases: ["language-model"], keywords: ["gpt", "large language model", "chatbot"],
    // A machine full of language. Three rules, ragged, because that is what text looks
    // like from far enough away — `database`'s two run the full width, and the difference
    // between ragged and flush is what tells prose from records at sixteen pixels.
    shapes: [machineWide(), row(9, 6, 18), row(12.5, 6, 15), row(16, 6, 12)],
  },

  {
    slug: "inference", category: "ai", subcategory: "inference",
    name: "Inference", description: "Inference — running a trained model to produce a prediction, a completion or a generated output",
    tags: ["run", "predict", "generate"], family: "machine",
    aliases: ["predict"], keywords: ["forward pass", "generate", "serving"],
    // The play mark inside the machine. Inference is the model doing its one job, so the
    // icon is the body plus the sign for "go" and nothing else.
    shapes: [machine(), poly([[10, 8], [14, 12], [10, 16]])],
  },

  {
    slug: "temperature", category: "ai", subcategory: "inference",
    name: "Temperature", description: "Temperature, the sampling setting that controls how much randomness a model's output is allowed",
    tags: ["randomness", "sampling", "creativity"], family: "gauge",
    keywords: ["top-p", "sampling", "creativity", "thermometer"],
    // A thermometer, because the parameter borrowed the word and every reader already
    // knows the picture. The ticks are on one side only: symmetrical ticks read as a
    // ladder.
    shapes: [disc(12, 18, 3), col(12, 4, 15), row(8, 14.5, 18), row(12, 14.5, 18)],
  },

  {
    slug: "chain-of-thought", category: "ai", subcategory: "prompt",
    name: "Chain of thought", description: "Chain-of-thought reasoning — a model working through a problem one visible step at a time",
    tags: ["reasoning", "steps", "thinking"], family: "chain",
    aliases: ["reasoning"], keywords: ["cot", "step by step", "scratchpad"],
    // Three steps on a diagonal. Laid out in a row they read as a pipeline, where the work
    // is the same at every stage; on a diagonal they read as one thing leading to the next.
    shapes: [
      disc(6, 6, 2), poly([[7.5, 7.5], [10.5, 10.5]]),
      disc(12, 12, 2), poly([[13.5, 13.5], [16.5, 16.5]]),
      disc(18, 18, 2),
    ],
  },

  {
    slug: "tokenizer", category: "ai", subcategory: "token",
    name: "Tokenizer", description: "A tokenizer that splits text into the subword tokens a language model reads and counts",
    tags: ["split", "segment", "encode"], family: "rails",
    keywords: ["bpe", "subword", "vocab", "encoding"],
    // The whole above, the pieces below. Cuts drawn *through* the run made a hash — two
    // verticals crossing a horizontal is that character and nothing else. Showing the
    // before and the after says what the cutting was for.
    shapes: [
      row(5, 3, 21),
      row(12, 3, 9), row(12, 12, 21),
      row(19, 3, 13), row(19, 16, 21),
    ],
  },

  {
    slug: "context-window", category: "ai", subcategory: "context",
    name: "Context window", description: "The context window — how many tokens a model can see and reason over at once",
    tags: ["span", "window", "limit"], family: "bracket",
    aliases: ["context"], keywords: ["context length", "window size", "attention span"],
    // Two brackets and what is between them. A box would say "container"; brackets say
    // "this much and no more", which is the whole idea.
    shapes: [
      poly([[8, 6], [5, 6], [5, 18], [8, 18]]),
      poly([[16, 6], [19, 6], [19, 18], [16, 18]]),
      core(3),
    ],
  },

  {
    slug: "vector", category: "ai", subcategory: "embedding",
    name: "Vector", description: "A vector — an arrow with a direction and a magnitude, the basic unit of embeddings and linear algebra",
    tags: ["arrow", "direction", "magnitude"], family: "arrow",
    keywords: ["euclidean", "coordinates", "magnitude"],
    // Drawn from the bottom left, which is where a reader's mental origin is. The head is a
    // corner rather than a chevron: a corner is two of this set's three angles meeting, and
    // a chevron here would be the same mark `upload` uses.
    shapes: [poly([[3, 21], [20, 4]]), poly([[13, 4], [20, 4], [20, 11]])],
  },

  /* ── Making a model better ────────────────────────────────────────────────────── */

  {
    slug: "training", category: "ai", subcategory: "training",
    name: "Training", description: "Training — teaching a model from data by adjusting its weights over many epochs",
    tags: ["learn", "fit", "epoch"], family: "machine",
    aliases: ["learning"], keywords: ["epoch", "gradient", "loss curve", "train"],
    // A curve that climbs, inside the machine it is climbing for. Falling, the same line is
    // a loss curve and means the opposite, so it climbs.
    shapes: [machine(), poly([[7, 16], [10, 13], [13, 16], [17, 12]])],
  },

  {
    slug: "fine-tuning", category: "ai", subcategory: "training",
    name: "Fine-tuning", description: "Fine-tuning — adapting an already trained model to one domain, task or style with extra data",
    tags: ["adapt", "tune", "specialise"], family: "machine",
    aliases: ["finetune"], keywords: ["lora", "adapter", "peft", "domain adaptation"],
    // Two rails and two knobs, inside the machine. One of each crossed at the centre and
    // came out a dagger — a cross in a box is a cross in a box, whatever it was meant to
    // be. `parameters` is this idea outside a body: settings you choose, rather than a
    // change made to the model itself.
    shapes: [
      machine(), row(11, 7, 17), col(14, 9, 13), row(15, 7, 17), col(10, 13, 17),
    ],
  },

  {
    slug: "dataset", category: "ai", subcategory: "training",
    name: "Dataset", description: "A dataset — the collection of examples, rows or documents a model is trained and evaluated on",
    tags: ["data", "table", "corpus"], family: "window",
    aliases: [], keywords: ["training data", "samples", "records", "table", "corpus"],
    // Rows and a column: the shape of data laid out, not the shape of the box it came in.
    shapes: [panel(), row(10, 3, 21), row(14, 3, 21), col(9, 6, 18)],
  },

  {
    slug: "evaluation", category: "ai", subcategory: "evaluation",
    name: "Evaluation", description: "Evaluation — measuring how good a model's output is with tests, scores and benchmarks",
    tags: ["measure", "score", "test"], family: "machine",
    aliases: ["eval"], keywords: ["benchmark", "score", "quality", "assessment"],
    // The mark from `check`, put inside a machine. The pair is the family working: a tick
    // on its own means "done", and a tick in a body means "this body passed".
    shapes: [machine(), poly([[8, 12], [11, 15], [16, 10]])],
  },

  {
    slug: "guardrail", category: "ai", subcategory: "safety",
    name: "Guardrail", description: "A guardrail — a safety limit the model's output is not allowed to cross",
    tags: ["limit", "safety", "constraint"], family: "rails",
    aliases: ["constraint"], keywords: ["safety", "policy", "moderation", "boundary"],
    // Something moving, and the wall it does not get past. Two rails with a dot between
    // them was the first drawing and it read as a pause button — a symmetrical arrangement
    // has no direction, and a guardrail is entirely about direction.
    shapes: [col(18, 4, 20), row(12, 4, 14), poly([[11, 9], [14, 12], [11, 15]])],
  },

  /* ── Agents ───────────────────────────────────────────────────────────────────── */

  {
    slug: "multi-agent", category: "agents", subcategory: "multi-agent",
    name: "Multi-agent", description: "A multi-agent system — several AI agents collaborating, delegating and voting on one problem",
    tags: ["swarm", "team", "collaboration"], family: "orbit",
    aliases: ["swarm"], keywords: ["crew", "team of agents", "orchestration"],
    // Two of `agent`'s ring, at the size where two fit with a real gap between them. Three
    // would fit only by shrinking each below the size its own gap stays visible at.
    shapes: [openDisc(8, 8, 4.5), openDisc(16, 16, 4.5)],
  },

  {
    slug: "goal", category: "agents", subcategory: "planning",
    name: "Goal", description: "A goal — the target or objective an agent, a team or a project is working toward",
    tags: ["target", "objective", "aim"], family: "orbit",
    aliases: ["target"], keywords: ["objective", "aim", "bullseye"],
    // Three rings closing on a centre. `agent` is one ring and a core; this is the same
    // family saying "the middle is the point" rather than "the middle is where it lives".
    shapes: [ring(), openDisc(12, 12, 5.5), core(1)],
  },

  {
    slug: "memory", category: "agents", subcategory: "memory",
    name: "Memory", description: "Agent memory — what an AI agent writes down and reads back between steps and sessions",
    tags: ["recall", "store", "state"], family: "window",
    aliases: ["recall"], keywords: ["context store", "long-term memory", "state", "ram"],
    // Three columns in a panel — a module, not a box of records. `dataset` puts rows in the
    // same panel because data is read across; memory is addressed down.
    shapes: [panel(), col(8, 9, 15), col(12, 9, 15), col(16, 9, 15)],
  },

  {
    slug: "plan", category: "agents", subcategory: "planning",
    name: "Plan", description: "A plan — the ordered list of steps an agent intends to take before it acts",
    tags: ["steps", "checklist", "sequence"], family: "page",
    keywords: ["todo", "checklist", "task list", "roadmap"],
    // A page with one line done. Every line ticked would be a completed plan, and no line
    // ticked would be a page — one is what makes it a plan in progress.
    shapes: [page(), row(9, 9, 15), poly([[9, 15], [11, 17], [15, 13]])],
  },

  /* ── The wire between things ──────────────────────────────────────────────────── */

  {
    slug: "chunk", category: "rag", subcategory: "chunking",
    name: "Chunk", description: "A chunk — one piece of a document, split to a size that suits retrieval and embedding",
    tags: ["piece", "split", "segment"], family: "window",
    keywords: ["chunking", "passage", "window", "overlap"],
    // The document already cut. Drawn as a page with a line through it — twice, once down
    // and once across — it read as a pane layout both times: a box divided is a box with
    // regions, not a thing that came off something. Three pieces, no container, and the
    // chunking has already happened.
    shapes: [rect(4, 3, 16, 4, 2), rect(4, 10, 16, 4, 2), rect(4, 17, 16, 4, 2)],
  },

  {
    slug: "pipeline", category: "data", subcategory: "pipeline",
    name: "Pipeline", description: "A pipeline — work moving through stages in order, from data ingestion to a finished output",
    tags: ["stages", "flow", "sequence"], family: "pill",
    aliases: ["planning"], keywords: ["etl", "dag", "stages", "flow", "workflow"],
    // Three stages in a line. `chain-of-thought` puts its three on a diagonal because each
    // step follows from the last; here the stages are equal and the work simply passes.
    shapes: [rect(2, 8, 20, 8, 4), row(12, 6, 12), poly([[12.5, 9.5], [15, 12], [12.5, 14.5]])],
  },

  {
    slug: "stream", category: "data", subcategory: "streaming",
    name: "Stream", description: "A stream — data or tokens arriving continuously in real time rather than in batches",
    tags: ["flow", "continuous", "realtime"], family: "rails",
    aliases: ["streaming"], keywords: ["kafka", "realtime", "event stream", "tokens"],
    // Three runs, offset. Flush left they would be a paragraph; offset they read as
    // something passing the frame rather than sitting in it.
    shapes: [row(6, 2, 16), row(12, 8, 22), row(18, 2, 16)],
  },
];
