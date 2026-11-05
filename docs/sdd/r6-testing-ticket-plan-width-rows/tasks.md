# Tasks — r6 testing-ticket plan width rows

| Task | What                                                    | Rules  | Test that fails first                                       | Done when                    |
| ---- | ------------------------------------------------------- | ------ | ----------------------------------------------------------- | ---------------------------- |
| T1   | New test `tools/testing-ticket-plan-width`              | R1-R4  | itself, against unedited template (no `Width` column)       | fails for the stated reasons |
| T2   | Template: Width column, example rows, out-of-scope line | R1-R3  | T1 R1-R3                                                    | T1 R1-R3 green               |
| T3   | WORKFLOW `:192`, `:451` wording                         | R4     | T1 R4                                                       | T1 green; file <= 500 lines  |
| T4   | Reconcile line per owner answer Q1                      | R6     | T1 R6 once Q1 answered                                      | green, or BLOCKED on Q1      |
| T5   | Whole suite, push, PR (not merged)                      | all    | `bash scripts/run-test-suites.sh`                           | rc 0; PR opened              |
