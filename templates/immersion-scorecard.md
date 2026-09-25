# IMMERSION Scorecard

Project:
URL/path tested:
Date:
Reviewer:

Scoring: 1 = unacceptable, 3 = solid, 5 = flagship. Gate: average **≥ 4.0** and **zero automatic failures**.

## Axis Scores

- **Hero/signature material read:** _/5 — Does the immersive object/scene read as intentional, premium, and brand-native?
- **Depth / atmosphere:** _/5 — Is there clear layering, light, space, fog/particles/parallax where appropriate?
- **Motion discipline:** _/5 — Does motion feel controlled, purposeful, and not distracting?
- **Responsiveness / containment:** _/5 — Does desktop + mobile preserve the moment without overflow or clipping?
- **Evidence / degradation:** _/5 — Are fallback, reduced-motion, kill-switch, console, and screenshots verified?
- **Aliveness ★v6:** _/5 — Does it breathe; is there an arrival, a heartbeat, hand-feel? (Scored from the recordings — the first 5 seconds, the 15-second slow scroll, the reduced-motion recording — never from a still. Motion discipline stops the busy; this axis stops the dead. VERIFY Axis 7.)

**Average (six axes):** _/5

## Automatic Failure Checks

- Console/page errors: PASS / FAIL
- Desktop screenshot captured: PASS / FAIL
- Mobile screenshot captured: PASS / FAIL
- Mobile horizontal overflow: PASS / FAIL
- Reduced-motion static path: PASS / FAIL
- WebGL/static fallback or kill-switch: PASS / FAIL
- Config/tuning values documented: PASS / FAIL
- ★v6 Mounted-but-black canvas (frames drawn = 0, or lit-pixel ratio below threshold, at any station): PASS / FAIL
- ★v6 Nothing alive at rest (no animation running in view 3 s after load — Axis 7): PASS / FAIL
- ★v6 Two scroll owners in one viewport (Anti-Pattern #19 TWO CLOCKS — e.g. a WebGL camera reading `window.scrollY` beside a pinned GSAP section): PASS / FAIL

## Final Config Values

```txt
Paste key values here: material, bloom, fog, motion, density, kill switch path.
```

## Screenshots / Evidence Paths

```txt
- desktop:
- mobile:
- reduced-motion:
- tune/config:
- HTML report:
- ★v6 station screenshots (templates/scroll-capture.spec.ts — every act at 1440×900 and 390×844):
- ★v6 first-5-seconds video (arrival):
- ★v6 15-second slow scroll (heartbeat, recede-and-return):
- ★v6 reduced-motion recording (composed still):
```

## Remaining Risks

- 

## Decision

- [ ] PASS — IMMERSIVE gate cleared
- [ ] ITERATE — one or more axes below 4 or automatic failure present
- [ ] DOWNGRADE — immersive layer is not justified for this project (★v6 a downgrade lowers the depth tier; it never lowers the aliveness floor)
