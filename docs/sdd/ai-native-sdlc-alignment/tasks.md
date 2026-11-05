# Tasks — AI-native SDLC alignment

| Task | What | Rules | Test that fails first | Done when |
| --- | --- | --- | --- | --- |
| T1 | `docs/sdd/_template/intent.md`; `sdd-gate` requires `intent.md` for SDD folders added after the approval date | R1 | new SDD folder without intent.md is flagged | gate test green |
| T2 | `sdd-gate` warns when a PR changes a file named in no `plan.md` of its folder (skips docs-only PRs) | R2 | PR touching an unnamed file warns | warn test green, no fail |
| T3 | `tools/sdlc-metrics`: intent→spec time, spec-after-plan count, first-pass CI rate, PR open→merge | R4 | known git fixture gives known numbers | unit test green; run prints a table |
| T4 | `docs/helix-eval-live-suite.md`: one command to run a round, rule to add a prompt per escaped defect | R3 | link-check passes | file on main |
| T5 | `tools/ci-band`: rolling-30d failure rate, 1σ/2σ/3σ tiers, never acts | R5 | synthetic series breaches 3σ once | unit test green |
| T6 | Report which hooks could move to managed settings (no change) | R6 | n/a (report) | report in this folder |
