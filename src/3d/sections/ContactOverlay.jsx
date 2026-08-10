/**
 * ContactOverlay.jsx
 * Education & contact — bottom of the scene
 */
export default function ContactOverlay() {
  return (
    <div style={{ width: '420px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Education & contact</p>

      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        {/* Education */}
        <div>
          <p className="skill-group-label">Education</p>
          <p className="overlay-section-title" style={{ marginTop: '10px', fontSize: '15px' }}>
            B.Tech, Electronics &amp; Communication Engineering
          </p>
          <p className="overlay-body" style={{ marginTop: '6px' }}>
            SASTRA Deemed University<br />Kumbakonam — 2022–2026
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="skill-group-label">Let's build</p>
          <p className="overlay-body" style={{ marginTop: '10px' }}>
            Open to backend engineering roles — especially teams working close to
            distributed systems and scalable architecture.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href="https://github.com/vijayasankarankarthik"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/vijaya-sankaran-karthik-6767a4324"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #1c2621' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4fae87' }}>
          VSK.dev — Backend Engineer
        </p>
      </div>
    </div>
  );
}
