/*
 * The Living Canvas — world.js
 * One world, one material: seeded golden particles in warm fog, morphing through five formations
 *   spark → field → score → corridor → canvas
 * as the page's score plays. Scroll owns the camera (pure function of act + progress, damped);
 * the cursor may lean it a little. DOM carries every word; this canvas carries only light.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export const ACTS = ['spark', 'feel', 'score', 'world', 'premiere'];

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

function buildFormations(n, rnd) {
  const make = () => new Float32Array(n * 3);
  const spark = make(), field = make(), staff = make(), world = make(), canvas = make();
  const seed = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const k = i * 3;
    seed[i] = rnd();

    // SPARK — a dense ember: most points in a tight core, a sparse halo around it
    const r = 0.1 + Math.pow(rnd(), 2.2) * 2.8;
    const th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1);
    spark[k] = r * Math.sin(ph) * Math.cos(th);
    spark[k + 1] = r * Math.cos(ph);
    spark[k + 2] = r * Math.sin(ph) * Math.sin(th);

    // FIELD — a wide volume the flow moves through
    field[k] = (rnd() * 2 - 1) * 16;
    field[k + 1] = (rnd() * 2 - 1) * 8;
    field[k + 2] = (rnd() * 2 - 1) * 7 - 2;

    // SCORE — five staff lines and six film frames: motion written like music
    if (rnd() < 0.6) {
      const line = Math.floor(rnd() * 5);
      staff[k] = (rnd() * 2 - 1) * 17;
      staff[k + 1] = (line - 2) * 1.15 + (rnd() - 0.5) * 0.03;
      staff[k + 2] = (rnd() - 0.5) * 0.08;
    } else {
      const frame = Math.floor(rnd() * 6), cx = -12.5 + frame * 5, w = 3.4, h = 2.3;
      let d = rnd() * 2 * (w + h), x, y;
      if (d < w) { x = -w / 2 + d; y = -h / 2; }
      else if ((d -= w) < h) { x = w / 2; y = -h / 2 + d; }
      else if ((d -= h) < w) { x = w / 2 - d; y = h / 2; }
      else { d -= w; x = -w / 2; y = h / 2 - d; }
      staff[k] = cx + x;
      staff[k + 1] = y;
      staff[k + 2] = 0.3 + (rnd() - 0.5) * 0.05;
    }

    // WORLD — a corridor of arches receding into fog, lanes of light on the floor, dust in the air
    const kind = rnd();
    if (kind < 0.6) {
      const arch = Math.floor(rnd() * 38), z = 2 - arch * 3.1, a = rnd() * Math.PI, R = 4.6 + (rnd() - 0.5) * 0.16;
      world[k] = Math.cos(a) * R;
      world[k + 1] = -2.4 + Math.sin(a) * R * 1.05;
      world[k + 2] = z + (rnd() - 0.5) * 0.22;
    } else if (kind < 0.83) {
      const lane = Math.floor(rnd() * 7);
      world[k] = -4.2 + lane * 1.4;
      world[k + 1] = -2.45;
      world[k + 2] = 4 - rnd() * 122;
    } else {
      world[k] = (rnd() * 2 - 1) * 4;
      world[k + 1] = -2.3 + rnd() * 6.6;
      world[k + 2] = 4 - rnd() * 122;
    }

    // CANVAS — the Iron Canvas diamond, echoed, waiting at the end of the corridor; stars behind
    if (rnd() < 0.12) {
      const sr = 34 + rnd() * 40, sth = rnd() * Math.PI * 2, sph = Math.acos(2 * rnd() - 1);
      canvas[k] = sr * Math.sin(sph) * Math.cos(sth);
      canvas[k + 1] = sr * Math.cos(sph) * 0.6;
      canvas[k + 2] = -150 + sr * Math.sin(sph) * Math.sin(sth) * 0.5;
    } else {
      const ring = Math.floor(Math.pow(rnd(), 1.7) * 4), s = 6.4 - ring * 1.35, t = rnd() * 4, side = Math.floor(t), u = t - side;
      const c = [[0, s], [s, 0], [0, -s], [-s, 0]];
      const [x0, y0] = c[side], [x1, y1] = c[(side + 1) % 4];
      canvas[k] = x0 + (x1 - x0) * u + (rnd() - 0.5) * 0.06;
      canvas[k + 1] = y0 + (y1 - y0) * u + (rnd() - 0.5) * 0.06;
      canvas[k + 2] = -140 - ring * 0.9 + (rnd() - 0.5) * 0.3;
    }
  }
  return { spark, field, staff, world, canvas, seed };
}

/* Simplex noise 3D — Ian McEwan, Ashima Arts / Stefan Gustavson (MIT). */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */ `
uniform float uPhase, uTime, uFlow, uSize, uPixelRatio, uHeat, uFog, uBreath;
attribute vec3 aSpark, aField, aStaff, aWorld, aCanvas;
attribute float aSeed;
varying float vAlpha;
varying float vHeat;
${NOISE}
vec3 formation(float i){
  if(i<0.5) return aSpark;
  if(i<1.5) return aField;
  if(i<2.5) return aStaff;
  if(i<3.5) return aWorld;
  return aCanvas;
}
void main(){
  float i=floor(uPhase);
  float f=clamp((uPhase-i)*1.45-aSeed*0.45,0.0,1.0);
  f=f*f*(3.0-2.0*f);
  vec3 p=mix(formation(i),formation(min(i+1.0,4.0)),f);
  float t=uTime*0.055;
  vec3 q=p*0.11+vec3(aSeed*3.0);
  vec3 flow=vec3(snoise(q+vec3(0.0,0.0,t)),snoise(q+vec3(31.4,0.0,t)),snoise(q+vec3(0.0,47.2,t)));
  p+=flow*(uFlow+0.04);
  p.y+=sin(uTime*0.55+aSeed*6.2831)*0.035*uBreath;
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*mv;
  float dist=max(-mv.z,0.35);
  float core=(1.0-smoothstep(0.0,2.2,length(aSpark)))*(1.0-clamp(uPhase,0.0,1.0));
  vHeat=clamp(uHeat*(0.55+0.45*aSeed)+core*1.2,0.0,1.6);
  gl_PointSize=uSize*(0.5+aSeed*0.95)*(1.0+core*0.7)*uPixelRatio*(16.0/dist);
  vAlpha=exp(-uFog*dist*dist)*(0.3+aSeed*0.6)*(1.0-core*0.78);
}`;

