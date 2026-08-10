/**
 * ProjectsOverlay.jsx — Accurate resume projects, backend-framed
 * Featured: User Service Backend (Java/Spring Boot)
 * Supporting: 8-bit Adder (hardware/systems — shows CS depth)
 */
import { useState } from 'react';

const FEATURED = {
  name: 'User Service Backend System',
  stack: 'Java · Spring Boot · MySQL · Spring Security · JWT',
  url: 'https://github.com/vijayasankarankarthik/userservice',
  architecture: ['CLIENT', '→ REST API', '→ JWT AUTH', '→ USER SERVICE', '→ MySQL'],
  stages: [
    {
      label: 'Problem',
      body: 'Needed a self-contained backend for user registration, login, and profile management with real authentication — not a mock.',
    },
    {
      label: 'Architecture',
      body: 'Layered: Controller → Service → Repository. JWT stateless auth via Spring Security, MySQL for storage with indexed lookups.',
    },
    {
      label: 'Engineering decisions',
      body: 'JWT keeps the service stateless — no session store needed. CSV bulk-upload endpoint added for batch user creation. All endpoints documented with Swagger and tested with Postman.',
    },
    {
      label: 'Result',
      body: 'A clean, testable user service with authenticated CRUD flows and optimized MySQL queries — the backend I use as the base for anything bigger.',
    },
  ],
};

const OTHER = [
  {
    name: '8-bit Approximate Parallel Prefix Adder Analysis',
    stack: 'Verilog · MATLAB',
    url: 'https://github.com/vijayasankarankarthik/Approximate_parallel_prefix_adders',
    desc: 'Designed Kogge-Stone and Ladner-Fischer 8-bit adder architectures in Verilog. Compared exact vs. approximate variants using MATLAB-generated test vectors and error metrics — an exercise in performance/accuracy tradeoffs.',
  },
];

export default function ProjectsOverlay() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ width: '410px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Projects</p>

      {/* Featured project */}
      <div
        className="project-card"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer', marginTop: '16px' }}
        role="button"
        aria-expanded={expanded}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <p className="overlay-section-title">{FEATURED.name}</p>
            <p className="overlay-stack-line">{FEATURED.stack}</p>
          </div>
          <span
            className="project-arrow"
            style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
          >
            →
          </span>
        </div>

        {/* Architecture trace */}
        <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {FEATURED.architecture.map((step, i) => (
            <span key={i} className="arch-step">{step}</span>
          ))}
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(28,38,33,0.8)' }}>
            {FEATURED.stages.map((s) => (
              <div key={s.label} style={{ marginBottom: '14px' }}>
                <p className="overlay-eyebrow" style={{ marginBottom: '5px' }}>{s.label}</p>
                <p className="overlay-body">{s.body}</p>
              </div>
            ))}
            <a
              href={FEATURED.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onClick={(e) => e.stopPropagation()}
            >
              View on GitHub ↗
            </a>
          </div>
        )}
      </div>

      {/* Supporting projects */}
      {OTHER.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card project-card-sm"
          style={{ display: 'block', marginTop: '12px', textDecoration: 'none' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p className="overlay-section-title" style={{ flex: 1, paddingRight: '12px' }}>{p.name}</p>
            <span className="project-arrow">↗</span>
          </div>
          <p className="overlay-stack-line">{p.stack}</p>
          <p className="overlay-body" style={{ marginTop: '8px' }}>{p.desc}</p>
        </a>
      ))}
    </div>
  );
}
