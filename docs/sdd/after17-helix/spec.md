# Spec — after17-helix

Line numbers refer to ols-qa `e5c8b164`. Each rule cites the finding round/scoring (e.g. `a14s2` = after-14 scoring 2). "Done when" is one line per rule.

## Router (`skills/helix/SKILL.md`)

- **R1 Install question is not the router's question.** The one-time install question of `session-start-context.md` is asked first and alone and does not count as the router's one question (`:18`, `:50`). (a14s2 P1; a14s2 d2/d3) Done when `:50` says so.
- **R2 STOP scope.** The Opening STOP applies when a menu or suggestion was shown; a workflow named in step 1 is the choice (`:48`). (a11, a12s3 P2)
- **R3 Out-of-scope order.** Out-of-scope request: show the menu once and wait; a reply that picks nothing is 13 (`:66`). (a13 P2)
- **R4 Proactive signals have commands.** Read the branch with `git branch --show-current`, last commit with `git log -1 --format=%s`, opt-out with `printenv HELIX_PROACTIVE`; no git repo or branch: skip the branch signal (`:70,:72,:76`). (a13s2 x2; a14s3; a15s3 P2)
- **R5 Bare key question has wording.** `Which workflow for {ISSUE_KEY}? Say a menu number or name.` (`:44`). (a11s2 P2)
- **R6 Routed workflow stops at its own gate.** One row in the failure table: relay its stop line, do not re-route or imitate it, show the menu once (`:89-99`). (a12s2 P2)
- **R7 Router-only close.** A turn that only routed closes with the three router checks plus `Next:`; qa-closing-shared items 3-4 apply once a workflow ran (`:105`). (a13s3 P2; a14 P1 `qa-closing-shared.md:11`; a15s2 P2 `session-closing.md:31`)
- **R8 Menu rule scoped.** "MUST show the menu" applies when Opening step 4 applies (`:119`). (a11 P2)
- **R9 Constraints read time.** Read `helix-session-constraints.md` at Routing step 2, not "session start" (`:130`). (a11s2 P3)
- **R10 No unbounded "concise".** "Be concise" becomes "one question or the menu or the announce line per reply" (`:39`). (a11s3, a15s2 P3)
- **R11 Anti-patterns are rules.** MUST NOT row also forbids imitating a workflow from memory and folding several asks into one question (`:121`). (a12 P3)
- **R12 Description scope.** "wants QA help" is limited to asks with no workflow named (`:5`), byte-neutral. (a13s3, a14 P3)
- **R13 Not-opened list stays.** Not fixable: `tools/skill-lint/lint.js:124` (must-read-depth) requires every MUST link reachable; removing the list breaks a gate. Reported, no edit. (a12-a15 P2/P3 x14)
- **R14 Frontmatter validates.** `quick_validate.py` run with PyYAML passes (`:1`). (a12 P1/P2/P3; environment, no edit)

## Shared references

- **R15 One recital order.** `helix-session-constraints.md:3` and `shared-preamble.md:8`: the router recites once after its route line; a workflow started directly recites in its first reply after its announce line; a child under the router does not recite again. (a14 P2; a15 P3; a13s3 P3)
- **R16 One todo trigger.** `skill-invocation-discipline.md:29` points at `long-workflow-todos.md:7` instead of a second threshold. (a15 P2 x3)
- **R17 intent-shortcuts.** `:21` `{ISSUE_KEY}` not `PROJ-123`; `:23` drop the repeat of `:3`; `:5` rows are matching phrases, a message with any phrase of a row matches it. (a12s2 P2/P3; a13s3; a15 P3)
- **R18 dependencies.** Router exception stated (`dependencies.md` after `:9`); Atlassian row names the router's paste-the-ticket fallback (`:58`). (a13 P2 x3; a14s3 P2; a15s3 P2)
- **R19 jira-comment-post-review.** `jira-wiki-vs-markdown.md` is a link (`:81`); split-comment escalation keeps the edited comment and never deletes (`:105`); pre-post check keeps one copy: `round-time-contract.md` §6 links here (`:24`, §6 `:60`). (a13 P3 x2; a14s2 P3; a14/a15 P2/P3 dup x8)
- **R20 One-product names.** `playwright-preflight.md:13`, `qa-debug-discipline.md:83`: no `PD3`/`CF_BYPASS`. (a11s3, a12s2, a15 P2/P3; code check C5)
- **R21 proactive-qa-triggers.** `:18` ranking is stated (ticket type > branch > last commit); `:25` row uses observable signals. (a15 P3; a13s2/s3 P2) `Rule #5`/`Rule #3` already fixed by #251/#254.
- **R22 qa-evidence-gates.** `:64` workflow-pointer names `qa-evidence-rerecord.md`, not "above". (a14s3, a15 x4)
- **R23 root-cause-investigation.** MUST/NEVER row `:197` carries the explicit-ask exception of `:46` (reword). (a15s3 P3)
- **R24 round-time-contract.** `:12` soft line at 12 minutes; §6 is a link (R19). (a13s3 P3)
- **R25 One <br> rule text.** `verify-closing-checklist.md` and `qa-closing-shared.md:19` link the post-review file instead of restating its checks. (a15s3 P3)
- **R26 skill-rules-style / closing.** `:43` heading `Scripts` (numbering); `:36` template says the helix router asks one item; `qa-closing-shared.md:7` circular pointer removed; `verify-closing-checklist.md:10` shared items link `qa-closing-shared.md`; `:41` no-`tools/` branch. (a11-a15 P2/P3 x9)
- **R27 agent-rationalizations.** `:39` links `design-and-review.md` Step 4 (the procedure), not the stub. (a13 P3)

## Covered by open PRs (no edit here)
dependencies `/plugin` hint, root-cause fallback list, `AskUserQuestion` (#255); qa-evidence-gates stubs (#250 #255); Rule #5/#3 (#251 #254); figma dedupe (already single-sourced).

## Done when
`run-test-suites.sh` green; `sdd-gate` ok; helix `token-budget: pass`, `rule-lines: pass` or rewords registered.
