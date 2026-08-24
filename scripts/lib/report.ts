export type Level = "error" | "warn";
export interface Finding { rule: string; message: string; level: Level }

export class Report {
  private files = new Map<string, Finding[]>();
  add(file: string, rule: string, message: string, level: Level = "error") {
    if (!this.files.has(file)) this.files.set(file, []);
    this.files.get(file)!.push({ rule, message, level });
  }
  touch(file: string) { if (!this.files.has(file)) this.files.set(file, []); }

  get errors() { return [...this.files.values()].flat().filter((f) => f.level === "error").length; }
  get warns() { return [...this.files.values()].flat().filter((f) => f.level === "warn").length; }

  print(ci = !!process.env["GITHUB_ACTIONS"]) {
    let ok = 0;
    for (const [file, fs] of [...this.files].sort()) {
      if (!fs.length) { ok++; continue; }
      const bad = fs.some((f) => f.level === "error");
      console.log(`${bad ? "\x1b[31m✗" : "\x1b[33m⚠"} ${file}\x1b[0m`);
      for (const f of fs) {
        console.log(`  ${f.level === "error" ? "\x1b[31m" : "\x1b[33m"}${f.rule.padEnd(26)}\x1b[0m ${f.message}`);
        if (ci) console.log(`::${f.level === "error" ? "error" : "warning"} file=${file}::${f.rule} — ${f.message}`);
      }
    }
    console.log(`\n\x1b[32m✓ ${ok} passed\x1b[0m · \x1b[31m✗ ${this.errors} failed\x1b[0m · \x1b[33m⚠ ${this.warns} warnings\x1b[0m`);
    return this.errors === 0;
  }
}
