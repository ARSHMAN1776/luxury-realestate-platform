"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * The house button. Square corners throughout — no radius anywhere in this
 * identity. Fills draw in from the left on hover via a pseudo-layer rather
 * than a background transition, which keeps the text legible mid-animation.
 */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
    "font-sans font-medium uppercase tracking-[0.18em] whitespace-nowrap",
    "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brass-400",
    "[&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Brass fill — the primary conversion action */
        primary: [
          "bg-brass-500 text-obsidian-950",
          "hover:bg-brass-400",
        ].join(" "),
        /** Hairline outline that fills with bone on hover */
        outline: [
          "border border-hairline-strong text-bone-100",
          "before:absolute before:inset-0 before:-z-0 before:bg-bone-100",
          "before:origin-left before:scale-x-0 before:transition-transform",
          "before:duration-700 before:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:border-bone-100 hover:text-obsidian-950",
          "hover:before:scale-x-100",
        ].join(" "),
        /** Solid bone — used on dark photographic panels */
        solid: [
          "bg-bone-100 text-obsidian-950",
          "hover:bg-white",
        ].join(" "),
        /** Text-only with a drawing underline */
        ghost: [
          "text-bone-100 px-0",
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
          "after:origin-right after:scale-x-0 after:bg-current",
          "after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:text-brass-300 hover:after:origin-left hover:after:scale-x-100",
        ].join(" "),
        /** Brass text on dark, for tertiary actions */
        brass: [
          "text-brass-400 px-0",
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
          "after:origin-right after:scale-x-0 after:bg-brass-400",
          "after:transition-transform after:duration-600 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:text-brass-300 hover:after:origin-left hover:after:scale-x-100",
        ].join(" "),
      },
      size: {
        sm: "h-10 px-5 text-[0.6875rem]",
        md: "h-12 px-7 text-[0.75rem]",
        lg: "h-14 px-9 text-[0.8125rem]",
        /** For ghost / brass variants where padding would break the underline */
        inline: "h-auto py-1 text-[0.75rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {/* Content sits above the ::before fill layer */}
        {asChild ? (
          children
        ) : (
          <span className="relative z-10 inline-flex items-center gap-2.5">
            {children}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
