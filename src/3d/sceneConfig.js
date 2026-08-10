/**
 * sceneConfig.js
 *
 * Single source of truth for the 3D distributed system scene.
 * Nodes represent real architecture components; edges represent
 * service-to-service communication paths. Camera keyframes drive
 * the scroll-based journey through the architecture.
 */

// ─── Color Palette ───────────────────────────────────────────────────────────
export const COLORS = {
  gateway:  '#7fe6b8',   // signal green  — entry points
  service:  '#e2b04f',   // amber         — business logic
  database: '#5b8fd4',   // steel blue    — persistent storage
  cache:    '#a78bfa',   // violet        — ephemeral/fast
  queue:    '#f87171',   // rose          — async messaging
  worker:   '#fb923c',   // orange        — background processing
  client:   '#f4f2ea',   // paper         — external caller
  edge:     '#1e3a30',   // dark teal     — connection lines
  particle: '#7fe6b8',   // signal green  — data packets
  bg:       '#060d0b',   // near-black    — scene background
  fog:      '#060d0b',
  grid:     '#0d2018',
};

// ─── Node Definitions ─────────────────────────────────────────────────────────
// position: [x, y, z]  — z is "depth" (camera travels down negative z)
// kind: determines color and shape
// tooltip: shown on hover
export const NODES = [
  // ── Layer 0: Client ──────────────────────────────────────────────────────
  {
    id: 'client',
    label: 'CLIENT',
    sub: 'HTTP Request',
    kind: 'client',
    position: [0, 0, 28],
    scale: 1.0,
    tooltip: 'External client — browser, mobile app, or another service sending an HTTP request into the system.',
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
    tooltip: 'Single entry point for all inbound traffic. Handles TLS termination, rate limiting, request validation, and routing to upstream services.',
    techStack: 'Spring Boot · Nginx · Java',
  },

  // ── Layer 2: Auth ─────────────────────────────────────────────────────────
  {
    id: 'auth',
    label: 'AUTH SERVICE',
    sub: 'JWT · Spring Security',
    kind: 'gateway',
    position: [0, 0, 10],
    scale: 1.1,
    tooltip: 'Validates JWT tokens and enforces role-based access control. Blocks unauthorized requests before they reach any downstream service.',
    techStack: 'Spring Security · JWT · RBAC',
  },

  // ── Layer 3: Services ─────────────────────────────────────────────────────
  {
    id: 'user-svc',
    label: 'USER SERVICE',
    sub: 'Registration · Profile',
    kind: 'service',
    position: [-9, 0, 0],
    scale: 1.0,
    tooltip: 'Manages user accounts, registration, profile updates, and account state. Owns the user domain.',
    techStack: 'Java · Spring Boot · JPA',
  },
  {
    id: 'core-svc',
    label: 'CORE SERVICE',
    sub: 'Business Logic',
    kind: 'service',
    position: [0, 0, 0],
    scale: 1.0,
    tooltip: 'Central domain logic service. Orchestrates workflows across other services and enforces business invariants.',
    techStack: 'Java · Spring Boot',
  },
  {
    id: 'search-svc',
    label: 'SEARCH SERVICE',
    sub: 'Query · Index',
    kind: 'service',
    position: [9, 0, 0],
    scale: 1.0,
    tooltip: 'Handles full-text search and filtered queries. Maintains a read-optimized index separate from the primary data store.',
    techStack: 'Java · PostgreSQL FTS',
  },

  // ── Layer 4: Data ─────────────────────────────────────────────────────────
  {
    id: 'cache',
    label: 'CACHE',
    sub: 'Redis · TTL · Invalidation',
    kind: 'cache',
    position: [-9, 0, -10],
    scale: 0.9,
    tooltip: 'In-memory cache for hot data. Reduces database load and latency for frequently-read records. Requires careful invalidation strategy.',
    techStack: 'Redis · TTL patterns',
  },
  {
    id: 'database',
    label: 'DATABASE',
    sub: 'PostgreSQL · MySQL',
    kind: 'database',
    position: [0, 0, -10],
    scale: 1.1,
    tooltip: 'Primary relational data store. Normalized schema, indexed foreign keys, transactions. Spring Data JPA + Hibernate ORM layer.',
    techStack: 'PostgreSQL · MySQL · JPA · Hibernate',
  },
  {
    id: 'queue',
    label: 'MESSAGE QUEUE',
    sub: 'Async · Event-driven',
    kind: 'queue',
    position: [9, 0, -10],
    scale: 0.9,
    tooltip: 'Decouples services via async messaging. Producers emit events; consumers process independently, enabling backpressure and retry.',
    techStack: 'RabbitMQ / Kafka patterns',
  },

  // ── Layer 5: Workers ─────────────────────────────────────────────────────
  {
    id: 'worker',
    label: 'WORKER',
    sub: 'Background jobs',
    kind: 'worker',
    position: [9, 0, -20],
    scale: 0.85,
    tooltip: 'Consumes messages from the queue. Handles slow, async operations like emails, report generation, and data processing jobs.',
    techStack: 'Spring Batch · Scheduled tasks',
  },
];

