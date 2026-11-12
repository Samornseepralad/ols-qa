# Plan — after14-tc-review

## Files

- `skills/tc-review-workflow/SKILL.md` — the only file changed.

## Changes

| Rule | Where | Change |
|------|-------|--------|
| R1 | `:377` | drop "(§ Out of scope)" |
| R2 | `:235-236`, `:242` | mixed → one message with language + destination question; that answer is not the go-ahead; send on OK after the item-5 preview |
| R3 | item 4 `:281` | add `wait=true` (Discord) and why |
| R4 | item 7 `:295` | add 🔴 GATE before delete/resend |
| R5 | QA closing `:313-323` | add Step 3b item; Go back names Step 3b |
| R6 | `:232-233`, `:241`, `:363`, `:386-387` | offsets: drop restated reasons and the `:363` line the heading and `:377` already state |

## Alternatives weighed

- R1: restore a `## Out of scope` section — adds bytes and repeats the intro (`:40-42`), which is why `3f8f797c` removed it. Rejected.
- R2: drop the language STOP and always follow the ticket's language — removes a user-choice stop. Rejected (owner rule: never weaken a gate).
- R3: edit item 6 — breaks the byte-identical pin in `tools/tc-review-one-question` R5. Rejected; item 4 is where the webhook call is built.

## What could break

Pinned text in `tools/r12-p1-three`, `tools/tc-review-one-question`, `tools/r11-skill-fixes-g1`, `tools/r11-t9-uplift-b`, `tools/r7-tc-review-limit` (≤ 403 lines, < 30,000 bytes). ols-qa PR 115 edits the MUST/NEVER row `:345` only — not touched here. helix needs the same change at sync time (parity).
