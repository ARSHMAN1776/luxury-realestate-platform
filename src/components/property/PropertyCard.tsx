"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Property } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { SaveButton, ShareButton, ViewingButton, InquiryButton } from "./PropertyActions";

const EASE = [0.16, 1, 0.3, 1] as const;

function priceLine(p: Property) {
  return p.priceOnApplication
    ? "Price on application"
    : formatPrice(p.price, p.currency, "compact");
}

/**
 * The property card.
 *
 * Deliberately not a marketplace tile: no radius, no shadow, no badge soup.
 * The image carries the weight, the specification sits under a hairline, and
 * the four actions surface on hover rather than competing with the address.
 */
export function PropertyCard({
  property,
  index = 0,
  priority = false,
  size = "default",
  className,
}: {
  property: Property;
  index?: number;
  priority?: boolean;
  size?: "default" | "wide" | "tall";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const aspect =
    size === "wide"
      ? "aspect-[16/10]"
      : size === "tall"
        ? "aspect-[3/4]"
        : "aspect-[4/3.1]";

  const sizes =
    size === "wide"
      ? "(max-width: 768px) 100vw, 66vw"
      : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";

  return (
    <motion.article
      className={cn("group relative", className)}
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay: Math.min(index * 0.09, 0.36) }}
    >
      <Link
        href={`/properties/${property.slug}`}
        className="block outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brass-400"
        data-cursor="View"
      >
        {/* ── Image ──────────────────────────────────────────────────────── */}
        <div className={cn("relative isolate overflow-hidden bg-obsidian-800", aspect)}>
          <Image
            src={property.hero.src}
            alt={property.hero.alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_OBSIDIAN}
            className={cn(
              "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              "motion-safe:group-hover:scale-[1.05]"
            )}
            quality={82}
          />

          {/* Scrim, deepened on hover so the actions stay legible */}
          <div className="absolute inset-0 bg-obsidian-950/0 transition-colors duration-700 group-hover:bg-obsidian-950/25" />
          <div className="scrim-b pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70" />

          {/* Mandate flags, top-left */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            <StatusBadge status={property.status} />
            {(property as any).distanceKm !== undefined && (
              <Badge variant="brass" size="sm">
                {(property as any).distanceKm === 0 ? "< 0.5 km away" : `${(property as any).distanceKm} km away`}
              </Badge>
            )}
            {property.exclusive && (
              <Badge variant="brass" size="sm">
                Sole Mandate
              </Badge>
            )}
            {property.discreet && (
              <Badge variant="dark" size="sm">
                Discreet
              </Badge>
            )}
          </div>

          {/* Actions, top-right. Present on touch, revealed on hover. */}
          <div
            className={cn(
              "absolute top-4 right-4 z-10 flex gap-2",
              "opacity-100 transition-all duration-700",
              "lg:translate-y-[-6px] lg:opacity-0",
              "lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
              "lg:focus-within:translate-y-0 lg:focus-within:opacity-100"
            )}
          >
            <SaveButton slug={property.slug} name={property.name} />
            <ShareButton property={property} />
            <ViewingButton property={property} />
            <InquiryButton property={property} />
          </div>

          {/* Reference, bottom-left — the quiet detail that reads as a real book */}
          <span className="tabular absolute bottom-4 left-4 z-10 text-[0.625rem] tracking-[0.22em] text-bone-400/80 uppercase">
            {property.reference}
          </span>

          <span className="absolute right-4 bottom-4 z-10 flex size-9 items-center justify-center border border-hairline-strong bg-obsidian-950/40 text-bone-100 opacity-0 transition-all duration-700 group-hover:opacity-100 lg:translate-x-[-6px] lg:group-hover:translate-x-0">
            <ArrowUpRight className="size-4" strokeWidth={1.25} aria-hidden="true" />
          </span>
        </div>

        {/* ── Information ────────────────────────────────────────────────── */}
        <div className="pt-6">
          <div className="flex items-baseline justify-between gap-5">
            <p className="eyebrow text-bone-600">{property.location.short}</p>
            <p className="tabular shrink-0 text-[0.8125rem] font-medium tracking-wide text-brass-400">
              {priceLine(property)}
            </p>
          </div>

          <h3 className="mt-3.5 font-display text-[1.75rem] leading-[1.08] font-light text-bone-100 transition-colors duration-500 group-hover:text-brass-200 sm:text-[2rem]">
            {property.name}
          </h3>

          <p className="mt-2.5 max-w-[46ch] text-[0.875rem] leading-relaxed text-bone-500">
            {property.tagline}
          </p>

          {/* Specification rail */}
          <dl className="tabular mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline pt-5 text-[0.75rem] text-bone-500">
            {property.specs.bedrooms > 0 && (
              <div className="flex gap-1.5">
                <dt className="sr-only">Bedrooms</dt>
                <dd>
                  <span className="text-bone-300">{property.specs.bedrooms}</span> bed
                </dd>
              </div>
            )}
            {property.specs.bathrooms > 0 && (
              <div className="flex gap-1.5">
                <dt className="sr-only">Bathrooms</dt>
                <dd>
                  <span className="text-bone-300">{property.specs.bathrooms}</span> bath
                </dd>
              </div>
            )}
            <div className="flex gap-1.5">
              <dt className="sr-only">Interior area</dt>
              <dd>
                <span className="text-bone-300">
                  {property.specs.interiorSqm.toLocaleString("en-US")}
                </span>{" "}
                m² interior
              </dd>
            </div>
            {property.specs.plotSqm !== null && (
              <div className="flex gap-1.5">
                <dt className="sr-only">Plot</dt>
                <dd>
                  <span className="text-bone-300">
                    {property.specs.plotSqm.toLocaleString("en-US")}
                  </span>{" "}
                  m² plot
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Link>
    </motion.article>
  );
}

/* ── Loading state ──────────────────────────────────────────────────────── */

export function PropertyCardSkeleton({ size = "default" }: { size?: "default" | "wide" | "tall" }) {
  const aspect =
    size === "wide" ? "aspect-[16/10]" : size === "tall" ? "aspect-[3/4]" : "aspect-[4/3.1]";
  return (
    <div aria-hidden="true">
      <div className={cn("skeleton w-full", aspect)} />
      <div className="pt-6">
        <div className="skeleton h-2.5 w-1/3" />
        <div className="skeleton mt-5 h-7 w-3/4" />
        <div className="skeleton mt-3 h-3 w-full" />
        <div className="skeleton mt-6 h-2.5 w-1/2" />
      </div>
    </div>
  );
}
