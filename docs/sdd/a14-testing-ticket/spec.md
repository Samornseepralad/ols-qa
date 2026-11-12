# Spec — after-14 testing-ticket P1 fixes

Evidence (ols-qa-evidence `origin/main`, `evals/helix-skill-eval-2026-11-12-after14/`): `GATE.md:18`, `verify/testing-ticket-workflow.json` (3 P1 CONFIRMED). Line numbers below are ols-qa `origin/main` 7ff1cc5.

## Rules

- **R1 Delegated actions reconciled with the end-of-round gate.** When testing-ticket states its end-of-round approval gate (`WORKFLOW.md:84-86`, `execute-and-summarize.md:358-360`), it must also state the one exception the shared layer 19 already grants: an action the owner delegated by name, in this session, for this round, skips only the wait; the bundle list is still printed in chat and every later gate still runs. Loose cues still never skip it; the batched single approval stays the default. The text must link layer 19 and not restate its definition. (verify fid #0; `references/no-wait-decision-gate.md:95`; owner-approved scope of layer 19 for every workflow: `docs/sdd/r12-p1-retest/spec.md:14` D3 and `:32` R10)
- **R2 Smoke gate step number.** The pre-flight login smoke gate must cite *Run order* step 7, the step that holds it (`WORKFLOW.md:62`), not step 5 (Phase A intake, `WORKFLOW.md:60`). Root cause: the after-14 R5 renumbering (commit e7e5121 added step 1) left this one citation stale. Every other *Run order* step citation must be checked against the list. (verify fid #s2-0; `WORKFLOW.md:111`)
- **R3 Rows narrower than 1920 px.** When a plan runs a row at a width under 1920 px (a tablet or mobile row, `execute-and-summarize.md:238`), `references/qa-evidence-capture.md` must say how that row's evidence is judged instead of leaving it to the 1920 px floor no such row can meet (`:104`, `:120`): its stills are captured at the row's own width with `deviceScaleFactor` 2 and must be at least 2 × that width (the same 2 file px per CSS px as the desktop floor, `:104`; a lower scale factor makes every still blurrier, `:187`) and carry the width in the name; its clip cannot be accepted while the recorder refuses any viewport under 1920×1080 (`:158`), so the row is BLOCKED under no-wait-decision-gate layer 17 with the layer-18 record — never recorded at 1920 px and claimed for the narrow width, never PASSED or FAILED on stills (`result-quality-gate.md` layer 10). The 1920 px floors for every other row stay unchanged. (verify fid #s3-0)
- **R4 Layer 17 names the narrow-row cause for testing-ticket.** `no-wait-decision-gate.md` layer 17 must list R3's case among testing-ticket's causes, as retest-bug's cause (c) (a needed tool with no sanctioned alternative; Playwright `recordVideo` is banned, `qa-evidence-capture.md:176`). The three generic causes and retest-bug's five stay unchanged; the file stays ≤ 100 lines (skill-lint).
- **R5 Bytes and rule lines.** `WORKFLOW.md` bytes must not grow (it is a testing-ticket mandatory read); the sum of the four edited files must not grow by more than the R3/R4 text, and the PR reports before → after. No line holding MUST / NEVER / 🔴 / STOP / GATE is removed or edited.

## Edge cases

- Retest-bug and catch-ai also link `qa-evidence-capture.md`; R3 adds a branch for rows under 1920 px only, so their 1920 px rows read the same.
- The recorder lives outside this repo (QA bot tooling). R3 states only its documented refusal (`qa-evidence-capture.md:158`); changing the recorder is out of scope and is reported as the open item.

## Done when

- `grep -n "Run order\* step" skills` lists only step numbers that match the list at `WORKFLOW.md:56-64`.
- WORKFLOW and execute-and-summarize name the layer-19 delegation next to the end-of-round gate.
- `qa-evidence-capture.md` has a narrow-row branch; layer 17 names it for testing-ticket; the file is ≤ 100 lines.
- Every suite from `bash scripts/run-test-suites.sh` passes; `node tools/sdd-gate/check.js --base <docs branch>` exits 0.
