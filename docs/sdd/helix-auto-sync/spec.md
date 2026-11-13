# helix-auto-sync — spec

> Mirror of `Thitic9203/pluton-ai-agent` `docs/sdd/helix-auto-sync/` (source of truth there), kept here so ols-qa commits can cite it (`tools/sdd-gate`).

Status: draft for owner review (12/Nov/2026). SDD step 1 (CLAUDE.md rule 26). No code yet; implementation waits for
ADLC gate 3 (owner approves the plan).

## Why

On 12/Nov/2026 four ols-qa PRs that changed shared skill files were merged on GitHub. The documented post-merge step
(ols-qa `CLAUDE.md` §5 "helix sync": run `bash scripts/sync-skills-to-helix.sh <files>` then
`bash scripts/helix-parity.sh` from latest main) was not run, and the post-commit hook
(`scripts/hooks/post-commit`, ols-qa `AGENTS.md` "Retest skill source of truth") fires only for a commit made locally
on `main`, never for a PR merged on GitHub. The OLS tick's S9 gate (`docs/sdd/qa-slack-thread/spec.md` S9,
`scripts/ols/lib/skills-sync.mjs`) then wrote no order for hours (`skills out of sync (6)`, recorded in
`docs/sdd/ols-vm-runtime/tasks.md` T8). Two more facts block the manual path:

- Helix `main` is protected by ruleset 27092786 "main: token budget + PR checks" (required checks `pr-check`,
  `token-budget`, `token-budget-raise`; bypass actor = deploy key only). `sync-skills-to-helix.sh` ends with
  `git push origin HEAD:main`, which the ruleset refuses, so the 12 Nov sync had to go as Helix PR #35.
- Helix `token-budget` (`scripts/ci-token-budget.sh` → `scripts/check-rule-lines.sh`) fails when a MUST / NEVER / 🔴 /
  STOP / GATE line under `skills/ references/ commands/ hooks/` is reworded, unless `rule-line-register.json` lists it
  with an owner approval; adding entries needs a `[rule-reword]` PR whose body quotes the owner
  (`scripts/check-rule-reword.sh`).

`helix-parity.sh` reported 39 of 154 shared files differing on 12 Nov; most of that drift predates this incident and
is two-way (some files were fixed in Helix first).

## Scope

In: an automatic path from an ols-qa `main` push to one Helix sync PR; reporting of rule rewords and pre-existing
drift; one Slack alert when drift lasts too long. Out: changing S9 (stays as written), changing Helix's ruleset or
CI gates, auto-merging, syncing the 39-file backlog, Pyrite lane files.

Roles: **owner** (approves rule rewords, approves/merges the Helix PR, creates the secret); **sync Action** (opens or
updates the PR); **OLS health check** on the VM (`scripts/ols/vm/health.mjs`, AI Agent Bot, posts the alert).

## Rules

