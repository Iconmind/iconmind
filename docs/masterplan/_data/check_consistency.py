# -*- coding: utf-8 -*-
"""Pemeriksa konsistensi master plan IconMind. Keluar dengan kode 1 kalau ada masalah."""
import os, re, sys, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import catalog as c

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

errors, warnings = [], []
def err(m): errors.append(m)
def warn(m): warnings.append(m)

FILES = sorted(f for f in glob.glob("*.md"))
DOC = {f: open(f, encoding="utf-8").read() for f in FILES}

# ---------- 1. Nama project ----------
for f, s in DOC.items():
    for bad in ("GlyphForge", "glyphforge", "Glyphforge"):
        if bad in s:
            err(f"{f}: masih memakai nama lama '{bad}'")

# ---------- 2. Anchor & link internal ----------
def slugify(h):
    h = re.sub(r"`", "", h)
    h = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", h)   # link → teks
    h = h.lower().strip()
    h = re.sub(r"[^\w\s-]", "", h, flags=re.UNICODE) # buang §, —, ., /, dll
    h = re.sub(r"\s", "-", h)   # GitHub: tiap spasi jadi satu dash
    return h

anchors = {}
for f, s in DOC.items():
    a = set()
    for line in s.splitlines():
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m: a.add(slugify(m.group(2)))
    for m in re.finditer(r'<a id="([^"]+)"', s):
        a.add(m.group(1))
    anchors[f] = a

LINK = re.compile(r"\[([^\]]*)\]\((\./[^)#\s]+)(#[^)\s]*)?\)")
for f, s in DOC.items():
    for m in LINK.finditer(s):
        target, frag = m.group(2)[2:], m.group(3)
        if not os.path.exists(target):
            err(f"{f}: link ke berkas tidak ada → {target}")
            continue
        if frag:
            if frag[1:] not in anchors.get(target, set()):
                err(f"{f}: anchor tidak ada → {target}{frag}")

# ---------- 3. Nilai CANON dipakai konsisten ----------
CANON = DOC["CANON.md"]
must_in_canon = ["@iconmind/icons", "@iconmind/react", "@iconmind/vue", "@iconmind/mcp",
                 "@iconmind/shared", "@iconmind/figma", "iconmind.dev",
                 "github.com/iconmind/iconmind"]
for v in must_in_canon:
    if v not in CANON:
        err(f"CANON.md: nilai wajib hilang → {v}")

# scope npm salah
THIRD_PARTY = {"tanstack", "astrojs", "resvg", "modelcontextprotocol",
               "vue", "nuxt", "lhci", "changesets"}
for f, s in DOC.items():
    for m in re.finditer(r"@([a-z0-9-]+)/(icons|react|vue|mcp|shared|figma)\b", s):
        if m.group(1) != "iconmind" and m.group(1) not in THIRD_PARTY:
            err(f"{f}: scope npm salah → @{m.group(1)}/{m.group(2)}")

# ---------- 4. 12 domain ----------
DOMAINS = list(c.THRESHOLDS.keys())
canon_line = re.search(r"## C5.*?\n\n(.*?)\n", CANON, re.S)
canon_domains = re.findall(r"`([a-z]+)`", canon_line.group(1)) if canon_line else []
if canon_domains != DOMAINS:
    err(f"CANON C5 urutan domain ≠ catalog.py\n  CANON: {canon_domains}\n  data : {DOMAINS}")

schema_enum = re.search(r'"enum": \[("ai".*?)\]', DOC["07-metadata-system.md"], re.S)
if schema_enum:
    got = re.findall(r'"([a-z]+)"', schema_enum.group(1))
    if got != DOMAINS:
        err(f"07 JSON Schema enum kategori ≠ CANON C5\n  {got}")

mcp_enum = re.search(r'"enum": \[("ai","agents".*?)\]', DOC["13-mcp-server.md"])
if mcp_enum:
    got = re.findall(r'"([a-z]+)"', mcp_enum.group(1))
    if got != DOMAINS:
        err(f"13 enum kategori tool ≠ CANON C5\n  {got}")

idx_enum = re.search(r'"c": \[(.*?)\]', DOC["09-search-system.md"], re.S)
if idx_enum:
    got = re.findall(r'"([a-z]+)"', idx_enum.group(1))
    if got != DOMAINS:
        err(f"09 array kategori index ≠ CANON C5\n  {got}")

iss_enum = re.search(r"options: \[ai,(.*?)\]", DOC["15-open-source-strategy.md"], re.S)
if iss_enum:
    got = [x.strip() for x in ("ai," + iss_enum.group(1)).replace("\n", " ").split(",")]
    got = [g for g in got if g and g not in ("not sure", "tidak yakin")]
    if got != DOMAINS:
        err(f"15 dropdown kategori issue ≠ CANON C5\n  {got}")

# ---------- 5. Tabel 2.6 vs catalog.py ----------
tax = DOC["02-icon-taxonomy.md"]
sec = tax[tax.index("## 2.6"):]
rows = re.findall(r"^\| `([a-z]+)` \| (\d+) \| (\d+) \| (\d+) \| (\d+) \|$", sec, re.M)
if len(rows) != 12:
    err(f"02 §2.6: seharusnya 12 baris domain, ketemu {len(rows)}")
