# Intent — after-13: fix every after-12 root cause so one eval round passes

Owner request (12/Nov/2026): "อย่าแก้วน ทำให้มันจบในรอบเดียว". The owner approved plan T7b by popup the same day, including both fixes that change passing tests and the harness fix that makes the gate stricter.
Why: the Helix skill eval failed four rounds in a row (after-9 to after-12) because each round fixed only the last round's symptoms. The after-12 data shows the same deductions in 3 of 3 scorings, so they are not reviewer noise (ols-qa-evidence `docs/helix-quality/wayfinder-token-diet/tickets/T7b-pre-round-root-cause-fixes.md`, one RCA file per skill in `tickets/rca/`).
Constraints: skill text only, plus the round's own `build_data.py` in ols-qa-evidence; never remove or soften a gate, approval step or evidence rule; mandatory-read tokens stay ≤ 50% of the token-diet spec baseline per skill; lanes are file-disjoint.
