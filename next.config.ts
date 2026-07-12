import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Needed for three.js / @react-three packages that use ESM
  transpilePackages: ["three"],
  experimental: {
    // Helps with large 3D bundle
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
