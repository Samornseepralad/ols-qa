# Spec — r11 T9 rubric-driven uplift, lane B

## Sources
- S1 Pre-flight locked-bundle scorings of the current text (helix `d1616ba`): `ols-qa-evidence` `.worktrees/r11-preflight/evals/helix-preflight-2026-11-11/{catch-ai-workflow,helix,tc-api-prep-workflow,tc-review-workflow}/score-1.json` and `score-1.interrupted-1.json` (files with dims only).
- S2 Best-earlier locked-bundle re-score: `ols-qa-evidence` main `evals/helix-skill-best-rescore-2026-11-11-bundle/<skill>/score-{1,2,3}.json`.
- S3 Rubric: darwin-skill `SKILL.md` lines 30–107 as cited by `evals/helix-skill-eval-2026-11-10-after9/BRIEF.md` — d5: soft wording ("consider", "if appropriate", "as needed", "may", "suggest", "depending on" …) ≥ 3 instances → −3; d7: −1 per redundant or contradictory passage; d2: ordered steps with explicit input/output; d3: explicit "if X fails → Y".
- S4 Frozen exam `evals/helix-skill-eval-2026-11-10-after9/exam/<skill>.json`; no rule below removes a behaviour an exam item expects.
- Every quoted line was re-read on `origin/main` (`42088dc8`) before this spec. Line numbers are that commit's.

## Rules

### Shared references — bundle-wide soft wording and contradictions (lifts d5 / d7 for every skill whose bundle carries the file; cannot be fixed in a skill file)
- **R1** — `references/jira-comment-post-review.md:83` "consider ADF for large tables" (S1 helix, catch-ai, tc-api d5; S2 all four). The fix cell must state the action: re-post the full table as an ADF (v3) comment when the wiki body truncated it.
- **R2** — `references/jira-comment-post-review.md:18` "Re-review (max 3 rounds)" contradicts `references/skill-rules-style.md:20` "**Maximum 2 rounds**", `agent-rationalizations.md:56` and `tc-quality-standards.md:37` (S1 helix d5 −1 and P2 finding; tc-api d7 (b)). Must read "max 2 rounds", the shared rule's cap.
- **R3** — `references/skill-rules-style.md:23` "**SHOULD** for any approved draft the user will paste to executives" (S1 helix d5, S2 helix/catch-ai d5). Must become a MUST with a checkable trigger: the user says the draft goes to executives or management. `:12` "Avoid soft-only wording (`should consider`, `might want to`)" is counted by scorers (S1 catch-ai, S2 tc-api); it must say the same thing without quoting soft phrases.
- **R4** — `references/session-closing.md:29` "Offer **exactly one** logical next step … when relevant — user may decline" (S1 helix/tc-api d5; S1 helix P3 finding: the table has no row for catch-ai, tc-review, review-result, test-data-prep, tc-change-format). Must read: offer the row for the finished workflow; when no row matches, write `Next: none`; the user can decline.
- **R5** — `references/verify-closing-checklist.md:10` "destination re-read where applicable" (S1 helix d5). Must name the condition: a destination re-read after every side effect.
- **R6** — `references/skill-invocation-discipline.md:37` "if the platform supports it" (S1 helix d5) must give both branches: a todo tool exists → todos per phase; none → list the phases in chat. `:21-29` a second command table with 7 of 13 workflows contradicts helix `SKILL.md:70` "Do not keep a routing table anywhere else" (S1 helix d7 −1, P1 finding); it must be replaced by a link to `skill-routing.md § Primary menu`.
- **R7** — `references/long-workflow-todos.md:11` "## Suggested items (examples)" (S2 catch-ai d5) must read "## Example items".
- **R8** — `references/customer-escape-prevention.md:112` "(typically a mobile and a tablet width beside desktop)" (S2 helix d5) must name the source: the mobile and tablet widths the project guide names.
- **R9** — `references/csv-export-rules.md:98` "you MAY run:" (S1/S2 tc-api soft hit) must read "run:" (the "If and only if" condition already bounds it).
- **R10** — `references/intent-shortcuts.md:3` "**skip the menu** when confidence is high" (S1 helix interrupted d2 −2, d5) must state the test: exactly one row below matches the message → skip the menu; two rows match → ask one question.
- **R11** — `references/agent-rationalizations.md:41` "Refuse Phase D until spec + Swagger per skill" contradicts tc-api `WORKFLOW.md:78` "user says spec is only in Swagger → treat Swagger as both" (S1 tc-api d7 (a)). Must carry the WORKFLOW exception.

### helix (`skills/helix/SKILL.md`, 154 lines, cap 155)
- **R12** — `:125` "Read skill-rules-style.md before asking the user or stopping on a missing input" sends the router to a multi-item Missing template while `:39` allows one item per question (S1 d2 −2, P1 finding). The line must say the router uses that file for refusal wording only and that `:39`'s one-item rule wins over its Missing list.
- **R13** — `:86` covers only menu-text.md and skill-routing.md (S1 d3 P2 finding). The row must also cover helix-session-constraints.md (stop, same as the routing files) and intent-shortcuts.md / proactive-qa-triggers.md (name the file, skip Opening step 1 or 3, show the menu). Same row, no new line.
- **R14** — `:4` the WHAT list omits menu option 12 TC Change Format (`references/menu-text.md:27`) (S1 interrupted d1 −1). The description must name it; ≤ 1024 chars.

