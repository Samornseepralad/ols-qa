# Intent — after16-retest

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `retest-bug-workflow` after the after-15 round:

1. Close the five verified after-15 P1 findings at their root cause: `#0`, `#1`, `#s2-0`, `#s2-1`, `#s3-1`.
2. Owner decision 13/Nov/2026 ("ทำทั้งสองอย่าง"): median time is 248 s against the 139 s ceiling, partly because the
   skill runs several Step 6c reviewer rounds. Cut only the **redundant** reviewer work — rounds that re-check what an
   earlier round already checked — and keep every distinct check running at least once.

## Why

after-15 (ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/`, `verify/retest-bug-workflow.json`) confirmed
5 P1 for retest (`data/after-15/summary.json`: `p0p1_confirmed: 5`, `with_skill_duration_s: 248.0`). The run
transcripts show that 5 of 6 runs dispatched 2–3 reviewer rounds, and each later round re-checked the whole body again.

## Constraints

Skill text only, in the retest bundle plus the shared `references/jira-comment-post-review.md`. Other skills that read
that file must behave as before. Never remove or weaken a gate, approval step, evidence rule or any MUST / NEVER / 🔴 /
STOP / GATE line. Net bytes of each touched file stay the same or lower. No new cost.

## Reviewed by owner on 2026-11-13

Owner approved the T9 after-15 fix lanes and the reviewer-round cut ("ทำทั้งสองอย่าง") on 13/Nov/2026, and said not to ask questions.
