import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[#EAF7F6]">
          <div className="container-shell grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
            <div className="max-w-xl py-6 lg:py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#218f91]">
                The AS-Salam story
              </p>
              <h1 className="mt-5 text-5xl font-medium leading-[1.08] text-[#202B2B] sm:text-6xl">
                Care that feels like care.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-700">
                We believe a good skincare routine should give something back:
                comfort, confidence, and a few minutes that are just yours.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center gap-2 border-b border-[#218f91]/50 pb-2 text-sm font-semibold text-[#202B2B] transition-colors hover:text-[#218f91]"
              >
                Explore our essentials <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-14 max-w-xs border-l-2 border-[#40BFC1] pl-4 text-sm leading-6 text-slate-600">
                Thoughtful essentials for real skin and real life.
              </p>
            </div>

            <div className="relative min-h-[420px] overflow-hidden bg-[#d6e5df] sm:min-h-[560px]">
              <Image
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1400&q=85"
                alt="Skincare essentials arranged in soft natural light"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#101817]/35 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.18em] text-white sm:bottom-8 sm:left-8">
                Made for your everyday
              </p>
            </div>
          </div>
        </section>

        <section className="container-shell grid gap-8 py-20 sm:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#218f91]">
              A gentler kind of beauty
            </p>
            <h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight text-[#202B2B] sm:text-4xl">
              Less noise. More nourishment.
            </h2>
          </div>
          <div className="max-w-2xl space-y-5 text-lg leading-8 text-slate-600">
            <p>
              AS-Salam Cosmetics was created to make everyday self-care feel
              effective, elevated, and easy to return to. Our products are
              designed around real routines and the simple pleasure of caring
              for your skin.
            </p>
            <p>
              We bring together thoughtful ingredients, considered textures, and
              dependable performance. No complicated rituals or impossible
              promises, just premium essentials that help skin feel comfortable
              and cared for from morning to night.
            </p>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
          <div className="container-shell">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#218f91]">
                  What guides us
                </p>
                <h2 className="mt-3 text-3xl font-medium text-[#202B2B] sm:text-4xl">
                  Good care, thoughtfully made.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                The little decisions behind every product matter as much as the
                ritual itself.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {[
                {
                  number: "01",
                  title: "Real routines",
                  description:
                    "Straightforward essentials that fit into your day, not the other way around.",
                },
                {
                  number: "02",
                  title: "Considered formulas",
                  description:
                    "Thoughtful ingredients and textures chosen for comfort and dependable care.",
                },
                {
                  number: "03",
                  title: "Confidence, always",
                  description:
                    "Care that supports how you feel in your skin, without pressure to be anything else.",
                },
              ].map((value) => (
                <article
                  key={value.number}
                  className="border-t border-[#40BFC1] pt-5"
                >
                  <p className="font-mono text-xs text-[#218f91]">
                    {value.number}
                  </p>
                  <h3 className="mt-5 text-xl font-medium text-[#202B2B]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#202B2B] py-16 text-white sm:py-20">
          <div className="container-shell flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#90e7e8]">
                Begin with what feels right
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-medium sm:text-4xl">
                Make room for a little more care.
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 border-b border-[#90e7e8]/60 pb-2 text-sm font-medium text-white transition-colors hover:text-[#90e7e8]"
            >
              Shop skincare <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
