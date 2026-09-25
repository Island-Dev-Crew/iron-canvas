// Iron Canvas Studio — the bible compiler. Pure and deterministic: the same brief always compiles to the same
// production bible (treatment · score · engine jobs · config · mission). The Studio page renders it; agents run it.
// Decisions compiled here are *starting positions* the pipeline records at ORIENT — FEEL, SCOUT and the gauntlet
// still do the creative work.

export const REGISTERS = {
  R0: { name: 'Utilitarian', cap: 0.2, job: 'A tool, admin, internal report, docs', craft: 'information design — hierarchy, state in form, one accent, zero decoration' },
  R1: { name: 'Functional', cap: 0.5, job: 'A page that must convert', craft: 'a clear thesis hero, one memorable moment, motion that clarifies flow' },
  R2: { name: 'Editorial', cap: 0.7, job: 'A page people keep or share; a brand experience', craft: 'a point of view, typography with character, an orchestrated reveal' },
  R3: { name: 'Maximalist', cap: 0.9, job: 'A flagship, an Awwwards run', craft: 'layered depth, grid-breaking composition, atmosphere, a signature technique' },
  R4: { name: 'Immersive', cap: 1.0, job: 'A world — the scene is the site', craft: 'inhabited depth, a camera rail, one material, the evidence gate' },
};

export const SURFACES = {
  web: { name: 'Web', cap: 1.0, floor: 0.1, pack: 'surfaces/web/PACK.md' },
  'app-dashboard': { name: 'App / Dashboard', cap: 0.5, floor: 0.1, pack: 'surfaces/app-dashboard/PACK.md' },
  'immersive-3d': { name: 'Immersive 3D', cap: 1.0, floor: 0.75, pack: 'surfaces/immersive-3d/PACK.md' },
  'game-realtime': { name: 'Game / Realtime', cap: 0.8, floor: 0.2, pack: 'surfaces/game-realtime/PACK.md' },
};

export const PERSONALITIES = {
  silk: 'expo.out · 1.4s — luxury, editorial, unhurried confidence',
  tide: 'sine.inOut · 2.4s — contemplative, oceanic, breathing',
  gravity: 'power4.out · 1.1s — weight, authority, arrival',
  spark: 'back.out(1.7) · 0.6s — play, energy, overshoot',
  snap: 'power3.inOut · 0.5s — precision, technical, decisive',
  bloom: 'expo.inOut · 1.8s — light opening; the reveal of something precious',
};

const PERF_CAP = { 1: 0.35, 2: 0.7, 3: 1.0 };
const ARCS = {
  R0: ['establish', 'resolve'],
  R1: ['establish', 'reveal', 'resolve'],
  R2: ['establish', 'accelerate', 'pause', 'reveal', 'resolve'],
  R3: ['establish', 'accelerate', 'pause', 'reveal', 'recover', 'climax', 'resolve'],
  R4: ['establish', 'accelerate', 'pause', 'reveal', 'recover', 'climax', 'resolve'],
};
const STAGE = {
  establish: 'the world, before the point — orient the viewer, promise the feeling',
  accelerate: 'the pull toward it — momentum, density rising',
  pause: 'a held breath — the quiet chapter that makes the next moment land',
  reveal: 'the thing itself — the first sight of the mechanism',
  recover: 'let the eye rest — supporting proof, lower energy',
  climax: 'the one unforgettable moment — the mechanism, acted out at full scale',
  resolve: 'the calm after light — the invitation, the action',
};
// Starting positions only: FEEL rewrites every one of these in the subject's own words.
const CONTRACT = {
  establish: { job: 'orient', in: 'curious', out: 'drawn in', reduced: 'the headline, the lede and the ground, at rest' },
  accelerate: { job: 'establish_stakes', in: 'drawn in', out: 'leaning forward', reduced: 'the cards laid out, every one legible' },
  pause: { job: 'inspect_detail', in: 'leaning forward', out: 'calm and attentive', reduced: 'one sentence and the air around it' },
  reveal: { job: 'explain_system', in: 'attentive', out: 'surprised', reduced: 'the signature visual as its composed final frame' },
  recover: { job: 'trace_evidence', in: 'surprised', out: 'reassured', reduced: 'the proof — numbers at their final values' },
  climax: { job: 'explain_system', in: 'reassured', out: 'awed', reduced: 'the mechanism at its peak, held as a still' },
  resolve: { job: 'commit', in: 'awed', out: 'ready to act', reduced: 'the offer and the action, nothing moving' },
};

