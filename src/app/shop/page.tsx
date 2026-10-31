import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/mock-data";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      <div className="container-shell py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
              Shop
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
              Curated beauty essentials
            </h1>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-[#40BFC1] hover:text-[#40BFC1]"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 md:grid-cols-[1fr_180px_180px_180px]">
          <input
            aria-label="Search products"
            placeholder="Search products"
            className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
          />
          <select className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]">
            <option>Price</option>
          </select>
          <select className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]">
            <option>Availability</option>
          </select>
          <select className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]">
            <option>Newest</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
