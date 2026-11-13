# Spec — after17-testing-ticket

Sources: ols-qa-evidence origin/main `evals/helix-skill-eval-2026-11-1{1,2,2,2,3}-after1{1..5}/` — scorings `baseline/testing-ticket-workflow{,-s2,-s3}.json` (k1/k2/k3), `verify/testing-ticket-workflow.json`, `grade/testing-ticket-workflow.json` (with_skill FAILs after11–13). Line numbers refer to ols-qa origin/main `e5c8b164`.

## Rules

- **R1 One filing question, one template.** When F3 reports defects, `execute-and-summarize.md` must point to the two tables in `output-templates/defect-candidates.md` (the single copy, 6-column *Needs PO decision*) instead of copying them; the F3 owner question is the round's one filing question and F5 step 2 must carry it once, never a second per-row question; a live owner answer is still required to file (source: after14-s3/after15 P3 `execute-and-summarize.md:254`, after15-s2 P3, after15-s3 P3 `:355` + darwin dim4).
- **R2 Reproduce before FAILED.** E1 must tell the lane to reproduce a failure to the layer-16 count (3 of 3, or intermittent with counts) before recording FAILED (source: after14-s3 P3 `result-quality-gate.md:192`).
- **R3 Plan template agrees with F4 and serial plans.** `test-execution-plan-template.md` must say a plan row with no results row is an F4 shortfall (fail-closed), and that a serial plan shows L1 plus `L2: none — serial: {§4 predicate}` (source: after12-s3 P1 `:33`, after11-s3 P2 `:37`).
- **R4 Runtime-neutral wording.** The bundle must name "the agent", not one runtime's product, as the actor (`WORKFLOW.md:220,268-270`, `parallel-test-lanes.md:122`); `round-time-contract.md:33` must give the no-popup fallback; the lane `NO-ADVISOR` rule keeps its token but names any reviewer-model tool; `dependencies.md` install hints must name `/plugin` as one runtime's installer; `root-cause-investigation.md` fallback skills must agree with `dependencies.md:49` (source: after13-s2 P3 `parallel-test-lanes.md:194`, after14-s3/after15 P3 `round-time-contract.md:33`, after15-s2 P3, after13-s3 P3 `dependencies.md:49`, after15 P3 `root-cause-investigation.md:42`).
- **R5 Portable names.** No one-product wording in the bundle: `qa-evidence-coverage.md:69` ("an OLS bug"), `playwright-discipline.md:41` (`installCFBypassProxy`), `bug-priority-matrix.md:116,121` (repo CLAUDE.md, private agent memory as users) (source: after13-s3, after15 P3, after13-s2/after15-s3/after15 P3).
- **R6 Step names that resolve.** `results-update.md:199` names F5 step 4; `jira-linebreak-conversion.md:40` names each workflow's post step; `session-closing.md:35` uses WORKFLOW's `Next: create-bug for {scenario ids}`; `long-workflow-todos.md:18` shows the one end-of-round approval; `dependencies.md:4` names the Run-order dependency step; `verify-closing-checklist.md:31,39` link the coverage gate's canonical file; `user-communication.md:38` scopes "Needs Review" to the workflow that defines it; `qa-debug-discipline.md:56` puts no mid-run wait on testing-ticket (source: after12-s3/after13-s3/after14-s2 P3 `results-update.md:200`, after15 P3, after14-s2/after15-s2 P3, after13..15 P3, after14-s3 P3, after12 P1 stub links, after14-s2 P3, after14-s2 P1/after15-s2 P3 `qa-debug-discipline.md:56`).
- **R7 Status vocabulary.** `no-wait-decision-gate.md` layer 14 must not use a status outside the verdict set; `root-cause-investigation.md` §6.3 must say which label a complete, empty sweep carries (source: after14-s3 P3 `:64`, after15-s2 P3 `:176`).
- **R8 Bounded waits and counts.** A refused lease must not wait unbounded (`parallel-test-lanes.md:193`); `resilient-selectors.md` must count the 3 strategies as the first try plus two fallbacks and mark tiers 4–5 as preflight-risky (source: after14-s3 P3).
- **R9 Check before invoke.** `session-start-context.md` must check the skill list before invoking either context skill (source: after14-s3 P3 `:5`).
- **R10 Chat language.** The non-pass flag template must follow the user's language (source: after14-s3/after15 P3 `non-pass-challenge-gate.md:115`).
- **R11 No dead stubs.** `qa-evidence-gates.md` moved-section stubs (`:88-145`) must become one table of old anchors → new homes; every old anchor still resolves (source: after13-s2/s3, after14, after14-s3, after15-s2/s3, after15 P3; after12 P1).
- **R12 Readable WORKFLOW.** Non-rule WORKFLOW lines over 400 chars are split; the References table that re-lists SKILL.md *Contents* becomes a pointer; the change-history note at `execute-and-summarize.md:233` goes (source: after11-s2 P3 `:79`, after12 P3 `:271`, after14 P3 `:355`, after15-s2 P3 `:233`).
- **R13 Example matches the gates.** `worked-example.md` shows Design ref, Build, Round time, Phase D, MP4 + one still per ER on PASSED rows, Width and Evidence columns, data created instead of BLOCKED for missing data, and the single approval at Phase G (source: after12/after12-s3 P2/P3, after15-s2 P3).
- **R14 Description covers implicit asks.** The SKILL.md description must name a pasted ticket key or link with "check this on staging" without growing the description bytes (source: after12-s2..after14 P3 `SKILL.md:5`, after12-s2 P3 `:8`).
- **R15 Fan-out names its exceptions.** Every "fan out whenever 2 or more units" line names the `parallel-test-lanes.md` §4 serial predicates (source: after14-s2 P1 `parallel-test-lanes.md:143`).
- **R16 Post review fits result comments.** `jira-comment-post-review.md` must say how its TC-row and CSV items read for a testing-ticket result comment (source: after14-s3/after15-s3/after15 P3 `:41`).
- **R17 Size and other readers.** Per-skill mandatory-read tokens after ≤ before (helix `ci-token-budget.sh` pass); no MUST / NEVER / 🔴 / STOP / GATE line is cut (`rule-lines: pass`); every other skill reading a touched shared file keeps its behaviour (source: owner rule 12–13 Nov, sweep brief §3).

