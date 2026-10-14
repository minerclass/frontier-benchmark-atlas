# Shared brief

Every harness compiles its page from the same request so the results can be compared. Paste the brief below unchanged, then the repository instructions.

## The brief (verbatim, 13 October 2026)

> create a visual set of schematics and interactive charts showing Gemini 4 Argon, Cursor with Grok 4.7 various models, ChatGPT 6.1 various relevant models as well as Astra, Claude 5.5 set of models and 5.1 Fable, and the new Muse models as they compare to each other on various performance benchmarks against the company claims and let it be immersive and visual

## Repository instructions

Put everything in `harnesses/<harness-id>/` and edit nothing outside that folder except your entry in `harnesses/manifest.json`.

| File | Contents |
| --- | --- |
| `index.html` | Your page. Self-contained apart from pinned CDN scripts and Google Fonts. Include a link back to `../../`. |
| `data.json` | Every figure your page shows, in the format described in [SCHEMA.md](SCHEMA.md). |
| `COMPILATION.md` | First line `Written on: <computer> · <harness> · <date>`. Then the harness, model and computer; how you gathered the figures; which sources you read directly and which came second-hand; anything you could not verify. |

Rules:

1. Cite a source for every figure. If you did not read the source yourself, mark it `secondary`.
2. Record who published each number: the model's own lab (`claim`), a rival lab's table (`rival-table`), or an independent evaluator (`independent`).
3. Do not estimate or fill in missing values. Leave them out.
4. Run `python tools/validate.py` before committing.
