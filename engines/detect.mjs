#!/usr/bin/env node
// Phase 0 stack scan for the Power Engines. Reads the user's toggles (canvas.config.json), detects what
// is actually present, and records power_engines for orient-decision.json. Detects; never provisions.
//
//   node engines/detect.mjs [--root <project>] [--json]
//
// States: disabled (user switched off) · available (present, not requested) · enabled (requested and
// present) · missing (requested, absent → the engine runs its exit-2 plan path; the build uses the fallback)
import path from 'node:path';
import { args, loadConfig, findBlender, which, writeJSON } from './lib.mjs';

const a = args();
const root = path.resolve(a.root || process.cwd());
const { path: configPath, config } = loadConfig(root);
const want = (name) => config.engines?.[name]?.enabled === true;
const state = (requested, present) => (requested ? (present ? 'enabled' : 'missing') : present ? 'available' : 'disabled');

const blender = findBlender(config.engines?.blender?.binary || '');
const videoProvider = config.engines?.video?.provider || 'fal';
const videoKeys = { fal: 'FAL_KEY', replicate: 'REPLICATE_API_TOKEN', modelark: 'ARK_API_KEY' };
const videoPresent = videoProvider === 'ingest' || videoProvider === 'higgsfield-mcp' || Boolean(process.env[videoKeys[videoProvider]]);
const tools = { ffmpeg: which('ffmpeg'), ffprobe: which('ffprobe'), node: process.execPath, python: which('python') || which('python3') };

const power_engines = {
  blender: {
    requested: want('blender'), status: state(want('blender'), Boolean(blender)),
    binary: blender?.binary || null, version: blender?.version || null,
    fallback: 'procedural three.js geometry → §19 point-cloud promotion → Tier I composed-depth still',
  },
  video: {
    requested: want('video'), status: state(want('video'), videoPresent),
    provider: videoProvider, model: config.engines?.video?.model || 'bytedance/seedance-2.5',
    access: { fal: 'api', replicate: 'api', modelark: 'api', ingest: 'browser', 'higgsfield-mcp': 'mcp' }[videoProvider] || 'api',
    credential_env: videoKeys[videoProvider] || null,
    note: videoProvider === 'higgsfield-mcp' ? 'MCP connectors are session-level; confirm the Higgsfield connector is live in the Claude session.' : undefined,
    live_capabilities: null,
    fallback: 'HyperFrames (designed motion) → §19 noise/flow field (organic loops) → poster still',
  },
  audio: {
    requested: want('audio'), status: state(want('audio'), Boolean(process.env.ELEVENLABS_API_KEY)),
    provider: 'elevenlabs', credential_env: 'ELEVENLABS_API_KEY',
    fallback: 'no audio UI at all (a dead toggle is slop) or a synthesized WebAudio bed',
  },
  film: {
    requested: config.engines?.film?.enabled !== false, status: tools.node ? (config.engines?.film?.enabled === false ? 'disabled' : 'enabled') : 'missing',
    provider: config.engines?.film?.provider || 'hyperframes',
    fallback: 'CSS/GSAP motion in-page; OG still instead of OG video',
  },
};

const report = { schema: 'ic-power-engines/1', scanned_at_utc: new Date().toISOString(), config: configPath, root, power_engines, tools, budget: config.budget || null };
writeJSON(path.join(root, '.ic', 'power-engines.json'), report);

if (a.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const rows = Object.entries(power_engines).map(([k, v]) => `  ${k.padEnd(8)} ${v.status.padEnd(10)} ${(v.binary || v.provider || '').toString()}${v.version ? ` (${v.version})` : ''}`);
  console.log(`Iron Canvas · Power Engines — ${configPath ? path.relative(root, configPath) : 'no canvas.config.json (all engines default off)'}\n${rows.join('\n')}`);
  console.log(`  tools    ffmpeg ${tools.ffmpeg ? '✓' : '✗'} · ffprobe ${tools.ffprobe ? '✓' : '✗'} · python ${tools.python ? '✓' : '✗'}`);
  const missing = Object.entries(power_engines).filter(([, v]) => v.status === 'missing');
  for (const [k, v] of missing) console.log(`  → ${k} requested but missing: the build continues on its fallback — ${v.fallback}`);
  console.log(`  written: ${path.relative(process.cwd(), path.join(root, '.ic', 'power-engines.json'))}`);
}
