/** Design tokens — the code mirror of CANON C4. Do not change without changing CANON. */
export const CANVAS = 24;
export const VIEW_BOX = "0 0 24 24";
/**
 * Measured, not chosen: at 2.5 seven of ten icons exceeded 34% ink coverage, well past
 * the ~29% that established sets sit at. The presence we wanted came from widening the
 * live area to 2..22, not from a heavier stroke.
 */
export const STROKE_WIDTH = 2;
/** Anchor point bounds. Ink stops at 2..22 because a 2px stroke bleeds 1px past the axis. */
export const ANCHOR_MIN = 2;
export const ANCHOR_MAX = 22;
export const GRID_SNAP = 0.5;
export const MIN_ELEMENT_SIZE = 2;
/**
 * Exact values `icons:new` seeds. The validator compares against these rather than
 * looking for the word "todo", because "todo" is a perfectly good tag for `plan`.
 */
export const SCAFFOLD_DESCRIPTION = "todo one sentence describing the concept, not the drawing";
export const SCAFFOLD_TAGS = ["todo", "add", "real tags"] as const;

/** House signature: containers cut their corners at 45° instead of rounding them. */
/**
 * Corner radius, proportional to the shape it is on.
 *
 * A single radius was the mistake. 5 for everything turned every container into a capsule,
 * so three icons drawn to establish a language all came out as the same shape with
 * different things inside. Lucide's rule is proportional and it is the reason their set
 * holds together across 1500 icons: a corner belongs to the shape it is on, not to the
 * set.
 *
 * What makes this set premium is not a stroke treatment nobody else uses. Phosphor does
 * not differ from Lucide by inventing one; it differs by having weights and fills. Trying
 * to win on both at once is how the first attempt ended up inconsistent at both.
 */
export const CORNER_LARGE = 2;   // shapes 8px and over
export const CORNER_SMALL = 1;   // shapes under 8px
export const CORNER_THRESHOLD = 8;
/**
 * Longest segment still treated as a dot (a round linecap renders it as a circle).
 *
 * The canonical form is `h.01`, not `h0`. A truly zero-length subpath is rendered
 * inconsistently once an optimizer rewrites it as a closepath, so the whole ecosystem
 * uses a hair of length instead. The 0.01 endpoint is an artefact of that idiom, not a
 * real coordinate, so `grid-snap` skips it.
 */
/**
 * A dot is a circle, not a stroke trick.
 *
 * The old set drew dots as `h.01` with a round cap, which paints a disc. Terminals are
 * square now, so the same trick paints a tiny square — the idiom does not survive the
 * treatment change and there is no reason to keep it when `<circle>` says what it means.
 */
export const DOT_RADIUS = 1.25;
/**
 * The daylight left between two parallel strokes, beyond the stroke itself.
 *
 * The gap that matters is centre-to-centre minus the stroke width, so the threshold is
 * `weight + this`, not a fixed number scaled by the weight. Written the old way it was 2
 * at regular — which is two strokes touching — and 2.5 at bold, which is also two strokes
 * touching. `mcp-resource-list` sat at exactly the minimum and the bold weight painted its
 * three rows as one solid block, with nothing to say so.
 */
export const MIN_STROKE_GAP = 0.5;
export const MIN_INTERIOR_GAP = 3;
export const MAX_CHILDREN = 12;
export const MAX_CROSSINGS = 2;
/**
 * 1500 was set when cells were hand-drawn arcs. They are generated now, and an offset
 * curve comes back as cubics — `agent-thinking`'s duotone is 1598 bytes carrying three
 * discs, two orbit arcs, and a tint of all five. The ceiling exists to catch a runaway
 * path, not to punish a concept for having curves; measured largest in the set is 1598.
 */
export const MAX_BYTES = 2200;
export const ELEMENT_BUDGET_WARN = 6;
/**
 * Angles preferred for straight segments. Enforced as a WARNING, not an error.
 *
 * As a hard rule this banned the gentle diagonals and arc tangents that make a set look
 * drawn rather than generated. It stays as a nudge because most segments really should
 * land on these angles — but a rule that forbids craft is worse than no rule.
 */
export const ALLOWED_ANGLES = [0, 30, 45, 60, 90, 120, 135, 150, 180] as const;
export const ANGLE_TOLERANCE = 1.5;

