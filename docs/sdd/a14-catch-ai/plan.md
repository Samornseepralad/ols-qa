# Plan — a14-catch-ai

## Files

- `skills/catch-ai-workflow/SKILL.md` — L112/117 hedge pattern (R1), L131-133 + L215 closing hit rule (R2), QA closing Session verdict line (R3), L242 split into a list (R4, R5), L199 absent-layer sentence (R7), L247 defect-report-completeness parts (R8), L98 link only (R9), Dependencies row (R5).
- `skills/catch-ai-workflow/reference.md` — Verdict PASSED row: gap rank (R6).
- `commands/catch-ai.md` — L11 points to the Iron Law (R9).
- Shared references — not changed (dispatch names none).

## Options weighed

- Hedge list: (a) link § 4 only and drop the grep — rejected, the grep is the mechanical floor; (b) union in the grep, English with `-w` — chosen.
- Verdict clash: (a) edit `session-closing.md` — rejected, shared file not in the dispatch; (b) relabel the session block in the skill — chosen.
- Capture fallback: hand recount — rejected, unsourced; `dependencies.md` fallback — chosen.

## What could break

- K5-style checks read line 117: the pattern stays on that line.
- skill_lint one-hop links: every link kept.
- Byte budget: offsets from R9 and tighter wording in the split list.
