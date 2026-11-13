# Intent — after-17: tc-api-prep-workflow sweep (every finding, every level)

Owner request (13/Nov/2026): "แก้ปัญหาทุกอัน ไม่ได้เลือกแก้แค่ P0 P1" — fix every P0-P3 finding, darwin deduction and grader complaint for tc-api-prep-workflow in after-11..after-16, plus every instance of the same pattern in the current bundle; ask nothing.
Evidence: ols-qa-evidence `evals/helix-skill-eval-2026-11-1{1..3}-after1{1..5}/{baseline,verify}/tc-api-prep-workflow*.json`. Most P1s were fixed by PRs 230-244 and stay fixed; this lane closes what the sweep of origin/main still shows.
Constraints: never remove or weaken a gate, approval, evidence rule or any MUST / NEVER / 🔴 / STOP / GATE line (rewords listed in the PR). Shared files: every other reader keeps its behaviour. Net session tokens for tc-api do not rise. `metadata.proactive_triggers` is untouched (separate cross-skill change).
