#!/usr/bin/env node
// Iron Canvas · Blender engine wrapper (Windows-first). Runs blender_forge.py headless in its own process.
//
//   node engines/blender/blender.mjs plan     --job job.json      what would run, and where
//   node engines/blender/blender.mjs sheet    --job job.json      clay-camera: 21 stills + sheet.png + the rail — approve before run
//   node engines/blender/blender.mjs run      --job job.json      render/export into .ic/runs/<ts>-<name>/
//   node engines/blender/blender.mjs selftest                     prove the install (cube → frame + GLB)
//
// Exit 0 ok · 1 job failed (incl. over tier budget) · 2 Blender unavailable → plan printed, build uses the fallback.
// Headless scripts, not the MCP server, are the production path: the official Blender MCP executes model-written
// code without guards — keep it for sessions a human is watching.
import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync, mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXIT, args, loadConfig, findBlender, readJSON, writeJSON, newRunDir, appendManifest, provenance, glbStats, which } from '../lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const FORGE = path.join(here, 'blender_forge.py');
const a = args();
const cmd = a._[0] || 'plan';
const root = path.resolve(a.root || process.cwd());
const { config } = loadConfig(root);

const TIER_BUDGET = { II: { triangles: 150000, bytes: 1.5e6, draw_calls: 100 }, III: { triangles: 600000, bytes: 8e6, draw_calls: 300 } };

let job;
if (cmd === 'selftest') {
  job = { type: 'selftest', name: 'selftest', seed: 1 };
} else {
  if (!a.job || !existsSync(a.job)) { console.error('usage: blender.mjs plan|sheet|run --job job.json  (or: selftest)'); process.exit(EXIT.ERROR); }
  job = readJSON(a.job);
  if (cmd === 'sheet') {
    if (job.type !== 'clay-camera') { console.error('sheet applies to clay-camera jobs'); process.exit(EXIT.ERROR); }
    job = { ...job, _sheet: true, name: `${job.name || 'clay'}-sheet` };
  }
}
const blender = findBlender(config.engines?.blender?.binary || '');
const outputs = {
  selftest: ['selftest/frame_0001.png', 'selftest.glb'],
  'clay-camera': job._sheet
    ? ['sheet/still_00..20.png → sheet.png (7×3) — approve before the full render', 'camera-rail.json (baked samples + the move in words)']
    : ['clay-frames/frame_*.png (counted: artifact proof)', 'clay.mp4 (flat grey, delivery aspect — the Seedance @Video1 camera reference)', 'camera-rail.json (ic-camera-rail/2: baked per-frame samples for runtime/camera-rail.js)'],
  'hero-object': [`${job.name || 'hero'}.glb`, `${job.name || 'hero'}.stats.json`, 'turntable/view_0..3.png'],
  turntable: ['turntable-frames/frame_*.png → encode with ledger.mjs --profile scroll-tied'],
  matcap: [`${job.name || 'matcap'}.png`],
}[job.type] || ['(unknown job type)'];

function printPlan(reason) {
  console.log(`Iron Canvas · Blender engine — ${job.type} "${job.name || job.type}"${reason ? `  [${reason}]` : ''}`);
  console.log(`  binary   ${blender ? `${blender.binary} (${blender.version})` : 'not found (set engines.blender.binary in canvas.config.json or BLENDER_PATH)'}`);
  console.log(`  command  "${blender?.binary || 'blender'}" --background --factory-startup --python "${FORGE}" -- --job <job.json> --out <run>/candidates/blender/${job.name || job.type}`);
  console.log(`  outputs  ${outputs.join('\n           ')}`);
  if (job.tier) console.log(`  budget   Tier ${job.tier}: ≤ ${TIER_BUDGET[job.tier]?.triangles} tris · ≤ ${(TIER_BUDGET[job.tier]?.bytes / 1e6).toFixed(1)} MB · ≤ ${TIER_BUDGET[job.tier]?.draw_calls} draw calls`);
  if (!blender) console.log('  fallback procedural three.js geometry → §19 point-cloud promotion → Tier I composed-depth still (never flat)');
}

if (cmd === 'plan') { printPlan(); process.exit(EXIT.OK); }
if (!blender) { printPlan('Blender unavailable'); process.exit(EXIT.UNAVAILABLE); }

const runDir = cmd === 'selftest' ? mkdtempSync(path.join(tmpdir(), 'ic-blender-selftest-')) : newRunDir(`blender-${job.name || job.type}`, root);
const out = path.join(runDir, 'candidates', 'blender', job.name || job.type);
const jobPath = path.join(runDir, cmd === 'selftest' ? 'selftest.job.json' : 'inputs/job.json');
writeJSON(jobPath, job);

