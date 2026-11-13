# Tasks — after16-tc-fe

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Dependencies accept the session path | R1 R2 R3 | `grep -c "signed-in Jira session" SKILL.md` = 0 | line names session, Step 7 check, "not a stop" |
| 2 | Scoped next-round brief | R4 | `grep -c "previous round's numbered findings" design-and-review.md` = 0 | 4f step 4 carries it, thorough = full |
| 3 | 4a–4d only on traceability change | R5 | `:232` re-runs 4a–4d with no condition | condition present at Step 4 and 4d |
| 4 | AC/EC column verbatim in self-check | R6 | `:270` "glossary Thai in every column" with no exception | exception present |
| 5 | Sizes, rule lines, suites | R7 R8 | — | bytes ≤ before; no rule line cut; all suites pass |
