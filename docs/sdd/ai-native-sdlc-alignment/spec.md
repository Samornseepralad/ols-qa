# Spec — align the ols-qa / helix development loop with the AI-native SDLC playbook

Status: draft for owner approval (ADLC gate) · docs only until approved · source of the playbook: https://claude.com/resources/articles/the-ai-native-sdlc-playbook (fetched 2026-11-05)

## Destination

A written, owner-approved plan that says, per playbook stage, what ols-qa already does, what is missing, and which free (no-cost) tasks close the gaps, then the first tasks implemented after approval. Nothing in the frozen Helix Exit gate changes.

## Where we already match (checked in this repo, 2026-11-05)

| Playbook stage / play | Ours | Evidence |
| --- | --- | --- |
| Design: spec in git guided by skills | SDD: `docs/sdd/<slug>/{spec,plan,tasks}.md` before code; 23 folders | `docs/sdd/`, CLAUDE.md global rule 26 |
| Build: plan as an artifact, owner approves | ADLC gate: owner approves plan before implement | global rule 27 |
| Build: CLAUDE.md + skills as institutional knowledge | CLAUDE.md, Helix skills, memory | `skills/`, `CLAUDE.md` |
| Build/Deploy: hooks as guardrails and approval gates | PreToolUse hooks (git-staging, issue-creation, jira-ticket, ask, agent-dispatch), Stop hooks (investigation gate) | `.claude/settings.json` |
| Test: feedback loop with pasted output | `scripts/run-test-suites.sh` in pre-push and CI; `sdd-gate` CI (spec on main first) | `.github/workflows/tests.yml`, `tools/sdd-gate` |
| Test: continuous evals | Helix skill-eval rounds (blind A/B, Exit gate) — run by hand, per round | `ols-qa-evidence/evals/` |

## Gaps (rules)

- **R1 (Plan)** — A new SDD folder shall start with `intent.md` (what is wanted, why, constraints, in the originator's words, reviewed by the owner) before `spec.md`. Today the request lives only in chat. (playbook "Capture as intent.md")
- **R2 (Build)** — When implementation departs from `plan.md`, `plan.md` shall change in the same PR; a CI check shall warn when a PR changes files that no `plan.md` of its SDD folder names. (playbook plan-mode step 7)
- **R3 (Test)** — The Helix eval suite shall be one repeatable command with a "live suite" rule: every escaped defect adds a test prompt; old prompts that no longer discriminate are reviewed. It stays a manual or local run: a paid CI/API run is not allowed (global rule 3). The frozen Exit gate is not touched.
- **R4 (Measure)** — A read-only script shall compute the playbook's leading and lagging indicators from git and `gh`: intent→spec time, count of `spec.md` commits after the first `plan.md` commit, first-pass CI success of PRs, PR open→merge time. No hardcoded numbers.
- **R5 (Maintain)** — One deterministic band for one metric (CI test-failure rate from `gh run list`, rolling 30 days): 1σ log, 2σ diagnose read-only, 3σ write a proposed `intent.md`; the detection script never acts. A scheduled trigger is a persistent change on the owner's machine/org and needs separate approval.
- **R6 (Governance)** — Hooks that must never be switched off belong in managed settings owned by an admin; ours sit in repo `.claude/settings.json` and a person can disable them. Whether to move any of them is the owner's call (global config, rule 23).

## Out of scope

- The Helix Exit gate (owner decision 28/Oct) and any change to evaluation criteria.
- Paid services, new CI minutes beyond the existing `tests.yml`, new SaaS.

## Owner questions

- Q1: Is `intent.md` mandatory for every new SDD folder, or only for work that starts from a person's idea (not from a ticket or a defect)? Default: mandatory for new folders created after approval.
- Q2: R6 — move any hook to managed settings? Default: no, list candidates only.
- Q3: R5 — approve a scheduled run of the band script later? Default: manual run only.

## Done when

- This folder is on main (docs PR merged) and the owner has approved the plan.
- R1, R2, R4 implemented with tests that fail first; R3 written as a runnable doc/command; R5 detection script with unit tests; R6 report only.
- `bash scripts/run-test-suites.sh` exits 0.
