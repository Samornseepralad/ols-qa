# Tasks — after-14 install question order

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Add test `tools/a14-helix-install-question/check.test.js` | R1–R5 | test fails on current file (no "first and alone") | test committed |
| 2 | Step 3 order rule; old step 3 → step 4 | R1, R2 | test R1/R2 fail | R1/R2 pass |
| 3 | Byte offset, NEVER line untouched | R3, R4 | — | `wc -c` ≤ 1,042; R3 pass |
| 4 | Full CI mirror | R5 | — | all suites, skill-lint, sdd-gate pass |
