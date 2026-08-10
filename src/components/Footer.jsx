export default function Footer() {
  return (
    <footer className="px-6 py-8 md:px-10">
      <div className="font-mono-tight mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-[0.15em] text-muted md:flex-row">
        <span>© {new Date().getFullYear()} Vijaya Sankaran Karthik</span>
        <span>Built with React · Vite · Tailwind · Framer Motion</span>
      </div>
    </footer>
  );
}
