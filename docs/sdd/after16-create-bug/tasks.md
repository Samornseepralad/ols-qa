# Tasks — after16-create-bug

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | No-waiver sentence in Phase C | R1 | `grep -c "waive" phase-c-confirm.md` = 0 | sentence names the 3 shared lines |
| 2 | GitHub search-fails STOP + Phase F unknown | R2 | `grep -c "outcome unknown" phase-d-create.md` = 0 | branch present, item 5 names unknown |
| 3 | Example/template agreement | R3 | `grep -c "dropped in B3" worked-example.md` = 0 | counts, gh view, Needs Review present |
| 4 | HEREDOC, screenshots, label, no-MCP | R4, R5 | `grep -c "body-file" phase-d-create.md` = 0 | lines present |
| 5 | Offsets from restated text | R6 | `grep -c "renders as garbage" phase-d-create.md` = 1 | count 0; skill-lint clean |
| 6 | Pin test, bytes, full suites | R7 | new test fails before tasks 1-5 | bytes ≤ before; all suites + sdd-gate pass |
