export default function Footer() {
  // Footer is visually part of the contact overlay in the 3D scene.
  // This component is intentionally minimal — just a hidden SEO landmark.
  return (
    <footer
      aria-label="Footer"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        pointerEvents: 'none',
        padding: '0 24px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(138,150,144,0.45)',
        }}
      >
        Vijaya Sankaran Karthik — Backend Engineer
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.15em',
          color: 'rgba(79,174,135,0.4)',
        }}
      >
        200 OK
      </span>
    </footer>
  );
}
