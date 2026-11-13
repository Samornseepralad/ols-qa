# Spec — after17-create-bug

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-1{1..5}-after*/` — `verify/create-bug-workflow.json`, scorings `baseline/create-bug-workflow{,-s2,-s3}.json`; catalogue of 135 findings (ids `F1`..`F135`, ledger in `findings-ledger.md`). Line numbers refer to ols-qa `e5c8b164`. after-16 stopped at 4/48 runs and left no create-bug scoring.

## Rules

- **R1 A run that files nothing has a Verdict.** When every candidate is Dropped, BLOCKED or Needs Review (nothing reaches Phase D), the skill must close with `Verdict: CREATED 0/{K} — {reason}` listing each candidate's outcome, then QA closing; Phase F must say it runs for that case too (F94, CC7).
- **R2 Confirm-block counts reconcile.** The Board check line must count every candidate: dropped in B2, dropped in B3, blocked or Needs Review, to file; the symbol `D` must not stand for a count (Phase D collision) (F55, F107, F119).
- **R3 Phase B3 is findable and marked.** The file is `phase-b3-falsification.md` (owner 13/Nov: "Rename + แก้ลิงก์ทุกที่"), every link and test reference follows, no pointer note remains; both B3 headings carry 🔴 GATE; "Likely" is a defined status, not a cause hedge, and the draft's Root cause label is separate from Confidence (F46, F54, F65, F70, F77, F88, F92, F99, F108, F119, F122, F131).
- **R4 Image resize names a tool and a check.** Phase D names a resize command and how to read the width (F20).
- **R5 Shared waiver and embed lines match the create-bug gates.** `helix-session-constraints.md:10`, `skill-invocation-discipline.md:11` and `agent-rationalizations.md:11` say a hard confirm gate (create-bug Phase C) is never waived; `agent-rationalizations.md:12` says attach-before-embed applies to an issue that already has a key (new bug: create, attach, update); saving an intake answer to the workspace guide is covered by the answer (F43, F47, F58, F64, F76, F83, F84, F97, F116, F125, F126).
- **R6 Shared references say what create-bug uses.** `defect-report-completeness.md` scope names the create-bug draft and §3b's re-run is handed to the reporter or testing-ticket for create-bug; `non-pass-challenge-gate.md` §3 likewise; `jira-comment-post-review.md` says which rows apply to an issue body and that Phase F's 2-round cap replaces its 3 (F3, F33, F42, F60, F69, F72, F73, F74, F85, F104, F134).
- **R7 Shared references stay portable and English.** No product-environment name (`PD3-style`), no Thai quote in an English-only file, no ols-only rows mixed into the portable index, `![alt](url)` examples do not parse as relative links (F27, F80, F93, F114, F123, F124, F135).
- **R8 Intake and draft slots match the steps.** The create-bug intake one-pager asks for the expected side's source and every entry point tried; the draft's missing-link placeholder carries no braces; A3's Severity/Priority rule is a 3-row table in the order it is checked (F13, F22, F87, F121, F128).
- **R9 Example and entry text agree.** The worked example runs `gh repo view` at Phase B; the command description names the board check and falsification and the same NOT-for list as SKILL.md; the SKILL description also triggers for a defect found mid-chat without the word bug (F36, F62, F82, F90, F103, F18).
- **R10 One statement of a rule.** The no-create-before-confirm and board-check rules in `SKILL.md` Refusal-first become a pointer plus the MUST that stays unique there (F6, F48, F56, F68, F91, F101, F113, F133).
- **R11 Offsets.** Bytes added by R1-R10 are offset by deleting text another line already states; helix `token-budget: pass` and `rule-lines: pass` (reworded lines listed in the PR).
- **R12 Already fixed stays fixed.** The ledger names, for each finding, the current `path:line` that fixes it (PRs 230-244) or the reason it stays open; pinned tests unchanged.

- **R13 Pinned tests follow the new text, never weaker (owner 13/Nov: "แก้เทสต์ให้ตรงข้อความใหม่").** r7-create-bug-pasted and r11-skill-fixes-g1 end the B2 section at the new B3 heading; r11-t9-uplift-a asserts the 3-round cap still names its re-read loop plus create-bug Phase F's 2; every gate or count the old assertions guarded is still asserted.

## Out of scope (reported with evidence)

Dropping the `SKILL.md` links to `customer-escape-prevention.md` and `round-time-contract.md` (skill-lint reports 6 new violations; see `docs/sdd/after16-create-bug/spec.md` R6). Collapsing the `qa-evidence-gates.md` moved-section stubs (old anchors are linked from other skills; PR #250 edits the file). Splitting the 42-file bundle (dim7: structure of shared references).

## Edge cases

- A run with one Dropped and one BLOCKED candidate: both listed in the verdict reason, K counts both.
- The user cancels at Phase C: same Verdict form as nothing-filed.

## Done when

- Phase F opens with the nothing-filed branch; the Phase C count line reconciles; Phase B3 note and 🔴 GATE heading present.
- `tools/a17-create-bug` test passes and pins R1-R10; every ledger row has a fix location or an out-of-scope reason.
- `bash scripts/run-test-suites.sh` passes; `node tools/sdd-gate/check.js` ok; helix `token-budget: pass`.
