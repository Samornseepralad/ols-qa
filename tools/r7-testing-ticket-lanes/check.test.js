#!/usr/bin/env node
'use strict';
// Rule-text test for testing-ticket (spec docs/sdd/r7-skill-gaps-after5 R3).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const TPL = rd('references/test-execution-plan-template.md');
const WF = rd('skills/procedures/testing-ticket-workflow/WORKFLOW.md');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);

t('R3 plan template carries the Lanes block with QA-L1 and QA-L2 rows, one account per lane', () => {
  has(TPL, /### Execution lanes/);
  has(TPL, /\| L1 \|[^|]*\|[^|]*\|[^|]*\| QA-L1 \|/);
  has(TPL, /\| L2 \|[^|]*\|[^|]*\|[^|]*\| QA-L2 \|/);
  has(TPL, /one account per lane/i);
});
t('R3 plan template always keeps both lane rows, a one-lane plan states why', () => {
  has(TPL, /always (shows|keep)[^.]*L1 and L2/i);
  has(TPL, /fewer than two (leasable )?accounts[^.]*(reason|says)/i);
});
t('R3 plan template has an explicit Starting state line', () => {
  has(TPL, /\*\*Starting state:\*\*/);
});
t('R3 WORKFLOW confirm summary carries a Starting state line', () => {
  has(WF, /Starting state:\s+\{/);
});
t('R3 WORKFLOW tells the plan to copy the template lane rows', () => {
  has(WF, /(Lanes|lane rows)[^.]*test-execution-plan-template\.md/i);
});
t('PR #94 width rule untouched', () => {
  has(TPL, /one row per scenario x width/i);
  has(TPL, /\| # \| Scenario \| AC\/EC id\(s\) \| Width \| Spec \/ path \| Data setup \|/);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
