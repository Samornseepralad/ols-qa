# Plan — r11 skill fixes, group 1

| Rule | File | Change |
|---|---|---|
| R1 | `skills/procedures/create-bug-workflow/WORKFLOW.md` Refusal-first (~:69-71) | Replace "Do not file." with: do not draft or file, do not send to Phase E, report as a question (`BLOCKED: spec unconfirmed`) naming the hedge and the source needed. |
| R2, R3 | same file, Phase E labels (~:233-240) and Phase C draft summary line (~:262) | Likely takes the reporter-only question; Needs Review keeps failed checks and evidence against the defect, and says it never holds a hedged expected side. The summary line gets a slot for the Likely question. |
| R4 | same file, Phase B2 item 1 (~:182-184), Phase C `Board check:` line (~:256) | Accept terms + open/closed + result per candidate; missing comment scope → note on the Board check line, ask once, keep the draft, hold only the Phase D create. |
| R5 | `skills/procedures/tc-fe-prep-workflow/requirement-gates.md` 2.6.3 table (~:197) and the carried-terms sentence (~:204); `skills/procedures/tc-fe-prep-workflow/design-and-review.md` 3b term priority (~:48, :50) and Step 4.5 question rows (~:331) | New row "ticket writes the term in Thai"; the empty-cell row points to it; carried-term lists and question rows name it. |
| R6 | `skills/procedures/tc-fe-prep-workflow/requirement-gates.md` 2a.1 Contradictory row (~:35) | Add the one-file vs many-files example. |
| R7 | `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md` Step 5 (~:150) | Add the 🔴 GATE line before "Go back". |
| R8 | `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md:260`, `skills/procedures/tc-fe-prep-workflow/requirement-gates.md:197`, `:201`, `skills/procedures/tc-fe-prep-workflow/design-and-review.md:50`, `:80`, `:177`, `:243`, `skills/tc-fe-prep-workflow/SKILL.md:67` | Reword the listed hits; split Step 6.5 "Rows and run" into numbered sub-items; fix the QA Owner clause. |
| R9, R10, R11 | `skills/tc-review-workflow/SKILL.md` :144, :121, :270 | In-place rewrites on the same lines; no net line growth (file at 402 of 403). |
| R12 | `skills/procedures/retest-bug-workflow/execute-and-evidence.md:191-192` | Replace the two lines with the one sentence. |
| R13 | `tools/r7-create-bug-pasted/check.test.js`, `tools/r7-retest-no-c/check.test.js`, `tools/tc-fe-prep-frontmatter/check.test.js`, new `tools/r11-skill-fixes-g1/check.test.js` | Update the pinned regexes to the new sentences with the same meaning; narrow the frontmatter R3 pin to commit `e1899775`; add the r11 rule-text test. |
| — | `docs/sdd/r7-skill-gaps-after5/spec.md` R1 | Amendment note pointing to R4 here. `docs/sdd/r6-tc-fe-prep-single-frontmatter/spec.md` "Done when" R3: note that the check is pinned to `e1899775`. |

- Alternatives weighed: for R4, keeping "summary and comments" as a hard acceptance condition (rejected: S1 p1 pastes "open+closed" without comment scope and the run must still draft); dropping the comment check entirely (rejected: reopens the after-5 P1 — a settled decision in a comment is missed and the defect is filed again). Holding only the Phase D create keeps both.
- For R11, the relayed order was checked against the text and corrected (spec R11).
- No new tool, dependency or cost. Text and rule-text tests only.
- Risk: tc-review SKILL.md is at 402 of 403 lines and 29,029 bytes; every edit is an in-place rewrite. tc-fe-prep WORKFLOW.md grows by the Step 5 line and the Step 6.5 split (446 → about 455, cap 500).
- Not touched: catch-ai, testing-ticket, helix, tc-api files (parallel lane); retest `WORKFLOW.md` (499/500); `comment-and-post.md` (line 330 pinned); `references/non-pass-challenge-gate.md`.
- Sync to helix follows the normal ols-qa → helix sync after merge.
