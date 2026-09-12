"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Pointer.
 *
 * A brass hairline ring that lags the cursor slightly, plus an instant dot.
 * Elements opt into a label by declaring `data-cursor="View"`, and into the
 * expanded state with `data-cursor-expand`.
 *
 * Mounted only where a real pointer exists and reduced motion is not requested.
 * The native cursor is hidden only once we have taken over — never before,
 * so a failure to mount can't leave the visitor without a cursor.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], [data-cursor-expand], a, button, input, textarea, select, [role='button']"
      );

      if (!el) {
        setLabel(null);
        setExpanded(false);
        return;
      }

      setLabel(el.dataset.cursor ?? null);
      setExpanded(
        el.dataset.cursorExpand !== undefined ||
          el.dataset.cursor !== undefined ||
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.getAttribute("role") === "button"
      );
    }

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = label ? 76 : expanded ? 46 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] hidden lg:block" aria-hidden="true">
      {/* Lagging ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-brass-400/70"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: label ? "rgba(185,156,94,0.92)" : "rgba(185,156,94,0)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              className="eyebrow text-[0.5625rem] whitespace-nowrap text-obsidian-950"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instant dot — hidden inside the filled label state */}
      <motion.div
        className="absolute top-0 left-0 -mt-[2px] -ml-[2px] size-1 rounded-full bg-brass-300"
        style={{ x, y }}
        animate={{ opacity: visible && !label ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
