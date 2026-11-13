# Intent — after16-tc-review

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `tc-review-workflow`: close the after-15 Exit-gate P1 at its root cause so the after-16 round passes for this skill.

## Why

after-15 (ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/GATE.md:17`) failed tc-review on one verified P1, `tc-review-workflow#s2-0` (`verify/tc-review-workflow.json`): the rule at `SKILL.md:348` gives the document the verdict **Unverified**, but that word appears nowhere else — the Step 4 report template (`:210-217`) has no line for it, "pass the document" has no named value, and `:362` / `:378` say the workflow records no verdict while `references/session-closing.md:63` demands a separate `Verdict: COMPLETE | PARTIAL | BLOCKED`. Time (61.5 s vs 56 s) is reported, not changed, here.

## Constraints

Skill text only (`skills/tc-review-workflow/SKILL.md`). Never remove or weaken a gate, evidence rule or approval step; the `:348` NEVER line stays word for word. Net bytes of `SKILL.md` stay the same or lower. Tests that pin the text stay unchanged. No new cost.

## Reviewed by owner on 2026-11-13

Owner approved the T9 after-16 fix lanes ("do not ask questions: decide with the best-sourced option") the same day.
