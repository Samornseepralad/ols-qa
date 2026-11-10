# Tasks

| # | Task | Rules | Check that fails first | Done when |
|---|------|-------|------------------------|-----------|
| T1 | tc-review: non-conflicting rule never named; inferred boundary marked confirm | R1 R2 | `grep -n "closing or self-check" skills/tc-review-workflow/SKILL.md` and `grep -n "inferred from the AC" …` find nothing | both phrases present; file ≤ 403 lines |
| T2 | catch-ai: sum-only match states the Defect count against the claim | R3 | `grep -n "only the sum" skills/catch-ai-workflow/SKILL.md` finds nothing | exit rule names the matched tally and the Defect count |
| T3 | helix router: one question, one item | R4 | `grep -n "into one sentence of that question" skills/helix/SKILL.md` finds the old text | BLOCKED on owner (conflicts with r7 R6); if approved: old text gone, new sentence present, r7 R6 and its test updated |
| T4 | retest: Date source; mixed Design ref form | R5 R6 | `grep -n "date the cases ran" …/comment-and-post.md` finds nothing | both present |
| T5 | tc-fe-prep: Qase field values out of the term table | R7 | `grep -n "Qase Type" …/design-and-review.md` finds nothing in Step 4.5 | bullet present |
| T6 | testing-ticket: VPN plan line carries stop-and-report | R8 | `grep -n "stop and report" …/WORKFLOW.md` finds only line 128 | plan template line carries it |
| T7 | Gates | all | — | `bash scripts/run-test-suites.sh` green; `bash scripts/check-no-secrets.sh` clean on changed files |
