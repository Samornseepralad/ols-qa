# Intent — after16-catch-ai

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `catch-ai-workflow`: close the after-15 Exit-gate P1 at its root cause so the after-16 round passes for this skill, and explain the time row.

## Why

after-15 (ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/GATE.md`) failed catch-ai on one verified P1, `catch-ai-workflow#0` (`verify/catch-ai-workflow.json`): step 9 says "the report template, filled", but the template in `reference.md` has no slot for the step-5 count line, the unsourced-claims tally, the result-quality-gate line or the step-7 Confirmed / Suspected / Unknown label, so a literal fill drops them. Score (85.4) and expected items (15/15) pass. Time (84 s vs 71 s) is investigated, not changed, unless the cause is redundant mandatory work.

## Constraints

Skill text only (`skills/catch-ai-workflow/`). Never remove or weaken a gate, evidence rule or approval step. Net bytes of the touched mandatory-read files stay the same or lower. Tests that pin the text stay unchanged. No new cost.

## Reviewed by owner on 2026-11-13

Owner approved the T9 after-15 fix lanes ("do not ask questions: decide with the best-sourced option") the same day.
