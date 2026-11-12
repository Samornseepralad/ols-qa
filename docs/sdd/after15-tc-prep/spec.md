# Spec — after-15 tc-prep root-cause fixes (tc-api-prep + tc-fe-prep)

**Source:** ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/verify/tc-api-prep-workflow.json` (CONFIRMED `#1`, `#s3-0`) and `verify/tc-fe-prep-workflow.json` (CONFIRMED `#0`, `#1`, `#s3-0`).

## Rules

- **R1** — When a skill's `## Dependencies` section names a later check point (tc-api-prep: Phase C), the agent must run the checks there; `references/dependencies.md` and `references/skill-reference-index.md` must not say "before step 1" without that exception. Source: tc-api `#1` — `references/dependencies.md:3-4`, `references/skill-reference-index.md:34` vs `skills/tc-api-prep-workflow/SKILL.md:56`, `skills/procedures/tc-api-prep-workflow/WORKFLOW.md:126`.
- **R2** — When `openpyxl` is missing, the agent must never install it itself: it shows the install command for the user to run and asks before falling back to CSV. `references/dependencies.md` must not offer self-install for this row. Source: tc-api `#s3-0` — `references/dependencies.md:17` vs `references/csv-export-rules.md:119`, tc-fe `WORKFLOW.md:178`.
- **R3** — The CSV and xlsx recipes in `references/csv-export-rules.md` must write the file name the calling workflow names (tc-fe Step 6: `Draft_Jira_{ISSUE_KEY}` and `Import_Qase_{ISSUE_KEY}`; tc-api G1: `{SCOPE}_API_TC`) and must not hard-code `{ISSUE_KEY}_FE_TC.csv` / `.xlsx`. tc-api `SKILL.md` points at that placeholder. Source: tc-fe `#0` — `references/csv-export-rules.md:86/:163` vs `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md:169`; `skills/tc-api-prep-workflow/SKILL.md:37`.
- **R4** — The Unit Test typed CSV must be written UTF-8 with BOM (`utf-8-sig`), because its cells hold Thai TC text even though its headers are English. Source: tc-fe `#1` — `references/csv-export-rules.md:186` vs `:62`, tc-fe `WORKFLOW.md:148/:215`.
- **R5** — The tc-fe project config template must not offer MCP as a publish method, must not make the Qase CSV attach optional, and must ask for: export format (`csv`/`xlsx`), Qase project code, TC glossary sheet URL/tab/`gid`/local CSV path, and the tracking-sheet "Create the per-ticket TC tab" row (or none). It asks one question at a time, as WORKFLOW Step 1 says. Source: tc-fe `#s3-0` — `project-config-template.md:44-45` vs `WORKFLOW.md:103/:106/:162/:264/:340`, `must-never.md:25`, `requirement-gates.md:165`.
- **R6** — Net bytes of the edited files must not grow. Source: owner rule "keep net tokens per invocation same or lower".

## Edge cases

- A skill whose Dependencies section names no later point: checks stay before step 1 (R1).
- xlsx requested and `openpyxl` installed by the user mid-run: re-run the import check, then write xlsx (tc-fe Step 6 GATE, unchanged).
- Project without a tracking sheet: the template answer "none" makes Step 6.5 skip, as WORKFLOW already says (R5).

## Done when

- `grep -n "pip install --user openpyxl" references/dependencies.md` shows the command only as a user-run suggestion.
- `grep -n "_FE_TC\.\(csv\|xlsx\)" references/csv-export-rules.md` is empty.
- Unit Test row and section in csv-export-rules say UTF-8 BOM.
- project-config-template has no "MCP" publish option and no optional Qase attach; it asks the four missing items.
- Bytes after ≤ bytes before; ols-qa test suites, skill lint and sdd-gate pass.
