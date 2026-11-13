# Plan — after16-testing-ticket

## Files

- `references/customer-escape-prevention.md` — `:112`, `:221` lane → row + "widths share the screen's lane" (R1).
- `references/settle-and-strategize.md` — `:3` order, §4 exemption; offsets: rationale sentences (R2, R3).
- `commands/testing-ticket.md` — `:3` intake list (R4).
- `skills/procedures/testing-ticket-workflow/results-update.md` — G8 `:210-212` (R5).
- `references/result-quality-gate.md` — layer 14 `:179-183` (R6).
- `tools/result-gate/check.js`, `check.test.js` — accept the no-repo-access form (R6).
- `references/jira-wiki-vs-markdown.md` — sentence after `:8-9` (R7).
- `references/playwright-preflight.md`, `references/qa-debug-discipline.md` — PD3, CP grep (R8).

## Approach

R1 picks "row": the same rule stated in `WORKFLOW.md:409` (same 7-escape rationale) already says row, the plan template `:226` says row, and lane grouping (`parallel-test-lanes.md:58`, retest `WORKFLOW.md:285`) puts one screen's widths in one unit. Rejected: making each width its own lane — it would change the lane plan of testing-ticket and retest-bug and add accounts per width.

R6: a narrow, fixed token (`not checked — no repo access (…)`) the checker matches by regex; free text still fails, so the sweep is not weakened where code is readable.

## Libraries

None. No new cost.

## What could break

Pinned-text tests under `tools/` (grep for the edited phrases), `tools/result-gate/check.test.js`, readers of the shared references (retest-bug, review-result, smoke, tc-fe-prep, create-bug). The `:221` MUST line is reworded → helix `rule-line-register.json` entry needed at sync.
