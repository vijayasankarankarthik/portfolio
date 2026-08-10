import { motion } from "framer-motion";
import Section from "./Section.jsx";
import SystemDiagram from "./SystemDiagram.jsx";
import { systemGraph } from "./diagramGraphs.js";

const CONCEPTS = [
  {
    tag: "01",
    title: "APIs & services",
    body: "Request handling, routing, and the boundaries between services that decide what talks to what.",
  },
  {
    tag: "02",
    title: "Auth & access control",
    body: "Who's allowed to do what — token-based authentication and role-based authorization on protected routes.",
  },
  {
    tag: "03",
    title: "Data & persistence",
    body: "Relational schema design, query performance, and the ORM layer that sits between code and the database.",
  },
  {
    tag: "04",
    title: "Caching & messaging",
    body: "Keeping hot data close and letting slow work happen asynchronously instead of blocking a request.",
  },
];

export default function WhatIBuild() {
  return (
    <Section id="system" eyebrow="Layer: System" title="What I build">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="space-y-10">
          {CONCEPTS.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-5"
            >
              <span className="font-mono-tight pt-1 text-[11px] text-signalDim">
                {c.tag}
              </span>
              <div>
                <h3 className="font-display text-xl text-paper">{c.title}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-md border border-seam bg-panel/40 p-4"
        >
          <SystemDiagram
            nodes={systemGraph.nodes}
            edges={systemGraph.edges}
            packets={systemGraph.packets}
            viewBox={systemGraph.viewBox}
            className="w-full"
          />
          <p className="font-mono-tight mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-muted">
            A request entering the system — gateway → auth → services → data
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
