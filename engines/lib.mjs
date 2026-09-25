// Shared helpers for the Iron Canvas Power Engines. Zero dependencies; Node 18+; Windows-first paths.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

/** Exit codes shared by every engine. 2 = unavailable: the plan is printed and the build continues on the fallback. */
export const EXIT = { OK: 0, ERROR: 1, UNAVAILABLE: 2 };

export const readJSON = (p) => JSON.parse(readFileSync(p, 'utf8'));
export function writeJSON(p, value) {
  mkdirSync(path.dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
}

/** Minimal argv parser: `plan --job job.json --file x` → { _: ['plan'], job: 'job.json', file: 'x' } */
export function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[key] = true;
      else { out[key] = next; i++; }
    } else out._.push(a);
  }
  return out;
}

export function loadConfig(root = process.cwd()) {
  const p = path.join(root, 'canvas.config.json');
  return existsSync(p) ? { path: p, config: readJSON(p) } : { path: null, config: { engines: {} } };
}

export function sha256(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}

export function which(cmd) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.split(/\r?\n/)[0].trim() || null : null;
}

/** Measured media facts — never inferred from the requested settings. */
export function ffprobe(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', file], { encoding: 'utf8' });
  if (r.status !== 0) return null;
  const j = JSON.parse(r.stdout);
  const v = j.streams.find((s) => s.codec_type === 'video');
  const a = j.streams.find((s) => s.codec_type === 'audio');
  let fps = 0;
  if (v?.avg_frame_rate) { const [n, d] = v.avg_frame_rate.split('/').map(Number); fps = d ? +(n / d).toFixed(3) : 0; }
  return {
    duration_s: j.format?.duration ? +(+j.format.duration).toFixed(3) : 0,
    width: v?.width ?? 0, height: v?.height ?? 0, fps,
    codec: v?.codec_name ?? a?.codec_name ?? '', audio: Boolean(a),
  };
}

/** Reads a GLB's JSON chunk: triangles, primitives (≈ draw calls), materials, extensions (e.g. Draco). */
export function glbStats(file) {
  const buf = readFileSync(file);
  if (buf.length < 20 || buf.readUInt32LE(0) !== 0x46546c67) return null; // 'glTF'
  const len = buf.readUInt32LE(12);
  const json = JSON.parse(buf.subarray(20, 20 + len).toString('utf8'));
  let triangles = 0, primitives = 0;
  for (const m of json.meshes || []) {
    for (const p of m.primitives || []) {
      primitives++;
      if ((p.mode ?? 4) !== 4) continue;
      const acc = json.accessors?.[p.indices ?? p.attributes?.POSITION];
      triangles += Math.floor((acc?.count || 0) / 3);
    }
  }
  return {
    triangles, primitives, draw_calls_est: primitives,
    meshes: (json.meshes || []).length, materials: (json.materials || []).length, nodes: (json.nodes || []).length,
    extensions: json.extensionsUsed || [], bytes: buf.length,
  };
}

/** Finds Blender: configured path → BLENDER_PATH → PATH → default install dirs (newest version first). */
export function findBlender(configured = '') {
  const candidates = [configured, process.env.BLENDER_PATH, which('blender')].filter(Boolean);
  if (process.platform === 'win32') {
    for (const base of ['C:/Program Files/Blender Foundation', 'C:/Program Files (x86)/Steam/steamapps/common']) {
      if (!existsSync(base)) continue;
      for (const dir of readdirSync(base).filter((n) => /^blender/i.test(n)).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
        candidates.push(path.join(base, dir, 'blender.exe'));
      }
    }
  } else if (process.platform === 'darwin') {
    candidates.push('/Applications/Blender.app/Contents/MacOS/Blender');
  }
  for (const c of candidates) {
    if (!existsSync(c)) continue;
    const v = spawnSync(c, ['--version'], { encoding: 'utf8', timeout: 90000 });
    if (v.status === 0) return { binary: c, version: (v.stdout.match(/Blender\s+([\d.]+)/) || [])[1] || 'unknown' };
  }
  return null;
}

/** A run folder: gitignored workspace for one engine job's candidates, masters, and evidence. */
export function newRunDir(slug, root = process.cwd()) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(root, '.ic', 'runs', `${ts}-${slug.replace(/[^a-z0-9-]+/gi, '-').toLowerCase()}`);
  for (const d of ['inputs', 'candidates', 'masters', 'web', 'evidence']) mkdirSync(path.join(dir, d), { recursive: true });
  writeJSON(path.join(dir, 'manifest.json'), { schema: 'ic-manifest/1', run_id: path.basename(dir), created_at_utc: new Date().toISOString(), jobs: [], items: [] });
  return dir;
}

export function appendManifest(runDir, patch) {
  const p = path.join(runDir, 'manifest.json');
  const m = readJSON(p);
  if (patch.job) m.jobs.push(patch.job);
  if (patch.item) m.items.push(patch.item);
  writeJSON(p, m);
  return m;
}

/** The provenance sidecar: every generated asset carries where it came from and what it cost. */
export function provenance({ engine, tool, tool_version = '', model = '', access, prompt = '', negative_prompt = '', seed = null, params = {}, inputs = [], output, run_id = '', candidate_id = '', cost = null, rights }) {
  const out = { path: output, sha256: sha256(output), bytes: statSync(output).size };
  const ext = path.extname(output).toLowerCase();
  if (['.mp4', '.webm', '.mov', '.mp3', '.wav', '.m4a'].includes(ext)) out.media = ffprobe(output);
  if (ext === '.glb') out.mesh = glbStats(output);
  return {
    schema: 'ic-provenance/1', engine, tool, tool_version, model, access, prompt, negative_prompt, seed, params,
    inputs: inputs.map((p) => ({ path: p, sha256: existsSync(p) ? sha256(p) : null })),
    output: out, run_id, candidate_id, selected: false, selection_reason: '',
    cost, generated_at_utc: new Date().toISOString(),
    rights: rights || { status: 'unknown', basis: '' },
  };
}

export function copyInto(src, destDir, name = path.basename(src)) {
  mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, name);
  copyFileSync(src, dest);
  return dest;
}
