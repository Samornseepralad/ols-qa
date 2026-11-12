# Spec — after14-catch-ai

## Problem

1. Verified P1 (`verify/catch-ai-workflow.json` `#s2-0`, CONFIRMED): `references/qa-evidence-coverage.md:73` layer 5 says "a minor-issue verdict carries a linked Lowest/Low/Medium bug"; `skills/catch-ai-workflow/SKILL.md:234` says "MUST NOT file a Jira bug from this workflow"; `SKILL.md:246` keeps layers 4–7 "as written; none skipped" for a document audit. A PWMI audit can never turn layer 5 green, and `qa-evidence-gates.md:70` requires the gate green before the audit is shown.
2. Tool calls: median 11.0 (after-10) → 12.5 (after-13) (`GATE.md:32`; run headers in `runs_clean/catch-ai-workflow/with_skill-*.md`: after-10 9/11/9/14/11/12, after-13 9/11/13/15/13/12). Two new mandatory reads since after-10 (`git diff 3986651 2662068` in helix): (a) `SKILL.md:20` session-start line — 5 of 6 after-13 runs report it, 0 of 6 after-10 runs; (b) the qa-evidence split (token-diet R3) moved the pre-delivery gate into `qa-evidence-coverage.md`, so `SKILL.md:246` "for every audit" now opens a second file at step 9.

## Rules

- **R1.** When the skill applies pre-delivery layer 5 to any audit, it must define layer 5 for an audit, because the workflow files no bug: the audit verdict follows `reference.md` § Verdict; each product-bug defect states its matrix Priority and is offered as a `create-bug-workflow` hand-off at the CHECKPOINT after step 9; an audited PWMI / FAILED case with no linked bug of the priority layer 5 names is a Defect in the audited work; no remark contradicts its status. It must not drop any agreement check of layer 5. (Sources: `qa-evidence-coverage.md:64` "that skill's SKILL.md maps these layers", `:73`; `SKILL.md:107-109`, `:234`; `reference.md:73-88`.)
- **R2.** When no test case is in scope (a document), the skill must state every layer 1–7 in `SKILL.md` — 1–3 as today, 4 (each claim names its row, no hedge), 5 per R1, 6 (nothing only in prose; exclusions in the `Scope:` line), 7 (adversarial re-read answered by pointer, any red back to layer 1, an unfinished part stated with its reason, the count line as handover) — so a document audit runs the gate without opening `qa-evidence-coverage.md`. None skipped. (Sources: `qa-evidence-coverage.md:64`, `:69-75`, `:77-90`; token-diet spec R3 "every skill must link only the parts it runs".)
- **R3.** When a test case is in scope, the skill must open the gate in `qa-evidence-coverage.md` and apply it as written, layer 5 per R1. (Sources: `SKILL.md:246`; `qa-evidence-gates.md:70`.)
- **R4.** The session-start line (`SKILL.md:20`, token-diet spec R5 "The rule lives in one shared reference linked from every skill") must stay; its read is an owner-approved cost, not removed here.
- **R5.** Net bytes of the touched skill files must be the same or lower than before (`SKILL.md` 24,992 · `reference.md` 13,703 · `qa-evidence-coverage.md` 15,034); no gate, evidence rule or approval step removed (token-diet R6).
- **R6.** Every ols-qa CI check in `.github/workflows/tests.yml` passes.

## Edge cases

- Document audit with a product bug in scope (the document describes a system under test): R1 matrix Priority still applies.
- Audit spans a document and a test run: a test case is in scope → R3.

## Done when

- `SKILL.md` layer 5 for an audit names no bug link the workflow must file (R1).
- A document audit has all 7 layers in `SKILL.md` and no step-9 read of `qa-evidence-coverage.md` (R2).
- A test-run audit still opens the gate file (R3).
- `SKILL.md:20` unchanged (R4).
- Bytes after ≤ before for each touched file (R5).
- CI suites green (R6).
