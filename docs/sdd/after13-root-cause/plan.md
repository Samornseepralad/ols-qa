# Plan — after-13 root-cause fixes

## Files

Each lane touches only the files its RCA names, within these sets:

- R1: `skills/catch-ai-workflow/**`, `skills/procedures/catch-ai-workflow/**`
- R2: `skills/create-bug-workflow/**`, `skills/procedures/create-bug-workflow/**`, plus the ols-qa tests that slice on "## Phase E — Falsification"
- R3: `skills/helix/**`, `commands/helix.md`
- R4: `skills/retest-bug-workflow/**`, `skills/procedures/retest-bug-workflow/**`, `commands/retest-bug.md`
- R5: `skills/tc-api-prep-workflow/**`, `skills/procedures/tc-api-prep-workflow/**`, plus the 2 pinned phase-g tests
- R6: `skills/tc-fe-prep-workflow/**`, `skills/procedures/tc-fe-prep-workflow/**`
- R7: `skills/tc-review-workflow/**`
- R8: `skills/testing-ticket-workflow/**`, `skills/procedures/testing-ticket-workflow/**`, `references/test-execution-plan-template.md`
- R9: the eight shared references listed in spec R9
- R10: ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/build_data.py` and its tests

## Approach

Ten parallel lanes, each with its own worktree and PR. The main thread reviews and merges each PR. Then it syncs to helix, freezes the SHA, runs the local checks and the static pre-flight, and starts the round.

## Libraries

None new.

## Alternatives weighed

- Fix only the failing rows (the after-9 to after-12 approach). Rejected: it failed four times.
- Loosen the gate. Not allowed (global rule 7).

## What could break

- The edits to shared references change other skills' scoring bundles, so R9 keeps every edit scoped and additive.
- Pinned tests break. Only R2 and R5 may update them; any other lane stops.
- Token headroom: create-bug has only 33 tokens of headroom, so its net change must be negative.
