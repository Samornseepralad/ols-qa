# Intent — after15-tc-review

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `tc-review-workflow`: close the after-14 Exit-gate P1 at its root cause so the after-15 round passes for this skill.

## Why

after-14 (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/GATE.md:17`) failed tc-review on one verified P1, `tc-review-workflow#s2-0` (`verify/tc-review-workflow.json`): on the non-mixed path the thread answer is the go-ahead (`SKILL.md:241-242`, `:256`), so a send whose text was tightened after the user saw the review goes out with no chance to object (`:286-289`). Score (85.4) and expected items (17/17) pass; time is an environment issue this round and is not changed here.

## Constraints

Skill text only (`skills/tc-review-workflow/SKILL.md`). Never remove or weaken a gate, evidence rule or approval step. Net bytes of `SKILL.md` stay the same or lower. Tests that pin the text stay unchanged. No new cost.

## Reviewed by owner on 2026-11-12

Owner approved the T9 repeat ("ทำต่อตามแพลนจนเสร็จ ไม่ต้องถาม") the same day.
