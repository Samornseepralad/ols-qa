# Tasks — after14-catch-ai

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Map layer 5 for every audit | R1 | `SKILL.md:246` says "4–7 as written" while `:234` bans filing | bullet defines layer 5 with matrix Priority + create-bug hand-off |
| 2 | Write layers 4, 6, 7 for a document audit | R2 | `grep -c "as written; none skipped"` = 1 | all 7 layers stated; document branch opens no gate file |
| 3 | Keep the test-run branch | R3 | — | gate link + "as written" for a test case in scope |
| 4 | Offset bytes | R5 | `wc -c` after > before | after ≤ before |
| 5 | Run CI suites | R6 | — | every suite, skill_lint, routing, secrets, sdd-gate pass |
