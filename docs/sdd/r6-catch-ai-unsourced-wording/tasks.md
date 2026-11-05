# Tasks — r6 catch-ai unsourced wording

| Task | What                                              | Rules  | Test that fails first                                   | Done when                       |
| ---- | ------------------------------------------------- | ------ | ------------------------------------------------------- | ------------------------------- |
| T1   | New test `tools/catch-ai-unsourced-wording`       | R1-R5  | itself, against unedited reference.md                   | fails for the stated reason     |
| T2   | Rewrite `reference.md:71`                         | R1-R3  | T1                                                      | T1 green                        |
| T3   | Guard `SKILL.md` unchanged; grep old phrase elsewhere | R4, R5 | grep + T1                                           | no other file quotes old phrase |
| T4   | Whole suite, push, PR (not merged)                | all    | `bash scripts/run-test-suites.sh`                       | rc 0; PR opened                 |