const FRAG = /* glsl */ `
uniform vec3 uGold, uEmber, uCream;
varying float vAlpha;
varying float vHeat;
void main(){
  float d=length(gl_PointCoord-0.5);
  float a=smoothstep(0.5,0.0,d); a*=a;
  vec3 col=mix(uGold,uEmber,clamp(vHeat*0.7,0.0,1.0));
  col=mix(col,uCream,smoothstep(0.45,1.4,vHeat)*0.75+(1.0-smoothstep(0.0,0.16,d))*0.3);
  gl_FragColor=vec4(col,a*vAlpha);
}`;

/** Camera pose and material state as a pure function of (act, progress). Endpoints match across acts. */
function stateFor(act, p, pos, look) {
  const s = { phase: 0, flow: 0.02, heat: 0.4, fog: 0.003, size: 1, breath: 1, bloom: 0.9 };
  switch (act) {
    case 'spark':
      pos.set(0, 0, 9 - 2 * smooth(0, 1, p)); look.set(0, 1.5, 0);
      Object.assign(s, { phase: 0, flow: 0.02, heat: 0.7 + p * 0.3, fog: 0.0016, size: 1 + p * 0.4, bloom: 0.5 + p * 0.2 });
      break;
    case 'feel': {
      const e = smooth(0, 1, p), a = e * 0.9, r = 7 + e * 7;
      pos.set(Math.sin(a) * r, 1.1 * Math.sin(p * Math.PI), Math.cos(a) * r); look.set(0, lerp(1.5, 0, e), lerp(0, -2, e));
      Object.assign(s, { phase: smooth(0.08, 0.7, p), flow: lerp(0.02, 1.35, smooth(0.1, 0.6, p)), heat: lerp(1.0, 0.42, smooth(0, 0.6, p)), fog: lerp(0.0016, 0.0032, e), size: lerp(1.4, 1.05, e), bloom: lerp(0.7, 0.6, e) });
      break;
    }
    case 'score': {
      const e = smooth(0, 1, p);
      pos.set(lerp(Math.sin(0.9) * 14, 0, e), lerp(0, 0.4, e), lerp(Math.cos(0.9) * 14, 17, e)); look.set(0, 0, lerp(-2, 0, e));
      Object.assign(s, { phase: 1 + smooth(0.05, 0.5, p), flow: lerp(1.35, 0.03, smooth(0.05, 0.5, p)), heat: 0.4, fog: 0.0024, size: 1.1, bloom: 0.62 });
      break;
    }
    case 'world': {
      const z = 17 - p * 121, x = Math.sin(p * Math.PI * 2) * 0.5, y = 0.4 - 0.2 * p + Math.sin(p * Math.PI * 3) * 0.15;
      pos.set(x, y, z); look.set(x * 0.5, y - 0.05, z - 12);
      Object.assign(s, { phase: 2 + smooth(0, 0.28, p), flow: lerp(0.03, 0.08, smooth(0, 0.3, p)), heat: 0.72, fog: 0.0007, size: 1.75, bloom: 0.85 });
      break;
    }
    case 'premiere': {
      const e = smooth(0, 1, p);
      pos.set(0, lerp(0.2, 0.5, e), lerp(-104, -121, e)); look.set(0, 0, lerp(-116, -140, e));
      Object.assign(s, { phase: 3 + smooth(0.08, 0.75, p), flow: 0.035, heat: lerp(0.72, 0.9, e), fog: lerp(0.0007, 0.0005, e), size: lerp(1.75, 1.45, e), bloom: lerp(0.85, 1.0, e) });
      break;
    }
  }
  return s;
}

