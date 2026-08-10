/**
 * sceneConfig.js — Updated with new semantic color system
 *
 * COLOR SEMANTICS:
 *   CYAN/TEAL   → network traffic, API gateway, entry points
 *   GREEN       → healthy active services, good state
 *   AMBER       → processing, workers, in-flight computation
 *   STEEL BLUE  → databases, persistent storage, durable data
 *   VIOLET      → cache, async infrastructure, ephemeral fast-path
 *   ROSE        → message queues, async event streams
 *   SLATE       → client/external — neutral entry point
 */

// ─── Color Palette ───────────────────────────────────────────────────────────
export const COLORS = {
  // Node type colors — each has semantic meaning
  gateway:  '#00c8a0',   // cyan-teal    — network / API entry
  service:  '#4ade80',   // green        — healthy active service
  database: '#60a5fa',   // steel blue   — persistent storage
  cache:    '#a78bfa',   // violet       — fast ephemeral path
  queue:    '#f472b6',   // rose         — async event stream
  worker:   '#fb923c',   // amber        — background processing
  client:   '#94a3b8',   // cool slate   — external caller

  // Environment
  edge:       '#0d2820',   // dark teal    — connection tubes
  particle:   '#00c8a0',   // matches gateway — data in flight
  bg:         '#050b09',   // near-black
  fog:        '#050b09',
  grid:       '#0a1f16',   // very dark green-tinted grid
  gridSection:'#0f2d1e',   // slightly lighter grid sections
};

// ─── Node Definitions ─────────────────────────────────────────────────────────
export const NODES = [
  // ── Layer 0: Client ──────────────────────────────────────────────────────
  {
    id: 'client',
    label: 'CLIENT',
    sub: 'HTTP Request',
    kind: 'client',
    position: [0, 0, 28],
    scale: 1.0,
    tooltip: 'External caller — browser, mobile app, or upstream service initiating an HTTP request into the system.',
    techStack: null,
  },

  // ── Layer 1: API Gateway ──────────────────────────────────────────────────
  {
    id: 'gateway',
    label: 'API GATEWAY',
    sub: 'REST · TLS · Rate-limit',
    kind: 'gateway',
    position: [0, 0, 18],
    scale: 1.3,
    tooltip: 'Single entry point for all inbound traffic. Handles TLS termination, rate limiting, request validation, and routing.',
    techStack: 'Spring Boot · REST APIs · Java',
  },

  // ── Layer 2: Auth ─────────────────────────────────────────────────────────
  {
    id: 'auth',
    label: 'AUTH SERVICE',
    sub: 'JWT · Spring Security · RBAC',
    kind: 'gateway',
    position: [0, 0, 10],
    scale: 1.1,
    tooltip: 'Validates JWT tokens and enforces role-based access control. All requests are authorized before reaching downstream services.',
    techStack: 'Spring Security · JWT · RBAC · Keycloak',
  },

  // ── Layer 3: Services ─────────────────────────────────────────────────────
  {
    id: 'user-svc',
    label: 'USER SERVICE',
    sub: 'Registration · Profile',
    kind: 'service',
    position: [-9, 0, 0],
    scale: 1.0,
    tooltip: 'Manages user accounts, registration, profile updates. Owns the user domain with full CRUD operations and business validation.',
    techStack: 'Java · Spring Boot · JPA · Hibernate',
  },
  {
    id: 'core-svc',
    label: 'CORE SERVICE',
    sub: 'Business Logic',
    kind: 'service',
    position: [0, 0, 0],
    scale: 1.0,
    tooltip: 'Central domain logic service. Orchestrates workflows and enforces business invariants across bounded contexts.',
    techStack: 'Java · Spring Boot · REST APIs',
  },
  {
    id: 'search-svc',
    label: 'SEARCH SERVICE',
    sub: 'Query · Index',
    kind: 'service',
    position: [9, 0, 0],
    scale: 1.0,
    tooltip: 'Handles full-text search and filtered queries. Maintains a read-optimized index separate from the primary data store.',
    techStack: 'PostgreSQL FTS · Java',
  },

  // ── Layer 4: Data ─────────────────────────────────────────────────────────
  {
    id: 'cache',
    label: 'CACHE',
    sub: 'TTL · Invalidation',
    kind: 'cache',
    position: [-9, 0, -10],
    scale: 0.9,
    tooltip: 'In-memory cache for hot data. Reduces DB load and latency on frequently-read records. Careful invalidation strategy required.',
    techStack: 'Redis · TTL · Write-through',
  },
  {
    id: 'database',
    label: 'DATABASE',
    sub: 'PostgreSQL · Schema Design',
    kind: 'database',
    position: [0, 0, -10],
    scale: 1.1,
    tooltip: 'Primary relational data store. Normalized schema, indexed queries, transactions. Spring Data JPA + Hibernate ORM.',
    techStack: 'PostgreSQL · MySQL · JPA · Hibernate · SQL',
  },
  {
    id: 'queue',
    label: 'MESSAGE QUEUE',
    sub: 'Async · Decoupled',
    kind: 'queue',
    position: [9, 0, -10],
    scale: 0.9,
    tooltip: 'Decouples services via async messaging. Producers emit events; consumers process independently — enabling retry and backpressure.',
    techStack: 'Event-driven · Async patterns',
  },

  // ── Layer 5: Workers ─────────────────────────────────────────────────────
  {
    id: 'worker',
    label: 'WORKER',
    sub: 'Background jobs',
    kind: 'worker',
    position: [9, 0, -20],
    scale: 0.85,
    tooltip: 'Consumes messages from the queue. Handles slow async operations — scheduled tasks, batch processing, background computation.',
    techStack: 'Spring Batch · Scheduled tasks · Docker',
  },
];

