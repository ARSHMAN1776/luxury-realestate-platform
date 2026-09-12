"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll.
 *
 * Two things matter here beyond the obvious:
 *  1. We bail out entirely under prefers-reduced-motion. Hijacking scroll is
 *     precisely what that preference exists to prevent.
 *  2. We disable it on touch devices. Native momentum scrolling on iOS and
 *     Android is better than anything JS can synthesise, and Lenis on touch
 *     tends to fight the browser's overscroll behaviour.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (prefersReduced || isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential decay — long tail, settles rather than stops.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // In-page anchors must go through Lenis or they jump.
    function onAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const el = document.querySelector(id);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.6 });
    }

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
