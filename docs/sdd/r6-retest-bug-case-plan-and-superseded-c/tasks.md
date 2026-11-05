# Tasks — r6 retest-bug case plan and superseded C

| Task | What                                                        | Rules  | Test that fails first                                   | Done when                         |
| ---- | ----------------------------------------------------------- | ------ | ------------------------------------------------------- | --------------------------------- |
| T1   | New rule-text test `tools/retest-case-plan-rules`           | R1-R6  | itself, against unedited skill (old phrases present)    | fails for the stated reasons      |
| T2   | Plan-table vs posted-table sentences in WORKFLOW            | R1-R3  | T1 assertions R1-R3                                     | T1 R1-R3 green                    |
| T3   | Superseded "bug ER or task AC" in WORKFLOW, evidence ref, gate, testing-ticket :434 | R4-R6 | T1 assertions R4-R6 (incl. gate :131 has the exception) | T1 green                          |
| T4   | Guard D2: assert `comment-and-post.md:330` unchanged        | D2     | diff of that line vs origin/main                        | empty diff                        |
| T5   | Whole suite, push, PR (not merged)                          | all    | `bash scripts/run-test-suites.sh`                       | rc 0; PR opened                   |
