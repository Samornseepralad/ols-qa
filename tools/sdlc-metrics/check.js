#!/usr/bin/env node
/**
 * sdlc-metrics — read-only report of the AI-native SDLC indicators, computed from git and `gh`.
 *
 * Spec: docs/sdd/ai-native-sdlc-alignment R4
 *
 * Usage: node tools/sdlc-metrics/check.js
 *   (1) intent->spec time: first intent.md commit to first spec.md commit, per docs/sdd/<slug>/ having both
 *   (2) rework: spec.md commits dated strictly after the first plan.md commit, per folder
 *   (3) CI green at merge: share of merged PRs whose final check rollup has no failing check
 *       (the rollup is the last state, so a failed-then-rerun PR reads green: a proxy, labelled as such)
 *   (4) PR open->merge time (median, minutes)
 *   (3)/(4) come from `gh pr list --state merged --limit 200`; no gh / not signed in => "not measured".
 *   No network except gh. Nothing is written. Exit 0 whenever the report printed; 2 if git cannot be read.
 */
'use strict';
const { execFileSync } = require('child_process');

// A git hook exports GIT_DIR, GIT_INDEX_FILE …; inherited, they would point the fixture repo at the real one.
function cleanEnv() {
  return Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
}

const SEP = '\x01';

// Parsed history, oldest first: [{ time: ms, slug, file }] for every touch of docs/sdd/<slug>/<file>.
function readSddHistory(cwd) {
  const out = execFileSync('git', ['log', '--reverse', `--format=${SEP}%aI`, '--name-only', '--', 'docs/sdd'], {
    cwd, encoding: 'utf8', env: cleanEnv(), stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024,
  });
  return parseSddLog(out);
}

function parseSddLog(text) {
  const entries = [];
  let time = null;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith(SEP)) { time = Date.parse(line.slice(1)); continue; }
    const mt = /^docs\/sdd\/([^/]+)\/([^/]+)$/.exec(line);
    if (mt && time !== null && !Number.isNaN(time)) entries.push({ time, slug: mt[1], file: mt[2] });
  }
  return entries;
}

function firstTime(list, slug, file) {
  const t = list.filter((e) => e.slug === slug && e.file === file).map((e) => e.time);
  return t.length ? Math.min(...t) : null;
}

function sddMetrics(entries) {
  const slugs = [...new Set(entries.map((e) => e.slug))].sort();
  return slugs.map((slug) => {
    const intent = firstTime(entries, slug, 'intent.md');
    const spec = firstTime(entries, slug, 'spec.md');
    const plan = firstTime(entries, slug, 'plan.md');
    const intentToSpecMin = intent !== null && spec !== null ? Math.round((spec - intent) / 60000) : null;
    const rework = plan === null ? null
      : entries.filter((e) => e.slug === slug && e.file === 'spec.md' && e.time > plan).length;
    return { slug, intentToSpecMin, rework };
  });
}

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const h = s.length >> 1;
  return s.length % 2 ? s[h] : (s[h - 1] + s[h]) / 2;
}

function parsePrs(text) {
  try {
    const prs = JSON.parse(text);
    return Array.isArray(prs) ? { ok: true, prs } : { ok: false };
  } catch {
    return { ok: false };
  }
}

function readPrs(cwd) {
  try {
    const out = execFileSync('gh', ['pr', 'list', '--state', 'merged', '--limit', '200',
      '--json', 'number,createdAt,mergedAt,statusCheckRollup'], {
      cwd, encoding: 'utf8', env: cleanEnv(), stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024,
    });
    return parsePrs(out);
  } catch {
    return { ok: false };
  }
}

const BAD = new Set(['FAILURE', 'CANCELLED', 'TIMED_OUT', 'ACTION_REQUIRED', 'STARTUP_FAILURE', 'ERROR']);

function prMetrics(prs) {
  const withChecks = prs.filter((p) => Array.isArray(p.statusCheckRollup) && p.statusCheckRollup.length > 0);
  const green = withChecks.filter((p) => !p.statusCheckRollup.some((c) => BAD.has(c.conclusion || c.state)));
  const mins = prs
    .map((p) => (Date.parse(p.mergedAt) - Date.parse(p.createdAt)) / 60000)
    .filter((x) => Number.isFinite(x));
  return {
    mergeCount: mins.length,
    ciMeasured: withChecks.length,
    ciGreen: green.length,
    ciGreenPct: withChecks.length ? (green.length / withChecks.length) * 100 : null,
    medianOpenToMergeMin: median(mins),
  };
}

const NM = 'not measured';
const num = (v) => (v === null || v === undefined ? NM : String(Math.round(v * 10) / 10));

function render(rows, pr) {
  const L = [];
  L.push('SDD folders (git history of docs/sdd)');
  L.push(['slug', 'intent->spec (min)', 'spec commits after plan'].join(' | '));
  for (const r of rows) L.push([r.slug, num(r.intentToSpecMin), num(r.rework)].join(' | '));
  const meds = median(rows.map((r) => r.intentToSpecMin).filter((v) => v !== null));
  const rw = rows.map((r) => r.rework).filter((v) => v !== null);
  L.push(`median intent->spec (min): ${num(meds)} over ${rows.filter((r) => r.intentToSpecMin !== null).length} folders`);
  L.push(`total rework commits: ${rw.length ? rw.reduce((a, b) => a + b, 0) : NM} over ${rw.length} folders`);
  L.push('');
  L.push('Merged PRs (gh pr list --state merged --limit 200)');
  if (!pr.ok) {
    L.push(`CI green at merge: ${NM} (gh missing, not signed in, or unreadable)`);
    L.push(`PR open->merge median (min): ${NM}`);
  } else {
    const p = prMetrics(pr.prs);
    L.push(p.ciGreenPct === null
      ? `CI green at merge: ${NM} (no PR with checks)`
      : `CI green at merge: ${p.ciGreenPct.toFixed(1)}% (${p.ciGreen} of ${p.ciMeasured} PRs with checks; final rollup, reruns not visible)`);
    L.push(`PR open->merge median (min): ${num(p.medianOpenToMergeMin)} over ${p.mergeCount} PRs`);
  }
  return L.join('\n');
}

function main() {
  let rows;
  try {
    rows = sddMetrics(readSddHistory(process.cwd()));
  } catch (e) {
    console.error(`[sdlc-metrics] cannot read git history: ${e.message.split('\n')[0]}`);
    return 2;
  }
  console.log(render(rows, readPrs(process.cwd())));
  return 0;
}

module.exports = { readSddHistory, parseSddLog, sddMetrics, median, parsePrs, prMetrics, render };
if (require.main === module) process.exit(main());
