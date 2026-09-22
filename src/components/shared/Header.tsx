import Link from "next/link";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";

export function Header() {
  return (
    <header className="bg-[#faf8f5] text-[#1a1a1a]">
      <div className="flex min-h-[39px] items-center justify-center bg-[#1a1a1a] px-4 py-2 text-center text-[10px] font-semibold uppercase text-white">
        Complimentary signature gift wrapping on all orders above $150
      </div>
      <div className="flex min-h-[90px] items-center justify-between border-b border-[#ebe6de] px-4 sm:px-6 md:px-10 lg:px-20">
        <nav className="hidden items-center gap-10 text-[13px] uppercase md:flex">
          <Link href={productPaths.list} className="font-semibold">
            Home
          </Link>
          <Link href={productPaths.list} className="text-[#605a54]">
            Shop
          </Link>
          <Link href={productPaths.list} className="text-[#605a54]">
            Categories
          </Link>
          <Link href={productPaths.list} className="text-[#605a54]">
            The Atelier
          </Link>
        </nav>
        <Link
          href={productPaths.list}
          className="font-[family-name:var(--font-instrument-serif)] text-3xl tracking-[0.3em]"
        >
          ODORATUS
        </Link>
        <div className="flex items-center gap-4 text-xs sm:gap-8">
          <label className="hidden items-center gap-2 rounded-full border border-[#ebe6de] px-3 py-2 text-[#605a54] sm:flex">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Search fragrances"
              placeholder="Search fragrances..."
              className="w-32 bg-transparent text-xs outline-none placeholder:text-[#605a54]"
            />
          </label>
          <span aria-hidden="true" className="hidden text-base sm:block">
            ♙
          </span>
          <CartNavLink />
        </div>
      </div>
    </header>
  );
}
