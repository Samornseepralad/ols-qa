# Plan — after17-tc-review

Spec: spec.md R1-R11. Files touched: `skills/tc-review-workflow/SKILL.md` (R1-R8, R10), `commands/tc-review.md` (R10), shared refs `references/session-closing.md`, `references/result-quality-gate.md`, `references/qa-closing-shared.md`, `references/qa-evidence-coverage.md` (R9, wording only, bytes not up; `qa-debug-discipline.md` and `playwright-preflight.md` already generic, no edit).

Data: none. Libraries: none (no new cost).

Alternatives weighed: (a) inline one line per layer in SKILL.md (chosen, a15 fix text) vs editing `qa-evidence-coverage.md` (shared by 6 skills, rejected); (b) move Step 5 to a reference (rejected: five `tools/*/check.test.js` read Step 5 inside SKILL.md; spec R11); (c) conditional links in shared files (rejected, shared-file restructure).

Offsets: SKILL.md additions are paid by cutting restated text (execution-only list wording, MUST rows that repeat Step 5, long trigger lines). Shared-file additions are paid inside the same file.

What may break: pinned tests (`tools/tc-review-one-question`, `r7-tc-review-limit`, `r12-p1-three`, `r11-skill-fixes-g1`, `r11-t9-uplift-b`), SKILL.md line/byte caps, helix `token-budget.json`, helix `check-rule-lines.sh` (a reworded MUST/NEVER row).
Shared-file readers: session-closing, qa-closing-shared, result-quality-gate, qa-debug-discipline, qa-evidence-coverage, playwright-preflight are read by testing-ticket, retest, tc-fe, tc-api, create-bug, catch-ai; edits are wording-only and byte-neutral or smaller, no rule removed.