/**
 * @returns world controller, or null when WebGL is unavailable (the page keeps its CSS fallback)
 */
export function createWorld(canvas, { reduced = false, seed = 5417 } = {}) {
  const qa = new URLSearchParams(location.search).has('qa'); // evidence harness: readable pixels + internals
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: qa });
  } catch (e) {
    return null;
  }
  const coarse = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 700;
  const count = coarse ? 14000 : 32000;
  const dprCap = coarse ? 1.5 : 1.75;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, dprCap));
  renderer.setClearColor(0x000000, 1); // the page's ink is a CSS screen-blend tint: through the composer, a
                                        // non-black clear color is sRGB-encoded twice (#0b0907 renders as ~#29231c)
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.96;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 400);

  const f = buildFormations(count, mulberry32(seed));
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(f.spark, 3));
  geo.setAttribute('aSpark', new THREE.BufferAttribute(f.spark, 3));
  geo.setAttribute('aField', new THREE.BufferAttribute(f.field, 3));
  geo.setAttribute('aStaff', new THREE.BufferAttribute(f.staff, 3));
  geo.setAttribute('aWorld', new THREE.BufferAttribute(f.world, 3));
  geo.setAttribute('aCanvas', new THREE.BufferAttribute(f.canvas, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(f.seed, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -60), 400);

  const uniforms = {
    uPhase: { value: 0 }, uTime: { value: 0 }, uFlow: { value: 0.02 }, uSize: { value: 1 },
    uPixelRatio: { value: renderer.getPixelRatio() }, uHeat: { value: 0.9 }, uFog: { value: 0.0016 }, uBreath: { value: reduced ? 0 : 1 },
    uGold: { value: new THREE.Color('#e0bb6e') }, uEmber: { value: new THREE.Color('#ff8a3d') }, uCream: { value: new THREE.Color('#fff4df') },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(geo, material));

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.55, 0.3, 0.26);
  if (!coarse) composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const targetPos = new THREE.Vector3(0, 0, 9), targetLook = new THREE.Vector3();
  const lookNow = new THREE.Vector3();
  const pointer = new THREE.Vector2();
  let state = stateFor('spark', 0, targetPos, targetLook);
  camera.position.copy(targetPos);
  lookNow.copy(targetLook);
  let raf = 0, running = false, last = performance.now(), frames = 0, slow = 0;

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    uniforms.uPixelRatio.value = renderer.getPixelRatio();
    if (!running) draw(0);
  }

  function apply(k) {
    uniforms.uPhase.value += (state.phase - uniforms.uPhase.value) * k;
    uniforms.uFlow.value += (state.flow - uniforms.uFlow.value) * k;
    uniforms.uHeat.value += (state.heat - uniforms.uHeat.value) * k;
    uniforms.uFog.value += (state.fog - uniforms.uFog.value) * k;
    uniforms.uSize.value += (state.size - uniforms.uSize.value) * k;
    bloom.strength += (state.bloom - bloom.strength) * k;
  }

  function draw(dt) {
    const k = running ? 1 - Math.pow(0.0009, dt) : 1;
    apply(k);
    const lean = running ? 1 : 0;
    camera.position.lerp(new THREE.Vector3(targetPos.x + pointer.x * 0.35 * lean, targetPos.y + pointer.y * 0.2 * lean, targetPos.z), k);
    lookNow.lerp(targetLook, k);
    camera.lookAt(lookNow);
    composer.render(dt);
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    uniforms.uTime.value += dt;
    draw(dt);
    frames++;
    if (dt > 1 / 28) slow++; // auto-demote: sustained sub-30fps drops the bloom pass
    if (frames === 180 && slow > 120 && composer.passes.includes(bloom)) composer.removePass(bloom);
  }

  const onPointer = (e) => { pointer.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)); };
  const onVisibility = () => (document.hidden ? stop() : start());
  addEventListener('resize', resize);
  if (!coarse && !reduced) addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop(); canvas.dispatchEvent(new CustomEvent('world:lost', { bubbles: true })); });

  function start() { if (reduced || running || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  resize();
  if (qa) window.__icWorld = { renderer, composer, bloom, uniforms, camera };

  return {
    count, coarse,
    get bloom() { return composer.passes.includes(bloom); },
    setAct(act, p) {
      state = stateFor(act, Math.min(1, Math.max(0, p)), targetPos, targetLook);
      if (!running) draw(0);
    },
    start, stop,
    dispose() {
      stop();
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      geo.dispose(); material.dispose(); composer.dispose(); renderer.dispose();
    },
  };
}
