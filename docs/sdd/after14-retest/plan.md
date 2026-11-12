# Plan — after-14 retest-bug-workflow fixes

## Files

- `skills/procedures/retest-bug-workflow/closeout-and-notify.md` — R1 (8a/8c branch); offset by merging the duplicate "never hardcode / ask, never guess" lines in 8a.
- `skills/procedures/retest-bug-workflow/comment-and-post.md` — R2, R4 (6d item 2), R5; offset by removing the 6d item 1 text that repeats 6c item 1.
- `skills/procedures/retest-bug-workflow/execute-and-evidence.md` — R3 (one clause at the lane paragraph), R4 (4i record line).
- `references/parallel-test-lanes.md` — R3 (one line under §4).

## Data

No schema change. `run.json` `lanes` / `serialReason` unchanged (R3 keeps several lanes in the manifest, so `retest_manifest.js` needs no new value).

## Options weighed

- R2 self-review fallback (same agent re-reads from files): rejected — not independent, weakens the 6c bar.
- R2 second reviewer outside the session (chosen): keeps the bar, adds one human touch only on hosts without subagents.
- R3 new `serialReason` `no-subagents`: rejected — the guard's `SERIAL_REASONS` (not in this lane's files) would reject it, and serial on one account loses lane isolation.
- R5 cap reviewer rounds: rejected — removes the "no round cap" rule. Chosen: catch mechanical gaps before the first dispatch and ask for one exhaustive pass.

## What may break

Tests that pin skill text (`tools/retest-guard/*.test.js`, `tools/r12-p1-retest`, `tools/r7-retest-no-c`, `tools/retest-case-plan-rules`, skill_lint, helix parity). Mitigation: run every suite from `scripts/list-test-suites.sh`; a pinned line that must change → stop and report.
