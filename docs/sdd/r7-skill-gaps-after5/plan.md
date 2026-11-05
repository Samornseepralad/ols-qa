# Plan — r7

Files: `skills/procedures/create-bug-workflow/WORKFLOW.md` (R1), `skills/tc-review-workflow/SKILL.md` (R2), `skills/procedures/testing-ticket-workflow/*` (R3), `skills/procedures/tc-api-prep-workflow/WORKFLOW.md` + its references (R4), `skills/procedures/retest-bug-workflow/*` (R5), `skills/helix/SKILL.md` (R6), `skills/procedures/tc-fe-prep-workflow/*` (R7); one `tools/<lane>/check.test.js` per lane; after-6 setup copied from after-5 (R8, R9).
Library: none. Cost: none.
Options weighed: prose-only fixes (rejected for R3–R7 where a rule already exists but missed 1 in 3 runs — add a checkable line in the output template, keep the test as the deterministic check); changing the Exit gate (rejected, owner-owned).
Risks: size limits (skill-lint 500 lines), helix parity, text that contradicts other lines (grep before editing), time: the whole plan must finish by 6 PM 5/Nov.
Order: disjoint-file lanes in parallel (max 4 agents), one PR each, merge on green, then one helix sync, then after-6 for the changed skills.
