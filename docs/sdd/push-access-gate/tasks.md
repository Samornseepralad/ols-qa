# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | Known-answer test `tools/push-gate/push_access.test.js` | R10 | fails on `main` (script absent) | 7 cases committed |
| T2 | `scripts/check-push-access.sh` | R1–R7 | T1 cases fail | `node tools/push-gate/push_access.test.js` → `all passed` |
| T3 | Correct identity wording in header comment + CLAUDE.md rule line | R8, R9 | `grep -n "gh auth git-credential" scripts/check-push-access.sh` shows the unqualified claim | wording names HTTPS vs SSH; T1 still green |
| T4 | Gates | all | — | `bash scripts/run-test-suites.sh`, `node tools/sdd-gate/check.js --base origin/main`, `git ls-files -z \| xargs -0 bash scripts/check-no-secrets.sh` exit 0 |
