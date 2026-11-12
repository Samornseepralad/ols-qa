# Spec — after-14 helix router (T9 lane)

Evidence (ols-qa-evidence `origin/main`): `evals/helix-skill-eval-2026-11-11-after10/` (A10) and `evals/helix-skill-eval-2026-11-12-after13/` (A13), files `baseline/helix{,-s2,-s3}.json`, `grade/helix.json`, `keys/helix.json`, `runs_clean/helix/with_skill-*.md`; byte measure from `docs/helix-quality/wayfinder-token-diet/compare_tokens.py:85-109` (body after line 1 of each run file, median of 6). The A13 router text equals ols-qa `skills/helix/SKILL.md` at `ade53c10` (same blob as helix `2662068`).

## Findings the rules rest on

- `darwin_total` = structural total + dim8 × 23/10. A10 structural 65.1/65.1/65.1, A13 65.1/63.9/63.9 (median 63.9, −1.2). Only dim 2 Workflow clarity moved: A10 9/9/9, A13 8/8/9. Dims 1, 3, 4, 5, 6, 7, 9 are equal in all six scorings.
- dim8 (with_skill side via `keys/helix.json`): A10 8,8,8,9,8,8 (mean 8.17), A13 8,8,8,8,8,8 (−0.17 × 2.3 = −0.38). Only p2r1 moved, 9 → 8; grade reasons name no router defect.
- A13 dim-2 reasons: scoring 1 — "the must-read list (19 files) blurs which ones the router actually needs" (`SKILL.md:127`); scoring 2 — "dependency check is placed at the end of the file though it says 'before routing', and session-start step lives in another file, so the true step order must be assembled from three places" (`SKILL.md:139`, `:18`); scoring 3 (score 9, −1 in reason) — "Must-read list mixes 7 router reads with 8 files the router 'never opens'" (`SKILL.md:127`). No A10 scoring raised either point; both cited lines changed between helix `3986651` and `2662068`.
- Output bytes: A10 p1 2563/2895/2567, p2 7513/7094/4153; A13 p1 3198/2496/2335, p2 4272/4682/4495. Per-prompt medians fell (p1 2567 → 2496, p2 7094 → 4495); total 26,785 → 21,478 (−19.8%). The pooled median of 6 is the midpoint of max(p1) and min(p2): (2895+4153)/2 = 3524, (3198+4272)/2 = 3735. Router-owned prefix (before the shared `Using **…**` line) is 491–492 bytes in 5 of 6 p1 runs in both rounds; A13 p1r1 adds one 101-byte "context skills not loaded" line required by `references/session-start-context.md:4-11`.

## Rules

- **R1** When the router starts, `skills/helix/SKILL.md` must state the full start order in one line before Opening — session-start-context.md, then the Dependencies check, then Opening — and the `## Dependencies` section must come before `## Opening`. Source: A13 `baseline/helix-s2.json` dim 2 (`SKILL.md:18`, `:139`); `SKILL.md:139` "Check these before routing".
- **R2** The Must-read section must label the router's own reads and the links the router never opens as two separate lists, each with one header line, and must not repeat the "only when the workflow reaches it" clause on every line. Source: A13 `baseline/helix.json` and `helix-s3.json` dim 2 (`SKILL.md:127`).
- **R3** The change must not remove or weaken any gate, STOP, approval step, evidence rule or link: all 7 router reads and 8 deferred links stay, each with its trigger, and skill-lint `must-read-depth` stays at 0. Source: A13 `GATE.md:57`; `tools/skill-lint/lint.js:8-9`.
- **R4** `skills/helix/SKILL.md` bytes after ≤ before (13,003) and lines ≤ 155. Source: owner rule "keep net tokens per invocation same or lower"; `tools/r11-t9-uplift-b/check.test.js:48`.
- **R5** The dim8 −0.38 and the output-byte rise must not drive a router change: one run moved one grader point, and the byte rise is the pooled-median artifact above. Source: A10/A13 `grade/helix.json`, `runs_clean/helix/`.
- **R6** Routing text, the menu and `commands/helix.md` stay unchanged, so `node tools/skill-routing/routing.test.js` passes and the menu matches `commands/helix.md`. Source: lane scope (owner, T9).

## Done when

- R1: line 18 names the 3-step start order; `## Dependencies` precedes `## Opening`.
- R2: two labelled lists; 0 occurrences of "only when the workflow reaches it".
- R3: the same 15 link targets as before; skill-lint 0 violations.
- R4: `wc -c` ≤ 13,003; `wc -l` ≤ 155.
- R5: no edit justified by dim8 or bytes; numbers reported in the PR.
- R6: routing test 20/20; menu-text.md, skill-routing.md, commands/helix.md untouched.
