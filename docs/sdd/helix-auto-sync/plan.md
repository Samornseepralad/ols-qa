# helix-auto-sync — plan

Spec: `spec.md` H1–H10. SDD step 2. Touches other repos: **plan only** (nothing outside this doc is changed by this PR).

## Chosen design (Option A)

A push-triggered GitHub Action in **ols-qa** opens/updates one Helix PR; the existing **OLS health check** on the VM
raises the H8 alert. S9 is untouched.

```
ols-qa main push (skills/ references/ commands/)
  └─ .github/workflows/helix-sync.yml  (ubuntu-latest, public repo = free)
       ├─ checkout ols-qa @ pushed sha (fetch-depth 0) + helix main (with sync token)
       ├─ range = Synced-From trailer on helix main (or open PR) .. pushed sha          (H2)
       ├─ sync-skills-to-helix.sh  HELIX_SYNC_MODE=pr  <files in range>             (H1, H6)
       │    secret pre-scan → copy → helix gates (sync-version, portable, structure)
       │    → commit with "Synced-From: ols-qa@<sha>" → push branch sync/ols-qa-auto
       ├─ check-rule-lines.sh origin/main HEAD  → reword list (report only)         (H3)
       ├─ ci-token-budget.sh pr origin/main     → budget delta (report only)        (H4)
       ├─ helix-parity.sh                       → DIFFERS list (report only)        (H5)
       └─ gh pr create | gh pr edit  (one PR, body = files + rewords + budget + parity)
VM: scripts/ols/vm/health.mjs  (existing timer) → new signal "helix-drift" > N h → one bot alert / recovery (H8)
```

## Files

| Repo | File | Change |
|---|---|---|
| ols-qa | `.github/workflows/helix-sync.yml` | new: `on: push: branches [main], paths [skills/**, references/**, commands/**]` + `workflow_dispatch`; `concurrency: helix-sync` (no cancel); `permissions: contents: read`; never `pull_request_target` |
| ols-qa | `scripts/sync-skills-to-helix.sh` | add `HELIX_SYNC_MODE=pr` (default stays `main` so the local post-commit path is unchanged): commit on `sync/ols-qa-auto` rebuilt from helix `origin/main`, add `Synced-From` trailer, `git push --force-with-lease` the branch, never push `main` |
| ols-qa | `scripts/helix-sync-pr-body.sh` | new: builds the PR body from the reword, budget and parity outputs |
| ols-qa | `scripts/tests/helix-sync-*.test.sh` (or the repo's existing suite under `scripts/run-test-suites.sh`) | new tests, run by existing `tests.yml` |
| ols-qa | `CLAUDE.md` §5, `AGENTS.md` "Retest skill source of truth" | doc: GitHub merges now sync via the Action; the post-commit text says helix main push is refused by the ruleset |
| pluton-ai-agent | `scripts/ols/vm/health.mjs` + `health.test.mjs` | new signal `skills` (H8, built as T7), same incident/recovery state as the existing R13 signals; reuses `checkSkills` of `scripts/ols/lib/skills-sync.mjs` with the tick's `FLOW_SKILLS` (read-only `git show origin/main:…`, no fetch: it sees the same refs the tick's S9 check sees); N = 1 h (owner 12 Nov); onset in `ols-health.json` `drift.skills.since` |
| pluton-ai-agent | `docs/sdd/ols-vm-runtime/tasks.md` | close the "S9 skill drift open" note by pointing here |
| helix | none | ruleset, CI, register untouched |

Lane check (repo `CLAUDE.md`): `scripts/ols/vm/**` is OLS lane; `skills-sync.mjs` not touched; no shared file
(`gate`, `redact`, `tick.mjs`, …) changes, so no Pyrite hand-off is needed.

## Secret

Why one is needed at all: a PR opened with the ols-qa run's `GITHUB_TOKEN` cannot write to helix, and even inside
helix a PR opened by `GITHUB_TOKEN` does not trigger `pull_request` workflows, so the three required checks would
never run and the PR could never merge. The Action needs a credential of its own on helix.

