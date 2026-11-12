# Intent — a14-create-bug

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Owner, 12/Nov/2026 (T9 fix lanes after the after-14 round): "ทำต่อตามแพลนจนเสร็จ ไม่ต้องถาม" — fix the root cause of each failing Exit-gate row of create-bug except time.

## Why

After-14 `GATE.md`: create-bug scores 81.9 vs best-earlier 84.1 and passes 12.67/13 expected items. The with-skill run p2r3 answered a Thai user with English confirm questions, falsification record and notes; all three scorers rate dim7 (architecture) 7/10 and cite concrete create-bug lines.

## Constraints

Free tier only. Edit only `skills/create-bug-workflow/**`, `skills/procedures/create-bug-workflow/**` and a new test. Never remove a gate, approval step, evidence rule or a MUST / NEVER / 🔴 / STOP / GATE line. Mandatory-read tokens and own-file bytes same or lower.

## Reviewed by owner on 2026-11-12

2026-11-12 — owner approved the T9 fix-lane plan in chat; spec.md may now be written.
