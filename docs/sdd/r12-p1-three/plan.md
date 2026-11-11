# Plan — r12 close three after-9 P1 findings

## Files touched
- `skills/procedures/create-bug-workflow/references/bug-draft-template.md` (R1–R4)
- `references/defect-report-completeness.md` (R4 — one added pointer paragraph in §1, plain-text cite, no link, so `tools/skill-lint` must-read depth is unchanged)
- `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md` (R5, R6 — Step 6, after the file table)
- `skills/tc-review-workflow/SKILL.md` (R7, R8, R10)
- `tools/r11-skill-fixes-g1/check.test.js`, `tools/r7-tc-review-limit/check.test.js`, `tools/tc-review-one-question/check.test.js` (R9 — anchors only)
- `tools/r12-p1-three/check.test.js` (R11) — plain `assert` + `fs`, same style as `tools/r11-t9-uplift-a/check.test.js`; picked up by `scripts/list-test-suites.sh`.

## Data / library
None. No dependency added (free, nothing installed).

## Options weighed
- create-bug: (a) mark Why-failed / resolution N/A for new bugs in the contract (finding's alternative) — rejected: it narrows a contract shared with retest and testing-ticket; (b) add the blocks to the template — chosen (owner-delegated decision), stricter and makes the claim literally true.
- tc-review: (a) keep numbering, keep run-order sentence — the P1 stays; (b) renumber into execution order — chosen; needs three existing tests' anchors updated (no assertion loosened).
- tc-fe-prep: branches placed in Step 6 itself (not a reference file) so the agent meets them where the write happens.

## What could break
- Tests anchored on tc-review item numbers (handled in R9). `tc-review-one-question` R5 compares item 3 byte-for-byte with `origin/main`; after renumbering it compares the item body (from `**Send, then read the response back**`) of new item 6 with old item 3, which keeps the "unchanged" intent.
- tc-review line cap 403: renumbering is line-neutral; the run-order sentence stays one line.
- Retest-bug files: not touched (parallel lane).