// ─── Edge Definitions ────────────────────────────────────────────────────────
export const EDGES = [
  { id: 'client-gateway',  from: 'client',    to: 'gateway',   dashed: false, speed: 1.4 },
  { id: 'gateway-auth',    from: 'gateway',   to: 'auth',      dashed: false, speed: 1.2 },
  { id: 'auth-user',       from: 'auth',      to: 'user-svc',  dashed: false, speed: 1.0 },
  { id: 'auth-core',       from: 'auth',      to: 'core-svc',  dashed: false, speed: 1.0 },
  { id: 'auth-search',     from: 'auth',      to: 'search-svc',dashed: false, speed: 1.0 },
  { id: 'user-cache',      from: 'user-svc',  to: 'cache',     dashed: false, speed: 0.9 },
  { id: 'core-db',         from: 'core-svc',  to: 'database',  dashed: false, speed: 0.9 },
  { id: 'search-db',       from: 'search-svc',to: 'database',  dashed: false, speed: 0.7 },
  { id: 'search-queue',    from: 'search-svc',to: 'queue',     dashed: true,  speed: 0.8 },
  { id: 'queue-worker',    from: 'queue',     to: 'worker',    dashed: true,  speed: 0.7 },
  { id: 'cache-db',        from: 'cache',     to: 'database',  dashed: true,  speed: 0.5 },
];

// Particles: which edges get animated packets
export const PACKETS = [
  { edgeId: 'client-gateway',  delay: 0.0,  period: 2.5 },
  { edgeId: 'gateway-auth',    delay: 0.6,  period: 2.5 },
  { edgeId: 'auth-user',       delay: 1.2,  period: 3.0 },
  { edgeId: 'auth-core',       delay: 1.2,  period: 3.5 },
  { edgeId: 'auth-search',     delay: 1.4,  period: 4.0 },
  { edgeId: 'user-cache',      delay: 1.8,  period: 3.2 },
  { edgeId: 'core-db',         delay: 1.8,  period: 3.0 },
  { edgeId: 'search-queue',    delay: 2.0,  period: 4.5 },
  { edgeId: 'queue-worker',    delay: 2.8,  period: 4.5 },
];

// ─── Camera Keyframes ────────────────────────────────────────────────────────
export const CAMERA_PATH = [
  { scroll: 0.00, position: [0, 6, 42],   target: [0, 0, 18]  },
  { scroll: 0.12, position: [0, 5, 32],   target: [0, 0, 10]  },
  { scroll: 0.24, position: [0, 4, 22],   target: [0, 0, 0]   },
  { scroll: 0.40, position: [-1, 3, 10],  target: [0, 0, -5]  },
  { scroll: 0.58, position: [2, 3, -2],   target: [0, 0, -12] },
  { scroll: 0.72, position: [0, 4, -12],  target: [0, 0, -10] },
  { scroll: 0.85, position: [5, 4, -18],  target: [0, 0, -18] },
  { scroll: 1.00, position: [0, 8, -28],  target: [0, 0, -10] },
];

// ─── Section Anchors ─────────────────────────────────────────────────────────
export const SECTIONS = {
  hero:       { position: [-14, 2, 24],   scrollRange: [0.00, 0.15] },
  whatiBuild: { position: [-16, 2, 6],    scrollRange: [0.22, 0.40] },
  experience: { position: [12, 2, 4],     scrollRange: [0.32, 0.52] },
  projects:   { position: [-16, 2, -6],   scrollRange: [0.48, 0.68] },
  skills:     { position: [12, 2, -8],    scrollRange: [0.60, 0.78] },
  direction:  { position: [-16, 2, -16],  scrollRange: [0.72, 0.88] },
  contact:    { position: [0, 2, -26],    scrollRange: [0.85, 1.00] },
};
