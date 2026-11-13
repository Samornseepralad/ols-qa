# Intent — after17-catch-ai

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Sweep-and-fix lane for `catch-ai-workflow` (owner 13/Nov/2026: "แก้ให้ครบค่อยรัน", "มันต้องไม่มีปัญหาอะไรเหลือเลย", "แก้ปัญหาทุกอัน ไม่ได้เลือกแก้แค่ P0 P1"): fix every P0-P3 finding, every darwin deduction and every grader complaint the after-11..after-15 scorers gave this skill (after-16 holds runs only, no scorings), plus every remaining instance of the same patterns in the current bundle, in one pass.

## Why

One-finding-per-round fixes (PRs 230-244) closed the P1s, but the same pattern types stayed elsewhere: gate branches with no failure path, entry points that disagree, long single-line rules, a verdict rule that two files state differently, one-product text in shared references.

## Constraints

Never remove or weaken a gate, approval, evidence rule or MUST/NEVER/🔴/STOP/GATE line; rewords are listed for owner registration. Shared files: behaviour unchanged for every other skill; edits listed. Net session tokens do not rise. Text pinned by `tools/*/check.test.js` stays. `metadata.proactive_triggers` untouched (owner: removed later across all skills). No new cost.

## Reviewed by owner on 2026-11-13

Owner set scope in the sweep brief the same day; no questions asked.
