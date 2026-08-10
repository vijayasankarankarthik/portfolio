/**
 * SystemScene.jsx — Main 3D Portfolio Canvas
 *
 * Strategy:
 * - ScrollControls creates a scrollable div inside the Canvas
 * - The 3D scene (nodes, edges, camera) is inside the ScrollControls
 * - HTML overlays use <Scroll html> which renders in a DOM div that scrolls
 *   in sync with the 3D scene, perfectly aligned
 * - Camera lerps through keyframes as scroll.offset progresses
 */
import { useRef, Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useReducedMotion } from 'framer-motion';

import { NODES, EDGES } from './sceneConfig';
import SystemNode from './SystemNode';
import SystemEdge from './SystemEdge';
import GridFloor from './GridFloor';
import CameraController from './CameraController';

import HeroOverlay from './sections/HeroOverlay';
import WhatIBuildOverlay from './sections/WhatIBuildOverlay';
import ExperienceOverlay from './sections/ExperienceOverlay';
import ProjectsOverlay from './sections/ProjectsOverlay';
import SkillsOverlay from './sections/SkillsOverlay';
import DirectionOverlay from './sections/DirectionOverlay';
import ContactOverlay from './sections/ContactOverlay';

// Build node lookup map for edge rendering
const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

// Low-end device detection (client-only, conservative)
function getIsLowEnd() {
  if (typeof window === 'undefined') return false;
  return (navigator.hardwareConcurrency ?? 4) <= 2;
}
const isLowEnd = getIsLowEnd();

// Total scroll pages — each page = 100vh of scroll
const SCROLL_PAGES = 9;

// ─── Error boundary for postprocessing (can fail on some GPU configs) ────────
class PostFXBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? null : this.props.children; }
}

// ─── Bloom effect — isolated by PostFXBoundary ───────────────────────────────
function BloomEffect() {
  return (
    <EffectComposer>
      <Bloom intensity={0.7} luminanceThreshold={0.35} luminanceSmoothing={0.85} mipmapBlur />
    </EffectComposer>
  );
}

// ─── 3D Scene Objects ────────────────────────────────────────────────────────
function Scene3D({ mouseRef, prefersReduced }) {
  return (
    <>
      <CameraController mouse={mouseRef} />
      <GridFloor />

      {/* Architecture nodes */}
      {NODES.map((node) => (
        <SystemNode key={node.id} node={node} prefersReduced={prefersReduced} />
      ))}

      {/* Connection edges with animated data packets */}
      {EDGES.map((edge) => {
        const from = nodeMap[edge.from];
        const to = nodeMap[edge.to];
        if (!from || !to) return null;
        return (
          <SystemEdge
            key={edge.id}
            edge={edge}
            fromNode={from}
            toNode={to}
            speed={edge.speed ?? 1.0}
            prefersReduced={prefersReduced}
          />
        );
      })}

      {/* Bloom glow — disabled on low-end / reduced motion, isolated by error boundary */}
      {!isLowEnd && !prefersReduced && (
        <PostFXBoundary>
          <Suspense fallback={null}>
            <BloomEffect />
          </Suspense>
        </PostFXBoundary>
      )}
    </>
  );
}

// ─── HTML Overlay Layer ───────────────────────────────────────────────────────
// <Scroll html> renders a DOM div that scrolls with the R3F scroll container.
// Sections are positioned with absolute top values to appear at the right scroll depth.
function HtmlOverlays() {
  return (
    <Scroll html style={{ width: '100%' }}>
      <div style={{ position: 'relative', height: `${SCROLL_PAGES * 100}vh` }}>

        {/* HERO — page 0 */}
        <div className="scroll-section" style={{ top: '8vh', left: '5vw' }}>
          <HeroOverlay />
        </div>

        {/* WHAT I BUILD — page ~1.2 */}
        <div className="scroll-section" style={{ top: '115vh', left: '5vw' }}>
          <WhatIBuildOverlay />
        </div>

        {/* EXPERIENCE — page ~2.5, right side */}
        <div className="scroll-section" style={{ top: '240vh', right: '5vw', left: 'auto' }}>
          <ExperienceOverlay />
        </div>

        {/* PROJECTS — page ~3.8, left side */}
        <div className="scroll-section" style={{ top: '365vh', left: '5vw' }}>
          <ProjectsOverlay />
        </div>

        {/* SKILLS — page ~5, right side */}
        <div className="scroll-section" style={{ top: '490vh', right: '5vw', left: 'auto' }}>
          <SkillsOverlay />
        </div>

        {/* DIRECTION — page ~6.5, left side */}
        <div className="scroll-section" style={{ top: '620vh', left: '5vw' }}>
          <DirectionOverlay />
        </div>

        {/* CONTACT — page ~7.8, centered */}
        <div className="scroll-section" style={{ top: '750vh', left: '50%', transform: 'translateX(-50%)' }}>
          <ContactOverlay />
        </div>

      </div>
    </Scroll>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function SystemScene() {
  const prefersReduced = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    };
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 6, 42], fov: 52, near: 0.1, far: 300 }}
        gl={{
          antialias: !isLowEnd,
          powerPreference: 'high-performance',
          alpha: false,
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: '#060d0b' }}
        dpr={isLowEnd ? [1, 1] : [1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor('#060d0b', 1);
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={SCROLL_PAGES} damping={0.15}>
            {/* 3D scene — camera driven by scroll */}
            <Scene3D mouseRef={mouseRef} prefersReduced={!!prefersReduced} />

            {/* HTML overlay layer — scrolls with the scene */}
            <HtmlOverlays />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
