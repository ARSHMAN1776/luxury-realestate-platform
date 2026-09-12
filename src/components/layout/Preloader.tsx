"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Arrival sequence.
 *
 * A counter runs 0→100 while the first paint settles, then the panel splits
 * and lifts away. Held to ~2.2s — long enough to feel deliberate, short
 * enough that a returning visitor is not punished for coming back.
 *
 * Session-scoped: shown once per tab, not on every soft navigation.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Never block the reduced-motion visitor, and never repeat within a session.
    if (reduce) return;
    if (sessionStorage.getItem("mv-arrived") === "1") return;

    setVisible(true);
    document.documentElement.classList.add("scroll-locked");

    const DURATION = 1750;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const done = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("mv-arrived", "1");
      document.documentElement.classList.remove("scroll-locked");
    }, DURATION + 420);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-obsidian-950 px-[var(--spacing-gutter)] py-10"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.1, ease: EASE },
          }}
          aria-hidden="true"
        >
          {/* Wordmark */}
          <motion.div
            className="flex items-baseline gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            <span className="font-display text-[1.5rem] font-light tracking-tight text-bone-100">
              MERIDIAN
            </span>
            <span className="text-brass-500">&</span>
            <span className="font-display text-[1.5rem] font-light tracking-tight text-bone-100">
              VOSS
            </span>
          </motion.div>

          {/* Centre — the establishing line */}
          <motion.p
            className="max-w-[24ch] font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] font-light text-bone-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
          >
            The world&rsquo;s most considered addresses.
          </motion.p>

          {/* Counter and progress rule */}
          <div>
            <div className="mb-5 h-px w-full bg-obsidian-700">
              <motion.div
                className="h-full bg-brass-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.75, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </div>
            <div className="flex items-end justify-between">
              <span className="eyebrow text-bone-600">Est. Geneva 1974</span>
              <span className="tabular font-display text-[2.5rem] leading-none font-light text-bone-300">
                {count}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