m12_sum = 0
short = []
for dom, m3, m6, m9, m12 in rows:
    m3, m6, m9, m12 = map(int, (m3, m6, m9, m12))
    if dom not in c.THRESHOLDS:
        err(f"02 §2.6: domain tak dikenal {dom}"); continue
    if (m3, m6, m9) != c.THRESHOLDS[dom]:
        err(f"02 §2.6 `{dom}`: kumulatif ({m3},{m6},{m9}) ≠ catalog.py {c.THRESHOLDS[dom]}")
    if not m3 <= m6 <= m9 <= m12:
        err(f"02 §2.6 `{dom}`: angka kumulatif tidak menaik")
    if len(c.ICONS[dom]) < m12:
        short.append(f"{dom} +{m12 - len(c.ICONS[dom])}")
    m12_sum += m12
if short:
    warn("target M12 melebihi katalog (selisih diisi request komunitas, "
         "sesuai catatan di 02b): " + ", ".join(short))
if m12_sum != 1000:
    err(f"02 §2.6: total M12 {m12_sum} ≠ 1000 (CANON C6)")

if sum(t[0] for t in c.THRESHOLDS.values()) != 100: err("catalog: P1 ≠ 100")
if sum(t[1] for t in c.THRESHOLDS.values()) != 300: err("catalog: P2 kumulatif ≠ 300")
if sum(t[2] for t in c.THRESHOLDS.values()) != 500: err("catalog: P3 kumulatif ≠ 500")

# ---------- 6. Katalog: unik & sub-kategori sah ----------
seen = {}
for d, items in c.ICONS.items():
    for slug, sub, _ in items:
        if slug in seen:
            err(f"katalog: slug duplikat '{slug}' di {seen[slug]} dan {d}")
        seen[slug] = d
        if sub not in c.SUBCAT_ORDER[d]:
            err(f"katalog: sub-kategori '{sub}' tidak terdaftar di domain {d}")

# 02 §2.4 harus memuat sub-kategori yang sama
for d in DOMAINS:
    m = re.search(r"\*\*`%s`\*\* — (.+)" % d, tax)
    if not m:
        err(f"02 §2.4: baris sub-kategori untuk `{d}` tidak ditemukan"); continue
    listed = [x.strip() for x in m.group(1).split("·")]
    if listed != c.SUBCAT_ORDER[d]:
        err(f"02 §2.4 `{d}` ≠ catalog.py\n  doc : {listed}\n  data: {c.SUBCAT_ORDER[d]}")

# ---------- 7. Jumlah yang disebut di 00 dan 02b ----------
total = sum(len(v) for v in c.ICONS.values())
nsub = sum(len(v) for v in c.SUBCAT_ORDER.values())
if f"**{total} icon concept**" not in DOC["00-index.md"]:
    err(f"00: jumlah icon concept tidak sama dengan katalog ({total})")
if f"12 domain, {nsub} sub-kategori" not in DOC["00-index.md"]:
    err(f"00: jumlah sub-kategori tidak sama dengan katalog ({nsub})")
if f"**{total} icon concept**" not in DOC["02b-icon-catalog.md"]:
    err("02b: header jumlah tidak sinkron — jalankan gen_catalog.py")

# ---------- 8. Workflow CI ----------
wf = re.findall(r"`([a-z-]+\.yml)`", CANON)
for f in ("05-repository-architecture.md", "14-ci-cd.md"):
    for w in wf:
        if w not in DOC[f]:
            err(f"{f}: workflow '{w}' (CANON C8) tidak disebut")
for m in re.finditer(r"([a-z-]+\.yml)", DOC["14-ci-cd.md"]):
    if m.group(1) not in wf and m.group(1) not in ("lighthouserc.json",):
        warn(f"14: menyebut workflow di luar CANON C8 → {m.group(1)}")

# ---------- 9. Versi toolchain ----------
PINS = {"Node": "22", "pnpm": "10", "Turborepo": "2", "Next.js": "16",
        "React": "19", "Vue": "3.5", "TypeScript": "5.9"}
for f, s in DOC.items():
    for m in re.finditer(r"Next\.js (\d+)(?=[\s.,)]|$)", s):
        if m.group(1) != "16": err(f"{f}: versi Next.js {m.group(1)} ≠ 16")
    for m in re.finditer(r"node-version: (\d+)", s):
        if m.group(1) != "24": err(f"{f}: node-version {m.group(1)} ≠ 24 (CANON C2)")
    for m in re.finditer(r"version: (\d+)\n", s):
        pass

# ---------- 10. Peta halaman 00 vs CANON C7 ----------
def routes(text):
    return re.findall(r"^(/[\w\[\]./-]*)\s{2,}", text, re.M)
