export type Level = "error" | "warn";
export interface Finding { rule: string; message: string; level: Level }

export class Report {
  private files = new Map<string, Finding[]>();

  /** file -> rule -> the reason the author gave for accepting it. */
  private accepted = new Map<string, Map<string, string>>();
  private used = new Set<string>();

  add(file: string, rule: string, message: string, level: Level = "error") {
    // An accepted warning is absorbed, and noted as having been needed. Errors are never
    // absorbed: the point of the mechanism is to let judgement calls be answered, not to
    // let defects be argued away.
    if (level === "warn" && this.accepted.get(file)?.has(rule)) {
      this.used.add(`${file}\u0000${rule}`);
      this.touch(file);
      return;
    }
    if (!this.files.has(file)) this.files.set(file, []);
    this.files.get(file)!.push({ rule, message, level });
  }

  touch(file: string) { if (!this.files.has(file)) this.files.set(file, []); }

  /** file -> the concept it belongs to, so staleness is judged once per concept. */
  private group = new Map<string, string>();

  /**
   * Register what an icon says it has already answered.
   *
   * `group` is the concept. An acceptance covers all seven of its cells, and some rules
   * only apply to some of them — `geometry/angle-constraint` runs on `outline` cells only,
   * because the others carry offset geometry nobody authored. Judged per file, an
   * acceptance that did its job on three cells looked stale on the other four.
   */
  accept(file: string, rule: string, reason: string, group?: string) {
    if (!this.accepted.has(file)) this.accepted.set(file, new Map());
    this.accepted.get(file)!.set(rule, reason);
    if (group) this.group.set(file, group);
  }

  /**
   * Call once, after every rule has run, naming the rules this run was capable of
   * producing. An acceptance that was never needed is a defect of its own — the drawing
   * changed, the warning went away, and a stale note now sits in the metadata excusing
   * something that is not happening. Left alone they accumulate until none are trusted.
   *
   * The scope argument is not optional bookkeeping. Acceptances live in one file but the
   * rules are split across two commands, so `pnpm icons:validate` would otherwise call
   * every duplicate acceptance stale, and vice versa.
   */
  finish(scope: readonly string[]) {
    // A rule counts as used if any cell of the same concept needed it.
    const usedByGroup = new Set<string>();
    for (const key of this.used) {
      const [file, rule] = key.split("\u0000");
      usedByGroup.add(`${this.group.get(file!) ?? file}\u0000${rule}`);
    }
    const reported = new Set<string>();
    for (const [file, rules] of this.accepted)
      for (const [rule, reason] of rules) {
        const g = `${this.group.get(file) ?? file}\u0000${rule}`;
        if (!scope.includes(rule) || usedByGroup.has(g) || reported.has(g)) continue;
        reported.add(g);
        this.add(file, "metadata/stale-acceptance",
          `accepted '${rule}' but it no longer fires — remove it from the metadata (reason given: "${reason}")`);
      }
  }

  get errors() { return [...this.files.values()].flat().filter((f) => f.level === "error").length; }
  get warns() { return [...this.files.values()].flat().filter((f) => f.level === "warn").length; }
  get acceptedCount() { return this.used.size; }

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
    const answered = this.acceptedCount ? ` · \x1b[36m${this.acceptedCount} accepted\x1b[0m` : "";
    console.log(`\n\x1b[32m✓ ${ok} passed\x1b[0m · \x1b[31m✗ ${this.errors} failed\x1b[0m · \x1b[33m⚠ ${this.warns} warnings\x1b[0m${answered}`);
    return this.errors === 0;
  }
}
