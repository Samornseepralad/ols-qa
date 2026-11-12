# Intent — after14-tc-review

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `tc-review-workflow`: close the after-13 Exit-gate misses at their root cause so the after-14 round passes for this skill.

## Why

after-13 (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/GATE.md:19,50,53`) failed tc-review on one verified P1 (`SKILL.md:377` cites "§ Out of scope", which does not exist) and on expected items 16.67/17 (prompt 2 repeat 3 stopped at the language question and never asked for the channel/thread).

## Constraints

Skill text only (`skills/tc-review-workflow/**`). Never remove or weaken a gate, evidence rule or approval step. Net bytes of `SKILL.md` per invocation stay the same or lower. Tests that pin the text stay unchanged. No new cost.

## Reviewed by owner on 2026-11-12

Owner set the T9 rules (root cause, no weakened gate, net tokens same or lower) in the T9 brief the same day.
