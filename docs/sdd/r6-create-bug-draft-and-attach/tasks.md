# Tasks — r6 create-bug draft and attach

| Task | What                                              | Rules  | Test that fails first                                  | Done when                          |
| ---- | ------------------------------------------------- | ------ | ------------------------------------------------------ | ---------------------------------- |
| T1   | New rule-text test `tools/create-bug-draft-rules`  | R1–R8  | itself, against the unedited skill                     | fails for the stated reasons       |
| T2   | Needs Review draft: SKILL, WORKFLOW, worked-example | R1–R4  | T1 assertions R1–R4                                    | T1 R1–R4 green                     |
| T3   | New-bug attach order + failure branch; template    | R5–R8  | T1 assertions R5–R8                                    | T1 green                           |
| T4   | Whole suite and push                              | all    | `bash scripts/run-test-suites.sh`                      | rc 0; PR opened, not merged        |
