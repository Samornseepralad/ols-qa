# Intent — r12 close three after-9 P1 findings (create-bug, tc-fe-prep, tc-review)

Owner request (11/Nov/2026, delegated to the main thread: "ต้องแก้มาทั้งหมด ไม่รอเรา"): close the three P1
findings of the after-9 evaluation that a verifier found still present (or partial) on `origin/main`.
Source: `ols-qa-evidence` `evals/helix-skill-eval-2026-11-10-after9/data/after-9/findings.json`, fids
`create-bug-workflow#0`, `tc-fe-prep-workflow#1`, `tc-review-workflow#1` (fields `problem`, `fix`).

Why: each one leaves an executing agent without a defined next action — a draft template that claims to
satisfy a completeness contract it cannot pass, an export step with no branch for a failed write or a
missing xlsx library, and a notify list whose numbering is not the order it must be run in.

Constraints: skill text plus one new rule-text test; no new tool dependency, no cost; `retest-bug` files are
owned by a parallel lane and are not touched; `references/defect-report-completeness.md` is not weakened;
tc-review `SKILL.md` stays ≤ 403 lines.

New spend: NO. Touches another repo: NO.
