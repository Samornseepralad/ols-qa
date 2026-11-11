# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Rule-text test for R1–R12 | R13 | `node tools/r11-skill-fixes-g1/check.test.js` fails on the unchanged skill text | test committed; fails before T2–T5 |
| T2 | create-bug: hedge → question, Likely carries the reporter question, pasted search with comment-scope note | R1–R4 | T1 rows R1–R4 fail; `tools/r7-create-bug-pasted` still asserts "summary and comments" as an acceptance condition | T1 rows pass; r7 test updated to R4 and green |
| T3 | tc-fe-prep: ticket-Thai term, limit example, Step 5 🔴 gate, soft wording, Step 6.5 split | R5–R8 | T1 rows R5–R8 fail; after the edit `tools/tc-fe-prep-frontmatter` R3 fails against `origin/main` | T1 rows pass; frontmatter R3 pinned to `e1899775` and green; residual soft words in tc-fe-prep files reported |
| T4 | tc-review: not named anywhere, untagged → inferred, run order | R9–R11 | T1 rows R9–R11 fail | rows pass; SKILL.md ≤ 403 lines, < 30,000 bytes |
| T5 | retest: one-sentence unresolved-supersession rule | R12 | T1 row R12 fails | row passes; `tools/r7-retest-no-c` updated and green |
| T6 | Gates | all | — | `bash scripts/run-test-suites.sh` green; skill-lint 0; secret guard clean; postmortem guard OK; sdd-gate OK |
