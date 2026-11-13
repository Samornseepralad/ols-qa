# Spec — after17-tc-review

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-1{1..5}-after1{1..5}/baseline/tc-review-workflow*.json` (3 scorings per round; ids below are `a15`, `a15s2`, `a15s3`, `a14`, `a14s2`, `a14s3`, `a13*`, `a12*`, `a11` + `#n`), `verify/tc-review-workflow.json`, after-16 `runs_clean`. Line numbers refer to `skills/tc-review-workflow/SKILL.md` at ols-qa origin/main `e5c8b164` unless a path is given. Owner 13/Nov/2026: fix every P0-P3 finding, darwin deduction and grader complaint; nothing left.

## Rules (R = requirement; each lists the finding ids it closes)

- **R1 One go-ahead, seen text.** The Step 5 thread question must carry the item-5 preview (candidate destination, exact text, character count) in the same message; the answer to it approves that text. Pinned sentences stay. Closes a15#2, a15s2#2, a15s3#6, a14s2#1, a15 darwin checkpoint/clarity.
- **R2 Layers map to the review.** QA closing must say, per applied coverage layer (1, 2, 4, 6, 7 and pre-delivery 1, 4, 6, 7), what it checks in a TC review; it must name that `qa-evidence-gates.md` has no "core" section (use its shared gates) and that the verdict/clip parts do not apply. Closes a15#1, a15s2#3, a15s3#5, a14#4, a14s3#3, a14s2#3, a13s3#6, a12#2, a12s3#1.
- **R3 Triggers are exact.** Every "Read X when ..." line names a condition this workflow can meet. `round-time-contract.md` (no rounds), `qa-debug-discipline.md` (no test runs), `long-workflow-todos.md` (own checklist), `figma-design-comparison.md` (name the applicable sections) are fixed accordingly. Closes a15#3/#5, a15s2#4/#7, a15s3#2/#3/#4, a14#2, a14s2#4, a14s3#2/#7, a13s2#3, a11#3.
- **R4 Source sweep has failure branches.** Step 3b must say how to find surrounding tickets and regression results, write `{source} not checked — {reason}` when one is unreachable, apply layer-14 steps 1-5 only (no data creation, no checker), and state when the design node is opened. Closes a15#4, a15s2#5, a14#3, a14s2#5, a13#2, a13s2#2, a13s3#11, a13#2.
- **R5 Rows without ids, vague Expected Result.** Step 2 anchors a row with no id by sheet row/cell and reports the missing ids once; it has an `Output:` line, a precedence order for Status and example rows in the closed wording; Step 3 gets a signal row for an Expected Result that is only "correct / complete / properly". Closes a15#6, a15s2#9, a15s3#8, a14s2#8, a13#6, a13s2#5, a13s3#4, a12s2#2.
- **R6 Config and file writes need a yes.** Recording a found destination in project config and saving a webhook file are covered by the user's answer to the thread question / hand-over, stated in Step 5. Unexplained `#0059` removed. Closes a15s3#7, a14s2#2/#7, a13s2#6.
- **R7 Dependencies say stop or degrade.** SKILL.md Dependencies marks per row when the check runs and whether failure stops or degrades (clone, webhook, Figma, tools), consistent with `references/dependencies.md:4`; checks appear in the progress checklist. Closes a15#9, a14#1, a14s3#1, a13#3.
- **R8 Reasons on rules, red flags.** The skill MUST/NEVER table gets a Because column; the NEVER/MUST line text is unchanged. A short TC-review red-flag list is added. Closes a15#8, a15s2 darwin counter-examples, a14s2#6, a14s3#5, a13s2#4, a13s3#10/#12, a15 anti-patterns.
- **R9 Shared refs fit a review.** `result-quality-gate.md` Used-by lists tc-review; `session-closing.md` has a TC review next-step row; `qa-closing-shared.md` item count wording is true; host names (`PD3`, `OLS`, `ols-qa repository`) become generic in the shared refs of the bundle; the Verdict mapping (COMPLETE after read-back, PARTIAL when notify declined) is written. Net bytes of each shared file ≤ before. Closes a15#10/#11/#12, a15s2#8, a15s3#9/#1, a14s3#8, a14#6/#7, a14s3#9, a13#4/#8, a12s3#2, a11.
- **R10 Command and wording.** `commands/tc-review.md` description names the notify step and drops the repeated line; SKILL description gains the "enough/complete" trigger; Step 5 moves nothing but the language paragraph in Step 4 is split from the destination question; `Out of scope` pointers resolve. Closes a15#10 (desc), a14s3#9, a13#7, a11#5/#6, a12s2#5, a14#8.
- **R11 Pins and size.** Every text pinned by `tools/*/check.test.js` stays; SKILL.md ≤ 403 lines and < 30,000 bytes; MUST/NEVER/🔴/STOP/GATE lines are kept or only extended (rewords listed in the PR); net session tokens for every skill do not rise (`token-budget: pass`).

## Out of scope (reported, not changed)

- `metadata.proactive_triggers` (owner: one cross-skill change later).
- Moving Step 5 into a new reference (a15s2#6, a12s2#3, a11#4) and making shared files' onward links conditional (a15#7, a14s3#4, a12s2#4, a12s3#4, a14#9): a new file or a shared-file restructure raises the unit's bytes and touches every skill's closure; the guard in `Execution-only files` stays. Evidence in the report.
- Frontmatter validator run (a12#1): run here with the YAML venv.

## Done when

- Each rule's grep in `tasks.md` finds the new text; pinned tests and `scripts/run-test-suites.sh` pass; `sdd-gate` ok; helix `token-budget: pass` and `rule-lines: pass`.
