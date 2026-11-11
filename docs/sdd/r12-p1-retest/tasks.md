# Tasks
| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Add `tools/r12-p1-retest/check.test.js` | R1–R7 | fails on origin/main | committed, fail count recorded |
| T2 | Move pointer-only clauses into 4d and `#verdict-rule`; add anchors | R2 | test "clauses at kept place" fails | passes |
| T3 | Shorten SKILL step 3, *Discipline*, *QA closing* item, MUST rows to pointers keeping *Because* | R1 R3 R4 R8 | test "stated once" fails | passes; § Contents diff empty |
| T4 | Rewrite 6d *Delegated rounds* clause; re-pin D2 on the new line 330 | R5 R6 R7 R9 | r12 test R5/R6 fail; D2 fails until re-pinned | r12 test + D2 pass |
| T6 | Align `no-wait-decision-gate.md` layer 19 with the explicit-delegation wording | R10 R11 | r12 test R10 fails on origin/main | passes; no other pin test touched |
| T5 | Clause-by-clause check + all CI commands | R2 R8 | — | all green, recorded in PR |
