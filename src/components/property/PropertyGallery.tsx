"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { BLUR_OBSIDIAN } from "@/lib/images";
import type { PropertyImage } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PropertyGalleryProps {
  images: PropertyImage[];
  propertyName: string;
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = useCallback((i: number) => setLightbox(i), []);
  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Gallery layout: first image large, rest 2-per-row
  const [primary, ...rest] = images;

  return (
    <>
      {/* ── Gallery grid ─────────────────────────────────────────────── */}
      <div className="shell py-6 sm:py-8">
        <div className="grid gap-2 sm:grid-cols-3">
          {/* Primary image */}
          {primary && (
            <button
              type="button"
              onClick={() => open(0)}
              className="group relative aspect-[4/3] overflow-hidden sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[420px]"
              aria-label={`View ${primary.alt} in lightbox`}
            >
              <Image
                src={primary.src}
                alt={primary.alt}
                fill
                sizes="(max-width: 640px) 100vw, 66vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_OBSIDIAN}
              />
              {primary.caption && (
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian-950/80 to-transparent px-4 py-3 text-[0.6875rem] text-bone-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {primary.caption}
                </span>
              )}
            </button>
          )}

          {/* Thumbnails */}
          {rest.slice(0, 4).map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => open(i + 1)}
              className="group relative aspect-[4/3] overflow-hidden"
              aria-label={`View ${img.alt} in lightbox`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_OBSIDIAN}
              />
              {/* "View all" overlay on last thumb if more images */}
              {i === 3 && images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950/60 backdrop-blur-[2px]">
                  <span className="eyebrow text-bone-100">
                    +{images.length - 5} more
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* View all photos link */}
        <button
          type="button"
          onClick={() => open(0)}
          className="mt-3 eyebrow text-bone-500 transition-colors duration-300 hover:text-bone-100"
        >
          View all {images.length} photos
        </button>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${propertyName} gallery`}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center border border-hairline text-bone-400 transition-colors duration-300 hover:border-hairline-strong hover:text-bone-100"
              aria-label="Close gallery"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-hairline text-bone-400 transition-colors duration-300 hover:border-hairline-strong hover:text-bone-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 translate-x-0 items-center justify-center border border-hairline text-bone-400 transition-colors duration-300 hover:border-hairline-strong hover:text-bone-100 sm:right-16"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                className="relative h-[80vh] w-full max-w-5xl px-14 sm:px-20"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={images[lightbox]!.src}
                    alt={images[lightbox]!.alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    placeholder="blur"
                    blurDataURL={BLUR_OBSIDIAN}
                  />
                </div>
                {/* Caption + counter */}
                <div className="absolute bottom-0 left-14 right-14 flex items-end justify-between gap-4 pb-2 sm:left-20 sm:right-20">
                  <span className="text-[0.8125rem] text-bone-400">
                    {images[lightbox]?.caption ?? images[lightbox]?.alt}
                  </span>
                  <span className="eyebrow shrink-0 text-bone-600">
                    {lightbox + 1} / {images.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
