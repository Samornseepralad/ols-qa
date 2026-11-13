#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/after16-create-bug R1–R6).
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
const has = (p, re) => assert.ok(re.test(flat(rd(p))), `${p} missing ${re}`);
const lacks = (p, re) => assert.ok(!re.test(flat(rd(p))), `${p} still has ${re}`);
const S = 'skills/create-bug-workflow/SKILL.md';
const P = 'skills/procedures/create-bug-workflow/';

t('R1 Phase C confirm cannot be waived', () => {
  has(`${P}phase-c-confirm.md`, /No waiver: .*agent-rationalizations, helix-session-constraints, skill-invocation-discipline.* never replaces this \*\*confirm\*\*/);
});
t('R2 Phase D GitHub search failure stops with an unknown outcome', () => {
  has(`${P}phase-d-create.md`, /\*\*🔴 GATE — `gh issue create` exits non-zero\*\*/);
  has(`${P}phase-d-create.md`, /\*\*the search itself fails\*\* → \*\*🔴 STOP:\*\* that bug's outcome is unknown/);
  has(`${P}phase-f-close.md`, /which are outcome unknown/);
});
t('R3 examples agree with their templates', () => {
  has(`${P}references/worked-example.md`, /Board check: 2 searched — 0 dropped in B2, 1 dropped in B3, 1 to file/);
  has(`${P}references/worked-example.md`, /gh issue view .* --json title,body,labels/);
  has(`${P}references/bug-draft-template.md`, /Confidence: Confirmed \| Likely \| Needs Review — not filed/);
});
t('R4 GitHub body by HEREDOC, screenshots path', () => {
  has(`${P}phase-d-create.md`, /--body-file - <<'EOF'/);
  lacks(`${P}phase-d-create.md`, /--body "<body>"/);
  has(`${P}phase-d-create.md`, /gh uploads no files/);
});
t('R5 label-list failure and no-MCP branches', () => {
  has(`${P}WORKFLOW.md`, /`gh label list` or createmeta fails/);
  has(`${P}phase-d-create.md`, /No Atlassian MCP in the session/);
});
t('R6 offsets drop only restated text; SKILL.md links stay', () => {
  lacks(`${P}phase-d-create.md`, /renders as garbage/);
  lacks(`${P}references/posting-discipline.md`, /use HEREDOC for body/);
  has(`${P}references/posting-discipline.md`, /per \[phase-f-close\.md\]/);
  has(S, /\[F\]\(\.\.\/procedures\/create-bug-workflow\/phase-f-close\.md\) at their step/);
});

if (fail) { console.log(`\n${fail} failing`); process.exit(1); }
console.log('\nall a16-create-bug rule checks pass');
