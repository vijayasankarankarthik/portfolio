/**
 * GridFloor.jsx
 *
 * A layered technical grid environment:
 * - Infinite grid plane (GridHelper)
 * - Subtle ambient atmospheric fog (set on scene)
 * - Deep background gradient effect via a large sphere
 */
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from './sceneConfig';

export default function GridFloor() {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2(COLORS.bg, 0.028);
    return () => { scene.fog = null; };
  }, [scene]);

  return (
    <>
      {/* Main horizontal grid — the "floor" of the scene */}
      <Grid
        position={[0, -1.2, 0]}
        args={[100, 100]}
        cellSize={1}
        cellThickness={0.4}
        cellColor={COLORS.grid}
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor="#0d2a1e"
        fadeDistance={45}
        fadeStrength={1.5}
        infiniteGrid
      />

      {/* Background sphere — deep dark green gradient */}
      <mesh>
        <sphereGeometry args={[120, 16, 16]} />
        <meshBasicMaterial
          color="#040b08"
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ambient light — low fill */}
      <ambientLight intensity={0.25} color="#0d2018" />

      {/* Directional key light — from above */}
      <directionalLight
        position={[5, 20, 15]}
        intensity={0.6}
        color="#7fe6b8"
        castShadow={false}
      />

      {/* Rim light from below — gives depth to nodes */}
      <pointLight position={[0, -8, 0]} intensity={0.3} color="#1a4035" distance={60} />

      {/* Accent fill — warm to balance cool grid */}
      <pointLight position={[-20, 5, 5]} intensity={0.15} color="#e2b04f" distance={50} />
      <pointLight position={[20, 5, -10]} intensity={0.15} color="#5b8fd4" distance={50} />
    </>
  );
}
