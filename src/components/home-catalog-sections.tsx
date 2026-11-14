import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { getStoreCatalog } from "@/lib/catalog";

async function HomeCatalogContent() {
  const { categories, products } = await getStoreCatalog();
  const bestSellers = products.filter((product) => product.isFeatured);
  const newArrivals = products.filter((product) => product.isNew);

  return (
    <>
      <section id="categories" className="container-shell pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
              Shop by category
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
              Nurture every part of your ritual
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-medium text-slate-700 hover:text-[#40BFC1] sm:inline-flex"
          >
            Explore all products
          </Link>
        </div>

        {categories.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#40BFC1] hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF7F6] text-[#40BFC1]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-medium text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {category.description ??
                    "Curated essentials for your daily routine."}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="border-t border-slate-200 py-6 text-sm text-slate-600">
            Categories are being prepared. Please check back soon.
          </p>
        )}
      </section>

      {bestSellers.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-shell">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
                Best sellers
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                Most-loved by our community
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {newArrivals.length > 0 && (
        <section className="container-shell py-20">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
              New arrivals
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
              Fresh essentials for your routine
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {products.length === 0 && (
        <section className="container-shell py-12">
          <p className="text-center text-slate-600">
            Our first products are on their way.
          </p>
        </section>
      )}
    </>
  );
}

export function HomeCatalogSections() {
  return (
    <Suspense fallback={<div className="container-shell min-h-96 py-20" />}>
      <HomeCatalogContent />
    </Suspense>
  );
}
