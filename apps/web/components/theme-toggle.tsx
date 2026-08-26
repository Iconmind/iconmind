"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Light, dark, and following the system.
 *
 * The applied theme goes on `<html data-theme>` from an inline script in the document
 * head — see `layout.tsx` — so the first paint is already right. What is *stored* is the
 * choice, which is a different value: "system" means re-read `prefers-color-scheme` on
 * every load and keep listening, so a machine that dims at sunset dims this with it. A
 * plain toggle cannot express that, which is why this is a menu.
 */
type Choice = "light" | "dark" | "system";

const KEY = "iconmind-theme";

const systemIsDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

function apply(choice: Choice) {
  const resolved = choice === "system" ? (systemIsDark() ? "dark" : "light") : choice;
  document.documentElement.dataset["theme"] = resolved;
}

export function ThemeToggle() {
  const [choice, setChoice] = useState<Choice>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    let saved: Choice = "system";
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === "light" || raw === "dark" || raw === "system") saved = raw;
    } catch {
      /* private mode — the choice just does not survive the tab */
    }
    setChoice(saved);
    setResolved((document.documentElement.dataset["theme"] as "light" | "dark") ?? "light");

    // Only while following the system. A media listener that overrode an explicit choice
    // would flip the site out from under somebody who had just picked dark.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (saved !== "system") return;
      apply("system");
      setResolved(systemIsDark() ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const pick = (next: Choice) => {
    setChoice(next);
    apply(next);
    setResolved(next === "system" ? (systemIsDark() ? "dark" : "light") : next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* as above */
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Theme: ${choice}`}
          className="text-ink-2 hover:text-ink"
        >
          {resolved === "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[9.5rem]">
        <Item on={choice === "light"} onSelect={() => pick("light")} icon={<SunIcon />}>Light</Item>
        <Item on={choice === "dark"} onSelect={() => pick("dark")} icon={<MoonIcon />}>Dark</Item>
        <Item on={choice === "system"} onSelect={() => pick("system")} icon={<MonitorIcon />}>System</Item>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Item({
  on, onSelect, icon, children,
}: {
  on: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenuItem onSelect={onSelect} className={on ? "text-ink" : undefined}>
      {icon}
      {children}
      {on && (
        <svg className="ml-auto text-accent" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7" />
        </svg>
      )}
    </DropdownMenuItem>
  );
}

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SunIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <circle cx="12" cy="12" r="4.4" />
    <path d="M12 2.4v2.6M12 19v2.6M2.4 12H5M19 12h2.6M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M20.4 14.6A8.8 8.8 0 0 1 9.4 3.6a8.9 8.9 0 1 0 11 11Z" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <rect x="2.8" y="4" width="18.4" height="12.4" rx="1.8" />
    <path d="M8.6 20.4h6.8M12 16.4v4" />
  </svg>
);
