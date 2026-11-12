# Spec — after14-tc-review

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/` — `GATE.md:19,50,53`, `verify/tc-review-workflow.json` (#0 CONFIRMED), `grade/tc-review-workflow.json` (prompt 2 run 3), `baseline/tc-review-workflow-s3.json` (scorer 3 P2s at `SKILL.md:290,295,313`). Line numbers refer to `skills/tc-review-workflow/SKILL.md` at origin/main `ade53c10`.

## Rules

- **R1 No dangling section pointer.** When `SKILL.md` cites "§ X", a heading X must exist in the same file. The "(§ Out of scope)" pointer at `:377` must go: commit `3f8f797c` deleted the `## Out of scope` section and its Contents line but left this pointer, and the sentence states the scope itself (source: verify #0, `SKILL.md:22-41` headings).
- **R2 Mixed-language stop asks the destination too.** When the ticket's AC/EC and the TC cells are written in different languages, the run must ask, in one message, the language question (`:236`) and the Step 5 destination question (thread `:256`, or channel + thread when config has none `:263`). Because that destination answer comes before the user sees the review, it must not count as the go-ahead: the send must wait for the user's OK on the item-5 preview (`:286-289`). Language is judged by the AC/EC text and the TC cell text (source: grade p2r3 — the run stopped at the `:236` STOP and deferred the channel ask; p2r1/p2r2 judged the same input not mixed).
- **R3 Read-back has a body to read.** The Discord send must pass `wait=true`, so the item-6 read-back (`:290-291`) has a message object to check (source: scorer 3 P2 `:290`; Discord returns 204 with no body otherwise). Item 6 stays byte-identical (`tools/tc-review-one-question` R5), so the rule goes in item 4.
- **R4 Delete-and-resend is gated.** Before item 7 deletes a message and sends it again, the run must show the wrong destination, the right one and the item-5 preview, and must act only on the user's go-ahead (source: scorer 3 P2 `:295`; a delete cannot be undone).
- **R5 QA closing checks Step 3b.** The QA closing list (`:313-321`) must have an item that every remaining "confirm with dev/PO" question went through the Step 3b sweep and quotes its sources or carries `code not checked — no clone`, and its Go back must return such a question to Step 3b (source: scorer 3 P2 `:313`; Step 3b is mandatory at `:180`).
- **R6 Net bytes.** `SKILL.md` bytes after the change must be ≤ bytes before (27,892). Offsets may only drop restated rationale or a sentence another line already states; no gate, evidence rule, approval step or pinned text is removed (source: owner T9 rule; pins in `tools/r12-p1-three`, `tools/tc-review-one-question`, `tools/r11-*`, `tools/r7-tc-review-limit`).

## Out of scope

Scorer P2s not listed above (`:183` sweep bound, `:187` design node, `:359` layer table, `:381` dependency checklist, `references/session-closing.md:31`) — not in the T9 brief and not cheap without touching other files.

## Edge cases

- A pinned test fails because of an edit → change the edit, never the test.
- Config has a channel → the batched question asks only the thread (`:256` one-question rule still holds).

## Done when

- `grep -n "§ " SKILL.md` shows only pointers to headings that exist.
- The language rule names the destination question and the item-5 OK.
- Item 4 names `wait=true`; item 7 carries a 🔴 GATE; QA closing has the Step 3b item.
- `SKILL.md` bytes ≤ 27,892; every suite from `scripts/list-test-suites.sh` passes.
