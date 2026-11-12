# Tasks — after14-tc-review

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Drop the dangling pointer | R1 | `grep -n "§ Out of scope" SKILL.md` matches `:377` | no match; every "§ X" resolves to a heading |
| 2 | Batch the language and destination questions | R2 | `:236` asks only the language | rule names the destination question and the OK after the item-5 preview |
| 3 | `wait=true` in item 4 | R3 | `grep -c "wait=true"` = 0 | item 4 names it; item 6 byte-identical |
| 4 | Gate item 7 | R4 | item 7 has no 🔴 | item 7 carries 🔴 GATE with preview + go-ahead |
| 5 | QA closing Step 3b item | R5 | QA closing has no "3b" | item + Go back present |
| 6 | Offsets and full test run | R6 | — | bytes ≤ 27,892; all suites pass |
