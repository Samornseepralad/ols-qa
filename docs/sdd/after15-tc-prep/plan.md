# Plan — after-15 tc-prep

## Files

- `references/dependencies.md` — intro sentence (R1), `openpyxl` row (R2).
- `references/skill-reference-index.md` — dependencies line (R1).
- `references/csv-export-rules.md` — CSV/xlsx recipe file names → `{OUT}` named by the caller (R3); Unit Test encoding (R4); xlsx recipe reuses `clean_cell` from the CSV recipe instead of repeating it (R6 offset).
- `skills/tc-api-prep-workflow/SKILL.md` — line 37 mapping to `{OUT}` (R3).
- `skills/procedures/tc-fe-prep-workflow/references/project-config-template.md` — Section E questions, fixed block, one-question rule (R5).
- `tools/r11-t9-uplift-b/check.test.js` — R22 regex pins the old line-37 text; update it to the new text so it still checks the same rule (tc-api CSV names).

## Choices weighed

- R1: let a skill name a later check point (chosen; tc-api deliberately defers to Phase C) vs. moving tc-api checks back to step 1 (asks about xlsx before the delivery is known — rejected).
- R2: align the dependency row with the stricter never-self-install rule (chosen) vs. allowing install (contradicts tc-fe GATE and csv-export-rules — rejected).
- R3: placeholder named by the caller (chosen) vs. listing every workflow's names inside each recipe (more bytes, drifts again).

## What may break

- Tests pinning text in the edited files (`tools/r12-p1-three`, `tools/r11-t9-uplift-*`, skill-lint) — run the full suite list.
- sdd-gate: these docs must be in the base before the `fix:` commits pass (docs PR first, code PR based on it).

No new cost; no other repo touched.
