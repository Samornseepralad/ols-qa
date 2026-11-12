# Intent — after-14: retest-bug-workflow fixes from the after-13 Exit gate

Owner plan T9 (12/Nov/2026): one file-disjoint fix lane per skill that failed the after-13 Exit gate, root cause taken from the round's verify and grader files, then sync to helix and run after-14.
Why: retest-bug-workflow failed 3 of 4 Exit-gate items in after-13 (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/GATE.md:16`): 2 verified P1, expected items 24.67/25, median time 160.5 s vs ceiling 139 s.
Constraints: edit only `skills/retest-bug-workflow/**`, `skills/procedures/retest-bug-workflow/**`, `references/parallel-test-lanes.md`; never remove or weaken a gate, evidence rule or approval step; bytes of the edited files are the same or lower in total (offset added text).
