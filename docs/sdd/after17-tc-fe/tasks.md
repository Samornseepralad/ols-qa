# Tasks — after17-tc-fe

| # | Task | Rules | Failing check first | Done when |
|---|------|-------|---------------------|-----------|
| 1 | Stub: drop execution refs + Test.md + round-time, add routing line and step files, fix read times and deps | R1 R3 R4 R5 R6 | `grep -c playwright-preflight SKILL.md` = 1 | 0; routing line present |
| 2 | Self-check list + expected-result ban | R2 R13 | `grep -c ครบถ้วน design-and-review.md` = 0 | numbered list with ban |
| 3 | WORKFLOW gates, exits, row 2, wording, language, provenance, Step 2 format, precedence | R7–R12 R14 R15 | `grep -c "Write tool" WORKFLOW.md` = 1 | 0; markers on 3 gates |
| 4 | Glossary precedence in 2.6.3, runtime wording in requirement-gates | R10 R16 | `grep -c "Write tool" requirement-gates.md` = 1 | 0 |
| 5 | Skill references | R17–R26 | `grep -c "not required" qase-import-format.md` = 1 | each cited line fixed |
| 6 | Shared references | R27–R35 | `grep -c "paste markdown" publish-options.md` = 1 | each fixed, bytes ≤ before |
| 7 | Suites, sdd-gate, helix token + rule lines | all | — | all pass |
