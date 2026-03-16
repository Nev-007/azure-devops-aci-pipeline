const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DevOps Pipeline — ACI Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0f;
      --surface: #12121a;
      --border: rgba(255,255,255,0.07);
      --accent: #00e5ff;
      --accent2: #7b61ff;
      --text: #e8e8f0;
      --muted: #5a5a72;
      --success: #00ffaa;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Grid background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
      z-index: 0;
    }

    /* Glows */
    .glow-1 {
      position: fixed;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);
      top: -200px; left: -100px;
      pointer-events: none; z-index: 0;
      animation: drift1 12s ease-in-out infinite alternate;
    }
    .glow-2 {
      position: fixed;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%);
      bottom: -100px; right: -100px;
      pointer-events: none; z-index: 0;
      animation: drift2 10s ease-in-out infinite alternate;
    }
    @keyframes drift1 { to { transform: translate(60px, 80px); } }
    @keyframes drift2 { to { transform: translate(-40px, -60px); } }

    main {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* NAV */
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28px 0;
      border-bottom: 1px solid var(--border);
      position: relative; z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding-left: 24px; padding-right: 24px;
      animation: fadeDown 0.6s ease both;
    }
    .nav-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.1em;
      color: var(--accent);
      text-transform: uppercase;
    }
    .nav-badge {
      font-size: 0.7rem;
      padding: 4px 10px;
      border: 1px solid var(--accent);
      color: var(--accent);
      border-radius: 100px;
      letter-spacing: 0.1em;
    }
    .nav-badge::before { content: '● '; color: var(--success); }

    /* HERO */
    .hero {
      padding: 100px 0 80px;
      animation: fadeUp 0.8s ease 0.1s both;
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.72rem;
      color: var(--muted);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 28px;
    }
    .hero-tag span {
      display: inline-block;
      width: 28px; height: 1px;
      background: var(--muted);
    }
    h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(2.8rem, 6vw, 4.5rem);
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin-bottom: 28px;
    }
    h1 .line-accent {
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-desc {
      font-size: 0.95rem;
      color: var(--muted);
      line-height: 1.8;
      max-width: 520px;
      margin-bottom: 48px;
    }

    /* TERMINAL CARD */
    .terminal {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 64px;
      animation: fadeUp 0.8s ease 0.3s both;
    }
    .terminal-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 12px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid var(--border);
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-r { background: #ff5f56; }
    .dot-y { background: #ffbd2e; }
    .dot-g { background: #27c93f; }
    .terminal-title {
      font-size: 0.7rem;
      color: var(--muted);
      margin-left: auto;
      margin-right: auto;
      letter-spacing: 0.05em;
    }
    .terminal-body {
      padding: 20px 24px;
      font-size: 0.82rem;
      line-height: 2;
    }
    .t-muted  { color: var(--muted); }
    .t-accent { color: var(--accent); }
    .t-green  { color: var(--success); }
    .t-purple { color: var(--accent2); }
    .t-white  { color: #fff; }
    .blink {
      display: inline-block;
      width: 8px; height: 14px;
      background: var(--accent);
      margin-left: 4px;
      vertical-align: middle;
      animation: blink 1s step-end infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }

    /* PIPELINE STEPS */
    .pipeline {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 64px;
      animation: fadeUp 0.8s ease 0.4s both;
    }
    .step {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      position: relative;
      transition: border-color 0.2s, transform 0.2s;
    }
    .step:hover {
      border-color: var(--accent);
      transform: translateY(-3px);
    }
    .step-num {
      font-size: 0.65rem;
      color: var(--muted);
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }
    .step-icon {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
    .step-title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 6px;
      color: #fff;
    }
    .step-desc {
      font-size: 0.72rem;
      color: var(--muted);
      line-height: 1.6;
    }
    .step-status {
      position: absolute;
      top: 16px; right: 16px;
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 6px var(--success);
    }

    /* TECH BADGES */
    .tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 80px;
      animation: fadeUp 0.8s ease 0.5s both;
    }
    .badge {
      font-size: 0.72rem;
      padding: 6px 14px;
      border: 1px solid var(--border);
      border-radius: 100px;
      color: var(--muted);
      transition: all 0.2s;
      letter-spacing: 0.05em;
    }
    .badge:hover {
      color: var(--accent);
      border-color: var(--accent);
    }

    /* FOOTER */
    footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.72rem;
      color: var(--muted);
      animation: fadeUp 0.8s ease 0.6s both;
    }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>

  <nav>
    <div class="nav-logo">ACI//DEMO</div>
    <div class="nav-badge">Pipeline Active</div>
  </nav>

  <main>
    <section class="hero">
      <div class="hero-tag"><span></span>DevOps Demo Project</div>
      <h1>
        Docker &amp; Azure<br>
        <span class="line-accent">Container Instances</span>
      </h1>
      <p class="hero-desc">
        A containerised Node.js application deployed via an automated Azure DevOps pipeline —
        from source code to live ACI in a single push.
      </p>
    </section>

    <div class="terminal">
      <div class="terminal-bar">
        <div class="dot dot-r"></div>
        <div class="dot dot-y"></div>
        <div class="dot dot-g"></div>
        <div class="terminal-title">azure-pipelines — deploy log</div>
      </div>
      <div class="terminal-body">
        <div><span class="t-muted">$</span> <span class="t-accent">git push</span> <span class="t-white">origin main</span></div>
        <div><span class="t-muted">→ Trigger:</span> <span class="t-green">Azure DevOps pipeline started</span></div>
        <div><span class="t-muted">→ Stage 1:</span> <span class="t-purple">Building Docker image...</span></div>
        <div><span class="t-muted">→ Stage 1:</span> <span class="t-green">✓ Image pushed to ACR</span></div>
        <div><span class="t-muted">→ Stage 2:</span> <span class="t-purple">Deploying to Azure Container Instance...</span></div>
        <div><span class="t-muted">→ Stage 2:</span> <span class="t-green">✓ Container running on port 3000</span></div>
        <div><span class="t-muted">→ Status:</span> <span class="t-green">LIVE</span> <span class="blink"></span></div>
      </div>
    </div>

    <div class="pipeline">
      <div class="step">
        <div class="step-status"></div>
        <div class="step-num">01 / SOURCE</div>
        <div class="step-icon">⬡</div>
        <div class="step-title">Code Push</div>
        <div class="step-desc">Push to main triggers the pipeline automatically via webhook.</div>
      </div>
      <div class="step">
        <div class="step-status"></div>
        <div class="step-num">02 / BUILD</div>
        <div class="step-icon">⬡</div>
        <div class="step-title">Docker Build</div>
        <div class="step-desc">Image built from Dockerfile and pushed to Azure Container Registry.</div>
      </div>
      <div class="step">
        <div class="step-status"></div>
        <div class="step-num">03 / DEPLOY</div>
        <div class="step-icon">⬡</div>
        <div class="step-title">ACI Deploy</div>
        <div class="step-desc">Azure CLI provisions the container instance from the registry image.</div>
      </div>
      <div class="step">
        <div class="step-status"></div>
        <div class="step-num">04 / SERVE</div>
        <div class="step-icon">⬡</div>
        <div class="step-title">Live on Port 3000</div>
        <div class="step-desc">Container exposes port 3000 with a public DNS label on Azure.</div>
      </div>
    </div>

    <div class="tech-row">
      <span class="badge">Node.js 18</span>
      <span class="badge">Express 4</span>
      <span class="badge">Docker / Alpine</span>
      <span class="badge">Azure Container Registry</span>
      <span class="badge">Azure Container Instances</span>
      <span class="badge">Azure DevOps Pipelines</span>
      <span class="badge">Azure CLI</span>
    </div>

    <footer>
      <span>devops-aci-demo &mdash; learning project</span>
      <span>Node ${process.version} &nbsp;|&nbsp; port ${PORT}</span>
    </footer>
  </main>
</body>
</html>`)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
