# Plan — after-14 testing-ticket fixes

## Files

| File | Rules | Change |
|------|-------|--------|
| `references/no-wait-decision-gate.md` | R1 | layer 17: add one testing-ticket sentence after retest-bug's five causes |
| `references/root-cause-investigation.md` | R2 | §4 list stays the only copy; the MUST NOT hedge row links to it |
| `references/shared-must-never.md` | R2 | the hedge row links to RCI §4, keeps "infer" and adds "restate the symptom" (stricter, not weaker) |
| `references/round-time-contract.md` | R3 | §7 becomes the full dedupe rule, with the clauses that today live only in the figma copy |
| `references/figma-design-comparison.md` | R3 | the dedupe bullets become one link line |
| `skills/procedures/testing-ticket-workflow/execute-and-summarize.md` | R2, R3 | cause gate box links to the list; E0 step 1 dedupe links to §7 |
| `skills/procedures/testing-ticket-workflow/WORKFLOW.md` | R4–R7 | guest bullet; Run order gets step 1 session start; Discipline points to Run order; RCI rows merged into one link row; 4a links to figma §2 |
| `skills/testing-ticket-workflow/SKILL.md` | R5 | session-start line, step 2 and Dependencies point to WORKFLOW *Run order* |

No new library or tool, so no spend.

## Options weighed

- **R1:** (a) extend layer 17 with the testing-ticket causes, or (b) stop testing-ticket from writing BLOCKED for them. Chosen: (a). Option (b) would make visual points with no design, or rows a dead session never ran, PASSED or missing. That weakens the evidence rules. The scorer's suggested fix also names (a).
- **R2 canonical home:** RCI §4 is the richest list and every test-running skill already links RCI. `shared-must-never.md` already links RCI in the row above, so a link loses no reader.
- **R3 canonical home:** round-time-contract §7, because figma-design-comparison already defers to it ("Dedupe per round (round-time-contract §7)"). The extra figma clauses move into §7, so no clause is lost.
- **R4:** (a) count the guest unit, or (b) split one screen's widths across lanes. Chosen: (a). Option (b) contradicts `parallel-test-lanes.md` §2 (`:58`), which this lane cannot edit. Option (a) follows §2 as written and §3 "balance lanes by expected duration".

## What could break

- Pinned-text tests in `tools/` (r7-testing-ticket-lanes, testing-ticket-plan-width, r12-p1-retest, link-check, portability). Run the full suite list before and after.
- Anchor links into RCI §4 and round-time-contract §7. `tools/link-check` and `tools/portability/links_resolve` cover these.
- Other skills that link `shared-must-never.md` / RCI / round-time-contract / figma (grep list in tasks T7) must still read correctly.
