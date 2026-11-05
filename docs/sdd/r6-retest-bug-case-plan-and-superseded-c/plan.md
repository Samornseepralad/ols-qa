# Plan — r6 retest-bug case plan and superseded C

## Files

- `skills/procedures/retest-bug-workflow/WORKFLOW.md:288-290` (R1, R3), `:486` (R2, R3), `:472` (R4).
- `skills/procedures/retest-bug-workflow/execute-and-evidence.md:187-190` (R4).
- `references/non-pass-challenge-gate.md:131` (R5), optionally one clause at `:122-123`.
- `skills/procedures/testing-ticket-workflow/WORKFLOW.md:434` (R6, one parenthesis, no line added; file is 458 lines, limit 500).
- New test `tools/retest-case-plan-rules/check.test.js` reading the files above (R1-R6).
- Helix mirror: identical copy is synced by the main thread after merge (`scripts/sync-skills-to-helix.sh`), not here.

## Approach

Text-only. Add one clause per sentence; do not reword unrelated lines. Wording model:
`:289` "... its design node link (UI cases) · the fixture it needs (these columns belong to the Step 2c plan table)";
`:486` "... never a design-node column (that ban applies only to this posted table, not to the Step 2c plan)";
`:472` / `execute-and-evidence.md` "the bug's ER or the task's AC".

## Options weighed

- Edit only retest-bug files: rejected for R5, because the gate offers C by itself and is read by testing-ticket.
- Edit the gate only: rejected, retest-bug carries its own copy of the rule (`:472`, `:187`) which would stay bug-only.
- Chosen: gate (single source) plus matching words in both callers.

## What may break

- `tools/skill-lint` (max 500 lines, ratchet baseline), `skill-text-guard`, `link-check`, `portability`.
- Existing tests quoting `never a design-node column` or `(C) Confirm the defect` (grep before editing).
- Eval: p1 #2 and p2 #5 may now pass; no expected item is edited here.

## Cost

Free tools only (node test runner, grep). New cost: none.
