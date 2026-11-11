#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r7-skill-gaps-after5 R4).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const dir = 'skills/procedures/tc-api-prep-workflow';
const rd = (p) => fs.readFileSync(path.join(root, dir, p), 'utf8');
const WF = ['phase-d-scope-design.md', 'phase-e-review.md', 'phase-f-draft.md', 'phase-g-deliver.md', 'WORKFLOW.md'].map(rd).join('\n');
const REV = rd('references/spec-coverage-review.md');
const EX = rd('references/worked-example.md');
const g1 = WF.slice(WF.indexOf('### G1 '), WF.indexOf('### G2 '));
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const block = REV.slice(REV.indexOf('## Review output'));
const tpl = block.slice(block.indexOf('```text'), block.indexOf('```', block.indexOf('```text') + 7));
t('R4a review block template has an endpoint matrix table before Ready for draft', () => {
  const m = tpl.indexOf('| Endpoint');
  const r = tpl.indexOf('Ready for draft');
  assert.ok(m > -1, 'no "| Endpoint" matrix header inside the posted review block template');
  assert.ok(/\|\s*-{3,}/.test(tpl.slice(m)), 'matrix has no separator row');
  assert.ok(r > m, 'Ready for draft is not after the matrix');
});
t('R4b the one-line "Endpoint coverage: complete — YES" no longer replaces the table', () => {
  assert.ok(!/Endpoint coverage: complete — YES \| gaps/.test(tpl) || tpl.indexOf('| Endpoint') > -1);
  assert.ok(/not (a|the) (substitute|block)|without the (matrix )?table/i.test(WF + REV), 'no statement that a one-liner is not the block');
});
t('R4c Phase E3 requires the matrix table in the posted block', () => {
  const e3 = WF.slice(WF.indexOf('### E3 '), WF.indexOf('### E3b'));
  assert.ok(/matrix table/i.test(e3), 'E3 does not name the matrix table');
  assert.ok(/before[^.\n]*Ready for draft/i.test(e3), 'E3 does not put it before Ready for draft');
});
t('R4d ids follow the 2xx-first order, renumbered when a row is added', () => {
  const d = WF.slice(WF.indexOf('## Phase D'), WF.indexOf('## Phase E'));
  assert.ok(/renumber/i.test(d), 'no renumber rule');
  assert.ok(/\bnn\b[^\n]*(table order|row order|order)/i.test(d) || /ids? follow/i.test(d), 'ids not tied to the order');
  assert.ok(/stable/.test(d) && /approv/i.test(d.slice(d.indexOf('stable') - 200, d.indexOf('stable') + 200)) , 'stable not scoped to after approval');
});
t('R4e worked example does not append a 404 id after the happy-path ids', () => {
  assert.ok(!/added `TC_API_Orders_05`/.test(EX), 'example still appends Orders_05 for the 404 row');
  assert.ok(/renumber/i.test(EX), 'example does not show renumbering');
});
t('R4f Row ordering and MUST row still say 2xx first', () => {
  assert.ok(/Happy path \/ success cases\*\* \(2xx\) — listed first/.test(WF));
  assert.ok(/MUST order rows: success \(2xx\) first/.test(WF));
});
t('R4g PR #95 G1 write-failure step unchanged', () => {
  assert.ok(/4\. \*\*Write failure \(steps 1–2, `\.md` \/ `\.csv`\):\*\*/.test(g1));
  assert.ok(/Delivery A may then continue without the attachment: the comment does not mention one and uses no `__ATT1_ID__` placeholder\./.test(g1));
});
t('R4h WORKFLOW.md within 370 lines', () => {
  const W0 = rd('WORKFLOW.md'); const n = W0.split('\n').length - (W0.endsWith('\n') ? 1 : 0);
  assert.ok(n <= 370, `${n} lines`);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
