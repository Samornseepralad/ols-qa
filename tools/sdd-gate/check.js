#!/usr/bin/env node
/**
 * sdd-gate — refuse a code commit that does not cite a spec already on the base branch.
 *
 * Spec: docs/sdd/sdd-commit-gate R1–R7
 *
 * Usage: node tools/sdd-gate/check.js [--base <ref>] [--self-test-only]
 *   exit 0 = every code commit in <base>..HEAD cites docs/sdd/<slug>/ with spec+plan+tasks in <base>
 *   exit 1 = a commit was refused, or the known-answer self-test did not match
 *   R1 (Spec: docs/sdd/ai-native-sdlc-alignment): an SDD folder whose spec.md is ADDED in <base>..HEAD on/after
 *   2026-11-06 must also have intent.md (in the range or on base) — exit 1 otherwise; older folders never affected
 *   R2: WARN-only line "WARN plan-drift …" (exit stays 0) when a code commit changes a non-docs file named in no
 *   plan.md of the SDD folder it cites; commits touching only docs/ are skipped
 *   exit 2 = git could not be read (missing base ref, not a repo) — never a pass
 */
'use strict';
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CODE_TYPE = /^(feat|fix|test|refactor)(\([^)]*\))?!?:/; // R1
const FILES = ['spec.md', 'plan.md', 'tasks.md'];
const INTENT_FROM = '2026-11-06'; // R1: folders created before this date never need intent.md

// A git hook exports GIT_DIR, GIT_INDEX_FILE, GIT_WORK_TREE …; inherited, they would point the throwaway
// self-test repo's commits at the real repository. Every git call runs with them removed (R7).
function cleanEnv() {
  return Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
}

function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: cleanEnv() });
}

function hasFile(cwd, ref, p) {
  try {
    git(cwd, ['cat-file', '-e', `${ref}:${p}`]);
    return true;
  } catch {
    return false;
  }
}

/** R2–R4: slug named by the first `Spec:` line, or null. */
function specSlug(body) {
  const m = body.match(/^Spec:\s*(.+)$/im);
  if (!m) return null;
  const line = m[1].trim();
  const p = line.match(/docs\/sdd\/([A-Za-z0-9._-]+)/);
  if (p) return p[1];
  const t = line.match(/^([A-Za-z0-9._-]+)/);
  if (!t || /^none$/i.test(t[1]) || /^R\d+/.test(t[1])) return null;
  return t[1];
}

/** Classify every code commit in base..head. Throws when git cannot be read. */
function check(cwd, base, head = 'HEAD') {
  git(cwd, ['rev-parse', '--verify', `${base}^{commit}`]);
  const out = git(cwd, ['log', '--no-merges', '--format=%H%x1f%s%x1f%B%x1e', `${base}..${head}`]);
  const results = [];
  for (const rec of out.split('\x1e')) {
    const r = rec.replace(/^\n/, '');
    if (!r.trim()) continue;
    const [sha, subject, body] = r.split('\x1f');
    if (!CODE_TYPE.test(subject)) continue;
    const slug = specSlug(body || '');
    let reason = 'ok';
    let missing = [];
    if (!slug) reason = 'no-spec-line';
    else {
      const dir = `docs/sdd/${slug}/`;
      missing = FILES.filter((f) => !hasFile(cwd, base, dir + f));
      if (missing.length) {
        const onHead = FILES.every((f) => hasFile(cwd, sha, dir + f));
        reason = onHead ? 'spec-not-on-main-first' : 'spec-missing-files';
      }
    }
    results.push({ sha: sha.slice(0, 7), subject, slug, reason, missing });
  }
  return results;
}

/** R1: every docs/sdd/<slug>/spec.md added in base..head on/after INTENT_FROM, and whether intent.md exists at head. */
function checkIntent(cwd, base, head = 'HEAD') {
  git(cwd, ['rev-parse', '--verify', `${base}^{commit}`]);
  const added = git(cwd, ['diff', '--name-only', '--diff-filter=A', base, head, '--', 'docs/sdd/*/spec.md'])
    .split('\n')
    .filter(Boolean);
  const results = [];
  for (const f of added) {
    const m = f.match(/^docs\/sdd\/([^/]+)\/spec\.md$/);
    if (!m || m[1] === '_template') continue;
    const dates = git(cwd, ['log', '--diff-filter=A', '--format=%cs', `${base}..${head}`, '--', f]).trim().split('\n');
    const created = dates[dates.length - 1];
    if (!created || created < INTENT_FROM) continue;
    results.push({ slug: m[1], created, ok: hasFile(cwd, head, `docs/sdd/${m[1]}/intent.md`) });
  }
  return results;
}

/** True when `name` (a file path, or a directory ending in /) appears in `text` as a whole path token. */
function namedIn(text, name) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tail = name.endsWith('/') ? '(?![A-Za-z0-9_.-])' : '(?![A-Za-z0-9_/-])';
  return new RegExp(`(?<![A-Za-z0-9_./-])${esc}${tail}`).test(text);
}

