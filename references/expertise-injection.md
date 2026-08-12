# Expertise Injection Protocol

> **Origin:** Inspired by the Antigravity multi-agent workflow (Prompt 7 pattern).
>
> Before any specialized agent begins work that involves a specific API, library,
> or technical domain — inject domain expertise directly into their context.
>
> This transforms a general-purpose agent into a specialist for that session.
> The same agent that wouldn't know Murf Falcon's PCM chunk format becomes
> an expert after injection. Same principle applies to GSAP, Three.js,
> Nano Banana Pro, Leonardo Blueprints, and any other specialized tool.

---

## How to Use

Add the relevant injection block to the beginning or end of the agent's task prompt, before they start executing:

```
[AGENT TASK PROMPT]
---
[PASTE EXPERTISE INJECTION BLOCK HERE]
---
All future code in this session must follow these specifications exactly.
```

---

## GSAP 3 + ScrollTrigger (for Agent-B)

```markdown
You are now an expert in GSAP 3 + ScrollTrigger + Lenis + SplitText.

Critical implementation constraints:
• Lenis-GSAP sync required: gsap.ticker.add((time) => lenis.raf(time * 1000))
• gsap.ticker.lagSmoothing(0) required alongside Lenis sync
• ScrollTrigger.refresh() after dynamic content loads (images, fonts)
• SplitText: store split instance → revert() on window resize
• Flip: Flip.getState() BEFORE DOM change → Flip.from(state) AFTER
• will-change: set to 'transform' immediately before tween
• clearProps: 'will-change' in onComplete callback (always clean up)
• NEVER animate top/left/width/height/margin/padding (causes layout recalc)
• ALWAYS animate transform (translate/scale/rotate) and opacity (GPU composited)
• scrub: true or scrub: 0.5 for smooth scroll-linked animations
• pin: true requires anticipatePin: 1 for smoother behavior
• invalidateOnRefresh: true for scroll sequences with dynamic sizing

Easing reference:
• power1-4.out → smooth deceleration (higher = more dramatic)
• elastic.out(1, 0.3) → spring bounce at end
• back.out(1.7) → slight overshoot
• expo.out → very fast start, smooth stop (editorial)
• none → linear (for scrub-linked animations)
```

---

## Three.js r128 + GSAP Integration (for Agent-B)

```markdown
You are now an expert in Three.js r128 + GSAP ScrollTrigger integration.

Critical constraints:
• setPixelRatio: Math.min(window.devicePixelRatio, 2) — ALWAYS cap at 2x
• Memory cleanup required on unmount:
    renderer.dispose()
    scene.traverse(obj => { obj.geometry?.dispose(); obj.material?.dispose(); })
• WEBGL_lose_context.loseContext() for hot reload cleanup in development
• powerPreference: 'high-performance' in WebGLRenderer constructor options
• OrbitControls: NOT included in Three.js r128 CDN — import from separate source
• Camera animation via GSAP: gsap.to(camera.position, {...}) not direct assignment
• Resize handler required: renderer.setSize() + camera.aspect update + updateProjectionMatrix()
• requestAnimationFrame loop: use renderer's built-in or tie to GSAP ticker
• DO NOT use Three.js r142+ geometry types (CapsuleGeometry, etc.) — not in r128
• Fog: new THREE.FogExp2(color, density) for atmospheric depth
• Post-processing: requires separate postprocessing library import
```

---

## Nano Banana Pro / Gemini 3 Pro Image (for Agent-D)

```markdown
You are now an expert in Nano Banana Pro (Gemini 3 Pro Image Generation).

CLI syntax:
  generate-image \
    --prompt "[full context-aware prompt]" \
    --filename "output.png" \
    --resolution [1K|2K|4K] \
    --aspect-ratio [1:1|2:3|3:2|3:4|4:3|4:5|5:4|9:16|16:9|21:9]

For image editing:
  generate-image \
    --prompt "[modification instructions]" \
    --filename "output-v2.png" \
    -i existing-image.png \
    --resolution 2K

Best practices from production experience:
• Include exact hex codes from DNA profile (e.g., "#0a0e14 background (#c9a84c accent)")
• Describe lighting direction and temperature explicitly
• Include CSS usage context ("displayed at 1128×375px with dark left-to-right gradient overlay")
• Include negative constraints ALWAYS ("no cold blue, no purple, no flat illustration, no watermarks")
• 2K for hero/featured, 1K for thumbnails/secondary, 4K for close-up product detail
• Generate 4 variants, review all before selecting
• Convert final selections to WebP: cwebp -q 80 input.png -o output.webp
```

---

## Leonardo AI Blueprints (for Agent-D)

