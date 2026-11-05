# Intent — r9 tc-fe-prep: the 2.5a stop still states the Step 2a findings

Owner request (5/Nov/2026 9.00 PM): "ทำทั้งหมด" (fix p2r3, run the 8-skill eval, commit the evidence) after the after-7 re-test of tc-fe-prep.
Why: after the r8 sentence (PR #112) p2 passed 2 of 3 runs; p2r3 failed two expectations: it said "2a done, details deferred" and named no contradiction, and it never mentioned DEMO-150 (grade `after7/grade/tc-fe-prep-workflow.json`, p2r3 evidence).
Cause (hypothesis, supported by the run wording): the r8 sentence says "post only the request above", which can read as "say nothing about 2a at this stop"; `requirement-gates.md` also says no tables in chat for 2a.
Constraints: frozen Exit gate unchanged; skill text only; WORKFLOW.md frozen by tools/tc-fe-prep-frontmatter.
