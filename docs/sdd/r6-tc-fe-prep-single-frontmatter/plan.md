# Plan — r6 tc-fe-prep single frontmatter

## Files

- `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md:1-7` (remove; add pointer line, R1-R3).
- New test `tools/tc-fe-prep-frontmatter/check.test.js`: WORKFLOW.md does not start with `---`, contains no `^description:` in the first 20 lines, body from `# TC FE Prep Workflow` matches a stored sha of the origin/main body (R3), SKILL.md frontmatter unchanged.
- Helix mirror: synced by the main thread after merge; the helix copy must be confirmed to have the same 7-line block before the sync (`scripts/helix-parity.sh`).

## Options weighed

- A: delete the block, add the retest-bug style pointer (chosen; existing precedent F2, smallest diff).
- B: keep `name:` only like tc-api-prep (leaves a half block and an HTML comment; no gain).
- C: leave as is (keeps two description copies that can drift).

## What may break

- `tools/skill-lint` toc position (Contents line 15 -> 8, still inside 25), line-count ratchet (only shrinks).
- A reader that parses WORKFLOW frontmatter: none found in this repo (F6); helix repo not searched, so check the helix repo scripts for `WORKFLOW.md` frontmatter parsing before sync.
- `tools/portability/synced_links.test.js` (mentions frontmatter placement): run it.

## Cost

Free tools only. New cost: none.
