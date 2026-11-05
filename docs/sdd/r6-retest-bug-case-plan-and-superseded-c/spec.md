# Spec — r6 retest-bug: case-plan columns vs posted-comment ban; no option C for a superseded AC

Status: draft for owner review · from the round-6 root-cause note (B-rootcause sections 1 and 2, read 2026-11-05) ·
skill text only · no env access · owner decision D2 (2026-11-05) is binding and listed under "Not changed"

## Why

1. Eval p1 #2: the run's Step 2c plan table had no design-node and no fixture column per case, although
   `skills/procedures/retest-bug-workflow/WORKFLOW.md:288-290` requires both. The run's own guard line said "no design-node column", which
   matches the rule for the POSTED comment table (`WORKFLOW.md:486`: "never a design-node column"). Likely cause: the two tables
   were confused (B-rootcause section 1 says "possible", not proven).
2. Eval p2 #5: the "no option C" rule for a superseded expected result is worded for a bug's ER only
   (`skills/procedures/retest-bug-workflow/execute-and-evidence.md:187-190`; `WORKFLOW.md:472`).
   A Task's contract is its AC (`WORKFLOW.md:218-226`), so the sentence does not cover a Task, and the shared gate
   `references/non-pass-challenge-gate.md:131` offers "(C) Confirm the defect" with no superseded exception. The run offered C.

## Rules

- **R1** — When the system builds the Step 2c case plan, each case row must carry: stable id, title, the `ER*`/`AC*` it covers,
  its design node link (UI cases) and the fixture it needs. The plan table therefore has a design-node column and a fixture column.
  (source: `WORKFLOW.md:288-290`)
- **R2** — When the system writes the comment that is posted to Jira, the one table must keep the columns
  No. · ER · Case (Role) · Expected Result · Actual Result · Evidence · Status, with no separate case table and no
  design-node column; the node link goes only on the header `Design ref:` line. (source: `WORKFLOW.md:486`, `:381`)
- **R3** — The text at `WORKFLOW.md:289` and `:486` must each name which table it governs ("plan table, Step 2c" and
  "posted comment table") so that neither sentence can be read as limiting the other. (source: `WORKFLOW.md:289`, `:486`)
- **R4** — When the bug's Expected Result, or the Task's Acceptance Criteria, was superseded by a later ticket, comment
  or design (quoted char-exact), the end menu must offer only **A adjust the expected/TC** and **B re-test**, and must not
  offer **C confirm the defect**. (source: `execute-and-evidence.md:187-190` extended from "bug ER" to "bug ER or task AC";
  `WORKFLOW.md:472` "the bug's ER" extended the same way; Task contract `WORKFLOW.md:218-226`)
- **R5** — `references/non-pass-challenge-gate.md:131` must carry the same exception on option (C): not offered when the
  expected was superseded. This agrees with the gate's own outcome rows (`:88-89`: superseded expected is "not a
  confirmed defect", BLOCKED until the owner picks A). (source: gate `:88-89`, `:122-134`)
- **R6** — Testing-ticket is affected through the shared gate: `skills/procedures/testing-ticket-workflow/execute-and-summarize.md:151-155`
  says the gate is "the single source" and is followed "end to end"; `WORKFLOW.md:105`, `:362`, `:434` list "confirm defect" as a
  recommendation. The system must apply R5 there through the gate; `WORKFLOW.md:434` gets a short matching parenthesis so
  its recommendation list does not contradict the gate. `review-result-workflow` also links the gate
  (`skills/procedures/review-result-workflow/WORKFLOW.md:252,356`) and inherits R5 with no text change there.

## Not changed (owner decision D2, 2026-11-05)

- Retest-bug P1 "a delegated round skips the approval wait" (`comment-and-post.md:330`, layer 19; A-results A2 row 2)
  stays AS IS. Nothing in this spec touches that behavior.

## Owner questions

- None open. (Option wording for A/B is unchanged; only C is removed in the superseded case.)

## Done when

- R1: `WORKFLOW.md:289` says the plan table has the design-node and fixture columns.
- R2/R3: `WORKFLOW.md:486` says the ban applies only to the posted comment table; both lines name their table.
- R4: both `execute-and-evidence.md` and `WORKFLOW.md:472` say "bug ER or task AC".
- R5: gate `:131` carries the exception.
- R6: `WORKFLOW.md:434` parenthesis present; no other testing-ticket text changes.
- D2 line (`comment-and-post.md:330`) is byte-identical to origin/main.
- `bash scripts/run-test-suites.sh` exits 0.
