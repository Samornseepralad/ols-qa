# Plan — after-15 retest-bug-workflow fix

## Files
- `tools/result-gate/check.js` — skill check (`:237-247`): Story + `retest-bug-workflow` + non-blank `fix_ref` → accepted; else `SKILL_MISMATCH` with a hint naming `fix_ref`. Header field list gains `fix_ref`.
- `tools/result-gate/check.test.js` — skill section: two new cases (R1).
- `references/result-quality-gate.md` — layer 1 text and § *Result line* `fix_ref` row (R2); offset by tightening layer 1 wording (R4).

## Options weighed
- A: map Story → either skill unconditionally. Rejected: drops the #0174 guard for first-time Story tests.
- B: edit `skill-routing.md` table. Rejected: owner-confirmed unattended mapping, guard test pins it (R3).
- C (chosen): accept the retest only with a recorded `fix_ref` — the skill's own precondition ("whose fix is being re-verified") made mechanical.

## Libraries
None (Node built-ins only). No cost.

## What might break
- Existing rounds whose Story lines use `retest-bug-workflow` were already red; they stay red until `fix_ref` is written. No green line turns red.
