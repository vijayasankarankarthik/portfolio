import { motion } from "framer-motion";
import Section from "./Section.jsx";

const GROUPS = [
  {
    label: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "JPA / Hibernate", "REST APIs"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    label: "Systems",
    items: [
      "System Design (learning)",
      "Distributed Systems (learning)",
      "Caching",
      "Authentication / Authorization",
    ],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "Git / GitHub", "Linux / Ubuntu"],
  },
  {
    label: "Supporting",
    items: ["React (used for internal tooling / frontend basics)"],
  },
  {
    label: "AI",
    items: ["GenAI tooling", "RAG", "LLM integration (exploratory)"],
  },
];

export default function Skills() {
  return (
    <Section
      id="auth"
      eyebrow="Layer: Auth"
      title="Verified capabilities"
      className="bg-panel/30"
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <p className="font-mono-tight mb-4 text-[11px] uppercase tracking-[0.2em] text-signal">
              {group.label}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-seam/70 pb-2 text-sm text-paper/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
