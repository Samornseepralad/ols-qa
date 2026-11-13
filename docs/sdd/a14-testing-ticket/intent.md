# Intent — after-14: close the testing-ticket confirmed P1s

Owner request (12/Nov/2026, T9 fix lane, "ทำต่อตามแพลนจนเสร็จ ไม่ต้องถาม"): testing-ticket-workflow failed the after-14 Exit gate on P1 = 3 (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/GATE.md:18`). Fix every CONFIRMED P1 at its root cause.
Why: `verify/testing-ticket-workflow.json` confirms `#0`, `#s2-0` and `#s3-0`. Time is out of scope this round (environment issue per the lane brief); score and expected items already pass.
Constraints: skill text only; never remove or weaken a gate, evidence rule or approval step; the testing-ticket mandatory reads (WORKFLOW.md) may not grow in bytes; shared references `no-wait-decision-gate.md` and `qa-evidence-capture.md` keep every rule the other skills rely on and are named in the PR.
