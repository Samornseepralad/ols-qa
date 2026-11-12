# Plan — after-14 create-bug

## Files

- `skills/create-bug-workflow/SKILL.md` — R1 (line 42 points at the map), R6 (Dependencies order), R7 (triggers for line 47).
- `skills/procedures/create-bug-workflow/phase-e-falsification.md` — R1 layer map (B3 is where each candidate gets its label, the first verdict that leaves the run), R6 heading, R8 contradiction branch.
- `skills/procedures/create-bug-workflow/phase-d-create.md` — R2: item 4 becomes one branch for MCP, JXA and REST non-field failures.
- `skills/procedures/create-bug-workflow/phase-c-confirm.md` — R3 one question list, R5 cancel branch and B3 count.
- `skills/procedures/create-bug-workflow/WORKFLOW.md` — R6 markers, R8 `gh repo view`, R9 duplicate sentence.
- `skills/procedures/create-bug-workflow/phase-f-close.md` — R8 read calls.
- `skills/procedures/create-bug-workflow/references/posting-discipline.md` — R8 JXA endpoint + read-back.
- `skills/procedures/create-bug-workflow/references/bug-draft-template.md` — R4 link rule, R8 root-cause label.

## Approach and choices weighed

- R1: map inside create-bug (not in `result-quality-gate.md`, a shared file the lane may not edit). Alternative "drop the link" was rejected: layers 6, 7, 13–18 and 20 do apply when filing, and dropping the link would lose their source.
- R2: merge MCP/JXA/REST into one failure item instead of copying the search block twice — fewer bytes, one rule.
- Byte offsets: shorter phase-file headers, the WORKFLOW B3/D pointer lines, the R9 duplicate; result-quality-gate (17,677 bytes) no longer has to be read in full on a filing run.
- Free tools only; no new dependency.

## What could break

- Rule-text tests that pin create-bug lines: `tools/create-bug-draft-rules`, `r7-create-bug-pasted` (slices `## 🔴 GATE: Phase B2` … `## Phase B3 — Falsification` in WORKFLOW.md — the B3 heading change must keep that slice working or the lane stops), `r11-t9-uplift-a`, `r11-skill-fixes-g1`, `r12-p1-three`. A pinned test that fails → stop and report (no test edit is approved here).
- skill-lint `must-read-depth`: every link in `SKILL.md:47` stays.
