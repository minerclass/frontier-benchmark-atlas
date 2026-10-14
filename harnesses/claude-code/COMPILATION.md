Written on: surface-arm · claude-code · 2026-10-13

# How Claude Code compiled the Frontier Benchmark Atlas

## Harness

| Field | Value |
| --- | --- |
| Harness | Claude Code, desktop app (Code tab) |
| Model | `claude-opus-5-5` |
| Computer | surface-arm (`MSURFACE32ARM64`) |
| Compiled | 13 October 2026, about 20:00–21:15 CDT |
| Page | `index.html` (self-contained; loads d3 7.8.5 from cdnjs and fonts from Google Fonts) |
| Data | `data.json` (schema `frontier-atlas/0.1`, exported from the page by `export.js`) |

## Brief received

> create a visual set of schematics and interactive charts showing Gemini 4 Argon, Cursor with Grok 4.7 various models, ChatGPT 6.1 various relevant models as well as Astra, Claude 5.5 set of models and 5.1 Fable, and the new Muse models as they compare to each other on various performance benchmarks against the company claims and let it be immersive and visual

## Process

1. Web search on each family (Gemini 4 Argon, Grok 4.7 in Cursor, GPT-6.1 and Astra, Claude 5.5 and Fable 5.1, Muse) to establish which models exist and what the labs published.
2. Fetched primary pages where possible: Anthropic's Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1 pages; Google's Argon post; Cursor's Grok 4.7 page; the Artificial Analysis leaderboard and Muse Wonder article.
3. Where a primary page refused automated retrieval (OpenAI's launch pages and Meta's model card returned HTTP 403 or were not reachable), used press and analyst reproductions and cross-checked them against rival tables that cite the same figures.
4. Recorded each figure with who published it (`claim`, `rival-table`, `independent`) and the setting where stated.
5. Validated the five lab colors with the dataviz palette validator in light and dark modes. CVD separation sits in the 6–8 warning band, so every mark also carries a text label or shape.
6. Checked layout at 375 px and 1280 px for page overflow and for SVG text running past its chart. No console errors.

## What the brief assumed and what the sources show

- **"ChatGPT 6.1 … as well as Astra":** the 6.1 generation shipped only as GPT-6.1 Sol (29 Sep). GPT-6.1 Astra was shelved after alignment regressions. GPT-6 Astra (3 Sep) is the flagship.
- **"Cursor with Grok 4.7":** Grok 4.7 is SpaceXAI's model (coverage uses that name for xAI). Cursor offers it in its model pool with Grok 4.6, Grok 4.5 and Cursor's own Composer 2.5.
- **"The new Muse models":** Meta's Muse Wonder and Muse Wonder Full (12 Oct). Wonder Full is available only through the Muse Code subscription.
- **"Claude 5.5 set and 5.1 Fable":** Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1. Claude Mythos 5.1 is the same model as Fable 5.1 with some safeguards lifted, available only through trusted access.

## Known limits

- OpenAI and Meta figures are second-hand (OfficeChai, DataCamp, Vellum, SiliconANGLE, DEV Community, MindStudio). Each is marked `secondary` in `data.json`.
- Google's comparison table comes from Emergent's reproduction of Google's methodology document. Google's post has no table.
- The AutomationBench value of about 33.2 for Opus 5.5 is derived from OpenAI's "Sol beats Opus by 2.2 points" statement, not published directly.
- Artificial Analysis index values are v4.3.x and will change as models are rerun.
- Gemini 4 Argon's dates conflict: trackers give 30 Sep (announced, limited access); Google's availability post is dated 13 Oct.

## Revision 2 (13 October 2026, about 21:45 CDT)

Comparing this compilation with Cursor's record (`minerclass/frontier-model-matrix` at `058c977`) found two errors here. Both were checked against a primary source before changing anything.

| What | Was | Now | Evidence |
| --- | --- | --- | --- |
| GPT-6 Astra, Terminal-Bench 4.0, OpenAI's own figure | 57.7 (OfficeChai summary) | 57.9 | Anthropic's Opus 5.5 page quotes OpenAI's figure as 57.9; Cursor read 57.9 on OpenAI's page |
| CursorBench 4.0 chart | Six lab-reported values; said Composer 2.5 had no v4.0 score | Cursor's public board at each model's top effort, including Gemini 4 Argon 52.9, Haiku 5.5 48.4, Muse Spark 1.3 41.6 and Composer 2.5 27.7 | https://cursor.com/cursorbench, read 13 Oct 2026 |

One difference is left open: Claude Opus 5 on Terminal-Bench 4.0 in OpenAI's Astra table. This page has 52.3 (OfficeChai); Cursor's read of OpenAI's page has 52.6. OpenAI's page could not be retrieved here to settle it.

Cursor's and this compilation overlap on 109 model and benchmark pairs. Every one of those pairs shares at least one identical value.

## Updating for a new release

1. Add the model to `M`, `REF` and, when published, `INDEX`/`LADDERS` in the page's data block.
2. If the lab published a launch table, add it to `TABLES` with its source key and comparators.
3. Re-run `node export.js index.html data.json`.
4. Re-check layout at phone and desktop widths.
