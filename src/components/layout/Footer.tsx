import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { offices } from "@/data/house";
import { categories } from "@/data/house";
import { Reveal } from "@/components/motion/Reveal";

const FOOTER_NAV = [
  {
    heading: "The Book",
    links: categories.slice(0, 5).map((c) => ({
      label: c.name,
      href: `/properties?category=${c.id}`,
    })),
  },
  {
    heading: "The House",
    links: [
      { label: "Our Practice", href: "/about" },
      { label: "The Partners", href: "/about#partners" },
      { label: "Case Studies", href: "/about#work" },
      { label: "Journal", href: "/journal" },
      { label: "Private Enquiry", href: "/contact" },
    ],
  },
  {
    heading: "Enquiries",
    links: [
      { label: "Acquisition", href: "/contact?intent=acquisition" },
      { label: "Disposal", href: "/contact?intent=disposal" },
      { label: "Investment Advisory", href: "/contact?intent=investment" },
      { label: "Property Management", href: "/contact?intent=management" },
      { label: "Press", href: "/contact?intent=press" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hq = offices.find((o) => o.isHeadquarters) ?? offices[0]!;

  return (
    <footer className="relative border-t border-hairline bg-obsidian-950">
      <div className="shell">
        {/* ── Closing statement ──────────────────────────────────────────── */}
        <div className="grid gap-12 border-b border-hairline py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-7 text-brass-600">Est. Geneva, 1974</p>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-light text-bone-100">
              A house is a fifty-year
              <br />
              relationship, not
              <br />
              a transaction.
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col justify-end">
            <p className="prose-luxe max-w-[46ch]">
              We are independently held by our partners, we do not franchise the
              name, and we have no referral obligations to any other firm. It is
              the reason we are able to advise a client against a purchase.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex w-fit items-center gap-3 border-b border-brass-600 pb-2 eyebrow text-brass-400 transition-colors duration-500 hover:border-brass-300 hover:text-brass-200"
            >
              Begin a conversation
              <ArrowUpRight
                className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        {/* ── Sitemap ────────────────────────────────────────────────────── */}
        <div className="grid gap-12 border-b border-hairline py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {FOOTER_NAV.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="eyebrow mb-6 text-bone-600">{col.heading}</h3>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="link-draw text-[0.875rem] text-bone-300 transition-colors duration-500 hover:text-brass-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Head office */}
          <div>
            <h3 className="eyebrow mb-6 text-bone-600">Head Office</h3>
            <address className="space-y-3.5 text-[0.875rem] leading-relaxed text-bone-300 not-italic">
              <p>
                {hq.city}, {hq.country}
                <br />
                <span className="text-bone-500">{hq.address}</span>
              </p>
              <p>
                <a
                  href={`tel:${hq.phone.replace(/\s/g, "")}`}
                  className="link-draw transition-colors duration-500 hover:text-brass-300"
                >
                  {hq.phone}
                </a>
              </p>
              <p>
                <a
                  href="mailto:enquiries@meridian-voss.com"
                  className="link-draw transition-colors duration-500 hover:text-brass-300"
                >
                  enquiries@meridian-voss.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* ── Office ledger ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-hairline py-8">
          {offices.map((o) => (
            <span key={o.id} className="text-[0.75rem] tracking-wide text-bone-500">
              {o.city}
              <span className="ml-2 text-bone-600">{o.established}</span>
            </span>
          ))}
        </div>

        {/* ── Legal ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-[0.9375rem] font-light tracking-tight text-bone-300">
              MERIDIAN
            </span>
            <span className="text-[0.75rem] text-brass-600">&</span>
            <span className="font-display text-[0.9375rem] font-light tracking-tight text-bone-300">
              VOSS
            </span>
          </div>

          <p className="text-[0.75rem] text-bone-600">
            &copy; {year} Meridian &amp; Voss SA. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookies", href: "/cookies" },
              { label: "Modern Slavery", href: "/modern-slavery" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-draw text-[0.75rem] text-bone-600 transition-colors duration-500 hover:text-bone-300"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[0.75rem] text-bone-600 hover:text-brass-400 transition-colors border-l border-hairline pl-4"
              title="Property Management System & Admin Portal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3 text-brass-500/80"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Partner PMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the viewport edge */}
      <div
        className="pointer-events-none select-none overflow-hidden border-t border-hairline"
        aria-hidden="true"
      >
        <p className="-mb-[0.18em] translate-y-[0.06em] text-center font-display text-[clamp(4rem,17vw,17rem)] leading-[0.8] font-light tracking-tighter text-obsidian-800">
          MERIDIAN&amp;VOSS
        </p>
      </div>
    </footer>
  );
}
