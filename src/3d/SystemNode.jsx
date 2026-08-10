/**
 * SystemNode.jsx — Improved visual treatment with new color system
 *
 * Visual improvements:
 * - Metalness 0.5 for infrastructure feel
 * - Higher contrast emissive pulse
 * - Wireframe uses node color for type-visibility
 * - Tooltip uses new design tokens
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
  gateway:  [1.9, 0.56, 0.28],
  service:  [1.75, 0.50, 0.28],
  database: [1.65, 0.70, 0.38],
  cache:    [1.45, 0.44, 0.28],
  queue:    [1.65, 0.44, 0.28],
  worker:   [1.45, 0.42, 0.26],
  client:   [1.35, 0.44, 0.24],
};

// Emissive pulse parameters per kind
const KIND_PULSE = {
  gateway:  { base: 0.22, amp: 0.08, freq: 1.4 },
  service:  { base: 0.18, amp: 0.06, freq: 1.0 },
  database: { base: 0.20, amp: 0.05, freq: 0.7 },
  cache:    { base: 0.18, amp: 0.07, freq: 1.6 },
  queue:    { base: 0.16, amp: 0.06, freq: 1.2 },
  worker:   { base: 0.15, amp: 0.05, freq: 0.9 },
  client:   { base: 0.10, amp: 0.03, freq: 0.5 },
};

export default function SystemNode({ node, prefersReduced = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const baseColor = KIND_COLOR[node.kind] ?? COLORS.gateway;
  const color     = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const size      = KIND_SIZE[node.kind]  ?? [1.6, 0.5, 0.28];
  const pulse     = KIND_PULSE[node.kind] ?? { base: 0.18, amp: 0.06, freq: 1.0 };

  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReduced) return;
    const t = clock.getElapsedTime();
    const pv = pulse.base + Math.sin(t * pulse.freq + node.position[0] * 0.5) * pulse.amp;
    meshRef.current.material.emissiveIntensity = hovered ? 0.65 : pv;
  });

  return (
    <group position={node.position} scale={node.scale ?? 1}>
      {/* Main node body */}
      <RoundedBox
        ref={meshRef}
        args={size}
        radius={0.07}
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
          emissiveIntensity={pulse.base}
          roughness={0.35}
          metalness={0.55}
          transparent
          opacity={0.90}
        />
      </RoundedBox>

      {/* Wireframe outline — shows structure, brightens on hover */}
      <RoundedBox
        args={[size[0] + 0.15, size[1] + 0.15, size[2] + 0.04]}
        radius={0.09}
        smoothness={4}
      >
        <meshBasicMaterial
          color={baseColor}
          wireframe
          transparent
          opacity={hovered ? 0.22 : 0.055}
        />
      </RoundedBox>

      {/* Node label */}
      <Text
        position={[0, size[1] * 0.5 + 0.24, 0]}
        fontSize={0.21}
        color={baseColor}
        anchorX="center"
        anchorY="bottom"
        letterSpacing={0.05}
        maxWidth={4}
        outlineWidth={0.006}
        outlineColor="#050b09"
      >
        {node.label}
      </Text>

      {/* Sub-label */}
      {node.sub && (
        <Text
          position={[0, -(size[1] * 0.5 + 0.20), 0]}
          fontSize={0.13}
          color="#5a7a6e"
          anchorX="center"
          anchorY="top"
          letterSpacing={0.03}
          maxWidth={3.5}
        >
          {node.sub}
        </Text>
      )}

      {/* Hover tooltip */}
      {hovered && (
        <Html
          position={[0, size[1] * 0.5 + 0.85, 0]}
          center
          distanceFactor={8}
          zIndexRange={[100, 200]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(5,11,9,0.97)',
            border: `1px solid ${baseColor}35`,
            borderLeft: `2px solid ${baseColor}`,
            borderRadius: '5px',
            padding: '11px 15px',
            width: '230px',
            backdropFilter: 'blur(12px)',
            pointerEvents: 'none',
            boxShadow: `0 0 30px rgba(0,0,0,0.8), 0 0 10px ${baseColor}15`,
          }}>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: baseColor,
              marginBottom: '7px',
            }}>
              {node.label}
            </p>
            <p style={{
              fontFamily: 'sans-serif',
              fontSize: '12px',
              lineHeight: '1.65',
              color: '#9ab5aa',
            }}>
              {node.tooltip}
            </p>
            {node.techStack && (
              <p style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: baseColor,
                marginTop: '9px',
                letterSpacing: '0.06em',
                opacity: 0.75,
              }}>
                {node.techStack}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
