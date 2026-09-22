import { ProductDetailsWithCart } from "@/app/products/[productId]/product-details-with-cart";
import { mockProducts } from "@/features/products/services/products.mock-data";

export function generateStaticParams() {
  return mockProducts.map((product) => ({ productId: product.id }));
}

export default async function ProductDetailsRoute({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ProductDetailsWithCart productId={productId} />;
}
