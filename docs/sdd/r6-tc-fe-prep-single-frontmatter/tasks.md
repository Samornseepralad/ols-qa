# Tasks — r6 tc-fe-prep single frontmatter

| Task | What                                              | Rules | Test that fails first                                   | Done when                       |
| ---- | ------------------------------------------------- | ----- | ------------------------------------------------------- | ------------------------------- |
| T1   | New test `tools/tc-fe-prep-frontmatter`           | R1-R3 | itself, against unedited WORKFLOW.md (starts with `---`) | fails for the stated reason     |
| T2   | Remove duplicate block, add pointer               | R1-R3 | T1                                                      | T1 green; body diff clean       |
| T3   | Run skill-lint, skill-structure, routing, portability | R4 | those tools                                             | all exit 0                      |
| T4   | Check helix repo for a WORKFLOW frontmatter reader before sync | R4 | grep in helix scripts                         | none found, or owner told       |
| T5   | Whole suite, push, PR (not merged)                | all   | `bash scripts/run-test-suites.sh`                       | rc 0; PR opened                 |
