# Intent — after16-tc-fe

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `tc-fe-prep-workflow`, two parts:

1. Close the after-15 verified P1 `tc-fe-prep-workflow#s3-0`: the pre-step-1 dependency list names Jira REST credentials, the shared row checks a token with curl, and a failed check is a stop, although tc-fe-prep posts only through the signed-in Jira browser session.
2. Owner decision 13/Nov/2026 ("ทำทั้งสองอย่าง"): median time 262.5 s vs ceiling 110 s. Cut only the reviewer work that re-checks what another round already checked. Every distinct check still runs at least once; no gate, approval or evidence rule is removed.

## Why

ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/GATE.md:16` fails tc-fe on P1 = 1 and time (262.5 s vs 110 s). Score (83.8) and expected items (15/15) pass.

## Constraints

Skill text only (`skills/tc-fe-prep-workflow/SKILL.md`, `skills/procedures/tc-fe-prep-workflow/design-and-review.md`). The shared `references/dependencies.md` row belongs to the tc-api lane and is not edited here. No MUST / NEVER / 🔴 / STOP / GATE line is removed or reworded. Net bytes of each touched mandatory-read file ≤ before. No new cost.

## Reviewed by owner on 2026-11-13

Owner: "ทำทั้งสองอย่าง" (fix the P1 and cut redundant reviewer rounds), relayed by the main thread's lane brief.
