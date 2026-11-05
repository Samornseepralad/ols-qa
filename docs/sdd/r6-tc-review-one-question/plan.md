# Plan — r6 tc-review one question

## Files

- `skills/tc-review-workflow/SKILL.md:256` (add "except the missing mention id, item 1"), `:272-274` (item 1 rewrite).
- New test `tools/tc-review-one-question/check.test.js`: asserts item 1 contains the config source and the "only when config has none" clause, `:256` references the exception, the old unconditional "ask for the exact id" is gone, and item 3 text is unchanged.
- `tools/ask-guard` blocks the channel question for `fixed-destination` projects (`SKILL.md:258-260`); not edited. Check whether it also blocks a mention-id question; if it does, that is a separate finding, not changed here.
- Helix mirror synced by the main thread after merge.

## Options weighed

- A: item 1 reads config first, asks only when absent; `:256` names the exception (chosen; the owner brief and `:252` agree).
- B: delete item 1: rejected, the no-guess rule protects against a wrong mention.
- C: ask both questions every time: rejected, repeat of a question config answers (#0059).

## What may break

- skill-lint size; evals quoting item 1 or the one-question rule; `tools/ask-guard` tests (run them).

## Cost

Free tools only. New cost: none.
