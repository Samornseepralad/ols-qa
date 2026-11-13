# Intent — after17-tc-fe

Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Sweep-and-fix lane for `tc-fe-prep-workflow`. Owner 13/Nov/2026: "แก้ปัญหาทุกอัน ไม่ได้เลือกแก้แค่ P0 P1" and "มันต้องไม่มีปัญหาอะไรเหลือเลย". Fix every finding (P0–P3), darwin deduction and grader complaint the after-11..after-15 scorers gave tc-fe that is still present in the current text. Owner also asked to cut redundant tc-fe reviewer rounds; that part landed in after16-tc-fe (`bf1f32f8`) and stays as is.

## Why

ols-qa-evidence origin/main `24eafa3`, `evals/helix-skill-eval-2026-11-1*-after1{1..5}/baseline/tc-fe-prep-workflow*.json` and `verify/`, `grade/`: 220 findings (26 P1, 101 P2, 93 P3). Most are fixed on ols-qa `e5c8b164`; 41 rows remain.

## Constraints

No MUST / NEVER / STOP / GATE / 🔴 line removed or reworded. Owner decisions left untouched: `metadata.proactive_triggers`, must-never restatements, any rule-line reword. Shared files stay at or under their current bytes. No new cost.
