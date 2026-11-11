# Intent — r12 retest-bug: close after-9 P1 findings #0 and #1

Owner request (11/Nov/2026): "ต้องแก้มาทั้งหมด ไม่รอเรา" — every decision delegated to the main thread.
Why: the after-9 independent review raised two P1 findings on retest-bug-workflow, and a verifier confirmed both still present on main:
`retest-bug-workflow#0` (rules restated in up to four places) and `retest-bug-workflow#1` (delegated-round clause skips the approval wait on loose cues).
Constraints: skill text only; no rule weakened; no behaviour change for #0; shared `references/` files untouched; create-bug, tc-fe-prep and tc-review files untouched (parallel lane).
