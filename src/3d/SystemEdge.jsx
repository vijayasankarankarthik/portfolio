/**
 * SystemEdge.jsx — Improved tube connections with semantic colors
 *
 * Sync connections (solid): deep teal tubes, cyan-teal packets
 * Async connections (dashed): slightly lighter tube, rose-tinted packets
 */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from './sceneConfig';

function buildPath(fromPos, toPos) {
  const [fx, fy, fz] = fromPos;
  const [tx, ty, tz] = toPos;
  const midX = (fx + tx) / 2;
  const midY = (fy + ty) / 2 + 0.5;
  const midZ = (fz + tz) / 2;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(fx, fy, fz),
    new THREE.Vector3(midX, midY, midZ),
    new THREE.Vector3(tx, ty, tz),
  ]);
}

export default function SystemEdge({ edge, fromNode, toNode, speed = 1.0, prefersReduced = false }) {
  const packetRef = useRef();
  const tRef = useRef(Math.random());

  const curve = useMemo(
    () => buildPath(fromNode.position, toNode.position),
    [fromNode, toNode]
  );

  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 40, 0.016, 5, false),
    [curve]
  );

  useFrame((_, delta) => {
    if (!packetRef.current || prefersReduced) return;
    tRef.current = (tRef.current + delta * speed * 0.16) % 1;
    const pt = curve.getPoint(tRef.current);
    packetRef.current.position.copy(pt);
    // Fade in/out at endpoints
    const t = tRef.current;
    packetRef.current.material.opacity =
      t < 0.06 ? t / 0.06 : t > 0.94 ? (1 - t) / 0.06 : 1;
  });

  // Sync edges: dark teal tube / cyan packet
  // Async edges: slightly more visible tube / pink packet
  const tubeColor  = edge.dashed ? '#162a22' : '#0d2218';
  const tubeOpacity = edge.dashed ? 0.45 : 0.65;
  const packetColor = edge.dashed ? COLORS.queue : COLORS.particle;
  const packetSize  = edge.dashed ? 0.07 : 0.09;

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color={tubeColor}
          emissive={tubeColor}
          emissiveIntensity={0.5}
          roughness={0.5}
          metalness={0.2}
          transparent
          opacity={tubeOpacity}
        />
      </mesh>

      {/* Data packet */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[packetSize, 8, 8]} />
        <meshStandardMaterial
          color={packetColor}
          emissive={packetColor}
          emissiveIntensity={2.5}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}
