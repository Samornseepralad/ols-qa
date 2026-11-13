# Spec — after-17 tc-api-prep-workflow sweep

Finding ids: `V15-0/s2-0/s3-0` = after-15 verify; `S<round>-<n>` = scorer finding, cited by path:line in `findings.txt` (lane scratch). Paths are ols-qa origin/main e5c8b164.

## Rules

- **R1 One fix target for a failed posted comment (S15-s1-p69).** When G-verify fails for a posted Jira comment, the system must correct it with a PUT to the same comment id and must not post a second comment. Amendment: the G-verify section is pinned byte-identical by tools/tc-api-prep-export-branch R5, so the PUT rule is a G2 bullet that defines "re-post".
- **R2 Pre-post render + media check runs before the G2 preview (S15-s1-p33, S15-s3-p33, S15-s2-jcpr26).** When G2 step 2 shows the comment preview, the system must first run jira-comment-post-review.md § Pre-post render + media check on the ADF body; jira-comment-post-review.md must say that for tc-api-prep / tc-fe-prep the "approval popup" is the G2 preview.
- **R3 The no-guide intake rule covers TC API prep (S14-p52, S14-s3-p52, S15-s1/s2/s3-p52).** When no workspace guide is found, workspace-guide-discovery.md must give tc-api-prep a rule: its Phase A–C fields in one grouped message, no template.
- **R4 SKILL.md has no unscoped 20-link dump (S11-s1-p44 … S15-p44).** SKILL.md:44 is regrouped into bullets by phase with the trigger beside each link. Amendment: the links stay (tools/skill-lint must-read-depth and tools/r11-t9-uplift-b R22 pin them), so nothing is dropped; the lead wording keeps "Also read each only when its trigger … fires".
- **R5 Dependencies point at real need (V15-0).** The Atlassian MCP row in SKILL.md must say Confluence destination only (a Jira issue publishes through the browser tab, G2 step 3).
- **R6 Worked example agrees with itself and the rules (S14-p4, S14-s3-p17, S13-p26, S13-p27, S15-s1-p4).** worked-example.md Outcome is CSV only; the 404 sits after the 400 rows; the snippet shows the 8 default columns with `HTTP 201`, a Priority rule line; steps list Phase C, the coverage block and G-verify.
- **R7 No artifact this workflow never makes (S14-s3-p42, S15-s1-p42).** tc-api-chunked-scope.md:42 "master sheet" becomes "the final delivery (comment or file)".
- **R8 No maintainer-private rule numbers in shipped text (S15-s1-p3).** proactive-qa-triggers.md states the reason inline instead of `CLAUDE.md Rule #5` / `Rule #3` (rule lines keep their MUST / NEVER).
- **R9 Test.md and attachment names carry the API form (S15-s2-p77, S11-p29).** test-md-format.md:77 names the file per calling workflow; intake-one-pager.md:14 lists Jira/Confluence comment and CSV/Excel/Test.md.
- **R10 Pattern D serves every comment-only publish (S14-s3-p30, S15-s1/s2/s3-p30).** jira-fast-publish.md decision rule has a row "TC table, no file → Pattern A (ADF only) → D → C" and Pattern D's heading says comment-only, no files.
- **R11 Phase G makes the checks observable (S14-p10, S14-p20, S14-s3-p51).** Fresh-eyes names a one-line output; `{SCOPE}` has a slug rule stated in the Phase C line; G3 names handoff-file-template.md for the > 15 row trigger.
- **R12 Every stop is marked (S14-p126).** WORKFLOW.md:126 failed dependency check reads 🔴 **STOP** with the report and fallback.
- **R13 Index and SKILL agree (S15-s2-p3).** SKILL.md labels the index "open on demand only".
- **R14 One home for repeated rules (S14-p187, S14-s3-p45, S14-s2-p14).** delivery-options.md § Verification links to G-verify instead of repeating its checklist; its `<br>` line links to G2 step 1; no MUST / NEVER / 🔴 / STOP / GATE line is cut without its identical twin elsewhere (`scripts/check-rule-lines.sh`).
- **R15 API mapping at the shared gate (S11-p28, S14-p32).** tc-quality-standards.md Review gate says the API default set uses Test Data as the step.
- **R16 Phase D split (S15-s1-p17).** The undocumented-status / public-operation bullet is split into sub-bullets with the same conditions and STOP.
- **R17 Net tokens (budget).** Tc-api session bytes after ≤ before; helix `token-budget: pass`, `rule-lines: pass`.

## Not fixable here (reported with evidence)

- qa-evidence-gates.md:89-145 moved-section stubs: anchors are linked by result-quality-gate.md:142, tc-change-format SKILL.md:211, review-result WORKFLOW.md:317; collapsing breaks them.
- `metadata.proactive_triggers`: cross-skill change, owner decision 13/Nov.

## Done when

- R1-R16: each named line says the text above (grep per task); no gate line removed (`check-rule-lines`).
- R17: bytes and helix lines pasted in the PR; `bash scripts/run-test-suites.sh` green; `node tools/sdd-gate/check.js --base docs/a17-tc-api` ok.
