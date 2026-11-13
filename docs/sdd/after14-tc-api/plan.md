# Plan — after-14 tc-api-prep-workflow fixes

## Files

| File | Rules |
|------|-------|
| `skills/tc-api-prep-workflow/SKILL.md` | R1, R2, R5, R10 |
| `skills/procedures/tc-api-prep-workflow/WORKFLOW.md` | R1, R8, R10 |
| `skills/procedures/tc-api-prep-workflow/phase-d-scope-design.md` | R7 |
| `skills/procedures/tc-api-prep-workflow/phase-e-review.md` | R4 |
| `skills/procedures/tc-api-prep-workflow/phase-f-draft.md` | R3 |
| `skills/procedures/tc-api-prep-workflow/phase-g-deliver.md` | R6 |
| `skills/procedures/tc-api-prep-workflow/references/markdown-template.md` | R3 |
| `skills/procedures/tc-api-prep-workflow/references/delivery-options.md` | R6, R10 |
| `skills/procedures/tc-api-prep-workflow/references/worked-example.md` | R9 |

No library, script or test change. No shared reference edited.

## Approach

- R1/R2: SKILL.md § Dependencies keeps every row, each tagged with the delivery that uses it, and says the check runs when Phase C records the delivery (before Phase D), not before step 1; a failed check stays a stop. WORKFLOW Phase C gets one line that runs those checks before Phase D. This scopes the rows inside the skill, so `references/dependencies.md` is untouched; the skill text names its own timing, which a reader applies over the shared default.
- Chosen over "check at G2 only": checking right after Phase C fails fast (before the user reviews a draft that cannot be delivered) and still runs before any Jira delivery.
- R5: the csv-template-types link stays (skill-lint must-read-depth: csv-export-rules.md:5 makes it a must-read edge) but its line says TC FE only, never opened here.
- R10: shorter checklist lines (the Phase sections already name each file); delivery-options.md links instead of restating; default-columns.md leaves the SKILL.md "Also read" line (already linked at the Phase E mapping line). The other 20 links stay: removing the line gives 20 new skill-lint must-read-depth violations (measured).
- Offsets for R3/R6/R7/R8 additions: R10 removals, markdown-template.md header lines replaced by a link.

## What could break

- `tools/r11-t9-uplift-b`, `tools/r7-tc-api-prep-matrix`, `tools/tc-api-prep-export-branch` pin exact lines in SKILL.md, WORKFLOW.md, phase-d, phase-e and phase-g G1 / G-verify; edits avoid those strings, and the suites are re-run.
- skill-lint must-read-depth if a link loses its must-read wording; re-run lint.
- helix parity: helix vendors these files; the sync is a separate step after merge.
