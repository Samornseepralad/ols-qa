# Plan — after-16 tc-api-prep-workflow fixes

## Files

| File | Rules |
|------|-------|
| `skills/tc-api-prep-workflow/SKILL.md` | R1, R4 |
| `skills/procedures/tc-api-prep-workflow/WORKFLOW.md` | R1 |
| `skills/procedures/tc-api-prep-workflow/phase-f-draft.md` | R2 |
| `skills/procedures/tc-api-prep-workflow/phase-g-deliver.md` | R4 (offset only) |
| `references/dependencies.md` | R1 |
| `references/qa-closing-shared.md` | R3 |
| `references/qa-evidence-gates.md` | R3 |

No library, script or test change. Free only (rule 3): none needed.

## Approach

- R1: move the credential check point, not remove it. SKILL.md row names G2 step 4 (which already says "run its check first"); WORKFLOW:126 checks each row "at the point it names" (dependencies.md:4 already allows "the later point that section names"). dependencies.md row: relabel "(ADF-direct publish, REST fallback)" to REST publish/fallback (ADF-direct is browser JS per jira-fast-publish.md) and add the browser-session fallback for tc-api-prep / tc-fe-prep only. Rejected: making tc-fe SKILL.md conditional — tc-fe lane owns that file; the shared row closes the gap for both.
- R2: one added Go back sentence in phase-f-draft.md, reusing phase-e-review.md:37's route.
- R3: add "when one was generated" to the two shared lines. This aligns them with the canonical §5 gate; skills that post comments with no file (retest-bug, testing-ticket) were already unable to meet the literal line, so their behaviour becomes correct, not weaker.
- R4 offsets: remove restated text — phase-g-deliver.md:89 parenthesis restating the G-verify rule; SKILL.md:52 parenthesis duplicating phase-g-deliver.md:89.

## What could break

- Other skills reading dependencies.md: the curl check and token fallback stay; the added clause names tc-api-prep and tc-fe-prep only.
- Token guard in helix (removed rule lines): no MUST/NEVER/🔴/STOP/GATE line removed; SKILL.md:52 keeps its MUST NOT sentence.
