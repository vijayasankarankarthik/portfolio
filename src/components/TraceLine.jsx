import { useScroll, useSpring, motion } from "framer-motion";

const STOPS = [
  { id: "intake", label: "INTAKE" },
  { id: "system", label: "SYSTEM" },
  { id: "service", label: "SERVICE" },
  { id: "auth", label: "AUTH" },
  { id: "repository", label: "REPOSITORY" },
  { id: "direction", label: "DIRECTION" },
  { id: "response", label: "RESPONSE" },
];

export default function TraceLine() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed left-0 top-0 z-40 hidden h-screen w-16 flex-col items-center justify-center lg:flex"
      aria-hidden="false"
    >
      <div className="relative h-[60vh] w-px bg-seam">
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-signal"
          style={{ scaleY: smooth, height: "100%" }}
        />
        {STOPS.map((stop, i) => (
          <button
            key={stop.id}
            onClick={() => scrollTo(stop.id)}
            className="group absolute -left-[3px] flex items-center"
            style={{ top: `${(i / (STOPS.length - 1)) * 100}%` }}
            aria-label={`Jump to ${stop.label}`}
          >
            <span className="block h-[7px] w-[7px] rounded-full bg-seam ring-1 ring-signal/40 transition-colors group-hover:bg-signal" />
            <span className="font-mono-tight pointer-events-none absolute left-4 whitespace-nowrap text-[10px] tracking-[0.2em] text-muted opacity-0 transition-opacity group-hover:opacity-100">
              {stop.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
