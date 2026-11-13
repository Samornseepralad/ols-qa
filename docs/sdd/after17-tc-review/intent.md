# Intent — after17-tc-review

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Sweep-and-fix lane for `tc-review-workflow` (owner 13/Nov/2026: "แก้ให้ครบค่อยรัน", then "มันต้องไม่มีปัญหาอะไรเหลือเลย"): fix every P0–P3 finding and every darwin deduction the after-11..after-15 scorers gave this skill, and every remaining instance of those patterns in the current bundle, in one pass before the next round.

## Why

Single-finding fixes (after-14..after-16) closed one P1 per round while the same pattern types stayed elsewhere in the bundle: the thread go-ahead given before the final text is seen, vague or inapplicable read triggers, a layer gate mapped by number only, a source sweep without failure branches, config writes without a yes, rule rows with no reason.

## Constraints

Never remove or weaken a gate, approval, evidence rule or MUST/NEVER/🔴/STOP/GATE line; reworded rule lines are listed for owner approval at sync. Shared files: behaviour unchanged for every other skill; files in another skill's mandatory read set stay byte-neutral or smaller. Net session tokens for every skill do not rise. Text pinned by `tools/*/check.test.js` stays. No new cost.

## Reviewed by owner on 2026-11-13

Owner set the sweep scope in the sweep brief the same day ("do not ask questions: decide with the best-sourced option").
