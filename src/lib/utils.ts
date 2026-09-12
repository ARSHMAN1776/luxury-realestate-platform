import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Stagger delay for sequential reveal animations.
 * @param index - Element position in sequence
 * @param baseDelay - Starting delay in seconds (default 0)
 * @param increment - Time between each reveal (default 0.08s)
 */
export function stagger(index: number, baseDelay = 0, increment = 0.08) {
  return baseDelay + index * increment;
}

/**
 * Formats large numbers with appropriate suffix (M, B, K)
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

/**
 * Formats currency with proper locale and notation.
 */
export function formatPrice(
  price: number,
  currency: string = "USD",
  notation: "compact" | "standard" = "standard"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
