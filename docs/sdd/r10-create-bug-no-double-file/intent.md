# Intent — r10 create-bug: no second issue after a failed create

Owner request (10/Nov/2026): "ต้องผ่านหมดทุกสกิล" — every skill must pass the exit gate (P0 = 0 and P1 = 0), deadline moved to 3 PM the same day.
Why: the after-6 static review keeps one P1 on create-bug (`evals/helix-skill-eval-2026-11-05-after6/baseline/create-bug-workflow.json`, `WORKFLOW.md:312`): after a non-field create failure the issue may already exist, but step 4 switches path and can file it twice.
Cause: step 4 "MCP fails" goes straight to the fallback paths; nothing checks whether the failed call created the issue.
Constraints: frozen exit gate unchanged; skill text only; no new tool (uses the search the skill already lists).
