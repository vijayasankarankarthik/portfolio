/**
 * DirectionOverlay.jsx
 * Where I'm heading — what's built vs what's explored
 */
const BUILT = [
  'Layered backend services (Controller → Service → Repository) in Spring Boot',
  'JWT-based authentication and role-based authorization with Spring Security',
  'Relational data models with PostgreSQL / MySQL and JPA-Hibernate',
  'Documented, tested REST APIs — Swagger/OpenAPI, Postman',
];

const EXPLORING = [
  'Distributed systems & system design fundamentals',
  'Caching strategies and cache invalidation',
  'Message queues and event-driven architecture',
  'Concurrency, consistency models, and fault tolerance',
  'Service-to-service communication and observability',
];

export default function DirectionOverlay() {
  return (
    <div style={{ width: '380px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Where I'm heading</p>
      <p className="overlay-body" style={{ marginTop: '10px', marginBottom: '18px' }}>
        I'm a backend engineer early in my career. One list is work I've shipped; the other is
        what I'm deliberately studying as I move into distributed systems.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="direction-card direction-card-built">
          <p className="direction-label direction-label-built">
            <span className="direction-dot direction-dot-built" />
            Built
          </p>
          <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0 }}>
            {BUILT.map((item, i) => (
              <li key={i} className="direction-item">{item}</li>
            ))}
          </ul>
        </div>
        <div className="direction-card direction-card-exploring">
          <p className="direction-label direction-label-exploring">
            <span className="direction-dot direction-dot-exploring" />
            Exploring
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
