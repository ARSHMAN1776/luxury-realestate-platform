"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { IMG, BLUR_OBSIDIAN } from "@/lib/images";
import { offices } from "@/data/house";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { label: "HOME", href: "/", index: "01" },
  { label: "PROPERTIES", href: "/properties", index: "02" },
  { label: "JOURNAL", href: "/journal", index: "03" },
  { label: "CONTACT", href: "/contact", index: "04" },
  { label: "ABOUT", href: "/about", index: "05" },
] as const;

const MENU_IMAGES = [IMG.exteriorPoolVilla, IMG.interiorGallery, IMG.cityDubaiDusk, IMG.beachAerialTurquoise, IMG.exteriorPoolVilla];

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  /* Scroll state — condense past the fold, hide on downward travel. */
  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Only hide well past the fold, and never while the menu is open.
      setHidden(y > 400 && y > lastY && !menuOpen);
      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  /* Close on route change. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Lock the page and wire Escape while the overlay owns the viewport. */
  useEffect(() => {
    if (!menuOpen) {
      document.documentElement.classList.remove("scroll-locked");
      return;
    }
    document.documentElement.classList.add("scroll-locked");

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [menuOpen]);

  const isHomePage = pathname === "/";
  const useLightText = isHomePage && !scrolled;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[100]",
          "transition-[background-color,backdrop-filter,border-color] duration-700",
          scrolled || !isHomePage
            ? "border-b border-hairline bg-obsidian-950/85 light:bg-[#f7f5f0]/95 backdrop-blur-xl shadow-sm"
            : "border-b border-transparent bg-transparent"
        )}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[padding] duration-700",
            scrolled && !menuOpen ? "py-4" : "py-6 lg:py-8"
          )}
        >
          {/* Wordmark + Divider + PROPERTIES */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group relative z-10 flex items-baseline gap-2"
              aria-label="MERIDIAN & VOSS — home"
            >
              <span className={cn(
                "font-display text-[1.125rem] leading-none font-light tracking-wide sm:text-[1.35rem]",
                useLightText ? "text-white" : "text-bone-100 light:text-gray-900"
              )}>
                MERIDIAN
              </span>
              <span className="text-[0.9375rem] leading-none text-brass-500 font-serif italic">
                &
              </span>
              <span className={cn(
                "font-display text-[1.125rem] leading-none font-light tracking-wide sm:text-[1.35rem]",
                useLightText ? "text-white" : "text-bone-100 light:text-gray-900"
              )}>
                VOSS
              </span>
            </Link>

            <span className="h-4 w-px bg-hairline-strong hidden sm:block" />
            <span className={cn(
              "hidden sm:block text-[0.6875rem] tracking-[0.2em] font-mono uppercase",
              useLightText ? "text-white/70" : "text-bone-400 light:text-gray-600"
            )}>
              PROPERTIES
            </span>
          </div>

          {/* Center navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[0.75rem] tracking-[0.18em] font-mono transition-colors duration-300 py-1 uppercase relative",
                    active
                      ? "font-semibold border-b-2 border-brass-400 " + (useLightText ? "text-white" : "text-bone-100 light:text-gray-900")
                      : useLightText
                      ? "text-white/70 hover:text-white"
                      : "text-bone-400 light:text-gray-600 light:hover:text-gray-900 hover:text-bone-100"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Quick Search trigger */}
            <Link
              href="/properties"
              className={cn(
                "p-2 transition-colors",
                useLightText ? "text-white/70 hover:text-white" : "text-bone-400 light:text-gray-600 light:hover:text-gray-900 hover:text-brass-400"
              )}
              title="Search Properties"
            >
              <Search className="size-4" strokeWidth={1.5} />
            </Link>

            <ThemeToggle />

            <Link
              href="/contact"
              className={cn(
                "hidden border px-5 py-2.5 text-[0.6875rem] tracking-[0.15em] font-mono uppercase transition-colors duration-300 md:inline-block",
                useLightText
                  ? "border-white/30 text-white hover:border-brass-400 hover:text-brass-300"
                  : "border-hairline-strong text-bone-100 light:text-gray-900 light:border-gray-400 hover:border-brass-400 hover:text-brass-500"
              )}
            >
              PRIVATE ENQUIRY
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "relative z-10 flex items-center gap-2 transition-colors duration-300",
                useLightText ? "text-white hover:text-brass-300" : "text-bone-100 light:text-gray-900 hover:text-brass-400"
              )}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="size-5" strokeWidth={1.25} aria-hidden="true" />
              ) : (
                <Menu className="size-5" strokeWidth={1.25} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-viewport menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[95] bg-obsidian-950"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
          >
            <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_0.85fr]">
              {/* Links */}
              <div className="flex flex-col justify-center px-[var(--spacing-gutter)] pt-28 pb-12 lg:pt-24">
                <nav aria-label="Menu">
                  <ul>
                    {NAV.map((item, i) => (
                      <li key={item.href} className="border-b border-hairline">
                        <Link
                          href={item.href}
                          onMouseEnter={() => setHoveredIndex(i)}
                          className="group flex items-baseline gap-5 py-5 sm:py-7"
                        >
                          <motion.span
                            className="eyebrow text-bone-600 transition-colors duration-500 group-hover:text-brass-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 + i * 0.06, duration: 0.6 }}
                          >
                            {item.index}
                          </motion.span>

                          <span className="mask-line flex-1">
                            <motion.span
                              className="block font-display text-[clamp(2.25rem,6.5vw,5rem)] leading-[0.95] font-light text-bone-100 transition-colors duration-500 group-hover:text-brass-200"
                              initial={{ y: "110%" }}
                              animate={{ y: "0%" }}
                              transition={{
                                delay: 0.2 + i * 0.075,
                                duration: 1,
                                ease: EASE,
                              }}
                            >
                              {item.label}
                            </motion.span>
                          </span>

                          <ArrowUpRight
                            className="size-6 shrink-0 -translate-x-2 text-brass-500 opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100"
                            strokeWidth={1}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Offices strip */}
                <motion.div
                  className="mt-12 lg:mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
                >
                  <p className="eyebrow mb-5 text-bone-600">Nine Offices</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {offices.map((o) => (
                      <span
                        key={o.id}
                        className="text-[0.8125rem] text-bone-400"
                      >
                        {o.city}
                        {o.isHeadquarters && (
                          <span className="ml-1.5 text-brass-600">HQ</span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Preview panel — reacts to the hovered link */}
              <div className="relative hidden overflow-hidden lg:block">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={hoveredIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: EASE }}
                  >
                    <Image
                      src={MENU_IMAGES[hoveredIndex] ?? MENU_IMAGES[0]!}
                      alt=""
                      fill
                      sizes="45vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_OBSIDIAN}
                    />
                    <div className="absolute inset-0 bg-obsidian-950/35" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 z-10 p-10">
                  <div className="rule mb-5" />
                  <p className="max-w-[30ch] font-display text-[1.5rem] leading-tight font-light text-bone-100">
                    Sixty-eight per cent of what we place is never advertised.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
