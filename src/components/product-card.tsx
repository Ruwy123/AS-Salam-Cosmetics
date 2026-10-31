import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.compareAtPrice ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#EAF7F6] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#40BFC1]">
            Save{" "}
            {Math.round(
              ((product.compareAtPrice - product.price) /
                product.compareAtPrice) *
                100,
            )}
            %
          </span>
        ) : null}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
            {product.category}
          </p>
          <span className="text-xs text-slate-500">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="block text-xl font-medium text-slate-900 hover:text-[#40BFC1]"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-slate-900">
            GHS {product.price}
          </span>
          {product.compareAtPrice ? (
            <span className="text-sm text-slate-400 line-through">
              GHS {product.compareAtPrice}
            </span>
          ) : null}
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#40BFC1] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2fa5a7]">
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#40BFC1] hover:text-[#40BFC1]"
            aria-label={`View ${product.name}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
