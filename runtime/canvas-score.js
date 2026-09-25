/*!
 * Iron Canvas · Score Runtime — canvas-score.js v1.0.0
 * Performs a declarative motion Score (acts → shots) in a named motion personality.
 * Requires GSAP ≥ 3.12 + ScrollTrigger (globals or options). Optional: Lenis (smooth scroll).
 *
 * Three modes, chosen once at start and never mixed:
 *   full    — the complete performance: pins, scrubbed timelines, breath, smooth scroll
 *   reduced — prefers-reduced-motion (or ?motion=reduced): short opacity-only reveals, no pins, no breath, native scroll
 *   static  — ?motion=off, options.motion === false, or GSAP missing: final states only
 *
 * Contract with the page (see runtime/README.md):
 *   <script>document.documentElement.classList.add('ic-js')</script>   in <head>, before CSS paints
 *   .ic-js [data-ic]{opacity:0}                                        entrance targets start hidden
 *   .ic-js:not(.ic-ready) [data-ic]{animation:ic-failsafe .5s 3s forwards}
 *   @keyframes ic-failsafe{to{opacity:1}}                              content can never stay hidden
 */

export const VERSION = '1.0.0';

/** Motion personalities — the emotional register of time. Durations in seconds (before tempo). */
export const PERSONALITIES = {
  silk:    { ease: 'expo.out',      duration: 1.4, stagger: 0.035 }, // luxury, editorial, unhurried confidence
  tide:    { ease: 'sine.inOut',    duration: 2.4, stagger: 0.08 },  // contemplative, oceanic, breathing
  gravity: { ease: 'power4.out',    duration: 1.1, stagger: 0.05 },  // weight, authority, arrival
  spark:   { ease: 'back.out(1.7)', duration: 0.6, stagger: 0.025 }, // play, energy, overshoot
  snap:    { ease: 'power3.inOut',  duration: 0.5, stagger: 0.02 },  // precision, technical, decisive
  bloom:   { ease: 'expo.inOut',    duration: 1.8, stagger: 0.06 },  // light opening, reveal of something precious
  drift:   { ease: 'none',          duration: 1.0, stagger: 0 },     // scrubbed parallax; scroll is the clock
};

/**
 * The verb vocabulary. kind:
 *   enter — brings something into being (reduced mode → opacity fade; static → final state)
 *   exit  — takes something away (skipped in reduced/static so content stays readable)
 *   scrub — continuous, scroll-bound (skipped in reduced/static)
 *   special — handled by a dedicated performer below
 */
export const VERBS = {
  fade:    { kind: 'enter', from: { autoAlpha: 0 }, to: { autoAlpha: 1 } },
  rise:    { kind: 'enter', from: { autoAlpha: 0, y: 48 }, to: { autoAlpha: 1, y: 0 } },
  unveil:  { kind: 'enter', mask: true, from: { yPercent: 118 }, to: { yPercent: 0 } },
  bloom:   { kind: 'enter', from: { autoAlpha: 0, scale: 0.86, filter: 'blur(16px)' }, to: { autoAlpha: 1, scale: 1, filter: 'blur(0px)' } },
  focus:   { kind: 'enter', from: { autoAlpha: 0.15, filter: 'blur(12px)' }, to: { autoAlpha: 1, filter: 'blur(0px)' } },
  tilt:    { kind: 'enter', from: { autoAlpha: 0, rotateX: 24, y: 64, transformPerspective: 1000, transformOrigin: '50% 100%' }, to: { autoAlpha: 1, rotateX: 0, y: 0 } },
  wipe:    { kind: 'enter', from: { clipPath: 'inset(0% 100% 0% 0%)' }, to: { clipPath: 'inset(0% 0% 0% 0%)' } },
  iris:    { kind: 'enter', from: { clipPath: 'circle(0% at 50% 50%)' }, to: { clipPath: 'circle(142% at 50% 50%)' } },
  sink:    { kind: 'exit',  from: { autoAlpha: 1, y: 0 }, to: { autoAlpha: 0, y: 48 } },
  lift:    { kind: 'exit',  from: { autoAlpha: 1, y: 0 }, to: { autoAlpha: 0, y: -64 } },
  defocus: { kind: 'exit',  from: { autoAlpha: 1, filter: 'blur(0px)' }, to: { autoAlpha: 0.12, filter: 'blur(12px)' } },
  dolly:   { kind: 'exit',  from: { autoAlpha: 1, scale: 1 }, to: { autoAlpha: 0, scale: 2.4 } },
  drift:   { kind: 'scrub', from: { y: 0 }, to: { y: -120 } },
  draw:    { kind: 'special' },
  count:   { kind: 'special' },
  scramble:{ kind: 'special' },
  sweep:   { kind: 'special' },
};

