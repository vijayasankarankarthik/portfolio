# Vijaya Sankaran Karthik — Portfolio

A single-page backend engineering portfolio built around a "request trace"
concept: the page reads like a request moving through a layered
architecture (Intake → System → Service → Auth → Repository → Direction →
Response), with animated SVG system diagrams standing in for the actual
architecture rather than decorative 3D.

Positioning: backend engineer with a stated interest in distributed
systems, system design, and scalable backend architecture — not a
full-stack or frontend portfolio. React appears only as a supporting tool.

Built with React + Vite + Tailwind CSS + Framer Motion. No backend of its
own — static site, deploys anywhere. SVG-based animation (not WebGL/Three.js)
was a deliberate choice: instant load, no GPU dependency, and clean
`prefers-reduced-motion` support on every device, including the ones a
recruiter opens this on.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

**Option A — CLI**

```bash
npm install -g vercel
vercel
```

**Option B — Git**

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite. Build command: `npm run build`. Output dir: `dist`.
4. Deploy.

## Content notes

All experience, project, and education content is drawn directly from the
resume (Bonbloc Technologies internship, BSNL industrial training, User
Service Backend System, the approximate-adder Verilog project, and SASTRA
education). Nothing is fabricated. Academic marks (CGPA, school percentages)
are intentionally left out — the site leads with engineering evidence
instead. Swap in a real contact email/phone in `src/components/Response.jsx`
and `src/components/Nav.jsx` when ready (currently only LinkedIn/GitHub
links are used).

Distributed-systems content is deliberately split into "what I've built"
vs. "what I'm exploring" in `Direction.jsx` — the site does not claim
production distributed-systems experience.

## Structure

```
src/
  components/
    Nav.jsx           — top navigation
    TraceLine.jsx      — animated scroll-progress spine (desktop only)
    Hero.jsx           — identity + boot sequence + mini system diagram
    WhatIBuild.jsx      — backend concepts + full system diagram (System layer)
    Experience.jsx      — Service layer
    Skills.jsx          — Auth layer
    Projects.jsx         — Repository layer, case-study format
    Direction.jsx        — built vs. exploring (distributed systems)
    Response.jsx          — Education + contact
    SystemDiagram.jsx      — reusable animated SVG architecture diagram
    diagramGraphs.js        — node/edge data for each diagram instance
    Footer.jsx
  App.jsx
  index.css
```
