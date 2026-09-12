"use client";

import { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useToast } from "@/components/ui/Toast";

/**
 * The Newsletter section.
 * Theme-aware layout:
 * - In Light Mode: Renders a soft, elegant warm light-grey/ivory card (#eae6db) with crisp dark text (#121215).
 * - In Dark Mode: Renders a deep obsidian black card (#0c0c0e) with bone text (#f5f2ec).
 */
export function Newsletter() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    await new Promise((r) => setTimeout(r, 800));

    toast("Subscribed. Welcome to the private house dispatch.");
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="newsletter"
      className="relative py-12 sm:py-16 border-t border-hairline bg-ground transition-colors duration-400"
    >
      <div className="shell max-w-5xl">
        <Reveal>
          {/* Executive invitation card lockup */}
          <div className="relative overflow-hidden border p-8 sm:p-12 transition-colors duration-400 shadow-lift
            bg-[#0c0c0e] border-brass-500/35 text-[#f5f2ec]
            [.light_&]:bg-[#eae6db] [.light_&]:border-[#d0c9b8] [.light_&]:text-[#121215]
          ">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brass-500/10 blur-3xl" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Headline & Info */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 mb-3">
                  <Mail className="size-3.5" />
                  The House Dispatch
                </div>

                <h2 className="font-display text-[1.85rem] sm:text-[2.35rem] leading-tight font-light text-bone-100 [.light_&]:text-[#121215]">
                  Off-market releases & private market intelligence.
                </h2>

                <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-400 [.light_&]:text-[#5f5a50]">
                  Published on the first Tuesday of each month. Twelve dispatches a year. Unsubscribe at any time.
                </p>

                <div className="mt-4 flex items-center gap-2 text-[0.75rem] font-medium text-brass-600 [.light_&]:text-[#6a604a]">
                  <ShieldCheck className="size-4 shrink-0 text-brass-600 [.light_&]:text-brass-700" />
                  <span>Strict zero-spam policy. Your address is never shared.</span>
                </div>
              </div>

              {/* Right Column: Sleek Form Lockup */}
              <div className="lg:col-span-6">
                {submitted ? (
                  <div className="flex items-center gap-3 bg-brass-500/15 border border-brass-500/40 p-4 text-brass-200 [.light_&]:text-[#3a2f1b] text-[0.875rem]">
                    <Check className="size-5 text-brass-500 shrink-0" />
                    <span>You are registered for the private dispatch. Welcome.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address..."
                        disabled={loading}
                        className="w-full px-4 py-3.5 text-[0.875rem] outline-none transition-colors
                          bg-[#16161c] border-[#2e2e38] text-[#f5f2ec] placeholder:text-[#6e685e] focus:border-brass-400
                          [.light_&]:bg-[#f7f5f0] [.light_&]:border-[#c8c2b4] [.light_&]:text-[#121215] [.light_&]:placeholder:text-[#888275] [.light_&]:focus:border-brass-600
                        "
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-brass-500 hover:bg-brass-600 [.light_&]:bg-brass-600 [.light_&]:hover:bg-brass-700 text-obsidian-950 [.light_&]:text-white font-semibold text-[0.75rem] tracking-[0.15em] uppercase px-6 py-3.5 inline-flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        "Subscribing..."
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="size-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
