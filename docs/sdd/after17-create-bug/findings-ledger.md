# Findings ledger — after17-create-bug

135 catalogued findings (ids `F1`..`F135` = row order of the lane catalogue `F.txt`: 11 P1, 49 P2, 75 P3) from ols-qa-evidence after-11..after-15 (`verify/` + three scorings per round); after-16 left no create-bug scoring. "Already" = fixed by PRs 230-244 and still true at origin/main `e5c8b164`. Paths below are under `skills/procedures/create-bug-workflow/` (`CB/`) unless shown.

| Pattern | Finding ids | Where fixed (path:line after this PR) | Source |
|---|---|---|---|
| Worked example sends a hedged expected to Phase E | F1 F8 F15 F21 F28 F36 | `CB/references/worked-example.md:10-11, 40-41` (design frame cited, Dropped in B3) | Already |
| Broken or pointer-only links | F2 F25 | `CB/references/posting-discipline.md:11, 30` | Already |
| module label unchecked | F4 F16 F75 F95 | `CB/references/posting-discipline.md:5-6` (bug + severity labels only) | Already |
| Shared re-run gate vs no self-reproduce | F3 F72 F33 F42 F73 | `CB/phase-b3-falsification.md:41`; `references/non-pass-challenge-gate.md` §3, `references/defect-report-completeness.md` §3b | R6 |
| QA closing repeated / pointer-only | F5 F10 F17 F31 F35 | `CB/WORKFLOW.md:23` (one checklist line); closing lives in `CB/phase-f-close.md` | Already |
| Restated rules (no-create, board, verify-URL, Severity/Priority) | F6 F23 F48 F56 F68 F91 F101 F113 F133 | `skills/create-bug-workflow/SKILL.md:51` now a pointer plus one MUST; template block rules point at A3 | R10 |
| Second discovery entry (WORKFLOW frontmatter) | F7 F11 F39 | `CB/WORKFLOW.md:1` has none | Already |
| Phase D no Go back / marks | F9 F29 F30 | `CB/phase-d-create.md:38, 76` | Already |
| Off-scope refs, bulk list, no triggers | F12 F26 F32 F37 F49 F61 F67 F86 F98 F112 F120 F132 | `SKILL.md:34-47` (trigger per link; two test-round files labelled). Links stay: skill-lint reports 6 new violations without them | Out of scope (evidence in spec) |
| A3 rule hard to execute | F13 F22 | `CB/WORKFLOW.md:87-99` (table, order fixed) | R8 |
| quick_validate needs PyYAML | F14 F35 | Not a text fix; run with venv python (see PR) | Report |
| Descriptions drift / not pushy | F18 F62 F82 F90 F103 | `commands/create-bug.md:3-4`, `SKILL.md:4-5` | R9 |
| Phase letters / file name phase-e = B3 | F19 F24 F38 F46 F54 F65 F77 F88 F99 F108 F119 F131 | renamed to `CB/phase-b3-falsification.md`; links and tests updated; B3 headings 🔴 GATE | R3 (owner-approved rename) |
| Resize without tool | F20 | `CB/phase-d-create.md:63-64` | R4 |
| MCP vs REST choice, no-MCP create, non-field failures | F22 F51 F105 | `CB/phase-d-create.md:36-37, 43-51` | Already |
| Imprecise Markdown examples read as links | F27 | `references/jira-wiki-vs-markdown.md:27-29` | R7 |
| Pre-flight checks without command or failure | F34 F45 F127 F115 F96 | `CB/WORKFLOW.md:115-116, 133`; `CB/phase-d-create.md:25-31, 44` | Already |
| result-quality-gate for test rounds | F41 F52 | `SKILL.md:42`; `CB/phase-b3-falsification.md:45-61` layer map | Already |
| Workspace-guide save vs no side effects | F43 F76 | `references/helix-session-constraints.md:10`, `references/workspace-guide-discovery.md:53` | R5 |
| Root cause / Likely / Confidence vocabulary | F44 F92 F118 F122 | `CB/references/bug-draft-template.md:23, 60`; `CB/phase-b3-falsification.md:25` | R3 (+Already) |
| attach-before-embed row | F47 F58 F64 F84 F97 F116 F126 | `references/agent-rationalizations.md:12` | R5 |
| Cancel / nothing-filed verdict | F50 F66 F94 | `CB/phase-c-confirm.md:33`; `CB/phase-f-close.md:7` | R1 |
| JXA fallback detail | F53 | `CB/references/posting-discipline.md:20` | Already |
| Confirm counts | F55 F78 F89 F102 F107 F109 F117 F129 | `CB/phase-c-confirm.md:13`; `CB/references/worked-example.md:26` | R2 (+Already) |
| Pre-flight / B3 not marked | F57 F70 | `CB/WORKFLOW.md:118, 148` | R3 |
| Thai-only template / owner quote / memory pointer | F59 F93 F114 | PR #251 `non-pass-challenge-gate.md`; `references/bug-priority-matrix.md:4` | R7 |
| Scope lines omit create-bug | F60 F69 F104 F74 F85 F134 | `references/defect-report-completeness.md:7`; `references/jira-comment-post-review.md:3` | R6 |
| Phase F read call | F63 F110 F130 | `CB/phase-f-close.md:10`; `CB/references/worked-example.md:29` | Already |
| Dependencies order | F71 F79 F100 | `SKILL.md:59`; `references/dependencies.md:3` | Already |
| Product env names | F80 F123 F135 | `references/qa-debug-discipline.md:83` (VPN-only envs) | Already |
| Moved-section stubs inflate Phase F read | F40 F81 | not changed: stub headings keep old anchors other skills link; file is in PR #250 | Out of scope |
| Waiver lines | F83 F125 | `CB/phase-c-confirm.md:31`; shared lines in R5 | R5 |
| Brace placeholder | F87 | `CB/references/bug-draft-template.md:81` | R8 |
| Examples carry no `--body-file` / GitHub evidence | F106 F111 | `CB/phase-d-create.md:15, 23` | Already |
| Intake omits expected source | F121 F128 | `references/intake-one-pager.md:43` | R8 |
| ols-only rows in portable index | F124 | `references/skill-reference-index.md:147-149` | R7 |


Darwin deductions (dim1-dim9, 9 or 8 each): every cited cause maps to a row above (frontmatter drift, phase letters, restated rules, bundle size, markers, soft commands). dim7 (42-file bundle) is structural: reported, not editable inside this skill.
