"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface Toast {
  id: number;
  message: string;
}

const ToastContext = React.createContext<((message: string) => void) | null>(null);

/** Small, quiet confirmations. Bottom-left, hairline, gone in four seconds. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const nextId = React.useRef(0);

  const push = React.useCallback((message: string) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}

      <div
        className="pointer-events-none fixed bottom-6 left-[var(--spacing-gutter)] z-[180] flex flex-col gap-2.5"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className="flex items-center gap-3 border border-hairline-strong bg-obsidian-850/95 px-5 py-3.5 backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Check className="size-3.5 shrink-0 text-brass-400" strokeWidth={1.5} />
              <span className="text-[0.8125rem] text-bone-200">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
