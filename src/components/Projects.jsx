import { motion } from "framer-motion";
import Section from "./Section.jsx";
import SystemDiagram from "./SystemDiagram.jsx";
import { projectGraph } from "./diagramGraphs.js";

const FEATURED = {
  name: "User Service Backend System",
  stack: "Java · Spring Boot · MySQL · Spring Security · JWT",
  url: "https://github.com/vijayasankarankarthik/userservice",
  stages: [
    {
      label: "Problem",
      body: "Needed a self-contained backend for user registration, login, and profile management, with real authentication rather than a mocked one.",
    },
    {
      label: "Approach",
      body: "Layered architecture (Controller to Service to Repository) so business logic stays independent of both the web layer and the persistence layer.",
    },
    {
      label: "Architecture",
      body: "A REST API in front of an auth layer, a service layer holding user logic, and MySQL for storage, shown alongside.",
    },
    {
      label: "Engineering decisions",
      body: "JWT for stateless auth so the service doesn't hold session state; Spring Security for route-level authorization; a CSV bulk-upload path for batch user creation; every endpoint tested through Postman.",
    },
    {
      label: "Result",
      body: "A working, testable user service with authenticated CRUD flows and optimized MySQL lookups, the backend I reach for as the base of anything bigger.",
    },
  ],
};

const OTHER_PROJECTS = [
  {
    name: "8-bit Approximate Parallel Prefix Adder Analysis",
    stack: "Verilog · MATLAB",
    url: "https://github.com/vijayasankarankarthik/Approximate_parallel_prefix_adders",
    points: [
      "Designed Kogge-Stone and Ladner-Fischer 8-bit adder architectures in Verilog, comparing exact vs. approximate variants.",
      "Generated test vectors in MATLAB and evaluated error metrics and performance trade-offs for approximate computing.",
    ],
  },
];

export default function Projects() {
  return (
    <Section id="repository" eyebrow="Layer: Repository" title="Projects">
      <motion.a
        href={FEATURED.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="group mb-14 block rounded-md border border-seam bg-panel/40 p-7 transition-colors hover:border-signal/50 md:p-10"
      >
        <div className="mb-8 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-paper md:text-3xl">
              {FEATURED.name}
            </h3>
            <p className="font-mono-tight mt-2 text-[11px] uppercase tracking-[0.15em] text-signalDim">
              {FEATURED.stack}
            </p>
          </div>
          <span className="font-mono-tight mt-1 shrink-0 text-signal transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            {FEATURED.stages.map((stage) => (
              <div key={stage.label}>
                <p className="font-mono-tight mb-1.5 text-[10px] uppercase tracking-[0.25em] text-signal">
                  {stage.label}
                </p>
                <p className="text-[15px] leading-relaxed text-muted">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-seam bg-ink/40 p-3">
            <SystemDiagram
              nodes={projectGraph.nodes}
              edges={projectGraph.edges}
              packets={projectGraph.packets}
              viewBox={projectGraph.viewBox}
              className="w-full"
            />
          </div>
        </div>
      </motion.a>

      <div className="grid gap-8 md:grid-cols-2">
        {OTHER_PROJECTS.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col justify-between rounded-md border border-seam bg-panel/40 p-7 transition-colors hover:border-signal/50"
          >
            <div>
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="font-display text-xl text-paper">{project.name}</h3>
                <span className="font-mono-tight mt-1 shrink-0 text-signal transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="font-mono-tight mb-5 text-[11px] uppercase tracking-[0.15em] text-signalDim">
                {project.stack}
              </p>
              <ul className="space-y-2">
                {project.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
