"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetCloseButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * The nav, below `md`.
 *
 * A drawer rather than a dropdown, because the same panel has to hold the four primary
 * links, the three project ones and the GitHub link without becoming a scrolling menu
 * pinned to a 32px button. It closes on navigation — Next keeps the layout mounted across
 * a client route change, so a panel that did not close would stay open over the new page.
 */
export function MobileNav({
  primary,
  secondary,
}: {
  primary: { href: string; label: string }[];
  secondary: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const item = (active: boolean) =>
    `flex items-center justify-between rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors ${
      active ? "bg-accent-soft text-accent" : "text-ink-2 hover:bg-sunk hover:text-ink"
    }`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
            aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[20rem] p-0">
        <SheetHeader>
          <SheetTitle className="text-ui font-semibold tracking-normal">Menu</SheetTitle>
          <SheetCloseButton />
        </SheetHeader>
        <nav className="grid gap-0.5 p-3">
          {primary.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={item(pathname.startsWith(n.href.replace(/\/$/, "")) && n.href !== "/")}
            >
              {n.label}
            </Link>
          ))}
          <Separator className="my-2.5" />
          {secondary.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={item(pathname.startsWith(n.href.replace(/\/$/, "")))}
            >
              {n.label}
            </Link>
          ))}
          <Separator className="my-2.5" />
          <a
            href="https://github.com/iconmind/iconmind"
            className="flex items-center justify-between rounded-md px-3 py-2.5 text-[15px] font-medium text-ink-2 transition-colors hover:bg-sunk hover:text-ink"
          >
            GitHub
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8.5 7H17v8.5" />
            </svg>
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