/** Seeded PRNG — the same score renders the same breath on every run (evidence-friendly). */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function emitter() {
  const map = new Map();
  return {
    on(type, fn) { (map.get(type) || map.set(type, new Set()).get(type)).add(fn); return () => map.get(type)?.delete(fn); },
    off(type, fn) { map.get(type)?.delete(fn); },
    emit(type, ...args) { map.get(type)?.forEach((fn) => { try { fn(...args); } catch (e) { console.error('[canvas-score]', e); } }); },
  };
}

/* ─────────────────────────────── text splitting ─────────────────────────────── */

const MASK_STYLE = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em';

function piece(cls, text) {
  const s = document.createElement('span');
  s.className = cls;
  s.style.display = 'inline-block';
  s.textContent = text;
  s.setAttribute('aria-hidden', 'true');
  return s;
}

/** Splits words or chars recursively through inline children, so styled spans (<em>, <b>) survive. */
function splitInline(el, mode, masked, out) {
  for (const node of [...el.childNodes]) {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      for (const token of node.textContent.split(/(\s+)/)) {
        if (!token) continue;
        if (/^\s+$/.test(token)) { frag.appendChild(document.createTextNode(token)); continue; }
        const word = piece('ic-w', '');
        if (mode === 'chars') {
          for (const ch of Array.from(token)) { const c = piece('ic-c', ch); word.appendChild(c); out.push(c); }
          if (masked) word.style.cssText += ';' + MASK_STYLE;
          frag.appendChild(word);
        } else {
          word.textContent = token;
          out.push(word);
          if (masked) { const m = piece('ic-m', ''); m.style.cssText = MASK_STYLE; m.appendChild(word); frag.appendChild(m); }
          else frag.appendChild(word);
        }
      }
      node.replaceWith(frag);
    } else if (node.nodeType === 1 && node.tagName !== 'BR') {
      splitInline(node, mode, masked, out);
    }
  }
}

/** Lines are measured after layout; the element is flattened to plain text first. */
function splitLines(el, masked) {
  const text = el.textContent.replace(/\s+/g, ' ').trim();
  el.textContent = '';
  const words = text.split(' ').map((w) => { const s = piece('ic-w', w); el.appendChild(s); el.appendChild(document.createTextNode(' ')); return s; });
  const lines = [];
  let top = null;
  for (const w of words) {
    if (w.offsetTop !== top) { lines.push([]); top = w.offsetTop; }
    lines[lines.length - 1].push(w.textContent);
  }
  el.textContent = '';
  return lines.map((ws) => {
    const outer = document.createElement('span');
    outer.style.cssText = 'display:block;' + (masked ? 'overflow:hidden;padding-bottom:.12em;margin-bottom:-.12em' : '');
    outer.setAttribute('aria-hidden', 'true');
    const inner = piece('ic-l', ws.join(' '));
    outer.appendChild(inner);
    el.appendChild(outer);
    return inner;
  });
}

/** Wraps a whole element in an overflow mask so `unveil` works on images and blocks, not just text. */
function maskWrap(el) {
  if (el.parentElement?.classList.contains('ic-mask')) return el;
  const mask = document.createElement(getComputedStyle(el).display === 'inline' ? 'span' : 'div');
  mask.className = 'ic-mask';
  mask.style.cssText = 'overflow:hidden;' + (mask.tagName === 'SPAN' ? 'display:inline-block;vertical-align:top' : '');
  el.replaceWith(mask);
  mask.appendChild(el);
  return el;
}

