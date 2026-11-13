# Spec — after16-tc-fe

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/` — `GATE.md:16,26`, `verify/tc-fe-prep-workflow.json` (`#s3-0` CONFIRMED), `data/after-15/summary.json` (`with_skill_duration_s` 262.5, n = 6), `runs_clean/tc-fe-prep-workflow/with_skill-p*.md`, and the run agents' transcripts (timestamps of each reviewer `Agent` call → result). Line numbers refer to ols-qa origin/main `3bbc3b18`.

## Part A — P1 `#s3-0` (dependency check vs real publish path)

- **R1 Session path passes the pre-step-1 check.** When the dependency check runs before step 1, the skill must accept either Jira REST credentials or a signed-in Jira browser session for publishing, because tc-fe-prep posts only through the session (`WORKFLOW.md:340,342`; `references/jira-fast-publish.md:10` "tc-fe-prep never curls"; `references/publish-options.md:8`). A failed REST check must not stop or BLOCK the run when the session path is there (source: verify `#s3-0`, `SKILL.md:107,112`, `references/dependencies.md:4,59`).
- **R2 Session checked where it is used.** The session is checked at Step 7, the point it is used. No session at Step 7 → the existing Step 7 failure branch (manual handoff, comment **Not posted**, `WORKFLOW.md:342`), never BLOCKED at step 1 (source: `references/dependencies.md:4` "or at the later point that section names").
- **R3 Shared row untouched.** `references/dependencies.md` is not edited by this lane (owned by the tc-api lane, which adds the browser-session fallback row for both skills). The tc-fe wording must hold whether or not that row exists.

## Part B — redundant reviewer rounds (owner 13/Nov/2026)

Measured in after-15 (start of `Agent` call → its result, run transcript timestamps):

| Run | Header `duration_s` | Reviewer rounds | Seconds per round | Notes |
|---|---|---|---|---|
| `with_skill-p1r1.md` | 528 | 2 | R1 40.7 (4 findings) · R2 35.6 (CLEAN) | R1 findings 1–3 = "two outcomes in one Expected line" (already step-0 self-check item 1); finding 4 rejected (glossary Thai asked in the verbatim AC column). R2 re-judged all 9 rows though only TC 4–8 Expected lines changed. One 183 s API stall. |
| `with_skill-p1r2.md` | 8323 (`pause: yes`) | 1 | R1 218.4 (CLEAN) | usage-limit pause; two 183 s API stalls |
| `with_skill-p1r3.md` | 251 | 1 | R1 25.3 (CLEAN) | — |
| `with_skill-p2r1.md` | 67 | 0 | — | stopped at a gate before Step 4 |
| `with_skill-p2r2.md` | 274 | 0 | — | stopped at Step 2.5a; one 183 s API stall |
| `with_skill-p2r3.md` | 73 | 0 | — | stopped at a gate before Step 4 |

Finding: reviewer rounds take 25–41 s (218 s once); the one repeated round (p1r1 R2, 35.6 s) re-checked rows round 1 had already cleared, and it was needed only because of a self-check miss plus one false finding. Most of the 262.5 s median is model generation (writing the ~30 KB working draft: 116 s in p1r1) and 183 s API stalls in 3 of 6 runs — not reviewer rounds. Part B removes the duplicate work; it will not alone bring the median under 110 s.

- **R4 Later rounds do not re-judge cleared rows.** When a round returns HAS-COMMENTS, the fresh reviewer of the next round must get the previous round's numbered findings and the IDs of the rows the fix changed, and must check: each finding fixed (or its rejection reason sound); every step-1 check on the changed rows; and the whole-draft checks (every AC/EC covered, nothing fabricated, Type, row order and IDs) on the whole draft. Rows the previous round's full list cleared and the fix did not touch are not re-judged row by row. On a thorough request every round stays a full review (source: p1r1 R2 35.6 s; `design-and-review.md:279,292`).
- **R5 Coverage reports re-run only when traceability changed.** After a 4f fix, re-run and re-post 4a–4d only when the fix added, removed, split or remapped a TC; otherwise the next 4f round covers the change (source: `design-and-review.md:205-206,232` read as re-running 4a–4e plus 4f every loop).
- **R6 No false findings from conflicting lines.** The step-0 self-check and the reviewer brief must say glossary Thai applies to every column the agent writes, and the AC/EC column stays verbatim, so a reviewer does not raise the AC column as a defect (source: p1r1 R1 finding 4, rejected; `design-and-review.md:270`, `WORKFLOW` "MUST NOT paraphrase AC/EC").
- **R7 Nothing distinct is dropped.** Every check still runs at least once on every row; the loop still exits only on a clean round; steps 3, 5, 6, 7 checkpoints, the no-subagent SELF-REVIEW path, Step 7.5 four-axis review and its "2 failed rounds → report and ask" rule stay unchanged. Kept as distinct (not duplicates): author 4a–4e vs independent 4f (independence is the point, `:261`), and Step 7.5 (runs on the published / approved set after Step 4.5 term changes).
- **R8 Size and rule lines.** No MUST / NEVER / 🔴 / STOP / GATE line removed or reworded. Bytes after ≤ before: `SKILL.md` 9,834; `design-and-review.md` 26,284. Offsets drop only restated text.

## Out of scope

`references/dependencies.md` (tc-api lane); API stalls and model generation time (environment); Step 7.5 round limit.

## Edge cases

- No REST token and no browser tool: run proceeds; Step 7 takes the failure branch (Not posted). Not a step-1 stop.
- A fix that touches every row: R4 makes the next round a full review in effect.
- A fix that remaps a TC: R5 re-runs 4a–4d.

## Done when

- `SKILL.md` Dependencies names the signed-in Jira session, says it is checked at Step 7, and says a failed REST check is not a stop.
- 4f step 4 carries the scoped next-round brief (R4); Step 4 / 4d carry the traceability condition (R5); self-check line excludes the AC/EC column (R6).
- `scripts/check-rule-lines.sh`-style check: no rule line cut; bytes ≤ before; every suite in `scripts/run-test-suites.sh` passes.
