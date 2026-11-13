# Tasks — after-14 tc-fe-prep

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Qase row points at the Step 6 suite gate | R1 | `grep -n 'export the CSV anyway' references/dependencies.md` hits | grep empty; row names the suite gate |
| 2 | Post-publish fail path = PUT same comment id | R2 | `grep -n 're-post' WORKFLOW.md` hits Step 7 lines | one PUT line; max 3 rounds kept |
| 3 | ADF example carries Remark; self-check tests it | R3 | `grep -c Remark jira-comment-adf-template.md` finds no Remark node in the JSON | JSON parses; Remark list before Disclaimer |
| 4 | 4f pre-dispatch self-check + one-pass reviewer | R4 | 4f has no author check of the after-13 defect classes | list present; loop rules unchanged |
| 5 | Byte offset + CI | R5 | — | bytes after ≤ before; all CI checks pass |
