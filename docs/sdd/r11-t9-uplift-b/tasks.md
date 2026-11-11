# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Rule-text test for R1–R27 + caps | R28 | `node tools/r11-t9-uplift-b/check.test.js` fails on `origin/main` text | test committed; fails before T2–T6 |
| T2 | Shared references: soft wording, round cap, stale routing table, Swagger exception | R1–R11 | T1 rows R1–R11 fail | rows pass; no other shared line changed |
| T3 | helix router lines | R12–R14 | T1 rows R12–R14 fail; `tools/r7-helix-one-question` green before and after | rows pass; `SKILL.md` ≤ 155 lines |
| T4 | catch-ai step 5 split, gate scope, step 7 pointer, must-read groups, "cleared to send" | R15–R19 | T1 rows R15–R19 fail; `tools/catch-ai-unsourced-wording` green before and after | rows pass; description unchanged (≤ 1024) |
| T5 | tc-api description, API mapping, "owns it" | R20–R22 | T1 rows R20–R22 fail | rows pass; `WORKFLOW.md` byte-identical |
| T6 | tc-review language, bullet measure, delivered matrix, MUST row, command, plain names | R23–R27 | T1 rows R23–R27 fail; `tools/r11-skill-fixes-g1` R11 green before and after | rows pass; `SKILL.md` ≤ 403 lines |
| T7 | Gates | all | — | `bash scripts/run-test-suites.sh` green; skill-lint 0; secret guard clean; sdd-gate OK |
