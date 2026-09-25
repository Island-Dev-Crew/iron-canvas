#!/usr/bin/env node
// Iron Canvas · Media ledger — candidates → selection with reasons → verified → encoded → promoted with provenance.
//
//   node engines/ledger.mjs list    --run <runDir>
//   node engines/ledger.mjs select  --run <runDir> --candidate <file> --reason "why this one, in a sentence"
//   node engines/ledger.mjs verify  --run <runDir>                        re-hashes every file; exit 1 on drift
//   node engines/ledger.mjs encode  --in <file> --profile <profile> --out <dir>
//   node engines/ledger.mjs promote --run <runDir> --candidate <file> --to public/video/hero.mp4
//
// Profiles: bg-loop (muted, 1920 + 1280 renditions) · brand-film (1080p + AAC) · scroll-tied (15fps WebP frames,
// desktop + mobile) · poster (a still from 40% in, not frame 0 — first frames are often black or unsettled).
// Never silently promote candidate 1: promotion requires a recorded selection reason.
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { EXIT, args, readJSON, writeJSON, sha256, ffprobe, glbStats } from './lib.mjs';

const a = args();
const cmd = a._[0];
const manifestPath = a.run ? path.join(a.run, 'manifest.json') : null;
const load = () => { if (!manifestPath || !existsSync(manifestPath)) { console.error('--run <runDir> with a manifest.json is required'); process.exit(EXIT.ERROR); } return readJSON(manifestPath); };
const findItem = (m, candidate) => m.items.find((i) => i.file === candidate || path.basename(i.file) === path.basename(candidate));

function ff(argsList) {
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...argsList], { encoding: 'utf8' });
  if (r.status !== 0) { console.error(r.stderr); process.exit(EXIT.ERROR); }
}

switch (cmd) {
  case 'list': {
    const m = load();
    console.log(`${m.run_id} — ${m.items.length} item(s)`);
    for (const i of m.items) {
      const media = i.media ? `${i.media.duration_s}s ${i.media.width}×${i.media.height}` : i.mesh ? `${i.mesh.triangles} tris` : '';
      console.log(`  ${i.selected ? '★' : '·'} ${i.file}  ${media}  ${i.selection_reason ? `— ${i.selection_reason}` : ''}`);
    }
    break;
  }
  case 'select': {
    const m = load();
    const item = findItem(m, a.candidate || '');
    if (!item) { console.error(`no candidate ${a.candidate} in ${m.run_id}`); process.exit(EXIT.ERROR); }
    const reason = typeof a.reason === 'string' ? a.reason.trim() : '';
    if (reason.length < 16) { console.error('a selection needs a real reason (16+ characters): what makes this one win?'); process.exit(EXIT.ERROR); }
    item.selected = true;
    item.selection_reason = reason;
    item.selected_at_utc = new Date().toISOString();
    writeJSON(manifestPath, m);
    const provPath = path.join(a.run, `${item.file}.provenance.json`);
    if (existsSync(provPath)) { const p = readJSON(provPath); p.selected = true; p.selection_reason = reason; writeJSON(provPath, p); }
    console.log(`★ selected ${item.file}`);
    break;
  }
  case 'verify': {
    const m = load();
    let bad = 0;
    for (const i of m.items) {
      const f = path.join(a.run, i.file);
      if (!existsSync(f)) { console.log(`  ✗ missing ${i.file}`); bad++; continue; }
      const now = sha256(f);
      if (now !== i.sha256) { console.log(`  ✗ hash drift ${i.file}`); bad++; continue; }
      if (i.selected && !i.selection_reason) { console.log(`  ✗ selected without a reason ${i.file}`); bad++; continue; }
      console.log(`  ✓ ${i.file}`);
    }
    console.log(bad ? `${bad} problem(s) — ledger does not verify` : `ledger verifies: ${m.items.length} item(s) re-hashed`);
    process.exit(bad ? EXIT.ERROR : EXIT.OK);
  }
  case 'encode': {
    if (!a.in || !existsSync(a.in)) { console.error('encode needs --in <file>'); process.exit(EXIT.ERROR); }
    const out = path.resolve(a.out || '.');
    mkdirSync(out, { recursive: true });
    const stem = path.basename(a.in, path.extname(a.in));
    const profile = a.profile;
    if (profile === 'bg-loop') {
      ff(['-i', a.in, '-an', '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-vf', 'scale=1920:-2', path.join(out, `${stem}.1920.mp4`)]);
      ff(['-i', a.in, '-an', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-vf', 'scale=1280:-2', path.join(out, `${stem}.1280.mp4`)]);
    } else if (profile === 'brand-film') {
      ff(['-i', a.in, '-vf', 'scale=-2:1080', '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '160k', path.join(out, `${stem}.1080.mp4`)]);
    } else if (profile === 'scroll-tied') {
      mkdirSync(path.join(out, 'frames'), { recursive: true });
      mkdirSync(path.join(out, 'frames-mobile'), { recursive: true });
      ff(['-i', a.in, '-vf', 'fps=15,scale=1920:-2', '-c:v', 'libwebp', '-quality', '80', path.join(out, 'frames', 'frame_%04d.webp')]);
      ff(['-i', a.in, '-vf', 'fps=15,scale=960:-2', '-c:v', 'libwebp', '-quality', '78', path.join(out, 'frames-mobile', 'frame_%04d.webp')]);
    } else if (profile === 'poster') {
      const d = ffprobe(a.in)?.duration_s || 0;
      ff(['-ss', String(+(d * 0.4).toFixed(2)), '-i', a.in, '-frames:v', '1', '-q:v', '3', path.join(out, `${stem}.poster.jpg`)]);
    } else {
      console.error('profile must be bg-loop | brand-film | scroll-tied | poster');
      process.exit(EXIT.ERROR);
    }
    const made = readdirSync(out, { recursive: true }).filter((f) => f.startsWith(stem) || /^frames/.test(f));
    console.log(`✓ ${profile} → ${out} (${made.length} entries)`);
    break;
  }
  case 'promote': {
    const m = load();
    const item = findItem(m, a.candidate || '');
    if (!item) { console.error(`no candidate ${a.candidate}`); process.exit(EXIT.ERROR); }
    if (!item.selected || !item.selection_reason) { console.error('promote only a selected candidate with a recorded reason (ledger.mjs select …)'); process.exit(EXIT.ERROR); }
    if (!a.to) { console.error('promote needs --to <public path>'); process.exit(EXIT.ERROR); }
    const src = path.join(a.run, item.file);
    if (sha256(src) !== item.sha256) { console.error('candidate changed since it was recorded — refusing to promote'); process.exit(EXIT.ERROR); }
    mkdirSync(path.dirname(path.resolve(a.to)), { recursive: true });
    copyFileSync(src, a.to);
    const provSrc = `${src}.provenance.json`;
    const prov = existsSync(provSrc) ? readJSON(provSrc) : { schema: 'ic-provenance/1' };
    prov.promoted = { path: a.to, sha256: sha256(a.to), at_utc: new Date().toISOString(), from_run: m.run_id };
    if (a.to.endsWith('.glb')) prov.promoted.mesh = glbStats(a.to);
    writeJSON(`${a.to}.provenance.json`, prov);
    item.promoted_to = a.to;
    writeJSON(manifestPath, m);
    console.log(`✓ promoted ${item.file} → ${a.to} (+ provenance sidecar)`);
    break;
  }
  default:
    console.error('usage: ledger.mjs list|select|verify|encode|promote … (see header)');
    process.exit(EXIT.ERROR);
}
