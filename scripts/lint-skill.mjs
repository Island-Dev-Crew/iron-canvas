#!/usr/bin/env node
// Iron Canvas · doc lint + loss guard — keeps the doctrine whole, so it cannot be chopped again.
//
//   node scripts/lint-skill.mjs                    lint the working tree
//   node scripts/lint-skill.mjs --against <rev>    also run the loss guard against a base revision
//
// Checks (each failure names file and line):
//   paths    every repo path referenced from the navigation docs exists (ghost files are how pointers rot)
//   fences   every markdown code fence closes, and no fence with an info string sits inside an open one
//            (the v4.1 merge splice that swallowed Phase 2 into a Phase 3 code block)
//   voice    SKILL.md carries the anchor lines of §0.1 THE VOICE verbatim
//   version  SKILL.md frontmatter, header and footer, and the CHANGELOG's latest entry agree
//   loss     (--against) no file loses more than 20 lines that exist nowhere else in the tree unless the
//            latest CHANGELOG entry's "Removed" section names that file — the gate an overlay upgrade
//            never had, and the reason v4.2.0's motion arsenal vanished silently
//
// Exit 0 clean · 1 findings. Zero dependencies (git is used only for --against).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const against = argv.includes('--against') ? argv[argv.indexOf('--against') + 1] : null;
const rel = (p) => path.relative(root, p).split(path.sep).join('/');
const read = (p) => readFileSync(path.join(root, p), 'utf8');
const findings = [];
const fail = (check, file, line, msg) => findings.push({ check, file, line, msg });

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules' || name === '.ic') continue;
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const files = walk(root).map(rel);
const markdown = files.filter((f) => f.endsWith('.md'));

// ── fences ──────────────────────────────────────────────────────────────────────────────────────
for (const f of markdown) {
  const lines = read(f).split(/\r?\n/);
  let open = null;
  lines.forEach((l, i) => {
    const m = l.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (!m) return;
    const [, fence, info] = m;
    if (!open) { open = { i, fence }; return; }
    if (!info.trim() && fence[0] === open.fence[0] && fence.length >= open.fence.length) open = null;
    else fail('fences', f, i + 1, `fence "${l.trim().slice(0, 40)}" inside the fence opened at line ${open.i + 1} — a splice`);
  });
  if (open) fail('fences', f, open.i + 1, 'code fence never closes');
}

