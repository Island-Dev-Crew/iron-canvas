#!/usr/bin/env node
// Iron Canvas · design-contract lint — taste enforced, not advisory.
//
//   node scripts/ic-contract.mjs --contract design-contract.json <build dir | files ...> [--json]
//
// The contract is the design plan made machine-readable (SKILL.md §5 3.9d, templates/design-contract.json):
// 4–6 named colours with roles, the type roles with their fallbacks, the motion budget (which curves, which
// durations), the radius / shadow / border policies, and the hard fails. This lint reads every stylesheet —
// .css files, <style> blocks and style="" attributes in .html — and reports each departure with file:line.
//
// It checks what code can check: colour literals outside the palette, font families outside the roles,
// cubic-bezier curves and durations outside the motion budget, GSAP ease names inside CSS (always invalid),
// radius values outside the policy, blurred shadows under a hard/none shadow policy, translucent borders when
// they are forbidden, and the contract's own forbidden patterns. It cannot judge feel — a critic still does.
//
// Exit 0 clean (warnings allowed) · 1 contract violations · 2 usage error. Zero dependencies.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const at = (n) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : undefined);
const contractPath = at('contract');
const inputs = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--contract');
if (!contractPath || !existsSync(contractPath) || !inputs.length) {
  console.error('usage: ic-contract.mjs --contract design-contract.json <build dir | files ...> [--json]');
  process.exit(2);
}
const C = JSON.parse(readFileSync(contractPath, 'utf8'));
const unfilled = [];
for (const [name, c] of Object.entries(C.colors || {})) if (!/^#[0-9a-f]{6}$/i.test(typeof c === 'string' ? c : c?.hex || '')) unfilled.push(`colors.${name}`);
for (const [role, f] of Object.entries(C.fonts || {})) if (!f?.family || /_{3,}/.test(f.family)) unfilled.push(`fonts.${role}.family`);
if (C.shadow?.policy && !['any', 'none', 'hard', 'soft'].includes(C.shadow.policy)) unfilled.push('shadow.policy (any | none | hard | soft)');
if (unfilled.length) {
  console.error(`the contract is not filled in yet — decide these at PACKAGE (3.9d): ${unfilled.join(', ')}`);
  process.exit(2);
}

// ── normalisers ────────────────────────────────────────────────────────────────────────────────────
const hex6 = (h) => {
  let x = h.toLowerCase().replace('#', '');
  if (x.length === 3 || x.length === 4) x = [...x].map((c) => c + c).join('');
  return `#${x.slice(0, 6)}`;
};
const bezier = (s) => s.replace(/\s+/g, '').toLowerCase();
const ms = (v) => (/ms$/i.test(v) ? parseFloat(v) : parseFloat(v) * 1000);
const family = (f) => f.trim().replace(/^["']|["']$/g, '').toLowerCase();
const GENERIC = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong', 'inherit', 'initial', 'unset', 'revert', 'var']);

const palette = new Set(Object.values(C.colors || {}).map((c) => hex6(typeof c === 'string' ? c : c.hex)));
for (const extra of C.allow_colors || []) if (/^#/.test(extra)) palette.add(hex6(extra));
const families = new Set();
for (const role of Object.values(C.fonts || {})) {
  if (role.family) families.add(family(role.family));
  for (const f of String(role.fallback || '').split(',')) if (f.trim()) families.add(family(f));
}
const curves = new Set((C.motion?.curves || []).map(bezier));
const durations = (C.motion?.durations_ms || []).map(Number);
const tolerance = Number(C.motion?.tolerance_ms ?? 10);
const radii = new Set((C.radius?.values || []).map((v) => String(v).replace(/\s+/g, '')));
const radiusExceptions = (C.radius?.exceptions || []).map((s) => s.trim());
const shadowPolicy = C.shadow?.policy || 'any';
const maxBlur = Number(C.shadow?.max_blur_px ?? Infinity);
const forbidden = (C.forbidden || []).map((p) => (p.startsWith('/') && p.lastIndexOf('/') > 0 ? new RegExp(p.slice(1, p.lastIndexOf('/')), p.slice(p.lastIndexOf('/') + 1)) : p));
const genericOk = C.fonts_generic_fallback_ok !== false;

// ── collect stylesheets ────────────────────────────────────────────────────────────────────────────
const sheets = [];
function add(file) {
  const src = readFileSync(file, 'utf8');
  if (/\.css$/i.test(file)) { sheets.push({ file, css: src, base: 0, src }); return; }
  if (!/\.html?$/i.test(file)) return;
  for (const m of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) sheets.push({ file, css: m[1], base: m.index + m[0].indexOf(m[1]), src });
  for (const m of src.matchAll(/\sstyle="([^"]*)"/gi)) sheets.push({ file, css: `[inline]{${m[1]}}`, base: m.index, src, inline: true });
}
function walk(p) {
  const st = statSync(p);
  if (st.isDirectory()) { for (const n of readdirSync(p)) if (!['node_modules', '.git', '.ic'].includes(n)) walk(path.join(p, n)); }
  else add(p);
}
for (const i of inputs) walk(i);

// ── lint ───────────────────────────────────────────────────────────────────────────────────────────
const findings = [];
const lineOf = (s, idx) => s.src.slice(0, s.base + Math.max(0, idx)).split('\n').length;
const report = (s, idx, level, rule, msg) => findings.push({ file: s.file, line: lineOf(s, idx), level, rule, msg });
const seen = { curves: new Set(), durations: new Set() };

for (const s of sheets) {
  const css = s.css.replace(/\/\*[\s\S]*?\*\//g, (c) => ' '.repeat(c.length));
  for (const p of forbidden) {
    const hits = typeof p === 'string' ? [...css.matchAll(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))] : [...css.matchAll(new RegExp(p.source, p.flags.includes('g') ? p.flags : `${p.flags}g`))];
    for (const h of hits) report(s, h.index, 'error', 'forbidden', `"${h[0]}" is a hard fail in this contract`);
  }
  for (const rule of css.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
    const selector = rule[1].trim();
    const body = rule[2];
    const bodyAt = rule.index + rule[0].indexOf('{') + 1;
    for (const d of body.matchAll(/(--[\w-]+|[a-z-]+)\s*:\s*([^;]+)/gi)) {
      const prop = d[1].toLowerCase();
      const value = d[2].trim();
      const idx = bodyAt + d.index;
      const custom = prop.startsWith('--');

      // colours — literals outside the palette (token definitions are checked too: the palette is the contract)
      for (const c of value.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
        if (![3, 4, 6, 8].includes(c[0].length - 1)) continue;
        if (!palette.has(hex6(c[0]))) report(s, idx, 'error', 'color', `${prop}: ${c[0]} is not a named colour in the contract`);
      }
      // fonts
      if (prop === 'font-family' || (custom && /font/.test(prop))) {
        for (const f of value.split(',').map(family).filter(Boolean)) {
          if (f.startsWith('var(')) continue;
          if (GENERIC.has(f)) { if (!genericOk) report(s, idx, 'error', 'font', `generic fallback "${f}" — this contract names a fallback floor for every role`); continue; }
          if (!families.has(f)) report(s, idx, 'error', 'font', `font "${f}" is not a contract type role or its fallback`);
        }
      }
      // motion
      if (/^(transition|animation)(-timing-function)?$|^--ease/.test(prop)) {
        for (const b of value.matchAll(/cubic-bezier\([^)]*\)/gi)) {
          seen.curves.add(bezier(b[0]));
          if (curves.size && !curves.has(bezier(b[0]))) report(s, idx, 'error', 'motion', `${b[0]} is outside the motion budget`);
        }
        if (/\b(power[1-4]|expo|elastic|back|sine|circ|quad|cubic|quart|quint)\.(in|out|inOut)\b/.test(value)) report(s, idx, 'error', 'motion', `"${value}" uses a GSAP ease name — invalid CSS; the whole declaration is dropped`);
      }
      if (/^(transition|animation)(-duration)?$|^--dur/.test(prop) && durations.length) {
        for (const t of value.matchAll(/(?<![\w.-])(\d*\.?\d+)(ms|s)\b/g)) {
          const v = ms(t[0]);
          if (v === 0) continue;
          seen.durations.add(v);
          const ambient = /^animation/.test(prop) && v >= 2000;   // heartbeats and loops live on their own co-prime clock
          if (!ambient && !durations.some((dd) => Math.abs(dd - v) <= tolerance)) report(s, idx, 'warning', 'motion', `${t[0]} is not a contract duration (${durations.join(' / ')} ms)`);
        }
      }
      // radius
      if (/^border(-[a-z]+)*-radius$/.test(prop) && radii.size) {
        const exempt = radiusExceptions.some((e) => selector.includes(e));
        for (const r of value.split(/\s+/)) if (!exempt && !radii.has(r.replace(/\s+/g, '')) && !/^var\(/.test(r)) report(s, idx, 'error', 'radius', `${selector}: border-radius ${r} is outside the radius policy`);
      }
      // shadow
      if ((prop === 'box-shadow' || prop === 'text-shadow') && shadowPolicy !== 'any' && value !== 'none') {
        for (const layer of value.split(/,(?![^(]*\))/)) {
          const lens = layer.match(/-?\d*\.?\d+px/g) || [];
          const blur = lens.length >= 3 ? parseFloat(lens[2]) : 0;
          if (shadowPolicy === 'none') report(s, idx, 'error', 'shadow', `${prop} present but the shadow policy is "none"`);
          else if (blur > maxBlur) report(s, idx, 'error', 'shadow', `${prop} blur ${blur}px exceeds the ${shadowPolicy} policy (max ${maxBlur}px)`);
        }
      }
      // borders
      if (C.border?.translucent === false && /^border(-(top|right|bottom|left))?(-color)?$/.test(prop)) {
        const a = value.match(/rgba?\([^)]*[,/]\s*(0?\.\d+|\d+%)\s*\)/i) || value.match(/#[0-9a-f]{8}\b/i);
        if (a) report(s, idx, 'error', 'border', `${selector}: translucent border (${a[0]}) — this contract wants full-opacity hairlines`);
      }
    }
  }
}
if (C.motion?.max_curves && seen.curves.size > C.motion.max_curves) findings.push({ file: '(all)', line: 0, level: 'error', rule: 'motion', msg: `${seen.curves.size} distinct curves in use — the budget is ${C.motion.max_curves}` });

// ── report ─────────────────────────────────────────────────────────────────────────────────────────
const errors = findings.filter((f) => f.level === 'error');
if (argv.includes('--json')) console.log(JSON.stringify({ tool: 'ic-contract', sheets: sheets.length, errors: errors.length, warnings: findings.length - errors.length, findings }, null, 2));
else {
  console.log(`Iron Canvas · design contract — ${path.basename(contractPath)} · ${sheets.length} stylesheet block(s)`);
  const shown = new Map();
  for (const f of findings) {
    const key = `${f.rule}|${f.msg}`;
    shown.set(key, (shown.get(key) || []).concat(`${path.basename(f.file)}:${f.line}`));
  }
  for (const [key, where] of shown) {
    const [rule, msg] = key.split('|');
    const lvl = findings.find((f) => f.rule === rule && f.msg === msg).level;
    console.log(`  ${lvl === 'error' ? '✗' : '!'} [${rule}] ${msg}  (${where.slice(0, 4).join(', ')}${where.length > 4 ? ` +${where.length - 4}` : ''})`);
  }
  console.log(errors.length ? `${errors.length} violation(s), ${findings.length - errors.length} warning(s) — the build breaks its contract` : `PASS — the build keeps its contract (${findings.length} warning(s))`);
}
process.exit(errors.length ? 1 : 0);
