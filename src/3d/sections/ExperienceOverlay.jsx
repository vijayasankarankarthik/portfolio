/**
 * ExperienceOverlay.jsx
 * Experience section — shown when camera is near the service layer
 */
const ROLES = [
  {
    org: 'Bonbloc Technologies',
    title: 'Backend Developer Intern',
    time: 'Feb 2026 — Present',
    active: true,
    points: [
      'Built backend APIs in Spring Boot — user management, authentication flows, data operations.',
      'Worked with PostgreSQL, Spring Data JPA/Hibernate to manage relational data models.',
      'Implemented JWT-based authentication, Spring Security RBAC on protected API routes.',
      'Documented with Swagger/OpenAPI, validated endpoints through systematic Postman test cases.',
    ],
  },
  {
    org: 'BSNL Ltd.',
    title: 'Industrial Training Intern',
    time: 'Nov 2024 · 1 week',
    active: false,
    points: [
      'Exposure to telecom network infrastructure and enterprise operational workflows.',
      'Observed switching, transmission, and subscriber management systems.',
    ],
  },
];

export default function ExperienceOverlay() {
  return (
    <div style={{ width: '360px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Experience</p>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {ROLES.map((role) => (
          <div key={role.org}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {role.active && <span className="active-dot" />}
              <span className="overlay-time">{role.time}</span>
            </div>
            <p className="overlay-section-title">{role.org}</p>
            <p className="overlay-role-title">{role.title}</p>
            <ul style={{ marginTop: '10px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {role.points.map((p, i) => (
                <li key={i} className="overlay-bullet">
                  <span style={{ color: '#4fae87', marginRight: '8px' }}>›</span>{p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
