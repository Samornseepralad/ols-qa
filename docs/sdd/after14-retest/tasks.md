# Tasks — after-14 retest-bug-workflow fixes

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | 8a/8c branch for a transition not offered or a refused transition/assign | R1 | `grep -n 'not offered\|refused' closeout-and-notify.md` finds no 8a/8c branch | branch present; 8d/9/8e state defined; live yes for any other transition |
| 2 | 6c path for hosts without subagents | R2 | `grep -n 'cannot start subagents' comment-and-post.md` → none | reviewer prompt printed, verdict queued, approval waits for CLEAN; unattended holds |
| 3 | Lanes on hosts without subagents | R3 | `grep -n 'subagent' parallel-test-lanes.md` §4 has no host line | lanes run one after another, own lease each, manifest unchanged |
| 4 | Superseding source quoted char-exact in flag, remark, popup | R4 | p2r3 flag line paraphrased; 4i record line has no quote slot | 4i record line and 6d item 2 name the char-exact quote |
| 5 | Pre-dispatch check + one-pass reviewer request | R5 | 6c item 1 dispatches with no draft-side 8·0 check | 6c names the check and the one-pass request; CLEAN loop unchanged |
| 6 | Offset and bytes report | R6 | — | `wc -c` total after ≤ before; all CI suites pass |
