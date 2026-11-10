# Plan — r10 exam items

| Rule | File | Change |
|---|---|---|
| R1 | `skills/tc-review-workflow/SKILL.md` (business-rule paragraph, ~line 140) | Extend the last sentence: no notes section and no closing or self-check line naming it. Rewrap in place, no net line growth. |
| R2 | same file ("No source gives the value" bullet, ~line 226) | Add that a boundary inferred from AC wording counts as unstated. Rewrap in place. |
| R3 | `skills/catch-ai-workflow/SKILL.md` exit rule (~line 188) | When only the sum matched, state the Defect count against the claim and name the matched tally in the exit line. |
| R4 | `skills/helix/SKILL.md:39` + r7 spec R6 + `tools/r7-helix-one-question/check.test.js` | Owner approved 10/Nov/2026. Replace "Put any other missing item … into one sentence of that question" with one question for one item, the rest to the routed workflow's intake; amend r7 R6 and its test together. |
| R5 | `skills/procedures/retest-bug-workflow/comment-and-post.md:43` | Annotate the `Date:` template line with its source. |
| R6 | same file, design-ref paragraph (~line 145) | Add the mixed form example. |
| R7 | `skills/procedures/tc-fe-prep-workflow/design-and-review.md` Step 4.5 rules (~line 329) | Add one bullet: Qase Type/Status values are not terms. |
| R8 | `skills/procedures/testing-ticket-workflow/WORKFLOW.md:230` (plan template) | Make the VPN note carry the line-128 consequence when required. |

- No new tool, dependency or cost. Text only.
- Line guard: tc-review SKILL.md is at 402 of 403; R1 and R2 are rewraps that keep it ≤ 403. Open PR #115 edits the same file's MUST/NEVER table, not these paragraphs; a rebase conflict, if any, is textual only.
- Files owned by lane L7 (`create-bug-workflow/WORKFLOW.md` step 4, `testing-ticket-workflow/SKILL.md`) are not touched; `testing-ticket-workflow/WORKFLOW.md` is a different file.
- Risk: wording that reads as a new rule elsewhere. Each change stays inside the paragraph that already owns the topic.
- Sync to helix follows the normal ols-qa → helix sync after merge.
