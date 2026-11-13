# Intent — after17-create-bug

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Owner, 13/Nov/2026: "แก้ปัญหาทุกอัน ไม่ได้เลือกแก้แค่ P0 P1" and "มันต้องไม่มีปัญหาอะไรเหลือเลย". Fix every finding (P1, P2, P3), every darwin deduction and every grader complaint that after-11..after-16 gave `create-bug-workflow`, plus every remaining instance of those patterns in the current bundle. Only a fix that would weaken a gate, or a file rename/delete, may stay open, and it is reported with evidence.

## Why

The a16 lane closed the two verified P1 of after-15 and part of the structural findings. A re-read of all 135 catalogued findings (11 P1, 49 P2, 75 P3) against origin/main `e5c8b164` shows the open remainder in `docs/sdd/after17-create-bug/spec.md`.

## Constraints

Never remove or weaken a gate, approval or evidence rule; every reworded MUST / NEVER / 🔴 / STOP / GATE line is listed in the PR. Net session tokens (helix `ci-token-budget.sh`) must not rise. Shared files that open PRs #250 (tc-fe) and #251 (retest) also edit are changed in separate commits based on those PR versions. No new cost; no other repo touched.

## Reviewed by owner on 2026-11-13

Owner set the sweep lanes to run without questions, lane brief 13/Nov/2026.