## Out of scope (reported, not fixed)

- Narrow-width rows BLOCKED by construction (k1 after15 P1 `qa-evidence-capture.md:115`, after14-s3 P1): needs the external recorder (`capture/qa_recorder.js`, outside this repo) to accept a narrow viewport; relaxing "PASSED needs an accepted clip" would weaken an evidence gate.
- Duplicate MUST rows (`customer-escape-prevention.md:218/228`, `:223/227`) and WORKFLOW MUST/NEVER rows restating E1/F3: merging cuts a rule line — needs an owner-approved `rule-line-register.json` entry.
- Usage marker `src={ols-qa|helix}` (`results-update.md:108`): `tools/adoption-check` reads it.
- `quick_validate.py` missing PyYAML: scorer environment, not skill text.
- Bundle size / 20-layer gate overlap (dim7): shrinking means removing gates.

## Done when

- R1: `grep -c "Open a bug for" execute-and-summarize.md` = 0; F3 links defect-candidates.md.
- R2: E1 has step 4 naming layer 16.
- R3–R16: lines changed as stated; `grep -n "Claude \(calls\|never\|probes\)"` over the bundle = 0; `grep -c "moved there" references/qa-evidence-gates.md` = 0 and every old anchor id is present.
- R17: helix `token-budget: pass` and `rule-lines: pass`; `bash scripts/run-test-suites.sh` and `node tools/sdd-gate/check.js` green.
