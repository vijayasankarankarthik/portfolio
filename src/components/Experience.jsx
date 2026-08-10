import { motion } from "framer-motion";
import Section from "./Section.jsx";

const ROLES = [
  {
    org: "Bonbloc Technologies",
    title: "Backend Developer Intern",
    time: "Feb 2026 — Present",
    active: true,
    points: [
      "Built backend APIs in Spring Boot handling user management, authentication flows, and data operations.",
      "Worked with PostgreSQL — wrote SQL queries and used Spring Data JPA/Hibernate to manage relational data models.",
      "Implemented JWT-based authentication and integrated Spring Security for role-based access control on protected API routes.",
      "Documented APIs with Swagger/OpenAPI and validated endpoints through systematic Postman test cases.",
      "Followed layered architecture — Controller, Service, Repository — using Git and GitHub for version control throughout.",
    ],
  },
  {
    org: "BSNL Ltd.",
    title: "Industrial Training Intern",
    time: "Nov 2024 · 1 week",
    active: false,
    points: [
      "Completed industrial training gaining exposure to telecom network infrastructure and enterprise operational workflows.",
      "Observed switching, transmission, and subscriber management systems in a public sector telecom environment.",
    ],
  },
];

export default function Experience() {
  return (
    <Section id="service" eyebrow="Layer: Service" title="Experience">
      <div className="space-y-16">
        {ROLES.map((role, i) => (
          <motion.div
            key={role.org}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid gap-6 md:grid-cols-[240px_1fr]"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                {role.active && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
                )}
                <span className="font-mono-tight text-[11px] uppercase tracking-[0.2em] text-muted">
                  {role.time}
                </span>
              </div>
              <h3 className="font-display text-2xl text-paper">{role.org}</h3>
              <p className="mt-1 text-sm text-signal">{role.title}</p>
            </div>
            <ul className="space-y-3 border-l border-seam pl-6">
              {role.points.map((p) => (
                <li key={p} className="text-[15px] leading-relaxed text-muted">
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
