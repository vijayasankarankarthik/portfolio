import { useEffect, useState } from 'react';

const LAYERS = [
  { threshold: 0.00, label: 'Layer: Client' },
  { threshold: 0.12, label: 'Layer: API Gateway' },
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
  const [scrollEl, setScrollEl] = useState(null);

  // Find the ScrollControls scroll container after mount
  useEffect(() => {
    const find = () => {
      const el = document.querySelector('canvas + div') ?? document.querySelector('[style*="overflow"]');
      if (el) { setScrollEl(el); return true; }
      return false;
    };
    if (!find()) {
      const t = setTimeout(find, 500);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!scrollEl) return;
    const handleScroll = () => {
      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      const progress = maxScroll > 0 ? scrollEl.scrollTop / maxScroll : 0;
      setScrollProgress(progress);
      setLayerLabel(getCurrentLayer(progress));
    };
    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, [scrollEl]);

  const scrollToTop = () => {
    if (scrollEl) scrollEl.scrollTop = 0;
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(10,31,22,0.8)',
      background: 'rgba(5,11,9,0.80)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    }}>
      {/* Scroll progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '1px',
        width: `${scrollProgress * 100}%`,
        background: 'linear-gradient(90deg, #00c8a0, #4ade80)',
        transition: 'width 0.12s linear',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '13px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        {/* Logo + layer indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: 0 }}>
          <button
            onClick={scrollToTop}
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.14em',
              color: '#e2e8e4',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
            }}
          >
            VSK<span style={{ color: '#00c8a0' }}>.</span>dev
          </button>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#00c8a0',
            borderLeft: '1px solid rgba(10,31,22,0.9)',
            paddingLeft: '16px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>
            {layerLabel}
          </span>
        </div>

        {/* Nav actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          {/* Resume download — in nav */}
          <a
            href="/resume.pdf"
            download="Vijaya_Sankaran_Karthik_Resume.pdf"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#00c8a0',
              textDecoration: 'none',
              opacity: 0.85,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '1')}
            onMouseLeave={(e) => (e.target.style.opacity = '0.85')}
          >
            ↓ Resume
          </a>

          <a
            href="https://github.com/vijayasankarankarthik"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#00c8a0',
              border: '1px solid rgba(0,200,160,0.3)',
              padding: '6px 14px',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => { e.target.style.background = '#00c8a0'; e.target.style.color = '#050b09'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#00c8a0'; }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </header>
  );
}
