# Spec — after-14 create-bug (T9 lane)

Evidence (ols-qa-evidence `origin/main`): `evals/helix-skill-eval-2026-11-11-after10/` (A10) and `evals/helix-skill-eval-2026-11-12-after13/` (A13): `GATE.md`, `verify/create-bug-workflow.json`, `baseline/create-bug-workflow{,-s2,-s3}.json`, `grade/create-bug-workflow.json`, `keys/create-bug-workflow.json`, `runs_clean/create-bug-workflow/`. Token measure: `docs/helix-quality/wayfinder-token-diet/graph_v2.py`.

## Findings the rules rest on

- **P1-a (verified, `verify/create-bug-workflow.json` #s2-0).** `SKILL.md:42` makes `references/result-quality-gate.md` ("Every layer is mandatory, every round, every lane", `:6`; `check.js` on `results.jsonl`, `:30`) a create-bug gate. No create-bug file says which layers apply when filing; the gate's Used-by list (`:255-262`) omits create-bug; `shared-preamble.md:10` scopes it to skills that write a test verdict.
- **P1-b (verified, #s3-0).** `phase-d-create.md:39-46`: the search-before-retry branch covers MCP failures only. The JXA (`:44`) and REST (`:45`) fallbacks have no branch for their own non-field failure (5xx, 401, timeout); only GitHub has "a timeout can still create it — never file twice" (`:24`).
- **Score drop.** `darwin_total` = structural + dim8 × 2.3. Structural A10 63.5/66.9/62.3, A13 63.5/62.7/63.9 — median 63.5 both. With-skill dim8 (via keys): A10 9,9,9,9,9,8 (8.83), A13 8,8,8,8,7,8 (7.83); −1.0 × 2.3 = −2.3 = 83.8 → 81.5. Every A13 run passed every expectation (13/13); the grader reasons name: "extra comment-scope and Likely questions" (p1r1), "four follow-up questions" (p1r3), "six questions", "STOPPED marker before the confirm block" (p2r2), "builds a DEMO-210 browse URL that was not in the input" (p2r1, p2r3). In `runs_clean/.../with_skill-p1r1.md` each open question is written 2–3 times (B3 record table, draft summary line, a prose paragraph after the block).
- **Structural deductions in create-bug files, raised in ≥ 1 A13 scoring:** Phase C has no cancel branch (s1, s2, dim3); confirm-block arithmetic ignores B3 drops (s3); B3 heading and the pre-flight stop lack 🔴 markers (s1, s3, dim4); "Run the check … before step 1" vs step 1 "First" (s1, dim2); `SKILL.md:47` gives six references only "per the index" and two of them are scoped to test rounds (s1, s2, s3, dim5/6); no-create-before-confirm restated in `WORKFLOW.md:31` and `:197` of the same file (s1–s3, dim7); JXA fallback has no endpoint or call shape (s3); GitHub "repo exists" has no command (s2); Phase F names no read call (s3); template `Root cause:` has no confidence label (s2); a contradictory pair of observations has no create-bug branch next to "never reproduce" (s2).

## Rules

- **R1** When the filing run reaches a verdict or label, create-bug's own files must say which `result-quality-gate.md` layers apply when filing, the create-bug step that runs each, and that the test-round layers and `check.js` do not apply because filing runs no case and writes no `results.jsonl`. `SKILL.md` must point at that map instead of making the whole test-round gate a create-bug gate. No layer that applies is dropped. Source: P1-a; `result-quality-gate.md:64-225`.
- **R2** When a JXA or REST create fails with a non-field error (5xx, 401, script error, timeout), the system must search for the approved summary with no status filter before any retry, exactly as after an MCP failure; found → record the key and go to Phase F; none → show the error verbatim and retry nothing until the user approves; search cannot run → STOP. Source: P1-b; `phase-d-create.md:22-27`, `:39-46`.
- **R3** Every open question of a candidate (B2 comment scope, B3 reporter questions, A3 Priority choice) must be asked once, inside the Phase C confirm block, and not repeated in prose around it. No question required by a gate is dropped. Source: A13 grade reasons p1r1, p1r3, p2r2; `phase-b2-board-check.md:23` "ask once".
- **R4** A link in a draft or report must come from the input or from tool output; a missing link is written as pending from the reporter, never built from a domain and a key. Source: A13 grade p2r1, p2r3; `WORKFLOW.md:107` (nothing comes from outside the reporter's input).
- **R5** Phase C must give the cancel branch, and its Board check line must count B3 drops. Source: A13 s1/s2 dim3, s3 dim2.
- **R6** The B3 heading carries 🔴 GATE and the pre-flight failure carries 🔴 STOP; the Dependencies line must not compete with step 1 for "first". Source: A13 s1/s3 dim4, s1 dim2.
- **R7** `SKILL.md:47` gives every listed reference a trigger, and says that customer-escape-prevention and round-time-contract are test-round files not applied when filing (the links stay — skill-lint `must-read-depth`, `tools/skill-lint/lint.js:8-9`). Source: A13 s1/s2/s3 dim5/6.
- **R8** Specific commands: GitHub repo check `gh repo view <owner/repo> --json name`; Phase F reads `gh issue view` / `getJiraIssue`; the JXA fallback names its endpoint and post-create read; the template's root-cause line carries its confidence label (`references/root-cause-investigation.md` §4); contradictory observations go to the reporter or testing-ticket, never a self re-run. Source: A13 s2/s3 dim5.
- **R9** The duplicate confirm-gate sentence at `WORKFLOW.md:31` goes (the gate stays at `:160`, `:197` and `phase-c-confirm.md`). Source: A13 s1–s3 dim7.
- **R10** No gate, STOP, approval step, evidence rule or link is removed. Net bytes a filing run must read stay ≤ before: the create-bug files every run opens (all own files except `worked-example.md`: 43,650 bytes at `9eb14076`) plus `result-quality-gate.md` (17,677 bytes), which `SKILL.md:42` required before any verdict — 61,327 bytes; graph_v2 `mandatory_total` ≤ 6,563 tokens. Added text is offset where the bundle repeats itself. Source: owner rule "keep net tokens per invocation the same or lower" (T9 brief).

## Out of scope (shared files — reported to the coordinator, not edited)

`references/agent-rationalizations.md:12` (attach-before-embed for new FE bugs), `references/defect-report-completeness.md:7` (scope line), `references/workspace-guide-discovery.md:53` vs `helix-session-constraints.md:10`, `references/non-pass-challenge-gate.md:115` (Thai template), `commands/create-bug.md:3` (description), and the `phase-e-falsification.md` file name (rename needs owner approval, global Rule 5).

## Done when

- R1: a layer map lists all 20 layers (apply / not apply + step); `SKILL.md` no longer says the whole gate runs before a verdict.
- R2: `phase-d-create.md` has one failure branch covering MCP, JXA and REST with search-before-retry.
- R3, R4, R5, R6, R8, R9: the named lines exist / are gone (grep).
- R7: no "per the index" in `SKILL.md`; skill-lint 0 new violations.
- R10: per-run read bytes ≤ 61,327 (own files opened + any shared gate the stub requires in full); graph_v2 ≤ 6,563; every ols-qa CI check passes.
