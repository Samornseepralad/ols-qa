# Plan — a14-create-bug

## Files

- `skills/procedures/create-bug-workflow/phase-c-confirm.md` — R1: one sentence merged into the existing "Ask every open question" line (`:29`).
- `skills/create-bug-workflow/SKILL.md` — R2 (drop the two test-round links at `:47`), R5 (scope note on `:41`).
- `skills/procedures/create-bug-workflow/references/posting-discipline.md` — R3: drop `module:<name> when supported`.
- `skills/procedures/create-bug-workflow/phase-d-create.md` — R4: JQL + exact-title match in item 4.
- `skills/procedures/create-bug-workflow/phase-e-falsification.md` — R6: extend the contradiction paragraph (`:39-41`) to cover the shared §3 re-runs.
- `tools/a14-create-bug/check.test.js` — rule-text test, written first and failing.

## Data / libraries

None. Node built-ins only (free, ols-qa already runs Node tests).

## Options weighed

- R3: add `module:` to the pre-flight and the Phase D command, or drop it. Dropping is chosen: no create-bug step derives a module label, the pre-flight would grow, and the module already sits in the title (`[{Severity}] {Module} — …`).
- R1: a line in `WORKFLOW.md` (mandatory read, +tokens every run) or in `phase-c-confirm.md` (read only at Phase C, where the block is written). Phase C chosen.
- dim7 restatements: not touched (MUST lines; see spec Out of scope).

## What could break

- `tools/*` rule-text tests that assert the old wording of the edited lines (grep before edit: none match).
- Token budget in helix after sync: R2 removes more mandatory text than R5 adds; measured with graph_v2.