// ─── Edge Definitions ────────────────────────────────────────────────────────
// fromId → toId, optional: dashed (async), bidirectional
export const EDGES = [
  // Client → Gateway
  { id: 'client-gateway',    from: 'client',    to: 'gateway',  dashed: false, speed: 1.4 },
  // Gateway → Auth
  { id: 'gateway-auth',      from: 'gateway',   to: 'auth',     dashed: false, speed: 1.2 },
  // Auth → Services (fan-out)
  { id: 'auth-user',         from: 'auth',      to: 'user-svc', dashed: false, speed: 1.0 },
  { id: 'auth-core',         from: 'auth',      to: 'core-svc', dashed: false, speed: 1.0 },
  { id: 'auth-search',       from: 'auth',      to: 'search-svc',dashed: false, speed: 1.0 },
  // User Service → Cache
  { id: 'user-cache',        from: 'user-svc',  to: 'cache',    dashed: false, speed: 0.9 },
  // Core → DB
  { id: 'core-db',           from: 'core-svc',  to: 'database', dashed: false, speed: 0.9 },
  // Search → DB (read)
  { id: 'search-db',         from: 'search-svc',to: 'database', dashed: false, speed: 0.7 },
  // Search → Queue (async)
  { id: 'search-queue',      from: 'search-svc',to: 'queue',    dashed: true,  speed: 0.8 },
  // Queue → Worker
  { id: 'queue-worker',      from: 'queue',     to: 'worker',   dashed: true,  speed: 0.7 },
  // Cache ↔ DB (cache miss sync)
  { id: 'cache-db',          from: 'cache',     to: 'database', dashed: true,  speed: 0.5 },
];

// Particles: which edges get animated packets and when (staggered delays)
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
// scroll: 0..1 maps to these keyframes (lerped)
// position/target are [x, y, z]
export const CAMERA_PATH = [
  { scroll: 0.00, position: [0, 6, 42],   target: [0, 0, 18]  },  // Hero: looking down at gateway
  { scroll: 0.12, position: [0, 5, 32],   target: [0, 0, 10]  },  // Gateway visible
  { scroll: 0.24, position: [0, 4, 22],   target: [0, 0, 0]   },  // Auth → services
  { scroll: 0.40, position: [-1, 3, 10],  target: [0, 0, -5]  },  // Services layer
  { scroll: 0.58, position: [2, 3, -2],   target: [0, 0, -12] },  // Data layer incoming
  { scroll: 0.72, position: [0, 4, -12],  target: [0, 0, -10] },  // Data layer close
  { scroll: 0.85, position: [5, 4, -18],  target: [0, 0, -18] },  // Worker layer
  { scroll: 1.00, position: [0, 8, -28],  target: [0, 0, -10] },  // Bottom / contact
];

// ─── Section Anchors ─────────────────────────────────────────────────────────
// HTML overlay sections anchored at 3D positions
// These are rendered via <Html> in the scene
export const SECTIONS = {
  hero:       { position: [-14, 2, 24],   scrollRange: [0.00, 0.15] },
  whatiBuild: { position: [-16, 2, 6],    scrollRange: [0.22, 0.40] },
  experience: { position: [12, 2, 4],     scrollRange: [0.32, 0.52] },
  projects:   { position: [-16, 2, -6],   scrollRange: [0.48, 0.68] },
  skills:     { position: [12, 2, -8],    scrollRange: [0.60, 0.78] },
  direction:  { position: [-16, 2, -16],  scrollRange: [0.72, 0.88] },
  contact:    { position: [0, 2, -26],    scrollRange: [0.85, 1.00] },
};
