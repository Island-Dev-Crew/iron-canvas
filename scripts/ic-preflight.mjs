#!/usr/bin/env node
// Iron Canvas · preflight — one pass over the v6 contracts, every violation reported with its JSON path.
//
//   node scripts/ic-preflight.mjs <dir | file ...> [--json] [--out report.json] [--lenient]
//
// Reads, by name, from each directory given (or takes files directly):
//   score.json · *.score.json · *.html with <script type="application/json" data-ic-score>   the motion contract
//   feel-profile.json                                                                       the Feel Brief
//   canvas.config.json                                                                       the Power Engine toggles
// The vocabularies come from runtime/score.schema.json and engines/canvas.config.schema.json — the same files
// the runtime and the engines read — so the validator cannot drift from them.
//
// Exit 0 = no errors (warnings go to the critic) · 1 = errors (block PACKAGE hand-off) · 2 = nothing to check.
// --lenient downgrades contract errors to warnings for pre-v6 scores that carry no contract fields.
import { readFileSync, existsSync, statSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : undefined; };
const inputs = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--out');
const lenient = flag('lenient');

const SCORE_SCHEMA = JSON.parse(readFileSync(path.join(repo, 'runtime', 'score.schema.json'), 'utf8'));
const CONFIG_SCHEMA = JSON.parse(readFileSync(path.join(repo, 'engines', 'canvas.config.schema.json'), 'utf8'));
const DEFS = SCORE_SCHEMA.$defs;
const PERSONALITIES = DEFS.personality.enum;
const VERBS = DEFS.verb.enum;
const STAGES = DEFS.stage.enum;
const SCRUB_VERBS = new Set(['drift']);
const LOUD = new Set(['reveal', 'climax']);
const PLACEHOLDER = /^(todo|tbd|tbc|n\/?a|none|static|same|x+|\.{2,}|_{2,}|-+|\?+|lorem.*)$/i;

