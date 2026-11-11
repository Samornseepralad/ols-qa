#!/usr/bin/env node
'use strict';
// Rule-text test for retest-bug-workflow (spec docs/sdd/r6-retest-bug-case-plan-and-superseded-c R1-R6, D2).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const WF = rd('skills/procedures/retest-bug-workflow/WORKFLOW.md');
const EE = rd('skills/procedures/retest-bug-workflow/execute-and-evidence.md');
const GATE = rd('references/non-pass-challenge-gate.md');
const TT = rd('skills/procedures/testing-ticket-workflow/WORKFLOW.md');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);

t('R1/R3 plan-table sentence names the Step 2c plan table with design-node and fixture columns', () => {
  has(WF, /design node link \(UI cases\) · the fixture it needs[^.]*Step 2c plan table/i);
});
t('R2/R3 posted-table ban names the posted comment table and says it does not limit the plan', () => {
  has(WF, /never a design-node column[^|]*applies only to this posted comment table, not to the Step 2c plan/i);
});
t('R4 workflow and evidence reference say "bug ER or task AC"', () => {
  has(WF, /only while the bug's ER or the task's AC is not superseded/i);
  has(EE, /Superseded bug ER or task AC → no "confirm defect" option/i);
  has(EE, /When the bug's own Expected Result or the task's Acceptance Criteria was superseded/i);
});
t('R5 gate option (C) is not offered when the expected was superseded', () => {
  has(GATE, /\(C\) Confirm the defect[^]*?not offered when the expected was superseded[^.]*A[^.]*B/i);
});
t('R6 testing-ticket :434 recommendation carries the matching parenthesis', () => {
  has(TT, /adjust TC \/ re-test \/ confirm defect — confirm defect only while the expected is not superseded/i);
});
// D2 re-pinned (spec docs/sdd/r12-p1-retest R9): owner instruction 11/Nov/2026 supersedes D2 (2026-11-05)
// for this line only; the freeze stays, now on the new explicit-delegation text.
const D2_LINE_330 = "**Delegated actions:** the approval wait is skipped only for an outward action — post, transition, or notify — that the owner explicitly delegated by name, in this session, for this round (for example \"post and transition this round without asking me\"). General cues (\"handle it\", \"don't ask\", \"don't wait\") never skip a write approval; for write approvals this is narrower than the cue list in [no-wait decision gate](../../../references/no-wait-decision-gate.md) layer 19. For a delegated action, the decisions popup carries only what the no-wait decision gate could not resolve; print the item 4 bundle list in chat before executing it, and every format, syntax and readback gate below still runs. An action not named still waits for item 4. Opening new bugs still needs a live yes.";
t('D2 comment-and-post.md line 330 byte-identical to the re-pinned text', () => {
  const rel = 'skills/procedures/retest-bug-workflow/comment-and-post.md';
  assert.strictEqual(rd(rel).split('\n')[329], D2_LINE_330);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
