"use client";

import { useEffect, useState } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Copy confirmation, out of the button.
 *
 * Every copy control on the site was swapping its own label to "Copied" for 1.4 seconds —
 * which means the button you just read changes under the cursor, and two copies in a row
 * are indistinguishable. A toast says what was copied, does not move the thing you
 * clicked, and stacks.
 *
 * The theme is read from the document rather than from `next-themes`: this site sets
 * `data-theme` on `<html>` from an inline script, and adding a provider to own a value
 * that already exists would be a second source of truth.
 */
export function Toaster(props: ToasterProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const read = () =>
      setTheme((document.documentElement.dataset["theme"] as "light" | "dark") ?? "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-xl !border-line !bg-panel !text-ink !font-sans !text-ui !shadow-panel",
          description: "!text-muted",
          actionButton: "!bg-ink !text-page",
        },
      }}
      style={
        {
          "--normal-bg": "var(--color-panel)",
          "--normal-text": "var(--color-ink)",
          "--normal-border": "var(--color-line)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
