# -*- coding: utf-8 -*-
"""Render 18-timeline.md. Status diturunkan dari isi repo, bukan dari centang manual."""
import os, sys, glob as g
from datetime import date, timedelta
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import timeline as T

REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))
TODAY = date.fromisoformat(os.environ.get("TODAY", date.today().isoformat()))

def week_start(w): return T.START + timedelta(weeks=w - 1)
def week_end(w):   return week_start(w) + timedelta(days=6)
def phase_of(w):   return (w - 1) // T.WEEKS_PER_PHASE + 1

def icon_count():
    return len(g.glob(os.path.join(REPO, "packages/icons/icons/*/*.svg")))

ICONS = icon_count()

def done(task):
    _id, _p, _w, _t, ev = task
    kind = ev[0]
    if kind == "path":  return os.path.exists(os.path.join(REPO, ev[1]))
    if kind == "glob":  return len(g.glob(os.path.join(REPO, ev[1]))) >= ev[2]
    if kind == "icons": return ICONS >= ev[1]
    if kind == "manual": return _id in T.DONE_MANUAL
    raise ValueError(kind)

def evidence_text(ev):
    if ev[0] == "path":  return f"`{ev[1]}`"
    if ev[0] == "glob":  return f"`{ev[1]}` ≥ {ev[2]}"
    if ev[0] == "icons": return f"icon terbit ≥ {ev[1]} *(sekarang {ICONS})*"
    return f"manual — {ev[1]}"

cur_week = max(1, (TODAY - T.START).days // 7 + 1)
out, w = [], lambda s="": out.append(s)

w("# 18 — Timeline Eksekusi")
w("")
w("> **Jangan edit berkas ini dengan tangan.** Dihasilkan `_data/gen_timeline.py` dari `_data/timeline.py`.")
w("> Status setiap tugas **diturunkan dari isi repo**, bukan dari centang. Tracker yang diketik tangan selalu berbohong dalam dua minggu.")
w("> Lapisan strategis (target, risiko, metrik) ada di [16 — Roadmap](./16-roadmap.md). Berkas ini lapisan operasionalnya.")
w("")
w("```bash")
w("./update-timeline.sh      # regenerasi dari keadaan repo saat ini")
w("```")
w("")
w("---")
w("")

total = len(T.TASKS)
ndone = sum(1 for t in T.TASKS if done(t))
p1 = [t for t in T.TASKS if t[1] == 1]
p1done = sum(1 for t in p1 if done(t))

w("## Posisi Sekarang")
w("")
w(f"**{TODAY.isoformat()} · Minggu {cur_week} dari 52 · Phase {phase_of(cur_week)}**")
w("")
w("| | |")
w("|---|---|")
w(f"| Mulai proyek | {T.START.isoformat()} |")
w(f"| Minggu berjalan | W{cur_week} ({week_start(cur_week)} – {week_end(cur_week)}) |")
w(f"| Icon terbit | **{ICONS}** |")
w(f"| Tugas selesai | {ndone} / {total} keseluruhan · {p1done} / {len(p1)} di Phase 1 |")
w("")

def bar(frac, width=24):
    f = int(round(frac * width))
    return "█" * f + "░" * (width - f)

w("### Progres per Phase")
w("")
w("| Phase | Rentang | Tanggal | Progres | |")
w("|-------|---------|---------|---------|---|")
for n, name, goal in T.PHASES:
    ts = [t for t in T.TASKS if t[1] == n]
    d = sum(1 for t in ts if done(t))
    a, b = week_start((n - 1) * T.WEEKS_PER_PHASE + 1), week_end(n * T.WEEKS_PER_PHASE)
    frac = d / len(ts) if ts else 0
    mark = " ←" if phase_of(cur_week) == n else ""
    w(f"| **P{n} {name}**{mark} | W{(n-1)*T.WEEKS_PER_PHASE+1}–{n*T.WEEKS_PER_PHASE} | {a} – {b} | `{bar(frac)}` | {d}/{len(ts)} |")
w("")
w(f"*{', '.join(f'P{n}: {goal}' for n, _, goal in T.PHASES)}*")
w("")

# --- tindakan berikutnya ---
pending = [t for t in sorted(T.TASKS, key=lambda x: (x[2], x[0])) if not done(t)]
overdue = [t for t in pending if t[2] < cur_week]
w("## Tiga Tindakan Berikutnya")
w("")
if pending:
    for i, (tid, ph, wk, title, ev) in enumerate(pending[:3], 1):
        late = " ⚠️ **terlambat**" if wk < cur_week else ""
        w(f"{i}. **{title}** · `{tid}` · dijadwalkan W{wk} ({week_start(wk)}){late}")
        w(f"   Bukti selesai: {evidence_text(ev)}")
else:
    w("Semua tugas selesai.")
w("")
if overdue:
    w(f"**{len(overdue)} tugas terlambat**: " + ", ".join(f"`{t[0]}`" for t in overdue))
    w("")
    w("Terlambat bukan berarti gagal — artinya urutan pengerjaan berbeda dari rencana. "
      "Yang perlu diawasi adalah tugas berlabel `icons`: itu jalur kritis dan satu-satunya yang tidak bisa dipercepat "
      "([04 §4.1](./04-ai-generation-workflow.md#41-premis)).")
    w("")

# --- tabel per minggu ---
w("---")
w("")
w("## Rencana Mingguan")
w("")
by_week = {}
for t in T.TASKS: by_week.setdefault(t[2], []).append(t)

for n, name, _ in T.PHASES:
    lo, hi = (n - 1) * T.WEEKS_PER_PHASE + 1, n * T.WEEKS_PER_PHASE
    weeks = sorted(k for k in by_week if lo <= k <= hi)
    if not weeks: continue
    w(f"### Phase {n} — {name}  ·  W{lo}–{hi}")
    w("")
    w("| | Minggu | Mulai | Tugas | Bukti |")
    w("|---|--------|-------|-------|-------|")
    for wk in weeks:
        for tid, ph, _w2, title, ev in sorted(by_week[wk]):
            ok = done((tid, ph, wk, title, ev))
            mark = "✅" if ok else ("⚠️" if wk < cur_week else "▫️")
            w(f"| {mark} | W{wk} | {week_start(wk)} | `{tid}` {title} | {evidence_text(ev)} |")
    w("")

w("---")
w("")
w("## Cara Kerja Tracker Ini")
w("")
w("Setiap tugas menyatakan **bukti** yang membuktikannya selesai, dan generator memeriksa bukti itu langsung ke repo:")
w("")
w("| Jenis bukti | Cara diperiksa |")
w("|-------------|----------------|")
w("| `path` | Berkas atau direktori itu ada |")
w("| `glob` | Jumlah berkas yang cocok mencapai ambang |")
w("| `icons` | Jumlah SVG di `packages/icons/icons/*/` mencapai ambang |")
w("| `manual` | Satu-satunya yang diketik tangan, di himpunan `DONE_MANUAL` |")
w("")
w("Konsekuensinya: **tugas tidak bisa ditandai selesai tanpa benar-benar selesai.** "
  "Hanya tugas yang memang tak terperiksa mesin — klaim domain, peluncuran, rekrut maintainer — yang bergantung pada kejujuran manusia, dan jumlahnya sengaja dijaga sedikit.")
w("")
w("Menambah atau menggeser tugas: sunting `_data/timeline.py`, lalu jalankan `./update-timeline.sh`.")

open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "18-timeline.md"), "w").write("\n".join(out) + "\n")
print(f"18-timeline.md ditulis — W{cur_week}, {ndone}/{total} tugas, {ICONS} icon")
