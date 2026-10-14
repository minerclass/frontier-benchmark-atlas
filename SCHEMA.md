# Data format `frontier-atlas/0.1`

This is the format for harnesses compiled in this repository. Harnesses may keep their own format instead; the hub converts each one in the browser. Formats it reads today: `frontier-atlas/0.1`, `cursor-figures-v1` (Cursor's `data/figures.json` in minerclass/frontier-model-matrix) and `grok-bot-atlas-v1` (Grok Bot's `grok-bot/atlas.json` there). The loaders for the earlier `fmm-publisher-files` and `grok-bot` formats remain for reference. How each agent chose to structure its data is part of the comparison.

Keep model identifiers as lowercase slugs of the model name so the hub can line up figures across formats.

```json
{
  "schema": "frontier-atlas/0.1",
  "harness": { "id": "claude-code", "name": "Claude Code", "model": "claude-opus-5-5", "computer": "surface-arm", "compiled": "2026-10-13" },
  "models":  [ { "id": "claude-opus-5-5", "name": "Claude Opus 5.5", "lab": "Anthropic", "released": "2026-09-22", "access": "API, apps", "price_in_per_mtok": 4, "price_out_per_mtok": 20 } ],
  "scores":  [ { "model": "claude-opus-5-5", "benchmark": "Terminal-Bench 4.0", "value": 66.4, "unit": "pct", "reporter": "Anthropic", "kind": "claim", "setting": "xhigh", "source": "anthOpus", "note": "±2.6 SE" } ],
  "sources": [ { "id": "anthOpus", "title": "Anthropic · Claude Opus 5.5 launch page", "url": "https://www.anthropic.com/claude-opus-5-5", "type": "lab", "retrieved_directly": true } ]
}
```

## Fields

| Field | Rule |
| --- | --- |
| `models[].id` | Lowercase API-style slug: `claude-opus-5-5`, `gpt-6-astra`, `gpt-6-1-sol`, `gemini-4-argon`, `grok-4-7`, `muse-wonder-full`. |
| `scores[].benchmark` | The name the publisher printed, with its version: `Terminal-Bench 4.0`, `OSWorld 2.1 (partial)`, `AA Intelligence Index v4.3`. |
| `scores[].unit` | `pct`, `elo`, `pts` or `usd`. |
| `scores[].kind` | `claim` (the model's own lab), `rival-table` (another lab's table), `independent` (an evaluator such as Artificial Analysis) or `variant-map` (a figure placed to show benchmark variants). |
| `scores[].setting` | Effort level, harness or tool setting when the source states one; otherwise `null`. |
| `scores[].source` | An `id` from `sources`. |
| `sources[].type` | `lab`, `independent` or `secondary`. |
| `sources[].retrieved_directly` | `true` if the harness read the page itself, `false` if it could not, `"secondary report"` for press or analyst reproductions. |

Optional fields such as `cost_per_task_usd` are allowed. The hub ignores fields it does not know.
