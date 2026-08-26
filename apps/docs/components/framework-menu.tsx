"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FRAMEWORKS, frameworkOf } from "@/lib/snippets";

/**
 * The Lucide-style target picker: one small button naming the current framework, a
 * popover listing every package the set ships for. SVG and Sprite stay outside as
 * plain tabs — they are formats, not frameworks.
 */
export function FrameworkMenu({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const current = frameworkOf(value);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 font-medium">
          {current.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-1">
        <ul role="listbox" aria-label="Framework">
          {FRAMEWORKS.map((f) => (
            <li key={f.id}>
              <button
                role="option"
                aria-selected={f.id === value}
                onClick={() => onChange(f.id)}
                className={
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors hover:bg-sunk " +
                  (f.id === value ? "font-semibold text-ink" : "text-ink-2")
                }
              >
                {f.label}
                {f.id === value && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
