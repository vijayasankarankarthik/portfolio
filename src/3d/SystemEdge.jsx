/**
 * SystemEdge.jsx
 *
 * A connection between two nodes in the 3D scene.
 * - TubeGeometry along a CatmullRomCurve3 path
 * - Animated data-packet (sphere) that travels along the tube
 * - Dashed edges use a different material for async paths
 */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from './sceneConfig';

function buildPath(fromPos, toPos) {
  const [fx, fy, fz] = fromPos;
  const [tx, ty, tz] = toPos;
  // Add a subtle midpoint arc for visual clarity
  const midX = (fx + tx) / 2;
  const midY = (fy + ty) / 2 + 0.4;
  const midZ = (fz + tz) / 2;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(fx, fy, fz),
    new THREE.Vector3(midX, midY, midZ),
    new THREE.Vector3(tx, ty, tz),
  ]);
}

export default function SystemEdge({ edge, fromNode, toNode, speed = 1.0, prefersReduced = false }) {
  const packetRef = useRef();
  const tRef = useRef(Math.random()); // stagger packets

  const curve = useMemo(
    () => buildPath(fromNode.position, toNode.position),
    [fromNode, toNode]
  );

  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 32, 0.018, 6, false),
    [curve]
  );

  const points = useMemo(() => curve.getPoints(100), [curve]);

  useFrame((_, delta) => {
    if (!packetRef.current || prefersReduced) return;
    tRef.current = (tRef.current + delta * speed * 0.18) % 1;
    const pt = curve.getPoint(tRef.current);
    packetRef.current.position.copy(pt);
    packetRef.current.material.opacity =
      tRef.current < 0.05 || tRef.current > 0.95
        ? Math.sin(tRef.current < 0.05 ? tRef.current * 20 * Math.PI : (1 - tRef.current) * 20 * Math.PI)
        : 1;
  });

  const edgeColor = edge.dashed ? '#1d3a2d' : '#153026';
  const packetColor = edge.dashed ? COLORS.queue : COLORS.particle;

  return (
    <group>
      {/* Tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color={edgeColor}
          emissive={edgeColor}
          emissiveIntensity={0.3}
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={edge.dashed ? 0.4 : 0.6}
        />
      </mesh>

      {/* Data packet sphere */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.085, 8, 8]} />
        <meshStandardMaterial
          color={packetColor}
          emissive={packetColor}
          emissiveIntensity={1.2}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}
