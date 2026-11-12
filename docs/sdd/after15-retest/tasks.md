# Tasks — after-15 retest-bug-workflow fix

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Checker accepts Story + retest + `fix_ref`; hint names `fix_ref` | R1 | new test in `check.test.js` fails on `7ff1cc5` | `node tools/result-gate/check.test.js` passes |
| 2 | Layer 1 and field table state the exception | R2, R3 | `grep -n fix_ref references/result-quality-gate.md` → none | both places name `fix_ref`; `skill-routing.md` untouched |
| 3 | Offset and bytes report | R4 | — | `wc -c` after ≤ before; all suites pass |
