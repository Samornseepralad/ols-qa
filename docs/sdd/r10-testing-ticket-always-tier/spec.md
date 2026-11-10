# Spec — testing-ticket: Always tier = WORKFLOW + preamble

## Source
- S1 after-6 static review P1 (`SKILL.md:37`): "Shrink the Always tier to WORKFLOW + preamble; fold the rest into WORKFLOW at the step that needs each."
- S2 `references/shared-preamble.md:5,8` links `user-communication.md` and `helix-session-constraints.md`.

## Rules
- R1 — The SKILL.md Always tier must list only `WORKFLOW.md` and `shared-preamble.md`.
- R2 — `user-communication.md` and `helix-session-constraints.md` must stay reachable through `shared-preamble.md` (no rule is dropped).
- R3 — `workspace-guide-discovery.md` must be listed under On trigger at Phase A (to locate the workspace project guide).

## Done when
- SKILL.md Always tier has 2 files; the moved file appears under On trigger with its trigger.
- `bash scripts/run-test-suites.sh` passes.
