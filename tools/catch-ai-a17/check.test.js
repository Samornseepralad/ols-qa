#!/usr/bin/env node
'use strict';
// Rule-text test for catch-ai (spec docs/sdd/after17-catch-ai R1-R9).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const SKILL = rd('skills/catch-ai-workflow/SKILL.md');
const REF = rd('skills/catch-ai-workflow/reference.md');
const CMD = rd('commands/catch-ai.md');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);
const lacks = (s, re, msg) => assert.ok(!re.test(flat(s)), msg || `must not match ${re}`);
const section = (s, head) => {
  const i = s.indexOf(head);
  assert.ok(i >= 0, `heading not found: ${head}`);
  const rest = s.slice(i + head.length);
  const j = rest.search(/\n## /);
  return j < 0 ? rest : rest.slice(0, j);
};
const desc = SKILL.split('---')[1];
const cmdDesc = CMD.split('---')[1];

t('R1 SKILL NOT-for names the tasks in words, tc-review included', () => {
  has(desc, /bug retest \(retest-bug\)/);
  has(desc, /TC review \(tc-review\)/);
  has(desc, /bug filing \(create-bug\)/);
});
t('R1 command description has the triggers and tc-review', () => {
  has(cmdDesc, /CatchAI/);
  has(cmdDesc, /ตรวจงานตัวเองอีกรอบ/);
  has(cmdDesc, /reviewing a TC document \(tc-review\)/);
});
t('R1 command start order does not say "before reading anything"', () => {
  lacks(CMD, /before reading anything/);
  has(CMD, /before reading any audit material/);
});
t('R2 checklist puts Refusal-first before Dependencies and points to the last section', () => {
  const block = SKILL.split('```text')[1];
  assert.ok(block.indexOf('Refusal-first') < block.indexOf('Dependencies checked'), 'order');
  has(block, /Dependencies checked \(last section/);
  has(SKILL, /Use the host todo list when the host has one, else copy this block/);
  has(SKILL, /Order: Refusal-first → Dependencies → Procedure 1–9/);
});
t('R3 Refusal-first is marked 🔴 STOP', () => {
  has(section(SKILL, '## Refusal-first (precondition gate)'), /🔴 STOP/);
});
t('R3 inferred scope is shown and runs on unless corrected', () => {
  has(SKILL, /did not name the scope.*print the `Scope:` line first and continue unless the owner corrects it/);
});
t('R3 CHECKPOINT has a decline branch; non-pass A/B wait is the checkpoint', () => {
  has(SKILL, /declines or does not answer → close with the report as delivered/);
  has(SKILL, /non-pass-challenge-gate\.md\]\([^)]*\) before recording any non-PASSED result \(its § 4 wait for the decision is the CHECKPOINT after step 9/);
});
t('R4 Procedure heading has no freedom tag; step 4 read-only rule is its own bullet', () => {
  assert.ok(/^## Procedure\s*$/m.test(SKILL), 'heading');
  lacks(SKILL, /high freedom/);
  assert.ok(/^ {3}- Read-only inspection only/m.test(SKILL), 'step 4 read-only bullet');
});
t('R4 hedged conclusion counts in Defects with its Actual/Expected basis; Correction plain', () => {
  has(SKILL, /Defect \(hedged conclusion\).*counts in `Defects`.*Actual is the hedged sentence.*Expected is the Confirmed answer/);
  has(SKILL, /your own Correction write the required value plainly/);
});
t('R4 exit rule and flaky/evidence cases are bullets', () => {
  const lines = SKILL.split('\n');
  const long = lines.filter((l) => l.length > 450);
  assert.strictEqual(long.length, 0, `${long.length} line(s) over 450 chars`);
});
t('R4 command carries the count rule as a link only', () => {
  has(CMD, /\[Iron Law\]\(\.\.\/skills\/catch-ai-workflow\/SKILL\.md#the-iron-law\)/);
});
t('R5 gate: N/A first, linked section covers exit-2, audit result lines, read-only precedence, linked args', () => {
  const g = section(SKILL, '## Result quality gate');
  assert.ok(/^\*\*No test verdict in scope\*\*/.test(g.split('\n').filter((l) => l.trim())[1]), 'N/A is the first paragraph');
  has(g, /reference\.md#result-quality-gate-in-an-audit/);
  const r = section(REF, '## Result quality gate in an audit');
  has(r, /exits 2.*nothing was checked.*not a pass.*by hand on the audited run's log/);
  has(r, /result line per case from the audited run's log/);
  has(r, /read-only rule wins.*BLOCKED for sending/);
  has(r, /result-quality-gate\.md#how-to-run-it/);
  has(r, /FAILED \(intermittent, \{failed_attempts\} of \{attempts\}\)/);
  has(r, /evidence not provided for TC-n/);
});
t('R6 mixed targets, skippable reads, write steps out of scope, MCP dependency rows', () => {
  has(SKILL, /target spans several groups.*read every matching group/);
  has(SKILL, /A read whose trigger does not occur in this run is skipped/);
  has(SKILL, /Write steps inside these references.*are not part of an audit/);
  const d = section(SKILL, '## Dependencies');
  has(d, /Atlassian MCP/);
  has(d, /Figma/);
});
t('R7 reference Verdict follows the matrix for a coverage gap; PWMI pointer names a heading', () => {
  has(REF, /coverage gap.*bug-priority-matrix\.md\) § Hard rule.*BLOCKED.*never PASSED with a caveat/);
  lacks(REF, /§ PWMI/);
  has(rd('references/skill-routing.md'), /rewrite the audited work beyond the corrections it reports/);
  has(rd('references/bug-priority-matrix.md'), /`catch-ai-workflow` SKILL\.md § Must-read files/);
});
t('R8 shared refs: no product role ids / product names; fallbacks; doc-audit sweep; one duplicate row', () => {
  lacks(rd('references/qa-evidence-capture.md'), /GUEST · LEARNER/);
  lacks(rd('references/qa-evidence-coverage.md'), /an OLS bug/);
  has(rd('references/qa-evidence-coverage.md'), /tool missing → recount by hand/);
  has(rd('references/root-cause-investigation.md'), /Audit of a document or your own prior work/);
  const ce = rd('references/customer-escape-prevention.md');
  assert.strictEqual((ce.match(/\| MUST report (a wrong thing|anything wrong) observed/g) || []).length, 1, 'one row');
  has(rd('references/dependencies.md'), /root-cause-investigation § 0\]\(root-cause-investigation\.md\)/);
  for (const f of ['qa-debug-discipline', 'playwright-preflight', 'qa-evidence-capture', 'qa-evidence-coverage']) lacks(rd(`references/${f}.md`), /PD3/);
});
t('R9 FIXED-BEFORE items stay fixed', () => {
  has(SKILL, /grep -niwE 'probably\|likely\|maybe\|might\|seems\|appears\|should be\|must be\|I think\|cache issue\|environment issue\|flaky\|intermittent\|race condition\|it works on my side'/);
  has(SKILL, /Layer 5 for any audit/);
  has(REF, /Defects \(actual ≠ sourced expected\): N · Unsourced claims: N · Questions: N · Clean: N/);
  has(SKILL, /\| Rule \| Because \|/);
  has(SKILL, /\| Excuse \| Answer \|/);
  has(SKILL, /`Session verdict:`/);
  lacks(SKILL, /9 steps — keep the todo list/);
  has(SKILL, /§ 2 repro matrix and § 4 resolution options/);
  has(rd('references/session-closing.md'), /Catch AI \(defects\)/);
});
if (fail) { console.log(`${fail} FAILED`); process.exit(1); }
console.log('all passed');
