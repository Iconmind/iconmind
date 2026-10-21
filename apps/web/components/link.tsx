import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * `next/link` with prefetch off, for every link on the site.
 *
 * Next prefetches each link as it scrolls into view, and in a static export that is a
 * request per route segment: one icon page asked Vercel for 66 `__next.*.txt` files
 * nobody had clicked, a group page for 113. Hobby allows a million requests a month and
 * the site used 980,386 in the thirty days to 20 October 2026, with search sending
 * about seventy impressions a day. A click still navigates without a reload; it fetches
 * that one page's payload when it happens. Pass `prefetch` to opt a link back in.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
