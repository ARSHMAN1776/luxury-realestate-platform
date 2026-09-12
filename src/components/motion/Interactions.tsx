"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element is pulled toward the cursor, 0–1 */
  strength?: number;
  /** Radius in pixels within which the pull engages */
  radius?: number;
}

/**
 * Magnetic hover. The element leans toward the cursor within a radius and
 * springs back on exit. Disabled on touch devices, where it has no meaning
 * and costs a pointer listener.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 90,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isTouch, setIsTouch] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 160, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 160, damping: 18, mass: 0.35 });

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (isTouch || reduce) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    function onLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [isTouch, reduce, radius, strength, x, y]);

  if (isTouch || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

interface CounterProps {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places — inferred from the value when omitted */
  decimals?: number;
}

/**
 * Count-up numeral, fired once when scrolled into view. Uses rAF rather than
 * a spring so the final value lands exactly rather than approaching it.
 */
export function Counter({
  value,
  className,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const places = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;

    let raf = 0;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Matches --ease-luxe: decelerating, settles rather than stops.
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(value * eased);

      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {display.toFixed(places)}
      {suffix}
    </span>
  );
}

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full pass */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal rail. Content is duplicated once and translated -50%,
 * which produces a seamless loop without measuring anything.
 */
export function Marquee({
  children,
  className,
  speed = 42,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center animate-marquee-x",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
