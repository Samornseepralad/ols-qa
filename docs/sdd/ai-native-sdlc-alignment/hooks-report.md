# Hooks report: managed-settings candidates (R6, read-only)

Spec: R6 and Q2 in [spec.md](spec.md). This report changes nothing and recommends nothing be moved (Q2 default: no). Moving a hook to managed settings is the owner's call (global config).

Method: read `.claude/settings.json`, then the hook file or rule module each entry names. "Candidate" = a block that protects shared systems, customer data or irreversible actions, where a person switching it off locally would cause harm that others bear. "Not a candidate" = reminders, context injection or workflow-quality gates.

## Blocking hooks (exit 2)

| Event / matcher | Registered at | Blocks (evidence) | Candidate? | Reason |
| --- | --- | --- | --- | --- |
| PreToolUse Bash: customer-content-guard | `.claude/settings.json:101` | a shell command that names the customer marker and would change content; header `.claude/hooks/customer-content-guard.sh:13`, exit 2 at `:197` | Yes | Protects customer content on shared environments; the damage is not ours to undo |
| PreToolUse Bash: git-staging-guard | `.claude/settings.json:105` | `git add -A`, `git add .`, `git add <dir>/`, `git commit -a`; `.claude/hooks/git-staging-guard.sh:3-10` | Weak yes | Protects other sessions' files in a shared worktree; also enforced by pre-push, so a local disable is partly covered |
| PreToolUse Bash, Agent, Task: issue-creation-guard | `.claude/settings.json:109,144,153` | opening a bug or issue without the owner's say-so; decision in `tools/issue-creation-guard/check.js --gate`, relay exit 2 at `.claude/hooks/issue-creation-guard.sh:19` | Yes | Creates items in systems others see; the owner rule is "never open one unprompted" |
| Stop: issue-creation-stop | `.claude/settings.json:200` | audit at turn end for an issue opened without approval; `.claude/hooks/issue-creation-stop.sh:19` | Yes | Second layer of the same rule; only useful if the gate above cannot be disabled |
| PreToolUse Bash: process-kill-guard | `.claude/settings.json:113` | `pkill -f`, `killall`, kill by pid of unknown origin; `tools/process-kill-guard/kill_rules.js:23-24,199` | Weak yes | Protects other people's running sessions on a shared machine; harm is local to the machine |
| PreToolUse createJiraIssue: jira-ticket-guard | `.claude/settings.json:122` | creating a Jira issue through any Atlassian connector without an armed owner confirm; `.claude/hooks/jira-ticket-guard.sh:2-4,35` | Yes | Writes to a shared external system |
| PreToolUse Bash/Write/Edit and mcp writes: discord-notify-guard `--gate` | `.claude/settings.json:162` | message sends that lack an owner approval code; `.claude/hooks/discord-notify-guard.sh:2-3,22` | Yes | Sends messages other people read; cannot be unsent |
| PreToolUse Agent: agent-dispatch-guard | `.claude/settings.json:140` | agent dispatches that fail `tools/agent-dispatch-guard/dispatch_rules.js`; exit 2 at `.claude/hooks/agent-dispatch-guard.sh:25,34` | No | Workflow quality for how work is delegated, not harm outside the session |
| PreToolUse AskUserQuestion: ask-guard | `.claude/settings.json:131` | asking the owner for a reference before an episodic-memory search; `.claude/hooks/ask-guard.sh:2-3,34` | No | Saves the owner from repeat questions; no external harm if off |
| Stop: investigation-gate | `.claude/settings.json:191` | ending a turn flagged as an investigation without calling systematic-debugging; `.claude/hooks/investigation-gate.sh:2-5,55` | No | Process discipline; the owner can already see skipped steps in the report |

## Non-blocking hooks

| Event | Registered at | What it does (evidence) | Candidate? | Reason |
| --- | --- | --- | --- | --- |
| SessionStart inject-context | `.claude/settings.json:48` | injects workspace context from the local secrets store; `.claude/hooks/inject-context.sh:2-4` | No | Context only; also reads machine-local data a managed file should not carry |
| SessionStart, UserPromptSubmit investigation-rule | `.claude/settings.json:56,82` | prints the investigation rule; `.claude/hooks/investigation-rule.sh:1-4` | No | Reminder only |
| SessionStart board-reminder | `.claude/settings.json:64` | registered, but `.claude/hooks/board-reminder.sh` does not exist in this checkout (measured with `ls .claude/hooks`) | No | Nothing to move; the missing file is a finding for the repo owner |
| UserPromptSubmit, Stop postmortem-debt | `.claude/settings.json:74,187` | prints OPEN rows of `docs/post-mortem/PENDING.md`; `.claude/hooks/postmortem-debt.sh:1-4` | No | Reminder only |
| UserPromptSubmit discord-notify-guard `--record` | `.claude/settings.json:90` | records the owner's approval code, never blocks; `.claude/hooks/discord-notify-guard.sh:3` | No | Must travel with the `--gate` hook above if that moves |
| PreCompact pre-compact | `.claude/settings.json:173` | re-injects session decisions; `.claude/hooks/pre-compact.sh:1-3` | No | Context only |
| Stop build-session-state | `.claude/settings.json:183` | `bash scripts/build-session-state.sh` writes session state | No | Housekeeping, not a guard |

## Notes for the owner

- Several guards fail open when `node` or the rule module is missing (for example `.claude/hooks/ask-guard.sh:8`, `.claude/hooks/discord-notify-guard.sh` unknown-code path). A managed copy would need the same scripts installed on every machine, or it would silently pass.
- The `--record` and `--gate` halves of discord-notify-guard must move together or not at all.
- Permission deny rules for the secrets store (`.claude/settings.json` `permissions.deny`) are not hooks and were not assessed here.
- Recommendation under Q2: move nothing now. If the owner later decides to, the "Yes" rows above are the shortlist.
