/**
 * ExperienceOverlay.jsx — Accurate resume content, backend-framed
 * No ERP/accounting framing. Emphasizes Java, Spring, auth, DB work.
 */
const ROLES = [
  {
    org: 'Bonbloc Technologies',
    title: 'Backend Developer Intern',
    time: 'Feb 2026 — Present',
    active: true,
    points: [
      'Built backend APIs in Spring Boot — user management, authentication flows, and data operations serving production traffic.',
      'Designed and queried PostgreSQL schemas with Spring Data JPA and Hibernate; wrote raw SQL for performance-critical paths.',
      'Implemented JWT-based stateless authentication and Spring Security RBAC across protected API routes.',
      'Followed layered architecture (Controller → Service → Repository) with full API documentation via Swagger/OpenAPI.',
      'Used Git and GitHub for version control; validated all endpoints through systematic test cases with Bruno.',
    ],
  },
  {
    org: 'BSNL Ltd.',
    title: 'Industrial Training Intern',
    time: 'November 2024 · 1 week',
    active: false,
    points: [
      'Exposure to telecom network infrastructure — switching, transmission, and subscriber management systems.',
      'Observed enterprise operational workflows in a large-scale public sector environment.',
    ],
  },
];

export default function ExperienceOverlay() {
  return (
    <div style={{ width: '370px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Experience</p>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
        {ROLES.map((role) => (
          <div key={role.org}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {role.active && <span className="active-dot" />}
              <span className="overlay-time">{role.time}</span>
            </div>
            <p className="overlay-section-title">{role.org}</p>
            <p className="overlay-role-title">{role.title}</p>
            <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {role.points.map((p, i) => (
                <li key={i} className="overlay-bullet">
                  <span style={{ color: '#00c8a0', marginRight: '8px', flexShrink: 0 }}>›</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
