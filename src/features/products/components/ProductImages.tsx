import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const fallbackImage = product.images[0];
  const images = Array.from(
    { length: 3 },
    (_, index) => product.images[index] ?? fallbackImage,
  ).filter((image): image is string => Boolean(image));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const image = images[selectedIndex] ?? fallbackImage;

  if (!image) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54] lg:h-[600px]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative h-[360px] overflow-hidden rounded-lg sm:h-[480px] lg:h-[600px]">
        <Image
          src={image}
          alt={product.name}
          fill
          className="animate-[gallery-image-in_280ms_ease-out] object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((thumbnail, index) => (
          <button
            key={`${thumbnail}-${index}`}
            type="button"
            aria-label={`View ${product.name} image ${index + 1}`}
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-24 overflow-hidden rounded border-2 sm:h-[120px] ${
              selectedIndex === index
                ? "border-[#c5a880]"
                : "border-transparent"
            }`}
          >
            <Image
              src={thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, 33vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
