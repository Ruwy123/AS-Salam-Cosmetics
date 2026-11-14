import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getStoreCatalog } from "@/lib/catalog";

async function ProductDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, catalog] = await Promise.all([params, getStoreCatalog()]);
  const product = catalog.products.find((item) => item.slug === slug);

  if (!product) return notFound();

  const relatedProducts = catalog.products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

  return (
    <div className="container-shell py-10">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#40BFC1]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3">
            <Image
              src={product.image}
              alt={product.name}
              width={1200}
              height={1200}
              className="h-[620px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.gallery.map((image, index) => (
              <div
                key={`${product.id}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2"
              >
                <Image
                  src={image}
                  alt={`${product.name} gallery ${index + 1}`}
                  width={600}
                  height={600}
                  className="h-56 w-full rounded-[1rem] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
            {product.category}
          </div>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-semibold text-slate-900">
              GHS {product.price}
            </span>
            {product.compareAtPrice ? (
              <span className="text-lg text-slate-400 line-through">
                GHS {product.compareAtPrice}
              </span>
            ) : null}
          </div>

          <p className="mt-5 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#EAF7F6] bg-[#EAF7F6] px-4 py-3 text-sm text-slate-700">
            <ShieldCheck className="h-4 w-4 text-[#40BFC1]" />
            {product.stock > 0
              ? `${product.stock} items available`
              : "Currently out of stock"}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
              <button className="h-8 w-8 text-lg text-slate-500">−</button>
              <span className="min-w-6 text-center text-sm font-medium text-slate-800">
                1
              </span>
              <button className="h-8 w-8 text-lg text-slate-500">+</button>
            </div>
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]">
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </button>
          </div>

          <div className="mt-8 space-y-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                Ingredients
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {product.ingredients ??
                  "Ingredients details available upon request."}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                Benefits
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {(
                  product.benefits ?? [
                    "Supports skin hydration and daily comfort",
                  ]
                ).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#40BFC1]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                How to use
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {product.usage ??
                  "Use as part of your regular skincare routine."}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                Available sizes
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {(product.sizes ?? ["Standard"]).map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-slate-200 bg-[#F8FAF9] px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-[#40BFC1]" />
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">
            Related products
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="container-shell min-h-screen py-10" />}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
