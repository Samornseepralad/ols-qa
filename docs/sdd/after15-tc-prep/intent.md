# Intent — after-15 tc-prep: close the after-14 Exit-gate P1s of tc-api-prep and tc-fe-prep

Owner (12/Nov/2026, T9 fix lanes): fix every CONFIRMED P1 of the after-14 round at its root cause, never remove or soften a gate, evidence rule or approval step, and keep net tokens per invocation the same or lower.
Why: after-14 GATE.md rows `tc-api-prep-workflow` (P1 = 2) and `tc-fe-prep-workflow` (P1 = 3) (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/GATE.md`, `verify/<skill>.json`). Time rows are out of scope (environment issue this round).
Constraints: one lane for both skills because the P1s meet in the shared export references; edit only those references, the two skills' own files, and the one test that pins the changed tc-api sentence.
