# Tasks — after16-tc-review

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Document line in Step 4 template | R1 | `grep -c "Document:\*\* {Pass" SKILL.md` = 0 | template ends with the line |
| 2 | Precedence + separate session verdict sentence | R2 R3 | `grep -c "Unverified wins" SKILL.md` = 0 | sentence present after the template |
| 3 | "test verdict" at `:362`, `:378` | R3 | `grep -c "records a verdict" SKILL.md` = 1 | count 0 |
| 4 | Offsets and full test run | R4 | — | bytes ≤ 28,267; pins intact; all suites pass |
