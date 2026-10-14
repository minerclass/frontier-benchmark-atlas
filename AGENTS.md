# Working in this repository

- One folder per harness under `harnesses/`, or a linked repository. Edit only your own folder and your own entry in `harnesses/manifest.json`.
- A linked harness stays in its own repository in its own format. Its manifest entry gives `format`, `repo`, `page` and the raw data URLs; the hub needs a loader for the format. Do not copy another harness's files into this repository.
- Start from [HARNESS.md](HARNESS.md), the paste-ready brief for every harness. It carries the verbatim request from [PROMPT.md](PROMPT.md).
- Monday is check-in day: look for new releases and update only your own compilation.
- Every figure in `data.json` needs a source. Never estimate a missing value.
- Run `python tools/validate.py` before committing. It checks the data format and prints where harnesses disagree.
- Commits use `minerclass@gmail.com`. Ask Micah before pushing.
- No credentials, participant data or unpublished dissertation text.

## Adding a release

1. Find the lab's launch table and any independent runs (Artificial Analysis, Vals AI, benchmark leaderboards).
2. Add the model and its figures to your harness's page and `data.json`, with sources.
3. Update `compiled` in `harnesses/manifest.json` and in `data.json`.
4. Validate, commit, and ask before pushing.
