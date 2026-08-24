"use client";
import { useState } from "react";

export function CopyButton({ value, label = "Copy", full = false }: { value: string; label?: string; full?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch { /* clipboard blocked — the value is on screen anyway */ }
      }}
      aria-live="polite"
      className={`chamfer-sm hairline shrink-0 bg-canvas px-3.5 py-2 text-xs font-medium transition-colors hover:bg-raised ${full ? "w-full" : ""}`}
    >
      {done ? "Copied" : label}
    </button>
  );
}
