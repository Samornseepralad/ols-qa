#!/usr/bin/env node
'use strict';
// Rule-text test for create-bug-workflow (spec docs/sdd/r6-create-bug-draft-and-attach R1-R8).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const SKILL = rd('skills/create-bug-workflow/SKILL.md');
const WF = ['phase-b2-board-check.md', 'phase-e-falsification.md', 'phase-c-confirm.md', 'phase-d-create.md', 'phase-f-close.md', 'WORKFLOW.md'].map((f) => rd(`skills/procedures/create-bug-workflow/${f}`)).join('\n');
const WE = rd('skills/procedures/create-bug-workflow/references/worked-example.md');
const TPL = rd('skills/procedures/create-bug-workflow/references/bug-draft-template.md');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re, msg) => assert.ok(re.test(flat(s)), msg || `missing ${re}`);
const lacks = (s, re, msg) => assert.ok(!re.test(flat(s)), msg || `still has ${re}`);

t('R4 SKILL.md no longer says Needs Review writes no draft', () => {
  lacks(SKILL, /every candidate is dropped or Needs Review writes no draft/);
  has(SKILL, /Needs Review — not filed/);
});
t('R1 WORKFLOW Needs Review is drafted and shown, labelled', () => {
  lacks(WF, /not drafted and not filed/);
  has(WF, /Needs Review — not filed/);
});
t('R2 confirm block excludes Needs Review from Bug count and confirm', () => {
  lacks(WF, /per item: title — open question \(not drafted, not filed\)/);
  has(WF, /not counted in Bug count/);
});
t('R3 answered Needs Review question is re-checked and confirm block re-shown', () => {
  has(WF, /When the user answers a Needs Review question, return to the top of this phase/);
  has(WF, /show the (Phase C )?confirm block again/);
});
t('R1 worked example shows the Needs Review draft', () => has(WE, /Needs Review — not filed/));
t('R5 new bug: create without embed, attach, update body, re-fetch', () => {
  lacks(WF, /Attach screenshots to Jira before embedding them in wiki bodies/);
  has(WF, /new bug[^.]*create the issue first with a body that has no image embed/i);
  has(WF, /then upload the attachments[^.]*then update the body[^.]*then re-fetch/i);
  has(WF, /attach before embed[^.]*only[^.]*already has a key/i);
});
t('R6 issue created but attach failed: verbatim error, key, three choices, never continue', () => {
  has(WF, /issue (is )?created but[^.]*attach(ment)? (upload )?fail/i);
  has(WF, /issue key that now exists/);
  has(WF, /retry[^.]*leave the image out[^.]*attach it by hand/i);
  has(WF, /Never continue on your own/);
});
t('R7 bare embeds, no width param, img-width-param scan kept', () => {
  has(WF, /Embed screenshots \*\*bare\*\* — `!file.png!`/);
  has(WF, /A width parameter puts a pipe inside a table cell/);
  has(WF, /img-width-param/);
});
t('R8 template agrees for a new bug', () => {
  lacks(TPL, /attach to the issue first, then reference it inline/);
  has(TPL, /create the issue first[^)]*attach[^)]*update/i);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