c7 = CANON[CANON.index("## C7"):]
c7_routes = set(re.findall(r"^(/\S*)", c7[c7.index("```"):c7.index("```", c7.index("```") + 3)], re.M))
idx = DOC["00-index.md"]
blk = idx[idx.index("```\n/    "):]
blk = blk[:blk.index("```", 3)]
idx_routes = set(re.findall(r"^(/\S*)", blk, re.M))
missing = c7_routes - {r for r in idx_routes} - {"/docs/[...slug]"}
extra = idx_routes - c7_routes
if not idx_routes:
    err("00: blok peta halaman tidak terbaca")
if "/search" not in idx_routes: err("00: rute /search hilang dari peta halaman")
for r in ("/", "/icons", "/icons/[slug]", "/categories", "/categories/[category]",
          "/changelog", "/roadmap", "/showcase"):
    if r not in idx_routes: err(f"00: rute {r} hilang dari peta halaman")

# ---------- 11. Angka target C6 dipakai konsisten ----------
C6 = {"stars": [500, 2000, 4000, 8000], "downloads": [200, 1000, 5000, 15000],
      "kontributor": [3, 12, 30, 60], "icons": [100, 300, 500, 1000]}
rm = DOC["16-roadmap.md"]
for label, vals in [("Icon", C6["icons"]), ("Stars", C6["stars"]),
                    ("Downloads/mgg", C6["downloads"]), ("Kontributor", C6["kontributor"])]:
    row = re.search(r"\| \*\*%s\*\* \| (.+) \|$" % re.escape(label), rm, re.M)
    if row:
        got = [int(x.strip().replace(".", "").replace(",", "")) for x in row.group(1).split("|")]
        if got != vals: err(f"16 §16.6 baris '{label}' {got} ≠ CANON C6 {vals}")
    else:
        err(f"16 §16.6: baris '{label}' tidak ditemukan")

# ---------- 12. Heading berurutan tiap dokumen ----------
for f, s in DOC.items():
    if not s.startswith("# "):
        err(f"{f}: tidak diawali heading H1")
    if not s.endswith("\n"):
        warn(f"{f}: tidak diakhiri newline")


# ---------- 13. Timeline eksekusi ----------
sys.path.insert(0, os.path.join(ROOT, "_data"))
import timeline as TL

if TL.WEEKS_PER_PHASE * len(TL.PHASES) != 52:
    err(f"timeline.py: {len(TL.PHASES)} phase x {TL.WEEKS_PER_PHASE} minggu != 52")

for tid, ph, wk, title, ev in TL.TASKS:
    lo = (ph - 1) * TL.WEEKS_PER_PHASE + 1
    hi = ph * TL.WEEKS_PER_PHASE
    if not lo <= wk <= hi:
        err(f"timeline.py `{tid}`: minggu {wk} di luar rentang Phase {ph} (W{lo}-W{hi})")
    if ev[0] not in ("path", "glob", "icons", "manual"):
        err(f"timeline.py `{tid}`: jenis bukti tak dikenal '{ev[0]}'")

ids = [t[0] for t in TL.TASKS]
if len(ids) != len(set(ids)):
    err("timeline.py: id tugas duplikat")
for mid in TL.DONE_MANUAL:
    if mid not in ids:
        err(f"timeline.py: DONE_MANUAL memuat id tak dikenal '{mid}'")

# rentang minggu di 16 harus cocok dengan pembagian phase timeline
rm2 = DOC["16-roadmap.md"]
weeks_in_16 = [int(x) for x in re.findall(r"^\| (\d+)(?:–\d+)? \|", rm2, re.M)]
if weeks_in_16 and max(weeks_in_16) > 52:
    err(f"16: ada nomor minggu {max(weeks_in_16)} > 52")
for n, name, _ in TL.PHASES:
    lo = (n - 1) * TL.WEEKS_PER_PHASE + 1
    hi = n * TL.WEEKS_PER_PHASE
    if f"W{lo}\u2013{hi}" not in DOC["18-timeline.md"] and f"W{lo}–{hi}" not in DOC["18-timeline.md"]:
        err(f"18: rentang Phase {n} (W{lo}-W{hi}) tidak muncul")

if "18-timeline.md" not in DOC:
    err("18-timeline.md belum dibuat")
elif "](./18-timeline.md)" not in DOC["00-index.md"]:
    err("00: doc 18 belum terdaftar di daftar isi")
if not DOC.get("18-timeline.md", "").startswith("# 18 — Timeline Eksekusi"):
    err("18: header salah atau berkas belum di-generate")

# ---------- Laporan ----------
print(f"Dokumen diperiksa : {len(FILES)}")
print(f"Icon concept      : {total}")
print(f"Sub-kategori      : {nsub}")
print(f"Link internal     : {sum(len(LINK.findall(s)) for s in DOC.values())}")
print(f"Tugas timeline    : {len(TL.TASKS)} dalam 52 minggu")
print()
for w in warnings: print("⚠  " + w)
if warnings: print()
for e in errors: print("✗  " + e)
print()
print(("✗ %d masalah" % len(errors)) if errors else "✓ semua pemeriksaan lolos")
sys.exit(1 if errors else 0)
