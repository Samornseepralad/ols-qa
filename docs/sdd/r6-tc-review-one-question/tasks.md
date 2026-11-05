# Tasks — r6 tc-review one question

| Task | What                                              | Rules  | Test that fails first                                      | Done when                      |
| ---- | ------------------------------------------------- | ------ | ---------------------------------------------------------- | ------------------------------ |
| T1   | New test `tools/tc-review-one-question`           | R1-R6  | itself, against unedited SKILL.md (unconditional ask)      | fails for the stated reasons   |
| T2   | Item 1 rewrite: config first, ask only if absent  | R1, R2 | T1 R1-R2                                                   | T1 R1-R2 green                 |
| T3   | `:256` names the single exception                 | R3     | T1 R3                                                      | T1 R3 green                    |
| T4   | Guard unchanged R4-R6 text; run ask-guard tests   | R4-R6  | T1 R4-R6                                                   | green                          |
| T5   | Whole suite, push, PR (not merged)                | all    | `bash scripts/run-test-suites.sh`                          | rc 0; PR opened                |
