# Plan — r11 skill fixes, group 2

| Rule | File | Change |
|---|---|---|
| R1 | `skills/catch-ai-workflow/SKILL.md` Quick reference table (~line 153) | One added row after "Nothing covers it at any level". |
| R2 | same file, `## Dependencies` (~line 288) | Same-line edit of the `- Node.js` bullet. |
| R3 | same file, line 3 | `description: |` → `description: |-`. |
| R4 | `skills/procedures/testing-ticket-workflow/execute-and-summarize.md:63-64` | Replace the last sentence of the *Lane failure* paragraph with the no-wait rule. Rewrapped at about 100 columns. |
| R7 | `skills/helix/SKILL.md:96` (QA closing, outside the frozen `## Routing` span) | Same-line append. |
| R8 | `skills/procedures/tc-api-prep-workflow/WORKFLOW.md` Phase C (~lines 125, 133) and G1 | Same-line edits to the B offer and the B row. One G1 step points to `delivery-options.md` § Test.md. |
| R9 | same file, Phase C after the Choice table | One added rule line, after a blank line. |
| R10 | same file, Phase F template (~line 226) | Same-line separator fix. |
| R11 | same file, Phase A (~line 88) | Same-line edit. |
| R5 | `skills/helix/SKILL.md:4,84`; `references/skill-routing.md:7,19,21`; `references/menu-text.md:24,26`; `references/intent-shortcuts.md:15,17`; `references/agent-entry.md:76-77`; `references/result-quality-gate.md:256` | Q3 approved. Every edit is on the same line (no line count changes). |
| R15 | `tools/skill-structure/check.test.js:15` | The assertion becomes: has content-takedown + smoke-test, not review-result / test-data-prep / helix. Q3 approved. Same PR as R5. |
| R6 | `skills/helix/SKILL.md` "routing cannot proceed" table | One added row after the "routed `SKILL.md` is missing" row (SKILL.md splits to 155 lines, the r7 cap). Q1 approved. |
| R12 | tc-api-prep `WORKFLOW.md` `## MUST / NEVER` | Two added rows after "MUST NOT invent endpoints" (file reaches 370 lines, the r6 cap). Q2 approved. |
| R13 | `tools/r7-helix-one-question/check.test.js` | Replace the byte-freeze test with the one-question assertions on Routing and the menu-text opening block. Q1 approved. |
| R14 | `tools/tc-api-prep-export-branch/check.test.js` | The R5 slice ends at `### G3` on both sides. Q2 approved. |

- No new tool, dependency or cost. Text only.
- Line guards:
  - tc-api-prep WORKFLOW.md was 366 lines and must stay ≤ 370 (`tools/tc-api-prep-export-branch/check.test.js` R6). R9 adds two lines (a blank line and the rule). The R8 G1 step takes the blank line between steps 3 and 4, so it adds none, and the file reaches 368. R12 adds two rows: 370. The R4 xlsx sentence in G1 stays byte-identical. Step 4 stays "4. **Write failure**" (pinned by `tools/r7-tc-api-prep-matrix/check.test.js` R4g), so the Test.md step is step 5.
  - execute-and-summarize.md has no line cap.
  - catch-ai SKILL.md grows by one line, to 291 (skill-lint max 500).
- Frozen spans left untouched: tc-api-prep `### G-verify` up to `### G3` (r6 test, after R14). `menu-text.md` rows 9 and 11 change only by R5; the R13 test still holds (one question line, one "Reply with" line). The helix `## Routing` freeze is replaced by R13.
- Three test files change (R13, R14, R15), each with an owner approval.
- Risk 3: helix now runs the structure check on review-result and test-data-prep. Both already pass `checkText` (no violations). Helix ships both today (S3), so its own CI already checks them.
- Not edited: files owned by the parallel lane (create-bug, tc-fe-prep, tc-review, retest-bug), `references/parallel-test-lanes.md` (shared with retest-bug), and `skills/testing-ticket-workflow/SKILL.md`.
- Risk 1: R4 reads as a second dead-session rule. It stays in the *Lane failure* paragraph that already owns the `SESSION-DEAD` hand-off, and it points to Phase D and §3 rather than restating them.
- Risk 2: R8 makes Test.md look like a replacement for CSV/Excel. The wording says "alongside", as S5 does.
- Sync to helix follows the normal ols-qa → helix sync after merge.
