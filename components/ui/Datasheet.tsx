import type { Product } from "@/lib/products";
import { StatusDot } from "@/components/ui/StatusDot";

interface DatasheetProps {
  product: Product;
}

export function Datasheet({ product }: DatasheetProps) {
  return (
    <div>
      {/* Product header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
          Model
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          {product.model}
        </h2>
      </div>

      {/* Datasheet fields */}
      <div className="datasheet" style={{ marginBottom: "1.75rem" }}>
        <div className="datasheet-row">
          <span className="datasheet-label">Function</span>
          <span className="datasheet-value">{product.function}</span>
        </div>
        <div className="datasheet-row">
          <span className="datasheet-label">Market</span>
          <span className="datasheet-value">{product.market}</span>
        </div>
        <div className="datasheet-row">
          <span className="datasheet-label">Stack</span>
          <span className="datasheet-value">
            <span
              style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}
            >
              {product.stack.map((tag) => (
                <span key={tag} className="stack-tag">
                  {tag}
                </span>
              ))}
            </span>
          </span>
        </div>
        <div className="datasheet-row">
          <span className="datasheet-label">Status</span>
          <span className="datasheet-value">
            <StatusDot status={product.status} label={product.statusLabel} />
          </span>
        </div>
        <div className="datasheet-row">
          <span className="datasheet-label">Access</span>
          <span className="datasheet-value">
            <a
              href={product.href}
              className="cta-btn"
              style={{ display: "inline-flex", marginTop: "0.25rem" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${product.model}`}
            >
              Visit{" "}
              <span aria-hidden="true" style={{ fontSize: "1.1em" }}>
                →
              </span>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
