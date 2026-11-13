# Spec — after-14 retest-bug-workflow fixes

Evidence root: ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/` (abbreviated `E/`). Lines below are ols-qa `origin/main` at `ade53c10`.

## Rules

- **R1 Transition or assign that cannot run.** When the configured transition is not in the list `getTransitionsForJiraIssue` offers from the ticket's current status, or the transition or assign call is refused, the system must not pick another transition, must not repeat the same call unchanged, and must read the ticket's status and assignee back. The round's state must then be defined: the comment stays posted; 8d runs only when the read-back status is Done; Step 9 still sends the verdict; the 8e close-out names each action that did not run with its error and the offered transitions; a different transition or a manual move is asked in one question and runs only on a live yes. Source: `E/verify/retest-bug-workflow.json` `#s2-0` CONFIRMED (`closeout-and-notify.md:53`, `:64`, `:74`, `:82`); approval rule `closeout-and-notify.md:25`; no-blind-retry rule `references/settle-and-strategize.md` §4.
- **R2 Host that cannot start subagents — reviewer.** When the host has no subagent tool, the 6c reviewer must still be independent: the system must print the reviewer prompt (ticket key, body path, evidence paths, the four questions) for a fresh agent session or a second QA, queue the reviewer's verdict in the 6d decisions popup, and keep the approval popup waiting for CLEAN. It must not count its own re-read as the 6c round. Unattended on such a host: the comment is not posted and the ticket is held with the reason. Source: `E/verify/retest-bug-workflow.json` `#s3-0` CONFIRMED (`comment-and-post.md:301`, `:303-304`, `:321`); independence bar `references/qa-evidence-coverage.md` (quoted at `comment-and-post.md:298-299`).
- **R3 Host that cannot start subagents — lanes.** When the host has no subagent tool, the system must keep the planned lanes and run them one after another in the main thread, each lane with its own leased account, and the manifest keeps the lane list. This is not a serial predicate and adds no `serialReason`. Source: same finding (`references/parallel-test-lanes.md:136`, `execute-and-evidence.md:32`); `serialReason` values are fixed by `tools/retest-guard/retest_manifest.js` `SERIAL_REASONS`.
- **R4 Superseding source quoted char-exact where it is written.** When an expected (bug ER or task AC) is superseded or may be superseded, the challenge flag's AC/EC line, the row's Actual Result remark and the decisions-popup question must each quote the superseding source char-exact with its key, author role and date — never a paraphrase or translation. Source: `E/grade/retest-bug-workflow.json` prompt 2 run 3, AC2 expectation FAIL ("PO comment only paraphrased"); run `E/runs_clean/retest-bug-workflow/with_skill-p2r3.md:97` writes the flag line as a Thai paraphrase; the existing rule sits only in a parenthesis at `execute-and-evidence.md:189`, and the flag template slot is `superseded by {KEY}` (`references/non-pass-challenge-gate.md:118`).
- **R5 Fewer reviewer rounds, same gate.** Before the first 6c dispatch the system must run, against the draft, the 8·0 items that read the comment body (case list, design ref, passing-row wording, evidence per passing row, coverage) and confirm that every evidence reference names a file captured this round. The reviewer must be asked to return every finding in one pass (every row, every evidence reference, every count), not the first few. The CLEAN requirement, fresh reviewer per round and the non-convergence exit stay unchanged. Source: run timings (line 1 of `E/runs_clean/retest-bug-workflow/with_skill-p*r*.md`): p2r1 383 s with 4 reviewer rounds, p2r2 278 s with 2, p2r3 170 s with 2, p1r2 120 s with 1 CLEAN; the findings that caused extra rounds were mechanical (missing evidence files, count mismatch, PASSED row without a file, carried-forward result) — `with_skill-p2r1.md:149`, `with_skill-p2r2.md:165`, `with_skill-p2r3.md:141`.
- **R6 Token offset.** The total bytes of the edited skill files must not grow. Source: owner rule (T9 brief, 12/Nov/2026).

## Edge cases

- Transition refused after the post: the comment is not deleted or edited for it.
- Assign refused but transition done: 8d and Step 9 run as normal; only the assign is reported as not done.
- The approval bundle named the transition; a different one is a new action and needs a live yes (`closeout-and-notify.md:25`).
- A host that has subagents but whose dispatch fails once: settle-and-strategize §4 applies; R2 is for hosts with no subagent tool.

## Done when

- `closeout-and-notify.md` 8a/8c carry the R1 branch.
- `comment-and-post.md` 6c carries the R2 path and the R5 pre-dispatch check and one-pass request.
- `parallel-test-lanes.md` §4 and `execute-and-evidence.md` lanes carry R3.
- `execute-and-evidence.md` 4i and `comment-and-post.md` 6d carry R4.
- Total bytes of edited files after ≤ before; every ols-qa CI suite passes.
