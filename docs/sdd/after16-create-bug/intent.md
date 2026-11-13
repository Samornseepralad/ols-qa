# Intent — after16-create-bug

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 after-15 fix lane for `create-bug-workflow`: close the two verified P1 at their root cause, and fix the structural deductions the three after-15 darwin scorings cite inside create-bug files, so the next round can pass for this skill.

## Why

after-15 (ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/GATE.md:12`) failed create-bug on 2 confirmed P1 (`verify/create-bug-workflow.json`: `#0` waiver lines vs the Phase C confirm, `#s3-0` no branch for the Phase D `gh issue list` search failing), score 82.2 vs best-earlier 84.1 (structural runs 63.3 / 66.1 / 66.1, dim8 7) and time 72.5 s vs 59 s.

## Constraints

Edit only `skills/create-bug-workflow/**` and `skills/procedures/create-bug-workflow/**`. Never remove or weaken a gate, approval step or evidence rule; no line carrying MUST / NEVER / 🔴 / STOP / GATE is changed or removed. Net bytes of the touched files stay the same or lower. Shared references and file renames are reported, not edited. No new cost.

## Reviewed by owner on 2026-11-13

Owner set the T9 lanes to run without questions ("decide with the best-sourced option and record why"), lane brief 13/Nov/2026.
