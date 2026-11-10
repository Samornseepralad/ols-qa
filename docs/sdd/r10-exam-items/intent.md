# Intent — r10 exam items: close the with-skill misses that come from skill text

Owner request (10/Nov/2026): every Helix skill must pass the frozen exit gate in one round, including 100% of with-skill exam items.
Why: after-6 graded 11 with-skill misses (`evals/helix-skill-eval-2026-11-05-after6/grade/*.json` + `keys/*.json`). One (tc-fe-prep p2, 2a.3 order) is already fixed (ols-qa PRs #111–#114). This lane checks the other ten.
Method: for each miss, read the run output, the grader's evidence, and the skill text the run followed (helix `8e10230`, identical to ols-qa main for every file below). A miss is a **gap** when the skill text is silent, ambiguous, or tells the agent to do what the grader failed. It is **variance** when the rule is already stated plainly and other runs of the same prompt followed it; variance gets no edit.
Constraints: exam items and the exit gate stay frozen; skill text only; no new tool or dependency; `skills/tc-review-workflow/SKILL.md` stays ≤ 403 lines (`tools/tc-review-one-question/check.test.js:56`); lane L7 owns `create-bug-workflow/WORKFLOW.md` step 4 and `testing-ticket-workflow/SKILL.md`, so neither is touched.
