import type { Product } from "@/lib/products";
import { Datasheet } from "@/components/ui/Datasheet";

interface ProductSectionProps {
  product: Product;
  index: number;
}

// SVG fallback shapes for each product (shown if WebGL fails)
function FallbackShape({ object }: { object: Product["object"] }) {
  if (object === "subly") {
    return (
      <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx="100"
            cy={80 + i * 18}
            rx="65"
            ry="16"
            fill="none"
            stroke="#c79a56"
            strokeWidth="2"
            opacity={0.7 - i * 0.1}
          />
        ))}
      </svg>
    );
  }
  if (object === "inventory") {
    return (
      <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="#4c7a79" strokeWidth="2" />
        <line x1="50" y1="83" x2="150" y2="83" stroke="#2a2f38" strokeWidth="1" />
        <line x1="50" y1="116" x2="150" y2="116" stroke="#2a2f38" strokeWidth="1" />
        <line x1="83" y1="50" x2="83" y2="150" stroke="#2a2f38" strokeWidth="1" />
        <line x1="116" y1="50" x2="116" y2="150" stroke="#2a2f38" strokeWidth="1" />
        <rect x="30" y="30" width="140" height="140" fill="none" stroke="#c79a56" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#8b9199" strokeWidth="2" />
      <circle cx="100" cy="100" r="35" fill="none" stroke="#c79a56" strokeWidth="2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 100 + Math.cos(a) * 55;
        const y1 = 100 + Math.sin(a) * 55;
        const x2 = 100 + Math.cos(a) * 65;
        const y2 = 100 + Math.sin(a) * 65;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8b9199" strokeWidth="3" />;
      })}
    </svg>
  );
}

export function ProductSection({ product, index }: ProductSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      className="section-full content-layer"
      id={product.id}
      aria-label={`${product.model} product`}
      style={{ background: "transparent" }}
    >
      {/* Subtle panel tint */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: isEven
            ? "linear-gradient(135deg, rgba(30,35,43,0.55) 0%, transparent 60%)"
            : "linear-gradient(225deg, rgba(30,35,43,0.55) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="product-grid"
        style={{
          flexDirection: isEven ? "row" : "row-reverse",
        }}
      >
        {/* 3D object placeholder — actual object rendered in the fixed canvas */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
          }}
        >
          {/* Fallback visible only if canvas is not present */}
          <div className="fallback-3d" role="img" aria-label={`${product.model} illustration`}>
            <FallbackShape object={product.object} />
          </div>
        </div>

        {/* Datasheet */}
        <div>
          {/* Section number */}
          <p
            className="eyebrow"
            style={{ marginBottom: "0.75rem", opacity: 0.6 }}
          >
            {String(index + 1).padStart(2, "0")} / 03
          </p>

          <div className="panel" style={{ padding: "2rem" }}>
            <Datasheet product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
