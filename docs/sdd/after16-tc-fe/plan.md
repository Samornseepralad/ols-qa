# Plan — after16-tc-fe

## Files

- `skills/tc-fe-prep-workflow/SKILL.md` — § Dependencies line "Jira REST credentials (ADF-direct publish)" (`:112`). Offset: shorten the intro line `:107`.
- `skills/procedures/tc-fe-prep-workflow/design-and-review.md` — Step 4 intro (`:205-208`), 4d (`:232`), 4f step 0 glossary item (`:270`), 4f step 4 (`:292-293`). Offsets: restated phrases in the same section.

## Approach

R1–R2: replace the REST item with "Jira REST credentials or a signed-in Jira session — tc-fe-prep posts only through the session, checked at Step 7; a failed REST check is not a stop; no session → Step 7 failure branch". R4: step 4 sentence on what the fresh reviewer gets and checks. R5: condition on re-running 4a–4d. R6: "(AC/EC column stays verbatim)".

Rejected: (a) capping rounds — removes the clean-round exit (gate); (b) dropping 4f when 4a–4e is clean — removes independence; (c) merging Step 7.5 into 4f — 7.5 checks a later artifact; (d) editing `dependencies.md` — owned by tc-api lane.

## Libraries

None. No new cost.

## What could break

Pinned text in `tools/r11-skill-fixes-g1`, `tools/r7-tc-fe-prep-order`, `tools/r8-*`, `tools/r9-*`, `tools/tc-fe-prep-frontmatter` — run every suite. Helix token guard: rule lines untouched, bytes ≤ before.
