"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hairline accordion. The trigger is a full-width row with a rotating plus —
 * no chevrons in this identity. Radix handles the a11y contract.
 */

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-hairline", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-start justify-between gap-8 py-7 text-left",
        "transition-colors duration-500 hover:text-brass-300",
        "data-[state=open]:text-brass-200",
        className
      )}
      {...props}
    >
      <span className="font-display text-[1.25rem] leading-tight font-light sm:text-[1.5rem]">
        {children}
      </span>
      <Plus
        className={cn(
          "mt-1 size-4 shrink-0 text-bone-500 transition-all duration-700",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:text-brass-400",
          "group-data-[state=open]:rotate-135 group-data-[state=open]:text-brass-300"
        )}
        strokeWidth={1}
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=closed]:animate-[acc-up_450ms_cubic-bezier(0.16,1,0.3,1)]",
      "data-[state=open]:animate-[acc-down_450ms_cubic-bezier(0.16,1,0.3,1)]",
      className
    )}
    {...props}
  >
    <div className="prose-luxe max-w-[62ch] pb-8 pr-12">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
