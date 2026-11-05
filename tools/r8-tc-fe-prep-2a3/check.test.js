#!/usr/bin/env node
'use strict';
// Spec: docs/sdd/r8-tc-fe-prep-2a3-order R2 — the 2.5a section says the 2a.3 prompt is not posted at that stop.
const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, '..', '..', 'skills', 'procedures', 'tc-fe-prep-workflow', 'requirement-gates.md');
const t = fs.readFileSync(f, 'utf8');
const start = t.indexOf('### 2.5a');
const end = t.indexOf('### 2.5b', start);
const sec = t.slice(start, end);
let failed = 0;
function check(name, ok) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed++;
}
check('2.5a section found', start > 0 && end > start);
check('2.5a Wait defers the 2a.3 decision prompt until the 2.5d report is opened', /Step 2a\.3[^\n]*(not|never)[^\n]*(this turn|same turn|this stop)/i.test(sec) || /(not|never)[^\n]*Step 2a\.3[^\n]*(this turn|same turn|this stop)/i.test(sec));
check('the sentence names Step 2.5d as the point where 2a.3 is asked', /2\.5d/.test(sec));
process.exit(failed ? 1 : 0);
