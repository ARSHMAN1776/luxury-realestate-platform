import Link from "next/link";
import { ArrowLeft, Cookie, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Cookie & Digital Policy | Meridian & Voss",
  description: "Minimalist cookie policy and digital tracking standards of Meridian & Voss SA.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-ground text-ink pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="shell">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.8125rem] text-bone-400 hover:text-brass-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to Main Overview
        </Link>

        {/* Page Header */}
        <div className="max-w-4xl border-b border-hairline pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brass-500/10 border border-brass-500/20 text-brass-400 text-[0.75rem] font-medium tracking-widest uppercase mb-6">
            <Cookie className="size-3.5" />
            Digital Privacy & Storage
          </div>
          <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] font-light leading-[1.08] tracking-tight text-bone-50">
            Cookie & Session Policy
          </h1>
          <p className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-bone-400">
            We believe digital luxury requires zero intrusive tracking. Our website utilizes strictly essential session cookies and local browser storage necessary to remember your theme preference and active search filters.
          </p>

          <div className="mt-8 flex flex-wrap gap-8 text-[0.75rem] text-bone-500 font-mono">
            <div>TRACKING STATUS: <span className="text-brass-400 font-semibold">ZERO THIRD-PARTY AD TRACKERS</span></div>
            <div>ANALYTICS: <span className="text-bone-300">ANONYMISED AGGREGATE ONLY</span></div>
          </div>
        </div>

        {/* Legal Body Sections */}
        <div className="mt-14 max-w-3xl space-y-12 text-[1.0625rem] leading-relaxed text-bone-300">
          <section className="space-y-4">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <CheckCircle2 className="size-5 text-brass-500" />
              1. Essential Technical Storage
            </h2>
            <p>
              When you browse Meridian & Voss, small data identifiers are stored locally on your device solely to operate core interface features:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[0.975rem] text-bone-400">
              <li><strong className="text-bone-200">Theme Preference:</strong> Remembers your Light or Dark Mode selection (`theme-preference`).</li>
              <li><strong className="text-bone-200">Session State:</strong> Maintains active search filter criteria during property search sessions (`property-filter-state`).</li>
            </ul>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <ShieldAlert className="size-5 text-brass-500" />
              2. What We Never Do
            </h2>
            <p>
              We do not deploy third-party advertising pixels, cross-site behavioral tracking scripts, data brokers, or retargeting networks. Your browsing behavior across our estate portfolio remains completely private.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100">
              3. Managing Cookie Preferences
            </h2>
            <p>
              You can clear or disable browser local storage and cookies at any time using your web browser settings. Disabling essential local storage will reset your light/dark mode preference upon page reload.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
