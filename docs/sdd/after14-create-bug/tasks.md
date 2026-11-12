# Tasks — after-14 create-bug

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Layer map in B3; SKILL.md:42 points at it | R1 | `grep -c 'layer map' phase-e-falsification.md` = 0 | map covers layers 1–20; SKILL.md line names the map |
| 2 | One non-field failure branch for MCP, JXA, REST | R2 | `grep -n 'JXA or REST' phase-d-create.md` empty | branch has search, found/none/cannot-run outcomes |
| 3 | One question list, cancel branch, B3 count | R3, R5 | `grep -c 'cancel' phase-c-confirm.md` = 0 | lines present |
| 4 | Link rule, root-cause label, contradiction branch | R4, R8 | `grep -c 'Confirmed \| Suspected' bug-draft-template.md` = 0 | lines present |
| 5 | Markers, Dependencies order, triggers, duplicate sentence, commands | R6–R9 | `grep -c 'per the index' SKILL.md` = 1 | count 0; markers present |
| 6 | Bytes and tokens | R10 | — | total ≤ 46,418; graph_v2 ≤ 6,563 |
| 7 | Full CI mirror | R10 | — | suites, skill-lint, routing, check-no-secrets, postmortem guard, sdd-gate pass |
