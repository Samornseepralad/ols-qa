# Spec — after16-retest

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/` — `verify/retest-bug-workflow.json` (5 CONFIRMED P1),
`data/after-15/summary.json` (`with_skill_duration_s: 248.0`, n = 6), `runs_clean/retest-bug-workflow/with_skill-p*r*.md`
and the run transcripts (subagent jsonl of the dispatching session, timestamps per reviewer dispatch and result).
Line numbers refer to ols-qa origin/main `3bbc3b18` (the same text as helix `7b126d1`).

## Part A — after-15 P1 findings

- **R1 One waiver rule (`#0`).** When the user waives approval, the skill must skip the Step 6d approval wait only for an
  outward action the owner delegated by name, in this session, for this round (6d *Delegated actions*). The Step 6 gate
  line (`comment-and-post.md:24`) must say the same, and 6d must state that this rule wins over the broader
  "unless they waive it" wording in the shared references (`helix-session-constraints.md:10`,
  `agent-rationalizations.md:11`), so a general "skip approval" never posts. The shared files are not changed: other
  skills keep their own wording (source: verify `#0`; `commands/retest-bug.md:13`).
- **R2 Notify correction has a message id and a stop (`#1`).** When a posted notification must be corrected, the skill
  must take the message id from the Step 9 send result (the webhook send returns the message object when sent with
  `?wait=true`; record its `id` and the thread id), use the GET only to read back that message, list every correction
  action by name in an approval before it runs, PUT the Jira comment in place in the format locked at Step 3, and stop
  and report on any failed step — never repost (source: verify `#1`; `closeout-and-notify.md:168-175`,
  `WORKFLOW.md:490`).
- **R3 7a precedence (`#s2-0`).** When the bug is FE, the skill must post through Step 7c (v2 wiki) whatever the row
  count; the ≤ 3-row MCP path, the > 3-row ADF path and the 7b fallback apply only to the v3 (API) format locked at
  Step 3. No 7a row may route an FE comment to v3 (source: verify `#s2-0`; `comment-and-post.md:381-383,401`,
  `WORKFLOW.md:445`).
- **R4 No split of a locked or one-table comment (`#s2-1`).** When MCP truncates a table and there is no browser,
  `jira-comment-post-review.md` must split the comment only when the session has not locked v2/v3 and the workflow
  does not require one table; otherwise it hands the corrected body to the user to paste. When the format is locked,
  the ADF switch is replaced by a PUT of the full body in the locked format. Skills with neither condition behave as
  before (source: verify `#s2-1`; `jira-comment-post-review.md:107`, `comment-and-post.md:109`).
- **R5 7d fixes in place (`#s3-1`).** When a 7d check fails, the skill must fix the posted comment in place (PUT to the
  same comment id, in the locked format) and run 7d again — never return to the Step 7 POST. The same applies to the
  "re-post" rows of `jira-comment-post-review.md` § Fix procedure, which must agree with its own Rule (PUT to the same
  comment id) (source: verify `#s3-1`; `comment-and-post.md:428,432`, `jira-comment-post-review.md:18,84-85`,
  `closeout-and-notify.md:45`).

## Part B — redundant reviewer rounds (owner 13/Nov/2026)

Run evidence (reviewer = Step 6c subagent; seconds = dispatch → result, from transcript timestamps; "fix" = the gap
before the next dispatch):

| Run | Header duration | Rounds (s) | Fix gaps (s) | 6c loop total (s) | What the later rounds re-checked |
|---|---|---|---|---|---|
| p1r1 | 653 | 223 · 24 | 20 | 267 | r2 re-ran ER verbatim, PASSED↔✅, counts, MP4 per row, 5 evidence names, v2 syntax — all passed in r1; only change was the run-time figure |
| p1r2 | 240 | 30 · 28 | 23 | 81 | r2 re-ran v2 syntax and the run-time bursts, both passed in r1 |
| p1r3 | 182 | 26 | — | 26 | one round |
| p2r1 | 237 | 26 · 27 · 29 | 24 · 9 | 115 | r2 found 3 issues, all in lines the r1 fix rewrote; r3 re-ran AC coverage, counts, local paths |
| p2r2 | 256 | 22 · 27 | 15 | 64 | r2 = the same "asked assigner" finding as r1 (non-converging exit) |
| p2r3 | 385 | 28 · 25 · 28 | 29 · 14 | 124 | count line flagged in r1 and r2 (recomputed after the fix); r2 found text the r1 fix added |