/** R2: warnings for code commits changing a non-docs file that the cited folder's plan.md (at head) does not name. */
function planDrift(cwd, base, head = 'HEAD') {
  const out = git(cwd, ['log', '--no-merges', '--format=%H%x1f%s%x1f%B%x1e', `${base}..${head}`]);
  const warns = [];
  const plans = {};
  for (const rec of out.split('\x1e')) {
    const r = rec.replace(/^\n/, '');
    if (!r.trim()) continue;
    const [sha, subject, body] = r.split('\x1f');
    if (!CODE_TYPE.test(subject)) continue;
    const slug = specSlug(body || '');
    if (!slug) continue;
    if (!(slug in plans)) {
      try {
        plans[slug] = git(cwd, ['show', `${head}:docs/sdd/${slug}/plan.md`]);
      } catch {
        plans[slug] = null;
      }
    }
    if (plans[slug] === null) continue;
    const files = git(cwd, ['diff-tree', '--no-commit-id', '--name-only', '-r', '--root', sha]).split('\n').filter(Boolean);
    const code = files.filter((f) => !f.startsWith('docs/'));
    for (const f of code) {
      const parts = f.split('/');
      const names = [f, ...parts.slice(0, -1).map((_, i) => parts.slice(0, i + 1).join('/') + '/')];
      if (names.some((n) => namedIn(plans[slug], n))) continue;
      warns.push({ sha: sha.slice(0, 7), slug, file: f, line: `WARN plan-drift ${sha.slice(0, 7)} ${f} is named in no plan.md of docs/sdd/${slug}/` });
    }
  }
  return warns;
}

/** R5: known-answer self-test in a throwaway repo. Returns list of mismatches. */
function selfTest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdd-gate-'));
  const g = (...a) => git(dir, a);
  const commit = (msg, files = {}) => {
    for (const [f, c] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
      fs.writeFileSync(path.join(dir, f), c);
      g('add', f);
    }
    g('commit', '-q', '--allow-empty', '-m', msg);
  };
  try {
    g('init', '-q', '-b', 'main');
    g('config', 'user.email', 'gate@example.invalid');
    g('config', 'user.name', 'gate');
    commit('docs(sdd): a', { 'docs/sdd/a/spec.md': 's', 'docs/sdd/a/plan.md': 'p', 'docs/sdd/a/tasks.md': 't' });
    commit('docs(sdd): half', { 'docs/sdd/half/spec.md': 's' });
    g('branch', 'base');
    commit('feat(x): good\n\nSpec: docs/sdd/a R1', { 'x1.js': '1' });
    commit('fix(x): no line', { 'x2.js': '2' });
    commit('test(x): missing\n\nSpec: docs/sdd/nope R2', { 'x3.js': '3' });
    commit('refactor(x): half\n\nSpec: half R1', { 'x4.js': '4' });
    commit('docs(sdd): late', { 'docs/sdd/late/spec.md': 's', 'docs/sdd/late/plan.md': 'p', 'docs/sdd/late/tasks.md': 't' });
    commit('feat(x)!: late spec\n\nSpec: late R1', { 'x5.js': '5' });
    commit('feat: none\n\nSpec: none', { 'x6.js': '6' });
    commit('chore(release): bump', { 'v.txt': '1' });
    const want = {
      'feat(x): good': 'ok',
      'fix(x): no line': 'no-spec-line',
      'test(x): missing': 'spec-missing-files',
      'refactor(x): half': 'spec-missing-files',
      'feat(x)!: late spec': 'spec-not-on-main-first',
      'feat: none': 'no-spec-line',
    };
    const got = Object.fromEntries(check(dir, 'base').map((r) => [r.subject, r.reason]));
    const bad = [];
    for (const [s, w] of Object.entries(want)) if (got[s] !== w) bad.push(`${s}: want ${w}, got ${got[s]}`);
    for (const s of Object.keys(got)) if (!(s in want)) bad.push(`${s}: should not be checked`);
    let threw = false;
    try {
      check(dir, 'no-such-ref');
    } catch {
      threw = true;
    }
    if (!threw) bad.push('missing base ref did not throw');
    return bad;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function main(argv) {
  const i = argv.indexOf('--base');
  const base = i >= 0 ? argv[i + 1] : 'origin/main';
  const bad = selfTest();
  if (bad.length) {
    console.log('[sdd-gate] ✗ self-test mismatch:\n  ' + bad.join('\n  '));
    return 1;
  }
  console.log('[sdd-gate] ✓ self-test: 6 known answers matched');
  if (argv.includes('--self-test-only')) return 0;
  let results;
  try {
    results = check(process.cwd(), base);
  } catch (e) {
    console.log(`[sdd-gate] ✗ cannot read git range ${base}..HEAD — ${String(e.message).split('\n')[0]}`);
    return 2;
  }
  let intents = [];
  let warns = [];
  try {
    intents = checkIntent(process.cwd(), base);
    warns = planDrift(process.cwd(), base);
  } catch (e) {
    console.log(`[sdd-gate] ✗ cannot read git range ${base}..HEAD — ${String(e.message).split('\n')[0]}`);
    return 2;
  }
  for (const w of warns) console.log(w.line);
  const noIntent = intents.filter((i) => !i.ok);
  for (const i of noIntent) console.log(`  ✗ docs/sdd/${i.slug}/ added ${i.created} without intent.md (R1)`);
  const refused = results.filter((r) => r.reason !== 'ok');
  for (const r of refused) {
    console.log(`  ✗ ${r.sha} ${r.reason}${r.missing.length ? ` (${r.missing.join(', ')})` : ''} ${r.subject}`);
  }
  const n = results.length;
  console.log(
    `[sdd-gate] ${refused.length ? '✗' : '✓'} ${base}..HEAD checked ${n}${n ? '' : ' (range empty)'} · ok ${n - refused.length} · refused ${refused.length}`,
  );
  return refused.length || noIntent.length ? 1 : 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { checkIntent, planDrift, check, specSlug, selfTest, CODE_TYPE };
