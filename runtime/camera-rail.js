// Iron Canvas · Camera Rail — the site's camera plays exactly the move the film was rendered from.
//
//   import { loadRail } from './camera-rail.js';
//   const rail = await loadRail('/rails/hero.camera-rail.json');          // written by the Blender clay-camera job
//   show.on('progress', (act, p) => act === 'world' && rail.apply(camera, p));  // one clock: the score's progress
//
// A baked rail (schema ic-camera-rail/2) carries one sample per rendered frame — position, quaternion and
// vertical fov in three.js space — evaluated from Blender's own F-curves. Playing those samples back means
// the web camera cannot drift from the clay film that Seedance used as its camera reference.
// A stations-only rail (no samples yet) is approximated: eased segments, look-at aim, roll. Bake to be exact.
// No dependencies: `apply` only needs a camera with position.set, quaternion.set, fov, updateProjectionMatrix.

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

export function slerp(a, b, t) {
  let [ax, ay, az, aw] = a;
  let [bx, by, bz, bw] = b;
  let cos = ax * bx + ay * by + az * bz + aw * bw;
  if (cos < 0) { cos = -cos; bx = -bx; by = -by; bz = -bz; bw = -bw; }   // take the short way round
  if (cos > 0.9995) {                                                        // nearly equal: lerp, then normalize
    const q = [lerp(ax, bx, t), lerp(ay, by, t), lerp(az, bz, t), lerp(aw, bw, t)];
    const n = Math.hypot(...q);
    return q.map((v) => v / n);
  }
  const theta = Math.acos(cos);
  const s = Math.sin(theta);
  const wa = Math.sin((1 - t) * theta) / s;
  const wb = Math.sin(t * theta) / s;
  return [ax * wa + bx * wb, ay * wa + by * wb, az * wa + bz * wb, aw * wa + bw * wb];
}

/** Quaternion [x, y, z, w] for a three.js camera at `eye` looking at `target` (up +Y), rolled `rollDeg` about its view axis. */
export function lookAtQuaternion(eye, target, rollDeg = 0) {
  let zx = eye[0] - target[0], zy = eye[1] - target[1], zz = eye[2] - target[2];   // camera looks down -Z
  let n = Math.hypot(zx, zy, zz) || 1; zx /= n; zy /= n; zz /= n;
  let xx = zz, xy = 0, xz = -zx;                                                    // x = up × z, with up = +Y
  n = Math.hypot(xx, xy, xz);
  if (n < 1e-6) { xx = 1; xy = 0; xz = 0; n = 1; }                                  // looking straight up/down
  xx /= n; xy /= n; xz /= n;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;    // y = z × x
  const m00 = xx, m01 = yx, m02 = zx, m10 = xy, m11 = yy, m12 = zy, m20 = xz, m21 = yz, m22 = zz;
  const tr = m00 + m11 + m22;
  let q;
  if (tr > 0) { const s = 0.5 / Math.sqrt(tr + 1); q = [(m21 - m12) * s, (m02 - m20) * s, (m10 - m01) * s, 0.25 / s]; }
  else if (m00 > m11 && m00 > m22) { const s = 2 * Math.sqrt(1 + m00 - m11 - m22); q = [0.25 * s, (m01 + m10) / s, (m02 + m20) / s, (m21 - m12) / s]; }
  else if (m11 > m22) { const s = 2 * Math.sqrt(1 + m11 - m00 - m22); q = [(m01 + m10) / s, 0.25 * s, (m12 + m21) / s, (m02 - m20) / s]; }
  else { const s = 2 * Math.sqrt(1 + m22 - m00 - m11); q = [(m02 + m20) / s, (m12 + m21) / s, 0.25 * s, (m10 - m01) / s]; }
  if (!rollDeg) return q;
  const h = (rollDeg * Math.PI) / 360;                                               // local roll about +Z
  const r = [0, 0, Math.sin(h), Math.cos(h)];
  return [
    q[3] * r[0] + q[0] * r[3] + q[1] * r[2] - q[2] * r[1],
    q[3] * r[1] - q[0] * r[2] + q[1] * r[3] + q[2] * r[0],
    q[3] * r[2] + q[0] * r[1] - q[1] * r[0] + q[2] * r[3],
    q[3] * r[3] - q[0] * r[0] - q[1] * r[1] - q[2] * r[2],
  ];
}

export function createRail(rail) {
  const samples = Array.isArray(rail?.samples) && rail.samples.length >= 2 ? rail.samples : null;
  const stations = [...(rail?.stations || [])].sort((a, b) => (a.t ?? 0) - (b.t ?? 0));
  if (!samples && stations.length < 2) throw new Error('camera rail: needs baked samples or at least 2 stations');

  function fromSamples(p) {
    const x = clamp01(p) * (samples.length - 1);
    const i = Math.min(Math.floor(x), samples.length - 2);
    const t = x - i;
    const a = samples[i], b = samples[i + 1];
    return {
      position: [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)],
      quaternion: slerp(a.slice(3, 7), b.slice(3, 7), t),
      fov: lerp(a[7], b[7], t),
    };
  }

  function fromStations(p) {
    p = clamp01(p);
    let k = stations.findIndex((s) => (s.t ?? 0) > p) - 1;
    if (k < 0) k = p <= (stations[0].t ?? 0) ? 0 : stations.length - 2;
    const a = stations[k], b = stations[k + 1];
    const span = (b.t ?? 1) - (a.t ?? 0) || 1;
    const raw = clamp01((p - (a.t ?? 0)) / span);
    const ease = (a.ease || 'bezier').toLowerCase();
    const t = ease === 'linear' ? raw : ease === 'constant' ? 0 : smooth(raw);
    const eye = [0, 1, 2].map((j) => lerp(a.position[j], b.position[j], t));
    const tgt = [0, 1, 2].map((j) => lerp((a.target || [0, 0, 0])[j], (b.target || [0, 0, 0])[j], t));
    return {
      position: eye,
      quaternion: lookAtQuaternion(eye, tgt, lerp(a.roll || 0, b.roll || 0, t)),
      fov: lerp(a.fov ?? 40, b.fov ?? 40, t),
    };
  }

  const sampleAt = samples ? fromSamples : fromStations;
  return {
    baked: Boolean(samples),
    frames: samples ? samples.length : null,
    sampleAt,
    apply(camera, p) {
      const s = sampleAt(p);
      camera.position.set(s.position[0], s.position[1], s.position[2]);
      camera.quaternion.set(s.quaternion[0], s.quaternion[1], s.quaternion[2], s.quaternion[3]);
      if (Math.abs(camera.fov - s.fov) > 1e-4) { camera.fov = s.fov; camera.updateProjectionMatrix(); }
      return s;
    },
  };
}

export async function loadRail(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`camera rail: ${res.status} ${url}`);
  return createRail(await res.json());
}
