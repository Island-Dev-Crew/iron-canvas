#!/usr/bin/env node
// Iron Canvas · Video engine — Seedance 2.5 first: the pipeline's film, loop, and transition lane.
//
//   node engines/video/video.mjs plan   --job shot.json          compile the shot → prompt, request, cost
//   node engines/video/video.mjs run    --job shot.json          fal queue: N candidates, polled, downloaded, hashed
//   node engines/video/video.mjs ingest --job shot.json --file clip.mp4 [--access browser] [--model name]
//
// Providers (canvas.config.json engines.video.provider):
//   fal             automated via the fal queue (FAL_KEY). Request fields per fal's Seedance 2.5 schema.
//   ingest          generate in Dreamina / Higgsfield / the ModelArk console, then ingest the file here.
//   higgsfield-mcp  interactive Claude session with the Higgsfield connector: use the compiled prompt verbatim.
// Exit 0 ok · 1 failed · 2 unavailable (no key) → the plan is printed and the build continues on the fallback.
//
// Measured, never inferred: every candidate is ffprobed and hashed; a clip is never described by its requested length.
import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { EXIT, args, loadConfig, readJSON, writeJSON, newRunDir, appendManifest, provenance, copyInto } from '../lib.mjs';

const a = args();
const cmd = a._[0] || 'plan';
const root = path.resolve(a.root || process.cwd());
const { config } = loadConfig(root);
if (!a.job || !existsSync(a.job)) { console.error('usage: video.mjs plan|run|ingest --job shot.json [--file clip.mp4]'); process.exit(EXIT.ERROR); }
const job = readJSON(a.job);
const vcfg = config.engines?.video || {};
const provider = a.provider || vcfg.provider || 'fal';
const model = job.model || vcfg.model || 'bytedance/seedance-2.5';
const mode = job.mode || (job.references?.some((r) => r.role === 'camera' || r.kind === 'video') ? 'reference-to-video' : job.start_frame ? 'image-to-video' : 'text-to-video');
const fmt = { duration: 8, aspect_ratio: '16:9', resolution: vcfg.resolution || '720p', generate_audio: true, ...(job.format || {}) };
const budget = config.budget || {};
const candidates = Math.max(1, Math.min(Number(job.candidates || 1), Number(budget.max_candidates_per_job || 4)));

/** fal's Seedance 2.5 template: Format · Reference roles · Timeline · Camera · Continuity · Audio · Constraints. */
function compilePrompt() {
  const lines = [];
  lines.push(`FORMAT: ${fmt.duration === 'auto' ? 'auto-length' : `${fmt.duration}-second`} ${job.continuous === false ? 'multi-shot sequence' : 'continuous shot'}, ${fmt.aspect_ratio}. ${job.logline || ''}`.trim());
  const refs = job.references || [];
  if (refs.length) {
    lines.push('REFERENCE ROLES:');
    for (const r of refs) lines.push(`${r.tag} — ${r.job}${r.exclude ? ` Do not use it for: ${r.exclude}.` : ''}`);
  }
  if (job.timeline?.length) {
    lines.push('TIMELINE:');
    for (const b of job.timeline) lines.push(`[${b.from}–${b.to}s] ${b.beat ? `${b.beat.toUpperCase()} — ` : ''}${b.action}${b.camera ? ` Camera: ${b.camera}.` : ''}`);
  }
  if (job.camera) lines.push(`CAMERA: ${job.camera}`);
  if (job.continuity) lines.push(`CONTINUITY: ${job.continuity}`);
  if (fmt.generate_audio !== false && job.audio) lines.push(`AUDIO: ${job.audio}`);
  const constraints = ['no on-screen text, captions, or logos', 'avoid temporal flicker', 'avoid jitter', ...(job.constraints || [])];
  lines.push(`CONSTRAINTS: ${[...new Set(constraints)].join('; ')}.`);
  return lines.join('\n');
}

function dims() {
  const h = { '480p': 480, '720p': 720, '1080p': 1080 }[fmt.resolution] || 720;
  const [aw, ah] = (fmt.aspect_ratio === 'auto' ? '16:9' : fmt.aspect_ratio).split(':').map(Number);
  return { w: Math.round((h * aw) / ah), h };
}

/** fal's published pricing: tokens = h·w·seconds·24/1024 at $0.0214 per 1K tokens (audio included). */
function estimate() {
  const { w, h } = dims();
  const seconds = fmt.duration === 'auto' ? 10 : Number(fmt.duration);
  const perClip = ((h * w * seconds * 24) / 1024 / 1000) * 0.0214;
  return { per_clip_usd: +perClip.toFixed(3), candidates, total_usd: +(perClip * candidates).toFixed(3), basis: 'fal Seedance 2.5 token formula; reference-video inputs may bill extra', seconds_assumed: seconds };
}

