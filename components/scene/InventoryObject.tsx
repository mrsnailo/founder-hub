"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InventoryObjectProps {
  reduceMotion?: boolean;
  isMobile?: boolean;
}

export function InventoryObject({
  reduceMotion = false,
  isMobile = false,
}: InventoryObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  // Lattice: outer wireframe cage + inner solid box
  const segments = isMobile ? 2 : 3;

  useFrame((_, delta) => {
    if (reduceMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Solid inner box */}
      <mesh>
        <boxGeometry args={[1.1, 1.1, 1.1, segments, segments, segments]} />
        <meshStandardMaterial
          color="#4c7a79"
          metalness={0.5}
          roughness={0.4}
          emissive="#2a4a49"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Wireframe cage */}
      <mesh scale={1.35}>
        <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
        <meshBasicMaterial
          color="#c79a56"
          wireframe={true}
          transparent
          opacity={0.45}
        />
      </mesh>
      {/* Corner vertices as small spheres */}
      {[
        [-0.68, -0.68, -0.68],
        [0.68, -0.68, -0.68],
        [-0.68, 0.68, -0.68],
        [0.68, 0.68, -0.68],
        [-0.68, -0.68, 0.68],
        [0.68, -0.68, 0.68],
        [-0.68, 0.68, 0.68],
        [0.68, 0.68, 0.68],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#c79a56"
            emissive="#c79a56"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
