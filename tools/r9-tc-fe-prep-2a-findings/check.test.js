#!/usr/bin/env node
'use strict';
// Spec: docs/sdd/r9-tc-fe-prep-2a-findings R1 R2 — the 2.5a stop names the 2a conflicts in one line and any unprovided reference ticket.
const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, '..', '..', 'skills', 'procedures', 'tc-fe-prep-workflow', 'requirement-gates.md');
const t = fs.readFileSync(f, 'utf8');
const start = t.indexOf('### 2.5a');
const end = t.indexOf('### 2.5b', start);
const sec = t.slice(start, end);
let failed = 0;
function check(name, ok) { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); if (!ok) failed++; }
check('2.5a section found', start > 0 && end > start);
check('r8 deferral of the 2a.3 prompt kept', /Step 2a\.3 decision prompt is not posted in this turn/.test(sec) && /2\.5d/.test(sec));
check('the stop names the Step 2a conflicting AC/EC pairs in one line (ids only)', /one line[^\n]*(AC|EC)[^\n]*(conflict|contradict)/i.test(sec) || /one line[^\n]*(conflict|contradict)[^\n]*(AC|EC)/i.test(sec));
check('the stop names any reference ticket that was not provided', /reference ticket[^\n]*(not provided|was not given|missing)/i.test(sec) || /(not provided|was not given|missing)[^\n]*reference ticket/i.test(sec));
process.exit(failed ? 1 : 0);
