import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { existsSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const ENTRY = new URL("../dist/index.js", import.meta.url).pathname;
const built = existsSync(ENTRY);

/**
 * Speaks the real protocol over stdio against the built server.
 *
 * Unit-testing the handlers would pass while the server failed to start, which is the
 * only failure a user ever sees — the process runs on every client launch.
 */
class Client {
  private proc: ChildProcessWithoutNullStreams;
  private buf = "";
  private pending = new Map<number, (v: unknown) => void>();
  private id = 0;

  constructor() {
    this.proc = spawn("node", [ENTRY], { stdio: ["pipe", "pipe", "pipe"] });
    this.proc.stdout.on("data", (d: Buffer) => {
      this.buf += d.toString();
      let nl: number;
      while ((nl = this.buf.indexOf("\n")) !== -1) {
        const line = this.buf.slice(0, nl).trim();
        this.buf = this.buf.slice(nl + 1);
        if (!line) continue;
        const msg = JSON.parse(line) as { id?: number };
        if (msg.id != null) this.pending.get(msg.id)?.(msg);
      }
    });
  }

  send(method: string, params?: unknown): Promise<any> {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timeout: ${method}`)), 5000);
      this.pending.set(id, (v) => { clearTimeout(timer); resolve(v); });
      this.proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    });
  }
  notify(method: string) { this.proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", method }) + "\n"); }
  kill() { this.proc.kill(); }
}

const call = async (c: Client, name: string, args: Record<string, unknown>) => {
  const r = await c.send("tools/call", { name, arguments: args });
  return JSON.parse(r.result.content[0].text);
};

describe.skipIf(!built)("MCP server over stdio", () => {
  let c: Client;
  let startupMs = 0;

  beforeAll(async () => {
    const t0 = Date.now();
    c = new Client();
    const init = await c.send("initialize", {
      protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "vitest", version: "1" },
    });
    startupMs = Date.now() - t0;
    c.notify("notifications/initialized");
    expect(init.result.serverInfo.name).toBe("iconmind");
  });
  afterAll(() => c?.kill());

  it("starts fast enough that nobody notices", () => {
    // The process runs every time a client opens; 300ms is the threshold below which
    // it stops being something a person waits for.
    expect(startupMs).toBeLessThan(300);
  });

  it("advertises the four tools", async () => {
    const r = await c.send("tools/list");
    expect(r.result.tools.map((t: { name: string }) => t.name).sort())
      .toEqual(["get_icon", "get_icon_code", "list_category", "search_icon"]);
  });

  it("advertises both prompts", async () => {
    const r = await c.send("prompts/list");
    expect(r.result.prompts.map((p: { name: string }) => p.name).sort())
      .toEqual(["ai_workflow_icons", "recommend_icons"]);
  });

  it("finds the right icon and hands back paste-ready code", async () => {
    const out = await call(c, "search_icon", { query: "vector database" });
    expect(out.results[0].slug).toBe("vector-database");
    expect(out.results[0].import).toContain("VectorDatabase");
    expect(out.results[0].matched).toBeTruthy();
  });

  it("respects a category filter", async () => {
    const out = await call(c, "search_icon", { query: "prompt", category: "mcp" });
    expect(out.results.every((r: { category: string }) => r.category === "mcp")).toBe(true);
  });

  it("suggests instead of erroring on an unknown slug", async () => {
    const out = await call(c, "get_icon", { slug: "vector-db" });
    expect(out.found).toBe(false);
    expect(out.suggestions).toContain("vector-database");
  });

  it("resolves aliases to the real icon", async () => {
    const out = await call(c, "get_icon", { slug: "kb" });
    expect(out.found).toBe(true);
    expect(out.slug).toBe("knowledge-base");
  });

  it("combines several icons into one import", async () => {
    const out = await call(c, "get_icon_code", { slugs: ["agent", "prompt", "model"] });
    expect(out.import).toBe(`import { Agent, Prompt, Model } from "@iconmind/react";`);
    expect(out.missing).toEqual([]);
  });

  it("lists categories when asked for none", async () => {
    const out = await call(c, "list_category", {});
    expect(out.categories.length).toBeGreaterThan(0);
    expect(out.categories[0]).toHaveProperty("subcategories");
  });

  it("reads a category resource", async () => {
    const r = await c.send("resources/read", { uri: "category://mcp" });
    const icons = JSON.parse(r.result.contents[0].text);
    expect(icons.every((i: { category: string }) => i.category === "mcp")).toBe(true);
  });

  it("renders a prompt with its argument substituted", async () => {
    const r = await c.send("prompts/get", {
      name: "ai_workflow_icons", arguments: { workflow: "RAG with reranking" },
    });
    expect(r.result.messages[0].content.text).toContain("RAG with reranking");
  });
});
