import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#hero',       label: 'System' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
];

// Layer labels that change as you scroll
const LAYERS = [
  { threshold: 0.00, label: 'Layer: Client' },
  { threshold: 0.12, label: 'Layer: Gateway' },
  { threshold: 0.24, label: 'Layer: Auth' },
  { threshold: 0.40, label: 'Layer: Services' },
  { threshold: 0.58, label: 'Layer: Data' },
  { threshold: 0.72, label: 'Layer: Cache · DB · Queue' },
  { threshold: 0.85, label: 'Layer: Workers' },
  { threshold: 0.92, label: 'Layer: Infrastructure' },
];

function getCurrentLayer(progress) {
  let current = LAYERS[0];
  for (const layer of LAYERS) {
    if (progress >= layer.threshold) current = layer;
  }
  return current.label;
}

export default function Nav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [layerLabel, setLayerLabel] = useState(LAYERS[0].label);

  useEffect(() => {
    // Listen to the R3F scroll container (it's the only scrollable element in fixed canvas mode)
    // We track document scroll as a proxy (window scroll events from ScrollControls)
    const handleScroll = () => {
      const el = document.querySelector('[data-scroll]') ?? document.documentElement;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const progress = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
      setScrollProgress(progress);
      setLayerLabel(getCurrentLayer(progress));
    };

    // ScrollControls mounts an overflow:auto div — find it
    const scrollEl = document.querySelector('canvas')?.parentElement?.parentElement;
    const target = scrollEl ?? window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(28,38,33,0.7)',
        background: 'rgba(6,13,11,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #7fe6b8, #4fae87)',
          transition: 'width 0.1s ease',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo + layer indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => {
              const el = document.querySelector('canvas')?.parentElement?.parentElement;
              if (el) el.scrollTop = 0;
            }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              letterSpacing: '0.12em',
              color: '#f4f2ea',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            VSK<span style={{ color: '#7fe6b8' }}>.</span>dev
          </button>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#4fae87',
              borderLeft: '1px solid #1c2621',
              paddingLeft: '16px',
            }}
          >
            {layerLabel}
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#8a9690',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#7fe6b8')}
                onMouseLeave={(e) => (e.target.style.color = '#8a9690')}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="https://github.com/vijayasankarankarthik"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7fe6b8',
              border: '1px solid rgba(127,230,184,0.35)',
              padding: '6px 14px',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.background = '#7fe6b8'; e.target.style.color = '#060d0b'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#7fe6b8'; }}
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
