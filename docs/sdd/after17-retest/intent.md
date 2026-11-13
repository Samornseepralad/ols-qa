# Intent — after17-retest

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Sweep-and-fix lane for `retest-bug-workflow` (owner 13/Nov/2026):

1. "แก้ปัญหาทุกอัน ไม่ได้เลือกแก้แค่ P0 P1" / "มันต้องไม่มีปัญหาอะไรเหลือเลย" — fix every finding at every level
   (P0–P3), every darwin deduction and every code-check FAIL the scorers gave retest in after-11..after-16, plus every
   remaining instance of those patterns in the current bundle. Only exceptions: a fix that would remove or weaken a
   gate, or one that needs a file rename/delete or a rule-line cut the owner has not approved — reported with evidence.
2. Cut redundant reviewer rounds in Step 6c further: the after-15 reviewer hand-backs show which mechanical gaps cost
   a second or third round; catch those before the first dispatch.

## Why

ols-qa-evidence `evals/helix-skill-eval-2026-11-1*-after1{1..5}/baseline/retest-bug-workflow*.json` hold 186 findings
(24 P1, 80 P2, 82 P3), 115 darwin dimension notes and 13 code checks. PRs 240/241 closed the five verified after-15 P1;
about half of the remaining distinct findings are still in the text. after-16 stopped at 4/48 runs and has no retest
scoring, so it adds no findings.

## Constraints

Skill text only (retest bundle + the shared references it reads). Never remove or weaken a gate, approval, evidence
rule or any MUST / NEVER / 🔴 / STOP / GATE line; every reworded rule line is listed for the owner's register.
Behaviour of other skills that read a shared file stays the same. Net session tokens must not rise. No new cost.

## Reviewed by owner on 2026-11-13

Owner ordered the sweep ("แก้ให้ครบค่อยรัน") and the reviewer-round cut on 13/Nov/2026, and said not to ask questions.
