"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** The text to reveal. Split on the character below into masked lines. */
  text: string;
  className?: string;
  /** Split token — default splits on "|" so callers control line breaks explicitly */
  splitOn?: string;
  delay?: number;
  /** Seconds between each line */
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  once?: boolean;
}

/**
 * Masked line reveal — each line sits inside an overflow-hidden box and
 * translates up from beneath its own baseline. This is the house's signature
 * text entrance and is used for every major heading.
 *
 * Line breaks are author-controlled via the split token rather than measured,
 * which keeps the effect deterministic across breakpoints.
 */
export function TextReveal({
  text,
  className,
  splitOn = "|",
  delay = 0,
  stagger = 0.09,
  duration = 1.15,
  as: Tag = "h2",
  once = true,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const lines = text.split(splitOn).map((l) => l.trim());

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, margin: "-8% 0px -8% 0px" }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Word-by-word fade. Used sparingly — for single emphatic lines where the
 * masked-line treatment would be too heavy.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  once = true,
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[opacity,transform]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once, margin: "-10% 0px" }}
          transition={{
            duration: 0.8,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </span>
  );
}
