# Plan — after-14 testing-ticket P1 fixes

| File | Rules | Change |
|------|-------|--------|
| `skills/procedures/testing-ticket-workflow/WORKFLOW.md` | R1, R2, R5 | one continuation line under the end-of-round GATE linking layer 19; step 5 → step 7; drop the two-line note on why Phase H sits last (the checklist line already says it is event-driven) to offset bytes |
| `skills/procedures/testing-ticket-workflow/execute-and-summarize.md` | R1 | one continuation clause after F5 step 4's bundle list |
| `references/qa-evidence-capture.md` (shared: retest-bug, catch-ai) | R3 | *Narrow-width rows* paragraph after the still spec; layer 1 and the Size row point to it |
| `references/no-wait-decision-gate.md` (shared: every test-running workflow) | R4 | testing-ticket's layer-17 sentence adds (c) for narrow rows, in place (no new line) |

No new library or tool, so no spend.

## Options weighed

- **R1:** (a) state the layer-19 exception next to testing-ticket's gate, as retest-bug does (`comment-and-post.md:328-330`); or (b) declare layer 19 does not apply to testing-ticket. Chosen (a): D3 of `r12-p1-retest` applied layer 19 to every workflow by link, so (b) would contradict an owner-approved shared rule; (a) adds no new skip, only names the existing one.
- **R3:** (a) BLOCKED narrow rows until the recorder accepts them; (b) record narrow rows at 1920 px; (c) drop the floor for narrow rows. (b) proves nothing about the narrow layout and (c) weakens an evidence rule, so (a). The still floor is derived from the file's own density rule, not invented.

## What could break

- Pinned-text tests in `tools/` (r12-p1-retest pins layer-19 wording, which is not edited; r7-testing-ticket-lanes, testing-ticket-plan-width, link-check, skill-lint). Run the full suite list.
- The new `#narrow-width-rows` anchor: `tools/link-check` covers it.
