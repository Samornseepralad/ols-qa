# Tasks — after17-create-bug

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Nothing-filed Verdict in Phase F | R1 | `grep -c "files nothing" phase-f-close.md` = 0 | branch present |
| 2 | Confirm-block counts, B3 note, GATE heading, Likely status | R2, R3 | `grep -c "no Phase E" WORKFLOW.md` = 0 | present |
| 3 | Resize tool, placeholder, Root cause label, A3 table, example | R4, R8, R9 | `grep -c "sips" phase-d-create.md` = 0 | present |
| 4 | SKILL/command descriptions, Refusal-first pointer | R9, R10 | `grep -c "mid-chat" SKILL.md` = 0 | present |
| 5 | Shared waiver, embed, scope, portability lines | R5, R6, R7 | per-line greps in the pin test | present |
| 6 | PR #250/#251 files, separate commit | R6, R7, R8 | pin test fails on those files | present |
| 7 | Ledger, pin test, bytes, full suites | R11, R12 | new test fails before tasks 1-6 | all suites + sdd-gate pass |
