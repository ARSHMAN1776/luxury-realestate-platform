import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { statistics } from "@/data/house";
import { IMG, BLUR_OBSIDIAN } from "@/lib/images";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Counter, Marquee } from "@/components/motion/Interactions";
import { Button } from "@/components/ui/Button";

const PRESS = [
  "Financial Times",
  "The Wall Street Journal",
  "Bloomberg",
  "Architectural Digest",
  "Monocle",
  "Robb Report",
  "NZZ",
  "Le Figaro",
];

/**
 * The house. Fifty years compressed into three paragraphs, two photographs
 * drifting at different speeds, and four numbers that are allowed to speak
 * for themselves.
 */
export function Legacy() {
  return (
    <Section id="house">
      <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        {/* ── The account ──────────────────────────────────────────────── */}
        <div className="max-w-xl">
          <Reveal direction="none" duration={0.9}>
            <p className="eyebrow mb-7 flex items-center gap-4 text-brass-500">
              <span className="tabular text-bone-600">04</span>
              <span className="h-px w-8 bg-brass-700" aria-hidden="true" />
              The house
            </p>
          </Reveal>

          <TextReveal
            as="h2"
            text="Fifty years of|holding other|people's keys."
            className="font-display text-title leading-[0.98] font-light text-bone-100"
          />

          <div className="prose-luxe mt-10 space-y-6">
            <Reveal delay={0.1}>
              <p>
                MERIDIAN &amp; VOSS was founded in Geneva in 1974 to do one
                thing: represent exceptional property with the same discretion
                a private bank extends to capital. No shopfront, no window
                cards — a book of addresses, and a reputation for closing
                quietly.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Half a century later the method is unchanged. We act for a
                deliberately small number of owners at any one time, across
                forty-one countries, and we still decline more mandates than
                we accept. Scale was never the ambition; being the first call
                was.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p>
                Most of what we sell is never advertised. Most of our clients
                arrive by introduction. The house has been built on the
                understanding that in this market, the finest things change
                hands in private.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.34}>
            <div className="mt-11 flex items-center gap-9 border-t border-hairline pt-9">
              <div>
                <p className="font-display text-[2rem] leading-none font-light text-brass-400">
                  M&amp;V
                </p>
                <p className="eyebrow mt-3 text-bone-600">Est. Geneva · 1974</p>
              </div>
              <Button asChild variant="brass" size="inline" className="ml-auto">
                <Link href="/about">
                  The full account
                  <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* ── The photographs ──────────────────────────────────────────── */}
        <div className="relative hidden lg:block" aria-hidden="false">
          <Parallax speed={0.1} className="relative z-10 w-[78%]">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-800">
                <Image
                  src={IMG.archConcrete}
                  alt="Modernist concrete facade in low sun"
                  fill
                  sizes="(max-width: 1024px) 0px, 34vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Parallax>

          <Parallax speed={-0.12} className="absolute right-0 bottom-0 z-20 w-[52%]">
            <Reveal delay={0.25}>
              <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-obsidian-800 shadow-lift">
                <Image
                  src={IMG.interiorSalon}
                  alt="A quiet residential salon in natural light"
                  fill
                  sizes="(max-width: 1024px) 0px, 24vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Parallax>

          {/* Registry line */}
          <p className="vertical-rl eyebrow absolute -right-2 top-0 text-bone-700 xl:-right-6">
            Commercial register CH-660-1974 · Geneva
          </p>
        </div>
      </div>

      {/* ── The numbers ──────────────────────────────────────────────── */}
      <div className="mt-24 grid border-y border-hairline sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
        {statistics.map((s, i) => (
          <Reveal
            key={s.id}
            delay={i * 0.08}
            className="border-b border-hairline p-8 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:odd:border-r lg:border-r lg:p-10"
          >
            <p className="font-display text-[clamp(2.75rem,4vw,4rem)] leading-none font-light text-bone-50">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                duration={2200}
              />
            </p>
            <p className="eyebrow mt-5 text-brass-500">{s.label}</p>
            <p className="mt-3 max-w-[26ch] text-[0.8125rem] leading-relaxed text-bone-500">
              {s.detail}
            </p>
          </Reveal>
        ))}
      </div>

      {/* ── As written about in ──────────────────────────────────────── */}
      <div className="mt-16 lg:mt-20">
        <p className="eyebrow mb-8 text-center text-bone-600">
          The house in print
        </p>
        <Marquee speed={48} className="edge-fade-x">
          {PRESS.map((name) => (
            <span
              key={name}
              className="mx-10 shrink-0 font-display text-[1.375rem] font-light tracking-wide whitespace-nowrap text-bone-600 transition-colors duration-500 hover:text-bone-300"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
