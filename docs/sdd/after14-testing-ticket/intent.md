# Intent — after-14: close the testing-ticket after-13 misses

Owner request (12/Nov/2026, T9 fix lane): testing-ticket-workflow failed the after-13 gate (P1 2, expected 22.67/23, score 83.4 → 83.2 vs after-10). Fix the root causes in one pass.
Why: the after-13 verify step confirmed both P1s (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/verify/testing-ticket-workflow.json`), and grader p1r2 planned 1 lane where 2 were expected (`grade/testing-ticket-workflow.json`, prompt 1, expectation 10).
Constraints: skill text only, in the testing-ticket files and five named shared references; never remove or weaken a gate, evidence rule or approval step, for this skill or any other that links a shared reference; net bytes per invocation the same or lower.
