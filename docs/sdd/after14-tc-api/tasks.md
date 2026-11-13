# Tasks — after-14 tc-api-prep-workflow fixes

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Scope dependency rows to the Phase C delivery; Phase C runs the checks before Phase D | R1, R2 | `grep -n "before step 1" skills/tc-api-prep-workflow/SKILL.md` hits :56 | no hit; Phase C line present; phase-g REST re-check unchanged |
| 2 | Phase F header: Out of scope line, bold headers; markdown-template links to it | R3 | `grep -c "Out of scope" phase-f-draft.md` = 0 | 1; headers bold |
| 3 | 🔴 on the Phase E draft gate | R4 | phase-e-review.md:27 starts with `MUST NOT` | starts with 🔴 |
| 4 | csv-template-types marked TC FE only | R5 | SKILL.md:39 says "at Phase G1, before exporting a CSV" | says never opened; skill-lint 0 new |
| 5 | Phase G: >50-row offer case, Confluence-failure CSV default | R6 | phase-g-deliver.md:31 "a file produced while delivering A" undefined | case named; default path named |
| 6 | Phase D: spec-silent STOP scope, 422 | R7 | phase-d :17 has no spec condition; :14 says only 400 | both present |
| 7 | WORKFLOW parse-failure branch | R8 | no "parse" branch near WORKFLOW.md:72 | branch present |
| 8 | Worked example numbers, HTTP lead, abbreviated label | R9 | Outcome 12 with an inserted 404 | numbers add up |
| 9 | Shorter checklist, delivery-options links, drop duplicate link, grammar | R10 | checklist lines name phase files | done; no gate text removed |
| 10 | Measure bytes, run CI set | R11 | — | bytes after ≤ 44,831; all suites, lint, routing, secrets, sdd-gate pass |
