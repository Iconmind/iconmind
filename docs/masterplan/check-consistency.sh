#!/usr/bin/env bash
# Pemeriksa konsistensi master plan IconMind.
# Jalankan setiap kali mengubah CANON.md atau _data/catalog.py.
set -euo pipefail
cd "$(dirname "$0")"
python3 _data/gen_catalog.py >/dev/null
python3 _data/gen_timeline.py >/dev/null
python3 _data/gen_roadmap_json.py >/dev/null
exec python3 _data/check_consistency.py
