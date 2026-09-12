"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/house";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The collection index. On desktop this is a hairline ledger — hovering a row
 * swaps the plate on the right, the way one leafs through a physical
 * catalogue. On touch, it becomes a snap rail of plates.
 */
export function Categories() {
  const [active, setActive] = useState(0);
  const current = categories[active]!;

  return (
    <Section id="collection" className="border-y border-hairline">
      <SectionHeader
        index="03"
        eyebrow="The collection"
        title="Six ways|of living well."
        standfirst="Every mandate in the book belongs to one of six registers. Each is held to its own standard — a villa is not judged as an estate, an island is not judged at all."
      />

      {/* ── Desktop ledger ─────────────────────────────────────────────── */}
      <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-start xl:gap-24">
        <div role="list" aria-label="Property categories">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <Link
                href={`/properties?category=${c.id}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-baseline gap-8 border-b border-hairline py-8 outline-none transition-colors duration-500 first:border-t hover:border-hairline-strong focus-visible:border-brass-600 xl:py-9"
                data-cursor="Open"
                aria-current={i === active}
              >
                <span className="tabular eyebrow w-8 shrink-0 text-bone-600 transition-colors duration-500 group-hover:text-brass-500">
                  {c.index}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-display text-[2.25rem] leading-none font-light transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] xl:text-[2.75rem] ${
                      i === active
                        ? "translate-x-3 text-bone-50"
                        : "text-bone-500 group-hover:text-bone-200"
                    }`}
                  >
                    {c.name}
                  </span>
                </span>

                <span className="tabular shrink-0 text-[0.75rem] text-bone-600">
                  {String(c.count).padStart(2, "0")} mandates
                </span>

                <ArrowUpRight
                  className={`size-4 shrink-0 transition-all duration-500 ${
                    i === active
                      ? "translate-x-0 text-brass-400 opacity-100"
                      : "-translate-x-2 text-bone-600 opacity-0"
                  }`}
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* The plate */}
        <Reveal delay={0.15} className="sticky top-28">
          <div className="relative isolate aspect-[4/5] overflow-hidden bg-obsidian-800">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image
                  src={current.image.src}
                  alt={current.image.alt}
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover"
                  quality={82}
                />
              </motion.div>
            </AnimatePresence>
            <div className="scrim-b pointer-events-none absolute inset-x-0 bottom-0 h-2/3" />

            <div className="absolute inset-x-0 bottom-0 p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={current.id}
                  className="max-w-[38ch] text-[0.875rem] leading-relaxed text-bone-300"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Touch rail ─────────────────────────────────────────────────── */}
      <div className="no-scrollbar -mx-[var(--spacing-gutter)] mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--spacing-gutter)] pb-2 lg:hidden">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            href={`/properties?category=${c.id}`}
            className="group relative w-[76vw] max-w-sm shrink-0 snap-start overflow-hidden bg-obsidian-800 sm:w-[46vw]"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(max-width: 640px) 76vw, 46vw"
                placeholder="blur"
                blurDataURL={BLUR_OBSIDIAN}
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                loading={i < 2 ? "eager" : "lazy"}
              />
              <div className="scrim-b absolute inset-x-0 bottom-0 h-2/3" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow text-brass-400">{c.index}</p>
                <p className="mt-3 font-display text-[1.75rem] leading-none font-light text-bone-50">
                  {c.name}
                </p>
                <p className="tabular mt-2.5 text-[0.6875rem] tracking-wide text-bone-400">
                  {String(c.count).padStart(2, "0")} mandates
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
