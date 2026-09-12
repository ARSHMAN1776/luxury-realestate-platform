"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

/**
 * House dialog. Enters as a panel from the right on desktop and from the
 * bottom on mobile — a drawer, not a floating card, because a floating card
 * with a radius would fight everything else in this identity.
 *
 * `forceMount` on both parts hands exit animation to AnimatePresence; Radix
 * would otherwise unmount before the transition could run.
 */
export function DialogContent({
  open,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              className="fixed inset-0 z-[150] bg-obsidian-950/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </DialogPrimitive.Overlay>

          <DialogPrimitive.Content asChild forceMount>
            <motion.div
              className={cn(
                "fixed z-[160] flex flex-col border-hairline bg-obsidian-900 outline-none",
                "inset-x-0 bottom-0 max-h-[92dvh] border-t",
                "sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-[min(34rem,100vw)] sm:border-t-0 sm:border-l",
                className
              )}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex items-start justify-between gap-6 border-b border-hairline px-7 py-6 sm:px-9 sm:py-8">
                <div>
                  <DialogPrimitive.Title className="font-display text-[1.75rem] leading-tight font-light text-bone-100">
                    {title}
                  </DialogPrimitive.Title>
                  {description ? (
                    <DialogPrimitive.Description className="mt-2.5 max-w-[42ch] text-[0.8125rem] leading-relaxed text-bone-500">
                      {description}
                    </DialogPrimitive.Description>
                  ) : (
                    <DialogPrimitive.Description className="sr-only">
                      {title}
                    </DialogPrimitive.Description>
                  )}
                </div>

                <DialogPrimitive.Close
                  className="-mt-1 shrink-0 text-bone-400 transition-colors duration-500 hover:text-brass-300"
                  aria-label="Close"
                >
                  <X className="size-5" strokeWidth={1.25} />
                </DialogPrimitive.Close>
              </div>

              <div className="no-scrollbar flex-1 overflow-y-auto px-7 py-7 sm:px-9 sm:py-9">
                {children}
              </div>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}
