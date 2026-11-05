# Spec — r6 catch-ai: one wording for an unsourced claim (own class, not counted as a Defect)

Status: draft for owner review · owner decision 2026-11-05: the skill wins, the eval side is fixed elsewhere · from B-rootcause section 8 · skill text only · no env access

## Why

`skills/catch-ai-workflow/reference.md:71` says "An unsourced claim is a defect in its own right ... Major when load-bearing, Minor when incidental. Its correction is always 'cite the source or remove the line'".
`skills/catch-ai-workflow/SKILL.md:97` (step 5) classifies "Defect / Defect (unsourced claim) / ..." and says the count line tallies each class on its own
(`Defects (actual != sourced expected): N · Unsourced claims: N · Questions: N · Clean: N`) and "An unsourced claim keeps its severity and its cite-or-remove correction, but is never added to the Defect count".
"A defect in its own right" can be read as "counts as a Defect", which contradicts `:97`. The eval run followed `:97` (Defects 1, Unsourced 2). The expectation fix is on the eval side, not in this repo.

## Rules

- **R1** — When the system reports an unsourced claim, it must classify it as its own class, keep its severity (Major when load-bearing, Minor when incidental) and its cite-or-remove correction, and report it on its own tally ("Unsourced claims: N").
  (source: `SKILL.md:97`, `reference.md:71`)
- **R2** — The system must not add an unsourced claim to the Defect count. (source: `SKILL.md:97`)
- **R3** — `reference.md:71` must say R1 and R2 in the same terms as `SKILL.md:97`: replace "is a defect in its own right" with wording such as "is its own class — it keeps its severity ... and is reported on its own tally; it is not added to the Defect count".
  Keep the last sentence (never pair it with an asserted true value; that value is a separate Question).
- **R4** — `SKILL.md:97`, the table label "Defect (unsourced claim)" and `:148,:164` are not edited by this spec. Whether the label "Defect (unsourced claim)" in the class list (`:97`) should become "Unsourced claim" to match the tally name is an OWNER QUESTION (Q1); it is not changed here.
- **R5** — The "no row is reclassified to reach the number the user claimed" rule and the first red flag stay as is. (source: `SKILL.md:97`)

## Owner questions

- Q1: Rename the class label "Defect (unsourced claim)" to "Unsourced claim"? It would remove the last "Defect" word from this class; no source decides it.

## Done when

- R1-R3: `reference.md:71` contains "own class", "own tally" and "not added to the Defect count"; no longer contains "defect in its own right".
- R4/R5: `SKILL.md` byte-identical to origin/main.
- `reference.md` stays within its size limit (13448 bytes now; net change <= +150 bytes) and `bash scripts/run-test-suites.sh` exits 0.
