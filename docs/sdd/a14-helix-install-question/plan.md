# Plan — after-14 install question order

## Files

- `references/session-start-context.md` (R1–R4).
- `tools/a14-helix-install-question/check.test.js` (new rule-text test, R1–R5).

## Change

1. New step 3: ask the install question first and alone; the skill's first question waits for the user's next message; a message that does not answer it counts as no (R1, R2).
2. Old step 3 becomes step 4: "On no: continue …"; "(or no answer)" moves into step 3 (R2).
3. Offset bytes (R4): drop the quoted example from the host-without-skill-tool line, keep its rule ("skip and say so in one line"); trim the two reason bullets to the same meaning in fewer words. NEVER line untouched (R3).

## Options weighed

- Merge the install question into the router's one question: breaks `SKILL.md:50` "asks for one item" — rejected.
- Turn the install question into a notice (no question): drops the owner's T6 ask-to-install rule — rejected (R3).
- Add an ordering line to `skills/helix/SKILL.md:50`: fixes only the router, adds router bytes, and the other skills read the same file — rejected (R4, R5).

## What could break

- Other skills read the same file: the rule is generic ("the skill's first question"), so it holds for every workflow.
- helix parity: the helix copy is synced in the later sync step, not this lane.

Cost: none (text only, local tests). Other repos touched: none.
