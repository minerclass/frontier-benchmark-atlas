"""Validate each harness's data.json and report where harnesses disagree.

Usage: python tools/validate.py
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UNITS = {"pct", "elo", "pts"}
KINDS = {"claim", "rival-table", "independent", "variant-map"}
SOURCE_TYPES = {"lab", "independent", "secondary"}


def norm(text):
    return re.sub(r"[^a-z0-9]+", "", str(text).lower())


def check(harness, data):
    problems = []
    if data.get("schema") != "frontier-atlas/0.1":
        problems.append(f"schema is {data.get('schema')!r}, expected 'frontier-atlas/0.1'")
    models = {m.get("id") for m in data.get("models", [])}
    sources = {s.get("id") for s in data.get("sources", [])}
    for s in data.get("sources", []):
        if s.get("type") not in SOURCE_TYPES:
            problems.append(f"source {s.get('id')}: type {s.get('type')!r}")
        if not str(s.get("url", "")).startswith("http"):
            problems.append(f"source {s.get('id')}: missing url")
    for i, s in enumerate(data.get("scores", [])):
        where = f"score {i} ({s.get('model')} / {s.get('benchmark')})"
        if s.get("model") not in models:
            problems.append(f"{where}: model not in models[]")
        if not isinstance(s.get("value"), (int, float)):
            problems.append(f"{where}: value is not a number")
        if s.get("unit") not in UNITS:
            problems.append(f"{where}: unit {s.get('unit')!r}")
        if s.get("kind") not in KINDS:
            problems.append(f"{where}: kind {s.get('kind')!r}")
        if s.get("kind") != "variant-map" and s.get("source") not in sources:
            problems.append(f"{where}: source {s.get('source')!r} not in sources[]")
    return problems


def main():
    manifest = json.loads((ROOT / "harnesses" / "manifest.json").read_text(encoding="utf-8"))
    loaded = {}
    failed = False
    for h in manifest["harnesses"]:
        if not h.get("data"):
            print(f"- {h['id']}: {h.get('status', 'no data')}")
            continue
        path = ROOT / h["data"]
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as err:
            print(f"x {h['id']}: cannot read {h['data']}: {err}")
            failed = True
            continue
        problems = check(h["id"], data)
        kinds = defaultdict(int)
        for s in data.get("scores", []):
            kinds[s.get("kind")] += 1
        summary = ", ".join(f"{k} {v}" for k, v in sorted(kinds.items()))
        print(f"{'x' if problems else 'ok'} {h['id']}: {len(data.get('models', []))} models, "
              f"{len(data.get('scores', []))} scores ({summary}), {len(data.get('sources', []))} sources")
        for p in problems[:20]:
            print(f"    {p}")
        failed = failed or bool(problems)
        loaded[h["id"]] = data

    if len(loaded) > 1:
        table = defaultdict(dict)
        for hid, data in loaded.items():
            for s in data["scores"]:
                key = (s["model"], norm(s["benchmark"]), norm(s.get("reporter")), norm(s.get("setting") or ""))
                table[key].setdefault(hid, s["value"])
        shared = {k: v for k, v in table.items() if len(v) > 1}
        differ = {k: v for k, v in shared.items() if max(v.values()) - min(v.values()) > 0.05}
        print(f"\n{len(shared)} figures appear in more than one harness; {len(differ)} disagree.")
        for (model, bench, reporter, setting), vals in sorted(differ.items())[:40]:
            print(f"  {model} · {bench} · {reporter} {setting}: {vals}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