// ─── a small JSON-Schema subset validator (type, enum, required, properties, additionalProperties,
//     items, minItems, minimum, maximum, $ref, oneOf, anyOf) — enough for the two Iron Canvas schemas
function typeOf(v) { return Array.isArray(v) ? 'array' : v === null ? 'null' : Number.isInteger(v) ? 'integer' : typeof v; }
function validate(schema, value, at, root, out) {
  if (schema.$ref) return validate(resolveRef(root, schema.$ref), value, at, root, out);
  if (schema.oneOf) {
    const ok = schema.oneOf.some((s) => { const o = []; validate(s, value, at, root, o); return o.length === 0; });
    if (!ok) out.push({ at, msg: `does not match any allowed shape` });
    return;
  }
  if (schema.enum && !schema.enum.includes(value)) { out.push({ at, msg: `"${value}" is not allowed`, allowed: schema.enum }); return; }
  if (schema.type) {
    const t = typeOf(value);
    const ok = schema.type === t || (schema.type === 'number' && t === 'integer');
    if (!ok) { out.push({ at, msg: `expected ${schema.type}, got ${t}` }); return; }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) out.push({ at, msg: `${value} is below the minimum ${schema.minimum}` });
    if (schema.maximum !== undefined && value > schema.maximum) out.push({ at, msg: `${value} is above the maximum ${schema.maximum}` });
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) out.push({ at, msg: `needs at least ${schema.minItems} item(s)` });
    if (schema.items) value.forEach((v, i) => validate(schema.items, v, `${at}[${i}]`, root, out));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const r of schema.required || []) if (!(r in value)) out.push({ at: `${at}.${r}`, msg: 'is required' });
    const props = schema.properties || {};
    for (const [k, v] of Object.entries(value)) {
      if (props[k]) validate(props[k], v, `${at}.${k}`, root, out);
      else if (schema.additionalProperties === false) out.push({ at: `${at}.${k}`, msg: 'is not a known field', allowed: Object.keys(props) });
    }
    if (schema.anyOf) {
      const ok = schema.anyOf.some((s) => (s.required || []).every((r) => r in value));
      if (!ok) out.push({ at, msg: `needs one of: ${schema.anyOf.map((s) => (s.required || []).join('+')).join(' | ')}` });
    }
  }
}
function resolveRef(root, ref) {
  const parts = ref.replace(/^#\//, '').split('/');
  return parts.reduce((o, p) => o?.[p], root) || {};
}

// ─── findings
const findings = [];
const add = (file, level, at, msg, extra = {}) => findings.push({ file, level, at, msg, ...extra });
const text = (v) => (typeof v === 'string' ? v.trim() : '');
const isPlaceholder = (s) => !s || PLACEHOLDER.test(s) || /^_+$/.test(s.replace(/\s/g, ''));

// ─── the score: schema, then the contract's teeth (references/cinematic-score.md §4)
function checkScore(file, score) {
  const out = [];
  validate(SCORE_SCHEMA, score, '$', SCORE_SCHEMA, out);
  for (const f of out) add(file, 'error', f.at, f.msg, f.allowed ? { allowed: f.allowed } : {});
  if (!Array.isArray(score?.acts)) return;

  const acts = score.acts;
  const contract = acts.some((a) => a.role || a.stage || a.emotion);
  const cErr = contract || !lenient ? 'error' : 'warning';
  const reg = Number(String(score.register || 'R2').slice(1));
  const surface = score.surface || 'web';

  // ids
  const seen = new Set();
  acts.forEach((a, i) => { if (seen.has(a.id)) add(file, 'error', `$.acts[${i}].id`, `duplicate act id "${a.id}"`); seen.add(a.id); });

  // 1 · one signature
  const sig = acts.filter((a) => a.role === 'signature');
  if (sig.length !== 1) add(file, cErr, '$.acts[*].role', `exactly one act must have role "signature" — found ${sig.length}`);
  if (score.signature && sig.length === 1 && score.signature !== sig[0].id) add(file, 'error', '$.signature', `names "${score.signature}" but the signature act is "${sig[0].id}"`);

  acts.forEach((a, i) => {
    const at = `$.acts[${i}]`;
    const trig = a.trigger || 'enter';
    // 2 · one clock — only scrub acts own scroll
    if (trig !== 'scrub' && (a.pin || a.scrub !== undefined)) add(file, 'error', at, `${/^[aeiou]/.test(trig) ? 'an' : 'a'} ${trig} act cannot pin or scrub — only scrub acts own the scroll (Anti-Pattern #19 TWO CLOCKS)`);
    // 8 · scrub consistency
    if (trig === 'scrub' && !a.length && !a.end) add(file, 'error', at, 'a scrub act needs a length (e.g. "220%") or an end');
    if (trig !== 'scrub' && a.length) add(file, 'error', `${at}.length`, `length applies to scrub acts only (this act is ${trig})`);
    // 5 · every act has a feeling
    const intent = text(a.intent);
    if (isPlaceholder(intent)) add(file, cErr, `${at}.intent`, 'every act says what the visitor feels here — in words a person would use');
    else if (intent.length < 16) add(file, 'warning', `${at}.intent`, `"${intent}" is thin — say what actually happens to the visitor (16+ characters)`);
    for (const side of ['in', 'out']) if (isPlaceholder(text(a.emotion?.[side]))) add(file, cErr, `${at}.emotion.${side}`, `emotion.${side} is required — the feeling on ${side === 'in' ? 'arrival' : 'leaving'}`);
    // 6 · every act has a still meaning
    if (isPlaceholder(text(a.reduced))) add(file, 'warning', `${at}.reduced`, 'say what the settled frame means under reduced motion');
    // 7 · mobile never pins on the web pack at R0–R3
    if (a.pin && surface === 'web' && reg <= 3 && isPlaceholder(text(a.mobile))) add(file, 'warning', `${at}.mobile`, 'pinned acts need a mobile semantic transformation on the web pack (R0–R3)');
    // scrub proportions, verb/trigger fit
    for (const [j, s] of (a.shots || []).entries()) {
      if (trig === 'scrub' && typeof s.at === 'number' && s.at > 1) add(file, 'warning', `${at}.shots[${j}].at`, `${s.at} — in a scrub act "at" is a proportion of the act (0–1)`);
      if (s.verb && SCRUB_VERBS.has(s.verb) && trig !== 'scrub') add(file, 'warning', `${at}.shots[${j}].verb`, `"${s.verb}" is a scrub verb — it needs a scrub act`);
    }
  });

  // 3 · one vocabulary: a house personality + at most one accent for the signature.
  //     drift (scroll-owned) never counts; tide never counts when it only breathes in quiet acts.
  const used = new Set([score.personality || 'silk']);
  let tideOutsideQuiet = false;
  for (const a of acts) {
    const quiet = a.role === 'stillness' || a.stage === 'pause';
    const note = (p) => { if (!p) return; used.add(p); if (p === 'tide' && !quiet) tideOutsideQuiet = true; };
    note(a.personality);
    for (const s of a.shots || []) note(s.personality);
  }
  used.delete('drift');
  if (!tideOutsideQuiet && score.personality !== 'tide') used.delete('tide');
  if (used.size > 2) add(file, 'warning', '$', `${used.size} personalities in play (${[...used].join(', ')}) — keep one house personality and at most one accent (tide may rest in quiet acts)`);

  // 4 · quiet between loud (R2+)
  if (reg >= 2) {
    for (let i = 1; i < acts.length; i++) {
      const loud = (a) => LOUD.has(a.stage) || a.role === 'signature';
      if (loud(acts[i - 1]) && loud(acts[i])) add(file, 'warning', `$.acts[${i}]`, `"${acts[i - 1].id}" and "${acts[i].id}" are both loud and adjacent — put a pause or recover between them`);
    }
  }
  // the sentence reads as an arc
  const stages = acts.map((a) => a.stage).filter(Boolean);
  if (stages.length) {
    if (stages[0] !== 'establish') add(file, 'warning', '$.acts[0].stage', `the sentence should open on "establish" (found "${stages[0]}")`);
    if (stages.at(-1) !== 'resolve' && reg >= 1) add(file, 'warning', `$.acts[${acts.length - 1}].stage`, `the sentence should close on "resolve" (found "${stages.at(-1)}")`);
    for (const s of stages) if (!STAGES.includes(s)) add(file, 'error', '$.acts[*].stage', `unknown stage "${s}"`, { allowed: STAGES });
  }
  // the aliveness floor, as far as a score can show it
  if (!acts.some((a) => a.trigger === 'load')) add(file, 'warning', '$.acts', 'no load act — the ARRIVAL (aliveness floor) must come from somewhere; say where');
  if (score.breath?.enabled === false) add(file, 'warning', '$.breath', 'breath is off — the HEARTBEAT (aliveness floor) must be provided in CSS; say where');
  return { acts: acts.length, signature: sig[0]?.id, contract, register: score.register, surface };
}

// ─── the Feel Brief (SKILL.md §3 Phase 2 — GATE 2)
function checkFeel(file, feel) {
  const req = (at, v, msg) => { if (isPlaceholder(text(v)) || /_{3,}/.test(text(v))) add(file, 'error', at, msg); };
  req('$.lens', feel.lens, 'the lens is required — one sentence: how should the audience feel when they arrive?');
  if (text(feel.lens) && text(feel.lens).length < 16) add(file, 'warning', '$.lens', 'the lens is thin — write the sentence a person would say');
  req('$.reference_vibe', feel.reference_vibe, 'the reference vibe is required — a place with light, temperature and tempo');
  const k = feel.kinetic_signature;
  if (!k || typeof k !== 'object') add(file, 'error', '$.kinetic_signature', 'the kinetic signature is required — an empty kinetic signature fails GATE 2');
  else {
    for (const f of ['personality', 'arrival', 'heartbeat', 'hand_feel', 'breath', 'signature_moment', 'still_path']) req(`$.kinetic_signature.${f}`, k[f], `${f} is required`);
    if (k.personality && !PERSONALITIES.filter((p) => p !== 'drift').includes(k.personality)) add(file, 'error', '$.kinetic_signature.personality', `"${k.personality}" is not a house personality`, { allowed: PERSONALITIES.filter((p) => p !== 'drift') });
    if (k.accent_personality && !PERSONALITIES.includes(k.accent_personality)) add(file, 'error', '$.kinetic_signature.accent_personality', `"${k.accent_personality}" is not a personality`, { allowed: PERSONALITIES });
  }
  const anti = Array.isArray(feel.anti_feelings) ? feel.anti_feelings.join(' ') : '';
  if (!/lifeless|mechanical/i.test(anti)) add(file, 'error', '$.anti_feelings', '"lifeless / mechanical" is the default anti-feeling of every project');
  if (isPlaceholder(text(feel.signature?.mechanism_sentence))) add(file, 'warning', '$.signature.mechanism_sentence', 'no mechanism sentence — escalate at ORIENT Q8; never invent one');
  if (feel.feel_line && text(feel.feel_line).split(/[·|,]/).filter((s) => s.trim()).length < 5) add(file, 'warning', '$.feel_line', 'the feel line is 3 adjectives · 1 material · 1 tempo');
}

// ─── canvas.config.json (+ register gates when a score names its register)
function checkConfig(file, cfg, register) {
  const out = [];
  validate(CONFIG_SCHEMA, cfg, '$', CONFIG_SCHEMA, out);
  for (const f of out) add(file, 'error', f.at, f.msg, f.allowed ? { allowed: f.allowed } : {});
  const R = register ? Number(String(register).slice(1)) : null;
  if (R !== null && R <= 1) for (const e of ['blender', 'video', 'audio']) if (cfg.engines?.[e]?.enabled) add(file, 'warning', `$.engines.${e}.enabled`, `${e} is on, but the score is ${register} — engines are gated off at R0/R1 (SKILL.md §24)`);
}

// ─── collect inputs
function scoreFromHtml(file) {
  const html = readFileSync(file, 'utf8');
  const m = html.match(/<script[^>]*type=["']application\/json["'][^>]*data-ic-score[^>]*>([\s\S]*?)<\/script>/i)
    || html.match(/<script[^>]*data-ic-score[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i);
  return m ? m[1] : null;
}
const files = [];
for (const input of inputs.length ? inputs : ['.']) {
  if (!existsSync(input)) { console.error(`not found: ${input}`); process.exit(2); }
  if (statSync(input).isDirectory()) {
    for (const name of readdirSync(input)) {
      if (/^score\.json$|\.score\.json$|^feel-profile\.json$|^canvas\.config\.json$/.test(name)) files.push(path.join(input, name));
      else if (/\.html$/.test(name) && scoreFromHtml(path.join(input, name))) files.push(path.join(input, name));
    }
  } else files.push(input);
}
if (!files.length) { console.error('nothing to check — give a directory holding score.json / feel-profile.json / canvas.config.json, or the files'); process.exit(2); }

const summary = {};
let scoreRegister = null;
const parse = (file, raw) => { try { return JSON.parse(raw); } catch (e) { add(file, 'error', '$', `not valid JSON: ${e.message}`); return null; } };
for (const file of files.sort((a, b) => /canvas\.config/.test(a) - /canvas\.config/.test(b))) {
  const base = path.basename(file);
  if (/\.html$/.test(base)) {
    const raw = scoreFromHtml(file);
    if (!raw) { add(file, 'error', '$', 'no <script type="application/json" data-ic-score> block'); continue; }
    const s = parse(file, raw); if (s) { summary[file] = checkScore(file, s); scoreRegister ||= s.register; }
  } else if (/score\.json$/.test(base)) {
    const s = parse(file, readFileSync(file, 'utf8')); if (s) { summary[file] = checkScore(file, s); scoreRegister ||= s.register; }
  } else if (base === 'feel-profile.json') {
    const f = parse(file, readFileSync(file, 'utf8')); if (f) { checkFeel(file, f); summary[file] = 'feel brief'; }
  } else if (base === 'canvas.config.json' || /config.*\.json$/.test(base)) {
    const c = parse(file, readFileSync(file, 'utf8')); if (c) { checkConfig(file, c, scoreRegister); summary[file] = 'engine config'; }
  } else add(file, 'error', '$', 'unrecognised file — name it score.json, *.score.json, feel-profile.json or canvas.config.json');
}

// ─── report
const errors = findings.filter((f) => f.level === 'error');
const warnings = findings.filter((f) => f.level === 'warning');
if (flag('json') || opt('out')) {
  const report = { tool: 'ic-preflight', version: '1.0.0', checked: summary, errors: errors.length, warnings: warnings.length, findings };
  if (opt('out')) writeFileSync(opt('out'), `${JSON.stringify(report, null, 2)}\n`);
  if (flag('json')) console.log(JSON.stringify(report, null, 2));
}
if (!flag('json')) {
  console.log('Iron Canvas · preflight');
  const show = (file) => { const r = path.relative(process.cwd(), file); return r && !r.startsWith('..') ? r : path.resolve(file); };
  for (const [file, s] of Object.entries(summary)) {
    const tag = typeof s === 'object' ? `score — ${s.acts} acts${s.signature ? `, signature "${s.signature}"` : ''}${s.register ? `, ${s.register}` : ''}${s.contract ? '' : ' (no contract fields)'}` : s;
    console.log(`  ${show(file)}  ${tag}`);
  }
  for (const f of findings) {
    const where = `${path.basename(f.file)} ${f.at}`;
    console.log(`  ${f.level === 'error' ? '✗' : '!'} ${where}  ${f.msg}${f.allowed ? `  [allowed: ${f.allowed.join(', ')}]` : ''}`);
  }
  console.log(errors.length ? `${errors.length} error(s), ${warnings.length} warning(s) — blocked` : `PASS — ${warnings.length} warning(s) for the critic`);
}
process.exit(errors.length ? 1 : 0);
