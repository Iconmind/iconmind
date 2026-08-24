# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import catalog as c

def phase_of(i, th):
    p1, p2, p3 = th
    if i < p1: return 1
    if i < p2: return 2
    if i < p3: return 3
    return 4

BADGE = {1: "`P1`", 2: "`P2`", 3: "`P3`", 4: "`P4`"}
out = []
w = out.append

total = sum(len(v) for v in c.ICONS.values())
counts = {d: len(c.ICONS[d]) for d in c.ICONS}
pc = {1: 0, 2: 0, 3: 0, 4: 0}
for d, items in c.ICONS.items():
    for i in range(len(items)):
        pc[phase_of(i, c.THRESHOLDS[d])] += 1

w("# 02b — Icon Catalog")
w("")
w(f"> **{total} icon concept** konkret, siap dieksekusi. Dihasilkan otomatis dari `_data/catalog.py` oleh `_data/gen_catalog.py` — **jangan edit file ini dengan tangan**, edit datanya lalu jalankan ulang.")
w("> Struktur & aturan penamaan: [02 — Icon Taxonomy](./02-icon-taxonomy.md). Target per phase: [CANON C6](./CANON.md#c6-angka-target-dipakai-di-doc-01-16-17).")
w(">")
w("> **Kolom deskripsi berbahasa Inggris** dan prosa di sekitarnya berbahasa Indonesia — itu disengaja. Deskripsi adalah **data yang dikirim ke produk**: ia menjadi field `description` di metadata icon, isi GitHub issue, dan keluaran MCP, jadi tunduk pada [CANON C11](./CANON.md#c11-kebijakan-bahasa). Prosanya catatan kerja internal.")
w("")
w("---")
w("")
w("## Cara Membaca")
w("")
w("| Label | Arti | Waktu |")
w("|-------|------|-------|")
w(f"| `P1` | Phase 1 — {pc[1]} icon | Bulan 0–3 |")
w(f"| `P2` | Phase 2 — {pc[2]} icon berikutnya | Bulan 4–6 |")
w(f"| `P3` | Phase 3 — {pc[3]} icon berikutnya | Bulan 7–9 |")
w(f"| `P4` | Phase 4 — {pc[4]} icon berikutnya | Bulan 10–12 |")
w("")
w(f"Kumulatif: P1 = {pc[1]} · P2 = {pc[1]+pc[2]} · P3 = {pc[1]+pc[2]+pc[3]} · P4 = {total}.")
w("")
w(f"**Catatan penting**: target *shipped* bulan ke-12 adalah **1000 icon**, sedangkan katalog ini berisi **{total}**. Selisih **{1000-total}** icon sengaja dibiarkan kosong — diisi dari GitHub issue request, query nol-hasil di situs, dan pelengkapan varian modifier (`-add` / `-check` / `-alert` / `-off`) untuk icon yang sudah ada. Mengunci 1000 nama sekarang berarti menebak permintaan yang belum ada datanya.")
w("")
w("Semua slug di bawah **unik lintas domain** (dijamin oleh assertion di generator).")
w("")
w("## Ringkasan per Domain")
w("")
w("| Domain | Concept | P1 | P2 | P3 | P4 |")
w("|--------|---------|----|----|----|----|")
for d in c.THRESHOLDS:
    items = c.ICONS[d]
    per = {1: 0, 2: 0, 3: 0, 4: 0}
    for i in range(len(items)):
        per[phase_of(i, c.THRESHOLDS[d])] += 1
    w(f"| [`{d}`](#{d}) — {c.DOMAIN_TITLE[d]} | {len(items)} | {per[1]} | {per[2]} | {per[3]} | {per[4]} |")
w(f"| **Total** | **{total}** | **{pc[1]}** | **{pc[2]}** | **{pc[3]}** | **{pc[4]}** |")
w("")
w("---")
w("")

for d in c.THRESHOLDS:
    items = c.ICONS[d]
    th = c.THRESHOLDS[d]
    phase_by_slug = {s: phase_of(i, th) for i, (s, _, _) in enumerate(items)}
    w(f'<a id="{d}"></a>')
    w("")
    w(f"## `{d}` — {c.DOMAIN_TITLE[d]}")
    w("")
    w(f"{len(items)} concept · P1 {th[0]} · kumulatif P2 {th[1]} · kumulatif P3 {th[2]}")
    w("")
    for sub in c.SUBCAT_ORDER[d]:
        rows = [(s, desc) for (s, sc, desc) in items if sc == sub]
        if not rows:
            continue
        w(f"### `{sub}` ({len(rows)})")
        w("")
        w("| Slug | Deskripsi | Phase |")
        w("|------|-----------|-------|")
        for s, desc in rows:
            w(f"| `{s}` | {desc} | {BADGE[phase_by_slug[s]]} |")
        w("")
    w("---")
    w("")

w("## Bagaimana Katalog Ini Dipakai")
w("")
w("1. **Backlog issue otomatis.** Script `scripts/generate/issues.ts` ([05](./05-repository-architecture.md)) membaca `catalog.py` dan membuat satu GitHub Issue `good first issue` untuk setiap slug yang belum punya file SVG.")
w("2. **Batch prompt AI.** Generator prompt ([04](./04-ai-generation-workflow.md)) mengambil slug + deskripsi + sub-kategori dari sini sebagai input.")
w("3. **Pengecekan cakupan.** CI membandingkan slug di katalog dengan file di `packages/icons/icons/` dan melaporkan progres per phase ke README.")
w("4. **Halaman roadmap.** `/roadmap` di situs ([08](./08-website.md)) di-render dari data yang sama, sehingga progres publik tidak pernah basi.")
w("")
w("Satu sumber data, empat konsumen — inilah alasan katalog disimpan sebagai data, bukan sebagai prosa.")

open("02b-icon-catalog.md", "w").write("\n".join(out) + "\n")
print("wrote 02b-icon-catalog.md:", total, "icons")
