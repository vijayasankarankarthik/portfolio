/**
 * ProjectsOverlay.jsx
 * Projects section — shown near the data layer
 */
import { useState } from 'react';

const FEATURED = {
  name: 'User Service Backend System',
  stack: 'Java · Spring Boot · MySQL · Spring Security · JWT',
  url: 'https://github.com/vijayasankarankarthik/userservice',
  architecture: ['CLIENT', '→ REST API', '→ AUTH', '→ USER SERVICE', '→ CACHE / MySQL'],
  stages: [
    { label: 'Problem', body: 'Needed a self-contained backend for user registration, login, and profile management, with real authentication rather than a mocked one.' },
    { label: 'Architecture', body: 'Layered: Controller → Service → Repository. JWT stateless auth, Spring Security RBAC, MySQL storage with optimized lookups.' },
    { label: 'Engineering decisions', body: 'JWT for stateless auth so the service holds no session state; CSV bulk-upload path for batch user creation; every endpoint tested through Postman.' },
    { label: 'Result', body: 'A working, testable user service with authenticated CRUD flows — the backend I reach for as the base of anything bigger.' },
  ],
};

const OTHER = [
  {
    name: '8-bit Approximate Parallel Prefix Adder Analysis',
    stack: 'Verilog · MATLAB',
    url: 'https://github.com/vijayasankarankarthik/Approximate_parallel_prefix_adders',
    desc: 'Designed Kogge-Stone and Ladner-Fischer 8-bit adder architectures in Verilog, comparing exact vs. approximate variants with MATLAB-generated test vectors and error metrics.',
  },
];

export default function ProjectsOverlay() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ width: '400px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Projects</p>

      {/* Featured project */}
      <div
        className="project-card"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer', marginTop: '16px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="overlay-section-title">{FEATURED.name}</p>
            <p className="overlay-stack-line">{FEATURED.stack}</p>
          </div>
          <span className="project-arrow" style={{ transform: expanded ? 'rotate(90deg)' : 'none' }}>→</span>
        </div>

        {/* Architecture trace */}
        <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {FEATURED.architecture.map((step, i) => (
            <span key={i} className="arch-step">{step}</span>
          ))}
        </div>

        {/* Expanded detail */}
        {expanded && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1c2621' }}>
            {FEATURED.stages.map((s) => (
              <div key={s.label} style={{ marginBottom: '12px' }}>
                <p className="overlay-eyebrow" style={{ marginBottom: '4px' }}>{s.label}</p>
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
              GitHub ↗
            </a>
          </div>
        )}
      </div>

      {/* Other projects */}
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
            <p className="overlay-section-title">{p.name}</p>
            <span className="project-arrow">↗</span>
          </div>
          <p className="overlay-stack-line">{p.stack}</p>
          <p className="overlay-body" style={{ marginTop: '8px' }}>{p.desc}</p>
        </a>
      ))}
    </div>
  );
}
