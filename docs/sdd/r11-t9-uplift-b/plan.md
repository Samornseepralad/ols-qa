# Plan — r11 T9 uplift, lane B

| Rule | File | Change |
|---|---|---|
| R1, R2 | — | Covered by lane A (`docs/sdd/r11-t9-uplift-a` R1, R4, R6, R8); not edited here. |
| R3 | `references/skill-rules-style.md` :12 only (:23 is lane A R7) | Reword the meta line without quoted soft phrases. |
| R4 | — | Covered by lane A (`docs/sdd/r11-t9-uplift-a` R1, R4, R6, R8); not edited here. |
| R5 | — | Covered by lane A (`docs/sdd/r11-t9-uplift-a` R1, R4, R6, R8); not edited here. |
| R6 | `references/skill-invocation-discipline.md` :21-29, :37 | Table → one link line; todo-tool / no-todo-tool branches. |
| R7–R9 | `references/long-workflow-todos.md` :11, `references/customer-escape-prevention.md` :112, `references/csv-export-rules.md` :98 | One-phrase rewrites. |
| R10 | `references/intent-shortcuts.md` :3 | One-row-match test. |
| R11 | `references/agent-rationalizations.md` :41 | Add the Swagger-only exception. |
| R12–R14 | `skills/helix/SKILL.md` :4, :86, :125 | In place; line count stays 154. |
| R15–R19 | `skills/catch-ai-workflow/SKILL.md` :96-99, :203, :244-258 | Step 5 sub-items (+~4 lines), gate scope sentence, step 7 pointer, new conditional must-read group, "cleared to send". Description untouched. |
| R20–R22 | `skills/tc-api-prep-workflow/SKILL.md` :4-5, :40, :54, :67 | Description triggers; API mapping on two must-read lines; "owns it". `WORKFLOW.md` not touched. |
| R23–R27 | `skills/tc-review-workflow/SKILL.md` :208, :230, :236-239, :359, :390; `commands/tc-review.md` :16-19 | In-place rewrites; net line change ≤ +1 (cap 403). |
| R29–R32 (tc-api `skills/procedures/tc-api-prep-workflow/WORKFLOW.md` :162, :270, :360) | the 58 bundle files listed in spec R29 (incl. `references/user-communication.md`, `references/intake-one-pager.md`, `references/swagger-diff-phase.md`, `references/test-md-format.md`, `references/qa-evidence-gates.md`, `references/non-pass-challenge-gate.md`, `references/figma-design-comparison.md`, `references/defect-report-completeness.md`, `references/test-through-real-steps.md`, `references/proactive-qa-triggers.md`, `skills/procedures/tc-api-prep-workflow/references/markdown-template.md`); `references/jira-fast-publish.md` Pattern A/B; tc-api `WORKFLOW.md:270` | One-word rewrites; base64 branch in `uploadFile`. |
| R28 | `tools/r11-t9-uplift-b/check.test.js` (new) | Rule-text test, picked up by `scripts/run-test-suites.sh`. |

Data: none. Library: none (Node built-ins only). Cost: none.

Options weighed: (a) leave shared references to the main thread and fix only skill files — rejected, because the d5 "≥ 3 soft phrases → −3" deduction is counted over the whole bundle and every remaining hit lives in a shared file; (b) edit the shared lines here in one separate commit so the main thread can reconcile it with lane T9-A — chosen.

What could break: a freeze/rule-text test pinning an edited sentence (checked by grep before the spec: only the tc-review run order is pinned, so it is not edited); the r7/r11 tests for helix one-question and tc-review; skill-lint must-read depth when catch-ai's group is split (each file stays one hop); helix 155-line cap; T9-A editing the same shared lines (merge conflict — report names every shared line).
