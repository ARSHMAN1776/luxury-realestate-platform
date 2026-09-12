"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/layout/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SavedProvider } from "@/components/property/SavedProvider";
import { ToastProvider } from "@/components/ui/Toast";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <ThemeProvider>
        <ToastProvider>
          <main id="main">{children}</main>
        </ToastProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Preloader />
      <Cursor />
      <Header />

      <SmoothScroll>
        <SavedProvider>
          <ToastProvider>
            <main id="main">{children}</main>
            <Footer />
          </ToastProvider>
        </SavedProvider>
      </SmoothScroll>
    </ThemeProvider>
  );
}
