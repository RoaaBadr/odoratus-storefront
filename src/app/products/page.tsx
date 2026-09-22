import { Suspense } from "react";
import { ProductsPage } from "@/features/products";

export default function ProductsRoute() {
  return (
    <Suspense fallback={<p className="p-8 text-sm">Loading products...</p>}>
      <ProductsPage />
    </Suspense>
  );
}
