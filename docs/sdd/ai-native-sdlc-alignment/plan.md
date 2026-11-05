# Plan — AI-native SDLC alignment

Files touched (only after approval): `tools/sdd-gate/` (R1 intent check, R2 plan-drift warn), new `tools/sdlc-metrics/` (R4), new `tools/ci-band/` (R5), `docs/helix-eval-live-suite.md` (R3), `docs/sdd/_template/intent.md` (R1).
Data: none stored; all metrics are computed from `git log` and `gh run list` / `gh pr list`.
Libraries: none (Node ≥18 built-ins, `gh` already used). No cost.
Options weighed: (a) enforce R1 on all old folders — rejected, 23 folders exist without intent; only folders created after approval. (b) CI fail on plan drift — rejected for now, warn only until false-positive rate is known. (c) Run evals in CI — rejected, paid API.
What could break: `sdd-gate` false positives on docs-only PRs (mitigate: skip PRs that touch only `docs/`), `gh` rate limits in the metrics script (mitigate: 1 query per metric, limit 200).
Order: T1 template + R1 gate, T2 R2 warn, T3 R4 metrics, T4 R3 doc, T5 R5 band, T6 R6 report.
