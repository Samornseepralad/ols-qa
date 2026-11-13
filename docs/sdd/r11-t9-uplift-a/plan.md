# Plan — r11 T9 rubric uplift, lane A

## Files touched (code PR)
Shared references:
- `references/jira-comment-post-review.md` (R1–R4)
- `references/skill-rules-style.md` (R4, R7)
- `references/agent-rationalizations.md` (R4)
- `references/jira-linebreak-conversion.md` (R5)
- `references/session-closing.md` (R6)
- `references/verify-closing-checklist.md` (R8)
- `references/workspace-guide-discovery.md` (R9)
- `references/non-pass-challenge-gate.md` (R10)
- `references/bug-priority-matrix.md` (R11)
- `references/dependencies.md` (R12)
- `references/playwright-preflight.md`, `references/round-time-contract.md` (R13)
- `references/parallel-test-lanes.md` (R14, R24)
- `references/parallel-prep.md` (R15)
- `references/test-execution-plan-template.md` (R16)

Skill files:
- `skills/create-bug-workflow/SKILL.md` (R17)
- `skills/procedures/create-bug-workflow/WORKFLOW.md` (R18–R20)
- `skills/tc-fe-prep-workflow/SKILL.md` (R21)
- `skills/procedures/tc-fe-prep-workflow/references/ac-ec-coverage-review.md`, `jira-formatting.md`, `tc-final-review-report.md` (R22), `qase-import-format.md` (R23)
- `skills/procedures/testing-ticket-workflow/execute-and-summarize.md`, `skills/procedures/testing-ticket-workflow/WORKFLOW.md` (R24), `skills/procedures/testing-ticket-workflow/references/playwright-discipline.md` (R25)

Amendment 1 (R27–R29) also touches: `references/qa-evidence-gates.md`, `references/defect-report-completeness.md`, `references/no-wait-decision-gate.md`, `references/jira-fast-publish.md`, `references/result-quality-gate.md`, `references/figma-design-comparison.md`, `references/output-templates/defect-candidates.md`, `references/customer-escape-prevention.md`, `references/csv-export-rules.md`, `references/handoff-file-template.md`, `references/portable-content.md`, `references/proactive-qa-triggers.md`, `references/root-cause-investigation.md`, `references/settle-and-strategize.md`, `references/skill-routing.md`, `references/tc-glossary.md`, `references/test-md-format.md`, `references/test-through-real-steps.md`, `references/user-communication.md`; retest-bug `SKILL.md`, `WORKFLOW.md`, `closeout-and-notify.md`, `execute-and-evidence.md`, `references/{debug-discipline,gotchas,worked-example}.md`; create-bug `references/worked-example.md`; tc-fe-prep `WORKFLOW.md`, `design-and-review.md`, `references/{project-config-template,tc-final-review-report}.md`, `scripts/README.md`; testing-ticket `results-update.md`, `references/{result-update-discipline,session-intake,workspace-guide-template}.md`. Links from shared references into retest internals are plain-text cites, not markdown links (`tools/skill-lint` must-read depth).

Test:
- `tools/r11-t9-uplift-a/check.test.js` (R26) — plain `node:test` + `fs`, no dependency; picked up by `scripts/list-test-suites.sh` like the other `tools/*/check.test.js` suites.

## Approach
- Each edit replaces the cited sentence in place; no section moves, no heading rename (anchors used by other files stay valid — `tools/link-check` runs in the suite).
- Contradictions resolve toward the WORKFLOW text or the stricter shared gate already on main, never toward the looser one: edit in place over delete-and-repost (`jira-wiki-vs-markdown.md:69`), SESSION-DEAD + login by command over "log in fresh" (testing-ticket `WORKFLOW.md:267-270`), BLOCKED over PASSED-with-caveat (`customer-escape-prevention.md:92-95`), notify per results-update G8.
- Exam-pinned numbers stay: create-bug "Maximum 2 fix-verify rounds", jira-comment-post-review "max 3 rounds" — R4 only names which loop each cap belongs to.
- Retest keeps "one question at a time" (its `WORKFLOW.md:175`); R9 makes the shared file defer to each workflow's rule instead of overriding it.

## Alternatives weighed
- Lower the cap to one number everywhere (2 or 3) — rejected: each number is exam-pinned for a different loop (S4).
- Delete the soft sentences instead of rewording — rejected: each carries a real rule (e.g. one TC covering several AC/EC) that the exam or the coverage review uses.
- Add `project-config-template.md` to create-bug and testing-ticket — rejected: a new file for a pointer fix; naming the existing template per workflow is smaller.

## What can break
- Rule-text tests that pin an edited sentence (none found by grep of `tools/` for the edited phrases; the full suite runs before the PR, baseline 87/87 green on `42088dc8`).
- `tools/login-window-rule` pins the login-by-command text; R13 only adds a pointer to it in two shared refs and leaves the WORKFLOW block untouched.
- Line caps (`tools/skill-lint/lint.js`): edits add at most a few lines per file; create-bug `WORKFLOW.md` grows by ~3 lines and is re-checked against the 500 cap.
- Lane B (catch-ai, helix, tc-api-prep, tc-review) bundles share some of these references; a concurrent edit to the same line would conflict at merge — the main thread merges one lane, then rebases the other.

Libraries: none new. New spend: NO. Touches another repo: NO.
