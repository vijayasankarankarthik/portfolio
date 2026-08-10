import { motion } from "framer-motion";
import Section from "./Section.jsx";

const BUILT = [
  "Layered backend services (Controller → Service → Repository) in Spring Boot",
  "JWT-based authentication and role-based authorization with Spring Security",
  "Relational data models and query design with PostgreSQL / MySQL and JPA-Hibernate",
  "Documented, tested REST APIs — Swagger/OpenAPI, Postman/Bruno",
];

const EXPLORING = [
  "Distributed systems & system design fundamentals",
  "Caching strategies and cache invalidation",
  "Message queues and event-driven architecture",
  "Concurrency, consistency models, and fault tolerance",
  "Service-to-service communication and observability",
];

export default function Direction() {
  return (
    <Section id="direction" eyebrow="Layer: Direction" title="Where I'm heading">
      <p className="mb-14 max-w-2xl text-[15px] leading-relaxed text-muted">
        I'm a backend engineer early in my career, and I want to be upfront
        about the line between the two lists below — one is work I've
        actually shipped, the other is what I'm deliberately studying and
        building toward as I move into distributed systems.
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-md border border-seam bg-panel/40 p-7"
        >
          <p className="font-mono-tight mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-signal">
            <span className="h-2 w-2 rounded-full bg-signal" />
            What I've built
          </p>
          <ul className="space-y-3">
            {BUILT.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-paper/90">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-md border border-dashed border-seam bg-transparent p-7"
        >
          <p className="font-mono-tight mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-amber">
            <span className="h-2 w-2 rounded-full bg-amber" />
            What I'm exploring
          </p>
          <ul className="space-y-3">
            {EXPLORING.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
