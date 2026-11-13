# Tasks — after17-retest

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | PWMI in 6a, 8c, config template, handoff enums | R1 | `grep -c "FAILED or BLOCKED" comment-and-post.md` = 2 | 0; four verdicts in templates |
| 2 | Notify correction channel-neutral; resend stop | R2 | `grep -c "Discord message" closeout-and-notify.md` = 1 | 0; resend names its stop |
| 3 | Login blocks one copy; `<log-dir>`; agent wording; lane browser; advisor host | R3 | `grep -c "/tmp/" parallel-test-lanes.md` = 4 | 0; blocks only in parallel-test-lanes §3 |
| 4 | gotchas, fix-intake, Design ref, fallback, 7d map, worked example | R4 | worked example API has no `Evidence` section | test passes with it |
| 5 | Portable/neutral shared text | R5 | `grep -c CONTENT_ADMIN qa-evidence-capture.md` ≥ 1 as the canonical list | guide-sourced |
| 6 | Shared-rule agreement | R6 | `grep -c "FAILED WITH\|could not verify" closeout-and-notify.md` = 0 (short list) | pointer to one list |
| 7 | Cheat-sheet + Figma → links; QA item timing | R7 | `grep -c "cosmetic / typo" WORKFLOW.md` = 1 | 0 |
| 8 | SKILL + command | R8 | `grep -c "before any tool call" SKILL.md` = 1 | 0 |
| 9 | 6c item 0 whole-body checks | R9 | item 0 checks only fix-added sentences | whole body, run count, placeholders, not-tested |
| 10 | Bytes, token budget, suites, sdd-gate | R11 | — | all pass; rewords listed |