const started = Date.now();
const r = spawnSync(blender.binary, ['--background', '--factory-startup', '--python', FORGE, '--', '--job', jobPath, '--out', out], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const log = `${r.stdout || ''}\n${r.stderr || ''}`;
writeFileSync(path.join(runDir, 'blender.log'), log);
if (r.status !== 0 || !existsSync(path.join(out, 'result.json'))) {
  console.error(`blender job failed (exit ${r.status}). Log: ${path.join(runDir, 'blender.log')}\n${log.split('\n').filter((l) => /error|traceback/i.test(l)).slice(-8).join('\n')}`);
  process.exit(EXIT.ERROR);
}
const result = readJSON(path.join(out, 'result.json'));

// Artifact proof: a render counts as done only when every expected frame exists (a clean exit code is not enough).
for (const [folder, expected] of Object.entries(result.expected_frames || {})) {
  const dir = path.join(out, folder);
  const got = existsSync(dir) ? readdirSync(dir).filter((f) => /\.png$/i.test(f)).length : 0;
  if (got !== expected) { console.error(`artifact proof failed: ${folder} has ${got} frame(s), expected ${expected}`); process.exit(EXIT.ERROR); }
}

// The approval gate: tile the 21 stills into one sheet and stop before the full render.
if (job._sheet) {
  if (!which('ffmpeg')) { console.error('ffmpeg is required to tile the sheet'); process.exit(EXIT.ERROR); }
  const tile = spawnSync('ffmpeg', ['-y', '-v', 'error', '-i', path.join(out, 'sheet', 'still_%02d.png'), '-vf', 'scale=480:-2,tile=7x3:padding=6:margin=6', '-frames:v', '1', path.join(out, 'sheet.png')], { encoding: 'utf8' });
  if (tile.status !== 0) { console.error(tile.stderr); process.exit(EXIT.ERROR); }
  const rail = readJSON(path.join(out, 'camera-rail.json'));
  console.log(`✓ sheet → ${path.join(out, 'sheet.png')}\n  move: ${rail.move}\n  Approve it (who, and why) before the full render: node engines/blender/blender.mjs run --job ${a.job}`);
  process.exit(EXIT.OK);
}

// The clay frames become the camera reference clip Seedance reads.
if (job.type === 'clay-camera') {
  if (!which('ffmpeg')) { console.error('ffmpeg is required to encode clay.mp4'); process.exit(EXIT.ERROR); }
  const fps = String(job.fps || 24);
  const enc = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', fps, '-i', path.join(out, 'clay-frames', 'frame_%04d.png'), '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(out, 'clay.mp4')], { encoding: 'utf8' });
  if (enc.status !== 0) { console.error(enc.stderr); process.exit(EXIT.ERROR); }
  result.files.push(path.join(out, 'clay.mp4'));
}

// Budgets are enforced, not advised: an over-budget hero fails the job.
let failed = false;
for (const f of result.files.filter((f) => f.endsWith('.glb'))) {
  const s = glbStats(f);
  const b = TIER_BUDGET[job.tier];
  if (b && s && (s.triangles > b.triangles || s.bytes > b.bytes || s.draw_calls_est > b.draw_calls)) {
    console.error(`over Tier ${job.tier} budget: ${path.basename(f)} ${s.triangles} tris, ${(s.bytes / 1e6).toFixed(2)} MB, ${s.draw_calls_est} draw calls`);
    failed = true;
  }
}

if (cmd !== 'selftest') {
  appendManifest(runDir, { job: { engine: 'blender', type: job.type, name: job.name, seed: result.seed, blender: result.blender, seconds: +((Date.now() - started) / 1000).toFixed(1) } });
  const keep = result.files.filter((f) => /\.(glb|mp4|json)$/i.test(f) || /view_\d\.png$|matcap.*\.png$/i.test(f));
  for (const f of keep.filter((f) => !f.endsWith('result.json') && !f.endsWith('.stats.json'))) {
    const prov = provenance({
      engine: 'blender', tool: 'blender', tool_version: result.blender, access: 'local', seed: result.seed, params: job,
      inputs: [jobPath], output: f, run_id: path.basename(runDir), candidate_id: path.relative(runDir, f),
      rights: { status: 'owned', basis: 'procedural — generated from code, no external assets' },
    });
    writeJSON(`${f}.provenance.json`, prov);
    appendManifest(runDir, { item: { file: path.relative(runDir, f), sha256: prov.output.sha256, bytes: prov.output.bytes, media: prov.output.media, mesh: prov.output.mesh, selected: false, selection_reason: '' } });
  }
}

const pngs = result.files.filter((f) => f.endsWith('.png')).length;
console.log(`✓ ${job.type} in ${((Date.now() - started) / 1000).toFixed(1)}s — ${result.files.length} files (${pngs} frames/stills) → ${out}`);
if (cmd === 'selftest') console.log('  selftest passed: Blender renders headless and exports GLB on this machine.');
process.exit(failed ? EXIT.ERROR : EXIT.OK);
