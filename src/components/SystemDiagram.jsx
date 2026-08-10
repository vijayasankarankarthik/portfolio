import { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SystemDiagram — a scroll-revealed, packet-animated architecture diagram.
 *
 * Renders nodes + edges from a simple graph description and animates
 * "packets" travelling along the edges to suggest live request/event flow.
 * Built in SVG rather than WebGL: instant load, crisp at any DPI, no GPU
 * cost, and trivially respects prefers-reduced-motion — which matters more
 * for a portfolio a recruiter opens on a work laptop than a spinning mesh.
 *
 * nodes: [{ id, label, sub, x, y, kind }]  kind: "edge" | "core" | "store"
 * edges: [{ from, to, id, dashed? }]
 * packets: [{ edgeId, delay }]  which edges get animated dots, and when
 */
export default function SystemDiagram({
  nodes,
  edges,
  packets = [],
  viewBox = "0 0 760 420",
  className = "",
  labelSize = 10.5,
}) {
  const prefersReduced = useReducedMotion();
  const nodeMap = useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  const edgePath = (edge) => {
    const a = nodeMap[edge.from];
    const b = nodeMap[edge.to];
    if (!a || !b) return "";
    const midY = (a.y + b.y) / 2;
    // orthogonal-ish routing: vertical drop, gentle curve if x differs
    if (Math.abs(a.x - b.x) < 1) {
      return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    }
    return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
  };

  const kindStyle = {
    edge: { r: 5, fill: "var(--diagram-signal, #7fe6b8)" },
    core: { r: 6, fill: "var(--diagram-paper, #f4f2ea)" },
    store: { r: 5, fill: "var(--diagram-amber, #e2b04f)" },
  };

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label="Diagram of a request travelling through a backend system: client, API gateway, services, cache, database, and message queue."
    >
      <defs>
        <filter id="sd-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      {edges.map((edge, i) => (
        <motion.path
          key={edge.id ?? `${edge.from}-${edge.to}`}
          d={edgePath(edge)}
          fill="none"
          stroke="#2a3630"
          strokeWidth={1.25}
          strokeDasharray={edge.dashed ? "3 4" : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: "easeOut" }}
        />
      ))}

      {/* animated packets travelling along edges */}
      {!prefersReduced &&
        packets.map((p, i) => {
          const edge = edges.find((e) => (e.id ?? `${e.from}-${e.to}`) === p.edgeId);
          if (!edge) return null;
          return (
            <motion.circle
              key={`packet-${p.edgeId}-${i}`}
              r={2.4}
              fill="#7fe6b8"
              filter="url(#sd-glow)"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                delay: (p.delay ?? 0) + 1,
                repeat: Infinity,
                repeatDelay: p.repeatDelay ?? 1.6,
                ease: "linear",
              }}
              style={{ offsetPath: `path("${edgePath(edge)}")` }}
            />
          );
        })}

      {/* nodes */}
      {nodes.map((node, i) => {
        const style = kindStyle[node.kind ?? "edge"];
        return (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={style.r + 5}
              fill="none"
              stroke="#1c2621"
              strokeWidth={1}
            />
            <circle cx={node.x} cy={node.y} r={style.r} fill={style.fill} />
            <text
              x={node.x}
              y={node.y + style.r + labelSize + 3}
              textAnchor="middle"
              fontSize={labelSize}
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.04em"
              fill="#f4f2ea"
              opacity={0.92}
            >
              {node.label}
            </text>
            {node.sub && (
              <text
                x={node.x}
                y={node.y + style.r + labelSize + 15}
                textAnchor="middle"
                fontSize={labelSize - 1.5}
                fontFamily="'JetBrains Mono', monospace"
                fill="#8a9690"
              >
                {node.sub}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
