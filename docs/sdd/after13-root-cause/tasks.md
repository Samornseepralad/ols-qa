# Tasks — after-13 root-cause fixes

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | catch-ai lane | R1 | grep shows the hedge rule in ≥ 2 files; the table is one line | RCA fix set applied; CI green; tokens ≤ 50% |
| 2 | create-bug lane | R2 | worked-example.md:12 contradicts refusal-first; phase-d has no "Go back" | fixes applied; Phase E tests updated and green; tokens net negative |
| 3 | helix lane | R3 | description matches `<`; 17 gate links listed | 9 links gone, lint 0, `<workflow>` gone; routing tests green |
| 4 | retest lane | R4 | AC2 text bans only "C"; `:66` maps mismatch to FAILED | fixes applied; pinned lines unchanged; WORKFLOW ≤ 500 lines |
| 5 | tc-api lane | R5 | SKILL.md:44 lists execution-only links | fixes applied; lint 0; phase-g tests updated and green |
| 6 | tc-fe lane | R6 | csv-export openpyxl P1 present; `:87` has no glossary ask; `:273` vs `:277` disagree | both P1s gone; glossary clause in; reviewer rule matches `ab9a377^:275` |
| 7 | tc-review lane | R7 | layer 6 contradicts `SKILL.md:133-141` | fixes applied; CI green |
| 8 | testing-ticket lane | R8 | template `:29` allows Width n/a | template fail-closed; anchors resolve; tokens ≤ 50% |
| 9 | shared references lane | R9 | the RCA lines listed in the 8 shared files | additive scoped edits; every test that pins them green |
| 10 | harness lane | R10 | a unit test with a P1 found only by scoring 2 fails | build_data counts it until refuted; test green |
