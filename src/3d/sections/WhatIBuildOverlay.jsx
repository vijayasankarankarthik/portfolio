/**
 * WhatIBuildOverlay.jsx — Backend engineering focus, no full-stack
 */
const CONCEPTS = [
  {
    tag: '01',
    title: 'REST APIs & service design',
    body: 'Layered architecture (Controller → Service → Repository), request routing, service boundaries, and clean separation of concerns.',
    node: 'API GATEWAY',
    color: '#00c8a0',
  },
  {
    tag: '02',
    title: 'Auth & access control',
    body: 'JWT-based stateless authentication and role-based authorization with Spring Security. Every route protected, every token validated.',
    node: 'AUTH SERVICE',
    color: '#00c8a0',
  },
  {
    tag: '03',
    title: 'Database & persistence',
    body: 'Relational schema design, query optimization, and the JPA/Hibernate ORM layer bridging Java objects and PostgreSQL/MySQL.',
    node: 'DATABASE',
    color: '#60a5fa',
  },
  {
    tag: '04',
    title: 'Caching & async processing',
    body: 'Keeping hot data close and offloading slow work to background workers — understanding the tradeoffs between consistency and latency.',
    node: 'CACHE / QUEUE',
    color: '#a78bfa',
  },
];

export default function WhatIBuildOverlay() {
  return (
    <div style={{ width: '390px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">What I build</p>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {CONCEPTS.map((c) => (
          <div key={c.tag} style={{ display: 'flex', gap: '14px' }}>
            <span className="overlay-tag">{c.tag}</span>
            <div>
              <p className="overlay-section-title">{c.title}</p>
              <p className="overlay-body" style={{ marginTop: '5px' }}>{c.body}</p>
              <span className="node-ref" style={{ color: c.color }}>→ {c.node}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
