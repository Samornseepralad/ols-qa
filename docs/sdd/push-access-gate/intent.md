# Intent — push-access-gate

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

From fork PR Thitic9203/ols-qa#87 (author Samornseepralad): "Adds `scripts/check-push-access.sh` and a
CLAUDE.md §4 rule to run it before the push test run and before `git push`."

## Why

PR #87 body: "A push here was prepared, fully tested, then refused with 403 for a pull-only account."
The account that pushes over HTTPS is the one `gh` is signed in as, not `git config user.name`, so the
check reads that account's permission on the remote before any test time is spent.

## Constraints

Free (uses the already-installed `gh` CLI and the GitHub REST API read endpoints; no new spend).
A result that could not be measured is never treated as OK. No other repo is touched.

## Reviewed by owner on 2026-11-12

2026-11-12 — owner approved re-landing #87 with a spec: "เขียน spec แล้วเปิด PR ใหม่" (relayed by the main thread).
Owner review of this file's exact text happens on the docs PR.