### catch-ai-workflow (`skills/catch-ai-workflow/SKILL.md`)
- **R15** — `:97` step 5 packs classification, tally line, unsourced-claim rule and red-flag interplay into one line (S1 d2 −2). It must split into lettered sub-items under step 5 with the same text.
- **R16** — `:96` the read-only gate is scoped to step 4 "during inspection", while step 7 and Hedged rule 3 order reproduction and confirming checks (S1 d4 −2). Step 4's gate must state it covers every later step that runs a check (7, Hedged rule 3).
- **R17** — `:99` step 7 restates the `Suspected` rule that Hedged rule 4 (`:129-133`) owns (S1 d7 −1 of the "restated in five places" deduction). Step 7 keeps the label list and points to Hedged rules 3–4 for the dig-until-Confirmed rule. The MUST/NEVER, Red flags and Rationalizations rows stay (they are the d9 blacklist).
- **R18** — `:244-258` 13 files marked "Read for every audit", ~1,100 lines (S1 d7). bug-priority-matrix, defect-report-completeness, non-pass-challenge-gate and qa-debug-discipline move to a conditional group "*Defect or non-pass verdict in scope*" (each line keeps its own trigger).
- **R19** — `:203` "the gate answers 'may this verdict be sent on now?'" counted as soft "may" (S1 d5). Must read "is this verdict cleared to send now?".

### tc-api-prep-workflow (`skills/tc-api-prep-workflow/SKILL.md`; `WORKFLOW.md` untouched — 370/370 and the G-verify→G3 freeze)
- **R20** — `:4-5` description has no informal/Thai trigger and no "even when the user does not say Swagger" push (S1 d1 −2; S2 d1). Must add both; ≤ 1024 chars.
- **R21** — `:67` "another skill may own it" (S1/S2 soft hit) must read "another skill owns it".
- **R22** — `:40` and `:54` load shared files with FE values an API run must translate (S1 d5 −2): `csv-export-rules.md:87` `{ISSUE_KEY}_FE_TC.csv`, `tc-quality-standards.md:32` "Every row has Test Steps". The two must-read lines must state the API mapping: file names follow `WORKFLOW.md:249-255` (`{SCOPE}_API_TC`), and the Test Steps rule applies only when Test Steps is a chosen column (`references/default-columns.md`).

### tc-review-workflow (`skills/tc-review-workflow/SKILL.md`, 402 lines, cap 403; `commands/tc-review.md`)
- **R23** — `:236-239` "Helix menus and intake questions stay English per user-communication.md" contradicts `references/user-communication.md:18` "follow the user's language" (S1 d5 −2; S2 d7). Must read: Helix menus and intake questions follow the user's language per user-communication.md; the review content follows the destination document's language.
- **R24** — `:230` "Keep each bullet tight" has no measure (S1 d5). Must give one: one finding per bullet, at most two lines plus its Suggest line.
- **R25** — `:208` Step 4 shows only the two lists (S1 d2 −2: "unstated whether the Step 2 matrix is part of the delivered review"). Must state the delivered review is the Step 2 matrix followed by the two lists.
- **R26** — `:359` the MUST row restates the whole Step 5 rule list while saying restating caused drift; `commands/tc-review.md:16-19` restates the list again (S1 d7 −2). The MUST row keeps "run Step 5 exactly as written — single source for the notify rules" without the list; the command keeps one line pointing to SKILL.md.
- **R27** — `:390` the Execution-only paragraph links 7 files only to forbid loading them (S1 d7 −1). The names stay as plain code text, not links.

### Rule-text test
- **R28** — `tools/r11-t9-uplift-b/check.test.js` must fail on the unchanged text and pass after R1–R27, asserting each removed phrase is gone and each new phrase is present, plus the line caps (helix ≤ 155, tc-review ≤ 403, tc-api `WORKFLOW.md` = 370 and unchanged, catch-ai description ≤ 1024).

## Not fixed — recorded
- tc-review `:270` Step 5 run order "1 → 8 → 5 → 7 → 2 → 3" (S1 d2 −2) — real, but the order string is pinned by `tools/r11-skill-fixes-g1/check.test.js` (spec r11-skill-fixes-g1 R11); renumbering the list means editing that test. **Blocked — owner decides.**
- tc-api `WORKFLOW.md:122` "how should I deliver the test cases?" — a user-facing question template, not an instruction (false positive).
- catch-ai hedge restatements in MUST/NEVER (`:235-236`), Red flags (`:180`), Rationalizations (`:172`) — kept: they are the rubric's d9 "don't" list; removing them trades d7 for d9.
- catch-ai d2 "20-layer Result quality gate has no mapping for audits" — needs new text, not a rewrite; out of this round's in-place budget.
- helix d7 three overlapping closing checklists and round-time-contract §6/§7 restating jira-comment-post-review / figma dedupe — a cross-file merge that also touches T9-A bundles; deferred to the main thread.
- tc-api d7 (c) QA-closing restated in SKILL/WORKFLOW/qa-closing-shared/verify-closing-checklist — WORKFLOW is frozen at 370; deferred.

## Done when
- R1–R27 text is on the branch and `node tools/r11-t9-uplift-b/check.test.js` passes; it failed before the edits.
- `bash scripts/run-test-suites.sh` green; `node tools/skill-lint/lint.js` 0 errors; `bash scripts/check-no-secrets.sh <changed files>` clean; `node tools/sdd-gate/check.js --base origin/main` OK.
- Line caps hold; no exam behaviour removed; no file of create-bug, tc-fe-prep, retest-bug or testing-ticket changed.
