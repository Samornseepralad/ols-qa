# Tasks — after16-catch-ai

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Count line + classification in template | R1, R5 | `grep -c "Unsourced claims: N" reference.md` = 0 | template carries table, count line, exit-line slot |
| 2 | Unsourced claims section | R2 | `grep -c "## Unsourced claims" reference.md` = 0 | section present, outside Defect count |
| 3 | Gate line | R3 | `grep -c "Result quality gate:" reference.md` = 0 | line present with N/A form |
| 4 | Root-cause label + one remediation shape | R4, R6 | `grep -c "Confirmed \| Suspected \| Unknown" reference.md` = 0 | entry carries labels; report points to entry |
| 5 | Offsets and full test run | R7 | — | bytes ≤ 38,548; pins intact; all suites pass |
