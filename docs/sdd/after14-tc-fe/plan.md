# Plan — after-14 tc-fe-prep

## Files

- `references/dependencies.md` — Qase row only (R1).
- `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md` — Step 6 suite gate sentence (R1), Step 7 post-publish fail path: merge the two duplicate lines (`:362`, `:364`) into one PUT line (R2, R5).
- `skills/procedures/tc-fe-prep-workflow/references/jira-comment-adf-template.md` — example input states links present; Remark nodes added; self-check line (R3).
- `skills/procedures/tc-fe-prep-workflow/design-and-review.md` — 4f: pre-dispatch self-check list + one-pass reviewer rule (R4); offset bytes by removing text that repeats itself in 4f/Step 4 (R5).

## Choices weighed

- R1: keep the Step 6 gate and point the dependency row at it (chosen) vs. allowing CSV without Suite (weakens the gate — rejected).
- R2: follow the shared post-review rule (PUT same id) — the shared files are out of scope and already agree with each other.
- R4: add the recurring defect classes as an author self-check plus a one-pass reviewer rule (chosen) vs. fewer reviewer rounds or a round cap (removes a gate — rejected). Expected effect: fewer 4f rounds (each ~40 s in after-13 runs); time is re-measured by the next eval round, not claimed here.

## What may break

- Tests that pin WORKFLOW.md or template text (`tools/r7-tc-fe-prep-order/check.test.js`, skill-lint) — run the full suite list.
- sdd-gate: these docs must be on main before the `fix:` commits pass (docs PR first).

No new cost; no other repo touched.
