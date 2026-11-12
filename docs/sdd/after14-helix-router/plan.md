# Plan — after-14 helix router

## Files

- `skills/helix/SKILL.md` only (R1–R4). No reference, menu, command or routing table changes (R6).

## Change

1. Line 18 `**First:** follow session-start-context.md …` → `**Start, in this order:** (1) session-start-context.md; (2) Dependencies check; (3) Opening` (R1).
2. Move the `## Dependencies` section, unchanged, from the end of the file to just before `## Opening`; Contents line lists it first (R1).
3. Must-read: `Read while routing …` → `**Router reads** (open each at the step named):`; the deferred header → `**Not opened by the router** — the routed workflow reads each at the step named; listed only because the shared rules above MUST-link them (skill-lint must-read-depth):`; drop the repeated `only when the workflow reaches it:` from the 8 bullets, keeping each trigger (R2, R3).

## Options weighed

- Delete the 8 deferred links: lower bytes, but skill-lint must-read-depth would fail (shared-preamble / qa-closing-shared / shared-must-never MUST-link them) — rejected (R3).
- Add an explanatory paragraph back (A10 wording): fixes R2 but adds bytes — rejected (R4).
- Change dim8 or byte behaviour: no defect named — rejected (R5).

## What could break

- Anchor `#dependencies` and the Opening anchor: unchanged headings, so links resolve (link-check, skill-structure tests).
- Lint MUST classification of the deferred bullets: each line still starts with `Read [`, so they stay MUST edges (lint.js:32-33).
- Pinned text in `tools/r11-t9-uplift-b/check.test.js:46-48` and `tools/r7-helix-one-question/`: untouched lines.
- helix parity: helix sync happens in the later sync step, not this lane.

Cost: none (text only, local tests). Other repos touched: none.
