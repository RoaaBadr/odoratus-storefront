"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [giftWrapping, setGiftWrapping] = useState(true);
  const relatedProductsQuery = useProducts({ pageSize: 5 });

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return {
      ...selectedOptions,
      ...Object.fromEntries(
        product.options.map((option) => [
          option.id,
          selectedOptions[option.id] ?? option.values[0],
        ]),
      ),
    };
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  const relatedProducts = (relatedProductsQuery.data?.items ?? [])
    .filter((relatedProduct) => relatedProduct.id !== product.id)
    .slice(0, 4);
  const volumes = product.volumeOptions ?? [
    { id: "default", label: "100 ml", price: product.price },
  ];
  const selectedVolume =
    resolvedOptions.volume ?? volumes[volumes.length - 1]?.id ?? "default";

  return (
    <div className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs productName={product.name} />
      <section className="grid gap-10 px-4 pb-16 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-16 lg:px-20 lg:pb-[100px]">
        <ProductImages product={product} />
        <ProductDetails
          product={product}
          selectedVolume={selectedVolume}
          quantity={quantity}
          onVolumeChange={(volumeId) =>
            setSelectedOptions((current) => ({
              ...current,
              volume: volumeId,
            }))
          }
          onQuantityChange={setQuantity}
          giftWrapping={giftWrapping}
          onGiftWrappingChange={setGiftWrapping}
          action={actions?.({
            product,
            selectedOptions: { ...resolvedOptions, volume: selectedVolume },
            quantity,
          })}
        />
      </section>
      <section className="flex flex-col gap-12 bg-[#f4f0eb] px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
        <header className="flex flex-col items-center gap-3 text-center">
          <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-4xl sm:text-5xl">
            Olfactory Companions
          </h2>
          <p className="text-sm text-[#605a54]">
            FRAGRANCES OF SYNONYMOUS SOPHISTICATION
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
      <footer className="flex flex-col gap-16 bg-[#1a1a1a] px-4 py-16 text-[#f2ede4] sm:px-6 md:px-10 lg:px-20 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <p className="font-[family-name:var(--font-instrument-serif)] text-4xl">
              O D O R A T U S
            </p>
            <p className="mt-6 text-sm leading-[1.6] opacity-80">
              An independent olfactory house cultivating slow-luxury liquid
              narratives. Every bottle is hand-poured in small batches using
              sustainably sourced botanicals.
            </p>
          </div>
          {[
            ["Collections", "Le Maison", "Private Reserve", "Scented Candles"],
            ["Customer Care", "Olfactory Consultation", "Shipping & Returns", "Care Guide"],
            ["About Us", "Our Philosophy", "Sourcing Standards", "Journal"],
          ].map(([heading, ...links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase">{heading}</h3>
              <ul className="mt-5 space-y-3 text-xs opacity-80">
                {links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-5 text-[10px] opacity-60">
          © 2026 Odoratus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