function asDataUri(p) {
  const ext = path.extname(p).slice(1).toLowerCase().replace('jpg', 'jpeg');
  if (statSync(p).size > 8 * 1024 * 1024) throw new Error(`${p} is over 8 MB — host it and pass "url" instead`);
  return `data:image/${ext};base64,${readFileSync(p).toString('base64')}`;
}

function requestBody(seed) {
  const prompt = compilePrompt();
  const pick = (kind) => (job.references || []).filter((r) => (r.kind || (r.role === 'camera' ? 'video' : 'image')) === kind);
  const src = (r) => r.url || (r.path && (r.kind || 'image') === 'image' ? asDataUri(r.path) : null);
  const base = { prompt, resolution: fmt.resolution, duration: fmt.duration, aspect_ratio: fmt.aspect_ratio, generate_audio: fmt.generate_audio, seed };
  if (mode === 'reference-to-video') {
    const videos = pick('video').map((r) => r.url || null);
    if (videos.includes(null)) throw new Error('video references need a hosted "url" (the fal queue does not take local video paths) — upload the clay.mp4 and set url');
    return { ...base, task: job.task || 'reference', image_urls: pick('image').map(src).filter(Boolean), video_urls: videos, audio_urls: pick('audio').map((r) => r.url).filter(Boolean) };
  }
  if (mode === 'image-to-video') {
    const first = job.start_frame?.url || (job.start_frame?.path && asDataUri(job.start_frame.path));
    const last = job.end_frame?.url || (job.end_frame?.path && asDataUri(job.end_frame.path));
    return { ...base, image_url: first, ...(last ? { end_image_url: last } : {}) };
  }
  return base;
}

const endpoint = `${model}/${mode}`;
function printPlan(reason) {
  const est = estimate();
  console.log(`Iron Canvas · Video engine — "${job.name}" · ${endpoint} via ${provider}${reason ? `  [${reason}]` : ''}`);
  console.log(`  class    ${job.class || 'film'} · ${fmt.duration}s · ${fmt.aspect_ratio} · ${fmt.resolution} · audio ${fmt.generate_audio ? 'on' : 'off'} · ${candidates} candidate(s)`);
  console.log(`  cost     ≈ $${est.per_clip_usd}/clip · ≈ $${est.total_usd} total (${est.basis})`);
  console.log('  prompt ─────────────────────────────────────────────');
  console.log(compilePrompt().split('\n').map((l) => `  ${l}`).join('\n'));
  console.log('  ────────────────────────────────────────────────────');
  if (provider !== 'fal') console.log(`  manual   paste the prompt into ${provider === 'higgsfield-mcp' ? 'the Higgsfield connector' : 'Dreamina / Higgsfield / ModelArk'}, attach references in tag order (${(job.references || []).map((r) => r.tag).join(', ') || 'none'}), then: video.mjs ingest --job ${a.job} --file <clip.mp4>`);
  if (reason) console.log('  fallback HyperFrames (designed motion) → §19 noise/flow field (organic loops) → poster still');
}

if (cmd === 'plan') { printPlan(); process.exit(EXIT.OK); }

if (cmd === 'ingest') {
  if (!a.file || !existsSync(a.file)) { console.error('ingest needs --file <clip>'); process.exit(EXIT.ERROR); }
  const runDir = newRunDir(`video-${job.name}`, root);
  writeJSON(path.join(runDir, 'inputs', 'shot.json'), job);
  writeFileSync(path.join(runDir, 'inputs', 'prompt.txt'), compilePrompt());
  const dest = copyInto(a.file, path.join(runDir, 'candidates', 'video'), `${job.name}-ingested${path.extname(a.file)}`);
  const prov = provenance({
    engine: 'video', tool: a.tool || provider, model: a.model || `${model} (operator-reported)`, access: a.access || 'browser',
    prompt: compilePrompt(), seed: job.seed ?? null, params: { format: fmt, mode }, inputs: [path.join(runDir, 'inputs', 'shot.json')],
    output: dest, run_id: path.basename(runDir), candidate_id: path.basename(dest),
    rights: { status: 'licensed', basis: `generated under the operator's ${a.tool || provider} account terms` },
  });
  writeJSON(`${dest}.provenance.json`, prov);
  appendManifest(runDir, { job: { engine: 'video', mode, provider: 'ingest', name: job.name }, item: { file: path.relative(runDir, dest), sha256: prov.output.sha256, bytes: prov.output.bytes, media: prov.output.media, selected: false, selection_reason: '' } });
  const m = prov.output.media || {};
  console.log(`✓ ingested ${path.basename(dest)} — measured ${m.duration_s}s ${m.width}×${m.height} @${m.fps}fps ${m.codec}${m.audio ? ' +audio' : ''} → ${runDir}`);
  if (typeof fmt.duration === 'number' && m.duration_s && Math.abs(m.duration_s - fmt.duration) > 0.6) console.log(`  note: requested ${fmt.duration}s, measured ${m.duration_s}s — the manifest records the measurement.`);
  process.exit(EXIT.OK);
}

