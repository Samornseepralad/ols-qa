#!/usr/bin/env node
'use strict';
// Rule-text test for testing-ticket (spec docs/sdd/r6-testing-ticket-plan-width-rows R1-R6).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const TPL = rd('references/test-execution-plan-template.md');
const WF = rd('skills/procedures/testing-ticket-workflow/WORKFLOW.md');
const EX = rd('skills/procedures/testing-ticket-workflow/execute-and-summarize.md');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);

t('R1 plan In-scope table has a Width column and one row per scenario x width', () => {
  has(TPL, /\| # \| Scenario \| AC\/EC id\(s\) \| Width \| Spec \/ path \| Data setup \|/);
  has(TPL, /one row per scenario x width/i);
  has(TPL, /two rows, not "1440 · 390" in one cell/i);
});
t('R1/Q2 a scenario with no layout dependence uses one row with Width = n/a', () => {
  has(TPL, /no layout dependence[^.]*one row[^.]*Width = n\/a/i);
});
t('R2 out-of-scope widths are stated with a reason and never appear as a row', () => {
  has(TPL, /out-of-scope width[^.]*width \+ reason[^.]*never as a row/i);
});
t('R3 coverage check stays and a width without a row is not covered', () => {
  has(TPL, /Coverage check:\*\* every AC\/EC id above appears/i);
  has(TPL, /not covered at a width it has no row for/i);
});
t('R4 WORKFLOW scoping line and MUST row say plan and results use one row per width', () => {
  has(WF, /screen widths in scope[^.]*one row per scenario x width in the plan/i);
  has(WF, /MUST run every in-scope width as its own row in the plan and in the results/i);
});
t('R5 results table reference still has Width column and per-width rows', () => {
  has(EX, /a scenario in scope at two widths is two rows/i);
});
t('R6/Q1 reconcile reports a mismatch and does not block the run', () => {
  has(TPL, /Reconcile[^.]*every plan row \(scenario x width\) has a results row[^.]*report[^.]*does not block/i);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
