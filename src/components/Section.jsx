import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`border-b border-seam/60 px-6 py-24 md:px-10 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            {eyebrow && (
              <p className="font-mono-tight mb-3 text-[11px] uppercase tracking-[0.3em] text-signal">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-4xl text-paper md:text-5xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
