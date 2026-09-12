import Link from "next/link";
import { ArrowLeft, Award, Globe2, FileCheck2, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Modern Slavery Statement | Meridian & Voss",
  description: "Ethical labor standards, supply chain transparency, and human rights compliance policy of Meridian & Voss SA.",
};

export default function ModernSlaveryPage() {
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
            <Award className="size-3.5" />
            Ethical Governance & Human Rights
          </div>
          <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] font-light leading-[1.08] tracking-tight text-bone-50">
            Modern Slavery & Ethical Standards
          </h1>
          <p className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-bone-400">
            Meridian & Voss SA is committed to preventing modern slavery, human trafficking, and forced labor across all operational offices, architectural development partnerships, and property management supply chains.
          </p>

          <div className="mt-8 flex flex-wrap gap-8 text-[0.75rem] text-bone-500 font-mono">
            <div>STATEMENT PERIOD: <span className="text-bone-300">2026 FINANCIAL YEAR</span></div>
            <div>COMPLIANCE: <span className="text-brass-400/90">UK MODERN SLAVERY ACT & INTERNATIONAL STANDARDS</span></div>
          </div>
        </div>

        {/* Legal Body Sections */}
        <div className="mt-14 max-w-3xl space-y-12 text-[1.0625rem] leading-relaxed text-bone-300">
          <section className="space-y-4">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <Globe2 className="size-5 text-brass-500" />
              1. Our Operational Supply Chain
            </h2>
            <p>
              Our primary operations encompass high-end real estate underwriting, advisory, and property asset management across Switzerland, the United Kingdom, France, Spain, the UAE, and select international jurisdictions.
            </p>
            <p>
              We maintain strict oversight over secondary supply chains, including estate maintenance contractors, artisan craftsmen, security firms, and architectural development partners.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <FileCheck2 className="size-5 text-brass-500" />
              2. Vendor Due Diligence & Contracting
            </h2>
            <p>
              We enforce zero-tolerance standards for forced, bonded, or involuntary labor. All key suppliers, estate contractors, and facility vendors must undergo background compliance checks verifying:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[0.975rem] text-bone-400">
              <li>Payment of fair living wages above legal minimum requirements in their jurisdiction.</li>
              <li>Provision of clear written employment contracts in workers&apos; native languages.</li>
              <li>Absence of passport retention or restrictions on freedom of movement.</li>
            </ul>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <HeartHandshake className="size-5 text-brass-500" />
              3. Continuous Monitoring & Reporting
            </h2>
            <p>
              Partner directors review supply chain compliance annually. Any breach or suspected breach of human rights standards by a contractor or service partner results in immediate contract suspension and formal review by our legal team.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
