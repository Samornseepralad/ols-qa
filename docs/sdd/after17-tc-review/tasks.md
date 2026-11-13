# Tasks — after17-tc-review

Each task: rule served, test that fails first, done when.

- T1 (R1) Step 5 question carries the preview. Fail first: `grep -c "same message as" SKILL.md` = 0. Done: sentence present, pinned tests green.
- T2 (R2) QA closing per-layer lines. Fail first: no "layer 1 =" in SKILL.md. Done: one line per layer, `qa-evidence-gates.md` wording fixed.
- T3 (R3) Trigger lines rewritten. Fail first: `grep "when a round starts"` hits. Done: none hit.
- T4 (R4) Step 3b recipe + branch. Fail first: no `not checked — ` branch for tickets. Done: present.
- T5 (R5) Step 2 Output/ids/precedence; Step 3 row. Done: grep each.
- T6 (R6) Consent lines, `#0059` gone.
- T7 (R7) Dependencies stop/degrade + checklist line.
- T8 (R8) Because column + red flags.
- T9 (R9) Shared refs wording; bytes not up.
- T10 (R10) Command + description.
- T11 (R11) Run `bash scripts/run-test-suites.sh`, `node tools/sdd-gate/check.js --base <spec-branch>`, helix `ci-token-budget.sh`.
