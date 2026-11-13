# Plan — after16-create-bug

## Files

- `skills/procedures/create-bug-workflow/phase-c-confirm.md` — R1 sentence after the "Do not call" line.
- `skills/procedures/create-bug-workflow/phase-d-create.md` — R2 GitHub gate lines after the 🔴 GATE line (that line unchanged); R4 HEREDOC + screenshots; R5 no-MCP branch in Jira item 2.
- `skills/procedures/create-bug-workflow/phase-f-close.md` — R2 item 5.
- `skills/procedures/create-bug-workflow/WORKFLOW.md` — R5 metadata bullet.
- `skills/procedures/create-bug-workflow/references/{worked-example,bug-draft-template,posting-discipline}.md` — R3; posting-discipline JXA intro shortened to a pointer (offset).
- `skills/create-bug-workflow/SKILL.md` — R6.
- `tools/a16-create-bug/check.test.js` — new pin test.

## Approach

Close each gap by adding the missing branch or making lines agree; offsets come only from links the stub says do not apply, phase links WORKFLOW already gives, and the posting-discipline JXA intro that restates phase-d item 4.

Rejected: editing the shared waiver lines (shared files, other lanes; the create-bug line is enough because it names them); renaming phase-e (needs owner).

## Libraries

None. No new cost.

## What could break

Pinned-text tests in `tools/a14-create-bug`, `tools/create-bug-draft-rules`, `tools/r7-create-bug-pasted`, `tools/r11-*`, `tools/r12-p1-three` — run every suite. Helix rule-line guard — keep every marker line byte-identical.
