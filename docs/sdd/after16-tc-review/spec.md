# Spec — after16-tc-review

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/` — `GATE.md:17`, `verify/tc-review-workflow.json` (`#s2-0` CONFIRMED). Line numbers refer to `skills/tc-review-workflow/SKILL.md` at helix `7b126d1` (same text on ols-qa origin/main `3bbc3b18`).

## Rules

- **R1 The document result has a slot.** The Step 4 report template must end with one line `**Document:** {Pass | Need Improve | Unverified}`, so the verdict **Unverified** that `:348` requires has a place in the delivered review (source: `#s2-0`, `:210-217`, `:348`).
- **R2 Each value has one rule, Unverified wins.** When any row is listed under Need Improve as "unverified expected", the line must be **Unverified**; otherwise, when Need Improve has any bullet, **Need Improve**; only when Need Improve is empty, **Pass** — the "pass the document" of `:348` (source: `#s2-0` "no other document verdict value ... is defined").
- **R3 No conflicting lines.** The Document line is the review result, not a test verdict: `:362` and `:378` must say the workflow records no *test* verdict, and Step 4 must say the session-closing `Verdict:` block (`references/session-closing.md:63`, run state) is still written, separately (source: `#s2-0` cites `:362`, `:378`, `session-closing.md:63`).
- **R4 Pins and size.** The `:348` NEVER line and every text pinned by `tools/*/check.test.js` stay. `SKILL.md` bytes after the change ≤ before (28,267); offsets drop only restated wording (source: owner T9 rule, common brief item 4).

## Out of scope

`references/session-closing.md` (shared by every skill; its verdict block already fits run state). Time row (reported in the lane report only).

## Edge cases

- Need Improve holds only "unverified expected" bullets → Unverified, not Need Improve (R2 order).
- A Good row whose expected is borrowed is already forbidden by `:348`; R2 adds no new path to Pass.

## Done when

- Step 4 template carries `**Document:** {Pass | Need Improve | Unverified}` and the R2 precedence sentence.
- `grep -n "records a verdict\|evidence or verdict" SKILL.md` finds nothing; the session-closing block is named as separate.
- `SKILL.md` bytes ≤ 28,267; every suite from `scripts/run-test-suites.sh` passes.
