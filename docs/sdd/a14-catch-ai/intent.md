# Intent — a14: catch-ai passes the score row of the Exit gate

Owner T9 fix lane (12/Nov/2026): after-14 failed catch-ai-workflow on score, 83.8 vs best 85.2 (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/GATE.md:11`); P1 = 0.
Why: the three scorings cite the same concrete lines — the hedge grep at `SKILL.md:117` misses six root-cause § 4 terms (code check K5 FAIL twice), two `Verdict:` lines share one label, and the step-9 must-read is one 1,699-char bullet — plus single-scorer P2s on missing fallbacks and rank rules.
Constraints: edit only `skills/catch-ai-workflow/**` and `commands/catch-ai.md`; never remove or weaken a gate, evidence rule, approval step or MUST / NEVER / 🔴 / STOP / GATE line; net bytes of the touched files the same or lower; time row not addressed (environment issue this round).
