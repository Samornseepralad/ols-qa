# Spec — after-14 install question order (T9 lane)

Evidence: ols-qa-evidence `origin/main` `evals/helix-skill-eval-2026-11-12-after14/` — `GATE.md` helix row (P1 1), `verify/helix.json` `helix#s2-0` CONFIRMED with quotes `skills/helix/SKILL.md:18`, `:50`, `references/session-start-context.md:6`, `:10`.

## Root cause

`session-start-context.md` step 2 asks the install question, and step 3 continues the workflow on "no (or no answer)". Nothing says the question must be asked alone or before the skill's own first question, so the router can ask it and its menu / route question in one reply, against `SKILL.md:50` "ask exactly one question". The verifier grepped the bundle and found no ordering rule.

## Rules

- **R1** When a context skill is missing, the install question must be asked first and alone: that reply asks nothing else, and the skill's own first question (menu, route or intake) waits for the user's next message. Source: `verify/helix.json` `helix#s2-0`; `skills/helix/SKILL.md:50`.
- **R2** A next message that does not answer the install question must count as no, and the question must not be asked again this session. Source: `session-start-context.md:10` ("On no (or no answer) … Do not ask again this session").
- **R3** The change must not remove or weaken the install question, its two reasons, the "free plugins" note or the NEVER line (unchanged text). Source: global rule 7; helix `rule-line-register.json`; owner T6 rule (ask to install, explain why).
- **R4** `references/session-start-context.md` bytes after ≤ before (1,042): it is read by every Helix skill. Source: owner rule "every skill update keeps net tokens per session minimal".
- **R5** `skills/helix/SKILL.md`, the menu and routing stay unchanged. Source: dispatch scope (only session-start-context.md named).

## Done when

- R1: the file states "first and alone" and that the skill's first question waits for the next message; new test passes.
- R2: "does not answer it counts as no" and "Do not ask again this session" present.
- R3: NEVER line byte-identical; both reason bullets present.
- R4: `wc -c` ≤ 1,042.
- R5: `git diff --stat` touches no `skills/` file.
