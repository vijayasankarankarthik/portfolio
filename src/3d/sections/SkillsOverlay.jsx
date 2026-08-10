/**
 * SkillsOverlay.jsx
 * Skills / verified capabilities — shown near the data layer
 */
const GROUPS = [
  { label: 'Backend',        items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate', 'REST APIs'] },
  { label: 'Database',       items: ['PostgreSQL', 'MySQL', 'SQL'] },
  { label: 'Systems',        items: ['System Design (learning)', 'Distributed Systems (learning)', 'Caching', 'Auth / Authz'] },
  { label: 'Infrastructure', items: ['Docker', 'Git / GitHub', 'Linux / Ubuntu'] },
  { label: 'AI / ML',        items: ['GenAI tooling', 'RAG', 'LLM integration (exploratory)'] },
];

export default function SkillsOverlay() {
  return (
    <div style={{ width: '340px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Verified capabilities</p>
      <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="skill-group-label">{g.label}</p>
            <ul style={{ marginTop: '8px', listStyle: 'none', padding: 0 }}>
              {g.items.map((item) => (
                <li key={item} className="skill-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
