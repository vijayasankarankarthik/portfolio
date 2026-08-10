/**
 * CameraController.jsx
 *
 * Reads scroll progress from @react-three/drei's ScrollControls
 * and smoothly lerps the camera through the CAMERA_PATH keyframes.
 * Also adds subtle mouse parallax on the camera look-at target.
 */
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { CAMERA_PATH } from './sceneConfig';

function lerpKeyframes(path, t) {
  // Find surrounding keyframes
  let a = path[0], b = path[path.length - 1];
  for (let i = 0; i < path.length - 1; i++) {
    if (t >= path[i].scroll && t <= path[i + 1].scroll) {
      a = path[i];
      b = path[i + 1];
      break;
    }
  }
  const range = b.scroll - a.scroll;
  const local = range === 0 ? 0 : (t - a.scroll) / range;
  const ease = local < 0.5
    ? 2 * local * local
    : -1 + (4 - 2 * local) * local; // smoothstep

  return {
    position: [
      a.position[0] + (b.position[0] - a.position[0]) * ease,
      a.position[1] + (b.position[1] - a.position[1]) * ease,
      a.position[2] + (b.position[2] - a.position[2]) * ease,
    ],
    target: [
      a.target[0] + (b.target[0] - a.target[0]) * ease,
      a.target[1] + (b.target[1] - a.target[1]) * ease,
      a.target[2] + (b.target[2] - a.target[2]) * ease,
    ],
  };
}

export default function CameraController({ mouse }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3(...CAMERA_PATH[0].position));
  const currentLook = useRef(new THREE.Vector3(...CAMERA_PATH[0].target));

  useFrame(() => {
    const t = scroll.offset;
    const { position, target } = lerpKeyframes(CAMERA_PATH, t);

    // Add subtle mouse parallax (±0.8 units) to position
    const mx = (mouse?.current?.x ?? 0) * 0.8;
    const my = (mouse?.current?.y ?? 0) * 0.4;

    targetPos.current.set(
      position[0] + mx,
      position[1] + my,
      position[2]
    );
    targetLook.current.set(target[0], target[1], target[2]);

    // Smooth lerp
    currentPos.current.lerp(targetPos.current, 0.04);
    currentLook.current.lerp(targetLook.current, 0.04);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
