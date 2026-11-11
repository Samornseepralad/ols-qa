# Spec — r11 skill fixes, group 1

## Sources
- S1 after-9 exam and review: `evals/helix-skill-eval-2026-11-10-after9/exam/{create-bug,tc-fe-prep,tc-review,retest-bug}-workflow.json` (evidence repo `ols-qa-evidence`). Exam items that touch these rules: create-bug p1 (Board check line, Needs Review not counted), p2 (C1 hedge → question/BLOCKED, "3 searched / 1 dropped"); tc-fe-prep p2 (Contradictory flags, `Clear filter` stop at 2.6.3); tc-review p2 (BR-2 not mentioned at all); retest p2 (A/B only, no C).
- S2 Investigation notes for round 9, relayed by the lead session; each claim re-read at its line on `origin/main` (`18326525`) before this spec.
- S3 Owner decision 11/Nov/2026 (C3): a question only the reporter can answer, with nothing in the evidence against the defect, is **Likely**, not Needs Review.
- S4 `docs/sdd/r7-skill-gaps-after5/spec.md` R1 — the rule this spec amends for pasted board-search results (it added `WORKFLOW.md:182-184`, commit `fd460045`). `docs/sdd/r10-create-bug-no-double-file` covers Phase D step 4 (search before switching create path) and is not changed: no rule below touches step 4.

## Rules

### create-bug-workflow (`skills/procedures/create-bug-workflow/WORKFLOW.md`)
- **R1 (C1)** — When the expected side is hedged or unconfirmed, the agent must not draft or file that item and must not send it to Phase E; it must report it in chat as a question, `BLOCKED: spec unconfirmed`, naming the hedge and the authoritative source needed (design/Figma, PRD, AC or PO). (S1 create-bug p2; an after-9 run drafted it as Needs Review.)
- **R2 (C2)** — The Needs Review label must state that it never holds a hedged expected side (that item stops at Refusal-first). "Drafted, shown, not counted" stays.
- **R3 (C3)** — When a question only the reporter can answer remains open and nothing in the evidence argues against the defect, the candidate must be labelled **Likely** and the question must appear on its Likely line in the Phase C draft summary, not under Needs Review. Needs Review keeps the cases where a check failed or the evidence argues against the defect. (S3)
- **R4 (C4)** — Pasted board-search results must be accepted when they show the query terms, the open and closed state, and a result per candidate; otherwise the agent re-runs the search or asks for the missing part. When the paste does not state whether comments were searched, the agent must write `comment scope not stated` on the Phase C `Board check:` line and ask once; it must not hold the draft. Phase D must not create that candidate until the user says the search covered comments or the search is re-run over comments, because the conclusion that settles a behaviour often lives in a comment (the after-5 P1 behind r7 R1 stays closed). **Amends r7 R1** (S4).

### tc-fe-prep-workflow (`skills/procedures/tc-fe-prep-workflow/`, `skills/tc-fe-prep-workflow/SKILL.md`)
- **R5 (F1)** — When the ticket itself writes a term in Thai and the glossary gives no Thai for it (empty cell or no row), that is not a Step 2.6 stop: design reuses the ticket's Thai word unchanged and the term is asked once as a Step 4.5 question row (ที่มา `user`). The empty-Thai-cell stop stays for every other case, so an English label such as `Clear filter` with an empty cell still stops at 2.6.3 (S1 tc-fe-prep p2).
- **R6 (F2)** — The 2a.1 Contradictory row must carry a second example where one item sets a limit and another exceeds it, from a domain other than the exam's (one file vs many files at once).
- **R7 (F3)** — Step 5 must carry `🔴 GATE — STOP: Step 6 starts only after the user approves this draft in chat.` (confirmed P1: Step 5 had no 🔴 marker).
- **R8 (F4)** — The soft-wording hits at `WORKFLOW.md:260` (may ×2), `requirement-gates.md:197` and `:201`, `design-and-review.md:50`, `:80` (×2), `:177`, `:243` and `SKILL.md:67` must be reworded as imperative or conditional text with the same meaning. The renamed `requirement-gates.md:201` row and its echo at `design-and-review.md:80` must keep the same name. The Step 6.5 "Rows and run" paragraph must be split into numbered sub-items, and its recovery clause must read "if it is wrong and the QA Owner agrees". Soft words outside these lines are not changed in this round.

### tc-review-workflow (`skills/tc-review-workflow/SKILL.md`)
- **R9 (R1)** — A business rule or comment that conflicts with no AC/EC must not be named anywhere in the review: no Sources/inputs line, no closing or self-check line (S1 tc-review p2: "BR-2 not mentioned at all").
- **R10 (R2)** — When no TC row carries an AC/EC tag, the agent must map rows by Expected Result vs AC text, mark each mapped id `inferred` in the Claimed-by cell (Status stays one of the four closed values), and report the missing tags once under Need Improve (confirmed P1).
- **R11 (R3)** — The notify list must state its run order. Read against the text: item 2 previews the text "after any item-5 tightening", item 7 ends "then continue from item 2", and item 8 (wording conventions) applies "before sending". The order is therefore **1 → 8 → 5 → 7 → 2 → 3**; items 4 and 6 run only when correcting a sent message. (The relayed order 1 → 7 → 5 → 2 → 3 omits item 8 and would make item 7's "continue from item 2" skip item 5.)

### retest-bug-workflow (`skills/procedures/retest-bug-workflow/execute-and-evidence.md`)
- **R12 (T1)** — The unresolved-supersession sentence that repeats itself (lines 191-192) must read: "Same while supersession is **unresolved** (a newer ticket, comment or design that may supersede the expected is not yet confirmed or ruled out): A · B only — **C confirm defect** is offered only once the AC/EC check is confirmed authoritative." Meaning unchanged (r7 R5).

### Rule-text tests
- **R13** — The tests that pin the old sentences change with them and keep asserting the same rule: `tools/r7-create-bug-pasted/check.test.js` (R4), `tools/r7-retest-no-c/check.test.js` (R12). `tools/tc-fe-prep-frontmatter/check.test.js` R3 compares the WORKFLOW.md body to `origin/main`, which blocks every later edit of that file (R7, R8); it is narrowed to the commit it verified — the body after `e1899775` equals the body before it — so the r6 claim stays checked. A new `tools/r11-skill-fixes-g1/check.test.js` asserts R1–R12.

## Edge cases
- R1: a batch with one hedged item and other clean items — the clean items proceed; the hedged item still counts as searched on the Board check line when its search ran (S1 p2 "3 searched").
- R3: a reporter question and evidence against the defect at the same time → Needs Review (evidence wins over the open question).
- R4: the user replies `confirm` without answering the comment-scope question → the other candidates are filed; that candidate waits, and the Phase F report says why.
- R5: the ticket writes both a Thai and an English form of the term → the Thai form is reused and the question row names both.
- R10: some rows tagged and some not → only the untagged rows are mapped `inferred`; the missing tags are still reported once.

## Done when
- R1–R4 in create-bug `WORKFLOW.md`; R5–R8 in the tc-fe-prep files named; R9–R11 in tc-review `SKILL.md`; R12 in `execute-and-evidence.md`.
- `skills/tc-review-workflow/SKILL.md` ≤ 403 lines and < 30,000 bytes; every changed SKILL.md/WORKFLOW.md ≤ 500 lines.
- `bash scripts/run-test-suites.sh` passes, `node tools/skill-lint/lint.js` exits 0, `git ls-files -z | xargs -0 bash scripts/check-no-secrets.sh` is clean, `node tools/postmortem-guard/check.js` passes, and `node tools/sdd-gate/check.js` passes.
