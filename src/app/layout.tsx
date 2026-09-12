import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meridian-voss.com"),
  title: {
    default: "MERIDIAN & VOSS — International Private Property House",
    template: "%s | MERIDIAN & VOSS",
  },
  description:
    "Curators of the world's most exceptional residential and commercial properties. International private property house, est. 1974.",
  keywords: [
    "luxury real estate",
    "premium properties",
    "international property",
    "luxury villas",
    "penthouse",
    "mansion",
    "commercial property",
    "property investment",
    "high-end real estate",
  ],
  authors: [{ name: "MERIDIAN & VOSS" }],
  creator: "MERIDIAN & VOSS",
  publisher: "MERIDIAN & VOSS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meridian-voss.com",
    siteName: "MERIDIAN & VOSS",
    title: "MERIDIAN & VOSS — International Private Property House",
    description:
      "Curators of the world's most exceptional residential and commercial properties.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MERIDIAN & VOSS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERIDIAN & VOSS — International Private Property House",
    description:
      "Curators of the world's most exceptional residential and commercial properties.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[500] focus:border focus:border-brass-400 focus:bg-obsidian-950 focus:px-5 focus:py-3 focus:eyebrow focus:text-brass-300"
        >
          Skip to content
        </a>

        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
