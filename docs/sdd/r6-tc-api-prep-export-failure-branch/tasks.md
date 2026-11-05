# Tasks — r6 tc-api-prep export failure branch

| Task | What                                              | Rules  | Test that fails first                                     | Done when                          |
| ---- | ------------------------------------------------- | ------ | --------------------------------------------------------- | ---------------------------------- |
| T1   | New test `tools/tc-api-prep-export-branch`        | R1-R6  | itself, against unedited G1 (no failure branch)           | fails for the stated reasons       |
| T2   | G1 failure step (STOP, error, path, offer)        | R1-R3  | T1 R1-R3                                                  | T1 R1-R3 green                     |
| T3   | Guard that `:249` and G-verify are unchanged; size | R4-R6 | T1 R4-R6                                                  | green; <= 370 lines                |
| T4   | Q1 answer applied to the `both` order             | R3     | T1 R3 variant                                             | green, or BLOCKED on Q1            |
| T5   | Whole suite, push, PR (not merged)                | all    | `bash scripts/run-test-suites.sh`                         | rc 0; PR opened                    |
