import type { ProductStatus } from "@/lib/products";

interface StatusDotProps {
  status: ProductStatus;
  label: string;
}

export function StatusDot({ status, label }: StatusDotProps) {
  return (
    <span className={`status-dot${status === "early" ? " early" : ""}`}>
      {label}
    </span>
  );
}
