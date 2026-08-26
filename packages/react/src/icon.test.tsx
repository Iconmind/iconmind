import { describe, expect, it } from "vitest";
import { createElement as h } from "react";
import { renderToStaticMarkup as render } from "react-dom/server";
import { Agent, Model, Prompt } from "./generated/index";
import * as icons from "./generated/index";
import metadata from "@iconmind/icons/metadata.json";

const attr = (markup: string, name: string) =>
  markup.match(new RegExp(`${name}="([^"]*)"`))?.[1];

describe("icon defaults", () => {
  const markup = render(h(Agent));

  it("renders a 24px svg with the canonical attributes", () => {
    expect(attr(markup, "width")).toBe("24");
    expect(attr(markup, "height")).toBe("24");
    expect(attr(markup, "viewBox")).toBe("0 0 24 24");
    expect(attr(markup, "fill")).toBe("none");
    expect(attr(markup, "stroke")).toBe("currentColor");
    expect(attr(markup, "stroke-width")).toBe("2");
    expect(attr(markup, "stroke-linecap")).toBe("round");
    expect(attr(markup, "stroke-linejoin")).toBe("round");
  });

  it("is decorative and unfocusable unless labelled", () => {
    expect(attr(markup, "aria-hidden")).toBe("true");
    expect(attr(markup, "focusable")).toBe("false");
    expect(markup).not.toContain('role="img"');
  });
});

describe("props", () => {
  it("applies size, color and strokeWidth", () => {
    const m = render(h(Prompt, { size: 32, color: "#f00", strokeWidth: 1.5 }));
    expect(attr(m, "width")).toBe("32");
    expect(attr(m, "stroke")).toBe("#f00");
    expect(attr(m, "stroke-width")).toBe("1.5");
  });

  it("keeps stroke visually constant with absoluteStrokeWidth", () => {
    // 2 * 24 / 48 = 1 — half the nominal width, so it looks the same at twice the size.
    const m = render(h(Model, { size: 48, absoluteStrokeWidth: true }));
    expect(attr(m, "stroke-width")).toBe("1");
  });

  it("becomes an image role when labelled", () => {
    const m = render(h(Agent, { "aria-label": "Agent" }));
    expect(attr(m, "role")).toBe("img");
    expect(m).not.toContain("aria-hidden");
  });

  it("lets the consumer override anything", () => {
    const m = render(h(Agent, { className: "text-red-500", "data-testid": "x", viewBox: "0 0 48 48" } as never));
    expect(attr(m, "class")).toBe("text-red-500");
    expect(attr(m, "data-testid")).toBe("x");
    expect(attr(m, "viewBox")).toBe("0 0 48 48");
  });
});

describe("generated surface", () => {
  it("exports one component per icon and nothing malformed", () => {
    const components = Object.entries(icons).filter(([, v]) => typeof v === "object" || typeof v === "function");
    // Compared against the real metadata, never a hard-coded number — a count typed
    // into a test is a promise to keep editing it, and that promise always breaks.
    expect(components.length).toBeGreaterThanOrEqual(metadata.icons.length);
    for (const [name] of components) expect(name).toMatch(/^[A-Z][A-Za-z0-9]*$/);
  });

  it("renders every icon without throwing", () => {
    for (const [name, C] of Object.entries(icons)) {
      if (typeof C !== "object" && typeof C !== "function") continue;
      const m = render(h(C as never));
      expect(m, name).toContain("<svg");
    }
  });
});
