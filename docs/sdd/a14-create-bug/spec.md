# Spec — a14-create-bug (T9 lane, after-14 evidence)

Evidence (ols-qa-evidence `origin/main`, `evals/helix-skill-eval-2026-11-12-after14/`): `GATE.md` create-bug row; `grade/create-bug-workflow.json`; `baseline/create-bug-workflow{,-s2,-s3}.json`; `verify/create-bug-workflow.json` (both scorer P1s NOT_CONFIRMED, so P1 = 0). Scored commit: helix `6218253`. Token measure: ols-qa-evidence `docs/helix-quality/wayfinder-token-diet/graph_v2.py`.

## Findings the rules rest on

- **Failed expectation (grade, prompt 2 run 3, with-skill).** "Replies in Thai (user language)" FAIL: "Screening in Thai, but confirm questions, falsification record and notes are in English". Cause: `phase-c-confirm.md:9-25` is a `[low freedom]` English block, and `:29` puts every open question inside it; no create-bug file says the block's prose follows the user's language, so the agent copies the English template text. `user-communication.md:18` (approval gates follow the user's language) is not linked from Phase C.
- **dim7 = 7 in all three scorings.** All three cite `SKILL.md:47`: `customer-escape-prevention.md` and `round-time-contract.md` are linked and loaded into the bundle while the same line says they "are test-round files, not applied when filing" (s1 also P2 progressive disclosure, s3 P2).
- **P2, s1 + s2 (dim5).** `posting-discipline.md:6` adds `module:<name>` labels "when supported", but the Phase B label pre-flight (`WORKFLOW.md:127-128`) checks only `bug` and `severity:<Severity>` and the Phase D command (`phase-d-create.md:14`) omits it; an unchecked label makes `gh issue create` fail.
- **P2, s1 (dim5).** `phase-d-create.md:40`: the duplicate search after a failed create gives no query, unlike B2.
- **P2, s2 + s3 (dim6/7).** `SKILL.md:41` makes `jira-comment-post-review.md` (written for TC comments, 3-round cap) a gate for any Jira issue body without saying which checks apply; `phase-f-close.md:15` caps at 2 rounds.
- **P2, s2 (dim5) ×2.** `non-pass-challenge-gate.md` §3 ("fix it on our side, re-run", `:100`) and `defect-report-completeness.md` §3b ("Re-run that surface only", `:99`) apply per candidate (`phase-e-falsification.md:57`, `SKILL.md:38`) but conflict with `phase-e-falsification.md:39` ("never re-run it yourself").

## Rules

- **R1** When create-bug shows the Phase C block, its open questions, the B3 record or any note, the system must write their prose in the user's language per `user-communication.md`, keeping field names, labels (`Confirmed`, `Likely`, `Needs Review`), keys and the reply word **confirm** as written. Source: grade p2r3; `user-communication.md:9-10,18`.
- **R2** Withdrawn. Dropping the `SKILL.md:47` links to `customer-escape-prevention.md` and `round-time-contract.md` makes skill-lint `must-read-depth` fail (shared must-reads link both, so they must sit 1 hop from `SKILL.md`). The links stay; the line is shortened. Fixing the bundle needs a shared-reference change (see Out of scope).
- **R3** The GitHub label list in `posting-discipline.md` must equal the labels the Phase B pre-flight checks and Phase D passes (`bug`, `severity:<Severity>`). Source: P2 s1, s2.
- **R4** After a non-field create failure, the duplicate search must give its query: Jira JQL `project = <KEY> AND summary ~ "\"<approved title>\"" ORDER BY created DESC` (no status filter), counted as a match only when the summary equals the approved title. Source: P2 s1.
- **R5** `SKILL.md` must say which `jira-comment-post-review.md` checks apply to an issue body (pre-post render check, §3 stray markup, §4 numbering) and that Phase F's 2-round cap applies. Source: P2 s2, s3.
- **R6** When filing, a re-run asked for by `non-pass-challenge-gate.md` §3 or `defect-report-completeness.md` §3a/§3b must go to the reporter or testing-ticket-workflow, never the filing agent. Source: P2 s2; `phase-e-falsification.md:39`.
- **R7** No gate, STOP, approval step, evidence rule or MUST / NEVER / 🔴 / STOP / GATE line is removed. graph_v2 `mandatory_total` for create-bug ≤ 6,561 tokens (at `6758dea`); bytes of `SKILL.md` + own files except `worked-example.md` ≤ 46,117. Source: owner rule "every skill update keeps net tokens minimal".

## Out of scope (reported to the coordinator, not edited)

- Rule restatements cited for dim7 (`SKILL.md:51`/`WORKFLOW.md:51`/`:200` board check; `SKILL.md:55`/`WORKFLOW.md:31`/`:202` URL verify): each is a MUST line; removing one needs an owner-approved `rule-line-register.json` entry in helix.
- Shared files: the MUST links from shared must-reads to `customer-escape-prevention.md` / `round-time-contract.md` (R2), `references/agent-rationalizations.md:12` (attach-before-embed), `references/helix-session-constraints.md:10` waiver wording, `references/workspace-guide-discovery.md:53`.
- `phase-e-falsification.md` holds Phase B3 (file rename needs owner approval, global Rule 5).
- Grader dim8 notes "over-gates on comment scope" (`phase-b2-board-check.md:24-27`, a Phase D hold) and "cites a priority-matrix line" (`WORKFLOW.md:91`, an evidence rule): both are gates, kept.

## Done when

- R1: `phase-c-confirm.md` names the user's language and `user-communication.md` (test).
- R3: no `module:` in `posting-discipline.md` (test).
- R4: `phase-d-create.md` has the JQL and the exact-title match (test).
- R5: `SKILL.md` scopes `jira-comment-post-review.md` for issue bodies (test).
- R6: `phase-e-falsification.md` routes §3 re-runs to the reporter or testing-ticket (test).
- R7: graph_v2 and byte counts at or under the numbers above; repo suites, sdd-gate pass.