```markdown
You are now an expert in Leonardo AI Blueprints.

Access: app.leonardo.ai → Blueprints section

Available blueprints and Iron Canvas use cases:
  Product Studio Photoshoot → Multiple consistent studio angles from one product photo
  Product In Scene → Lifestyle placement (vanity, shelf, hands, outdoor)
  Product Spin Video → 360° rotation → extract with:
    ffmpeg -i spin.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%04d.webp
    ffmpeg -i spin.mp4 -vf "fps=15,scale=960:540" frames-mobile/frame_%04d.webp
  Style Transfer → Apply site's visual identity (use site screenshot as style ref)
  Custom Relight → CRITICAL for sequence consistency — same lighting across all frames
  Background Change → Match artifacts to their specific section backgrounds
  Instant Outpaint → Expand images to fill wider containers

API pattern:
  POST https://cloud.leonardo.ai/api/rest/v1/blueprints/{blueprintId}/run
  { "nodeInputs": { "imageUrl": "https://...", "prompt": "..." } }

  GET https://cloud.leonardo.ai/api/rest/v1/generations/{generationId}

Scroll sequence best practices:
  1. Generate keyframes with Product Studio Photoshoot (8-12 distinct moments)
  2. Apply Custom Relight to ALL frames for lighting consistency
  3. Use Style Transfer against the site's north-star screenshot for palette consistency
  4. Extract from Product Spin Video if 360° rotation is needed
  5. Test 10 frames with scroll engine before generating full set
```

---

## Lenis Smooth Scroll (for Agent-B)

```markdown
You are now an expert in Lenis smooth scroll.

Installation: npm install @studio-freight/lenis

Initialization:
  import Lenis from '@studio-freight/lenis';
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2
  });

GSAP sync (required):
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

ScrollTrigger sync (required):
  lenis.on('scroll', ScrollTrigger.update);

Stopping Lenis (modals, overlays):
  lenis.stop() // pause scroll
  lenis.start() // resume scroll

Programmatic scroll:
  lenis.scrollTo('#section', { offset: -80, duration: 1.2 })

Horizontal scroll:
  direction: 'horizontal' + wrapper: document.querySelector('.horizontal-wrapper')
```

---

## Barba.js Page Transitions (for Agent-B)

```markdown
You are now an expert in Barba.js v2 page transitions + GSAP integration.

Installation: npm install @barba/core

Critical requirements:
• Multi-page sites only (not React/Next.js SPA)
• Add data-barba="wrapper" to the outer wrapper
• Add data-barba-namespace to each page's root element for namespace transitions
• Prevent links: barba.init({ prevent: ({ el }) => el.classList.contains('no-barba') })
• Always call runLoadSequence() in enter() callback to re-initialize animations
• Always call lenis.destroy() in leave(), reinit in enter()
• ScrollTrigger.getAll().forEach(t => t.kill()) in leave() callback
• GSAP context: use gsap.context() scoped to data.next.container

Iron Curtain transition (Iron Canvas signature):
  leave: scaleY 0→1 from bottom, transformOrigin 'bottom center', ease power3.inOut
  enter: scaleY 1→0 from top, transformOrigin 'top center', ease power3.inOut
```

---

## AudioContext / Web Audio API (for Agent-B, TTS features)

```markdown
You are now an expert in Web Audio API + WebSocket TTS streaming.

Critical browser constraints:
• AudioContext requires user gesture to start — ALWAYS call audioCtx.resume() inside
  a click/touch event handler. Autoplay restrictions apply to all audio.
• HTTPS required for WebSocket connections in production (wss:// not ws://)
• AudioContext is suspended on page load — must resume before scheduling audio

PCM audio scheduling pattern:
  function scheduleAudioChunk(base64Chunk) {
    const binary = atob(base64Chunk);
    const int16 = new Int16Array(binary.length / 2);
    for (let i = 0; i < int16.length; i++) {
      int16[i] = (binary.charCodeAt(i*2)) | (binary.charCodeAt(i*2+1) << 8);
    }
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768.0;
    }
    const buffer = audioCtx.createBuffer(1, float32.length, sampleRate);
    buffer.getChannelData(0).set(float32);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(nextPlayTime);
    nextPlayTime = Math.max(nextPlayTime, audioCtx.currentTime) + buffer.duration;
  }

WebSocket pattern for scroll-triggered narration:
  1. Pre-connect WebSocket on page load (don't wait for scroll trigger)
  2. At scroll trigger: send text to WS → start receiving PCM chunks
  3. Schedule chunks as they arrive using nextPlayTime for gapless playback
  4. Lead time: fire WS send 200-300ms before scroll trigger fires visually
```

---

*← [SKILL.md](../SKILL.md)*
