# Plan — r6 tc-api-prep export failure branch

## Files

- `skills/procedures/tc-api-prep-workflow/WORKFLOW.md:245-253` — add one step "4. Write failure" (or a sentence under steps 1-2), 3 to 5 lines.
- New test `tools/tc-api-prep-export-branch/check.test.js`: asserts G1 contains STOP, "exact error", "workspace root", "not say" the file is ready; asserts `:249` and G-verify text unchanged; asserts line count within limit.
- Helix mirror synced by the main thread after merge.

## Options weighed

- A: branch in G1 (chosen; same pattern as the Confluence branch, first net before paths are announced).
- B: rely on G-verify only (current state; the user is told paths before the failure is noticed).
- C: put the rule in `references/csv-export-rules.md`: rejected, it is shared with other skills and the STOP belongs to this workflow.

## What may break

- skill-lint max-lines / ratchet; link-check (no new links).
- Evals that quote G1 numbering (grep `tools` for "G1").
- The `both` flow: G2 reads "attaches the G1 files" (`:241`); R3 must not leave a dangling placeholder.

## Cost

Free tools only. New cost: none.
