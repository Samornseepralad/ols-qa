# Plan — r12-p1-retest

## Files touched
- `skills/retest-bug-workflow/SKILL.md` — step 3 → one-line pointer (R1). § Contents unchanged (R8).
- `skills/procedures/retest-bug-workflow/WORKFLOW.md` — *Discipline* design paragraph → pointer; Step 2d gets anchor `design-reference-gate`; `#verdict-rule` gains the "field id from the project guide" clause (R2); *QA closing* design item → one line (R4); MUST rows :445 :460 :463 :488 :489 → pointers keeping *Because* (R3).
- `skills/procedures/retest-bug-workflow/execute-and-evidence.md` — 4d gets anchor `design-comparison` and the moved clauses (R2).
- `skills/procedures/retest-bug-workflow/comment-and-post.md` — 6d *Delegated rounds* clause rewritten (R5–R7).
- `references/no-wait-decision-gate.md` — layer 19 explicit-delegation wording (R10).
- `tools/retest-case-plan-rules/check.test.js` — D2 re-pinned on the new line 330 (R9).
- `tools/r12-p1-retest/check.test.js` — new rule-text test (picked up by `scripts/list-test-suites.sh` as `*.test.js`).

## Approach
Same as r10 precedent: move missing clauses into kept places first, then shorten pointers. Test counts canonical phrases across the retest bundle (stub + procedure files) and pins pointer wording and the #1 wording.

## Alternatives weighed
- Make the MUST/NEVER row the single statement (finding's other option) — rejected: the kept place should be where the rule runs (precedent S3), so an agent at Step 2d/4d reads it there.
- Edit `references/no-wait-decision-gate.md` layer 19 too — first rejected (shared file); adopted 11/Nov/2026 under S5 so the shared rule and the retest clause agree (R10).

## What may break
- Existing tests that pin retest text (`tools/retest-guard/rules_drift.test.js`, `tools/r7-retest-no-c`, `tools/retest-case-plan-rules`, adoption-check workflow_docs) — run full suite.
- skill-lint anchor/link checks — new anchors added explicitly.
- New cost: NO · Touches other repos: NO.
