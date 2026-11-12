# Tasks — a14-create-bug

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Write `tools/a14-create-bug/check.test.js` | R1, R3–R6 | test exits 1 on `main` | 5 FAIL on main |
| 2 | Language line in Phase C | R1 | test R1 FAIL | PASS |
| 3 | Scope post-review (R2 withdrawn: skill-lint) | R5 | test R5 FAIL | PASS |
| 4 | Drop `module:` label | R3 | test R3 FAIL | PASS |
| 5 | Duplicate-search JQL | R4 | test R4 FAIL | PASS |
| 6 | Re-run routing in B3 | R6 | test R6 FAIL | PASS |
| 7 | Tokens, bytes, full suites, sdd-gate | R7 | — | graph_v2 ≤ 6,561; bytes ≤ 46,117; all suites pass |
