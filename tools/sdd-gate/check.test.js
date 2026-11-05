// Spec: docs/sdd/sdd-commit-gate R5 — the known-answer self-test runs with every suite run.
'use strict';
const assert = require('assert');
const { selfTest, specSlug } = require('./check.js');

assert.deepStrictEqual(selfTest(), [], 'self-test must match every known answer');
assert.strictEqual(specSlug('x\n\nSpec: docs/sdd/abc R1 R2'), 'abc');
assert.strictEqual(specSlug('x\n\nspec: abc-def R3'), 'abc-def');
assert.strictEqual(specSlug('x\n\nSpec: R4'), null);
assert.strictEqual(specSlug('x\n\nSpec: none'), null);
assert.strictEqual(specSlug('x'), null);
console.log('[sdd-gate] ✓ check.test.js — self-test + 5 slug cases');

// Spec: docs/sdd/ai-native-sdlc-alignment R1, R2 — intent.md for new SDD folders; plan-drift warning.
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { checkIntent, planDrift } = require('./check.js');

function repo() {
  const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdd-gate-t-'));
  const g = (...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', env, stdio: ['ignore', 'pipe', 'pipe'] });
  g('init', '-q', '-b', 'main');
  g('config', 'user.email', 't@example.invalid');
  g('config', 'user.name', 't');
  const commit = (msg, files = {}, date = '2026-11-10T10:00:00Z') => {
    for (const [f, c] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
      fs.writeFileSync(path.join(dir, f), c);
      g('add', f);
    }
    const e = { ...env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date };
    execFileSync('git', ['commit', '-q', '--allow-empty', '-m', msg], { cwd: dir, env: e, stdio: 'ignore' });
  };
  return { dir, g, commit };
}

// R1: known answers — new folder without intent flagged; with intent ok; old-dated folder never flagged;
// intent already on base counts; a folder whose spec was not added in the range is not checked.
{
  const { dir, g, commit } = repo();
  try {
    commit('docs: old', { 'docs/sdd/old/spec.md': 's' }, '2026-11-01T10:00:00Z');
    commit('docs: base', { 'docs/sdd/onbase/intent.md': 'i' }, '2026-11-02T10:00:00Z');
    g('branch', 'base');
    commit('docs(sdd): no intent', { 'docs/sdd/noint/spec.md': 's' });
    commit('docs(sdd): with intent', { 'docs/sdd/withint/spec.md': 's', 'docs/sdd/withint/intent.md': 'i' });
    commit('docs(sdd): intent later', { 'docs/sdd/later/spec.md': 's' });
    commit('docs(sdd): later intent', { 'docs/sdd/later/intent.md': 'i' });
    commit('docs(sdd): pre-cutoff folder', { 'docs/sdd/early/spec.md': 's' }, '2026-11-05T23:00:00Z');
    commit('docs(sdd): edit old', { 'docs/sdd/old/spec.md': 's2' });
    const got = Object.fromEntries(checkIntent(dir, 'base', 'HEAD').map((r) => [r.slug, r.ok]));
    assert.deepStrictEqual(got, { noint: false, withint: true, later: true }, 'intent known answers (pre-cutoff folder absent)');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// R2: known answers — unnamed file warns; named file or named directory does not; docs-only skipped; never throws.
{
  const { dir, g, commit } = repo();
  try {
    commit('docs(sdd): a', {
      'docs/sdd/a/spec.md': 's',
      'docs/sdd/a/plan.md': 'Files touched: `tools/named.js`, `lib/`',
      'docs/sdd/a/tasks.md': 't',
    });
    g('branch', 'base');
    commit('feat(x): named\n\nSpec: docs/sdd/a R2', { 'tools/named.js': '1' });
    commit('feat(x): dir\n\nSpec: docs/sdd/a R2', { 'lib/deep/y.js': '1' });
    commit('fix(x): unnamed\n\nSpec: docs/sdd/a R2', { 'tools/other.js': '1', 'tools/named.js': '2' });
    commit('docs: only docs\n\nSpec: docs/sdd/a R2', { 'docs/readme.md': '1' });
    commit('feat(x): docs only typed\n\nSpec: docs/sdd/a R2', { 'docs/more.md': '1' });
    const w = planDrift(dir, 'base', 'HEAD');
    assert.deepStrictEqual(w.map((x) => [x.file, x.slug]), [['tools/other.js', 'a']], 'only the unnamed file warns');
    assert.ok(/^WARN plan-drift /.test(w[0].line), 'line starts with WARN plan-drift');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
console.log('[sdd-gate] ✓ check.test.js — intent (R1) + plan-drift (R2) known answers');
