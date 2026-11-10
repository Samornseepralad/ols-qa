# Intent — r10 testing-ticket: Always tier = WORKFLOW + preamble

Owner request (10/Nov/2026): "ต้องผ่านหมดทุกสกิล" — every skill must pass the exit gate (P0 = 0 and P1 = 0), deadline 3 PM the same day.
Why: the after-6 static review (`evals/helix-skill-eval-2026-11-05-after6/baseline/testing-ticket-workflow.json`, skill-creator, Progressive disclosure, `SKILL.md:37`) is P1: the Always tier is 5 files before the first reply.
Cause: `user-communication.md` and `helix-session-constraints.md` are listed in Always although `shared-preamble.md` already links both; `workspace-guide-discovery.md` is needed only at intake.
Constraints: frozen exit gate unchanged; skill text only; no rule is dropped — each file stays reachable at the step that needs it.
