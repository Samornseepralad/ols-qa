# Spec — after-15 retest-bug-workflow fix: layer 1 accepts a Story fix retest

Evidence root: ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after14/` (`E/`). Lines are ols-qa `origin/main` at `7ff1cc5`.

## Source

- `E/verify/retest-bug-workflow.json` `#s3-0` CONFIRMED P1: `references/result-quality-gate.md:74` "Check: Story → `testing-ticket-workflow`, Bug → `retest-bug-workflow`" is mechanical (checker `SKILL_MISMATCH`); the skill accepts "a Task / Story whose fix is being re-verified" (`skills/procedures/retest-bug-workflow/WORKFLOW.md:141`, `skills/retest-bug-workflow/SKILL.md:89`) and a red layer blocks the verdict (`execute-and-evidence.md:274`). So every Story retest is blocked at layer 1.
- Root cause: `tools/result-gate/check.js:50` `TYPE_SKILL = { story: 'testing-ticket-workflow', … }` and `:244` refuse any other skill for a Story. The mapping comes from `references/skill-routing.md` § *Jira issue type → skill*, which is scoped to unattended runs where no human picked the workflow (`skill-routing.md:28`); layer 1 applies it without that scope.
- What layer 1 stops: a Story run without the repository's testing workflow, so none of its gates ran (#0174, `result-quality-gate.md:73`).

## Rules

- **R1** When a result line's ticket type is Story and its `skill` is `retest-bug-workflow`, the checker must accept the line only if it carries a non-blank `fix_ref` (the fix being re-verified: PR, commit, or `KEY#comment-id` of the fix claim). Without `fix_ref` it must still report `SKILL_MISMATCH`, and the message must name `fix_ref`. Story with `testing-ticket-workflow`, Bug, and unmapped types keep their current behaviour. Source: `#s3-0`; #0174.
- **R2** `result-quality-gate.md` layer 1 and § *Result line* must state the R1 exception and the `fix_ref` field. Source: `#s3-0`.
- **R3** `references/skill-routing.md` and its guard test stay unchanged (the owner-confirmed unattended mapping is not edited). Source: `skill-routing.md:30-35`, `tools/skill-routing-guard/skill_routing_map.test.js`.
- **R4** Bytes of `result-quality-gate.md` after ≤ before (owner rule: net tokens per session not higher). No gate, STOP or MUST/NEVER line is removed.

## Edge cases

- A first-time Story test run with `retest-bug-workflow` and no fix to re-verify: no `fix_ref` → still `SKILL_MISMATCH` (#0174 guard kept).
- Task: no confirmed mapping; unchanged (skill must be recorded).
- `fix_ref` on a Bug line: ignored.

## Done when

- `node tools/result-gate/check.test.js` has a failing-first test for R1 (Story + retest + `fix_ref` → no violation; without → `SKILL_MISMATCH` naming `fix_ref`) and passes.
- Layer 1 and the field table name `fix_ref`; `wc -c references/result-quality-gate.md` ≤ before; all ols-qa suites pass.
