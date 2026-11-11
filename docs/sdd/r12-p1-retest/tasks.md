# Tasks
| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Add `tools/r12-p1-retest/check.test.js` | R1–R7 | fails on origin/main | committed, fail count recorded |
| T2 | Move pointer-only clauses into 4d and `#verdict-rule`; add anchors | R2 | test "clauses at kept place" fails | passes |
| T3 | Shorten SKILL step 3, *Discipline*, *QA closing* item, MUST rows to pointers keeping *Because* | R1 R3 R4 R8 | test "stated once" fails | passes; § Contents diff empty |
| T4 | Rewrite 6d *Delegated rounds* clause | R5 R6 R7 | test "#1" fails | passes |
| T5 | Clause-by-clause check + all CI commands | R2 R8 | — | all green, recorded in PR |