function split(el, mode, masked) {
  if (el.__icPieces) return el.__icPieces;
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  let pieces = [];
  if (mode === 'lines') pieces = splitLines(el, masked);
  else splitInline(el, mode, masked, pieces);
  el.__icPieces = pieces;
  return pieces;
}

/* ─────────────────────────────── the performer ─────────────────────────────── */

/**
 * @param {object} score   the Score (see runtime/score.schema.json)
 * @param {object} [options] { gsap, ScrollTrigger, Lenis|false, motion:false, hooks:{}, expose:true, debug:false }
 * @returns controller { mode, ready, acts, on, off, kill, refresh, seek }
 */
export function performScore(score, options = {}) {
  const gsap = options.gsap || globalThis.gsap;
  const ScrollTrigger = options.ScrollTrigger || globalThis.ScrollTrigger;
  const LenisCtor = options.Lenis === false ? null : (options.Lenis || globalThis.Lenis);
  const html = document.documentElement;
  const query = new URLSearchParams(location.search);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || query.get('motion') === 'reduced';
  const off = options.motion === false || query.get('motion') === 'off';
  const debug = options.debug || query.get('score') === 'debug';
  const mode = !gsap || !ScrollTrigger || off ? 'static' : reduced ? 'reduced' : 'full';

  const bus = emitter();
  const tempo = Number(score.tempo) || 1;
  const rnd = mulberry32(Number(score.seed) || 7);
  const built = [];
  const loose = []; // breath + page trigger, killed with the performance
  const departing = new Set(); // targets of exit/scrub verbs — returned to their natural state on kill
  let lenis = null;
  let killed = false;

  const controller = {
    mode, acts: built, version: VERSION,
    on: bus.on, off: bus.off,
    refresh: () => ScrollTrigger?.refresh(),
    kill,
    seek(actId, p = 0) {
      const act = built.find((a) => a.id === actId);
      if (!act) return;
      const y = act.st && act.st.end > act.st.start ? act.st.start + (act.st.end - act.st.start) * p : act.el.offsetTop;
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    },
  };

  if (mode === 'static') {
    html.classList.remove('ic-js');
    html.classList.add('ic-static');
    controller.ready = Promise.resolve(controller);
    if (gsap) finalizeAll();
    if (options.expose !== false) window.__icScore = controller;
    return controller;
  }

  gsap.registerPlugin(ScrollTrigger);
  html.classList.add('ic-motion', `ic-${mode}`);

  const fontsReady = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]);
  controller.ready = fontsReady.then(() => {
    if (killed) return controller;
    if (mode === 'full' && LenisCtor && score.smooth !== false) startLenis();
    (score.acts || []).forEach((act, i) => { const b = buildAct(act, i); if (b) built.push(b); });
    if (mode === 'full') startBreath();
    loose.push(ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => bus.emit('page', s.progress) }));
    html.classList.add('ic-ready');
    ScrollTrigger.refresh();
    bus.emit('ready', controller);
    if (debug) console.table(built.map((a) => ({ act: a.id, trigger: a.trigger, shots: a.shots, start: a.st?.start, end: a.st?.end })));
    return controller;
  });

  if (options.expose !== false) window.__icScore = controller;
  return controller;

  /* ── helpers bound to this performance ── */

  function targetsIn(scope, sel) {
    if (!sel) return [];
    if (sel instanceof Element) return [sel];
    let found = [...scope.querySelectorAll(sel)];
    if (!found.length) found = [...document.querySelectorAll(sel)];
    return found;
  }

  function personalityOf(act, shot) {
    return PERSONALITIES[shot.personality || act.personality || score.personality] || PERSONALITIES.silk;
  }

  function reveal(el) { gsap.set(el, { autoAlpha: 1 }); }

  function buildAct(act, index) {
    const el = typeof act.el === 'string' ? document.querySelector(act.el) : act.el;
    if (!el) { console.warn(`[canvas-score] act "${act.id || index}" has no element (${act.el})`); return null; }
    const id = act.id || `act-${index}`;
    const trigger = mode === 'reduced' && act.trigger === 'scrub' ? 'enter' : (act.trigger || 'enter');
    const tl = gsap.timeline({ paused: true });
    let shots = 0;
    for (const shot of act.shots || []) { if (addShot(tl, el, act, shot)) shots++; }
    if (act.hold && mode === 'full') tl.to({}, { duration: act.hold });

    let st = null;
    if (trigger === 'scrub') {
      st = ScrollTrigger.create({
        trigger: el,
        start: act.start || 'top top',
        end: act.end || `+=${act.length || '150%'}`,
        pin: act.pin === true,
        scrub: act.scrub ?? 0.8,
        animation: tl,
        markers: debug,
        onUpdate: (s) => bus.emit('progress', id, s.progress, s.direction),
        onToggle: (s) => bus.emit(s.isActive ? 'enter' : 'leave', id),
      });
    } else if (trigger === 'load') {
      tl.play(0);
      bus.emit('enter', id);
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: (act.trigger === 'scrub' ? null : act.start) || 'top 78%', // a scrub start ('top top') reveals too late once demoted
        markers: debug,
        onEnter: () => { tl.play(); bus.emit('enter', id); },
        onLeaveBack: () => { if (act.replay) tl.reverse(); },
        onEnterBack: () => { if (act.replay) tl.play(); },
      });
      if (st.progress > 0 || st.isActive) tl.progress(1); // already scrolled past on load (deep link / refresh)
    }
    return { id, el, tl, st, trigger, shots };
  }

  function addShot(tl, scope, act, shot) {
    const at = (Number(shot.at) || 0) * (act.trigger === 'scrub' ? 1 : tempo);
    if (shot.call) {
      const fn = options.hooks?.[shot.call];
      if (typeof fn === 'function') { tl.call(fn, [shot.args, act.id], at); return true; }
      console.warn(`[canvas-score] missing hook "${shot.call}"`);
      return false;
    }
    const verb = VERBS[shot.verb || 'rise'];
    if (!verb) { console.warn(`[canvas-score] unknown verb "${shot.verb}"`); return false; }
    let targets = targetsIn(scope, shot.target);
    if (!targets.length) { console.warn(`[canvas-score] no targets for "${shot.target}"`); return false; }
    const p = personalityOf(act, shot);
    const duration = (shot.duration ?? p.duration) * (act.trigger === 'scrub' ? 1 : tempo);
    const ease = shot.ease || p.ease;
    const stagger = shot.stagger ?? p.stagger;

    if (mode === 'reduced') return addReducedShot(tl, targets, verb, shot, at);

    if (verb.kind === 'special') return addSpecial(tl, targets, shot, at, duration, ease, stagger);
    if (shot.split) {
      targets.forEach(reveal);
      targets = targets.flatMap((t) => split(t, shot.split, !!verb.mask));
    } else if (verb.kind === 'enter' && !('autoAlpha' in verb.from) && !('opacity' in verb.from)) {
      // clip- and mask-based verbs conceal by geometry, so the pre-paint opacity:0 must lift now
      if (verb.mask) targets = targets.map(maskWrap);
      targets.forEach(reveal);
    }
    const from = { ...verb.from, ...shot.from };
    const to = { ...verb.to, ...shot.to, duration, ease, stagger };
    if (verb.kind === 'exit' || verb.kind === 'scrub') targets.forEach((t) => departing.add(t));
    tl.fromTo(targets, from, to, at);
    return true;
  }

  function addReducedShot(tl, targets, verb, shot, at) {
    if (verb.kind === 'exit' || verb.kind === 'scrub' || shot.verb === 'sweep') return false;
    if (shot.verb === 'draw' || shot.verb === 'count' || shot.verb === 'scramble') { targets.forEach(reveal); return false; }
    tl.fromTo(targets, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'none', stagger: 0 }, Math.min(at, 0.6));
    return true;
  }

  function addSpecial(tl, targets, shot, at, duration, ease, stagger) {
    targets.forEach(reveal);
    if (shot.verb === 'draw') {
      const shapes = targets.flatMap((t) => (t.matches('path,line,polyline,polygon,circle,ellipse,rect') ? [t] : [...t.querySelectorAll('path,line,polyline,polygon,circle,ellipse,rect')]));
      shapes.forEach((s) => { const L = (s.getTotalLength ? s.getTotalLength() : 1000) + 1; s.style.strokeDasharray = `${L}`; s.style.strokeDashoffset = `${L}`; });
      tl.to(shapes, { strokeDashoffset: 0, duration, ease, stagger }, at);
      return true;
    }
    if (shot.verb === 'count') {
      targets.forEach((el, i) => {
        const to = parseFloat(el.dataset.countTo ?? el.textContent.replace(/[^\d.-]/g, '')) || 0;
        const dec = Number(el.dataset.decimals || 0);
        const fmt = (v) => `${el.dataset.prefix || ''}${v.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec })}${el.dataset.suffix || ''}`;
        el.setAttribute('aria-label', fmt(to));
        const o = { v: 0 };
        el.textContent = fmt(0);
        tl.to(o, { v: to, duration, ease, onUpdate: () => { el.textContent = fmt(o.v); } }, at + i * stagger);
      });
      return true;
    }
    if (shot.verb === 'scramble') {
      const glyphs = shot.glyphs || '◆◇○●▪▫/\\|+×#';
      targets.forEach((el, i) => {
        const final = el.dataset.icText ?? el.textContent;
        el.dataset.icText = final;
        el.setAttribute('aria-label', final);
        const o = { p: 0 };
        const draw = () => {
          const n = Math.floor(o.p * final.length);
          let s = final.slice(0, n);
          for (let k = n; k < final.length; k++) s += /\s/.test(final[k]) ? final[k] : glyphs[(k * 7 + Math.floor(o.p * 60)) % glyphs.length];
          el.textContent = s;
        };
        tl.to(o, { p: 1, duration, ease: 'none', onUpdate: draw, onComplete: () => { el.textContent = final; } }, at + i * stagger);
      });
      return true;
    }
    if (shot.verb === 'sweep') {
      tl.fromTo(targets, { '--ic-sweep': '-40%' }, { '--ic-sweep': '140%', duration, ease, stagger }, at);
      return true;
    }
    return false;
  }

  function startBreath() {
    const cfg = score.breath || {};
    if (cfg.enabled === false) return;
    const amp = Number(cfg.amplitude ?? 1);
    document.querySelectorAll(cfg.selector || '[data-breath]').forEach((el) => {
      const a = amp * Number(el.dataset.breath || 1);
      loose.push(gsap.to(el, {
        y: (rnd() * 2 - 1) * 5 * a + (rnd() > 0.5 ? 4 : -4) * a,
        rotation: (rnd() * 2 - 1) * 0.5 * a,
        duration: 4.2 + rnd() * 3.2,
        ease: 'sine.inOut', yoyo: true, repeat: -1, delay: -rnd() * 4,
      }));
    });
  }

  function startLenis() {
    lenis = new LenisCtor({ lerp: score.lerp ?? 0.085, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis?.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    loose.push({ kill: () => gsap.ticker.remove(raf) });
    controller.lenis = lenis;
  }

  function finalizeAll() {
    for (const act of score.acts || []) {
      const el = typeof act.el === 'string' ? document.querySelector(act.el) : act.el;
      if (!el) continue;
      for (const shot of act.shots || []) {
        const verb = VERBS[shot.verb || 'rise'];
        if (!verb || verb.kind === 'exit' || verb.kind === 'scrub' || shot.call) continue;
        const ts = targetsIn(el, shot.target);
        if (verb.kind === 'enter') gsap.set(ts, { ...verb.to, ...shot.to });
        else ts.forEach(reveal);
      }
    }
  }

  /**
   * The kill switch: stops every motion and leaves the page fully readable — entrances at their final
   * state, anything an exit or scrub moved returned to its natural (static CSS) state.
   */
  function kill() {
    if (killed) return;
    killed = true;
    built.forEach((a) => { a.st?.kill(true); a.tl.progress(1).kill(); });
    loose.forEach((t) => t.kill());
    gsap.set([...departing], { clearProps: 'transform,opacity,visibility,filter,clipPath' });
    gsap.set('[data-breath]', { clearProps: 'transform' });
    lenis?.destroy();
    lenis = null;
    html.classList.remove('ic-js', 'ic-motion', 'ic-full', 'ic-reduced');
    html.classList.add('ic-killed', 'ic-ready');
    bus.emit('killed');
  }
}
