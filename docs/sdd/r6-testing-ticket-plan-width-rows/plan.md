# Plan — r6 testing-ticket plan width rows

## Files

- `references/test-execution-plan-template.md:24-27` (add `Width` column; example rows; `:29` coverage line; `:31-33` out-of-scope widths). File is 58 lines.
- `skills/procedures/testing-ticket-workflow/WORKFLOW.md:192` (plan scoping sentence), `:235` (header line unchanged or one clause), `:451` (MUST row, add "in the plan and in the results"). File is 458 lines; limit 500, net change <= +2 lines.
- New test `tools/testing-ticket-plan-width/check.test.js` (R1-R4).
- `skills/testing-ticket-workflow/SKILL.md` and `docs/DOC-MAP.md` link the template; checked, link text only, no edit.
- Helix mirror synced by the main thread after merge.

## Options weighed

- Fix the eval expectation: rejected by owner (2026-11-05).
- Fix skill by sentence only (no template column): rejected, the template is what the run followed.
- Chosen: add the column in the template plus matching words in WORKFLOW :192 and :451.

## What may break

- Eval p2 #9 and other testing-ticket evals that quote the old 5-column header; grep `tools` and `docs` before editing.
- skill-lint (500 lines), link-check, portability; plan tables in docs examples (`grep "Spec / path"`).

## Cost

Free tools only. New cost: none.
