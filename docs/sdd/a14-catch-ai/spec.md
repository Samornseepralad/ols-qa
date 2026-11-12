# Spec — a14-catch-ai

Round after-14 (helix `6218253`, v1.5.192): catch-ai score 83.8 vs best 85.2 (median of 3), P1 = 0.
Evidence: `ols-qa-evidence` `evals/helix-skill-eval-2026-11-12-after14/baseline/catch-ai-workflow{,-s2,-s3}.json`.
Time row is out of scope (environment issue this round, per the fix-lane brief).

## Problem (scorer findings with a cited line)

1. All 3 scorers (dim5/dim7, code check K5 FAIL in s1 and s3): `SKILL.md:112` says the hedge list is "the same family" `root-cause-investigation.md § 4` bans, but the grep at `SKILL.md:117` lacks `cache issue`, `environment issue`, `flaky`, `intermittent`, `race condition`, `it works on my side` (`root-cause-investigation.md:128-130`). s2: the grep has no word boundaries (matches `unlikely`), and `SKILL.md:215` makes any hit outside quotes block closing, while `SKILL.md:198` itself requires writing `FAILED (intermittent, …)`.
2. All 3 scorers (dim5/dim7): `references/session-closing.md:63` closes with `Verdict: {COMPLETE | PARTIAL | BLOCKED}`; the audit report opens with `Verdict: PASSED | PWMI | FAILED | BLOCKED | No issue found` (`reference.md:170`, `SKILL.md:216`). Two lines share one label.
3. All 3 scorers (dim2): `SKILL.md:242` is one 1,699-char bullet carrying the whole step-9 gate mapping.
4. s1 P2 (dim3): the test-case branch of `SKILL.md:242` runs the gate "as written" though layers 1 and 3 name the out-of-repo capture tools (`qa-evidence-coverage.md:69-71`); no fallback is named. `dependencies.md` § Out-of-repo tools holds one.
5. s2 P2 (dim3): PASSED needs "no coverage gap is Blocker or Major" (`reference.md:77`), but nothing says how a gap is ranked (`reference.md:60`).
6. s3 P2 (dim3): layers whose evidence the audited run never recorded have no stated classification (`SKILL.md:186`, `:199`).
7. s3 P2 (dim5): `SKILL.md:247` says read `defect-report-completeness.md` before any defect write-up; its § 2 repro matrix and § 4 resolution options have no place in the report template (`reference.md:173-180`).
8. s1 P3 (dim7): the count-survives rule is restated at `SKILL.md:98` and `commands/catch-ai.md:11` beside the Iron Law (`SKILL.md:77`).

## Rules

- **R1.** When the skill names its hedge hunt, the rule-1 pattern must contain every term of `root-cause-investigation.md § 4` (`#hedges`) plus the skill's own extra terms, English terms matched as whole words (`grep -w`). It must stay on `SKILL.md` line 117. (Sources: `root-cause-investigation.md:128-130`; findings 1.)
- **R2.** When the closing check runs the rule-1 pattern on the draft, a hit fails only in a conclusion line, outside verbatim quotes, and without the label + artifact `root-cause-investigation.md § 4` requires ("Banned unless a label + artifact is attached"). (Sources: `SKILL.md:131-133`, `:198`, `:215`.)
- **R3.** When the QA closing block of `session-closing.md § 5` is written for a catch-ai run, its first line must be labelled `Session verdict:`; the report's `Verdict:` line is the audit verdict per `reference.md § Verdict`. (Sources: `session-closing.md:63`; `reference.md:170`.)
- **R4.** The step-9 must-read must be a list with one line per branch (layer 5, test case in scope, document, evidence topics); no layer dropped. (Sources: finding 3; `after14-catch-ai` spec R1–R3 content kept.)
- **R5.** When a test case is in scope and the capture tools are absent, the skill must point to the `dependencies.md` § Out-of-repo tools fallback (ask for the root; evidence that needs them is BLOCKED until they run), and list the tools under Dependencies. (Source: `dependencies.md:39`.)
- **R6.** A coverage gap must be ranked at the severity the uncovered item would carry if it were defective. (Sources: `reference.md:77`, `:90-91` Material part of the scope.)
- **R7.** When a gate layer's evidence is absent from the audit input, the classification must follow the "evidence not in the audit input" rule (a Question under coverage gaps) and the layer stays red for sending, named, never a blanket BLOCKED of the classification. (Source: `SKILL.md:196`, `:199`.)
- **R8.** When `defect-report-completeness.md` applies, its § 2 repro matrix and § 4 resolution options go under that defect in the report. (Source: `defect-report-completeness.md` § 2 "REQUIRED for every non-PASSED item", § 4.)
- **R9.** The count-survives rule is stated once in the Iron Law; other places link to it. The MUST row and the Rationalizations row stay. (Source: finding 8.)
- **R10.** Bytes of `SKILL.md` + `reference.md` + `commands/catch-ai.md` after ≤ before (40,154). No gate, approval step, or MUST / NEVER / 🔴 / STOP / GATE line removed.
- **R11.** Every ols-qa CI suite passes.

## Edge cases

- A flaky case: `FAILED (intermittent, 1 of 2) per run log` carries its label + artifact → not a closing hit (R2).
- Thai hedges have no word boundary: kept in a separate pattern without `-w` (R1).

## Done when

- K5 replica: each of the 14 § 4 terms is found on `SKILL.md:117` (R1).
- `SKILL.md` QA closing names `Session verdict:` (R3).
- No `SKILL.md` line over 700 chars in the Must-read section (R4).
- Bytes after ≤ 40,154 (R10); CI suites green (R11).
