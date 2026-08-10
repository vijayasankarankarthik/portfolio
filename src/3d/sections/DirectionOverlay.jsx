/**
 * DirectionOverlay.jsx — Backend engineering direction
 * Honest split: built vs. actively studying
 */
const BUILT = [
  'REST APIs with Spring Boot (Controller → Service → Repository)',
  'JWT-based stateless auth + Spring Security RBAC on protected routes',
  'Relational schema design with PostgreSQL / MySQL and JPA-Hibernate',
  'API documentation (Swagger/OpenAPI) and systematic endpoint testing',
  'Version-controlled backend projects with Git and GitHub',
];

const EXPLORING = [
  'Distributed systems — consistency, availability, partition tolerance',
  'Caching strategies and cache invalidation patterns',
  'Message queues and event-driven / async architecture',
  'Service-to-service communication and observability',
  'Concurrency, database transactions, and fault tolerance',
  'Container orchestration basics (Docker → Kubernetes direction)',
];

export default function DirectionOverlay() {
  return (
    <div style={{ width: '390px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Where I'm heading</p>
      <p className="overlay-body" style={{ marginTop: '10px', marginBottom: '18px' }}>
        Early in my backend career and deliberately building toward distributed systems.
        One list is work I've actually shipped; the other is what I'm actively studying.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="direction-card direction-card-built">
          <p className="direction-label direction-label-built">
            <span className="direction-dot direction-dot-built" /> Built
          </p>
          <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0 }}>
            {BUILT.map((item, i) => (
              <li key={i} className="direction-item">{item}</li>
            ))}
          </ul>
        </div>
        <div className="direction-card direction-card-exploring">
          <p className="direction-label direction-label-exploring">
            <span className="direction-dot direction-dot-exploring" /> Exploring
          </p>
          <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0 }}>
            {EXPLORING.map((item, i) => (
              <li key={i} className="direction-item">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
