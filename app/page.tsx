"use client";

import dynamic from "next/dynamic";
import { products } from "@/lib/products";
import { Intro } from "@/components/sections/Intro";
import { ProductSection } from "@/components/sections/ProductSection";
import { Footer } from "@/components/sections/Footer";

// Dynamic import to avoid SSR issues with Three.js / canvas
const Scene = dynamic(
  () => import("@/components/scene/Scene").then((m) => m.Scene),
  { ssr: false }
);

// Sections: intro + one per product + footer = N pages for ScrollControls
const TOTAL_SECTIONS = 1 + products.length + 1;

export default function Home() {
  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#intro"
        id="skip-nav"
        style={{
          position: "absolute",
          top: "-999px",
          left: 0,
          zIndex: 9999,
          background: "var(--accent)",
          color: "var(--bg)",
          padding: "0.5rem 1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          borderRadius: "0 0 4px 0",
        }}
        onFocus={(e) => (e.currentTarget.style.top = "0")}
        onBlur={(e) => (e.currentTarget.style.top = "-999px")}
      >
        Skip to main content
      </a>

      {/* Fixed 3D canvas behind everything */}
      <Scene sections={TOTAL_SECTIONS} />

      {/* Scrollable content layers above the canvas */}
      <main id="main">
        {/* Intro */}
        <Intro />

        {/* Product sections */}
        {products.map((product, i) => (
          <ProductSection key={product.id} product={product} index={i} />
        ))}

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
