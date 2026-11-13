# Tasks — after-16 tc-api-prep-workflow fixes

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Credentials row checked only at G2 step 4 (tc-api), never for tc-fe; shared row states browser-session fallback | R1 | `grep -n "delivery includes A" SKILL.md` shows the credentials line; dependencies.md:59 has no browser fallback | SKILL line names G2 step 4; row names tc-api/tc-fe fallback; curl unchanged |
| 2 | Phase F Go back: scope/source change or whole-draft rejection → Phase D + E | R2 | `grep -c "Phase D" phase-f-draft.md` = 0 | 1 hit in Go back |
| 3 | Shared attachment lines conditional on a generated file | R3 | qa-closing-shared.md:19 ends "CSV/Excel attached." | both lines say "when one was generated" |
| 4 | Offsets, bytes, CI | R4 | — | bytes ≤ 48,657; suites + sdd-gate green |
