# Intent — after-15: retest-bug-workflow fix from the after-14 Exit gate

Owner plan T9 repeat (12/Nov/2026, "ทำต่อตามแพลนจนเสร็จ ไม่ต้องถาม"): one fix lane per skill that failed the after-14 Exit gate, root cause from the round's verify files.
Why: retest-bug-workflow failed after-14 on one verified P1 (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/GATE.md:14`); score and expected items passed; time is out of scope this round (environment).
Constraints: edit only `references/result-quality-gate.md` (named in the dispatch line) and its checker `tools/result-gate/`; never remove or weaken a gate; bytes of the edited reference stay the same or lower.
