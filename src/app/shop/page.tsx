import Link from "next/link";
import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getStoreCatalog } from "@/lib/catalog";

type ShopSearchParams = {
  category?: string;
  q?: string;
  sort?: string;
  availability?: string;
};

async function ShopContent({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const [params, catalog] = await Promise.all([
    searchParams,
    getStoreCatalog(),
  ]);
  const query = params.q?.trim().toLowerCase() ?? "";
  const products = catalog.products
    .filter(
      (product) => !params.category || product.categorySlug === params.category,
    )
    .filter(
      (product) =>
        !query ||
        `${product.name} ${product.category} ${product.shortDescription}`
          .toLowerCase()
          .includes(query),
    )
    .filter(
      (product) => params.availability !== "in-stock" || product.stock > 0,
    )
    .filter(
      (product) => params.availability !== "out-of-stock" || product.stock <= 0,
    );

  if (params.sort === "price-low") products.sort((a, b) => a.price - b.price);
  if (params.sort === "price-high") products.sort((a, b) => b.price - a.price);
  if (params.sort === "name")
    products.sort((a, b) => a.name.localeCompare(b.name));

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

          <p className="text-sm text-slate-500" aria-live="polite">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {catalog.categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-[#40BFC1] hover:text-[#40BFC1]"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <form
          action="/shop"
          className="mb-8 grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 md:grid-cols-[1fr_200px_180px_180px_auto]"
        >
          <label className="sr-only" htmlFor="shop-query">
            Search products
          </label>
          <input
            id="shop-query"
            name="q"
            defaultValue={params.q}
            placeholder="Search products"
            className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
          />
          <label className="sr-only" htmlFor="shop-category">
            Category
          </label>
          <select
            id="shop-category"
            name="category"
            defaultValue={params.category ?? ""}
            className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
          >
            <option value="">All categories</option>
            {catalog.categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="shop-availability">
            Availability
          </label>
          <select
            id="shop-availability"
            name="availability"
            defaultValue={params.availability ?? "all"}
            className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
          >
            <option value="all">Any availability</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
          <label className="sr-only" htmlFor="shop-sort">
            Sort products
          </label>
          <select
            id="shop-sort"
            name="sort"
            defaultValue={params.sort ?? "newest"}
            className="rounded-full border border-slate-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#40BFC1]"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#202B2B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#344342]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Apply
          </button>
        </form>

        {products.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border-y border-slate-200 py-16 text-center">
            <p className="text-lg font-medium text-slate-900">
              No products found
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Try changing your search or filters.
            </p>
            <Link
              href="/shop"
              className="mt-5 inline-block text-sm font-medium text-[#218f91] hover:underline"
            >
              Clear filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  return (
    <Suspense fallback={<div className="container-shell min-h-screen py-12" />}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}
