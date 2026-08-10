/**
 * HeroOverlay.jsx — Resume-accurate, backend-engineer positioning
 * No full-stack, no GenAI identity, no "hire me"
 */
import { motion } from 'framer-motion';

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function HeroOverlay() {
  return (
    <div style={{ width: '520px', pointerEvents: 'auto' }}>
      <motion.p {...FADE_UP(0.2)} className="overlay-eyebrow">
        Backend Engineer — Open to opportunities
      </motion.p>

      <motion.h1 {...FADE_UP(0.35)} className="overlay-display">
        Vijaya<br />
        <span className="overlay-display-outline">Sankaran</span><br />
        Karthik
      </motion.h1>

      <motion.p {...FADE_UP(0.5)} className="overlay-body" style={{ marginTop: '16px', maxWidth: '360px' }}>
        Building reliable backend systems — REST APIs, authentication,
        database design, and the infrastructure that holds up when a
        service stops being a single process.
      </motion.p>

      <motion.div {...FADE_UP(0.65)} style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Java', 'Spring Boot', 'PostgreSQL', 'Spring Security', 'REST APIs'].map((t) => (
          <span key={t} className="stack-tag">{t}</span>
        ))}
      </motion.div>

      {/* Hero CTAs */}
      <motion.div
        {...FADE_UP(0.8)}
        style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
      >
        <a
          href="/resume.pdf"
          download="Vijaya_Sankaran_Karthik_Resume.pdf"
          className="cta-primary"
        >
          ↓ Download Resume
        </a>
        <a
          href="https://github.com/vijayasankarankarthik"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-secondary"
        >
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/vijaya-sankaran-karthik-6767a4324"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-secondary"
        >
          LinkedIn ↗
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ marginTop: '32px' }}
        className="scroll-hint"
      >
        scroll to explore the system ↓
      </motion.p>
    </div>
  );
}
