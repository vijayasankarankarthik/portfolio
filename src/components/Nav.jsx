const LINKS = [
  { id: "system", label: "What I Build" },
  { id: "service", label: "Experience" },
  { id: "repository", label: "Projects" },
  { id: "direction", label: "Direction" },
  { id: "response", label: "Contact" },
];

export default function Nav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-seam/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono-tight text-sm tracking-[0.15em] text-paper hover:text-signal transition-colors"
        >
          VSK<span className="text-signal">.</span>dev
        </button>
        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-mono-tight text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-signal"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => scrollTo("response")}
          className="font-mono-tight rounded-sm border border-signal/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-signal transition-colors hover:bg-signal hover:text-ink"
        >
          Let's build
        </button>
      </div>
    </header>
  );
}
