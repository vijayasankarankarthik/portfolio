/**
 * SkillsOverlay.jsx — Accurate from resume, backend-first
 * No Angular. React listed only as supporting tool.
 */
const GROUPS = [
  {
    label: 'Backend',
    color: '#4ade80',
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate', 'REST APIs'],
  },
  {
    label: 'Database',
    color: '#60a5fa',
    items: ['PostgreSQL', 'MySQL', 'SQL', 'Schema design', 'Query optimization'],
  },
  {
    label: 'Auth & Security',
    color: '#00c8a0',
    items: ['JWT Authentication', 'RBAC', 'Spring Security', 'Keycloak (learning)'],
  },
  {
    label: 'Infrastructure',
    color: '#fb923c',
    items: ['Docker', 'Git / GitHub', 'Linux / Ubuntu', 'Swagger / OpenAPI'],
  },
  {
    label: 'Systems (learning)',
    color: '#a78bfa',
    items: ['System Design', 'Distributed Systems', 'Caching strategies', 'Message queues'],
  },
];

export default function SkillsOverlay() {
  return (
    <div style={{ width: '350px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Verified capabilities</p>
      <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="skill-group-label" style={{ color: g.color }}>{g.label}</p>
            <div style={{ marginTop: '7px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {g.items.map((item) => (
                <span key={item} className="skill-chip" style={{ borderColor: `${g.color}25` }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
