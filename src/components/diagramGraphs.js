// Graph data for SystemDiagram instances used across the site.
// Kept separate from the component so each section can describe its own
// slice of "the system" without bloating SystemDiagram itself.

export const heroGraph = {
  viewBox: "0 0 360 200",
  nodes: [
    { id: "client", label: "CLIENT", x: 60, y: 30, kind: "edge" },
    { id: "gateway", label: "API GATEWAY", x: 180, y: 90, kind: "core" },
    { id: "service", label: "SERVICE", x: 300, y: 30, kind: "edge" },
    { id: "db", label: "DATABASE", x: 180, y: 165, kind: "store" },
  ],
  edges: [
    { id: "c-g", from: "client", to: "gateway" },
    { id: "g-s", from: "gateway", to: "service" },
    { id: "g-db", from: "gateway", to: "db" },
  ],
  packets: [
    { edgeId: "c-g", delay: 0 },
    { edgeId: "g-s", delay: 0.6 },
    { edgeId: "g-db", delay: 1.1, repeatDelay: 2.2 },
  ],
};

export const systemGraph = {
  viewBox: "0 0 760 460",
  nodes: [
    { id: "client", label: "CLIENT", x: 380, y: 30, kind: "edge" },
    { id: "gateway", label: "API GATEWAY", x: 380, y: 110, kind: "core" },
    { id: "auth", label: "AUTH", sub: "JWT · RBAC", x: 380, y: 190, kind: "core" },
    { id: "svc1", label: "USER SERVICE", x: 170, y: 270, kind: "edge" },
    { id: "svc2", label: "CORE SERVICE", x: 380, y: 270, kind: "edge" },
    { id: "svc3", label: "SEARCH SERVICE", x: 590, y: 270, kind: "edge" },
    { id: "cache", label: "CACHE", x: 170, y: 360, kind: "store" },
    { id: "db", label: "DATABASE", x: 380, y: 360, kind: "store" },
    { id: "queue", label: "MESSAGE QUEUE", x: 590, y: 360, kind: "store" },
    { id: "worker", label: "WORKER", x: 590, y: 430, kind: "edge" },
  ],
  edges: [
    { id: "client-gateway", from: "client", to: "gateway" },
    { id: "gateway-auth", from: "gateway", to: "auth" },
    { id: "auth-svc1", from: "auth", to: "svc1" },
    { id: "auth-svc2", from: "auth", to: "svc2" },
    { id: "auth-svc3", from: "auth", to: "svc3" },
    { id: "svc1-cache", from: "svc1", to: "cache" },
    { id: "svc2-db", from: "svc2", to: "db" },
    { id: "svc3-queue", from: "svc3", to: "queue", dashed: true },
    { id: "queue-worker", from: "queue", to: "worker", dashed: true },
  ],
  packets: [
    { edgeId: "client-gateway", delay: 0 },
    { edgeId: "gateway-auth", delay: 0.5 },
    { edgeId: "auth-svc1", delay: 1.0 },
    { edgeId: "auth-svc2", delay: 1.0 },
    { edgeId: "auth-svc3", delay: 1.0 },
    { edgeId: "svc1-cache", delay: 1.5 },
    { edgeId: "svc2-db", delay: 1.5 },
    { edgeId: "svc3-queue", delay: 1.5, repeatDelay: 2.6 },
    { edgeId: "queue-worker", delay: 2.4, repeatDelay: 2.6 },
  ],
};

export const projectGraph = {
  viewBox: "0 0 420 360",
  nodes: [
    { id: "client", label: "CLIENT", x: 210, y: 25, kind: "edge" },
    { id: "api", label: "REST API", x: 210, y: 100, kind: "core" },
    { id: "auth", label: "AUTH", sub: "Spring Security · JWT", x: 210, y: 175, kind: "core" },
    { id: "service", label: "USER SERVICE", x: 210, y: 250, kind: "edge" },
    { id: "cache", label: "CACHE", x: 105, y: 330, kind: "store" },
    { id: "db", label: "MYSQL", x: 315, y: 330, kind: "store" },
  ],
  edges: [
    { id: "client-api", from: "client", to: "api" },
    { id: "api-auth", from: "api", to: "auth" },
    { id: "auth-service", from: "auth", to: "service" },
    { id: "service-cache", from: "service", to: "cache" },
    { id: "service-db", from: "service", to: "db" },
  ],
  packets: [
    { edgeId: "client-api", delay: 0 },
    { edgeId: "api-auth", delay: 0.5 },
    { edgeId: "auth-service", delay: 1.0 },
    { edgeId: "service-db", delay: 1.5 },
    { edgeId: "service-cache", delay: 1.5, repeatDelay: 2.4 },
  ],
};
