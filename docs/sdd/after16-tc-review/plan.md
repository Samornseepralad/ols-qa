# Plan — after16-tc-review

## Files

- `skills/tc-review-workflow/SKILL.md` — Step 4 template + one sentence after it (`:210-217`), § Must-read files (`:362`), § Execution-only files (`:378`), offsets in Step 4 Suggest bullets and § Dependencies.

## Approach

Add `**Document:** {Pass | Need Improve | Unverified}` as the last template line, then one sentence giving R2's order and R3's split from the session-closing `Verdict:` block. Change "verdict" to "test verdict" at `:362` and `:378`. Offsets: fold "Show the numbers so the author can check them." into the bullet's own clause; shorten the `tools/result-gate` Dependencies note (its reason is restated in Step 3b).

Rejected: (a) rewording `:348` to drop "verdict" — removes a NEVER line (token guard R8) and does not give the value a slot; (b) adding a document value to `session-closing.md` — shared file, changes every skill's closing.

## Libraries

None. No new cost.

## What could break

Pinned-text tests in `tools/tc-review-one-question`, `tools/r12-p1-three`, `tools/r11-*`, `tools/r7-tc-review-limit` — run every suite.
