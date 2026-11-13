# Plan — after17-create-bug

## Files touched

Own: `skills/create-bug-workflow/SKILL.md`, `commands/create-bug.md`, `skills/procedures/create-bug-workflow/{WORKFLOW,phase-c-confirm,phase-d-create,phase-e-falsification,phase-f-close}.md`, `references/{bug-draft-template,worked-example}.md`.
Shared (not in PR #250/#251 lists): `references/{helix-session-constraints,skill-invocation-discipline,agent-rationalizations,jira-comment-post-review,workspace-guide-discovery,qa-debug-discipline,jira-wiki-vs-markdown,skill-reference-index}.md`.
Shared in PR #250/#251 lists, separate commit based on the PR version: `references/{defect-report-completeness,non-pass-challenge-gate,intake-one-pager}.md` (#251), `references/bug-priority-matrix.md` (#250).
New: `tools/a17-create-bug/check.test.js` (pin test), `docs/sdd/after17-create-bug/findings-ledger.md`.

## Data and libraries

Markdown and a shell test only. No dependency, no cost.

## Alternatives weighed

- Rename `phase-e-falsification.md` to `phase-b3-...`: removes nine findings but needs owner approval (rule 5) and updates links in other skills; a one-line pointer in WORKFLOW closes the confusion without a rename.
- Drop the two test-round links from SKILL.md: skill-lint would report 6 new violations (a16 evidence); kept.
- Edit PR #250/#251 files on this branch directly: would conflict with those PRs; a separate commit on their version keeps either merge order clean.

## What could break

Pinned tests (`create-bug-draft-rules`, `a14-create-bug`, `a16-create-bug`, `r7-create-bug-pasted`) grep phrases in the touched files; each is run. Shared waiver lines are read by every skill; the change adds an exception for hard confirm gates and removes no permission another skill uses. Token budget: additions are offset in the same files.
