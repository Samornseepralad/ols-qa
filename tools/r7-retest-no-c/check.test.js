#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r7-skill-gaps-after5 R5): option C is withheld while supersession is unresolved.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const EE = rd('skills/procedures/retest-bug-workflow/execute-and-evidence.md');
const GATE = rd('references/non-pass-challenge-gate.md');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re) => assert.ok(re.test(flat(s)), `missing ${re}`);

t('R5 execute-and-evidence: C withheld while a possibly-superseding source is unresolved', () => {
  // Amended by docs/sdd/r11-skill-fixes-g1 R12: the sentence that repeated itself is now one sentence, same meaning.
  has(EE, /Same while supersession is \*\*unresolved\*\* \(a newer ticket, comment or design that may supersede the expected is not yet confirmed or ruled out\): A · B only — \*\*C confirm defect\*\* is offered only once the AC\/EC check is confirmed authoritative/i);
});
t('R5 gate (C): same gating, unresolved supersession counts', () => {
  has(GATE, /\(C\) Confirm the defect[^]*?not offered while a newer source that may supersede the expected is unresolved[^.]*only when the AC\/EC check is confirmed authoritative/i);
});
process.exit(fail ? 1 : 0);
