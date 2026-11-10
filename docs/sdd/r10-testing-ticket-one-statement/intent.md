# Intent — r10 testing-ticket: one authoritative statement per rule

Owner request (10/Nov/2026): "ต้องผ่านหมดทุกสกิล" — every skill must pass the frozen exit gate (P0 = 0 and P1 = 0).
Why: the after-6 static review (`evals/helix-skill-eval-2026-11-05-after6/baseline/testing-ticket-workflow.json`, darwin, dimension 7 Architecture, `WORKFLOW.md:109`) is P1: rules claim "stated once where it runs" but the Figma comparison, login-by-command and AC/EC gate rules are restated in SKILL.md, WORKFLOW *Discipline*, the phase, *QA closing* and the MUST/NEVER table; copies can drift and cost context on every run.
Fix named by the review: keep one authoritative statement per rule, make every other place a one-line pointer, trim *QA closing* to checkbox + link.
Constraints: frozen exit gate unchanged; skill text only; no rule dropped and no wording weakened — every clause a pointer drops must already exist, or be moved, at the kept place; `SKILL.md` § Contents is not touched (another lane owns it).
