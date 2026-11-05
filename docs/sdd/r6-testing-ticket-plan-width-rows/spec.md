# Spec — r6 testing-ticket: the Phase C plan has one row per scenario x width

Status: draft for owner review · owner decision 2026-11-05: fix the skill (not the eval) · from B-rootcause section 7
(confidence medium) · skill text only · no env access

## Why

Eval p2 #9: the run's Phase C plan put "1440 · 390" in one cell and marked 768 out of scope, following the plan template.
The plan template `references/test-execution-plan-template.md:24` has columns `# | Scenario | AC/EC id(s) | Spec / path | Data setup` — no Width column;
`skills/procedures/testing-ticket-workflow/WORKFLOW.md:192` only says "list the screen widths in scope and state which are explicitly out of scope";
`:235` carries a header line `Widths: {in scope} — out of scope: ...`. The one-row-per-width rule exists only for the RESULTS table
(`execute-and-summarize.md:217-218,231`: "a scenario in scope at two widths is two rows"; `WORKFLOW.md:451`: "run every in-scope width as its own row"),
and `:451` can be read as covering the plan too (B-rootcause section 7: ambiguity).

## Rules

- **R1** — When the system writes the Phase C plan, the In-scope table must have a `Width` column and one row per scenario x width
  (a scenario in scope at 1440 and 390 is two rows, not "1440 · 390" in one cell).
  (source: template `:24`; `execute-and-summarize.md:231`)
- **R2** — When a width is out of scope, the plan must state it explicitly (width + reason) in the Out of scope section / `Widths:` header line;
  an out-of-scope width must not appear as a row. (source: template `:31-33`; `WORKFLOW.md:192,235`)
- **R3** — The coverage check must stay: every AC/EC id appears in at least one row; adding the Width column must not make a scenario
  count as covered at a width it has no row for. (source: template `:29`)
- **R4** — `WORKFLOW.md:192` (Phase C depth scoping) and `:451` (MUST row) must say the plan table and the results table both use one row per width,
  so the plan rows can be reconciled 1:1 with results rows. (source: `WORKFLOW.md:192,451`; `execute-and-summarize.md:217`)
- **R5** — The results table (`execute-and-summarize.md:217`) already has a `Width` column and is not changed.
- **R6** — The plan-width rows must be reconciled against results: every plan row (scenario x width) has a results row. This is stated as a check in the plan template; no new gate tool.
  Whether a failing reconcile should block (like coverage layers) or only report is an OWNER QUESTION (Q1), because no source says.

## Owner questions

- Q1: R6 reconcile — block the run or report only?
- Q2: Where a scenario has no layout dependence (pure API), is a single `n/a` width row acceptable? No source; default proposed: `Width = n/a`, one row.

## Done when

- R1/R2: template table shows a `Width` column and the example row pair; Out of scope line names widths.
- R3: coverage-check sentence still present.
- R4: both `WORKFLOW.md` lines carry the one-row-per-width phrase for the plan.
- R6: template has the reconcile line (blocking or not per Q1).
- `bash scripts/run-test-suites.sh` exits 0.