if (cmd !== 'run') { console.error(`unknown command ${cmd}`); process.exit(EXIT.ERROR); }
if (provider !== 'fal') { printPlan(`provider ${provider} is manual — use ingest`); process.exit(EXIT.UNAVAILABLE); }
const key = process.env.FAL_KEY;
if (!key) { printPlan('FAL_KEY not set'); process.exit(EXIT.UNAVAILABLE); }

const est = estimate();
if (budget.credit_cap_usd != null && est.total_usd > budget.credit_cap_usd && !a['over-budget']) {
  console.error(`estimated $${est.total_usd} exceeds credit_cap_usd $${budget.credit_cap_usd} — lower candidates/duration or pass --over-budget deliberately`);
  process.exit(EXIT.ERROR);
}

const runDir = newRunDir(`video-${job.name}`, root);
writeJSON(path.join(runDir, 'inputs', 'shot.json'), job);
writeFileSync(path.join(runDir, 'inputs', 'prompt.txt'), compilePrompt());
appendManifest(runDir, { job: { engine: 'video', provider, endpoint, mode, name: job.name, estimate: est } });
const headers = { Authorization: `Key ${key}`, 'Content-Type': 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ok = 0;
for (let i = 0; i < candidates; i++) {
  const seed = (Number(job.seed) || 5417) + i;
  try {
    const body = requestBody(seed);
    const sub = await fetch(`https://queue.fal.run/${endpoint}`, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!sub.ok) throw new Error(`submit ${sub.status}: ${(await sub.text()).slice(0, 400)}`);
    const { request_id, status_url, response_url } = await sub.json();
    console.log(`  candidate ${i + 1}/${candidates} queued (${request_id}, seed ${seed})`);
    const deadline = Date.now() + 25 * 60 * 1000;
    let status = 'IN_QUEUE';
    while (status !== 'COMPLETED') {
      if (Date.now() > deadline) throw new Error('timed out after 25 min');
      await sleep(6000);
      const s = await fetch(status_url, { headers });
      status = (await s.json()).status;
      if (status && !['IN_QUEUE', 'IN_PROGRESS', 'COMPLETED'].includes(status)) throw new Error(`status ${status}`);
    }
    const res = await (await fetch(response_url, { headers })).json();
    const url = res.video?.url;
    if (!url) throw new Error(`no video in response: ${JSON.stringify(res).slice(0, 300)}`);
    const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
    const dest = path.join(runDir, 'candidates', 'video', `${job.name}-c${String(i + 1).padStart(2, '0')}.mp4`);
    writeFileSync(dest, bytes);
    const prov = provenance({
      engine: 'video', tool: 'fal', model: endpoint, access: 'api', prompt: body.prompt, seed: res.seed ?? seed,
      params: { ...fmt, mode, task: body.task }, inputs: (job.references || []).map((r) => r.path).filter(Boolean),
      output: dest, run_id: path.basename(runDir), candidate_id: path.basename(dest),
      cost: { unit: 'usd', amount: est.per_clip_usd, basis: 'estimate' },
      rights: { status: 'licensed', basis: 'generated under the operator\'s fal account terms' },
    });
    writeJSON(`${dest}.provenance.json`, prov);
    appendManifest(runDir, { item: { file: path.relative(runDir, dest), request_id, seed: prov.seed, sha256: prov.output.sha256, bytes: prov.output.bytes, media: prov.output.media, selected: false, selection_reason: '' } });
    const m = prov.output.media || {};
    console.log(`  ✓ ${path.basename(dest)} — measured ${m.duration_s}s ${m.width}×${m.height} @${m.fps}fps${m.audio ? ' +audio' : ''}`);
    ok++;
  } catch (e) {
    console.error(`  ✗ candidate ${i + 1}: ${e.message}`);
  }
}
console.log(`${ok}/${candidates} candidates in ${runDir}\n  next: node engines/ledger.mjs select --run "${runDir}" --candidate <file> --reason "<why this one>"`);
process.exit(ok ? EXIT.OK : EXIT.ERROR);
