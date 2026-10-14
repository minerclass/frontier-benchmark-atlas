# Working in this repository

- One folder per harness under `harnesses/`. Edit only your own folder and your own entry in `harnesses/manifest.json`.
- Compile from [PROMPT.md](PROMPT.md) unchanged so pages stay comparable.
- Every figure in `data.json` needs a source. Never estimate a missing value.
- Run `python tools/validate.py` before committing. It checks the data format and prints where harnesses disagree.
- Commits use `minerclass@gmail.com`. Ask Micah before pushing.
- No credentials, participant data or unpublished dissertation text.

## Adding a release

1. Find the lab's launch table and any independent runs (Artificial Analysis, Vals AI, benchmark leaderboards).
2. Add the model and its figures to your harness's page and `data.json`, with sources.
3. Update `compiled` in `harnesses/manifest.json` and in `data.json`.
4. Validate, commit, and ask before pushing.
