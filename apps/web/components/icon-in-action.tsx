"use client";

/**
 * The icon in the places it will actually be used.
 *
 * A big preview on a grid tells you what the drawing is. It does not tell you whether it
 * reads at 16px beside a word, whether it survives being knocked out of a dark surface,
 * whether it holds its own as one of six in a toolbar, or whether it still says anything
 * once a number is shouting next to it. These are six real compositions at real sizes,
 * driven by the same controls as the preview — change the weight and they change with it.
 *
 * ── On the six ──────────────────────────────────────────────────────────────────────
 * The previous four were a toolbar, a dark card, a list and a metric. Two of the places
 * an icon most often lands were missing, and they are the two that fail first: a button,
 * where the icon has to sit on a text baseline and match the label's weight, and a
 * sidebar, where it is 18px with nothing around it to lean on. Both are here now.
 *
 * The neighbours are drawn from the set too, so a toolbar is a toolbar rather than one
 * icon and five grey boxes: what you are judging is whether *this* one holds its own
 * beside others, which an isolated sample cannot show.
 */
export interface Neighbour { slug: string; name: string; body: string }

export function IconInAction({
  name, slug, attrs, body, neighbours,
}: {
  name: string;
  slug: string;
  attrs: Record<string, unknown>;
  body: string;
  neighbours: Neighbour[];
}) {
  const svg = (b: string, size: number, style = "") =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ` +
    Object.entries(attrs)
      .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}="${v}"`)
      .join(" ") +
    ` style="display:block;overflow:visible;${style}">${b}</svg>`;

  const me = (size: number) => <span dangerouslySetInnerHTML={{ __html: svg(body, size) }} />;
  const them = (i: number, size: number) => (
    <span dangerouslySetInnerHTML={{ __html: svg(neighbours[i]?.body ?? body, size) }} />
  );
  const nameOf = (i: number) => neighbours[i]?.name ?? name;

  return (
    <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
      {/* ── A button, which is where an icon meets a baseline ───────────────── */}
      <Panel label="Buttons" note="16px">
        <div className="grid w-full max-w-[15rem] gap-2">
          <span className="flex h-9 items-center justify-center gap-2 rounded-md bg-ink px-4 text-ui font-semibold text-page">
            {me(16)}
            Run {name.toLowerCase()}
          </span>
          <span className="flex h-9 items-center justify-center gap-2 rounded-md border border-line bg-panel px-4 text-ui font-semibold">
            {me(16)}
            Secondary
          </span>
          <div className="flex gap-2">
            <span className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md px-3 text-ui font-medium text-muted">
              {me(16)}
              Ghost
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-panel">
              {me(16)}
            </span>
          </div>
        </div>
      </Panel>

      {/* ── A sidebar, where it is alone at 18 and has nothing to lean on ───── */}
      <Panel label="Sidebar" note="18px">
        <div className="w-full max-w-[14rem] rounded-xl border border-line bg-panel p-2 shadow-panel">
          <p className="label px-2.5 pt-1.5 pb-2">Workspace</p>
          <div className="grid gap-0.5">
            <span className="flex items-center gap-2.5 rounded-md bg-accent-soft px-2.5 py-2 text-ui font-semibold text-accent">
              {me(18)}
              <span className="truncate">{name}</span>
              <span className="ml-auto font-mono text-[10px] tabular-nums opacity-70">12</span>
            </span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ui text-muted">
                {them(i, 18)}
                <span className="truncate">{nameOf(i)}</span>
              </span>
            ))}
          </div>
        </div>
      </Panel>

      {/* ── A toolbar, where it has to hold its own beside five others ─────────
           Sized to the narrowest column this grid produces. The first draft put six
           buttons and a ⌘K chip on one bar and three tabs under it, which is a fine
           toolbar and about 90px wider than the panel it lives in — it ran off the right
           edge at three columns. A specimen that does not fit its own frame is not
           showing you the icon, it is showing you a bug. */}
      <Panel label="Toolbar" note="16px · in a row">
        <div className="grid w-full gap-3">
          <div className="rounded-xl border border-line bg-panel p-1.5 shadow-panel">
            <div className="flex items-center gap-0.5">
              <span className="flex h-8 items-center gap-2 rounded-lg bg-accent-soft px-2.5 text-ui font-semibold text-accent">
                {me(16)}
                <span className="max-w-[5.5rem] truncate">{name}</span>
              </span>
              {[0, 1].map((i) => (
                <span key={i} className="grid size-8 place-items-center rounded-lg text-muted">
                  {them(i, 16)}
                </span>
              ))}
              <span className="mx-0.5 h-5 w-px bg-line" />
              {[2, 3].map((i) => (
                <span key={i} className="grid size-8 place-items-center rounded-lg text-muted">
                  {them(i, 16)}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs, under the bar. An icon in a tab is doing a different job from one in a
              toolbar button — it sits beside a label at reading weight rather than
              standing alone — and it is the second thing this composition shows for free.
              The labels are short and fixed: a neighbour's real name is "Action step",
              which is a tab nobody would write and two lines wide here. */}
          <div className="flex items-center gap-1 border-b border-line px-1">
            <span className="flex items-center gap-2 border-b-2 border-accent px-2 pb-2 text-ui font-semibold text-accent">
              {me(16)}
              Overview
            </span>
            {["Runs", "Logs"].map((label, i) => (
              <span
                key={label}
                className="flex items-center gap-2 border-b-2 border-transparent px-2 pb-2 text-ui text-muted"
              >
                {them(i, 16)}
                {label}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      {/* ── Knocked out, which is the case a light preview never tests ─────────
           Inverted from the *theme*, not painted dark.
           Hard-coding #14110E made this a dark card on a dark page once the site was in
           dark mode — #14110E on #191615 is a 1.1:1 difference, so the panel showed a
           faintly darker rectangle and demonstrated nothing. Swapping the ink and page
           tokens gives a dark card on the light theme and a light card on the dark one,
           which is the case the panel exists to test either way. */}
      <Panel label="Knocked out" note="16 · 20px" flush>
        <div
          className="w-full rounded-xl p-4"
          style={{ background: "var(--color-ink)", color: "var(--color-page)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-lg"
              style={{ background: "var(--color-accent)", color: "var(--color-panel)" }}
            >
              {me(20)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-ui font-semibold">{name}</p>
              <p
                className="truncate font-mono text-[11px]"
                style={{ color: "color-mix(in srgb, var(--color-page) 55%, transparent)" }}
              >
                {slug}
              </p>
            </div>
            <span
              className="ml-auto flex h-8 shrink-0 items-center gap-2 rounded-lg px-3 text-ui font-semibold"
              style={{ background: "var(--color-page)", color: "var(--color-ink)" }}
            >
              {me(16)}
              Run
            </span>
          </div>
          <div
            className="mt-4 flex items-center gap-1"
            style={{ color: "color-mix(in srgb, var(--color-page) 55%, transparent)" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="grid size-8 place-items-center rounded-lg">
                {them(i, 16)}
              </span>
            ))}
            <span className="ml-auto font-mono text-[10.5px] whitespace-nowrap">4 running</span>
          </div>
        </div>
      </Panel>

      {/* ── A list, at the density a real product uses ──────────────────────── */}
      <Panel label="A list" note="20px">
        <div className="w-full overflow-hidden rounded-xl border border-line bg-panel shadow-panel">
          {[0, 1, 2].map((i) => {
            const first = i === 0;
            const n = first ? { name, slug, body } : neighbours[i] ?? { name, slug, body };
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-3.5 py-3 ${first ? "" : "border-t border-line-2"}`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                    first ? "bg-accent-soft text-accent" : "bg-sunk text-muted"
                  }`}
                  dangerouslySetInnerHTML={{ __html: svg(n.body, 20) }}
                />
                <div className="min-w-0">
                  <p className="truncate text-ui font-medium">{n.name}</p>
                  <p className="truncate text-meta text-muted">
                    {first ? "Updated 4 minutes ago" : "Idle since Tuesday"}
                  </p>
                </div>
                <span
                  className={`ml-auto shrink-0 rounded-pill px-2 py-0.5 font-mono text-[10.5px] ${
                    first ? "bg-accent-soft text-accent" : "bg-sunk text-muted"
                  }`}
                >
                  {first ? "active" : "idle"}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* ── A metric tile, where a number is shouting next to it ────────────── */}
      <Panel label="A metric" note="20px · beside a number">
        <div className="w-full rounded-xl border border-line bg-panel p-4 shadow-panel">
          <div className="flex items-start justify-between">
            <span className="grid size-9 place-items-center rounded-lg bg-sunk text-ink">
              {me(20)}
            </span>
            <span className="rounded-pill bg-accent-soft px-2 py-0.5 font-mono text-[10.5px] font-semibold text-accent">
              +12.4%
            </span>
          </div>
          <p className="mt-3.5 text-[28px] font-semibold tracking-[-0.03em] tabular-nums">1,284</p>
          <p className="mt-0.5 text-meta text-muted">{name} events this week</p>
          {/* A fixed path, not a random one — a specimen that redraws itself differently
              on every render is not a specimen. */}
          <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="mt-3 h-9 w-full" aria-hidden="true">
            <path
              d="M0 32 L20 28 L40 30 L60 21 L80 24 L100 14 L120 17 L140 9 L160 12 L180 5 L200 7"
              fill="none" stroke="var(--color-accent)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </Panel>
    </div>
  );
}

/**
 * One specimen, with its own caption.
 *
 * The chrome is a card with a header strip rather than the old sunk box with a card
 * floating inside it — two nested rounded rectangles of nearly the same colour read as a
 * rendering bug, and the label had nowhere to sit but on top of the ground.
 */
function Panel({
  label, note, flush = false, children,
}: {
  label: string;
  note: string;
  /** For a composition that brings its own ground and does not want the sunk one. */
  flush?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex items-baseline justify-between gap-3 border-b border-line-2 px-4 py-2.5">
        <span className="label whitespace-nowrap">{label}</span>
        <span className="truncate font-mono text-[10.5px] whitespace-nowrap text-muted">{note}</span>
      </div>
      {/* `flex-1`, so the body fills whatever height the tallest panel in the row sets and
          the composition stays centred in it. Without it a short panel pinned its content
          to the top and left a slab of empty ground underneath. */}
      <div className={`flex flex-1 items-center justify-center px-5 py-6 ${flush ? "bg-panel" : "bg-sunk"}`}>
        {children}
      </div>
    </div>
  );
}
