import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { CopyField } from "./copy-field";

/**
 * Every element the docs render, styled with the same tokens as the rest of the site.
 * This is the file that makes fumadocs-ui unnecessary — and keeps a competitor's icons
 * out of an icon library's own documentation.
 */
export function getMDXComponents(): MDXComponents {
  return {
    h2: (p) => <h2 {...p} className="mt-14 scroll-mt-24 font-sans text-h2 font-semibold" />,
    h3: (p) => <h3 {...p} className="mt-10 scroll-mt-24 font-sans text-[1.0625rem] font-semibold" />,
    p: (p) => <p {...p} className="mt-4 max-w-[70ch] text-[1.0625rem] leading-[1.7] text-ink-2" />,
    ul: (p) => <ul {...p} className="mt-4 max-w-[70ch] list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.7] text-ink-2" />,
    ol: (p) => <ol {...p} className="mt-4 max-w-[70ch] list-decimal space-y-2 pl-5 text-[1.0625rem] leading-[1.7] text-ink-2" />,
    strong: (p) => <strong {...p} className="font-medium text-ink" />,
    em: (p) => <em {...p} className="not-italic text-ink" />,
    hr: (p) => <hr {...p} className="my-12 border-line" />,
    a: ({ href = "", ...p }) =>
      href.startsWith("/") ? (
        <Link href={href} {...p} className="text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-current" />
      ) : (
        <a href={href} {...p} className="text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-current" />
      ),
    code: (p) => <code {...p} className="rounded-sm border border-line bg-panel px-1.5 py-0.5 font-mono text-mono text-ink" />,
    pre: ({ children, ...p }) => {
      // The raw text is pulled out so the copy button hands over exactly what is on
      // screen, not the highlighted markup around it.
      const el = children as { props?: { children?: unknown } };
      const raw = typeof el?.props?.children === "string" ? el.props.children : "";
      return (
        <div className="relative mt-4 group">
          <pre {...p} className="overflow-x-auto rounded-2xl border border-line bg-panel px-5 py-4 font-mono text-mono leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
            {children}
          </pre>
          {raw && (
            <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              <CopyField value={raw} bare />
            </div>
          )}
        </div>
      );
    },
    table: (p) => (
      <div className="mt-6 overflow-x-auto">
        <table {...p} className="w-full text-sm" />
      </div>
    ),
    thead: (p) => <thead {...p} className="border-b border-line text-left" />,
    th: (p) => <th {...p} className="label pr-6 pb-3 text-muted" />,
    td: (p) => <td {...p} className="border-b border-line-2 py-3 pr-6 align-top text-ink-2" />,
    blockquote: (p) => <blockquote {...p} className="mt-6 border-l-2 border-accent pl-5 text-ink-2" />,
  };
}
