# Plan — after15-tc-review

## Files

- `skills/tc-review-workflow/SKILL.md` — Step 4 go-ahead sentence (`:241-242`), Step 5 item 5 (`:288-289`), offsets in § Must-read files.

## Approach

Item 5: the thread answer counts only when the preview is visible and matches the review in chat; changed text (items 2–3) → 🔴 STOP, send only on the user's OK to this preview. Step 4: "Unless asked with the language question or the item-5 text differs". Offsets: drop the restated rationale "; each excuse has its correct action" and the "(§ Skill composition)" pointer (the line already states its condition).

Rejected: always asking "send it?" after the preview — adds a question on every unchanged run and breaks the one-question rule (`:256`, `tools/tc-review-one-question`).

## Libraries

None. No new cost.

## What could break

Pinned-text tests in `tools/tc-review-one-question`, `tools/r12-p1-three`, `tools/r11-*`, `tools/r7-tc-review-limit` — run every suite.
