# Intent — after-14: catch-ai passes the Exit gate

Owner T9 fix lane (12/Nov/2026): after-13 failed catch-ai-workflow on one verified P1 and on tool calls (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/GATE.md:13`, `:32`, `:45`).
Why: the document-audit mapping of the pre-delivery gate leaves layer 5 asking for a linked bug the workflow may not file, and every document audit opens a 15 KB reference only for layers it could state itself.
Constraints: edit only `skills/catch-ai-workflow/**` and `references/qa-evidence-coverage.md`; never remove or weaken a gate, evidence rule or approval step; net bytes of touched skill files the same or lower; the session-start rule (token-diet R5) stays.
