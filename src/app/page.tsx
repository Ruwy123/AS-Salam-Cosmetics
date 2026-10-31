import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { categories, products, testimonials, homeStats } from "@/lib/mock-data";

export default function Home() {
  const bestSellerProducts = products.filter(
    (product) => product.featuredText === "Best seller",
  );
  const newArrivalProducts = products.filter((product) => product.isNew);

  return (
    <>
      <div className="border-b border-slate-200 bg-[#EAF7F6] text-sm text-slate-700">
        <div className="container-shell flex items-center justify-center gap-2 py-3 text-center">
          <Sparkles className="h-4 w-4 text-[#40BFC1]" />
          Free delivery on orders above GHS 250. Shop your glow ritual today.
        </div>
      </div>

      <SiteHeader />

      <main>
        <section className="container-shell grid items-center gap-12 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <div>
            <span className="mb-5 inline-flex items-center rounded-full border border-[#40BFC1]/30 bg-[#EAF7F6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#40BFC1]">
              Trusted by mindful beauty lovers
            </span>
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
              Thoughtful rituals for luminous, healthy skin.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Discover dermatologist-inspired care, nourishing formulas, and
              everyday essentials that feel as good as they look.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#40BFC1] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2fa5a7]"
              >
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition hover:border-[#40BFC1] hover:text-[#40BFC1]"
              >
                Our story
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {homeStats.map((item) => (
                <div key={item.label}>
                  <div className="text-2xl font-semibold text-slate-900">
                    {item.value}
                  </div>
                  <div className="text-sm text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#EAF7F6] blur-2xl" />
            <div className="absolute -bottom-8 right-8 h-32 w-32 rounded-full bg-[#EAF7F6] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_rgba(32,43,43,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
                alt="Beauty skincare routine"
                width={900}
                height={1200}
                className="h-[640px] w-full rounded-[1.5rem] object-cover"
                priority
              />
              <div className="absolute bottom-8 left-8 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Glow ritual
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  Hydration + radiance
                </div>
              </div>
            </div>
          </div>
        </section>

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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#40BFC1] hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF7F6] text-[#40BFC1]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-medium text-slate-900">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Curated essentials for your daily routine.
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-shell">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
                  Best sellers
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                  Most-loved by our community
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {bestSellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="container-shell py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
                New arrivals
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                Fresh essentials for your routine
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {newArrivalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="bg-[#202B2B] py-16 text-white">
          <div className="container-shell grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#90e7e8]">
                Limited-time offer
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Save up to 30% on your glow essentials
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
                Layer hydration, repair and radiance with our seasonal set and
                unlock an extra gift with every purchase over GHS 300.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#40BFC1] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#2fa5a7]"
              >
                Shop the offer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="container-shell py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
                Why AS-Salam
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                Beauty rooted in nourishment, not excess.
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Thoughtful formulations made for real skin needs.",
                  "Clean, conscious ingredients with proven skin support.",
                  "Premium routines designed for confidence at every stage.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF7F6] text-[#40BFC1]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] bg-[#EAF7F6] p-6">
                <div className="text-3xl font-semibold text-slate-900">
                  100%
                </div>
                <p className="mt-2 text-slate-700">
                  Ingredient transparency and skin-conscious formulations.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="text-3xl font-semibold text-slate-900">
                  4.9/5
                </div>
                <p className="mt-2 text-slate-700">
                  Average satisfaction from repeat customers across our
                  routines.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:col-span-2">
                <p className="text-sm uppercase tracking-[0.12em] text-slate-500">
                  Our promise
                </p>
                <p className="mt-3 text-lg leading-8 text-slate-700">
                  We create premium essentials that help you feel calm, cared
                  for and confident—without compromising on performance, ethics,
                  or trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container-shell">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
                Testimonials
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
                Real stories from real routines
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-[2rem] border border-slate-200 bg-[#F8FAF9] p-6 text-left shadow-sm"
                >
                  <div className="mb-4 flex gap-1 text-[#40BFC1]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={`${testimonial.name}-${idx}`}
                        className="h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-base leading-7 text-slate-700">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-6 font-medium text-slate-900">
                    {testimonial.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-shell py-20">
          <div className="rounded-[2rem] bg-[#EAF7F6] px-6 py-10 text-center sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#40BFC1]">
              Stay connected
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
              Join our newsletter for skincare tips and offers
            </h2>
            <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                aria-label="Email address"
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-[#40BFC1]"
              />
              <button className="rounded-full bg-[#40BFC1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2fa5a7]">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
