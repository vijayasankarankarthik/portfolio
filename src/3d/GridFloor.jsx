/**
 * GridFloor.jsx — Updated lighting for new color system
 *
 * Semantic lighting:
 *  - Key: cool teal overhead (matches gateway/network color)
 *  - Fill: deep charcoal from below for node depth
 *  - Accent L: steel blue (database direction)
 *  - Accent R: amber (worker direction)
 */
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from './sceneConfig';

export default function GridFloor() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.026);
    return () => { scene.fog = null; };
  }, [scene]);

  return (
    <>
      {/* Technical grid — the lab floor */}
      <Grid
        position={[0, -1.2, 0]}
        args={[140, 140]}
        cellSize={1}
        cellThickness={0.3}
        cellColor={COLORS.grid}
        sectionSize={5}
        sectionThickness={0.7}
        sectionColor={COLORS.gridSection}
        fadeDistance={55}
        fadeStrength={1.8}
        infiniteGrid
      />

      {/* Background sphere — deep dark space */}
      <mesh>
        <sphereGeometry args={[140, 16, 16]} />
        <meshBasicMaterial color="#030808" side={THREE.BackSide} />
      </mesh>

      {/* Ambient — very low, barely lifts the blacks */}
      <ambientLight intensity={0.12} color="#0a1f18" />

      {/* Key light — overhead cool teal, main illumination */}
      <directionalLight
        position={[2, 22, 12]}
        intensity={0.7}
        color="#00c8a0"
        castShadow={false}
      />

      {/* Fill from below — warm deep glow for node underside */}
      <pointLight position={[0, -6, 0]} intensity={0.25} color="#0f2820" distance={70} decay={2} />

      {/* Left accent — cool steel blue (database side) */}
      <pointLight position={[-22, 6, -8]} intensity={0.18} color="#3b82f6" distance={60} decay={2} />

      {/* Right accent — amber (worker/processing side) */}
      <pointLight position={[22, 6, -12]} intensity={0.16} color="#fb923c" distance={60} decay={2} />

      {/* Depth light — illuminates the lower layers */}
      <pointLight position={[0, 4, -25]} intensity={0.2} color="#004d3a" distance={55} decay={2} />
    </>
  );
}
