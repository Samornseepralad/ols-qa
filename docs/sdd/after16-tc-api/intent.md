# Intent — after-16: tc-api-prep-workflow fix lane (T9 after-15 P1s)

Owner request (13/Nov/2026, T9 after-15 fix lanes): fix the root cause of every confirmed after-15 P1 for tc-api-prep-workflow in one pass; decide with the best-sourced option, ask nothing.
Why: after-15 verify (ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/verify/tc-api-prep-workflow.json`) confirmed three P1s: `tc-api-prep-workflow#0`, `#s2-0`, `#s3-0`. The same REST-credentials gap is also cited for tc-fe-prep (`tc-fe-prep-workflow#s3-0`); this lane owns the shared `references/dependencies.md` row and fixes it for both skills.
Constraints: never remove or weaken a gate, approval step, evidence rule or any MUST / NEVER / 🔴 / STOP / GATE line. Shared files (`dependencies.md`, `qa-closing-shared.md`, `qa-evidence-gates.md`) keep every other skill's behaviour. Net bytes of the edited files stay the same or lower.
