"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * The install line as a field rather than a button beside a code block.
 *
 * The whole thing is the control — the prompt, the command and the copy affordance read
 * as one object the way a terminal does, and clicking anywhere in it does the copy.
 * `bare` drops the prompt and the command for the places that already show them, which is
 * every fenced block in the docs.
 *
 * Confirmation is a toast rather than the button relabelling itself: the docs put this in
 * the corner of a code block, where a control that changes width on click nudges the
 * block under the pointer.
 */
export function CopyField({ value, bare = false }: { value: string; bare?: boolean }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard", {
        description: value.length > 60 ? `${value.slice(0, 57)}…` : value,
      });
    } catch {
      toast.error("Clipboard blocked", { description: "The text is on screen — select and copy." });
    }
  };

  if (bare)
    return (
      <Button variant="outline" size="sm" onClick={copy} aria-label={`Copy ${value.slice(0, 40)}`}>
        <CopyIcon />
        Copy
      </Button>
    );

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className="group flex items-center gap-3 rounded-lg border border-line bg-panel py-3.5 pr-3.5 pl-4 font-mono text-mono transition-colors hover:border-accent"
    >
      <span className="text-muted select-none">$</span>
      <span className="text-ink-2">{value}</span>
      <span className="h-4 w-px bg-line" />
      <span className="text-muted transition-colors group-hover:text-accent">
        <CopyIcon />
      </span>
    </button>
  );
}

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11.5" height="11.5" rx="2.2" />
    <path d="M5.5 15H4.6a1.1 1.1 0 0 1-1.1-1.1V4.6a1.1 1.1 0 0 1 1.1-1.1h9.3a1.1 1.1 0 0 1 1.1 1.1v.9" />
  </svg>
);
