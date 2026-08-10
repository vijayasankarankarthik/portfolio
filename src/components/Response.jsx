import { motion } from "framer-motion";
import Section from "./Section.jsx";

const LINKS = [
  {
    label: "GitHub",
    url: "https://github.com/vijayasankarankarthik",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/vijaya-sankaran-karthik-6767a4324",
  },
];

export default function Response() {
  return (
    <Section id="response" eyebrow="Layer: Response — 200 OK" title="Education & contact">
      <div className="grid gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono-tight mb-3 text-[11px] uppercase tracking-[0.2em] text-signal">
            Education
          </p>
          <h3 className="font-display text-2xl text-paper">
            B.Tech, Electronics and Communication Engineering
          </h3>
          <p className="mt-2 text-muted">
            SASTRA Deemed University, Kumbakonam — 2022 – 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="font-mono-tight mb-3 text-[11px] uppercase tracking-[0.2em] text-signal">
            Let's build
          </p>
          <p className="max-w-sm text-lg leading-relaxed text-paper/90">
            Open to backend engineering roles, especially teams working close
            to distributed systems and scalable architecture. Reach out on
            LinkedIn or check the code on GitHub.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tight group flex items-center justify-between border-b border-seam py-3 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:text-signal"
              >
                {link.label}
                <span className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
