# Spec — after-14 tc-fe-prep-workflow root-cause fixes

**Source:** ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/verify/tc-fe-prep-workflow.json` (3 CONFIRMED P1) and `GATE.md` (median 136 s vs ceiling 110 s); run files `runs_clean/tc-fe-prep-workflow/with_skill-p1r{1,2,3}.md`.

## Rules

- **R1** — When the Qase suite tree (or the Type/Status option lists) cannot be read and the user cannot paste it, tc-fe-prep must stop before writing any CSV and report the Qase export as **Not exported**; `references/dependencies.md` must not offer "export the CSV anyway", and must say the Step 6 suite gate wins. Source: `references/dependencies.md:62` vs `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md:162`; `references/dependencies.md:4` (a stated fallback is a valid path).
- **R2** — When a post-publish check fails, tc-fe-prep must PUT the corrected full ADF body to the same comment id (the `commentId` from Pattern C) and must not POST a new comment; a missing CSV is uploaded and only the footer link is fixed in that same comment. Max 3 rounds stays. Source: `WORKFLOW.md:362/:364` vs `references/jira-comment-post-review.md:18/:83-88`, `references/jira-linebreak-conversion.md:50`, `references/jira-fast-publish.md:116-118` (Pattern B POSTs).
- **R3** — The "complete" ADF example must contain the Remark block whenever its input requires one (a Type is absent, a Figma/PRD link is missing, or a BLOCKED case has no sheet row), and the template self-check must test for it. Source: `skills/procedures/tc-fe-prep-workflow/references/jira-comment-adf-template.md:49-53/:64-78`, `design-and-review.md:124/:149`, `WORKFLOW.md:314`.
- **R4** — Before the first Step 4f reviewer round, the author must check the draft against the defect classes that after-13 reviewers found one round at a time, so round 1 can be clean; each reviewer must report every defect it finds in one pass. The 4f loop, its fresh reviewer per round, its exit only on a clean round and its round reports stay unchanged. Source: run files p1r1 (4 rounds, 324 s), p1r2 (2 rounds, 227 s), p1r3 (4 rounds, 301 s): findings were step/expected misalignment, Unit TCs inheriting the browser shared prep, content not in the ticket, an AC outcome clause not checked, no clear step before typing into a pre-filled field, English where the glossary has Thai, quote marks inside test data; `design-and-review.md:261-301`.
- **R5** — Net bytes of the edited tc-fe files plus `references/dependencies.md` must not grow. Source: owner rule "keep net tokens per invocation same or lower".

## Edge cases

- Draft-only run (no post): R2 does not apply; R3 applies to the `.adf.json`.
- Post failed with no `commentId` (Pattern C non-ok): jira-fast-publish recovery rules apply, not R2.
- A defect class from R4 that the ticket itself makes moot (no pre-filled field) — the check is n/a, not a finding.

## Done when

- dependencies.md Qase row has no "anyway" fallback and names the suite gate.
- WORKFLOW.md Step 7 fail path says PUT to the same comment id; no "re-post" there.
- ADF template example has the Remark list before the Disclaimer; self-check has a Remark line.
- design-and-review.md 4f has the pre-dispatch self-check and the one-pass reviewer rule.
- Bytes after ≤ bytes before for the edited files; ols-qa CI suites, skill_lint, routing test, check-no-secrets and sdd-gate pass.
