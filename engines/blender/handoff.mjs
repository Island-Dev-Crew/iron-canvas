#!/usr/bin/env node
// Iron Canvas · the Blender handoff — prove the twin camera on a machine that has Blender.
//
//   node engines/blender/handoff.mjs            run every step; print the parity URL
//   node engines/blender/handoff.mjs complete   after the parity page shows PASS: record it, delete HANDOFF-BLENDER.md
//
// Steps: find Blender → selftest (headless render + GLB) → the example clay rail as a 21-still sheet →
// the full clay render (clay.mp4 + baked camera-rail.json, frame-count proof) → the parity URL.
// State is kept in .ic/blender-handoff.json so a re-run resumes instead of starting over.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findBlender } from '../lib.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const STATE = path.join(repo, '.ic', 'blender-handoff.json');
const HANDOFF = path.join(repo, 'HANDOFF-BLENDER.md');
const JOB = 'engines/examples/living-canvas-rail.clay.json';
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { steps: {} };
const save = () => { mkdirSync(path.dirname(STATE), { recursive: true }); writeFileSync(STATE, `${JSON.stringify(state, null, 2)}\n`); };
const node = (args) => spawnSync(process.execPath, args, { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const step = (name, fn) => {
  if (state.steps[name]?.ok) { console.log(`✓ ${name} (done ${state.steps[name].at})`); return state.steps[name]; }
  console.log(`… ${name}`);
  const r = fn();
  state.steps[name] = { ...r, at: new Date().toISOString() };
  save();
  if (!r.ok) { console.error(`✗ ${name}: ${r.error}`); process.exit(1); }
  console.log(`✓ ${name}${r.note ? ` — ${r.note}` : ''}`);
  return state.steps[name];
};
const newestRun = (prefix) => {
  const runs = path.join(repo, '.ic', 'runs');
  const dirs = existsSync(runs) ? readdirSync(runs).filter((d) => d.includes(prefix)).sort() : [];
  return dirs.length ? path.join(runs, dirs.at(-1)) : null;
};

if (process.argv[2] === 'complete') {
  const run = state.steps.render?.run;
  if (!run) { console.error('Run the handoff steps first: node engines/blender/handoff.mjs'); process.exit(1); }
  const resultPath = path.join(repo, '.ic', 'parity.json');
  if (!existsSync(resultPath)) {
    console.error(`Save the parity page's result first: copy JSON.stringify(window.__parity) into ${path.relative(repo, resultPath)}`);
    process.exit(1);
  }
  const parity = JSON.parse(readFileSync(resultPath, 'utf8'));
  if (!parity.pass || parity.selftest) { console.error('The recorded parity result is not a PASS on a real run — fix, re-run, re-record.'); process.exit(1); }
  const record = { at: new Date().toISOString(), blender: state.steps.blender?.version, run, results: parity.results, threshold: parity.threshold };
  mkdirSync(path.join(repo, 'engines', 'blender', 'evidence'), { recursive: true });
  writeFileSync(path.join(repo, 'engines', 'blender', 'evidence', 'twin-camera-parity.json'), `${JSON.stringify(record, null, 2)}\n`);
  if (existsSync(HANDOFF)) rmSync(HANDOFF);
  console.log('✓ parity recorded → engines/blender/evidence/twin-camera-parity.json');
  console.log('✓ HANDOFF-BLENDER.md deleted — the handoff is complete.');
  console.log('Next: commit on a branch and open a PR (staging-first), e.g.\n  git switch -c proof/blender-twin-camera && git add -A engines/blender/evidence HANDOFF-BLENDER.md && git commit -m "proof: twin-camera parity on Blender <version>"');
  process.exit(0);
}

const blender = step('blender', () => {
  const b = findBlender(process.env.BLENDER_PATH || '');
  return b ? { ok: true, version: b.version, binary: b.binary, note: `${b.version} at ${b.binary}` }
    : { ok: false, error: 'Blender not found. macOS: brew install --cask blender (or install to /Applications), or set BLENDER_PATH.' };
});

step('ffmpeg', () => {
  const r = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  return r.status === 0 ? { ok: true, note: r.stdout.split('\n')[0] } : { ok: false, error: 'ffmpeg not found. macOS: brew install ffmpeg' };
});

step('selftest', () => {
  const r = node(['engines/blender/blender.mjs', 'selftest']);
  return r.status === 0 ? { ok: true, note: 'headless render + GLB export work' } : { ok: false, error: (r.stderr || r.stdout).slice(-800) };
});

step('sheet', () => {
  const r = node(['engines/blender/blender.mjs', 'sheet', '--job', JOB]);
  const run = newestRun('blender-');
  return r.status === 0 ? { ok: true, run: run && path.relative(repo, run), note: 'approve the 21-still sheet.png before trusting the full render' }
    : { ok: false, error: (r.stderr || r.stdout).slice(-800) };
});

const render = step('render', () => {
  const r = node(['engines/blender/blender.mjs', 'run', '--job', JOB]);
  const run = newestRun('blender-');
  const name = JSON.parse(readFileSync(path.join(repo, JOB), 'utf8')).name || 'clay-camera';
  const out = run && path.relative(repo, path.join(run, 'candidates', 'blender', name)).split(path.sep).join('/');
  return r.status === 0 && out && existsSync(path.join(repo, out, 'camera-rail.json'))
    ? { ok: true, run: out, note: 'clay.mp4 + baked camera-rail.json, frames counted' }
    : { ok: false, error: (r.stderr || r.stdout || 'no camera-rail.json written').slice(-800) };
});

console.log(`
Last step — the side-by-side parity check (the browser renders three.js, so a human or a browser tool opens it):
  npx --yes http-server . -p 4174 -c-1
  open "http://localhost:4174/engines/blender/parity.html?selftest"          (should say SELFTEST PASS)
  open "http://localhost:4174/engines/blender/parity.html?run=${render.run}"
PASS = every IoU ≥ 0.90 at the first, middle and last frame. Then save JSON.stringify(window.__parity)
to .ic/parity.json and run:  node engines/blender/handoff.mjs complete`);
