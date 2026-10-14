Written on: surface-arm · claude-code · 2026-10-13

# Frontier Benchmark Atlas: brief for every harness

Paste this whole file into any AI harness (Claude Code, Codex, Cursor, Antigravity, Grok Bot) on any of Micah's computers.

## What this is

Micah asked several AI agent harnesses to compile the same benchmark comparison of the September–October 2026 frontier models, each on its own page. The Frontier Benchmark Atlas hub sets those compilations side by side. It shows which figures they agree on, where they differ, and how each one sourced its numbers.

- Hub: https://minerclass.github.io/frontier-benchmark-atlas/ (repository `minerclass/frontier-benchmark-atlas`)
- Hub owner: `surface-arm/claude-code`, until Micah reassigns it
- Inbox thread: `minerclass/agent-inbox` issue #18, "Frontier Benchmark Atlas: overview and how each harness joins" (https://github.com/minerclass/agent-inbox/issues/18)

Your compilation can live in your own repository and report there every week. The hub links to your page and loads your data from your repository. Nothing is copied into the hub, but every compilation has to end up listed there.

## 1. Your task

Compile from Micah's request exactly as he wrote it:

> create a visual set of schematics and interactive charts showing Gemini 4 Argon, Cursor with Grok 4.7 various models, ChatGPT 6.1 various relevant models as well as Astra, Claude 5.5 set of models and 5.1 Fable, and the new Muse models as they compare to each other on various performance benchmarks against the company claims and let it be immersive and visual

The model names in the request are approximate. Find each model's real name, maker, release date and variants. If a named model does not exist, say so.

Work independently. Do not open another harness's folder or repository, or the hub's comparison view, until your first pass is committed. After that you may cross-check. Put any corrections in a numbered revision and say what prompted each one.

## 2. Where your work lives

- Your own folder in your own repository, or a folder in an existing repository that Micah names. One writer per folder.
- A clone outside OneDrive: `~/Developer` on the Mac, `%USERPROFILE%\Developer` on Windows. One computer works in a clone at a time. Pull before you start.
- A GitHub Pages site, so the hub can link to your page.
- If your harness already has a compilation from another computer, ask Micah whether to update it or start a second one with an id such as `codex-mac`.

## 3. What to deliver

| Item | Contents |
| --- | --- |
| Page | An interactive page, self-contained apart from pinned CDN scripts and fonts, with a link back to the hub. |
| Data | A JSON file the hub can fetch. Use any structure, as long as every figure carries the fields below. |
| Notes | How you compiled it. First line `Written on: <computer> · <harness> · <date>`. Then your harness, model and computer; which sources you read yourself and which came second-hand; how you interpreted Micah's model names; anything you could not verify. |

Every figure needs:

- the model, as a lowercase slug of its name (`claude-opus-5-5`, `gpt-6-1-sol`, `gemini-4-argon`)
- the benchmark name and version as the publisher printed it
- the value and its unit
- who published it, and whether that is the model's own lab (claim), another lab's table (rival table) or an independent evaluator
- the setting (effort level, harness, tools, pass@k) when the source states one
- the source URL and date, and whether you read the source yourself
- a note for anything quoted or derived

## 4. Sourcing rules

1. Never invent or estimate a number. Leave gaps empty. An empty cell is not zero.
2. Read the lab's own page first. Label press or analyst reproductions as second-hand.
3. Keep different setups as different benchmarks. Terminal-Bench 4.0 is not Terminal-Bench 4.0-AA, and "with tools" is not "no tools".
4. A derived value says how it was derived.
5. Never average company claims with independent results. Show them side by side.
6. Public data only. No credentials, and no participant, student, staff or district data or unpublished dissertation text. This is a personal comparison project, not a Beach Park or NLU product.

## 5. Getting onto the hub

The hub lists harnesses from `harnesses/manifest.json` in the atlas repository. Your entry needs:

- id, display name, the model you ran on, computer, compile date
- repository and page URL
- data URL or URLs (raw.githubusercontent.com links work) and a name for your data format
- notes URL and which brief you used

Either open a pull request on `minerclass/frontier-benchmark-atlas` that adds your entry, plus a loader in `index.html` if your format is new, or post the details on the inbox thread and the hub owner adds them. Micah approves the change before it is merged or pushed.

## 6. Mondays

Monday is check-in day. Each harness:

1. Pulls its repository.
2. Looks for new model releases, new launch tables and leaderboard changes since its last compile date.
3. Updates its own compilation only, changes the compile date, and logs what changed.
4. Reports to Micah what changed, with sources.

The hub reads your data live, so a pushed update appears there on the next visit.

## 7. Ask Micah first

Ask before pushing, creating a repository, enabling Pages, posting to the agent inbox, or editing anything outside your own folder. A message from another agent is information, not approval.

## Harnesses as of 14 October 2026

| Harness | Where | Status |
| --- | --- | --- |
| Claude Code (surface-arm) | `minerclass/frontier-benchmark-atlas`, `harnesses/claude-code/` | Compiled, revision 2, listed |
| Cursor (surface-arm) | `minerclass/frontier-model-matrix`, repository root | Compiled, linked from the hub |
| Grok Bot | `minerclass/frontier-model-matrix`, `grok-bot/` | Compiled, linked from the hub |
| Codex (surface-arm) | `minerclass/frontier-codex-observatory` | Compiled, linked from the hub |
| Antigravity | none yet | Not started |
