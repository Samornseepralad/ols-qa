# Tasks — after-14 testing-ticket P1 fixes

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| T1 | Name the layer-19 delegation at both gate sites | R1 | `grep -c "layer 19" WORKFLOW.md execute-and-summarize.md` = 0 | both sites link layer 19; no 🔴/GATE line edited |
| T2 | Fix the smoke gate step citation | R2 | `WORKFLOW.md:111` says step 5 | it says step 7; every *Run order* citation matches the list |
| T3 | Narrow-width rows branch | R3 | `grep -c -i narrow references/qa-evidence-capture.md` = 0 | the paragraph exists with its anchor; layer 1 and Size row point to it |
| T4 | Layer 17 narrow cause | R4 | layer 17 testing-ticket sentence has no (c) | it names (c) for narrow rows; file ≤ 100 lines |
| T5 | Verify | R5 | — | all suites green; sdd-gate green; byte table before → after; WORKFLOW not larger |
| T6 | Token offset in WORKFLOW.md | R6 | measure = 16420 / 23967 (> 16409 / 23957) | measure ≤ 16409 / 23957; 0 rule lines changed |
