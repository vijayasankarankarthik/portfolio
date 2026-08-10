/**
 * SystemNode.jsx
 *
 * A single architecture node in the 3D scene.
 * - RoundedBox mesh with emissive material
 * - Animated heartbeat pulse
 * - Label (Three Text) above the node
 * - On hover: tooltip via drei Html + node brightens
 */
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from './sceneConfig';

const KIND_COLOR = {
  gateway:  COLORS.gateway,
  service:  COLORS.service,
  database: COLORS.database,
  cache:    COLORS.cache,
  queue:    COLORS.queue,
  worker:   COLORS.worker,
  client:   COLORS.client,
};

const KIND_SIZE = {
  gateway:  [1.8, 0.55, 0.3],
  service:  [1.7, 0.5,  0.3],
  database: [1.6, 0.7,  0.4],
  cache:    [1.4, 0.45, 0.3],
  queue:    [1.6, 0.45, 0.3],
  worker:   [1.4, 0.42, 0.28],
  client:   [1.4, 0.45, 0.25],
};

export default function SystemNode({ node, prefersReduced = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const baseColor = KIND_COLOR[node.kind] ?? '#7fe6b8';
  const color = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const size = KIND_SIZE[node.kind] ?? [1.6, 0.5, 0.3];

  // Heartbeat pulse on emissive intensity
  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReduced) return;
    const t = clock.getElapsedTime();
    const pulse = 0.18 + Math.sin(t * 1.2 + node.position[0]) * 0.06;
    meshRef.current.material.emissiveIntensity = hovered ? 0.55 : pulse;
  });

  return (
    <group position={node.position} scale={node.scale ?? 1}>
      {/* Main box */}
      <RoundedBox
        ref={meshRef}
        args={size}
        radius={0.08}
        smoothness={4}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Outer wireframe ring for depth */}
      <RoundedBox
        args={[size[0] + 0.18, size[1] + 0.18, size[2] + 0.05]}
        radius={0.1}
        smoothness={4}
      >
        <meshBasicMaterial
          color={baseColor}
          wireframe
          transparent
          opacity={hovered ? 0.25 : 0.07}
        />
      </RoundedBox>

      {/* Label — no local font file, uses drei default CDN font */}
      <Text
        position={[0, size[1] * 0.5 + 0.22, 0]}
        fontSize={0.22}
        color={baseColor}
        anchorX="center"
        anchorY="bottom"
        letterSpacing={0.04}
        maxWidth={4}
      >
        {node.label}
      </Text>

      {/* Sub-label */}
      {node.sub && (
        <Text
          position={[0, -(size[1] * 0.5 + 0.18), 0]}
          fontSize={0.14}
          color="#8a9690"
          anchorX="center"
          anchorY="top"
          letterSpacing={0.02}
        >
          {node.sub}
        </Text>
      )}

      {/* Hover tooltip (HTML overlay) */}
      {hovered && (
        <Html
          position={[0, size[1] * 0.5 + 0.8, 0]}
          center
          distanceFactor={8}
          zIndexRange={[100, 200]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(6,13,11,0.95)',
              border: `1px solid ${baseColor}40`,
              borderLeft: `2px solid ${baseColor}`,
              borderRadius: '4px',
              padding: '10px 14px',
              width: '220px',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          >
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: baseColor,
                marginBottom: '6px',
              }}
            >
              {node.label}
            </p>
            <p
              style={{
                fontFamily: 'sans-serif',
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#c8cdc9',
              }}
            >
              {node.tooltip}
            </p>
            {node.techStack && (
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: '#4fae87',
                  marginTop: '8px',
                  letterSpacing: '0.06em',
                }}
              >
                {node.techStack}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
