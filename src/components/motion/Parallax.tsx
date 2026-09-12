"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Positive drifts slower than scroll (recedes), negative drifts faster */
  speed?: number;
  direction?: "vertical" | "horizontal";
}

/**
 * Scroll-linked parallax. Kept deliberately gentle — the house style is
 * drift, not motion. Values above ~0.3 start to read as a gimmick.
 */
export function Parallax({
  children,
  className,
  speed = 0.18,
  direction = "vertical",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 220;
  const transform = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={direction === "vertical" ? { y: transform } : { x: transform }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  /** How much oversize the inner layer gets, to avoid revealing edges */
  scale?: number;
  speed?: number;
}

/**
 * Full-bleed image parallax. The inner layer is oversized so the drift never
 * exposes an edge — the usual failure mode of naive image parallax.
 */
export function ParallaxImage({
  children,
  className,
  scale = 1.22,
  speed = 0.3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 50}%`, `${speed * 50}%`]);

  if (reduce) {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden isolate", className)}>
      <motion.div
        style={{ y, height: `${scale * 100}%`, top: `${((1 - scale) * 100) / 2}%` }}
        className="absolute inset-x-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
