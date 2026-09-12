"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, BookOpen, ArrowUpRight } from "lucide-react";
import { IMG, BLUR_OBSIDIAN } from "@/lib/images";
import { properties as fallbackProperties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 7000;

const CITIES = [
  { name: "DUBAI", place: "Downtown", region: "Dubai", image: IMG.cityDubaiDusk },
  { name: "LONDON", place: "Mayfair", region: "London", image: IMG.exteriorPoolVilla },
  { name: "NEW YORK", place: "Manhattan", region: "New York", image: IMG.interiorGallery },
  { name: "PARIS", place: "8th Arrondissement", region: "Paris", image: IMG.exteriorEstate },
  { name: "MIAMI", place: "Star Island", region: "Miami", image: IMG.beachAerialTurquoise },
  { name: "SINGAPORE", place: "Marina Bay", region: "Singapore", image: IMG.poolInfinity },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [featuredProperty, setFeaturedProperty] = useState<Property | undefined>(
    fallbackProperties.find((p) => p.featured) || fallbackProperties[0]
  );

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const liveFeatured = json.data.find((p: Property) => p.featured) || json.data[0];
          setFeaturedProperty(liveFeatured);
        }
      } catch (err) {
        // Fallback to static mock data if fetch fails
      }
    }
    loadFeatured();
  }, []);

  /* The hero background parallax effect */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % CITIES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const city = CITIES[active]!;

  return (
    <section
      ref={ref}
      className="grain relative h-[100svh] min-h-[48rem] w-full overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* ── Background Imagery ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 isolate"
        style={reduce ? undefined : { y, scale, opacity }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.8, ease: "linear" }}
          >
            <Image
              src={city.image}
              alt={city.place}
              fill
              priority={active === 0}
              sizes="100vw"
              quality={90}
              placeholder="blur"
              blurDataURL={BLUR_OBSIDIAN}
              className="scale-[1.04] object-cover motion-safe:animate-ken-burns"
              loading={active === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Scrim */}
        <div className="scrim-full absolute inset-0 pointer-events-none" aria-hidden="true" />
      </motion.div>

      {/* ── Top-Right Vertical Accent ───────────────────────────────────────── */}
      <div className="absolute top-36 right-8 z-20 hidden md:flex items-start gap-3">
        <span className="h-10 w-px bg-brass-500/70" />
        <div className="text-[0.625rem] tracking-[0.2em] font-mono text-bone-300 uppercase leading-relaxed font-medium">
          <p>PREMIUM</p>
          <p>PROPERTIES</p>
          <p className="text-brass-400">GLOBAL REACH</p>
        </div>
      </div>

      {/* ── Main Content Container ─────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-end pb-8 pt-36 sm:pt-44 lg:pt-48 sm:pb-12">
        <div className="shell space-y-6">
          {/* Eyebrow */}
          <motion.p
            className="text-[0.75rem] tracking-[0.2em] font-mono text-brass-400 uppercase flex items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: reduce ? 0 : 0.35 }}
          >
            <span className="h-px w-8 bg-brass-500" aria-hidden="true" />
            INTERNATIONAL PRIVATE PROPERTY
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display text-[clamp(2.75rem,5.8vw,5.5rem)] leading-[0.98] font-light text-white max-w-3xl tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: reduce ? 0 : 0.5 }}
          >
            The world’s most <br />
            considered <br />
            <span className="italic text-white">addresses</span>
            <span className="text-brass-400 font-sans">.</span>
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            className="max-w-[50ch] text-[0.875rem] leading-relaxed text-white/90 font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: reduce ? 0 : 0.7 }}
          >
            Exceptional luxury homes and investment properties across London, New York, Dubai, Paris, Miami, and beyond.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: reduce ? 0 : 0.9 }}
          >
            {/* Primary Solid Gold Button */}
            <Link
              href="/properties"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[0.75rem] font-mono tracking-[0.18em] uppercase bg-brass-400 text-obsidian-950 font-semibold hover:bg-brass-300 transition-colors shadow-lg"
            >
              SEARCH PROPERTIES
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Outlined Button */}
            <Link
              href="/properties"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[0.75rem] font-mono tracking-[0.18em] uppercase border border-white/20 bg-black/60 backdrop-blur-md text-white font-medium hover:border-brass-400 hover:text-brass-300 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-brass-400" />
              VIEW THE BOOK
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Bottom Rail: City Ticker & Floating Featured Card ───────────── */}
        <div className="shell mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8 border-t border-white/20 pt-6">
          {/* Bottom-Left City Navigation Ticker */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {CITIES.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setActive(i)}
                className={`text-[0.75rem] tracking-[0.18em] font-mono uppercase transition-all pb-1 ${
                  i === active
                    ? "text-white font-semibold border-b-2 border-brass-400"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Bottom-Right Floating Featured Property Preview Card */}
          {featuredProperty && (
            <Link
              href={`/properties/${featuredProperty.slug}`}
              className="group flex items-center gap-4 bg-black/80 border border-white/20 p-3 max-w-md backdrop-blur-md hover:border-brass-400/60 transition-all shadow-xl"
            >
              <div className="relative w-20 h-14 shrink-0 overflow-hidden bg-obsidian-800">
                <Image
                  src={featuredProperty.hero.src}
                  alt={featuredProperty.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <span className="text-[0.625rem] tracking-[0.18em] font-mono text-brass-400 uppercase block font-semibold">
                  FEATURED PROPERTY
                </span>
                <h4 className="font-display text-[1.125rem] text-white truncate font-light mt-0.5">
                  {featuredProperty.name}
                </h4>
                <p className="text-[0.6875rem] text-white/70 font-mono mt-0.5 truncate">
                  {featuredProperty.location.short} ·{" "}
                  {featuredProperty.priceOnApplication
                    ? "POA"
                    : formatPrice(featuredProperty.price, featuredProperty.currency, "compact")}
                </p>
              </div>

              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-brass-400 group-hover:text-brass-400 transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
