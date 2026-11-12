# Plan — after14-catch-ai

## Files

- `skills/catch-ai-workflow/SKILL.md` — Must-read step-9 bullet (`:246`): R1 layer 5 for every audit, R2 document mapping of layers 1–7, R3 test-run branch. Byte offset inside the same file (R5).
- `skills/catch-ai-workflow/reference.md` — only if the offset needs it.
- `references/qa-evidence-coverage.md` — not changed: `:64` already delegates the mapping to the skill.

## Options weighed

- A. Exempt document audits from layer 5 — rejected: weakens a gate.
- B. Let catch-ai file a bug — rejected: breaks `SKILL.md:234` and the CHECKPOINT.
- C. Map layer 5 to the audit (matrix Priority + named create-bug hand-off) — chosen: same agreement checks, filing stays in create-bug.
- D. Inline the session-start rule to save its read — rejected: token-diet R5 keeps it in one shared file.

## What could break

- skill_lint one-hop links: the gate link stays in the bullet.
- A verifier reading the mapping as dropping a layer: every layer number is written out.
