# Plan — r6 catch-ai unsourced wording

## Files

- `skills/catch-ai-workflow/reference.md:71` — one paragraph rewritten (R1-R3).
- New test `tools/catch-ai-unsourced-wording/check.test.js`: asserts the new phrases in reference.md:71, the old phrase "defect in its own right" is gone, and `SKILL.md` still contains "never added to the Defect count".
- Helix mirror is synced by the main thread after merge (catch-ai changed in helix since 278b2ff, so confirm parity first with `scripts/helix-parity.sh`).

## Options weighed

- A: edit reference.md only (chosen; `SKILL.md:97` is the stricter, owner-backed text).
- B: edit both files: rejected, `SKILL.md` is already unambiguous.
- C: change the eval only: done elsewhere (owner decision); does not remove the wording conflict in the skill.

## What may break

- Evals or tests quoting "defect in its own right" (grep `tools` and `docs` first).
- skill-lint size; helix parity check.

## Cost

Free tools only. New cost: none.
