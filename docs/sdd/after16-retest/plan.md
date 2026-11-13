# Plan — after16-retest

Spec: [spec.md](spec.md) R1–R10.

## Files touched

| File | Rules | Change |
|---|---|---|
| `skills/procedures/retest-bug-workflow/comment-and-post.md` | R1, R3, R5, R6, R7, R8, R10 | Step 6 gate line names the per-action delegation; 6d *Delegated actions* says it wins over the shared broader wording; 7a table keyed on the Step 3 format (FE → 7c always); 7b v3 only; 7d item 3 + Go back fix in place; 6c item 0 before every dispatch; 6c item 4 re-check scope; Design ref template "not yet sent" form (2 places) |
| `skills/procedures/retest-bug-workflow/closeout-and-notify.md` | R2, R8, R10 | Step 9 records the send's message id (`?wait=true`); correction steps: id source, approval, in-place PUT in locked format, stop branch; 8·0 design line accepts "to ask" |
| `skills/procedures/retest-bug-workflow/WORKFLOW.md` | R8, R10 | Step 2d header line "not yet sent" form |
| `references/jira-comment-post-review.md` | R4, R5, R10 | L107 lock / one-table guard; Fix procedure rows L84–85 PUT to the same comment id |

No code, no test logic, no library. Data shape unchanged.

## Options weighed

- **R1:** edit the shared `helix-session-constraints.md` / `agent-rationalizations.md` vs state precedence inside the
  retest bundle. Chosen: precedence in 6d — the shared lines are read by every skill, and narrowing them would change
  other skills' approval behaviour.
- **R6:** drop round 2+ when the only finding is mechanical vs scope round 2+ to the change. Dropping a round breaks
  "approval waits for CLEAN" (a gate). Chosen: keep every round, scope what a later round re-checks.
- **R2 id source:** search the channel history vs record the id at send time. Chosen: record at send time — webhook
  execute with `?wait=true` returns the message object (`references/ols-project-guide.md:768` already posts with
  `?wait=true`); history search needs a bot token with message-content intent.

## Offsets (R10)

Remove restated text only: 6c item 1 "Not the session, not the reasoning, not what you meant." (item 1 already says
"with **only**"); 7a "Definition of table" line restated by the method table; repeated `round-time-contract.md` link
text where the same section is linked in the same item. Exact bytes reported in the code PR.

## What could break

- Text pins in `tools/*/check.test.js` (e.g. `tools/r11-t9-uplift-a` pins L106 of `jira-comment-post-review.md`, not
  edited). Run `bash scripts/run-test-suites.sh`.
- Link checker: anchors of renamed headings — no heading is renamed.
- Helix token guard: rule lines (MUST / NEVER / 🔴 / STOP / GATE) are reworded only by adding text, never removed.
