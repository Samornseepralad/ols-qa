# Spec — after17-catch-ai

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-1{1,2,3,4,5}-after1{1..5}/` `baseline/catch-ai-workflow{,-s2,-s3}.json` and `verify/catch-ai-workflow.json`. Every finding has an id (`CA-n`) in [findings.md](findings.md) with source, current `path:line` and fix. Line numbers are `skills/catch-ai-workflow/` at origin/main `e5c8b164`.

## Rules

- **R1 Entry points agree.** SKILL.md description, `commands/catch-ai.md` description and the command body must name the same NOT-for tasks in words (tc-review included) and the same triggers, and say the same start order: session-start context, then the target question, with no "before reading anything" conflict (CA-1..CA-4).
- **R2 Start order is one order.** The progress checklist starts with Refusal-first, then Dependencies; the Dependencies section is pointed to from the top; one todo mechanism is named; one line states the section order (dependencies, refusal-first, steps 1-9 with Hedged conclusions inside steps 2/4/7, checkpoint, result gate, QA closing) (CA-5..CA-8).
- **R3 Every gate is marked and has a failure branch.** Refusal-first carries 🔴 STOP; an inferred scope is shown before the long audit and runs on unless corrected; the CHECKPOINT after step 9 says what happens when the owner declines or does not answer; non-pass-challenge-gate § 4's wait for a decision is the CHECKPOINT, not a mid-audit pause (CA-9..CA-12).
- **R4 Procedure text is executable.** The Procedure heading carries no "high freedom" tag; step 4's read-only/approval rule is its own bullet; the hedged-conclusion tally rule names its Defect-count basis; the exit rule, the flaky/evidence cases and the document-audit layer map are short bullets or a numbered list, not 450+ character paragraphs; a Correction states the required value plainly ("becomes"), never "should be" (CA-13..CA-17, CA-47).
- **R5 The result gate works for an audit.** N/A test is the first line of the section; the checker's exit 2 on an audit input has a branch (walk the 20 layers by hand on the audited record, say so, never a pass); the audit builds one result line per case from the audited run's log; layers that ask to create data or act (14 step 6, 18, pre-run layers) are judged from the audited run's record, the read-only rule wins, a missing record holds that case BLOCKED for sending; the checker command links its full arguments (CA-18..CA-22).
- **R6 Reads and dependencies match the target.** A target spanning several read groups reads every matching group; reads skippable for a document-only audit are named; write steps inside conditionally read references are out of scope; Atlassian MCP and Figma dependency rows appear for the targets that need them (CA-23..CA-26).
- **R7 One verdict rule.** reference.md § Verdict states that a test-case coverage gap follows bug-priority-matrix § Hard rule (BLOCKED, never PASSED with a caveat); skill-routing's catch-ai row agrees with the CHECKPOINT edit rule; bug-priority-matrix "Used by" lists catch-ai-workflow; the "§ PWMI" pointer names a real heading (CA-27..CA-29, CA-43).
- **R8 Shared references stay portable and consistent.** No one-product role ids or product names in qa-evidence-capture / qa-evidence-coverage; out-of-repo tool absence has a fallback line; dependencies.md names one debugging fallback and a host-neutral install hint; root-cause-investigation maps the boundary sweep for a document audit; customer-escape-prevention carries one row for "wrong thing observed" (CA-30..CA-35).
- **R9 Already-fixed items stay fixed.** The items listed `FIXED-BEFORE` in findings.md are pinned by test (hedge grep word-bounded with the 6 banned terms, count line in the template, layer-5 rule, Because column, rationalizations table, Session verdict label) (CA-36..CA-42, CA-44, CA-45).
- **R10 Pins and size.** Pinned tests stay (`tools/catch-ai-unsourced-wording`, `tools/r11-t9-uplift-b`). helix `token-budget: pass` and `rule-lines: pass` with every reworded rule line registered; no gate, approval, evidence rule or MUST / NEVER / 🔴 / STOP / GATE line removed. Not touched: `metadata.proactive_triggers`.

## Out of scope (report, do not fix)

- `quick_validate.py` needs PyYAML (CA-46): an evaluator-environment fact; verified here with the venv.
- Removing `metadata.proactive_triggers`: one cross-skill change by the main thread (owner 13/Nov).

## Done when

- Every `CA-n` in findings.md is FIXED, FIXED-BEFORE (pinned) or NOT-FIXABLE with evidence.
- `bash scripts/run-test-suites.sh` green; `node tools/sdd-gate/check.js --base <spec-branch>` ok; helix `bash scripts/ci-token-budget.sh pr origin/main` prints `token-budget: pass` and `rule-lines: pass`.
