"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ClawMateObjectProps {
  reduceMotion?: boolean;
  isMobile?: boolean;
}

// Build a gear-like shape using ExtrudeGeometry
function createGearShape(teeth: number, innerR: number, outerR: number): THREE.Shape {
  const shape = new THREE.Shape();
  const toothDepth = outerR - innerR;
  const toothWidth = (Math.PI * 2) / teeth;

  shape.moveTo(outerR, 0);

  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2;
    const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
    const midAngle = angle + toothWidth * 0.5;

    // Tooth top arc
    shape.lineTo(
      Math.cos(angle + toothWidth * 0.2) * outerR,
      Math.sin(angle + toothWidth * 0.2) * outerR
    );
    shape.lineTo(
      Math.cos(midAngle - toothWidth * 0.1) * (outerR + toothDepth * 0.3),
      Math.sin(midAngle - toothWidth * 0.1) * (outerR + toothDepth * 0.3)
    );
    shape.lineTo(
      Math.cos(midAngle + toothWidth * 0.1) * (outerR + toothDepth * 0.3),
      Math.sin(midAngle + toothWidth * 0.1) * (outerR + toothDepth * 0.3)
    );
    shape.lineTo(
      Math.cos(nextAngle - toothWidth * 0.2) * outerR,
      Math.sin(nextAngle - toothWidth * 0.2) * outerR
    );
    shape.lineTo(
      Math.cos(nextAngle) * innerR,
      Math.sin(nextAngle) * innerR
    );
  }
  shape.closePath();

  // Punch a hole in the center
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR * 0.4, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return shape;
}

export function ClawMateObject({
  reduceMotion = false,
  isMobile = false,
}: ClawMateObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerGearRef = useRef<THREE.Mesh>(null);

  const teeth = isMobile ? 8 : 12;
  const outerGearShape = createGearShape(teeth, 0.55, 0.75);
  const innerGearShape = createGearShape(teeth - 3, 0.28, 0.42);

  const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 };

  useFrame((_, delta) => {
    if (reduceMotion) return;
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.05;
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0003) * 0.3;
    }
    if (innerGearRef.current) {
      innerGearRef.current.rotation.z -= delta * 0.12; // counter-rotate
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer gear */}
      <mesh position={[0, 0, 0]}>
        <extrudeGeometry args={[outerGearShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#8b9199"
          metalness={0.8}
          roughness={0.2}
          emissive="#3a3f48"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Inner counter-rotating gear */}
      <mesh ref={innerGearRef} position={[0, 0, 0.05]}>
        <extrudeGeometry args={[innerGearShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#c79a56"
          metalness={0.85}
          roughness={0.15}
          emissive="#7a5b28"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Center axle */}
      <mesh position={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#4c7a79" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}