// ── paths ───────────────────────────────────────────────────────────────────────────────────────
const NAV = ['SKILL.md', 'ROUTING.md', 'REPO_MAP.md', 'README.md', 'QUICK_REFERENCE.md', 'FEEL.md', 'IMMERSIVE_MODE.md',
  ...markdown.filter((f) => /^(references|phases|agent-prompts|surfaces|templates|runtime|engines|studio)\//.test(f))];
const TOP = '(?:references|phases|agent-prompts|surfaces|templates|runtime|engines|studio|showcase|scripts|sub-skills)';
const PATH_RE = new RegExp(`(?<![\\w./-])(${TOP}/[\\w./-]*[\\w-]|[A-Z][A-Z0-9_]{2,}\\.md)`, 'g');
// Names that are not repo files: outputs a run writes into a client project, and generic shorthand.
const NOT_REPO = new Set(['HANDOFF.md', 'PACK.md', 'DESIGN.md', 'CLAUDE.md', 'AGENTS.md', 'BREAKDOWN.md', 'STORYBOARD.md']);
const GENERATED = { test: (p) => NOT_REPO.has(p) };
for (const f of NAV.filter((n) => files.includes(n))) {
  const lines = read(f).split(/\r?\n/);
  let inFence = false;
  lines.forEach((l, i) => {
    if (/^\s*(`{3,}|~{3,})/.test(l)) inFence = !inFence;
    for (const m of l.matchAll(PATH_RE)) {
      let p = m[1].replace(/[.,;:)]+$/, '');
      if (/[*<>{}]|\.\.\.|…/.test(p) || /\[|\]/.test(p)) continue;              // globs and placeholders
      if (inFence && !/\.(md|mjs|js|json|py|ts|html)$/.test(p)) continue;        // shell fragments inside examples
      const hit = [p, `${p}.md`, p.replace(/\/$/, '')].some((c) => files.includes(c) || (existsSync(path.join(root, c)) && statSync(path.join(root, c)).isDirectory()));
      if (!hit && !GENERATED.test(p)) fail('paths', f, i + 1, `references "${p}", which does not exist`);
    }
  });
}

// ── voice ───────────────────────────────────────────────────────────────────────────────────────
const VOICE = [
  "We don't vibe-code. We engineer beauty.",
  'A feel brief is not a mood board. It\'s a lens.',
  'master blacksmith\'s studio',
  'Kinetic Energy — Everything feels alive, intentional, moving',
  'overly minimalist (empty without',
  'The still elements make the moving elements land harder.',
  'Whitespace is not empty space. It is the breath between notes.',
  'until every pixel earns its',
  'We check spacing at 2am on a dim screen.',
  "You're a surgeon adding capability, not an architect",
  'You are a detective, not an art',
  'Sycophancy here is expensive.',
  'Restraint is not stillness.',
  'Adjectives direct. Evidence proves.',
  'Extract. Understand. Then enhance.',
];
if (files.includes('SKILL.md')) {
  const skill = read('SKILL.md').replace(/\s+/g, ' ');
  for (const a of VOICE) if (!skill.includes(a)) fail('voice', 'SKILL.md', 0, `missing voice anchor: "${a}"`);
}

// ── version ─────────────────────────────────────────────────────────────────────────────────────
if (files.includes('SKILL.md')) {
  const s = read('SKILL.md');
  const fm = s.match(/^version:\s*([\d.]+)/m)?.[1];
  const head = s.match(/^#\s.*IRON CANVAS v(\d+(?:\.\d+)?)/m)?.[1];
  const foot = s.match(/Master Skill v([\d.]+)/)?.[1];
  const log = files.includes('CHANGELOG.md') ? read('CHANGELOG.md').match(/^##\s+v([\d.]+)/m)?.[1] : null;
  const major = (v) => String(v || '').split('.')[0];
  if (!fm) fail('version', 'SKILL.md', 1, 'no frontmatter version');
  if (head && major(head) !== major(fm)) fail('version', 'SKILL.md', 0, `header says v${head}, frontmatter ${fm}`);
  if (foot && foot !== fm) fail('version', 'SKILL.md', 0, `footer says v${foot}, frontmatter ${fm}`);
  if (log && log !== fm) fail('version', 'CHANGELOG.md', 0, `latest entry is v${log}, SKILL.md is ${fm}`);
}

// ── loss guard ──────────────────────────────────────────────────────────────────────────────────
let lossReport = null;
if (against) {
  const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const norm = (l) => l.replace(/\s+/g, ' ').trim();
  const meaningful = (l) => l.length >= 12 && /[A-Za-z]{3}/.test(l) && !/^[#>*|\-─═\s`]+$/.test(l);
  const everywhere = new Set();
  for (const f of files.filter((x) => /\.(md|mjs|js|json|html|ts|py|cjs|jsx)$/.test(x))) for (const l of read(f).split(/\r?\n/)) everywhere.add(norm(l));
  const log = files.includes('CHANGELOG.md') ? read('CHANGELOG.md') : '';
  const latest = log.split(/^##\s+v/m)[1] || '';
  const removedBlock = (latest.match(/^###[^\n]*Removed[\s\S]*?(?=^###\s|$(?![\s\S]))/m) || [''])[0];
  const numstat = git('diff', '--numstat', '-M', against, '--').trim().split('\n').filter(Boolean);
  lossReport = [];
  for (const row of numstat) {
    const [, del, name] = row.split('\t');
    const file = name.includes('=>') ? name.replace(/\{?([^{}]*?) => ([^{}]*?)\}?/, '$2') : name;
    if (!Number(del)) continue;
    const diff = git('diff', '-U0', '-M', against, '--', file.includes('=>') ? '.' : file);
    const lost = diff.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---')).map((l) => norm(l.slice(1))).filter(meaningful).filter((l) => !everywhere.has(l));
    if (lost.length) lossReport.push({ file, removed: Number(del), lost: lost.length, sample: lost.slice(0, 3) });
    if (lost.length > 20 && !removedBlock.includes(file)) {
      fail('loss', file, 0, `${lost.length} lines removed since ${against} exist nowhere else in the tree, and the latest CHANGELOG "Removed" section does not name this file — record the loss or restore it`);
    }
  }
}

// ── report ──────────────────────────────────────────────────────────────────────────────────────
const by = (c) => findings.filter((f) => f.check === c).length;
console.log(`Iron Canvas · doc lint — ${markdown.length} markdown files${against ? ` · loss guard vs ${against}` : ''}`);
for (const f of findings) console.log(`  ✗ [${f.check}] ${f.file}${f.line ? `:${f.line}` : ''}  ${f.msg}`);
if (lossReport?.length) {
  console.log('  loss ledger (lines that left the tree entirely):');
  for (const r of lossReport) console.log(`    ${r.file}: ${r.lost} of ${r.removed} removed lines — e.g. "${r.sample[0].slice(0, 70)}"`);
}
console.log(findings.length
  ? `${findings.length} finding(s) — paths ${by('paths')} · fences ${by('fences')} · voice ${by('voice')} · version ${by('version')} · loss ${by('loss')}`
  : 'clean — paths, fences, voice, version' + (against ? ', loss' : ''));
process.exit(findings.length ? 1 : 0);