- **H1.** When a push lands on ols-qa `main` and changes a file under `skills/`, `references/` or `commands/` that
  also exists in Helix, the system must open, or update when one is already open, exactly one Helix PR from branch
  `sync/ols-qa-auto` into Helix `main` carrying those files as they are at the pushed ols-qa commit. It must never
  push to Helix `main` directly. Source: incident above; ruleset 27092786; ols-qa `CLAUDE.md` §5 ("ส่งเฉพาะจาก main
  หลัง merge").
- **H2.** The set of files a sync PR carries must be the files changed on ols-qa `main` since the last ols-qa commit
  already synced into Helix `main` (recorded as a `Synced-From: ols-qa@<sha>` trailer), not every file that differs.
  Files under the 39-file backlog that ols-qa did not change in that range must not be copied. Source: task brief
  ("the remaining 39-file parity drift is reported, not auto-synced"); `helix-parity.sh` output 12 Nov.
- **H3.** When the copied files reword or drop a rule line that `check-rule-lines.sh` would flag, the PR body must
  list each such line (removed text, replacement, file) under "Rule rewords — owner approval needed", and the system
  must never write to `rule-line-register.json`, never title the PR `[rule-reword]`, and never put an owner quote in
  the body. Only the owner adds register entries. Source: Helix `scripts/check-rule-reword.sh` (register needs a quoted
  owner approval); CLAUDE.md rule 25 (no guard bypass).
- **H4.** When the copied files would raise the token budget over `token-budget.json`, the PR body must say so with
  the measured numbers, and the system must never edit `token-budget.json`. Source: Helix `version.yml` job
  `token-budget-raise` (R9: raise only in a `[token-budget-raise]` PR quoting the owner).
- **H5.** Every sync PR body must end with the `helix-parity.sh` result at that moment (count and the `DIFFERS` list),
  marked "reported, not synced". Pre-existing drift must never be copied by the Action. Source: task brief; ols-qa
  `CLAUDE.md` §5 (run parity after sync).
- **H6.** When the secret guard (`helix/scripts/check-no-secrets.sh`, run on the ols-qa source before copying, as
  `sync-skills-to-helix.sh` already does) fails, the system must open or update no PR and must fail the run. Source:
  `sync-skills-to-helix.sh` "pre-scan the ols-qa SOURCE files"; Helix is public.
- **H7.** S9 must stay fail-closed: no change to `skills-sync.mjs` behaviour; while any named skill differs, the tick
  writes no order. The sync PR is the fix path, never a relaxed gate. Source: `docs/sdd/qa-slack-thread/spec.md` S9;
  CLAUDE.md rules 7, 25.
- **H8.** When ols-qa `origin/main` and Helix `origin/main` differ in any file the sync scope covers (H2), or in a
  `SKILL.md` / `WORKFLOW.md` of a skill S9 checks, continuously for more than N hours (N = owner decision, proposed 1),
  the OLS health check must post one root alert in the OLS channel as the AI Agent Bot (never a Slack connector) that
  names the differing files, links the open sync PR (or says none exists), and names the one owner action (approve
  rewords / merge PR / fix the failed run). It must stay silent while the incident lasts and post one recovery reply
  when parity for that scope returns. Source: task brief; `docs/sdd/ols-vm-runtime/spec.md` R13 (one alert per
  incident, recovery reply); repo `CLAUDE.md` "Slack: the AI Agent Bot posts".
- **H9.** The system must never merge a Helix PR. Merging stays with the owner or the main thread after review (ADLC
  gate 6, CLAUDE.md rule 27). Source: CLAUDE.md rule 27.
- **H10.** The sync must cost nothing: it runs only on GitHub-hosted runners of public repos (ols-qa and Helix are both
  `PUBLIC`, checked with `gh repo view` 12 Nov) and on the existing VM; no paid service. Source: CLAUDE.md rule 3.

## Edge cases

- **Two merges in quick succession.** Runs are serialised (one concurrency group, no cancel); the second run rebuilds
  `sync/ols-qa-auto` from latest Helix `main` + the union range, then force-updates the same PR (H1 "exactly one").
- **The open sync PR was edited by hand** (owner added register entries). The Action must not drop commits it did not
  author: it rebuilds only its own commit and keeps later commits by others on top, or, when that cannot apply
  cleanly, leaves the branch as is and comments the new file list on the PR.
- **Helix-first change** (a file changed on Helix `main` after the last sync and also changed in ols-qa). The PR must
  flag it as "Helix has a newer edit — would be overwritten" (ols-qa `AGENTS.md`: backport the same day, otherwise the
  next sync overwrites it). Not silently overwritten, not silently skipped.
- **New file in ols-qa, absent in Helix.** Not copied (script default `HELIX_SYNC_NEW=0`); listed in the PR body. A
  new `references/*` is listed with the dangling-link warning the script already prints.
- **File deleted in ols-qa.** Not deleted in Helix; listed in the PR body.
- **Merge commit carrying `[skip ci]`.** The Action does not run; H8 still alerts after N hours. ols-qa's own
  `chore(release): bump version … [skip ci]` commits touch no shared file, so they need no run.
- **Helix CI red on the sync PR** (gate other than rewords/budget). PR stays open, the failing check is named in a PR
  comment; H8 alerts after N hours.
- **Secret expired or revoked.** The run fails with a named error; H8 alerts after N hours.
- **No shared file in range.** No PR, run succeeds with "nothing to sync".
- **`hooks/`.** ols-qa has no top-level `hooks/` on `origin/main` (checked 12 Nov); Helix does. Not in sync scope
  until ols-qa gains one (spec change first).

## Done when

- A test push to ols-qa `main` that changes one shared skill file produces one Helix PR from `sync/ols-qa-auto` with
  that file only, and the three required checks run on it.
- A second push while it is open updates the same PR; no second PR exists.
- A reworded rule line shows in the PR body; `rule-line-register.json` on the branch is unchanged; `token-budget` is
  red until the owner adds the entry.
- A planted secret-shaped string in the source makes the run fail with no PR change.
- The PR body ends with the parity count, and the 39-file backlog files are not in the diff.
- S9 test `skills-sync.test.mjs` still passes unchanged.
- With a fixture drift older than N hours, `health.mjs` dry prints one alert; a second run prints nothing; fixing the
  fixture prints one recovery reply.
- No new billed usage: both repos public, no paid service added.

## Owner questions (no source, so not decided here)

- Q1. Token for the Action: GitHub App or fine-grained PAT (plan.md "Secret").
- Q2. Approval of a PR into ols-qa for `.github/workflows/helix-sync.yml` and `scripts/sync-skills-to-helix.sh`
  (memory 6 Nov allows ols-qa PRs only for two SKILL.md files).
- Q3. N for H8 (proposed 1 hour, same as the 1-hour reminder rule of 4 Nov).
- Q4. Approval flow on the PR: owner merges by hand (default, H9), or main thread merges after green checks.
