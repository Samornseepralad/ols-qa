# Plan — push-access gate

## Files touched
- `scripts/check-push-access.sh` (new; R1–R8) — bash, `set -uo pipefail`, calls only `git` and `gh`.
- `tools/push-gate/push_access.test.js` (new; R10) — plain `assert`, stub `gh` in a temp dir; picked up by
  `scripts/list-test-suites.sh`.
- `CLAUDE.md` (one line in §4; R8, R9).

## Data / library
None. Uses `gh api user` and `gh api repos/<slug>` (read-only, free). No dependency added.

## Options weighed (R8, SSH remotes)
- (a) Report `UNCHECKABLE` for SSH remotes — rejected: changes #87's tested behaviour, and with R9 every
  SSH user would be stopped on every push.
- (b) Keep behaviour, correct the comment and the CLAUDE.md wording so the verdict is read as "the gh
  account's access" — chosen; it describes exactly what is measured.

## What could break
- A runner whose real `gh` answers instead of the stub — the test builds a PATH of stub + `git` only (fix
  `6b3e9b1` on #87).
- Remotes on GitHub Enterprise hosts are reported `UNCHECKABLE` (by design, R3).
