"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SublyObjectProps {
  reduceMotion?: boolean;
  isMobile?: boolean;
}

export function SublyObject({ reduceMotion = false, isMobile = false }: SublyObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rings = isMobile ? 3 : 4;
  const torusArgs: [number, number, number, number] = isMobile
    ? [0.75, 0.18, 12, 40]
    : [0.85, 0.18, 16, 64];

  useFrame((_, delta) => {
    if (reduceMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: rings }).map((_, i) => {
        const offsetY = (i - (rings - 1) / 2) * 0.55;
        const rotX = (i * Math.PI) / (rings * 1.5);
        return (
          <mesh key={i} position={[0, offsetY, 0]} rotation={[rotX, 0, 0]}>
            <torusGeometry args={torusArgs} />
            <meshStandardMaterial
              color="#c79a56"
              metalness={0.7}
              roughness={0.3}
              emissive="#7a5b28"
              emissiveIntensity={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}
