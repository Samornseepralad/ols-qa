# Spec — r12 close three after-9 P1 findings

## Sources
- **S1** `ols-qa-evidence` `origin/main:evals/helix-skill-eval-2026-11-10-after9/data/after-9/findings.json` —
  `create-bug-workflow#0` (where `bug-draft-template.md:3`), `tc-fe-prep-workflow#1` (where tc-fe-prep
  `WORKFLOW.md:162`), `tc-review-workflow#1` (where tc-review `SKILL.md:277`); `problem` and `fix` fields.
- **S2** Verifier re-read on `origin/main` (11/Nov/2026): create-bug#0 still present
  (`bug-draft-template.md:3-4`; `references/defect-report-completeness.md` §1 `:33-34`, §5 `:124`), deferred
  by `docs/sdd/r11-t9-uplift-a/spec.md:69`; tc-fe-prep#1 still present (Step 6 `WORKFLOW.md:160-257`;
  `skills/tc-fe-prep-workflow/SKILL.md:109` "Python 3 + `openpyxl` (xlsx only)"); tc-review#1 partial
  (`SKILL.md:270` run order "1 → 8 → 5 → 7 → 2 → 3", item 2 "after any item-5 tightening" `:278`), renumbering
  marked "Blocked — owner decides" in `docs/sdd/r11-t9-uplift-b/spec.md:64`.
- **S3** `references/defect-report-completeness.md` §1 table (Q4 *Why-failed* line, Q5 *Resolution options*
  with a named owner), §4 resolution table, §5 dev-question gate, MUST/NEVER rows.
- **S4** `references/dependencies.md:17` — `openpyxl` check `python3 -c "import openpyxl"`, install hint
  `python3 -m pip install --user openpyxl`, "warn the user and ask before falling back to CSV — never silently
  produce CSV when xlsx was requested".
- **S5** Owner delegation 11/Nov/2026 (relayed by the main thread): every decision below is an
  **agent decision under owner delegation 11/Nov/2026**.

## Rules

### create-bug-workflow#0 — the template is true to its completeness claim
- **R1** When the agent drafts a bug in the Helix default format, the template must carry a **Why failed**
  line that quotes the expected-result line verbatim and names the exact deviation (S3 §1 Q4). Agent decision
  under owner delegation 11/Nov/2026.
- **R2** When the agent drafts a bug in the Helix default format, the template must carry a **Resolution
  options** table with a named owner (Decided by) per option — the spec owner updates the expected result
  with no code change, or the dev changes the named surface — and must say QA picks neither (S3 §1 Q5, §4,
  MUST row "resolution-options table with a named owner per option"). Agent decision under owner delegation
  11/Nov/2026.
- **R3** When the §5 gate asks "Is the thing I actually fixed still broken?" and "What did you run?", the
  template must answer them: a **Fix status** line (a new report has no delivered fix — the line says so) and a
  **Role / account** line in Environment (role tag only, never a password) (S3 §5). Agent decision under owner
  delegation 11/Nov/2026.
- **R4** The template's opening claim must name the contract sections it satisfies, and
  `defect-report-completeness.md` §1 must point to the create-bug draft format the way it already points to
  the retest format — an addition only; no contract row is removed, softened or made conditional (S2, S5).

### tc-fe-prep-workflow#1 — Step 6 failure branches
- **R5** When any Step 6 workspace write fails (permission denied, disk full, missing path, any error), the
  system must STOP, report the exact error text and the path that failed plus which files were and were not
  written, leave no half-written file (a file whose write failed is removed), offer the approved draft as an
  in-chat copy, and must not start Step 7 with a partial file set; it continues only on the user's choice
  (retry after the cause is fixed, or take the in-chat copy). Marked with the skill's `🔴 GATE — STOP` style
  (S1 fix, S2). Agent decision under owner delegation 11/Nov/2026.
- **R6** When the user requested xlsx and `python3 -c "import openpyxl"` fails, the system must say that
  `openpyxl` is missing, offer the CSV pair instead, may show `python3 -m pip install --user openpyxl` only as a
  suggestion the user runs, must never install it itself, must never silently produce CSV, and writes nothing
  until the user chooses (S4). Agent decision under owner delegation 11/Nov/2026.

### tc-review-workflow#1 — Step 5 items in execution order
- **R7** When the agent runs Step 5, the numbered items must appear in the order they are executed:
  1 identity, 2 wording, 3 fit the limit, 4 thread webhook, 5 preview gate, 6 send + read-back; items 7 (wrong
  destination / wrong content) and 8 (revising a posted review) run only when correcting a sent message
  (old → new: 1→1, 8→2, 5→3, 7→4, 2→5, 3→6, 4→7, 6→8; S1 fix, S2). Agent decision under owner delegation
  11/Nov/2026.
- **R8** Every cross-reference to an old item number in the tc-review bundle (`SKILL.md`, `commands/tc-review.md`)
  must point to the new number, and the old "run order 1 → 8 → 5 → 7 → 2 → 3" sentence must be replaced by a
  consistent one (items 1–6 in order; 7 and 8 only when correcting). No rule text inside an item changes.
- **R9** The existing tests that anchor on the old item numbers (`tools/r11-skill-fixes-g1/check.test.js` R11,
  `tools/r7-tc-review-limit/check.test.js`, `tools/tc-review-one-question/check.test.js`) must be updated in the
  same commit to the new numbers with the same assertions on the item text; no assertion is dropped or loosened.
- **R10** tc-review `SKILL.md` must stay ≤ 403 lines and < 30000 bytes.

### Test
- **R11** `tools/r12-p1-three/check.test.js` pins R1–R10 and fails on unchanged `origin/main`.

## Edge cases
- A new bug whose expected result is not quotable is already a question, not a bug (create-bug Refusal-first);
  the Why failed line never replaces that rule.
- xlsx requested and the write itself fails after `openpyxl` imports → R5 applies.
- A tc-review item whose webhook file is missing (item 4) → continue from item 5 (preview), as before.

## Done when
- R1–R4: `bug-draft-template.md` has Why failed, Resolution options (Decided by per row), Fix status, Role / account; §1 of the contract points to it; no contract row changed.
- R5–R6: tc-fe-prep Step 6 has both `🔴 GATE — STOP` failure branches.
- R7–R10: tc-review Step 5 items 1–8 are in execution order, every pointer updated, cap held.
- R11: new test fails on `origin/main`, passes on the branch; all CI gates green.
