# -*- coding: utf-8 -*-
"""Ekspor data roadmap untuk situs.

Situs tidak boleh punya salinan angka target sendiri — begitu ada dua sumber, yang satu
akan basi. Berkas ini diturunkan dari catalog.py dan timeline.py, dan halaman /roadmap
menggabungkannya dengan jumlah icon yang benar-benar terbit dari metadata.json.
"""
import json, os, sys
from datetime import timedelta
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import catalog as c, timeline as t

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "apps", "docs", "data")

def week_start(w): return t.START + timedelta(weeks=w - 1)
def week_end(w):   return week_start(w) + timedelta(days=6)

phases = []
for n, name, goal in t.PHASES:
    lo, hi = (n - 1) * t.WEEKS_PER_PHASE + 1, n * t.WEEKS_PER_PHASE
    idx = n - 1                      # 0-based index into each domain's thresholds
    phases.append({
        "n": n, "name": name, "goal": goal,
        "weeks": [lo, hi],
        "start": week_start(lo).isoformat(), "end": week_end(hi).isoformat(),
        "target": sum(th[idx] for th in c.THRESHOLDS.values()) if idx < 3 else 1000,
    })

domains = [{
    "slug": d,
    "name": c.DOMAIN_TITLE[d],
    "concepts": len(c.ICONS[d]),
    "targets": list(c.THRESHOLDS[d]),          # kumulatif s/d M3, M6, M9
} for d in c.THRESHOLDS]

os.makedirs(OUT, exist_ok=True)
data = {
    "start": t.START.isoformat(),
    "weeksPerPhase": t.WEEKS_PER_PHASE,
    "phases": phases,
    "domains": domains,
    "totalConcepts": sum(len(v) for v in c.ICONS.values()),
}
with open(os.path.join(OUT, "roadmap.json"), "w") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
print(f"roadmap.json — {len(phases)} phase, {len(domains)} domain, {data['totalConcepts']} concept")
