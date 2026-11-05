#!/usr/bin/env node
'use strict';
// WORKFLOW.md body is frozen by tools/tc-fe-prep-frontmatter R3, so the line lives in the template WORKFLOW Step 5 points to.
// Rule-text test (spec docs/sdd/r7-skill-gaps-after5 R7): row order is stated where rows are written.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const D = 'skills/procedures/tc-fe-prep-workflow/';
const rd = (p) => fs.readFileSync(path.join(root, D, p), 'utf8');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const ORDER = /AC(?:s)?[^\n]{0,40}ascending[^\n]{0,60}EC(?:s)?[^\n]{0,40}ascending/i;
t('R7 html-draft-template TABLE_ROWS section states AC asc then EC asc', () => {
  const s = rd('references/html-draft-template.md');
  const sec = s.slice(s.indexOf('## How to build TABLE_ROWS'));
  assert.ok(ORDER.test(sec), 'TABLE_ROWS section lacks AC ascending then EC ascending');
});
t('R7 design-and-review 3e keeps the rule', () => {
  assert.ok(ORDER.test(rd('design-and-review.md')));
});
t('R7 ADF template example rows follow Unit -> Integration -> System', () => {
  const rank = { 'Unit Test': 0, 'Integration Test': 1, 'System Test': 2 };
  const all = rd('references/jira-comment-adf-template.md').split('\n');
  const blocks = [];
  all.forEach((l, i) => {
    if (/^(\d+ \| |(AC|EC)_\d+ · )/.test(l)) {
      if (i > 0 && blocks.length && blocks[blocks.length - 1].end === i - 1) { blocks[blocks.length - 1].rows.push(l); blocks[blocks.length - 1].end = i; }
      else blocks.push({ rows: [l], end: i });
    }
  });
  assert.ok(blocks.length >= 2 && blocks.every((b) => b.rows.length >= 2), 'expected 2 example blocks of >=2 rows');
  for (const b of blocks) {
    const types = b.rows.map((l) => (l.match(/(Unit|Integration|System) Test/) || [])[0]);
    for (let i = 1; i < types.length; i++) assert.ok(rank[types[i]] >= rank[types[i - 1]], `${types[i]} after ${types[i - 1]}`);
  }
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
