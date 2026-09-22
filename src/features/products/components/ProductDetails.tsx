import type { Product } from "@/features/products/types/product.types";
import type { ReactNode } from "react";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  selectedVolume: string;
  quantity: number;
  onVolumeChange: (volumeId: string) => void;
  giftWrapping: boolean;
  onGiftWrappingChange: (enabled: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  action?: ReactNode;
};

export function ProductDetails({
  product,
  selectedVolume,
  quantity,
  onVolumeChange,
  giftWrapping,
  onGiftWrappingChange,
  onQuantityChange,
  action,
}: ProductDetailsProps) {
  const volumes = product.volumeOptions ?? [
    { id: "default", label: "100 ml", price: product.price },
  ];
  const selectedVolumeData =
    volumes.find((volume) => volume.id === selectedVolume) ?? volumes.at(-1)!;
  const scentNotes = product.scentNotes ?? {
    top: product.notes,
    heart: "Botanical heart notes",
    base: "Warm woods and musk",
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[11px] font-semibold uppercase">
            Scent Family: {product.scentFamily}
          </span>
          <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase text-[#605a54]">
            Occasion: {product.occasion.replace("-", " ")}
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[48px]">
          {product.name}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-[#1a1a1a]">
            {formatWholePrice(selectedVolumeData.price)}
          </p>
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-500">
            <span className="size-2 rounded-full bg-emerald-500" />
            {product.availability ?? "Available in Atelier"}
          </p>
        </div>
      </header>

      <div className="h-px w-full bg-[#ebe6de]" />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase">Select Volume</h2>
        <div className="grid grid-cols-3 gap-3">
          {volumes.map((volume) => (
            <button
              key={volume.id}
              type="button"
              aria-pressed={selectedVolume === volume.id}
              onClick={() => onVolumeChange(volume.id)}
              className={`flex flex-col items-center gap-1 rounded border p-3 text-sm ${
                selectedVolume === volume.id
                  ? "border-2 border-[#1a1a1a] bg-white font-bold"
                  : "border-[#ebe6de]"
              }`}
            >
              <span>{volume.label}</span>
              <span className="text-[11px] font-normal text-[#605a54]">
                {formatWholePrice(volume.price)}
              </span>
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        aria-pressed={giftWrapping}
        onClick={() => onGiftWrappingChange(!giftWrapping)}
        className="flex w-full items-center justify-between rounded-md bg-[#f4f0eb] p-5 text-left"
      >
        <div>
          <p className="text-xs font-semibold">
            Complimentary Signature Gift Wrapping
          </p>
          <p className="mt-1 text-[11px] text-[#605a54]">
            Encased in linen paper box with custom wax seal stamp.
          </p>
        </div>
        <span
          className={`relative h-6 w-11 rounded-full transition-colors ${
            giftWrapping ? "bg-[#c5a880]" : "bg-[#d8d0c6]"
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
              giftWrapping ? "right-0.5" : "left-0.5"
            }`}
          />
        </span>
      </button>

      <div className="flex gap-4">
        <div className="flex h-[50px] w-24 items-center justify-between rounded border border-[#ebe6de] px-4">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="flex-1">{action}</div>
      </div>

      <div className="h-px w-full bg-[#ebe6de]" />

      <section className="flex flex-col gap-5">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px]">
          Scent Anatomy
        </h2>
        <p className="text-sm leading-[1.6] text-[#605a54]">
          {product.scentAnatomy ?? product.description}
        </p>
        <div className="flex flex-col">
          {[
            ["Top Notes", scentNotes.top],
            ["Heart Notes", scentNotes.heart],
            ["Base Notes", scentNotes.base],
          ].map(([label, notes]) => (
            <div
              key={label}
              className="flex justify-between gap-4 border-b border-[#ebe6de] py-2 text-xs"
            >
              <span className="font-bold uppercase">{label}</span>
              <span className="text-right text-[#605a54]">{notes}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
