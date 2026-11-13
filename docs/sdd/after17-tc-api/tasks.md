# Tasks — after-17 tc-api-prep-workflow sweep

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | G-verify PUT in place; G2 pre-post check; slug, fresh-eyes output, handoff at G3 | R1 R2 R11 | `grep -c "re-post" phase-g-deliver.md` = 2 | 0 hits; check named in G2 step 2 |
| 2 | SKILL.md list regroup, MCP row, index label; WORKFLOW 🔴 STOP | R4 R5 R12 R13 | SKILL.md:44 is one 2000-char line | grouped bullets, scoped |
| 3 | worked-example, chunked-scope, delivery-options, Phase D split | R6 R7 R14 R16 | grep "master sheet" hit | gone |
| 4 | Shared: guide discovery, post-review, fast-publish, quality gate, triggers, test-md, intake | R2 R3 R8 R9 R10 R15 | greps per rule | each says the rule text |
| 5 | Budget + CI | R17 | — | helix lines pass; suites + sdd-gate green |
