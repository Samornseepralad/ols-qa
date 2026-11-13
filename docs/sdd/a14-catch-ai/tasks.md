# Tasks — a14-catch-ai

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Union hedge pattern on L117, `-w` for English | R1 | K5 replica: 6 MISSING | 14/14 in |
| 2 | Closing hit = conclusion line, no quote, no label + artifact | R2 | L215 "hits outside verbatim quotes" | rule names all three |
| 3 | `Session verdict:` label in QA closing | R3 | `grep -c "Session verdict" SKILL.md` = 0 | = 1 |
| 4 | Split step-9 bullet; capture fallback; Dependencies row | R4 R5 | longest Must-read line 1,699 chars | ≤ 700; fallback links dependencies.md |
| 5 | Gap rank in PASSED row | R6 | no rank rule | rule present |
| 6 | Absent layer evidence | R7 | — | sentence beside L199 |
| 7 | defect-report-completeness parts | R8 | — | § 2 / § 4 named |
| 8 | Dedupe count rule; offset bytes | R9 R10 | — | bytes ≤ 40,154 |
| 9 | Run CI suites, sdd-gate, skill lint | R11 | — | all green |
| 10 | Token offset in SKILL.md | R12 | measure = 9309 / 14062 (> 9283 / 14036) | measure ≤ 9283 / 14036; 0 rule lines changed |
