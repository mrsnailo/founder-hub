"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SpotlightLight } from "./SpotlightLight";
import { SublyObject } from "./SublyObject";
import { InventoryObject } from "./InventoryObject";
import { ClawMateObject } from "./ClawMateObject";

// Camera positions for each section: intro(0), subly(1), inventory(2), clawmate(3)
const SECTION_POSITIONS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 7),
  new THREE.Vector3(-1.5, 0.5, 5.5),
  new THREE.Vector3(1.5, -0.5, 5.5),
  new THREE.Vector3(0, 0.5, 5.5),
];

const OBJECT_POSITIONS: [number, number, number][] = [
  [-2, 0, 0],   // subly — section 1
  [2, 0, 0],    // inventory — section 2
  [0, 0, 0],    // clawmate — section 3
];

interface SceneInnerProps {
  reduceMotion: boolean;
  isMobile: boolean;
  sections: number;
}

function SceneInner({ reduceMotion, isMobile, sections }: SceneInnerProps) {
  const scroll = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const tmpPos = useRef(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3(0, 0, 7));
  const currentSectionRef = useRef(0);

  useFrame(({ camera }) => {
    const offset = scroll.offset;
    const sectionFloat = offset * (sections - 1);
    const sectionA = Math.floor(sectionFloat);
    const sectionB = Math.min(sectionA + 1, sections - 1);
    const t = sectionFloat - sectionA;

    currentSectionRef.current = Math.round(sectionFloat);

    const posA = SECTION_POSITIONS[sectionA] ?? SECTION_POSITIONS[SECTION_POSITIONS.length - 1];
    const posB = SECTION_POSITIONS[sectionB] ?? SECTION_POSITIONS[SECTION_POSITIONS.length - 1];

    tmpPos.current.lerpVectors(posA, posB, reduceMotion ? 1 : t);

    if (reduceMotion) {
      camera.position.copy(tmpPos.current);
    } else {
      currentPos.current.lerp(tmpPos.current, 0.06);
      camera.position.copy(currentPos.current);
    }
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <SpotlightLight />

      {/* Subly Store — section 1 */}
      <group position={OBJECT_POSITIONS[0]}>
        <SublyObject reduceMotion={reduceMotion} isMobile={isMobile} activeSection={currentSectionRef} sectionIndex={1} />
      </group>

      {/* Inventory Pro — section 2 */}
      <group position={OBJECT_POSITIONS[1]}>
        <InventoryObject reduceMotion={reduceMotion} isMobile={isMobile} activeSection={currentSectionRef} sectionIndex={2} />
      </group>

      {/* ClawMate — section 3 */}
      <group position={OBJECT_POSITIONS[2]}>
        <ClawMateObject reduceMotion={reduceMotion} isMobile={isMobile} activeSection={currentSectionRef} sectionIndex={3} />
      </group>
    </>
  );
}

interface SceneProps {
  sections: number;
}

export function Scene({ sections }: SceneProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglFailed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !gl;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (webglFailed) return null; // fallback SVGs shown by sections

  return (
    <div
      id="scene-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        gl={{ antialias: !isMobile, powerPreference: "default" }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 7], fov: 50 }}
      >
        <ScrollControls pages={sections} damping={reduceMotion ? 0 : 0.3}>
          <SceneInner
            reduceMotion={reduceMotion}
            isMobile={isMobile}
            sections={sections}
          />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
