"use client";

import { useCart } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  const { addItem } = useCart();

  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions, quantity }) => (
        <button
          type="button"
          className="flex h-[50px] w-full items-center justify-center rounded bg-[#1a1a1a] text-xs font-semibold uppercase text-white transition-colors hover:bg-[#302e2b]"
          onClick={() => {
            for (let index = 0; index < quantity; index += 1) {
              addItem({
                productId: product.id,
                name: product.name,
                price:
                  product.volumeOptions?.find(
                    (volume) => volume.id === selectedOptions.volume,
                  )?.price ?? product.price,
                image: product.images[0],
                selectedOptions,
              });
            }
          }}
        >
          Add to Cart / $
          {product.volumeOptions?.find(
            (volume) => volume.id === selectedOptions.volume,
          )?.price ?? product.price}
        </button>
      )}
    />
  );
}
