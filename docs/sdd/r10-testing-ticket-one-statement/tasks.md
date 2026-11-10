# Tasks
| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Move pointer-only clauses into kept places (*Fresh login*, E coverage, E2, E3) | R2 | `grep` shows the clause only at a pointer place | each clause found at its kept place |
| T2 | Shorten SKILL.md steps 3–6, session-intake, playwright-discipline to one-line pointers | R1 R5 | SKILL.md:27 is a full restatement | one line + link each; § Contents diff empty |
| T3 | Shorten WORKFLOW *Discipline* paragraphs and MUST/NEVER rows to pointers, keeping *Because* | R1 R4 | WORKFLOW:100, :103, :111, :419, :420 restate the rule | one line + link, *Because* unchanged |
| T4 | Rewrite *QA closing* to checkbox + gate name + link per item | R3 | WORKFLOW:338–360 are multi-line restatements | every item one line |
| T5 | Clause-by-clause check of every removed sentence against the kept place; suites + secrets check | R2 R6 | — | check recorded in PR; `run-test-suites.sh` green |
