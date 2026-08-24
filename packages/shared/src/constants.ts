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
export const CHAMFER = 4;
/**
 * Longest segment still treated as a dot (a round linecap renders it as a circle).
 *
 * The canonical form is `h.01`, not `h0`. A truly zero-length subpath is rendered
 * inconsistently once an optimizer rewrites it as a closepath, so the whole ecosystem
 * uses a hair of length instead. The 0.01 endpoint is an artefact of that idiom, not a
 * real coordinate, so `grid-snap` skips it.
 */
export const DOT_MAX = 0.25;
export const DOT_PATH = "h.01";
export const MIN_STROKE_GAP = 2;
export const MIN_INTERIOR_GAP = 3;
export const MAX_CHILDREN = 12;
export const MAX_CROSSINGS = 2;
export const MAX_BYTES = 1500;
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
  data: ["pipeline","transform","storage","streaming","quality","catalog","orchestration"],
  devops: ["ci-cd","container","orchestration","infrastructure","observability","incident","release"],
  cloud: ["compute","storage","network","serverless","edge","region","cost"],
  security: ["auth","secret","encryption","policy","threat","compliance","ai-security"],
  automation: ["workflow","trigger","condition","action","schedule","integration","human-loop"],
  analytics: ["chart","metric","dashboard","segment","experiment","llm-observability"],
  devtools: ["code","terminal","version-control","package","debug","api","testing","editor"],
  interface: ["arrow","action","state","layout","media","file","time","communication"],
};

/** JS/TS globals that must not become component names. */
export const RESERVED_WORDS = new Set([
  "Function","Object","Array","String","Number","Boolean","Symbol","Error",
  "Map","Set","Date","Promise","Proxy","Reflect","JSON","Math","Infinity",
]);
