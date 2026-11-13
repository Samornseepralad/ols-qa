# Spec — after16-catch-ai

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/` — `GATE.md` catch-ai row, `verify/catch-ai-workflow.json` (`#0` CONFIRMED). Line numbers refer to `skills/catch-ai-workflow/` at origin/main `3bbc3b18` (same text as helix `7b126d1`).

## Rules

- **R1 Count line slot.** The report template must carry the step-5 classification table and, under it, the count line `Defects (actual ≠ sourced expected): N · Unsourced claims: N · Questions: N · Clean: N` (source: `#0`, `SKILL.md:97`, `:103`).
- **R2 Unsourced claims section.** The template must have its own Unsourced claims section, outside the Defect count, with severity and the cite-or-remove correction (source: `#0`; `SKILL.md:98`; `reference.md:71`).
- **R3 Gate line.** The template must carry a `Result quality gate:` line that takes the checker's last line, the by-hand count, or `N/A — no test verdict in scope` (source: `#0`; `SKILL.md:57`, `:189-191`, `:201`).
- **R4 Root-cause label.** The Root cause slot must carry `Confirmed | Suspected | Unknown`, and only Confirmed closes a defect (source: `#0`; `SKILL.md:101`; `reference.md:190`).
- **R5 Red-flag exit line slot.** The template must have a slot for the § Red flags exit line, written only after a red-flag re-run (source: `#0` reason cites `SKILL.md:182`).
- **R6 One remediation shape.** The report's Remediation section must point to the one remediation entry template instead of a second, shorter copy, so the two never disagree (source: `reference.md:155-165` vs `:188-194`; after-15 lesson in the lane brief: make every line stating the same rule agree).
- **R7 Pins and size.** Pinned text stays (`tools/catch-ai-unsourced-wording`, `tools/r11-t9-uplift-b`). Bytes of `SKILL.md` + `reference.md` after ≤ before (24,928 + 13,620 = 38,548); offsets drop only restated text another mandatory line already gives. No MUST / NEVER / 🔴 / STOP / GATE line removed (source: owner T9 rule; helix token guard).

## Out of scope

Time row: investigated and reported in the code PR; no change, because the cause is not removable mandatory work (see plan.md).

## Edge cases

- No test verdict in scope → gate line reads `N/A — no test verdict in scope`, as the progress checklist already requires.
- No red-flag re-run → the exit-line slot stays empty.
- Hedged conclusions keep their Defects-section form (`reference.md:202`).

## Done when

- Template has Classification table + count line, Unsourced claims section, `Result quality gate:` line, exit-line slot.
- Remediation entry Root cause line carries the three labels; report Remediation points to that entry.
- `SKILL.md` + `reference.md` bytes ≤ 38,548; every suite from `scripts/run-test-suites.sh` passes.
