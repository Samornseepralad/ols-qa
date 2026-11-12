# Intent — after-14: tc-api-prep-workflow fix lane (T9)

Owner request (12/Nov/2026, T9 fix lanes): fix the root cause of every after-13 miss for tc-api-prep-workflow in one pass.
Why: after-13 GATE (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/GATE.md`, tc-api rows) failed on one verified P1 (`verify/tc-api-prep-workflow.json`, CONFIRMED: `SKILL.md:56` runs the Jira credential checks before step 1 on every run, so a CSV-only run stops before intake) and on two token-diet measures (darwin_total 85.8 → 85.4, median output bytes 9,362 → 9,524).
Constraints: edit only `skills/tc-api-prep-workflow/**` and `skills/procedures/tc-api-prep-workflow/**`; `references/dependencies.md` belongs to another lane. Never remove or weaken a gate, approval step or evidence rule; the Jira credential check still runs before any Jira delivery. Net bytes of the edited files stay the same or lower.
