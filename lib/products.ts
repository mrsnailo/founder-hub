export type ProductStatus = "built" | "early";

export interface Product {
  id: string;
  model: string;
  function: string;
  market: string;
  stack: string[];
  status: ProductStatus;
  statusLabel: string;
  href: string; // TBD — fill in before going live
  object: "subly" | "inventory" | "clawmate";
}

export const products: Product[] = [
  {
    id: "subly-store",
    model: "Subly Store",
    function: "Digital subscription storefront for shop owners",
    market: "Bangladesh",
    stack: ["Next.js 16", "PostgreSQL", "NextAuth", "Tailwind"],
    status: "built",
    statusLabel: "Built — prototype",
    href: "#", // TBD — insert live URL before deploy
    object: "subly",
  },
  {
    id: "inventory-pro",
    model: "Inventory Pro",
    function: "Modern inventory management for small businesses",
    market: "Global / small business",
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "shadcn/ui"],
    status: "built",
    statusLabel: "Built — prototype",
    href: "#", // TBD
    object: "inventory",
  },
  {
    id: "clawmate",
    model: "ClawMate",
    function: "AI-powered content engine for WordPress (BYOK)",
    market: "WordPress site owners / agencies",
    stack: ["PHP", "React", "WP Plugin API"],
    status: "early",
    statusLabel: "v0.1.0 — early",
    href: "#", // TBD
    object: "clawmate",
  },
];
