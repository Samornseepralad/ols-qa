# Plan — after17-testing-ticket

## Files

- `skills/procedures/testing-ticket-workflow/execute-and-summarize.md` — F3 → pointer, F5 step 2 one question (R1); E1 step 4 (R2); `:233` history note (R12); `:34` fan-out (R15).
- `references/test-execution-plan-template.md` — `:33`, `:37` (R3).
- `skills/procedures/testing-ticket-workflow/WORKFLOW.md` — actor wording (R4); long non-rule lines, References table → pointer (R12).
- `references/parallel-test-lanes.md` — `:69` (R15), `:122` (R4), `:193` lease (R8), `:196` NO-ADVISOR wording (R4).
- `references/round-time-contract.md` — `:33` (R4), `:48` (R15).
- `references/dependencies.md` — `:4` (R6), `/plugin` hints (R4).
- `references/root-cause-investigation.md` — `:42` (R4), `:176` (R7).
- `references/qa-evidence-coverage.md`, `references/bug-priority-matrix.md`, `skills/procedures/testing-ticket-workflow/references/playwright-discipline.md` (R5).
- `skills/procedures/testing-ticket-workflow/results-update.md`, `references/jira-linebreak-conversion.md`, `references/session-closing.md` (also the helix router's mandatory read: bytes ≤ before), `references/long-workflow-todos.md`, `references/verify-closing-checklist.md`, `references/user-communication.md`, `references/qa-debug-discipline.md` (R6).
- `references/no-wait-decision-gate.md` layer 14 (R7).
- `references/resilient-selectors.md` (R8); `references/session-start-context.md` (R9; offset `:3`); `references/non-pass-challenge-gate.md` (R10); `references/qa-evidence-gates.md` (R11; `references/result-quality-gate.md` inbound link left on the anchor — re-pointing it adds a must-read hop); `skills/procedures/testing-ticket-workflow/references/worked-example.md` (R13); `skills/testing-ticket-workflow/SKILL.md` (R14); `references/jira-comment-post-review.md` (R16).

## Approach

Text-only edits. Offsets come from true restatement: the F3 tables copied from defect-candidates.md, the WORKFLOW References table that repeats SKILL.md *Contents*, and the 14 "moved there" stub sections (kept as `<a id>` anchors in one table so inbound links still resolve).

Rejected: deleting stub anchors outright (inbound links from `result-quality-gate.md`, review-result WORKFLOW and outside repos would break); merging duplicate MUST rows (cuts rule lines without an owner register entry).

## Shared files and their other readers

`parallel-test-lanes.md`, `round-time-contract.md`, `no-wait-decision-gate.md`, `root-cause-investigation.md`, `qa-evidence-gates.md`, `qa-evidence-coverage.md`, `dependencies.md`, `session-start-context.md`, `user-communication.md`, `verify-closing-checklist.md`, `session-closing.md`, `long-workflow-todos.md`, `jira-linebreak-conversion.md`, `jira-comment-post-review.md`, `non-pass-challenge-gate.md`, `resilient-selectors.md`, `qa-debug-discipline.md`, `bug-priority-matrix.md` are read by retest-bug, smoke, review-result, create-bug, tc-fe/tc-api and catch-ai. Each edit is a clarification of the same rule (no new step, no removed gate); listed in the PR for the main thread to serialise.

## What could break

- Link checker: `<a id>` anchors must be recognised (already used in `skill-rules-style.md:25`).
- `agent-dispatch-guard` needs the literal `NO-ADVISOR` token — kept.
- Token budget: measured in a scratch helix worktree before the PR.
