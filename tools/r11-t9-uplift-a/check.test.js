#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r11-t9-uplift-a R1–R26).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (p, re) => assert.ok(re.test(flat(rd(p))), `${p}: missing ${re}`);
const lacks = (p, re) => assert.ok(!re.test(flat(rd(p))), `${p}: still has ${re}`);
const R = 'references/';
const CBW = 'skills/procedures/create-bug-workflow/WORKFLOW.md';
const CBF = 'skills/procedures/create-bug-workflow/phase-f-close.md';
const FE = 'skills/procedures/tc-fe-prep-workflow/references/';
const TT = 'skills/procedures/testing-ticket-workflow/';

t('R1 truncated table: edit in place, no "consider", no delete', () => {
  lacks(`${R}jira-comment-post-review.md`, /consider ADF/i);
  lacks(`${R}jira-comment-post-review.md`, /delete old if partial/i);
  has(`${R}jira-comment-post-review.md`, /Missing rows \/ truncated table \| PUT the full corrected body to the same comment id/);
});
t('R2 checklist conditions replace "(if applicable)"', () => {
  lacks(`${R}jira-comment-post-review.md`, /if applicable/i);
  has(`${R}jira-comment-post-review.md`, /Precondition note\*\* visible \(when the approved draft has one\)/);
});
t('R3 escalation rows edit in place and respect the v2/v3 lock', () => {
  lacks(`${R}jira-comment-post-review.md`, /Delete comment → re-post/);
  has(`${R}jira-comment-post-review.md`, /never delete and re-post\)\. If it still fails and the session has not locked v2\/v3/);
});
t('R4 each fix-verify cap names its loop (numbers unchanged)', () => {
  has(`${R}jira-comment-post-review.md`, /max 3 rounds — the cap of this posted-comment re-read loop/);
  has(`${R}skill-rules-style.md`, /\*\*Maximum 2 rounds\*\* \(generic cap; a workflow step that states its own cap/);
  has(`${R}agent-rationalizations.md`, /fix-verify max 2 rounds unless the workflow step states its own cap/);
  has(CBF, /\*\*Maximum 2 fix-verify rounds\*\*/);
});
t('R5 linebreak fix edits in place', () => {
  lacks(`${R}jira-linebreak-conversion.md`, /delete comment, re-convert, re-post/);
  has(`${R}jira-linebreak-conversion.md`, /re-convert and PUT the corrected body to the same comment id/);
});
t('R6 next step from the table, else "Next: none"', () => {
  lacks(`${R}session-closing.md`, /when relevant/);
  has(`${R}session-closing.md`, /when no row matches, write `Next: none`/);
});
t('R7 executive draft review is a conditioned MUST', () => {
  lacks(`${R}skill-rules-style.md`, /\*\*SHOULD\*\*/);
  has(`${R}skill-rules-style.md`, /\*\*MUST\*\* when the user says the approved draft goes to executives or management/);
});
t('R8 destination re-read for every external write', () => {
  lacks(`${R}verify-closing-checklist.md`, /where applicable/);
  has(`${R}verify-closing-checklist.md`, /destination re-read for every external write/);
});
t('R9 no-guide intake defers to each workflow and names templates', () => {
  has(`${R}workspace-guide-discovery.md`, /retest-bug and tc-fe-prep — its `references\/project-config-template\.md`, \*\*one question at a time\*\*/);
  has(`${R}workspace-guide-discovery.md`, /create-bug — Phase A \(no template\): every missing field in \*\*one grouped message\*\*/);
  lacks(`${R}workspace-guide-discovery.md`, /if needed/);
});
t('R10 confirmed C proceeds without "may"', () => {
  lacks(`${R}non-pass-challenge-gate.md`, /You may proceed|you may continue/);
  has(`${R}non-pass-challenge-gate.md`, /Proceed to the verdict \/ bug, and still state/);
});
t('R11 coverage gap is BLOCKED, rubric pointer is shipped', () => {
  lacks(`${R}bug-priority-matrix.md`, /PASSED, with the caveat/);
  lacks(`${R}bug-priority-matrix.md`, /local agent memory/);
  has(`${R}bug-priority-matrix.md`, /the case is BLOCKED with what is missing — never PASSED with a caveat/);
});
t('R12 notify row matches results-update G8 and retest Step 9', () => {
  has(`${R}dependencies.md`, /testing-ticket: every round when the project guide configures a QA notify channel \(results-update G8\); retest-bug: every retest at its Step 9 notify/);
});
t('R13 dead session returns SESSION-DEAD, never "log in fresh"', () => {
  for (const f of ['playwright-preflight.md', 'round-time-contract.md', 'parallel-test-lanes.md']) {
    lacks(`${R}${f}`, /log in fresh|fresh login on failure|credentials ready for headed login/i);
  }
  has(`${R}round-time-contract.md`, /return `SESSION-DEAD \{account tag\}`; the main thread restores the login by command/);
  lacks(`${R}parallel-test-lanes.md`, /the parent logs each of those leased accounts in one at a time/);
});
t('R14 parent plan line per workflow; stale duplicate removed', () => {
  has(`${R}parallel-test-lanes.md`, /plan \(testing-ticket: shown, then the Phase C confirm; retest-bug: shown, then run/);
  lacks(`${R}parallel-test-lanes.md`, /as few windows as possible/);
});
t('R15 parallel-prep names Phase B for testing-ticket', () => {
  has(`${R}parallel-prep.md`, /intake or context load \(testing-ticket: Phase B\)/);
});
t('R16 no mid-run "user ack" in the plan pass criteria', () => {
  lacks(`${R}test-execution-plan-template.md`, /without user ack/);
  has(`${R}test-execution-plan-template.md`, /queued for the end decisions popup/);
});
t('R17/R21 stubs scope the cross-ticket check', () => {
  lacks('skills/create-bug-workflow/SKILL.md', /including the cross-ticket conflict check/);
  lacks('skills/tc-fe-prep-workflow/SKILL.md', /including the cross-ticket conflict check/);
});
t('R18 Phase F fetch-fail branch', () => {
  has(CBF, /\*\*Fetch fails\*\* \(permission, 404, MCP down\) → report that key\/URL from the tool output as \*\*created-unverified\*\*/);
  has(CBF, /`Verdict: CREATED \{N\}\/\{N\} — \{m\} unverified`/);
});
t('R19 A3 hold and A1–A3 wait are marked', () => {
  has(CBW, /🔴 STOP — Ask, never decide/);
  has(CBW, /🔴 STOP — Wait\*\* until A1–A3/);
});
t('R20 verdict line mapped to session-closing §5', () => {
  has(CBF, /`Verdict: CREATED` line below is create-bug's form of the `Verdict:` line/);
});
t('R22 tc-fe-prep skill refs without soft wording', () => {
  lacks(`${FE}ac-ec-coverage-review.md`, /TCs? may cover/);
  lacks(`${FE}jira-formatting.md`, /may require ADF/);
  lacks(`${FE}tc-final-review-report.md`, /may differ|suggestions only|optional improvements/i);
});
t('R23 qase format drops the stale column count', () => {
  lacks(`${FE}qase-import-format.md`, /9-column/);
});
t('R24 testing-ticket status list has no NOT TESTED', () => {
  lacks(`${TT}execute-and-summarize.md`, /\*\*NOT TESTED\*\*/);
  lacks(`${TT}WORKFLOW.md`, /BLOCKED\/NOT TESTED/);
  lacks(`${R}parallel-test-lanes.md`, /is NOT TESTED until run/);
});
t('R25 storageState reuse by probe, not by user confirmation', () => {
  lacks(`${TT}references/playwright-discipline.md`, /only when the user confirms/);
  has(`${TT}references/playwright-discipline.md`, /after the session-endpoint probe returns the expected user id/);
});

console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
