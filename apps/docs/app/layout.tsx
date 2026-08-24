import type { Metadata } from "next";
import Link from "next/link";
import { iconCount } from "@/lib/icons";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iconmind.dev"),
  title: { default: "IconMind — icons for AI-era software", template: "%s — IconMind" },
  description:
    "Open-source icons for AI-era software: LLMs, agents, MCP, RAG, and everything around them. MIT licensed.",
  openGraph: { type: "website", siteName: "IconMind" },
};

const NAV = [
  { href: "/icons/", label: "Icons" },
  { href: "/categories/", label: "Categories" },
  { href: "/docs/", label: "Docs" },
  { href: "/roadmap/", label: "Roadmap" },
];

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2h12l4 4v12l-4 4H6l-4-4V6z" />
      <circle cx="12" cy="12" r="3.25" />
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
          <nav className="mx-auto flex h-15 max-w-[68rem] items-center gap-8 px-6">
            <Link href="/" className="flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-[-0.02em]">
              <Mark />
              IconMind
            </Link>
            <ul className="hidden items-center gap-7 text-sm text-ink-soft sm:flex">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-ink">{n.label}</Link>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-5 text-sm text-ink-soft">
              <Link href="/search/" className="transition-colors hover:text-ink" aria-label="Search">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
              </Link>
              <span className="hidden tabular-nums sm:inline">{iconCount} icons</span>
              <a href="https://github.com/iconmind/iconmind" className="transition-colors hover:text-ink">GitHub</a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-[68rem] px-6">{children}</main>

        <footer className="mt-32 border-t border-line">
          <div className="mx-auto flex max-w-[68rem] flex-col gap-3 px-6 py-12 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
            <p>MIT licensed. Free for commercial use, no attribution required.</p>
            <div className="flex gap-5">
              <Link href="/changelog/" className="transition-colors hover:text-ink">Changelog</Link>
              <Link href="/roadmap/" className="transition-colors hover:text-ink">Roadmap</Link>
              <a href="https://github.com/iconmind/iconmind" className="transition-colors hover:text-ink">Source</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
