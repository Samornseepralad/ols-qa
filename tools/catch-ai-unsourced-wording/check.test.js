#!/usr/bin/env node
'use strict';
// Rule-text test for catch-ai (spec docs/sdd/r6-catch-ai-unsourced-wording R1-R5).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const REF = rd('skills/catch-ai-workflow/reference.md');
const SKILL = rd('skills/catch-ai-workflow/SKILL.md');
const flat = (s) => s.replace(/\s+/g, ' ');
const para = REF.split('\n').find((l) => /unsourced claim/i.test(l) && /cite the source or remove the line/i.test(l)) || '';
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);

t('R1 reference unsourced-claim paragraph exists and says own class + own tally', () => {
  assert.ok(para, 'unsourced-claim paragraph not found in reference.md');
  has(para, /own class/i);
  has(para, /own tally/i);
});
t('R1 severity and cite-or-remove correction are kept', () => {
  has(para, /Major when the claim is load-bearing and Minor when it is incidental/i);
  has(para, /cite the source or remove the line/i);
});
t('R2 reference says it is not added to the Defect count', () => {
  has(para, /not added to the Defect count/i);
});
t('R3 old wording "defect in its own right" is gone from reference.md', () => {
  assert.ok(!/defect in its own right/i.test(flat(REF)), 'old phrase still present');
});
t('R3 last sentence kept: never paired with an asserted true value', () => {
  has(para, /Never pair it with an asserted true value you could not observe; that value is a separate Question/i);
});
t('R4/R5 SKILL.md keeps the stricter rule and the label', () => {
  has(SKILL, /never added to the Defect count/i);
  has(SKILL, /Defect \(unsourced claim\)/);
  has(SKILL, /no row is reclassified to reach the number the user claimed/i);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
