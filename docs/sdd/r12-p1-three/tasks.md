# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Rule-text test `tools/r12-p1-three/check.test.js` | R11 | `node tools/r12-p1-three/check.test.js` fails on unchanged `origin/main` | test committed; failing rows listed in the PR |
| T2 | create-bug template blocks + contract §1 pointer | R1–R4 | T1 rows R1–R4 fail | rows pass; `tools/create-bug-draft-rules` green |
| T3 | tc-fe-prep Step 6 failure branches | R5–R6 | T1 rows R5–R6 fail | rows pass |
| T4 | tc-review Step 5 renumber + pointers + existing test anchors | R7–R10 | T1 rows R7–R10 fail | rows pass; `r11-skill-fixes-g1`, `r7-tc-review-limit`, `tc-review-one-question` green; ≤ 403 lines |
| T5 | Gates | all | — | `bash scripts/run-test-suites.sh`, `node tools/skill-lint/lint.js`, `node tools/sdd-gate/check.js --base origin/main`, `git ls-files -z \| xargs -0 bash scripts/check-no-secrets.sh`, `node tools/postmortem-guard/check.js` all exit 0 |
