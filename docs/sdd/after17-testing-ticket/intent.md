# Intent — after17-testing-ticket

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Owner, 13/Nov/2026: "แก้ปัญหาทุกอัน ไม่ได้เลือกแก้แค่ P0 P1" and "มันต้องไม่มีปัญหาอะไรเหลือเลย". Sweep lane for `testing-ticket-workflow`: fix every finding (P0–P3), every darwin deduction and every grader complaint the after-11..after-16 rounds gave this skill, plus every other instance of the same pattern in the current bundle — in one PR pair, before the next round runs.

## Why

The after-11..after-15 scorings (ols-qa-evidence `evals/helix-skill-eval-2026-11-1*-after1{1..5}/baseline/testing-ticket-workflow*.json`, `verify/testing-ticket-workflow.json`, `grade/testing-ticket-workflow.json`) keep repeating the same P2/P3 items: stale step names, runtime- and product-specific wording, duplicated templates that already drift, statuses outside the verdict set, unbounded waits, dead "moved there" stubs and an example that lags the gates. after-16 has no testing-ticket scoring (stopped at 4/48 runs).

## Limits

Never remove or weaken a gate, approval or evidence rule; never cut a MUST / NEVER / 🔴 / STOP / GATE line; no file rename or delete; net session tokens per skill must not rise; other skills that read a touched shared file keep their behaviour.
