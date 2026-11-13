# Intent — after-14: install question and the router's one-question rule

Owner request (12/Nov/2026, T9 fix lane, "ทำต่อตามแพลนจนเสร็จ ไม่ต้องถาม"): fix every CONFIRMED P1 of the after-14 round. helix has one: `helix#s2-0` (ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/verify/helix.json`).
Why: the router runs `references/session-start-context.md` first; its install question (line 6) does not block (line 10: "no answer" means continue), and no rule orders or merges it with the router's single question (`skills/helix/SKILL.md:50`), so a first reply can carry two questions.
Constraints: edit only `references/session-start-context.md` (named by the dispatch) and a new test; keep the install question, its reasons and the NEVER line; file bytes same or lower (it is read by every Helix skill).
