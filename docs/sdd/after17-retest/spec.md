# Spec — after17-retest

Sources: ols-qa-evidence origin/main `evals/helix-skill-eval-2026-11-1*-after1{1,2,3,4,5}/baseline/retest-bug-workflow*.json`
(15 scorings: findings P1–P3, darwin `dims`, `code_checks`), `verify/retest-bug-workflow.json` (after-12..15), and the
after-15 reviewer hand-backs (13 reviewer rounds over 6 runs). Line numbers refer to ols-qa origin/main `e5c8b164`.
"F:<round> <file:line>" cites the scoring finding. Already fixed on `e5c8b164` (not re-done): 8a four-verdict transitions,
notify four verdicts, 8a/8c refusal branch, PD3, waiver precedence, notify `{mid}`, 7a FE precedence, L107 split guard,
7d in place, result-gate layer 1 Story, host without subagents, settle-and-strategize order, guide file name,
long-workflow todos, Step 0 STOP, Swagger mismatch verdict, malformed 8·0 link.

## R1 PWMI is a non-PASSED verdict everywhere
When the verdict is PWMI, the skill must treat it like FAILED / BLOCKED in every place that enumerates verdicts:
6a requires Root cause + Resolution options for FAILED, BLOCKED **and** PWMI (`comment-and-post.md:229,231`;
F:after13 :238, after14-s2 :234); 8c assigns back for every verdict, as 6d's default says (`closeout-and-notify.md:72`;
F:after13-s3 :74); the project-config template has a transition row per verdict (`project-config-template.md:72-73`;
F:after13-s2 :68); handoff templates list PWMI (`handoff-template.md:33`, `references/handoff-file-template.md:29`;
code check CC6). Done when: `grep -n "FAILED or BLOCKED\|FAILED / BLOCKED\|(PASSED and FAILED)"` finds nothing in the retest
bundle and both templates list four verdicts.

## R2 Notify is channel-neutral and its resend is bounded
When a posted notification is corrected, the skill must edit the same message through the channel's own edit call
(Discord webhook PATCH is one example), never hardcode one vendor (`closeout-and-notify.md:172-173`, `WORKFLOW.md:450`;
F:after12 :182, after14-s3 :172). When the notify helper fails, the skill must fix the input and resend once; the same
failure twice must stop the resend loop and report the helper's output, with the round left open (not closed)
(`closeout-and-notify.md:153`; F:after13 P1 :163; `settle-and-strategize.md` §4). Done when: no step needs Discord to
run, and the resend text names its stop.

## R3 One copy of the login-by-command blocks, no machine path, no single-agent name
The relink/mint blocks must exist once, in `references/parallel-test-lanes.md` §3 (read by every lane-running skill);
`execute-and-evidence.md` §4b and `project-config-template.md` point there (F:after12-s2 P1 :63, after13 :116,
SKILL.md:29 "one copy"). Logs go to `<log-dir>`, never `/tmp/` (code check C6, `portable-content.md:9`). Instructions
say "the agent" / "the main thread", not "Claude" (F:after13 :63). A lane's own browser context loaded from the saved
login file is not a login window (F:after15-s3 `WORKFLOW.md:430`). `NO-ADVISOR` applies on hosts that have an advisor
tool (F:after15-s2 :196). Done when: `grep -n "/tmp/\|Claude "` finds nothing in those files and one copy of the blocks.

## R4 Text that teaches the comment matches the template
- `gotchas.md:9` login → login by command; `:30` FE → v2, API → v3 (F:after14-s3 :30, after15 :9).
- `retest-fix-intake.md:3,28,33,41` → Step 4 is execution; format is locked at Step 3; no mid-run wait (missing
  config → the Step 1 ask); FE plans MP4 per case + text stills (F:after13 :33, after14-s3 :3).
- `Design ref` value: ` · ` only separates TC → node mappings (code check after13-s3 C5; `comment-and-post.md:40,143`).
- A body typed from the template is allowed only when the renderer is not available (`comment-and-post.md:222`,
  SKILL.md *Which tools count*; F:after15 :227).
- 7d says which `jira-comment-post-review.md` items map to a retest comment (TC rows → verdict-table rows; CSV footer /
  §5 attachment do not apply) (F:after13 :45, after11-s3 :41).
- Worked example 1 (API) carries Test Step / Expected lines, the rule line and an *Evidence* section with cURL +
  response; the FAILED Root cause names the debugging skill; single-role file names carry no role suffix;
  markers read `src={ols-qa|helix}` per the run (F:after14-s2 :39, after14-s3 :63, :89, after14-s2 :113).
