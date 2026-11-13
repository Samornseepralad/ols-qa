# Plan — after17-catch-ai

## Files touched

- `skills/catch-ai-workflow/SKILL.md` (R1-R6): description NOT-for in words; checklist order; Procedure label; step 4 split; gate section (N/A first, exit-2 branch, audit result lines, read-only precedence); must-read groups; dependency rows; long lines to bullets.
- `skills/catch-ai-workflow/reference.md` (R7): § Verdict coverage-gap rule, `§ PWMI` pointer.
- `commands/catch-ai.md` (R1, R4): description triggers + NOT-for, start order, count rule as a link.
- Shared, read by other skills (behaviour unchanged, listed in the PR): `references/skill-routing.md` (one row), `references/bug-priority-matrix.md` (one Used-by line; PR 250 touches the same list), `references/qa-evidence-capture.md` (role ids line), `references/qa-evidence-coverage.md` (layer 1 cell), `references/dependencies.md` (debug row), `references/root-cause-investigation.md` (one rule bullet), `references/customer-escape-prevention.md` (one duplicate row merged).
- `tools/catch-ai-a17/check.test.js` (new): rule-text pins for R1-R9.

## Weighed

- Heading relabel changes one anchor (`#procedure-high-freedom`): only the SKILL.md contents list links it (grep over the repo), so both change together.
- Duplicate row in customer-escape-prevention: removing it needs a rule-line register entry (the line is MUST), so it is a listed reword, not a silent cut.
- Gate precedence (R5) states which rule wins for an audit; it does not drop a layer: a case whose evidence the audited run never recorded stays BLOCKED for sending.

## Could break

- Pinned tests `tools/catch-ai-unsourced-wording`, `tools/r11-t9-uplift-b`: run in the suite.
- Token budget: added text is offset by cutting restated text (command count rule, long-line connectives); measured with helix `ci-token-budget.sh`.
- Merge order with PR 250: bug-priority-matrix, qa-closing-shared, qa-evidence-gates are its files; only the bug-priority-matrix Used-by line overlaps.
