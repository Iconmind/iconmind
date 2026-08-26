/**
 * What each domain actually covers, in the words somebody would search for.
 *
 * One sentence per category, kept here rather than in the page that happens to render it
 * first — the landing, the category index and each category's own page all say it, and
 * three copies is how they stop agreeing.
 */
export const BLURB: Record<string, string> = {
  ai: "Models, prompts, tokens, embeddings, evaluation, safety",
  agents: "Planning, memory, tool use, lifecycle, multi-agent",
  mcp: "Servers, clients, resources, tools, transports",
  rag: "Chunking, retrieval, reranking, vectors, grounding",
  data: "Pipelines, stores, transforms, quality, lineage",
  devops: "Build, release, containers, incidents, observability",
  cloud: "Compute, storage, network, edge, cost",
  security: "Auth, secrets, policy, threats, compliance",
  automation: "Workflows, triggers, conditions, schedules",
  analytics: "Charts, metrics, segments, experiments",
  devtools: "Code, terminals, version control, debugging",
  interface: "Arrows, actions, state, layout, media, files",
};

/** `n` items spread evenly across a list, in order.
 *
 *  A strip taken from the front is `agent`, `agent-add`, `agent-alert`, `agent-check` —
 *  one drawing with three marks on it, which says the category is narrower than it is. */
export function spread<T>(list: T[], n: number): T[] {
  if (list.length <= n) return list;
  const step = list.length / n;
  return Array.from({ length: n }, (_, i) => list[Math.floor(i * step)]!);
}
