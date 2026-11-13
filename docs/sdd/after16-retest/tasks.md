# Tasks — after16-retest

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Step 6 gate line + 6d precedence sentence | R1 | `grep -c "unless they explicitly waive approval" comment-and-post.md` = 1 | 0; 6d names the shared files it overrides |
| 2 | Notify id recorded at send; correction steps with approval + stop | R2 | `grep -c "?wait=true" closeout-and-notify.md` = 0 | ≥ 1; correction has id source, approval, stop branch |
| 3 | 7a keyed on Step 3 format; 7b v3 only | R3 | 7a row 1 matches an FE comment of ≤ 3 rows | FE → 7c in every row |
| 4 | L107 guard; Fix rows PUT | R4, R5 | `grep -c "split into 2 comments (header+first half" jira-comment-post-review.md` with no lock guard | guard present; no "re-post" in Fix procedure |
| 5 | 7d in place | R5 | `grep -c "return to Step 7 to re-post" comment-and-post.md` = 1 | 0; item 3 + Go back say same comment id |
| 6 | 6c item 0 every dispatch; item 4 re-check scope | R6, R7, R9 | `grep -c "Before the first dispatch" comment-and-post.md` = 1 | 0; item 4 lists (a)(b)(c); CLEAN gate lines intact |
| 7 | Design ref "not yet sent" form | R8 | `grep -c "not yet sent" WORKFLOW.md` = 0 | form in WORKFLOW 2d, template ×2, 8·0 accepts it |
| 8 | Offsets, bytes, full test run | R10 | — | bytes ≤ before per file; all suites pass; sdd-gate ok |