export const ALLOWED_ELEMENTS = [
  "path", "circle", "rect", "line", "polyline", "polygon", "ellipse",
] as const;

export const FORBIDDEN_ELEMENTS = [
  "style", "text", "tspan", "image", "defs", "filter", "mask",
  "clipPath", "use", "metadata", "title", "desc", "script", "animate",
] as const;

export const FORBIDDEN_ATTRS = [
  "style", "class", "id", "transform", "stroke-dasharray", "stroke-dashoffset",
] as const;

/** CANON C5 — canonical order. */
export const DOMAINS = [
  "ai", "agents", "mcp", "rag", "data", "devops",
  "cloud", "security", "automation", "analytics", "devtools", "interface",
] as const;
export type Domain = (typeof DOMAINS)[number];

export const DOMAIN_TITLE: Record<Domain, string> = {
  ai: "AI & LLM", agents: "Agents", mcp: "MCP", rag: "RAG & Search",
  data: "Data Engineering", devops: "DevOps", cloud: "Cloud", security: "Security",
  automation: "Automation", analytics: "Analytics", devtools: "Developer Tools",
  interface: "Interface",
};

/** CANON C5 / doc 02 §2.4 — subcategories per domain. */
export const SUBCATEGORIES: Record<Domain, readonly string[]> = {
  ai: ["model","inference","prompt","token","context","embedding","training","evaluation","safety","multimodal"],
  agents: ["agent-core","multi-agent","planning","execution","reflection","memory","tool-use","communication","lifecycle"],
  mcp: ["server","client","resource","tool","prompt","transport","sampling","registry"],
  rag: ["ingestion","chunking","retrieval","ranking","vector","knowledge","grounding"],
  data: ["pipeline","transform","storage","streaming","quality","catalog","orchestration","relational","modelling"],
  devops: ["ci-cd","container","orchestration","infrastructure","observability","incident","release"],
  cloud: ["compute","storage","network","serverless","edge","region","cost"],
  security: ["auth","secret","encryption","policy","threat","compliance","ai-security"],
  automation: ["workflow","trigger","condition","action","schedule","integration","human-loop"],
  analytics: ["chart","metric","dashboard","segment","experiment","llm-observability"],
  devtools: ["code","terminal","version-control","package","debug","api","testing","editor"],
  interface: ["arrow","action","state","layout","media","file","time","communication","identity"],
};

/**
 * The canonical serialised form of an icon file, to the byte.
 *
 * Every icon opens with exactly this string, closes with `</svg>` and a single newline,
 * and carries no whitespace anywhere between. Attribute *values* are checked one by one
 * elsewhere; this fixes their order and spacing, which nothing else does — two files can
 * satisfy every attribute rule and still not look alike in a diff.
 *
 * Three places have to agree on it: the scaffolder that writes a new icon, the optimizer
 * that rewrites every icon, and the validator that rejects anything else. They read it
 * here so they cannot drift apart.
 */
/**
 * Two variants.
 *
 * The set's language is open silhouettes — shapes that stop short of closing — and a shape
 * with no inside cannot be painted into anything but a band as wide as the stroke that drew
 * it. So there is no solid variant here, and no geometry is derived for either of these:
 * they are the same paths, at a stroke width, with a tint on the closed ones.
 */
export const VARIANTS = ["outline", "duotone"] as const;
export const WEIGHTS = { thin: 1.5, regular: 2, bold: 2.5 } as const;
export type Variant = (typeof VARIANTS)[number];
export type Weight = keyof typeof WEIGHTS;

export const DEFAULT_VARIANT: Variant = "outline";
export const DEFAULT_WEIGHT: Weight = "regular";

/**
 * Variants that have a weight axis at all.
 *
 * Both of them do, and the list is kept separate anyway: weight lives in a stroke, so any
 * variant added later that is not stroked would not have one, and `cellName` needs to be
 * told rather than to assume.
 */
export const WEIGHTED_VARIANTS = ["outline", "duotone"] as const;
export const hasWeight = (v: Variant) => (WEIGHTED_VARIANTS as readonly string[]).includes(v);

/**
 * A cell's file name, and the only place the shape of that name is decided.
 *
 * `outline-bold.svg`, `duotone-thin.svg`. The weight appears only where there is one, so a
 * name never claims an axis its variant does not have.
 */
export const cellName = (variant: Variant, weight: Weight) =>
  hasWeight(variant) ? `${variant}-${weight}` : variant;

