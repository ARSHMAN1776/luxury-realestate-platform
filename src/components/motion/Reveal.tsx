"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the animation begins once in view */
  delay?: number;
  /** Seconds the animation runs for */
  duration?: number;
  direction?: Direction;
  /** Travel distance in pixels */
  distance?: number;
  /** Fire once (default) or every time it enters the viewport */
  once?: boolean;
  /** Viewport margin — negative values fire the reveal before the element is fully in view */
  margin?: string;
  as?: "div" | "section" | "article" | "li" | "span" | "header" | "footer";
}

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * The house reveal. Elements arrive from below with a long, weighted ease —
 * never a bounce, never a spring. Motion is suppressed entirely when the
 * visitor has asked for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  direction = "up",
  distance = 34,
  once = true,
  margin = "-12% 0px -12% 0px",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const axis = OFFSET[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: axis.x * distance,
      y: axis.y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