| | **A1. GitHub App (recommended)** | A2. Fine-grained PAT |
|---|---|---|
| Secret names in ols-qa | `HELIX_SYNC_APP_ID` (variable) + `HELIX_SYNC_APP_KEY` (secret, private key) | `HELIX_SYNC_TOKEN` (secret) |
| Scope | App installed on **helix only**; permissions Contents: Read and write, Pull requests: Read and write, Metadata: Read | Resource owner Thitic9203, **Only select repositories: helix**; Contents: Read and write, Pull requests: Read and write |
| Author shown on PR | `helix-sync[bot]` (not the owner) | the owner's account |
| Expiry | none (1-hour tokens minted per run by `actions/create-github-app-token`) | max 1 year; expiry = silent stop (H8 catches it after N h) |
| Cost | free | free |
| Who creates | **owner** (Settings → Developer settings → GitHub Apps; install on helix; paste key into ols-qa secrets) | **owner** (Settings → Developer settings → Fine-grained tokens; paste into ols-qa secrets) |

Recommendation A1, sourced: repo `CLAUDE.md` / spec `slack-bot-identity` (an agent's writes must not appear as the
owner), memory 12 Nov `vm-github-token-finegrained` (least-privilege token, not the owner's broad one), and PAT expiry
is a known silent-failure path. The agent cannot create either: both need the owner's GitHub session (CLAUDE.md
prohibited actions: no entering tokens, no account changes). Neither credential needs `workflow` scope, `admin`, or
access to any repo other than helix. The deploy key `HELIX_DEPLOY_KEY` must not be reused: it is the ruleset bypass
actor and could push `main` directly, defeating H1.

Public-repo safety: secrets are not given to fork PR runs, and the workflow triggers only on `push` to `main` and
`workflow_dispatch` (write access required), so no outside contributor can reach the token.

## Cost (H10)

ols-qa and helix are both `PUBLIC` (`gh repo view … --json visibility`, 12 Nov). GitHub-hosted standard runners are
free and unmetered for public repositories, so the new job (~2–4 min per shared-file merge) and the extra helix PR
check runs consume no billed minutes. ols-qa `tests.yml` already relies on the same fact ("Free on a public
repository — no new spend"). The VM health signal reuses an existing timer. **New cost: NO.** Risk to watch: if either
repo is made private, minutes start counting against the 2,000/month free quota; the workflow must then be reviewed.

## Alternatives weighed

| Option | For | Against | Verdict |
|---|---|---|---|
| **A. Push Action in ols-qa** (chosen) | fires on the exact event that was missed; minutes free; ols-qa already holds the sync script and its guards | needs a PR into ols-qa outside the 6 Nov two-file allowance (owner Q2); one new credential | chosen |
| B. Scheduled Action in helix | no ols-qa write; ols-qa is public so helix can read it tokenless | still needs App/PAT (GITHUB_TOKEN PRs do not run required checks); cron delay up to the interval; scheduled workflows are auto-disabled after 60 days without repo activity; duplicates the sync logic outside its home | rejected |
| C. OLS tick / VM does the sync | VM already has a fine-grained token with helix Contents + Pull requests (memory 12 Nov), no new secret | sync then depends on the VM being up and on the OLS lane; mixes release plumbing into the order loop the owner wants focused (memory "focus on session goal"); PRs still appear as the owner | rejected for sync; **kept for the H8 alert only** (bot token already on the VM) |
| D. Keep manual step, alert only | zero new code in ols-qa | the 12 Nov failure mode stays; every merge needs a person | rejected |

## What may break

- `sync-skills-to-helix.sh` default path (local post-commit) must keep behaving the same; a regression here ships
  unreviewed text again (2026-10-14 incident in the script header). Covered by keeping `main` mode the default and a
  test for it.
- Force-updating `sync/ols-qa-auto` could drop an owner's register commit on that branch (edge case in spec); the
  rebuild must keep non-Action commits.
- `Synced-From` trailer missing on old helix history: first run has no baseline. Baseline = the ols-qa sha the owner
  names at install (proposed: ols-qa `origin/main` after Helix PR #35 merges), stored as the first trailer.
- Helix `pr-check` "Warn if merge will trigger CI patch bump": expected, publish auto-bumps on merge; no change.
- health.mjs new signal must not change the existing R13 signals' state keys.
