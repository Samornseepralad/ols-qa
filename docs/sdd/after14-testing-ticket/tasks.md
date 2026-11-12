# Tasks — after-14 testing-ticket fixes

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| T1 | Add the testing-ticket causes to layer 17 | R1 | `grep -c testing-ticket references/no-wait-decision-gate.md` finds no layer-17 line | one sentence names all 6 causes with their sections; retest's five and the generic three unchanged |
| T2 | One hedge list | R2 | `grep -l "cache issue" references/shared-must-never.md skills/procedures/testing-ticket-workflow/*.md` matches 3 files | only RCI §4 has the words; 4 sites link to it and keep their MUST NOT |
| T3 | One Figma dedupe rule | R3 | `grep -rl "One compare per screen" references skills` matches 3 files | only round-time-contract §7; it holds every clause; 2 sites link |
| T4 | Guest unit counts | R4 | WORKFLOW step 7 says a guest "never adds a lane" | the bullet counts the guest unit, leases no account, places it by duration, and gives the 2-lane example |
| T5 | One start order | R5 | SKILL.md:20, :25, :116 and WORKFLOW:56 each state an order | Run order is numbered 1 session start → 2 strategize → 3 dependencies …; the other sites link to it |
| T6 | Merge RCI-copy rows; 4a links | R6, R7 | WORKFLOW rows 396-398, 400 restate RCI; 4a restates figma §2 | one RCI link row; 4a is a link plus the record-the-links instruction |
| T7 | Verify | R8 | — | all suites green; secrets guard green; sdd-gate green against a base with this folder; byte table before → after; grep of every file that links an edited shared reference reviewed |
