# Intent — ols-skill-fixes

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Two ols-qa skill fixes from the OLS agent's remaining items (pluton-ai-agent `docs/plans/ols-agent-remaining.md`):
R12 — an expected value that is interpreted or borrowed from another ticket must not pass a TC review;
R14 — test data created on dev must be registered and cleaned up after the test round.

## Why

R12: reviews passed rows whose Expected Result had no source from the ticket itself (global rule 10: a defect needs a
verified expected). R14: test data on dev stayed forever, with no register and no cleanup step.

## Constraints

Free only, no new dependency. Write scope in ols-qa limited by the owner (6 Nov 2026) to
`skills/tc-review-workflow/SKILL.md` and the test-data-prep-workflow skill (`skills/test-data-prep-workflow/SKILL.md`
stub, `skills/procedures/test-data-prep-workflow/WORKFLOW.md`); no other skill changes. `tc-review-workflow/SKILL.md`
stays within the `tools/tc-review-one-question` line limit. No deletion of records already on dev. Helix receives the
change only through `scripts/sync-skills-to-helix.sh` (D11).

## Reviewed by owner on 2026-11-06

2026-11-06 — the owner approved the L5 plan (4 Nov 2026) and the ols-qa write permission for these files (popup,
6 Nov 2026; recorded in pluton-ai-agent `docs/sdd/ols-skill-fixes/spec.md`).
