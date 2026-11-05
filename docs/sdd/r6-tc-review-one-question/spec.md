# Spec — r6 tc-review: the notify step asks exactly one question; the mention id comes from config

Status: draft for owner review · from A-results A2 row 5 (partly confirmed, ambiguous) · skill text only · no env access

## Why

`skills/tc-review-workflow/SKILL.md:255-257` says that when the project has a channel in config the system must never ask which server, group or channel and
"Ask exactly one question: which thread of that channel to post in". The same section, item 1 at `:272-274`, says "Identity for a mention: ask for the exact id (Discord user id, Jira account id, etc.) rather than guessing".
The project config already carries the mention rule: `references/{PROJECT}-guide.md` section "TC review notify" has "channel placeholder, thread rule, mention rule" (`:251-252`).
Read literally, a run asks two questions (thread, then mention id) and may re-ask something config already answers (the repeat-question defect named at `:255`, #0059).

## Rules

- **R1** — When a mention is needed, the system must take the mention id from the project config section "TC review notify" and must not ask the user for it.
  (source: `SKILL.md:251-253,272-274`)
- **R2** — When the config has no mention id for the person to be mentioned, the system may ask for the exact id (never guess from a display name; never invent a channel or thread id). This is the single allowed exception to the one-question rule.
  (source: `SKILL.md:272-274`; the exception wording is new)
- **R3** — The one-question rule at `:256` must mention the R2 exception explicitly, so both sentences agree: one question (which thread), plus at most the missing-mention-id question only when config has none.
- **R4** — The thread question stays: offer threads already used for this ticket or recorded in config; the answer is the go-ahead only after the preview of item 2. (source: `:256-258,275-278`)
- **R5** — Item 3 stays: read the response back and confirm a requested mention actually resolved. (source: `:279-280`)
- **R6** — "wrong id pings nobody or the wrong person" reasoning in item 1 stays, since it explains the no-guess rule. (source: `:272-274`)

## Owner questions

- Q1: When config names a mention rule that says "mention nobody" (or has no mention rule at all), the system sends without a mention and asks nothing. Is that right? No source states it either way; this is a reading of `:279` ("a requested mention").

## Done when

- R1-R3: `SKILL.md` item 1 says the id is taken from config; ask only when config has none; `:256` names it as the sole exception.
- R4-R6: those sentences unchanged.
- `SKILL.md` stays under the skill-lint line limit (401 lines, 28574 bytes now; net change <= +2 lines).
- `bash scripts/run-test-suites.sh` exits 0.
