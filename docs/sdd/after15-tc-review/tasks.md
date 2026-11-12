# Tasks — after15-tc-review

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Item 5 stop on changed text | R1 | `grep -c "OK to this preview" SKILL.md` = 0 | item 5 carries 🔴 STOP + OK on the preview |
| 2 | Step 4 sentence names the exception | R2 | `:241` says the thread question is the go-ahead with no text-changed exception | sentence names "item-5 text differs" |
| 3 | Offsets and full test run | R3 | — | bytes ≤ 28,269; pins intact; all suites pass |
