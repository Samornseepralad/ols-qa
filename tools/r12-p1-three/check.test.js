#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r12-p1-three R1–R10).
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
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);
const lacks = (s, re, msg) => assert.ok(!re.test(flat(s)), msg || `still has ${re}`);
const TPL = rd('skills/procedures/create-bug-workflow/references/bug-draft-template.md');
const DRC = rd('references/defect-report-completeness.md');
const FE = rd('skills/procedures/tc-fe-prep-workflow/WORKFLOW.md');
// Step 5 lives in notify.md (owner 13/Nov/2026); SKILL.md + notify.md are checked as one workflow.
const TR = rd('skills/tc-review-workflow/SKILL.md') + '\n' + rd('skills/tc-review-workflow/notify.md');
const CMD = rd('commands/tc-review.md');
const between = (s, a, b) => { const i = s.indexOf(a); const j = s.indexOf(b, i + 1); return i >= 0 && j > i ? s.slice(i, j) : ''; };
const draft = between(TPL, '```text', '━━━━━━━━━━━━━━');

// create-bug-workflow#0
t('R1 template has a Why failed line: verbatim expected line + exact deviation', () => {
  has(draft, /Why failed: "\{the expected-result line, copied character for character\}" → \{the exact deviation/);
});
t('R2 template has a Resolution options table with Decided by per option; QA picks neither', () => {
  has(draft, /Resolution options \(QA picks neither\):/);
  has(draft, /\| Option \| Decided by \| What happens \|/);
  has(draft, /\| spec owner \(\{PO \/ reporter\}\) \| update the expected-result text[^|]*no code change \|/);
  has(draft, /\| dev \(\{assignee\}\) \| change `\{exact surface \/ route\}` to `\{concrete target behavior\}`/);
});
t('R3 template answers the §5 fix-status and what-did-you-run questions', () => {
  has(draft, /Fix status: new report — no fix delivered yet/);
  has(draft, /Role \/ account: \{role tag — never a password\}/);
});
t('R4 claim names the sections; contract §1 points to the create-bug format; contract rows intact', () => {
  has(TPL, /§1 five questions, §2 repro matrix, §4 resolution options, §5 dev-question gate/);
  has(DRC, /\*\*Create-bug draft format\.\*\* The Helix default draft \(`create-bug-workflow\/references\/bug-draft-template\.md`\)/);
  has(DRC, /MUST include a resolution-options table with a named owner per option whenever actual ≠ expected but the reported symptom is fixed/);
  has(DRC, /\| 4 \| Why is that a FAIL and not a nitpick\? \| \*\*Why-failed\*\* line/);
  has(DRC, /is the \*\*resolution table with owners\*\* present\?/);
});

// tc-fe-prep-workflow#1
const s6 = between(FE, '## Step 6 —', '## Step 6.5 —');
t('R5 Step 6 write-failure branch: STOP, exact error + path, nothing partial, in-chat copy, no Step 7', () => {
  has(s6, /\*\*🔴 GATE — STOP: a workspace write fails\.\*\*/);
  has(s6, /report the exact error text and the path that failed/);
  has(s6, /which files were and were not written/);
  has(s6, /never leave a half-written file/);
  has(s6, /offer the approved draft as an in-chat copy/i);
  has(s6, /Step 7 never starts with a partial file set/);
});
t('R6 Step 6 openpyxl-missing branch: say so, offer CSV, install only as suggestion, wait for choice', () => {
  has(s6, /\*\*🔴 GATE — STOP: xlsx requested, `openpyxl` missing\.\*\*/);
  has(s6, /python3 -c "import openpyxl"/);
  has(s6, /offer the CSV pair instead/);
  has(s6, /`python3 -m pip install --user openpyxl` only as a suggestion the user runs — never install it yourself/);
  has(s6, /write nothing until the user chooses/i);
  has(s6, /never silently produce CSV when xlsx was requested/i);
});

// tc-review-workflow#1
const s5 = rd('skills/tc-review-workflow/notify.md');
const order = [
  '1. **Identity for a mention:**',
  '2. Use the wording conventions',
  "3. **Fit the platform's message limit",
  '4. A thread is reached through a webhook',
  '5. 🔴 **GATE — before the external send:**',
  '6. **Send, then read the response back**',
  '7. **Wrong destination → delete and resend**',
  '8. **Revising a review that is already posted**',
];
t('R7 Step 5 items numbered in execution order', () => {
  let last = -1;
  for (const a of order) { const i = s5.indexOf(a); assert.ok(i > last, `out of order or missing: ${a}`); last = i; }
});
t('R8 run-order sentence consistent; pointers moved to new numbers', () => {
  lacks(s5, /run order 1 → 8 → 5 → 7 → 2 → 3/);
  has(s5, /Then, in this order \(items 1–6 every send; items 7 and 8 only when correcting a sent message\):/);
  has(s5, /the final text exactly as it will be sent \(after any item-3 tightening\)/);
  has(s5, /nothing goes out without the thread answer and the item-5 preview/);
  has(s5, /must still fit the item 3 limit/);
  has(s5, /ask for the current webhook for that thread \(item 4\)/);
  has(s5, /never write it into the repo or repeat it in chat; then continue from item 5/);
  has(s5, /\*\*Go back:\*\* If the item-6 read-back shows the wrong destination, delete and resend \(item 7\); wrong content or an unresolved mention → edit in place \(item 7 second rule; method and its failure branch in item 8\)/);
  has(TR, /an unverified send returns to Step 5 item 5/);
  lacks(CMD, /item [0-9]/);
});
t('R10 tc-review SKILL.md ≤ 403 lines and < 30000 bytes', () => {
  const n = TR.split('\n').length;
  assert.ok(n <= 403, `${n} lines`);
  assert.ok(Buffer.byteLength(TR) < 30000, `${Buffer.byteLength(TR)} bytes`);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
