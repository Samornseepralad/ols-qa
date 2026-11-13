# Tasks — after17-testing-ticket

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | F3 pointer + one filing question | R1 | `grep -c "Open a bug for" execute-and-summarize.md` = 1 | = 0; F3 links defect-candidates.md |
| 2 | E1 reproduce step | R2 | `grep -c "layer 16" execute-and-summarize.md` = 0 | E1 step 4 names layer 16 |
| 3 | Plan template reconcile + lanes | R3 | `:33` "does not block the run" | F4 shortfall wording; serial row form |
| 4 | Runtime-neutral actor and fallbacks | R4 | `grep -c "Claude calls" parallel-test-lanes.md` = 1 | = 0; popup fallback; `/plugin` named once as a runtime's |
| 5 | Portable names | R5 | `grep -c "OLS bug" qa-evidence-coverage.md` = 1 | = 0; no installCFBypassProxy; no private users |
| 6 | Step names resolve | R6 | `grep -c "Step 4 approval" results-update.md` = 1 | = 0; other lines as listed |
| 7 | Status vocabulary | R7 | `grep -c "in-progress" no-wait-decision-gate.md` = 1 | = 0; §6.3 names its label |
| 8 | Bounded lease + selector count | R8 | `:193` "or wait" | bounded; "first try plus two fallbacks" |
| 9 | Check before invoke | R9 | step 1 invokes before step 2 checks | one step checks then invokes |
| 10 | Flag in user's language | R10 | Thai-only template | template neutral + language line |
| 11 | Stubs → anchor table | R11 | `grep -c "moved there" qa-evidence-gates.md` = 14 | = 0; all 14 ids present |
| 12 | WORKFLOW readability | R12 | 10 lines > 400 chars | non-rule ones split; References pointer; history note gone |
| 13 | Worked example | R13 | no Design ref line | all items in R13 present |
| 14 | Description implicit asks | R14 | no "check this on staging" | present; description bytes ≤ before |
| 15 | Fan-out exceptions | R15 | `:48` has no §4 mention | three lines name §4 |
| 16 | Post review for result comments | R16 | no testing-ticket mention | one line maps TC rows / CSV |
| 17 | Measure + suites | R17 | — | token-budget pass, rule-lines pass, suites green |
