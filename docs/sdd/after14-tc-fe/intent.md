# Intent — after-14 tc-fe-prep: close the after-13 Exit-gate misses

Owner (12/Nov/2026, T9 fix lanes): fix the root causes the after-13 round verified for tc-fe-prep-workflow, never remove or soften a gate, evidence rule or approval step, and keep net tokens per invocation the same or lower.
Why: after-13 GATE.md row `tc-fe-prep-workflow` failed on 3 verified P1s and median time 136 s vs ceiling 110 s (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/GATE.md`, `verify/tc-fe-prep-workflow.json`).
Constraints: edit only tc-fe skill files, the tc-fe-prep copy of the ADF template, and the Qase row of `references/dependencies.md`; the shared publish references stay unchanged and the skill follows them.
