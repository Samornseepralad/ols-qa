# Tasks — after-15 tc-prep

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Dependencies timing allows the skill's later point | R1 | `grep -n "before step 1" references/dependencies.md references/skill-reference-index.md` has no exception | both lines name the later-point exception |
| 2 | openpyxl row never self-installs | R2 | dependencies.md:17 offers `pip install` as the fix | row says the user runs it; ask before CSV |
| 3 | Recipes use the caller's file name | R3 | `grep -n "_FE_TC\.csv\|_FE_TC\.xlsx" references/csv-export-rules.md` hits | grep empty; tc-api SKILL.md and test R22 updated |
| 4 | Unit Test CSV uses BOM | R4 | csv-export-rules:186 says no BOM | row + section say UTF-8 BOM |
| 5 | Config template asks what the run needs | R5 | template offers MCP + optional Qase attach | four items asked; MCP gone; attach fixed |
| 6 | Byte offset + checks | R6 | — | bytes after ≤ before; suites, lint, sdd-gate pass |
