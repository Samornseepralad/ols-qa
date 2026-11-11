# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Rule-text test for R1–R25 | R26 | `node --test tools/r11-t9-uplift-a/check.test.js` fails on the unchanged text | test committed; fails before T2–T5 |
| T2 | Shared references: soft wording → conditions; contradictions resolved toward WORKFLOW / stricter gate | R1–R16 | T1 rows R1–R16 fail | T1 rows pass; link-check and login-window-rule suites green |
| T3 | create-bug: stub cross-ticket line, Phase F fetch-fail branch, 🔴 STOP marks, verdict mapping | R17–R20 | T1 rows R17–R20 fail | rows pass; `WORKFLOW.md` ≤ 500 lines |
| T4 | tc-fe-prep: stub cross-ticket line, soft wording in skill refs, qase column count | R21–R23 | T1 rows R21–R23 fail | rows pass |
| T5 | testing-ticket: status list without NOT TESTED, storageState reuse by probe | R24–R25 | T1 rows R24–R25 fail | rows pass |
| T6 | Gates | all | — | `bash scripts/run-test-suites.sh` green; `node tools/skill-lint/lint.js` 0; `bash scripts/check-no-secrets.sh <changed files>` clean; `node tools/sdd-gate/check.js --base origin/main` OK |
