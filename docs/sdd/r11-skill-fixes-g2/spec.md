# Spec — r11 skill fixes, group 2

## Sources
- S1 After-9 exams: `evals/helix-skill-eval-2026-11-10-after9/exam/{catch-ai-workflow,testing-ticket-workflow,helix,tc-api-prep-workflow}.json` (evidence repo `ols-qa-evidence`). Every `test_prompts[].expected` item stays satisfiable.
- S2 Fix list relayed by the main thread on 11/Nov/2026 (items A1–A3, TT1, H1–H3, P1–P5), each re-checked against `origin/main` before it was written into this spec.
- S3 Helix `main` (read through the GitHub API on 11/Nov/2026). `.claude-plugin/plugin.json` lists `./skills/test-data-prep-workflow` and `./skills/review-result-workflow`. `commands/` has `review-result.md` and `test-data-prep.md`. `skills/procedures/` has both workflows. Content takedown and smoke test are not shipped.
- S4 `references/round-time-contract.md` §2: no mid-run waits; a question gets its documented default and goes to the end decisions popup. `testing-ticket-workflow/WORKFLOW.md:395`: "NEVER wait mid-run for a user answer".
- S5 `skills/procedures/tc-api-prep-workflow/references/delivery-options.md` § Test.md: offer Test.md alongside CSV/Excel, never as a replacement.
- S6 Frozen-text tests:
  - `tools/r7-helix-one-question/check.test.js:34-39` requires the helix `## Routing` section and `references/menu-text.md` to be byte-identical to `origin/main`, and caps `SKILL.md` at 155 `split('\n')` lines.
  - `tools/tc-api-prep-export-branch/check.test.js:45-52` requires the tc-api-prep WORKFLOW from `### G-verify` to the end of the file (this span includes `## MUST / NEVER`) to be byte-identical to `origin/main`, and caps the file at 370 lines.

## Rules
- R1 (A1) — The catch-ai Quick reference must classify an item that a wrong aggregate claim covers ("all N PASSED") but nothing tested. The aggregate claim is one Defect. The untested item is a Coverage gap only, never a second Defect.
- R2 (A2) — The catch-ai Dependencies list must say that Node.js is needed only when the workspace has `tools/result-gate/check.js`. Without that file, the by-hand walk in § Result quality gate needs no Node.js. This matches `SKILL.md:194-197`.
- R3 (A3) — The catch-ai frontmatter `description` must parse to at most 1024 characters. Today it parses to 1025 because `|` keeps the trailing newline, so it changes to `|-`.
- R4 (TT1) — When a lane returns `SESSION-DEAD` after execution has started, the main thread must not wait. It must:
  - post the Phase D *Fresh login* relink/mint blocks for that account;
  - record the account's remaining cases as BLOCKED ("session not restored");
  - keep the other lanes running;
  - queue the re-run for the end decisions popup.
  If the user runs the blocks and the probe is OK while other lanes are still running, the parent re-dispatches per `parallel-test-lanes.md` §3, and the re-run's result lines supersede those BLOCKED rows. `parallel-test-lanes.md` is shared with retest-bug and is not edited.
- R5 (H1, **blocked: owner decision needed**) — Helix must say that only content takedown (row 8) and smoke test (row 10) are limited to the ols-qa workspace (S3). This covers:
  - `SKILL.md:4`;
  - the `SKILL.md:84` condition, which becomes "Row N chosen and its `skills/{name}/SKILL.md` is not in the loaded skill set";
  - `skill-routing.md:7` and rows 9 and 11, where the label becomes a link to `../skills/{name}/SKILL.md`, as required by `tools/skill-routing/routing.test.js` A5;
  - `menu-text.md` rows 9 and 11;
  - `intent-shortcuts.md` rows 15 and 17;
  - `agent-entry.md:76-77`.
  Every edit is on the same line, so the exam's `skill-routing.md:28-29` and `:41` citations keep their line numbers.
- R6 (H2, **blocked: owner decision needed**) — The helix "routing cannot proceed" table must have the row `| menu-text.md or skill-routing.md cannot be read | Name the file; do not route or show a menu from memory; stop. |`.
- R7 (H3) — The helix QA closing item "Child workflow skill is loaded (not just described)" must also allow a reply that says "not routed" and why, when no child was loaded (the user declined, the fallback is none, or the request is out of scope).
- R8 (P1) — tc-api-prep Phase C must offer a Test.md file (agent hand-off, alongside CSV/Excel) in the delivery question and in the Choice table. G1 must point to `delivery-options.md` § Test.md for writing it.
- R9 (P2) — When the Phase C link is neither a Jira issue nor a Confluence page, tc-api-prep must 🔴 STOP, say the link type is unsupported, and offer B or a Jira/Confluence link. G2 supports only those two destinations (`WORKFLOW.md:259`, `:279`).
- R10 (P3) — The Phase F draft table separator must have the same number of cells as its 3-cell header.
- R11 (P4) — When the operation count is over 15, tc-api-prep must 🔴 STOP until the user agrees the chunk list, before Phase D.
- R12 (P5, **blocked: frozen text**) — The MUST/NEVER table would gain rows for "never guess credentials" (`:82`) and "never fall back from xlsx to CSV without warning" (`:249`). The table sits inside the S6 G-verify-to-end-of-file freeze, so these rows wait for an owner decision on that test. The third proposed row, "commented"/"done" before checks pass (`:303`), is not added: the table already has "MUST pass post-publish review … before reporting 'commented' or 'done'".

## Owner questions (for R5, R6, R12)
- Q1 `tools/r7-helix-one-question/check.test.js` test "routing section and menu text unchanged vs origin/main" freezes the text that R5 and R6 change. Proposed change: replace the byte-equality with assertions of the r7 rules it protected (the one-question rule and "child workflow handles its own intake"). The 155-line cap stays; after R6 the file is exactly 155 lines.
- Q2 `tools/tc-api-prep-export-branch/check.test.js` R5 slices from `### G-verify` to the end of the file, so it also freezes `## MUST / NEVER`. Proposed change: end the slice at `### G3`. The 370-line cap stays.

## Edge cases
- TT1: a `SESSION-DEAD` at the Phase D preflight, before the first scenario, is not mid-run. Phase D *Fresh login* applies unchanged there.
- H3: when the menu is shown and the user has not picked yet, the turn is not a routed reply, so the item does not apply.
- P1: the user chose CSV only (helix exam prompt 1). The Test.md offer is made only in the Phase C question, and only when delivery is still undecided. A fixed choice is stated back, not asked again.

## Done when
- R1–R4 and R7–R11 are each in the file named in `plan.md`. Each is a changed or added sentence or row.
- R5, R6 and R12 are not implemented until the owner answers Q1 and Q2. They are listed as blocked in the code PR.
- The catch-ai description parses to ≤ 1024 characters.
- tc-api-prep WORKFLOW.md is ≤ 370 lines, and its G-verify-to-end-of-file span is unchanged.
- `node tools/skill-lint/lint.js` is clean, and `bash scripts/run-test-suites.sh` passes.
- `bash scripts/check-no-secrets.sh <changed files>` is clean, and `node tools/sdd-gate/check.js --base <base>` passes.
