import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { PropertyStatus } from "@/types";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 whitespace-nowrap",
    "font-sans uppercase tracking-[0.22em] leading-none",
    "backdrop-blur-md",
  ].join(" "),
  {
    variants: {
      variant: {
        brass: "bg-brass-500/90 text-obsidian-950",
        outline: "border border-hairline-strong bg-obsidian-950/50 text-bone-200",
        solid: "bg-bone-100/95 text-obsidian-950",
        dark: "bg-obsidian-950/80 text-bone-200 border border-hairline",
        /** Muted — for reserved / sold states */
        muted: "bg-obsidian-800/90 text-bone-500 border border-hairline",
      },
      size: {
        sm: "px-2.5 py-1.5 text-[0.5625rem]",
        md: "px-3.5 py-2 text-[0.625rem]",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

/* ── Status badge — one place that maps mandate state to presentation ────── */

const STATUS_COPY: Record<PropertyStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  "under-offer": "Under Offer",
  sold: "Sold",
  "off-market": "Off Market",
};

const STATUS_VARIANT: Record<PropertyStatus, BadgeProps["variant"]> = {
  available: "outline",
  reserved: "muted",
  "under-offer": "muted",
  sold: "muted",
  "off-market": "dark",
};

export function StatusBadge({
  status,
  size = "sm",
  className,
}: {
  status: PropertyStatus;
  size?: BadgeProps["size"];
  className?: string;
}) {
  const available = status === "available";
  return (
    <Badge variant={STATUS_VARIANT[status]} size={size} className={className}>
      <span
        className={cn(
          "size-1 rounded-full",
          available ? "bg-brass-400" : "bg-bone-600"
        )}
        aria-hidden="true"
      />
      {STATUS_COPY[status]}
    </Badge>
  );
}
