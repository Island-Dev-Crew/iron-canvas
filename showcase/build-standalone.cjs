#!/usr/bin/env node
/* ===========================================================================
   Iron Canvas — build the no-build standalone showcase
   ---------------------------------------------------------------------------
   Regenerates showcase/index.html from showcase/iron-canvas-showcase.jsx so the
   repo's about/landing page runs as a plain static file (GitHub Pages, file://,
   any static host) with NO bundler and NO build step at view time.

   The JSX is the single source of truth. After editing the .jsx, run:

       npm i -D @babel/standalone     # one time
       node showcase/build-standalone.cjs

   Output index.html ships pre-transpiled plain JS + React UMD from cdnjs
   (no in-browser Babel), so it loads fast and stays in lockstep with the JSX.
   =========================================================================== */
const fs = require("fs");
const path = require("path");
const Babel = require("@babel/standalone");

const here = __dirname;
const src = fs.readFileSync(path.join(here, "iron-canvas-showcase.jsx"), "utf8");

// strip the bundler-only React import and the default export keyword
let jsx = src
  .replace(/import\s*\{[^}]*\}\s*from\s*["']react["'];?\s*/, "")
  .replace("export default function IronCanvasShowcase", "function IronCanvasShowcase");

const { code } = Babel.transform(jsx, { presets: ["react"], filename: "showcase.jsx" });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Iron Canvas — Island Development Crew</title>
<meta name="description" content="Iron Canvas — a multi-agent design orchestration system that studies a site before touching it, then enhances. Live, mode-reactive demonstration." />
<meta property="og:title" content="Iron Canvas" />
<meta property="og:description" content="Multi-agent design orchestration. Studies the site before touching it. Live demo — pick a mode." />
<style>
  *{box-sizing:border-box}
  html,body{margin:0;padding:0}
  body{background:oklch(0.16 0.015 50);min-height:100vh;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
  #root{min-height:100vh}
</style>
</head>
<body>
<div id="root"></div>
<noscript style="display:block;padding:48px;text-align:center;color:#d4af6a;font-family:system-ui,sans-serif">
  Iron Canvas — this live showcase needs JavaScript enabled.
</noscript>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script>
/* generated from showcase/iron-canvas-showcase.jsx — do not edit by hand; run showcase/build-standalone.cjs */
(function () {
  var React = window.React, ReactDOM = window.ReactDOM;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
${code}
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(IronCanvasShowcase));
})();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(here, "index.html"), html);
console.log("Wrote showcase/index.html (" + html.length + " bytes)");
