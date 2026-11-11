#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r7-skill-gaps-after5 R2).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const S = fs.readFileSync(path.join(root, 'skills/tc-review-workflow/SKILL.md'), 'utf8');
// r12-p1-three R9: the limit item is now item 3 (execution order); its text is unchanged.
const start = S.indexOf("3. **Fit the platform's message limit");
const end = S.indexOf('4. A thread is reached through a webhook');
const item5 = S.slice(start, end).replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
t('item 5 found', () => assert.ok(start > 0 && end > start, 'item 5 not found'));
t('R2 over-limit after tightening: stop and show the character count', () => {
  assert.ok(/still (exceeds|too long|over)/i.test(item5), 'no "still exceeds the limit" branch');
  assert.ok(/stop/i.test(item5), 'no stop');
  assert.ok(/(show|state|report)[^.]*character count/i.test(item5), 'does not show the character count');
});
t('R2 asks: split into numbered posts, or which findings to cut', () => {
  assert.ok(/numbered posts/i.test(item5), 'no "numbered posts" option');
  assert.ok(/which findings to cut/i.test(item5), 'no "which findings to cut" option');
});
t('R2 sends nothing before the answer', () => {
  assert.ok(/(send|post) nothing[^.]*(until|before)[^.]*answer/i.test(item5), 'no "send nothing before the answer"');
});
t('existing meaning kept: tighten first, do not drop seen findings, no split unless asked', () => {
  assert.ok(/tighten the wording/.test(item5), 'tighten wording lost');
  assert.ok(/Do not drop findings the user saw in chat/.test(item5), 'no-drop lost');
  assert.ok(/unless the user (asks|chooses|answers)|only when the user/i.test(item5), 'no-split-unless-asked lost');
});
t('size: SKILL.md <= 410 lines', () => assert.ok(S.split('\n').length <= 410));
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
