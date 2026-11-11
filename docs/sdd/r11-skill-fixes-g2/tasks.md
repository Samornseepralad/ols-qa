# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | catch-ai: aggregate-claim row, Node.js condition, description ≤ 1024 | R1 R2 R3 | `grep -n "aggregate claim" skills/catch-ai-workflow/SKILL.md` finds nothing; the parsed description is 1025 characters | the row and the bullet are present; the description parses to ≤ 1024 |
| T2 | testing-ticket: mid-run SESSION-DEAD never waits | R4 | `grep -n "follows Phase D \*Fresh login\* instead" …/execute-and-summarize.md` finds the old sentence | the old sentence is gone; the new one names BLOCKED "session not restored", the other lanes, and the end decisions popup |
| T3 | helix: QA closing allows "not routed" | R7 | `grep -n "not routed" skills/helix/SKILL.md` finds nothing | the item is appended; `node tools/r7-helix-one-question/check.test.js` passes |
| T4 | tc-api-prep: Test.md offer, unsupported link STOP, separator, chunk STOP | R8 R9 R10 R11 | `grep -n "Test.md" …/tc-api-prep-workflow/WORKFLOW.md` finds nothing; `\| --- \| --- \|$` matches line 226 | all four are present; `node tools/tc-api-prep-export-branch/check.test.js` passes; file ≤ 370 lines |
| T5a | helix: replace the r7 byte freeze with one-question assertions; add the unreadable-routing row | R13 R6 | after the R6 row is added, the old test "routing section and menu text unchanged vs origin/main" fails | the new test passes; it fails when "ask one question" is removed from Routing or a second question line is added to the menu block; SKILL.md splits to 155 lines |
| T5b | helix "ols-qa only" labels | R5 | relabelling `skill-routing.md` rows 9 and 11 fails `tools/skill-structure/check.test.js:15` | **Blocked on Q3** |
| T6 | tc-api-prep: freeze ends at `### G3`; two MUST NOT rows | R14 R12 | after the rows are added, the old R5 slice to end of file fails | `node tools/tc-api-prep-export-branch/check.test.js` passes; file is 370 lines |
| T7 | Gates | all | — | `node tools/skill-lint/lint.js` clean; `bash scripts/run-test-suites.sh` green; `bash scripts/check-no-secrets.sh` clean on changed files; `node tools/sdd-gate/check.js --base <base>` passes |
