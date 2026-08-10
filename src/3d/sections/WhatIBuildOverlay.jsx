/**
 * WhatIBuildOverlay.jsx
 * What I build — system concepts section
 */
const CONCEPTS = [
  {
    tag: '01',
    title: 'APIs & services',
    body: 'Request handling, routing, and the boundaries between services that decide what talks to what.',
    node: 'API GATEWAY',
  },
  {
    tag: '02',
    title: 'Auth & access control',
    body: 'Who\'s allowed to do what — token-based authentication and role-based authorization on protected routes.',
    node: 'AUTH SERVICE',
  },
  {
    tag: '03',
    title: 'Data & persistence',
    body: 'Relational schema design, query performance, and the ORM layer that sits between code and the database.',
    node: 'DATABASE',
  },
  {
    tag: '04',
    title: 'Caching & messaging',
    body: 'Keeping hot data close and letting slow work happen asynchronously instead of blocking a request.',
    node: 'CACHE / QUEUE',
  },
];

export default function WhatIBuildOverlay() {
  return (
    <div style={{ width: '380px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">What I build</p>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {CONCEPTS.map((c) => (
          <div key={c.tag} style={{ display: 'flex', gap: '14px' }}>
            <span className="overlay-tag">{c.tag}</span>
            <div>
              <p className="overlay-section-title">{c.title}</p>
              <p className="overlay-body" style={{ marginTop: '4px' }}>{c.body}</p>
              <span className="node-ref">→ {c.node}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
