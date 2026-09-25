#!/usr/bin/env node
// Iron Canvas · Audio engine — ElevenLabs sound generation for ambient beds and signature cues.
//
//   node engines/audio/audio.mjs plan --job cue.json
//   node engines/audio/audio.mjs run  --job cue.json       needs ELEVENLABS_API_KEY; otherwise exit 2
//
// cue.json: { "name": "commit-chime", "text": "soft glassy confirmation chime, one note, no reverb tail",
//             "duration_seconds": 1.2, "loop": false, "prompt_influence": 0.4 }
// UX contract (enforced in the page, not here): off by default · visible toggle · AudioContext resumes only
// inside a user gesture · one cue per signature commit. With the engine off, ship no audio UI — a dead toggle is slop.
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { EXIT, args, readJSON, writeJSON, newRunDir, appendManifest, provenance } from '../lib.mjs';

const a = args();
const cmd = a._[0] || 'plan';
const root = path.resolve(a.root || process.cwd());
if (!a.job || !existsSync(a.job)) { console.error('usage: audio.mjs plan|run --job cue.json'); process.exit(EXIT.ERROR); }
const job = readJSON(a.job);
const body = {
  text: job.text,
  duration_seconds: job.duration_seconds ?? null,
  prompt_influence: job.prompt_influence ?? 0.35,
  ...(job.loop ? { loop: true, model_id: job.model_id || 'eleven_text_to_sound_v2' } : {}), // loop: SDK-documented; v2 model
};

function plan(reason) {
  console.log(`Iron Canvas · Audio engine — "${job.name}"${reason ? `  [${reason}]` : ''}`);
  console.log(`  request  POST https://api.elevenlabs.io/v1/sound-generation ${JSON.stringify(body)}`);
  if (reason) console.log('  fallback no audio UI, or a synthesized WebAudio bed (oscillators + filtered noise, seeded)');
}
if (cmd === 'plan') { plan(); process.exit(EXIT.OK); }
const key = process.env.ELEVENLABS_API_KEY;
if (!key) { plan('ELEVENLABS_API_KEY not set'); process.exit(EXIT.UNAVAILABLE); }

const runDir = newRunDir(`audio-${job.name}`, root);
writeJSON(path.join(runDir, 'inputs', 'cue.json'), job);
const res = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
  method: 'POST', headers: { 'xi-api-key': key, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, body: JSON.stringify(body),
});
if (!res.ok) { console.error(`elevenlabs ${res.status}: ${(await res.text()).slice(0, 400)}`); process.exit(EXIT.ERROR); }
const dest = path.join(runDir, 'candidates', 'audio', `${job.name}.mp3`);
writeJSON(path.join(runDir, 'candidates', 'audio', '.keep.json'), {});
writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
const prov = provenance({
  engine: 'audio', tool: 'elevenlabs', model: body.model_id || 'sound-generation', access: 'api', prompt: job.text, params: body,
  inputs: [path.join(runDir, 'inputs', 'cue.json')], output: dest, run_id: path.basename(runDir), candidate_id: path.basename(dest),
  rights: { status: 'licensed', basis: 'generated under the operator\'s ElevenLabs account terms' },
});
writeJSON(`${dest}.provenance.json`, prov);
appendManifest(runDir, { job: { engine: 'audio', name: job.name }, item: { file: path.relative(runDir, dest), sha256: prov.output.sha256, bytes: prov.output.bytes, media: prov.output.media, selected: false, selection_reason: '' } });
console.log(`✓ ${path.basename(dest)} — measured ${prov.output.media?.duration_s}s → ${runDir}`);
