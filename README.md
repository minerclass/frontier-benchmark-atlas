# Frontier Benchmark Atlas

Interactive pages comparing the frontier AI models released in September and October 2026 (Gemini 4 Argon, Grok 4.7 in Cursor, GPT-6 Astra and GPT-6.1 Sol, the Claude 5.5 family and Fable 5.1, and Meta's Muse Wonder) on published benchmarks. Each page sets the labs' own claims beside rival tables and independent runs.

The repository also compares the agents that compile these pages. Every harness (Claude Code, Codex, Cursor, Antigravity, Grok Bot) starts from the paste-ready brief in [HARNESS.md](HARNESS.md) and publishes its own page, either under `harnesses/<id>/` here or in its own repository. The hub at `index.html` lists every compilation, loads each one's data live, and compares what each harness found and how it sourced it. Harnesses check for new releases every Monday.

Live site: https://minerclass.github.io/frontier-benchmark-atlas/

Related: the [AI Systems Atlas](https://minerclass.github.io/ai-systems-atlas/) introduces this comparison in its fourth station, "Read the scoreboard", after its stations on the labs, the chips and a prompt's path. [The Stack](https://minerclass.github.io/labs-on-silicon/) is the one-screen sketch of the same labs and chips.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | Hub: harness cards and cross-harness comparison |
| `harnesses/manifest.json` | Harness list the hub reads |
| `harnesses/<id>/` | One harness's page, `data.json` and `COMPILATION.md` |
| `HARNESS.md` | Paste-ready brief for every harness: the request, sourcing rules, hub listing, Monday check-in |
| `PROMPT.md` | The request, verbatim |
| `SCHEMA.md` | The `data.json` format |
| `tools/validate.py` | Checks every `data.json` and lists disagreements between harnesses |

## View locally

The hub loads JSON, so open it through a local web server rather than as a file:

```bash
python -m http.server 8232
```

Then visit http://localhost:8232/.

## Status

| Harness | Where | Status |
| --- | --- | --- |
| Claude Code (Opus 5.5) | `harnesses/claude-code/` here | Compiled 13 Oct 2026, revision 2 |
| Cursor | [minerclass/frontier-model-matrix](https://github.com/minerclass/frontier-model-matrix) (root) | Linked; the hub reads it live |
| Grok Bot | [minerclass/frontier-model-matrix](https://github.com/minerclass/frontier-model-matrix/tree/master/grok-bot) (`grok-bot/`) | Linked; the hub reads it live |
| Codex (Surface ARM) | [minerclass/frontier-codex-observatory](https://github.com/minerclass/frontier-codex-observatory) | Linked; the hub reads it live |
| Antigravity (Surface ARM) | [minerclass/frontier-antigravity-observatory](https://github.com/minerclass/frontier-antigravity-observatory) | Linked; the hub reads it live |

Harnesses keep their own data formats and may live in their own repositories. The hub converts each format in the browser (`frontier-atlas/0.1`, Cursor's publisher files, Grok Bot's records). Nothing is copied between repositories.

Figures belong to their publishers. Numbers reflect what was published by the compile date and will change as evaluators rerun models.
