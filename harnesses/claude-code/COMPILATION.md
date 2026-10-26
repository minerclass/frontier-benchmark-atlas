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

## Revision 3 (26 October 2026, Monday check-in)

Written on: mac · claude-code · 2026-10-26

| Field | Value |
| --- | --- |
| Harness | Claude Code, desktop app (Code tab) |
| Model | `claude-opus-5-5` |
| Computer | mac (`MMMacBookPro32`), working in a fresh clone of `main` at `c590c06` |
| Checked | New releases and launch tables since 13 Oct; the CursorBench 4.0 board; the Artificial Analysis leaderboard (Intelligence Index v4.3.2); primary pages that could not be read on 13 Oct |

### New release in scope

- **Muse Spark Open** (Meta, 15 Oct): open weights, 816B total and 42B active parameters, 1M context, Muse Model License. Added to the timeline, the index chart, the reference table and a separate card panel. Meta's card compares it only with open-weight models from labs outside this atlas (Inkling, Nemotron 3 Ultra, Beam, Mistral Large 4, Qwen3.8, GLM 5.3, Kimi K3), so those rivals are named in the panel but not added as atlas models. Spark Open leads 7 of 20 rows. Artificial Analysis lists it at 39 at xhigh, $0.84 per index task. Its Terminal-Bench 4.0 run is 8.1%; the card reports Terminal-Bench 2.1 (76.4) instead. Source: the Hugging Face model card, read directly.

Releases checked and left out because the request does not name them: Kimi K3.1 Pro (Moonshot, 23 Oct), Mistral Large 4 (6 Oct), Qwen3.6 27B, DeepSeek V4.1 Flash, MiniMax M3.1 Flash, Nemotron 3.5, Grok Voice 3.0. No new model from Anthropic, OpenAI, Google or SpaceXAI appeared between 13 and 26 Oct. GPT-6.1 Astra is still unreleased.

### Primary pages now read

| Page | How | Result |
| --- | --- | --- |
| OpenAI, GPT-6 Astra launch page | In the desktop app's browser (direct fetches still return HTTP 403) | Table rebuilt from 17 to 33 rows; see corrections below |
| OpenAI, GPT-6.1 Sol post | Same | Text confirms the 2.2-point AutomationBench statement and Astra's 68.1 on Terminal-Bench Science; chart values not transcribed, still from Vellum and DataCamp |
| Meta, Muse Wonder model card (PDF) | Downloaded; the table is an image, read by rendering the page | All 14 rows match the DEV Community and MindStudio reproductions; adds an OSWorld V2.1 binary row and who ran each comparator |
| Google DeepMind, Gemini 4 Argon model card and methodology PDF | Direct | All 19 rows match Emergent's reproduction; who-ran notes refined (DeepSWE Claude figures from system cards, Chartography without tools) |
| Anthropic, Opus 5.5 page | Direct | Confirms Opus 5 at 52.3 on Terminal-Bench 4.0 (public leaderboard 51.8) and 48.0 on FrontierCode Main |

### Corrections to the OpenAI table

OfficeChai's reproduction, used in revisions 1 and 2, differed from OpenAI's page in these cells:

| Row | Model | Was | Now |
| --- | --- | --- | --- |
| Agents' Last Exam | Claude Fable 5.1 | 48.7 | — (OpenAI prints no figure) |
| Agents' Last Exam | Claude Fable 5 | — | 48.7 |
| FrontierMath Tier 4 v2 | Claude Fable 5 | 87.8 | 90.2 |
| HealthBench Professional | Claude Opus 5 | 54.5 | 56.4 |
| HealthBench Professional | Claude Fable 5.1 | 56.6 | 58.1 |
| Terminal-Bench 4.0 | Claude Opus 5 | 52.3 | 52.6 |

The Terminal-Bench cell settles the difference revision 2 left open: Cursor's 52.6 matches OpenAI's page. Anthropic's own figure for Opus 5 remains 52.3. OfficeChai also omitted many cells and rows that the page prints. The rebuilt table shows every row except the alignment block (lower is better) and OpenScore String Quartets (a 0–1 score). OpenAI's table now leads 20 of 26 contested rows, against 11 of 13 before.

### Leaderboard changes

- **CursorBench 4.0:** Muse Wonder now appears, 50.4% at Max ($5.25 per task). Every other top-effort figure is unchanged from 13 Oct.
- **Artificial Analysis:** still Intelligence Index v4.3.2; every stored index value is unchanged. Muse Wonder's cost per task moved from $4.52 to $4.54. Output speeds were re-read at each model's top effort, and Muse Wonder's rose from 115 to 190 tokens per second. Terminal-Bench 4.0 runs added from the leaderboard data: Claude Haiku 5.5 32.8% (max, claim 39.2) and Grok 4.7 25.8% (xhigh, claim 37.6). Gemini 4 Argon's run is 57.1 in the data (the Muse article printed 57). Muse Spark 1.3 is now listed as deprecated and no longer on the board; its 13 Oct figures stay.

### New disagreement cases

- Claude Opus 5, FrontierCode v1.1 (Main): Anthropic 48.0, OpenAI 53.4.
- Claude Fable 5.1, HealthBench Professional: 62.1 from Anthropic's system card (quoted by Meta and SpaceXAI) against 58.1 from OpenAI's own run with Opus 5 fallback.

### Text changed

The headline finding now reads "Most launch tables favor their publisher" (Meta's Muse Wonder card leads 7 of 15 and SpaceXAI's 2 of 7), and the lede no longer says every table mostly favors its model. The largest independent-run gap is now Grok 4.7 on Terminal-Bench 4.0 (−11.8).

### Not checked

Anthropic's Fable, Sonnet and Haiku pages and Cursor's Grok page were not re-read; nothing in the release trackers pointed to a change. Layout was checked in the desktop app's browser at 375 px and 1280 px.

## Updating for a new release

1. Add the model to `M`, `REF`, `EVENTS` and, when published, `INDEX`/`LADDERS`/`SPEED` in the page's data block. A card that compares only against models outside the atlas goes in its own block, as `OPEN` does for Muse Spark Open.
2. If the lab published a launch table, add it to `TABLES` with its source key and comparators.
3. Re-run `node export.js index.html data.json`.
4. Re-check layout at phone and desktop widths.
