"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const ritualSteps = [
  {
    number: "01",
    title: "Cleanse",
    description:
      "Start with a gentle reset. A thoughtful cleanse leaves skin comfortable, never tight, and ready for what comes next.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85",
    alt: "A considered skincare cleansing ritual",
  },
  {
    number: "02",
    title: "Treat",
    description:
      "Give your skin what it is asking for with focused hydration and ingredients chosen to support its natural balance.",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1400&q=85",
    alt: "Skincare treatment products in warm natural light",
  },
  {
    number: "03",
    title: "Protect",
    description:
      "Finish with a nourishing layer that seals in moisture and helps your daily glow feel effortless, morning to night.",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85",
    alt: "A calm, nourishing skincare routine",
  },
];

export function RitualStory() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const steps = document.querySelectorAll<HTMLElement>("[data-ritual-step]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveStep(
              Number(entry.target.getAttribute("data-ritual-step")),
            );
          }
        }
      },
      { rootMargin: "-38% 0px -42% 0px", threshold: 0 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ritual-story bg-[#202B2B] py-16 text-white sm:py-24">
      <div className="container-shell">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#90e7e8]">
            Your routine, reimagined
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
            Good skin days, one step at a time.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="ritual-visual-wrap lg:sticky lg:top-24 lg:h-[min(68vh,680px)]">
            <div className="ritual-visual relative h-[52vh] min-h-85 overflow-hidden bg-[#344342] lg:h-full">
              {ritualSteps.map((step, index) => (
                <Image
                  key={step.number}
                  src={step.image}
                  alt={step.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className={`ritual-image object-cover ${activeStep === index ? "is-active" : ""}`}
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-[#101817]/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    The daily ritual
                  </p>
                  <p className="mt-1 text-2xl font-medium text-white">
                    {ritualSteps[activeStep].title}
                  </p>
                </div>
                <p className="font-mono text-sm text-white/75">
                  {ritualSteps[activeStep].number}{" "}
                  <span className="mx-1">/</span> 03
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2" aria-hidden="true">
              {ritualSteps.map((step, index) => (
                <span
                  key={step.number}
                  className={`h-0.5 flex-1 transition-colors duration-500 ${activeStep === index ? "bg-[#90e7e8]" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>

          <div className="ritual-chapters">
            {ritualSteps.map((step, index) => (
              <article
                key={step.number}
                data-ritual-step={index}
                className={`ritual-chapter flex min-h-[54vh] flex-col justify-center border-t border-white/20 py-10 transition-opacity duration-500 sm:min-h-[62vh] ${activeStep === index ? "is-active" : ""}`}
              >
                <p className="font-mono text-sm text-[#90e7e8]">
                  {step.number}
                </p>
                <h3 className="mt-4 text-4xl font-medium text-white sm:text-6xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  {step.description}
                </p>
                {index === ritualSteps.length - 1 && (
                  <Link
                    href="/shop"
                    className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#90e7e8]/60 pb-2 text-sm font-medium text-white transition-colors hover:text-[#90e7e8]"
                  >
                    Find your ritual <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