/** The aliveness floor at each register — CD3 shapes the amplitude, nothing removes it (SKILL.md §0.1). */
export const FLOOR = {
  R0: { arrival: '600–900 ms — title, content, actions in three steps', heartbeat: 'one breathing status dot or a live-data tick', hand_feel: 'hover, press and focus on every control', breath: 'air and a light ladder', still: 'the same tool, at rest' },
  R1: { arrival: 'a thesis hero that lands in ≤ 1.2 s', heartbeat: 'one ambient element in the hero', hand_feel: 'hover, press and focus on every control; a tick on the primary action', breath: 'air, a light ladder, grain felt not seen', still: 'the hero and every section at their final frames' },
  R2: { arrival: 'an orchestrated reveal ≤ 1.5 s — never everything at once', heartbeat: 'one heartbeat plus a breathing atmosphere', hand_feel: 'full hand-feel — lift, press, lean on fine pointers', breath: 'air, grain, a mesh that breathes', still: 'every act on its settled frame' },
  R3: { arrival: 'the full load choreography, phases 0–5', heartbeat: 'a living layer in every act, co-prime periods', hand_feel: 'full hand-feel with magnetic fields where the cursor dial allows', breath: 'atmosphere, grain, the light ladder, the field receding behind quiet acts', still: 'every act on its settled frame; the scene as a composed still' },
  R4: { arrival: 'the loader as a brand moment, then one camera-settle move to station 0', heartbeat: 'the world itself breathes — fog, particles, light', hand_feel: 'the world answers the hand — cursor lean, spatial sound on the signature', breath: 'fog as brand, one light, air around every overlay', still: 'a Tier I still of the world plus the kill switch' },
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const slug = (s) => (s || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';

export function depthTier(d) {
  if (d < 0.38) return { tier: 'I', name: 'Composed', what: 'CSS depth only — elevation, focus blur, glass strata, parallax bands' };
  if (d < 0.72) return { tier: 'II', name: 'Staged', what: 'one WebGL scene as a window in the page' };
  return { tier: 'III', name: 'Inhabited', what: 'the scene is the site — camera rail, one material, fog as brand' };
}

/** Resolves depth through every cap, recording why it moved. Most restrictive wins (min), surface floor last. */
export function resolveDepth(b) {
  const notes = [];
  let d = clamp(Number(b.depth ?? 0.3), 0.1, 1);
  const caps = [
    [REGISTERS[b.register]?.cap ?? 1, `register ${b.register}`],
    [SURFACES[b.surface]?.cap ?? 1, `surface ${b.surface}`],
    [PERF_CAP[b.perfTier] ?? 1, `performance tier ${b.perfTier}`],
  ];
  for (const [cap, why] of caps) if (d > cap) { notes.push(`depth ${d.toFixed(2)} → ${cap.toFixed(2)} (capped by ${why})`); d = cap; }
  const floor = SURFACES[b.surface]?.floor ?? 0.1;
  if (d < floor) { notes.push(`depth ${d.toFixed(2)} → ${floor.toFixed(2)} (the ${b.surface} surface lives above its floor)`); d = floor; }
  return { value: +d.toFixed(2), ...depthTier(d), notes };
}

function shotsFor(stage, b, isSignature) {
  const R = Number(b.register.slice(1));
  const rich = R >= 2;
  const S = [];
  switch (stage) {
    case 'establish':
      S.push({ at: 0.02, target: '.label', verb: 'fade', personality: 'drift', duration: 0.1 });
      S.push({ at: 0.06, target: 'h2', verb: rich ? 'unveil' : 'rise', ...(rich ? { split: 'lines' } : {}), duration: 0.2 });
      S.push({ at: 0.3, target: '.lede', verb: 'focus', duration: 0.14 });
      break;
    case 'accelerate':
      S.push({ at: 0.05, target: 'h2', verb: 'unveil', split: 'words', duration: 0.18, stagger: 0.03 });
      S.push({ at: 0.22, target: '.card', verb: 'tilt', duration: 0.18, stagger: 0.04 });
      break;
    case 'pause':
      S.push({ at: 0.1, target: '.lede', verb: 'fade', personality: 'tide', duration: 0.3, note: 'the quiet chapter — no transforms, no spectacle' });
      break;
    case 'reveal':
      S.push({ at: 0.05, target: 'h2', verb: rich ? 'bloom' : 'rise', duration: 0.16 });
      S.push({ at: 0.18, target: '.signature', verb: R >= 3 ? 'iris' : 'wipe', duration: 0.3 });
      break;
    case 'recover':
      S.push({ at: 0.05, target: '.proof', verb: 'rise', duration: 0.14, stagger: 0.04 });
      S.push({ at: 0.0, target: '.band', verb: 'drift', personality: 'drift', duration: 1 });
      break;
    case 'climax':
      S.push({ at: 0.04, target: 'h2', verb: 'unveil', split: 'chars', duration: 0.2, stagger: 0.02 });
      S.push({ at: 0.24, target: '.stat', verb: 'count', duration: 0.16, stagger: 0.03 });
      S.push({ at: 0.6, target: 'h2', verb: 'sweep', duration: 0.2 });
      break;
    case 'resolve':
      S.push({ at: 0.05, target: 'h2', verb: 'rise', duration: 0.14 });
      S.push({ at: 0.2, target: '.cta', verb: 'rise', duration: 0.12, stagger: 0.04 });
      break;
  }
  if (isSignature) S.push({ at: 0.5, call: 'signature', args: 'peak', note: 'the signature moment peaks here — the WebGL scene / camera responds' });
  return S;
}

export function compileBible(b) {
  const brief = {
    idea: '', subject: 'Untitled', mechanism: '', audience: '',
    feel: { adjectives: ['', '', ''], material: '', tempo: 'measured' },
    register: 'R2', surface: 'web', personality: 'silk', depth: 0.5, perfTier: 2,
    engines: { blender: false, video: false, audio: false, imagery: true, film: true },
    ...b,
  };
  brief.feel = { adjectives: ['', '', ''], material: '', tempo: 'measured', ...(b.feel || {}) };
  brief.engines = { blender: false, video: false, audio: false, imagery: true, film: true, ...(b.engines || {}) };
  const R = Number(brief.register.slice(1));
  const reg = REGISTERS[brief.register];
  const depth = resolveDepth(brief);
  const immersive = depth.value >= 0.4;
  const gauntlet = R <= 1 ? { on: false, why: 'off at R0/R1 — looping to "wow" a utilitarian task is Anti-Pattern #17' } : { on: true, width: R === 2 ? 2 : R === 3 ? 3 : 4, why: R === 4 ? 'mandatory at R4' : R === 3 ? 'on at R3' : 'scoped to the signature at R2' };
  const arc = ARCS[brief.register];
  const signatureStage = arc.includes('climax') ? 'climax' : arc.includes('reveal') ? 'reveal' : arc[arc.length - 1];
  const feelLine = [...brief.feel.adjectives.filter(Boolean), brief.feel.material, brief.feel.tempo].filter(Boolean).join(' · ') || '(to be inferred at FEEL from the subject)';
  const twin = brief.engines.blender && brief.engines.video && depth.value >= 0.4 && R >= 2;
  const id = slug(brief.subject);

  const treatment = {
    subject: brief.subject,
    logline: brief.idea || '(write the idea in one or two sentences)',
    mechanism: brief.mechanism || '(name the one true mechanism in a sentence — if you cannot, stop and ask)',
    signature: `At the ${signatureStage}: the page acts out the mechanism — ${brief.mechanism || 'the mechanism'} — as its one unforgettable moment.`,
    feel_line: feelLine,
    register: { id: brief.register, name: reg.name, job: reg.job, craft: reg.craft },
    surface: { id: brief.surface, ...SURFACES[brief.surface] },
    depth, immersive_lane: immersive ? 'Agent F + Phase 4.5 IMMERSE + §22 evidence gate' : 'off (composed depth by Agent-A tokens)',
    gauntlet, personality: { id: brief.personality, curve: PERSONALITIES[brief.personality] },
    arc: arc.map((s) => ({ stage: s, intent: STAGE[s], signature: s === signatureStage })),
    floor: FLOOR[brief.register],
  };

  const score = {
    title: brief.subject, logline: brief.idea, register: brief.register, surface: brief.surface,
    personality: brief.personality,
    tempo: { still: 1.5, slow: 1.25, measured: 1, brisk: 0.85, fast: 0.7 }[brief.feel.tempo] ?? 1,
    seed: 5417, breath: { amplitude: R >= 2 ? 1 : 0.5 },
    signature: signatureStage,
    acts: arc.map((stage, i) => ({
      id: stage, el: `#act-${stage}`,
      stage, job: CONTRACT[stage].job,
      role: stage === signatureStage ? 'signature' : stage === 'pause' ? 'stillness' : 'support',
      intent: STAGE[stage],
      emotion: { in: CONTRACT[stage].in, out: CONTRACT[stage].out },
      reduced: CONTRACT[stage].reduced,
      trigger: i === 0 ? 'load' : (R >= 2 && (stage === signatureStage || R >= 3)) ? 'scrub' : 'enter',
      ...(i > 0 && (R >= 2 && (stage === signatureStage || R >= 3)) ? { start: 'top top', end: 'bottom bottom', scrub: 0.9 } : {}),
      shots: shotsFor(stage, brief, stage === signatureStage),
    })),
  };

  const jobs = {};
  // Register gates the engines: a toggle says "available", the register says "appropriate". Both must agree.
  const gates = [];
  const allowBlender = brief.engines.blender && R >= 2 && depth.value >= 0.4;
  const allowVideo = brief.engines.video && R >= 2;
  const allowAudio = brief.engines.audio && R >= 2;
  if (brief.engines.blender && !allowBlender) gates.push(R < 2 ? `Blender gated off at ${brief.register} — static or code-driven assets serve this register` : `Blender gated off: depth ${depth.value} is below the staged threshold (0.4)`);
  if (brief.engines.video && !allowVideo) gates.push(`Seedance gated off at ${brief.register} — generative film on a ${reg.name.toLowerCase()} task is Anti-Pattern #17`);
  if (brief.engines.audio && !allowAudio) gates.push(`Audio gated off at ${brief.register}`);
  if (R === 2 && (allowVideo || allowAudio)) gates.push('R2: engines serve the signature only — one loop, one cue, no bed');
  treatment.engine_gates = gates;
  if (allowBlender) {
    jobs[`${id}-rail.clay.json`] = {
      type: 'clay-camera', name: `${id}-rail`, seed: 5417, resolution: [1280, 720], fps: 24, seconds: R >= 4 ? 6 : 4,
      note: 'Placeholder stations: set them from the signature scene\'s camera rail. The same stations drive the WebGL camera.',
      blocking: [{ kind: 'plane', position: [0, -2.5, -30], size: [60, 1, 1] }],
      stations: [
        { t: 0, position: [0, 0.4, 14], target: [0, 0.3, 0], fov: 50 },
        { t: 0.5, position: [0.6, 0.35, -6], target: [0.3, 0.3, -20], fov: 48 },
        { t: 1, position: [0, 0.3, -30], target: [0, 0.2, -44], fov: 46 },
      ],
    };
    if (brief.surface !== 'app-dashboard') {
      jobs[`${id}-hero.object.json`] = { type: 'hero-object', name: `${id}-hero`, seed: 5417, size: 2.2, detail: 5, tier: depth.tier === 'III' ? 'III' : 'II', draco: true, note: 'Tint by role tokens resolved at FEEL (base, emission). Replace the form if the mechanism suggests one.' };
    }
  }
  if (allowVideo) {
    const film = R >= 3;
    const seconds = R >= 4 ? 15 : film ? 10 : 6;
    const beats = (film ? ['establish', 'reveal', 'climax', 'resolve'] : ['establish', 'reveal']).map((s, i, all) => ({
      from: Math.round((i * seconds) / all.length), to: Math.round(((i + 1) * seconds) / all.length), beat: s,
      action: `(${STAGE[s]}) — ${s === signatureStage || s === 'climax' ? `the mechanism acted out: ${brief.mechanism || '…'}` : 'describe what happens, cause before effect'}`,
      camera: i === 0 ? (twin ? 'locked to @Video1, slow push in' : 'slow push in from wide') : (twin ? "continue along @Video1's path" : 'dolly forward'),
    }));
    jobs[`${id}-${film ? 'film' : 'loop'}.shot.json`] = {
      name: `${id}-${film ? 'film' : 'loop'}`, class: film ? 'film' : 'bg-loop',
      mode: twin ? 'reference-to-video' : 'image-to-video',
      logline: brief.idea,
      format: { duration: seconds, aspect_ratio: '16:9', resolution: '720p', generate_audio: film && brief.engines.audio !== true },
      references: twin
        ? [{ tag: '@Video1', role: 'camera', kind: 'video', url: '(host clay.mp4 and paste its URL)', job: 'Camera path, speed, and blocking only.', exclude: 'its grey surfaces and flat lighting' },
           { tag: '@Image1', role: 'style', kind: 'image', path: 'north-star.png', job: 'Palette, material, and light.', exclude: 'composition and any text' }]
        : [],
      ...(twin ? {} : { start_frame: { path: 'north-star.png' }, ...(film ? {} : { end_frame: { path: 'north-star.png' } }) }),
      timeline: beats,
      camera: twin ? "Follow @Video1's camera exactly — one continuous move." : 'One primary camera move; separate camera motion from subject motion.',
      continuity: `One material throughout: ${brief.feel.material || 'the world material chosen at FEEL'}. One light source.`,
      constraints: ['no people unless the subject requires them'],
      seed: 5417, candidates: gauntlet.on ? Math.min(gauntlet.width, 4) : 1,
    };
  }
  if (allowAudio) {
    if (R >= 3) jobs[`${id}-bed.cue.json`] = { name: `${id}-bed`, text: `ambient bed, ${feelLine}, slow breathing, seamless loop`, duration_seconds: 22, loop: true, prompt_influence: 0.35 };
    jobs[`${id}-commit.cue.json`] = { name: `${id}-commit`, text: 'one soft confirmation tone for the signature moment, clean, no reverb tail', duration_seconds: 1.2, loop: false, prompt_influence: 0.4 };
  }

  const config = {
    $schema: './engines/canvas.config.schema.json', project: id,
    engines: {
      blender: { enabled: !!brief.engines.blender, binary: '' },
      video: { enabled: !!brief.engines.video, provider: 'fal', model: 'bytedance/seedance-2.5', resolution: '720p' },
      audio: { enabled: !!brief.engines.audio, provider: 'elevenlabs' },
      imagery: { enabled: brief.engines.imagery !== false },
      film: { enabled: brief.engines.film !== false, provider: 'hyperframes' },
    },
    budget: { credit_cap_usd: 25, max_candidates_per_job: gauntlet.on ? Math.min(gauntlet.width, 4) : 1 },
  };

  const on = Object.entries(brief.engines).filter(([, v]) => v).map(([k]) => ({ blender: 'Blender', video: 'Seedance 2.5', audio: 'Audio', imagery: 'AI imagery', film: 'HyperFrames' })[k]);
  const mission = [
    `Run Iron Canvas v6 (github.com/Island-Dev-Crew/iron-canvas) on this production bible. Read SKILL.md, ROUTING.md, then ${SURFACES[brief.surface].pack}.`,
    `The decisions below are recorded at Phase 0 ORIENT — do not re-ask them. FEEL, SCOUT and the gauntlet still do the creative work.`,
    '',
    `SUBJECT        ${brief.subject}`,
    `IDEA           ${brief.idea || '—'}`,
    `MECHANISM      ${treatment.mechanism}`,
    `AUDIENCE       ${brief.audience || '(infer at STUDY)'}`,
    `FEEL LINE      ${feelLine}`,
    `REGISTER       ${brief.register} · ${reg.name} — ${reg.craft}`,
    `SURFACE        ${SURFACES[brief.surface].name}`,
    `DEPTH          ${depth.value} → Tier ${depth.tier} ${depth.name}${depth.notes.length ? ` (${depth.notes.join('; ')})` : ''}`,
    `IMMERSIVE      ${treatment.immersive_lane}`,
    `MOTION         ${brief.personality} — ${PERSONALITIES[brief.personality]}`,
    `GAUNTLET       ${gauntlet.on ? `on — ${gauntlet.width} candidates, blind cross-family critic (${gauntlet.why})` : gauntlet.why}`,
    `POWER ENGINES  ${on.join(' · ') || 'none'}${twin ? ' — TWIN CAMERA: Blender clay rail → Seedance @Video1; the same rail drives the WebGL camera' : ''}`,
    `THE ARC        ${arc.join(' → ')}  (signature at ${signatureStage})`,
    `ALIVENESS      arrival: ${FLOOR[brief.register].arrival} · heartbeat: ${FLOOR[brief.register].heartbeat}`,
    ...(gates.length ? [`ENGINE GATES   ${gates.join(' · ')}`] : []),
    '',
    'Deliver:',
    '1. The page, its motion authored as a score performed by runtime/canvas-score.js (starting score below) —',
    '   FEEL rewrites every act\'s emotion and still meaning in the subject\'s own words; node scripts/ic-preflight.mjs must pass.',
    '2. Every generated asset through engines/ledger.mjs: selected with a written reason, verified, promoted with provenance.',
    `3. Evidence: ${immersive ? 'the §22 immersion scorecard ≥ 4.0 with zero auto-fails, ' : ''}CD3 Axis 6 (treatment & soul), Axis 7 (aliveness — the first 5 s, a 15 s slow scroll, a reduced-motion recording), reduced-motion and no-WebGL proofs, zero console errors, zero horizontal overflow, screenshots at every act.`,
    'The floor is never flat. Nothing ships lifeless. Motion is the soul, not the garnish. One unforgettable moment.',
  ].join('\n');

  return { treatment, score, jobs, config, mission };
}
