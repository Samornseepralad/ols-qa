# Plan — r6 create-bug draft and attach

## Files

- `skills/create-bug-workflow/SKILL.md:46` — R4 wording (size now 7946 bytes; net change about zero).
- `skills/procedures/create-bug-workflow/WORKFLOW.md:232-239` (Needs Review rule, R1/R3), `:253-254` (confirm block, R2),
  `:324-331` (images paragraph, R5–R7).
- `skills/procedures/create-bug-workflow/references/worked-example.md` — one lesson line for the Needs Review draft (R1).
- `skills/procedures/create-bug-workflow/references/bug-draft-template.md:90` — R8.
- `tools/create-bug-draft-rules/check.test.js` — new known-answer test of the rule text (R1–R8).
- Helix mirror is identical before the edit (checked `origin/main`); sync after merge by the main thread, not here.

## Approach

Text-only edits. The new test reads the four files and asserts: the old phrases are gone ("writes no draft",
"not drafted and not filed", "Attach screenshots to Jira before embedding") and the new anchors exist.

## What may break

- `tools/skill-lint`, `skill-structure`, `skill-text-guard`, `link-check`, `portability`: line length / size / link limits.
- Existing tests that quote the old sentences (found by grep before editing).
- Eval expected items p1 #2 and p2 #4 stay unsatisfied (BLOCKED, see spec).
