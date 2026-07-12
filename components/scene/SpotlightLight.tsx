"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function SpotlightLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { pointer, viewport } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 3));

  useFrame(() => {
    if (!lightRef.current) return;
    // Convert pointer (-1..1) to world coords
    targetPos.current.set(
      pointer.x * viewport.width * 0.5,
      pointer.y * viewport.height * 0.5,
      3
    );
    // Damp toward target
    lightRef.current.position.lerp(targetPos.current, 0.05);
  });

  return (
    <>
      {/* Cool key light */}
      <directionalLight
        color="#7099c0"
        intensity={0.6}
        position={[-5, 5, 5]}
      />
      {/* Brass desk lamp — follows cursor */}
      <pointLight
        ref={lightRef}
        color="#c79a56"
        intensity={60}
        distance={12}
        decay={2}
        position={[0, 0, 3]}
      />
      {/* Ambient fill — very dim */}
      <ambientLight color="#1e232b" intensity={0.3} />
    </>
  );
}
