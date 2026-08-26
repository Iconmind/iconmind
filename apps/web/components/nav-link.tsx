"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * A header link that knows whether it is the page you are on.
 *
 * The old header rendered every nav item identically, so the bar told you nothing about
 * where you were — on a site with four sections and a 756-page one among them, that is
 * the single most useful thing a header can say.
 */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const root = href.replace(/\/$/, "");
  const active = root !== "" && (pathname === href || pathname.startsWith(`${root}/`));

  return (
    <Link
      href={href}
      data-active={active || undefined}
      className="group relative rounded-md px-[11px] py-1.5 text-ui font-medium text-ink-2 transition-colors hover:bg-sunk hover:text-ink data-[active]:text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-[11px] -bottom-[11px] h-[2px] rounded-pill bg-accent opacity-0 transition-opacity group-data-[active]:opacity-100"
      />
    </Link>
  );
}
