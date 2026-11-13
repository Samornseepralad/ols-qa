# Plan — after17-tc-fe

## Files

Skill-own: `skills/tc-fe-prep-workflow/SKILL.md` (R1–R6); `skills/procedures/tc-fe-prep-workflow/{WORKFLOW,requirement-gates,design-and-review}.md` (R2, R7–R16); `references/{qase-import-format,html-draft-template,html-pre-draft-review-template,markdown-template,prerequisites,jira-formatting,tc-final-review-report,worked-example,must-never}.md` under the procedure folder (R17–R26).

Shared (`references/`, R27–R35) and their other readers (any skill whose SKILL.md links them): `tc-glossary.md`, `publish-options.md`, `csv-export-rules.md`, `jira-fast-publish.md`, `qa-closing-shared.md`, `bug-priority-matrix.md`, `qa-evidence-gates.md`, `test-md-format.md`; plus link targets in `skills/procedures/review-result-workflow/WORKFLOW.md` and `references/result-quality-gate.md` (R34). Each shared edit is generic-correct for every reader or removes a tc-fe-only stale line; no other skill's behaviour changes.

## Approach

Edit only non-rule lines; where a rule line would change, add a new line beside it instead, or list it under owner decisions. R26 moves rows byte-identical. Offsets for added text: the 11 removed stub links (R1), stub headings (R34), the duplicate typed-CSV spec (R35).

Rejected: rewording MUST/NEVER lines (owner); deleting the execution references (other skills use them); folding the escalation rows in the shared post-review file (tc-api relies on them) — R15 states precedence in tc-fe instead.

## Libraries

None. No new cost.

## What could break

Pinned text in `tools/{r11-t9-uplift-a,r11-t9-uplift-b,r12-p1-three,r9-tc-fe-prep-2a-findings,r7-tc-fe-prep-order,r11-skill-fixes-g1,r8-tc-fe-prep-2a3,tc-fe-prep-frontmatter,link-check}`; anchors renamed by R10 (fix every link); link checker for R34. Run every suite and helix token/rule checks.
