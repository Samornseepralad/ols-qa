#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/a14-helix-install-question R1–R5): the install question from
// session-start-context.md is asked first and alone, so it never shares a reply with the
// router's one question (skills/helix/SKILL.md "ask exactly one question").
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const P = 'references/session-start-context.md';
const S = fs.readFileSync(path.join(root, P), 'utf8');
const flat = S.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
t('R1 install question is asked first and alone; the skill\'s first question waits for the next message', () => {
  assert.ok(/first and alone/i.test(flat), 'no "first and alone" rule');
  assert.ok(/asks nothing else/i.test(flat), 'no "asks nothing else" clause');
  assert.ok(/first question[^.]*waits for the user's next message/i.test(flat), 'skill\'s first question does not wait for the next message');
});
t('R2 a non-answer counts as no; never asked again this session', () => {
  assert.ok(/does not answer it counts as no/i.test(flat), 'non-answer rule missing');
  assert.ok(/Do not ask again this session/.test(flat), '"Do not ask again this session" missing');
});
t('R3 install question, both reasons, free-plugins note and NEVER line kept', () => {
  assert.ok(/ask the user \*\*once\*\* whether to install it/.test(S), 'install question weakened');
  assert.ok(/\*\*context-mode\*\* — /.test(S) && /\*\*caveman lite\*\* — /.test(S), 'a reason bullet is missing');
  assert.ok(S.split('\n').includes('   Both are free plugins. NEVER install without a clear yes.'), 'NEVER line changed');
});
t('R4 file bytes <= 1042 (read by every Helix skill)', () => {
  const n = Buffer.byteLength(S, 'utf8');
  assert.ok(n <= 1042, `${n} bytes > 1042`);
});
t('R5 router one-question rule unchanged', () => {
  const r = fs.readFileSync(path.join(root, 'skills/helix/SKILL.md'), 'utf8');
  assert.ok(/ask exactly one question, and that question asks for one item/.test(r));
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
