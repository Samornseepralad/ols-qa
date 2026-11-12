# Tasks — after-14 helix router

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Start-order line + move Dependencies before Opening | R1 | `grep -n '^## ' skills/helix/SKILL.md` shows Dependencies last; line 18 names one step | Dependencies precedes Opening; line 18 names 3 steps |
| 2 | Split Must-read into two labelled lists, drop repeated clause | R2, R3 | `grep -c 'only when the workflow reaches it'` = 8 | count 0; same 15 link targets; skill-lint 0 |
| 3 | Bytes and lines | R4 | — | `wc -c` ≤ 13,003; `wc -l` ≤ 155 |
| 4 | Full CI mirror | R6 | — | all suites, skill-lint, routing test, check-no-secrets, postmortem guard, sdd-gate pass |
| 5 | Report numbers for dim8 and bytes, no change | R5 | — | PR body lists the numbers |
