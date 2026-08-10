import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SystemDiagram from "./SystemDiagram.jsx";
import { heroGraph } from "./diagramGraphs.js";

const BOOT_LINES = [
  "$ curl -sS /whoami",
  '> { "role": "Backend Engineer", "interest": "distributed systems" }',
  "$ status --check",
  "> 200 OK — open to backend engineering roles",
];

const STACK = ["Java", "Spring Boot", "PostgreSQL", "Docker"];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.1]);

  return (
    <section
      id="intake"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-seam/60 px-6 pt-24 md:px-10"
    >
      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-grid bg-[size:44px_44px]"
      />
      <div className="scanline pointer-events-none absolute inset-0" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="font-mono-tight mb-6 text-[11px] uppercase tracking-[0.3em] text-signal">
          Backend Engineer — Layer: Controller
        </p>

        <h1 className="font-display text-[13vw] leading-[0.95] text-paper md:text-[6.5rem]">
          Backend
          <br />
          <span className="text-outline">Engineer</span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="max-w-xl text-lg text-muted md:text-xl">
              Building reliable software and exploring distributed systems —
              request routing, service boundaries, data consistency, and
              everything that has to hold up once a system stops being a
              single process.
            </p>

            <div className="font-mono-tight mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.2em] text-signalDim">
              {STACK.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="font-mono-tight mt-8 max-w-md rounded-md border border-seam bg-panel/60 p-4 text-[12px] leading-relaxed text-signal shadow-[0_0_40px_-15px_rgba(127,230,184,0.35)]">
              {BOOT_LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.25, duration: 0.4 }}
                  className={line.startsWith(">") ? "text-paper/80" : "text-signal"}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block" aria-hidden="false">
            <SystemDiagram
              nodes={heroGraph.nodes}
              edges={heroGraph.edges}
              packets={heroGraph.packets}
              viewBox={heroGraph.viewBox}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="font-mono-tight absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        scroll to trace the request ↓
      </motion.div>
    </section>
  );
}