/** Every cell a complete concept holds: 3 outline + 3 duotone. */
export const MATRIX_CELLS = VARIANTS.flatMap((v) =>
  hasWeight(v) ? (Object.keys(WEIGHTS) as Weight[]).map((w) => cellName(v, w)) : [cellName(v, DEFAULT_WEIGHT)]);

/** The secondary layer of a duotone icon. currentColor at reduced opacity, never a second colour. */
export const DUOTONE_OPACITY = "0.2";

/**
 * The root attributes for one cell of the variant matrix, in canonical order.
 *
 * Six combinations, one function. Writing six headers by hand is how a set ends up with
 * five that agree and one that does not, and the one that does not is found by a consumer
 * rather than by us.
 */
export const svgRootAttrs = (variant: Variant, weight: Weight): ReadonlyArray<readonly [string, string]> => {
  const base = [
    ["xmlns", "http://www.w3.org/2000/svg"],
    ["width", String(CANVAS)],
    ["height", String(CANVAS)],
    ["viewBox", VIEW_BOX],
  ] as Array<[string, string]>;

  // Both variants are stroked at their weight. A duotone's tint lives on the individual
  // shapes that carry the secondary layer, so the root stays identical to `outline` and
  // the two can be diffed line for line.
  return [...base,
    ["fill", "none"],
    ["stroke", "currentColor"],
    ["stroke-width", String(WEIGHTS[weight])],
    ["stroke-linecap", "round"],
    ["stroke-linejoin", "round"],
  ];
};

export const svgOpen = (variant: Variant = DEFAULT_VARIANT, weight: Weight = DEFAULT_WEIGHT) =>
  `<svg ${svgRootAttrs(variant, weight).map(([k, v]) => `${k}="${v}"`).join(" ")}>`;

/** The master cell: outline-regular. Kept as a constant because most tooling only ever wants this one. */
export const SVG_ROOT_ATTRS = svgRootAttrs(DEFAULT_VARIANT, DEFAULT_WEIGHT);
export const SVG_OPEN = svgOpen();
export const SVG_CLOSE = "</svg>\n";

/** Attribute order within a child, so two identical shapes serialise identically. */
export const SVG_ATTR_ORDER = ["d", "points", "x", "y", "x1", "y1", "x2", "y2",
                               "cx", "cy", "r", "rx", "ry", "width", "height"];

/**
 * Rules an icon may accept a deviation from, with a written reason.
 *
 * Only warnings appear here. An error is a defect the set cannot carry; a warning is a
 * judgement call, and a judgement call with no way to record the judgement turns into
 * noise. `geometry/angle-constraint` fires on 13 of the current icons and every one of
 * them is a shape whose angles are intrinsic — a flask tapers, a bolt zigzags, a bucket's
 * walls slope. Left unanswerable, a rule that lights up a third of the set teaches
 * everyone to skim past it, and the next real violation goes with it.
 *
 * An accepted rule that stops firing becomes an error, so the reasons cannot rot in place.
 */
export const WAIVABLE_SHAPE_RULES = [
  "geometry/angle-constraint",
  "geometry/min-stroke-gap",
  "lint/element-budget",
] as const;

/** Only `pnpm icons:duplicates` can produce these, and `duplicate/similar` only with --perceptual. */
export const WAIVABLE_DUPLICATE_RULES = [
  "duplicate/structural",
  "duplicate/similar",
] as const;

export const WAIVABLE_RULES = [...WAIVABLE_SHAPE_RULES, ...WAIVABLE_DUPLICATE_RULES] as const;

/**
 * Words that are acronyms, not words.
 *
 * The scaffolder title-cases a slug to make the display name, which turns `api` into
 * "Api" and `dag` into "Dag". Three icons shipped that way before anyone looked, because
 * nothing checked it — the name is the one field no rule had an opinion about.
 */
export const ACRONYMS = new Set([
  "ai", "api", "cli", "dag", "etl", "gpu", "http", "id", "kpi", "llm", "mcp",
  "rag", "svg", "ui", "url",
]);

/** JS/TS globals that must not become component names. */
export const RESERVED_WORDS = new Set([
  "Function","Object","Array","String","Number","Boolean","Symbol","Error",
  "Map","Set","Date","Promise","Proxy","Reflect","JSON","Math","Infinity",
]);
