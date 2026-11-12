# Spec — after15-tc-review

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/` — `GATE.md:17`, `verify/tc-review-workflow.json` (`#s2-0` CONFIRMED; `#0`, `#s3-0` NOT_CONFIRMED). Line numbers refer to `skills/tc-review-workflow/SKILL.md` at origin/main `7ff1cc5`.

## Rules

- **R1 Changed text needs its own OK.** When the text in the item-5 preview differs from the review the user saw in chat (item 2 wording conventions or item 3 tightening), the run must stop after the preview and send only on the user's OK to that preview; the thread answer alone must not count as the go-ahead. When the text is unchanged, the thread answer stays the go-ahead and no separate "send it?" question is added (source: verify `#s2-0`, `SKILL.md:241-242,256,286-289`).
- **R2 Both places agree.** The Step 4 go-ahead sentence (`:241-242`) must name the same exception as item 5, so no line says the thread answer is always enough (source: verify `#s2-0` cites `:242` and `:289` together).
- **R3 Pins and size.** Pinned text stays: "The answer is the go-ahead to send." and "counts as the go-ahead only once that preview is visible" (`tools/tc-review-one-question` R4), "the final text exactly as it will be sent (after any item-3 tightening)" (`tools/r12-p1-three` R8). `SKILL.md` bytes after the change ≤ before (28,269); offsets drop only restated rationale or a pointer another line already gives (source: owner T9 rule).

## Out of scope

`#0` and `#s3-0` (NOT_CONFIRMED); time row (environment).

## Edge cases

- Mixed-language path already waits for the OK after the preview (`:236`); R1 does not add a second question there.
- Text unchanged → no extra question (keeps the one-question rule at `:256`).

## Done when

- Item 5 carries a 🔴 STOP for changed text with "send only on the user's OK to this preview".
- `:241-242` names the changed-text exception.
- `SKILL.md` bytes ≤ 28,269; every suite from `scripts/run-test-suites.sh` passes.
