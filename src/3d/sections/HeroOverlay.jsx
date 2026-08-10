/**
 * HeroOverlay.jsx
 * 
 * Identity section — positioned in 3D space near the top of the scene.
 * The system is running behind and around this text.
 */
import { motion } from 'framer-motion';

export default function HeroOverlay() {
  return (
    <div className="hero-overlay" style={{ width: '420px', pointerEvents: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="overlay-eyebrow">Backend Engineer</p>
        <h1 className="overlay-display">
          Vijaya<br />
          <span className="overlay-display-outline">Sankaran</span><br />
          Karthik
        </h1>
        <p className="overlay-body" style={{ marginTop: '16px', maxWidth: '340px' }}>
          Building reliable software and exploring distributed systems —
          request routing, service boundaries, data consistency, and
          everything that holds up once a system stops being a single process.
        </p>
        <div className="overlay-stack" style={{ marginTop: '20px' }}>
          {['Java', 'Spring Boot', 'PostgreSQL', 'Docker'].map((t) => (
            <span key={t} className="stack-tag">{t}</span>
          ))}
        </div>
        <div className="overlay-terminal" style={{ marginTop: '24px' }}>
          <p className="terminal-line cmd">$ curl -sS /whoami</p>
          <p className="terminal-line res">{'> { "role": "Backend Engineer", "interest": "distributed systems" }'}</p>
          <p className="terminal-line cmd">$ status --check</p>
          <p className="terminal-line res">{'> 200 OK — open to backend engineering roles'}</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{ marginTop: '28px' }}
          className="scroll-hint"
        >
          scroll to explore the system ↓
        </motion.div>
      </motion.div>
    </div>
  );
}