Done when: `node tools/retest-guard/worked_example.test.js` passes on the new example.

## R5 Portable, language-neutral shared text
Product role set, product names and owner-private rule numbers become project-guide references or plain reasons:
`qa-evidence-capture.md:52,66` (F:after13 :51), `qa-evidence-coverage.md:69` ("an OLS bug"), `proactive-qa-triggers.md:3,9,13`
("Rule #5/#3"), `result-quality-gate.md:66` (post-mortem ids not shipped). The Thai chat flag in
`non-pass-challenge-gate.md:115` follows the user's language; Thai owner quotes in `comment-and-post.md:117,126,134`
become English. `round-time-contract.md:33` names `AskUserQuestion` as the Claude Code tool. Behaviour for the
reference project is unchanged (its guide carries the same role list).

## R6 Shared rules agree with the retest rules
- `defect-report-completeness.md` §2 and `non-pass-challenge-gate.md:133` (option C) point a retest to its Fixture-line
  form (F:after14 P1 :54, after15-s3 :133).
- `root-cause-investigation.md:129`: `intermittent` is allowed with attempt counts (result-quality-gate layer 16).
- The banned passing-row word list has one source, `customer-escape-prevention.md` §3; `closeout-and-notify.md:35`,
  `WORKFLOW.md:123,484` and `customer-escape-prevention.md:218` point to it; `:229` repeats `:217` (F:after14-s2 P1 :484).
- Step 2c fixture rule matches the no-wait gate: BLOCKED only after the 4c creation steps fail (F:after13-s3 :87).
- `figma-design-comparison.md:103`: attended runs queue the design question for 6d (F:after14-s3 :103).
- `intake-one-pager.md:53` and `skill-routing.md:13` name Task / Story retests (F:after13-s3 :53).

## R7 One copy of reference tables
WORKFLOW's priority cheat-sheet and Figma opening steps become links to `bug-priority-matrix.md` and
`figma-design-comparison.md` §2 (F: 9 scorings, `WORKFLOW.md:234`, after13-s3 :251). The QA-closing design item is
ticked in the pre-6d run (comparison ran at 4d) (F:after12-s3 :373).

## R8 Discovery stub and command
SKILL step 2 runs after step 0 ("before any other tool call"); playwright-preflight line maps Phase D/E to Step 4;
dependencies list `tools/result-gate` and `superpowers:verification-before-completion` (optional); description adds the
implicit trigger (ticket in Ready to Retest / dev says fixed); the bare `retest` trigger becomes `retest the fix`; the
command description says when to use it; execute limits are exact (3 bullets, 640 px). Always-on description bytes do
not rise.

## R9 Fewer reviewer rounds (after-15 hand-backs, 13 rounds)
Grouped causes of a HAS-COMMENTS round: a claim the input does not support — design question "asked", fixture,
account or role inferred (6 rounds); run-count arithmetic (3); evidence named but not captured or promised (3);
unfilled placeholder (1); run time unsupported (1); no "not tested" statement (1); a fix that contradicted another
line (1). 6c item 0 must, before every dispatch, check the **whole** body for: every claim in header lines and cells
traces to the ticket or a captured file; `{run}` counts only cases executed this round and
`passed + failed + PWMI + blocked = total`; no `{placeholder}` left; every untested item named in a row, the coverage
lines or *Out of scope*. CLEAN gate, no round cap, non-converging exit and unattended mode unchanged.

## R10 Left as is, with reason
- MUST/NEVER table restatement and 491-line WORKFLOW (dim7, 12 scorings), SKILL Contents list (8 scorings), verdict-rule
  bullet split (P3): each needs MUST/NEVER/🔴 lines cut or moved — owner approval through `rule-line-register.json`, or a
  file move (global rule 5).
- `skill-routing.md:36` Task mapping: the table is owner-confirmed; the file forbids inventing a mapping.
- `handoff-template.md` vs `handoff-file-template.md`: merging deletes a file (rule 5).
- Not defects on re-read: `result-quality-gate.md:236` (sentence completes on :237), `qa-closing-shared.md:19`
  (CSV only "if generated"), `jira-fast-publish.md:6` (tools named as examples, curl fallback :7-8), quick_validate
  (scorer env lacked PyYAML).

## R11 No cost rise
Per file bytes before → after reported; helix `scripts/ci-token-budget.sh` prints `token-budget: pass`; every reworded
rule line listed with its replacement. `bash scripts/run-test-suites.sh` green; sdd-gate ok.

## Done when
- R1–R9 checks above hold on the code branch.
- Full suite green, sdd-gate ok, token-budget pass, rewords listed.
