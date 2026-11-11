# Intent — r11 skill fixes, group 2 (catch-ai, testing-ticket, helix, tc-api-prep)

Owner request (11/Nov/2026, relayed by the main thread): apply the round-9 review fixes to four skills: catch-ai-workflow, testing-ticket-workflow, helix and tc-api-prep-workflow. A parallel lane covers create-bug, tc-fe-prep, tc-review and retest-bug, so none of those files is touched here.
Why: the after-9 static review (`evals/helix-skill-eval-2026-11-10-after9/exam/<skill>.json`, evidence repo `ols-qa-evidence`) and the follow-up investigation found contradictions and missing branches in skill text. Three are P1: a mid-run wait in testing-ticket, a wrong "ols-qa only" label in helix, and Test.md never offered in tc-api-prep.
Method: re-read every cited line before an edit. Edit only where the claim holds. Keep every rule an exam item checks. Respect each frozen-text and line-cap test in `tools/`.
Constraints: skill text only; no new tool, dependency or cost; rule text in English; no existing passing test is changed without an owner decision.
