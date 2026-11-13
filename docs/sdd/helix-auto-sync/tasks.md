# helix-auto-sync — tasks

Spec `spec.md`, plan `plan.md`. Each task: failing test first, then code, then the test goes green. Commits cite
`Spec: docs/sdd/helix-auto-sync H<n>`. Nothing starts before owner gate 3 (plan approval) and Q1/Q2 answers.

| # | Task | Rules | Failing test first | Done when | Status |
|---|---|---|---|---|---|
| T0 | Owner: create the credential (Q1) and approve the ols-qa PR scope (Q2); set baseline sha | H1, H2 | — | secret/variable present in ols-qa (`gh secret list` names only); baseline sha recorded here | ⬜ |
| T1 | `sync-skills-to-helix.sh` `HELIX_SYNC_MODE=pr`: build `sync/ols-qa-auto` from helix `origin/main`, commit with `Synced-From`, push branch only | H1, H6 | test with a local bare "helix" remote: pr mode leaves remote `main` unchanged and creates the branch (fails today: script pushes `HEAD:main`) | test green; `main` mode test (existing behaviour) still green | ⬜ |
| T2 | Range from `Synced-From` trailer to pushed sha; ignore unchanged backlog files | H2 | fixture: 3 differing files, 1 changed in range → branch diff has 1 file (fails today: no range logic) | green | ⬜ |
| T3 | Keep foreign commits on the sync branch when rebuilding | edge | fixture: branch with an extra commit by another author → after rerun the commit is still there or a PR comment is produced (fails today) | green | ⬜ |
| T4 | `helix-sync-pr-body.sh`: rewords (from `check-rule-lines.sh`), budget delta, parity list, new/deleted/Helix-first files | H3, H4, H5 | fixture with one reworded MUST line → body lists it under "owner approval needed"; register file byte-identical; title has no `[rule-reword]` (fails: script absent) | green | ⬜ |
| T5 | Secret guard stops everything | H6 | fixture source with a Tier-1 shape (e.g. a Bearer token) → exit ≠ 0, no branch push, no PR call (fails until T1 wires the pre-scan in pr mode) | green | ⬜ |
| T6 | `.github/workflows/helix-sync.yml` (push main + paths, dispatch, concurrency, App token, `gh pr create`/`edit`, never merge) | H1, H9, H10 | `actionlint` + a test that greps the workflow: no `pull_request_target`, no `gh pr merge`, no `HELIX_DEPLOY_KEY`, `concurrency.cancel-in-progress: false` (fails: file absent) | green in ols-qa `tests.yml` | ⬜ |
| T7 | `health.mjs` signal `helix-drift` > N h: one alert, silence, one recovery; bot only | H8 | `health.test.mjs` cases: drift 59 min → no post; 61 min → one post naming files + PR link; next run → no post; parity → one recovery (fail today: signal absent) | green; dry run on VM prints the expected text | 🟡 code + tests (PR `feat/ols-helix-drift-alert-h8`): signal `skills` in `health.mjs` = `checkSkills` (read-only, tick's `FLOW_SKILLS`, `~/GitHub/ols-qa` vs `~/GitHub/helix` at `origin/main`); N = 1 h (owner 12 Nov); onset kept in `ols-health.json` `drift.skills.since` (live only, saved before any post); 7 tests in `health.test.mjs` (≤ 60 min no post, 65 min one root naming files + owner-free fix, silent to 180 min, parity → one reply in thread; short drift resets the hour; check error = unknown; dry posts/writes nothing); open: PR link in the alert (spec H8) not included, VM dry run not yet done |
| T8 | S9 unchanged | H7 | `node --test scripts/ols/lib/skills-sync.test.mjs` before and after; `git diff` on `skills-sync.mjs` empty | green, empty diff | ⬜ |
| T9 | Live check on a throwaway shared-file edit in ols-qa (owner-approved), then docs | all | — | one helix PR from `sync/ols-qa-auto`, 3 required checks ran, second push updated same PR; ols-qa `CLAUDE.md` §5 + `AGENTS.md` updated; `ols-vm-runtime/tasks.md` note closed | ⬜ |

Checks before each PR: ols-qa `bash scripts/run-test-suites.sh`; pluton-ai-agent `node --test scripts/ols` and
`node --test scripts/pyrite` (both lanes, repo `CLAUDE.md`). No merge by a lane (ADLC gate 6).
