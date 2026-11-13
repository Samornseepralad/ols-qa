# Plan — after17-retest

Spec: [spec.md](spec.md) R1–R11.

## Files touched

| File | Rules | Change |
|---|---|---|
| `skills/procedures/retest-bug-workflow/comment-and-post.md` | R1, R4, R5, R9 | 6a PWMI; Design ref separator; renderer-missing fallback; 7d checklist mapping; owner quotes in English; 6c item 0 whole-body checks |
| `skills/procedures/retest-bug-workflow/closeout-and-notify.md` | R1, R2, R6 | 8c every verdict; correction steps channel-neutral; resend bounded; 8·0 word list points to the single source |
| `skills/procedures/retest-bug-workflow/WORKFLOW.md` | R2, R6, R7 | notify dry-run row channel-neutral; word-list pointer; 2c fixture rule; cheat-sheet + Figma steps → links; QA-closing design item timing |
| `skills/procedures/retest-bug-workflow/execute-and-evidence.md` | R3, R8 | login blocks → pointer to parallel-test-lanes §3; lane browser context; exact limits |
| `skills/procedures/retest-bug-workflow/references/{project-config-template,gotchas,handoff-template,worked-example,comment-template-v2}.md` | R1, R3, R4 | four transitions; pointer; gotchas; PWMI; API example; file names; marker |
| `skills/retest-bug-workflow/SKILL.md`, `commands/retest-bug.md` | R8 | step 2 order; preflight mapping; deps; description; trigger |
| Shared `references/`: `parallel-test-lanes`, `qa-evidence-capture`, `qa-evidence-coverage`, `proactive-qa-triggers`, `result-quality-gate`, `non-pass-challenge-gate`, `round-time-contract`, `defect-report-completeness`, `root-cause-investigation`, `customer-escape-prevention`, `figma-design-comparison`, `intake-one-pager`, `skill-routing`, `handoff-file-template`, `retest-fix-intake` | R3, R5, R6 | additive clarifiers or neutral wording; no rule removed |

| `references/handoff-file-template.md`, `references/skill-reference-index.md`, delete `skills/procedures/retest-bug-workflow/references/handoff-template.md` | R12 | one handoff template; links fixed |
| `skills/procedures/retest-bug-workflow/WORKFLOW.md` | R13 | verdict-rule bullet split, 🔴 on each line |

No code, no test logic, no library. Data shapes unchanged.

## Readers of shared files (regression check)
Each shared edit either adds a retest-scoped sentence or replaces a product/host-specific word with the project-guide
source. testing-ticket, smoke, tc-fe/tc-api, create-bug and review-result read some of these files; their steps,
gates and outputs are unchanged (the reference project's guide carries the same role list; the login blocks keep their
text with `<log-dir>`; the Thai flag still renders in Thai for a Thai user).

## Options weighed
- Login blocks: keep in execute-and-evidence (retest only) vs keep in parallel-test-lanes (all lane skills). Chosen:
  parallel-test-lanes — the shared copy is what other skills read; retest already reads it at Step 4.
- MUST/NEVER table: cut rows (dim7) vs keep. Kept (R10) — cutting rule lines needs owner approval.

## What could break
- `worked_example.test.js` counts exactly two fenced blocks → the API cURL goes in an indented code block.
- check-rule-lines: every edited MUST/NEVER/🔴/STOP/GATE line is a reword → listed in the PR for the register.
- Anchor change of 6a heading → TOC link updated in the same file; grep for other links.
