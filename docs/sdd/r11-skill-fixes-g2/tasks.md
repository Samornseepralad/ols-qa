# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | catch-ai: aggregate-claim row, Node.js condition, description ≤ 1024 | R1 R2 R3 | `grep -n "aggregate claim" skills/catch-ai-workflow/SKILL.md` finds nothing; the parsed description is 1025 characters | the row and the bullet are present; the description parses to ≤ 1024 |
| T2 | testing-ticket: mid-run SESSION-DEAD never waits | R4 | `grep -n "follows Phase D \*Fresh login\* instead" …/execute-and-summarize.md` finds the old sentence | the old sentence is gone; the new one names BLOCKED "session not restored", the other lanes, and the end decisions popup |
| T3 | helix: QA closing allows "not routed" | R7 | `grep -n "not routed" skills/helix/SKILL.md` finds nothing | the item is appended; `node tools/r7-helix-one-question/check.test.js` passes |
| T4 | tc-api-prep: Test.md offer, unsupported link STOP, separator, chunk STOP | R8 R9 R10 R11 | `grep -n "Test.md" …/tc-api-prep-workflow/WORKFLOW.md` finds nothing; `\| --- \| --- \|$` matches line 226 | all four are present; `node tools/tc-api-prep-export-branch/check.test.js` passes; file ≤ 370 lines |
| T5 | helix "ols-qa only" rows and unreadable-routing row | R5 R6 | — | **Blocked on Q1**: run only after the owner decides the r7 freeze test |
| T6 | tc-api-prep MUST NOT rows | R12 | — | **Blocked on Q2**: run only after the owner decides the r6 freeze test |
| T7 | Gates | all | — | `node tools/skill-lint/lint.js` clean; `bash scripts/run-test-suites.sh` green; `bash scripts/check-no-secrets.sh` clean on changed files; `node tools/sdd-gate/check.js --base <base>` passes |
