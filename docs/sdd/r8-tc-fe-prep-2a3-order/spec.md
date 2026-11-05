# Spec — r8 tc-fe-prep 2a.3 ordering

Source: after-6 grade, tc-fe-prep p2r1/p2r2/p2r3; `skills/procedures/tc-fe-prep-workflow/requirement-gates.md:49` ("After the HTML report is opened in Chrome (Step 2.5d) … ask in chat") and `:136` ("If Step 2a found issues → post the Step 2a.3 decision prompt in chat").

- **R1** — When Step 2a found issues and Step 2.5a must wait for the PRD/Figma links, the system must stop at 2.5a with only the 2.5a request and must not post the 2a.3 decision prompt in the same turn; the 2a.3 prompt is posted after the Step 2.5d report is opened. (source: `requirement-gates.md:49,136`, grade evidence)
- **R2** — The 2.5a section must state R1 in one sentence at its Wait. (the gap: lines 73-87 have a Wait before 2.5d and no deferral sentence)
- **R3** — No other line of requirement-gates.md changes; `WORKFLOW.md` is not edited.

Done when: a test fails first on the unedited file for R2 and passes after; `bash scripts/run-test-suites.sh` exits 0; PR merged; helix parity OK.
Owner question Q1: none (default: one sentence, no restructuring).
