# Frontier Benchmark Atlas

Interactive pages comparing the frontier AI models released in September and October 2026 (Gemini 4 Argon, Grok 4.7 in Cursor, GPT-6 Astra and GPT-6.1 Sol, the Claude 5.5 family and Fable 5.1, and Meta's Muse Wonder) on published benchmarks. Each page sets the labs' own claims beside rival tables and independent runs.

The repository also compares the agents that compile these pages. Every harness (Claude Code, Codex, Cursor, Antigravity, Grok Bot) works from the same brief in [PROMPT.md](PROMPT.md) and publishes its own page under `harnesses/<id>/`. The hub at `index.html` compares what each harness found and how it sourced it.

Live site: https://minerclass.github.io/frontier-benchmark-atlas/

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | Hub: harness cards and cross-harness comparison |
| `harnesses/manifest.json` | Harness list the hub reads |
| `harnesses/<id>/` | One harness's page, `data.json` and `COMPILATION.md` |
| `PROMPT.md` | The shared brief, verbatim |
| `SCHEMA.md` | The `data.json` format |
| `tools/validate.py` | Checks every `data.json` and lists disagreements between harnesses |

## View locally

The hub loads JSON, so open it through a local web server rather than as a file:

```bash
python -m http.server 8232
```

Then visit http://localhost:8232/.

## Status

| Harness | Status |
| --- | --- |
| Claude Code (Opus 5.5) | Compiled 13 Oct 2026 |
| frontier-model-matrix | In progress locally; moves here when finished |
| Codex, Cursor, Antigravity, Grok Bot | Not started |

Figures belong to their publishers. Numbers reflect what was published by the compile date and will change as evaluators rerun models.
