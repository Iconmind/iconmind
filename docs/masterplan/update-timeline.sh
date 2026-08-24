#!/usr/bin/env bash
# Regenerasi 18-timeline.md dari keadaan repo saat ini.
set -euo pipefail
cd "$(dirname "$0")"
exec python3 _data/gen_timeline.py
