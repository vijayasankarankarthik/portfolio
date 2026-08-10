/**
 * ContactOverlay.jsx — Education (no CGPA/marks) + contact links + Resume download
 */
export default function ContactOverlay() {
  return (
    <div style={{ width: '440px', pointerEvents: 'auto' }}>
      <p className="overlay-eyebrow">Education & contact</p>

      <div style={{ marginTop: '22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        {/* Education — NO CGPA, NO marks */}
        <div>
          <p className="skill-group-label" style={{ color: '#00c8a0' }}>Education</p>
          <p className="overlay-section-title" style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.4' }}>
            B.Tech, Electronics &amp; Communication Engineering
          </p>
          <p className="overlay-body" style={{ marginTop: '6px' }}>
            SASTRA Deemed University<br />Kumbakonam · 2022 – 2026
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="skill-group-label" style={{ color: '#00c8a0' }}>Let's connect</p>
          <p className="overlay-body" style={{ marginTop: '10px' }}>
            Open to backend engineering and software engineer roles —
            especially teams working on distributed systems, platform
            engineering, or scalable infrastructure.
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

      {/* Resume download — prominent in contact section */}
      <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(28,38,33,0.7)' }}>
        <a
          href="/resume.pdf"
          download="Vijaya_Sankaran_Karthik_Resume.pdf"
          className="cta-primary"
          style={{ display: 'inline-block' }}
        >
          ↓ Download Resume
        </a>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{
          fontFamily: 'monospace',
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(0,200,160,0.35)',
        }}>
          VSK.dev — Backend Engineer
        </p>
      </div>
    </div>
  );
}
