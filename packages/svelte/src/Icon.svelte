<script>
  /**
   * The one runtime every generated icon delegates to — the same contract as
   * @iconmind/react, written once so a thousand components cannot drift.
   */
  export let cells;
  export let size = 24;
  export let color = "currentColor";
  export let variant = "outline";
  export let weight = "regular";
  export let strokeWidth = undefined;
  export let absoluteStrokeWidth = false;

  const STROKE = { thin: 1.5, regular: 2, bold: 2.5 };
  $: nodes = cells[`${variant}-${weight}`] ?? cells[`outline-${weight}`] ?? cells["outline-regular"] ?? [];
  $: stroke = strokeWidth ?? STROKE[weight];
  $: labelled = $$restProps["aria-label"] != null || $$restProps["aria-labelledby"] != null;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={absoluteStrokeWidth ? (Number(stroke) * 24) / Number(size) : stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  focusable="false"
  role={labelled ? "img" : undefined}
  aria-hidden={labelled ? undefined : "true"}
  {...$$restProps}
>
  {#each nodes as [tag, attrs]}
    <svelte:element this={tag} {...attrs} />
  {/each}
  <slot />
</svg>