Recurring cause across runs: the Design ref template `none, asked {who} {YYYY-MM-DD}` (`WORKFLOW.md:316`,
`comment-and-post.md:41,146`) is written at draft time, before anyone was asked, so a reviewer flags it as an invented
claim (p2r1 r1 #2, p2r2 r1 + r2, p2r3 r1 #4).

- **R6 Re-check rounds check the change.** When a 6c round after the first is dispatched, the fresh reviewer must still
  read the whole body and must return, in one pass: (a) each finding of the previous round, closed or not; (b) every
  line the fix changed or added, against the ticket and the evidence with the full item 2–3 bar; (c) every line whose
  value depends on a changed row (verdict line, coverage counts, run time). It must not re-run checks on unchanged lines
  the previous round passed, and re-answers the four adversarial questions only when a row's status or evidence changed
  (the 7d pre-delivery gate runs the full four-question pass again on the posted comment). Every check still runs in
  round 1 on the whole body (source: table above, p1r1, p1r2, p2r1, p2r3).
- **R7 Reconcile before every dispatch.** When any 6c round is about to be dispatched (not only the first), the author
  must re-run the item-0 coverage, case-list and count reconciliation on the saved body and confirm every sentence the
  fix added traces to the ticket or a captured file (source: p2r3 r1 + r2 count findings, p1r2 r1 #2, p2r1 r2, p2r3 r2 #3).
- **R8 "Asked" only after it was asked.** When a screen has no design node, the Design ref value must read
  `none, to ask {who} (not yet sent)` until the question was actually sent, and `none, asked {who} {YYYY-MM-DD}` after;
  the 8·0 design-reference check must accept either form, since both name who is asked (source: p2r1 r1 #2,
  p2r2 r1 + r2, p2r3 r1 #4; `closeout-and-notify.md:34` "naming who was asked").
- **R9 Gates unchanged.** The approval popup still waits for CLEAN, the loop still has no round cap, the non-converging
  exit, unattended mode and "verify the reviewer's claims" stay as they are, and no MUST / NEVER / 🔴 / STOP / GATE line
  is removed (source: lane brief rule 4; `round-time-contract.md` §3 step 1).

## Size

- **R10** Bytes of each touched file after the change ≤ before: `comment-and-post.md` 35,002 · `closeout-and-notify.md`
  17,696 · `WORKFLOW.md` 55,379 · `jira-comment-post-review.md` 7,654. Offsets drop only restated text another line
  already gives (source: owner rule, minimal session tokens).

## Out of scope

- The other 14 P2 / 20 P3 findings; the reviewer subagent's spawn overhead (~25 s per round, host cost).
- The shared `round-time-contract.md`, `helix-session-constraints.md`, `agent-rationalizations.md` (other skills read them).

## Edge cases

- tc-fe-prep / tc-api-prep / testing-ticket read `jira-comment-post-review.md`: with no lock and no one-table rule
  their split / ADF paths are unchanged (R4); their fix rows already say PUT in the file's Rule (R5).
- A round-2 fix that changes a row's status → R6 (c) re-checks the verdict and counts, and the four questions are
  re-answered for that row.
- Unattended mode runs one reviewer round, so R6 does not apply there.

## Done when

- `comment-and-post.md:24` names the per-action delegation, and 6d says it wins over the shared broader wording.
- Closeout correction names where `{mid}` comes from, an approval, and a stop branch; Step 9 records the id.
- 7a routes FE to 7c always; 7b says v3 only.
- `jira-comment-post-review.md` L107 has the lock / one-table guard; § Fix procedure rows say PUT to the same id.
- 7d item 3 and its Go back say fix in place (same comment id), not Step 7 POST.
- 6c item 0 runs before every dispatch; item 4 carries the R6 re-check scope.
- Design ref template has the "not yet sent" form in all three places.
- Bytes per file ≤ R10 numbers; `bash scripts/run-test-suites.sh` green; sdd-gate ok.
