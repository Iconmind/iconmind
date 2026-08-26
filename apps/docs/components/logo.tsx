import { cn } from "@/lib/utils";

/**
 * The mark, from `Iconmind logo design` — proposal 1a, "latent node".
 *
 * An isometric cell whose every corner lands on a vertex of the same 24-unit grid the
 * icons are drawn to, with the accent on one edge and the core. It is the set's own rule
 * applied to the set's own logo, which is the only argument a logo for an icon library
 * has to make.
 *
 * ── The ladder ──────────────────────────────────────────────────────────────────────
 * The canvas draws the mark four times, at 52, 32, 20 and 16, and drops an element at
 * each step. That is not decoration: the interior lines are 8 grid units long, so at
 * 16px they are 5.3 device pixels apart and merge into a grey lozenge. Rather than let
 * the browser decide which of them survives, the drawing does — the same way the icon
 * compiler picks a cell per weight instead of scaling one.
 *
 *   ≥ 40   hull · spine · left rib · accent rib · core      stroke 1.75
 *   ≥ 28   hull · spine · left rib · accent rib             stroke 2
 *   ≥ 18   hull · accent rib · core                         stroke 2.25
 *   < 18   hull · core                                      stroke 2.5
 *
 * The ink is `currentColor` and the accent is the token, so the mark re-tints with the
 * theme — the canvas's dark panel brightens the orange to #F97316, which is exactly what
 * `--color-accent` already does.
 */
export function Logo({ size = 24, className }: { size?: number; className?: string }) {
  const level = size >= 40 ? 3 : size >= 28 ? 2 : size >= 18 ? 1 : 0;
  const stroke = [2.5, 2.25, 2, 1.75][level]!;
  const core = [2.4, 2, 0, 1.7][level]!;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      style={{ overflow: "visible" }}
    >
      <path d="M12 4 20 8 20 16 12 20 4 16 4 8Z" />
      {level >= 2 && (
        <>
          <path d="M12 4v8l8 4" />
          <path d="m12 12-8 4" />
        </>
      )}
      {level >= 1 && <path d="m12 12 8-4" stroke="var(--color-accent)" />}
      {core > 0 && <circle cx="12" cy="12" r={core} fill="var(--color-accent)" stroke="none" />}
    </svg>
  );
}

/**
 * Mark plus name, at the one spacing the canvas specifies.
 *
 * The gap and the optical size travel together — 18px of gap under a 52px mark, 12 under
 * 32, 8 under 20 — so a lockup dropped into a 60px header does not need somebody to
 * re-tune it by eye.
 */
export function Wordmark({
  size = 24,
  className,
  markClassName,
}: {
  size?: number;
  className?: string;
  markClassName?: string;
}) {
  const gap = size >= 40 ? 18 : size >= 28 ? 12 : 8;
  return (
    <span className={cn("flex select-none items-center", className)} style={{ gap }}>
      <Logo size={size} className={markClassName} />
      <span
        className="font-semibold"
        style={{ fontSize: size * 0.78, letterSpacing: "-0.035em", lineHeight: 1 }}
      >
        IconMind
      </span>
    </span>
  );
}
