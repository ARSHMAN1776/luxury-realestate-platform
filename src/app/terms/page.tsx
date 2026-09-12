import Link from "next/link";
import { ArrowLeft, Scale, Building2, ShieldCheck, Gavel } from "lucide-react";

export const metadata = {
  title: "Terms of Business | Meridian & Voss",
  description: "Terms of engagement, retained buy-side mandate governance, and liability disclosures for Meridian & Voss SA.",
};

export default function TermsPage() {
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
            <Scale className="size-3.5" />
            Mandate Governance & Representation
          </div>
          <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] font-light leading-[1.08] tracking-tight text-bone-50">
            Terms of Business
          </h1>
          <p className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-bone-400">
            General conditions of engagement governing advisory services, retained acquisitions, structural underwriting assessments, and private estate disposals provided by Meridian & Voss SA.
          </p>

          <div className="mt-8 flex flex-wrap gap-8 text-[0.75rem] text-bone-500 font-mono">
            <div>EFFECTIVE DATE: <span className="text-bone-300">1 JANUARY 2026</span></div>
            <div>GOVERNING LAW: <span className="text-bone-300">SWISS OBLIGATIONS CODE (CO)</span></div>
            <div>REGISTRATION: <span className="text-brass-400/90">CH-660.1.740.026-8</span></div>
          </div>
        </div>

        {/* Legal Body Sections */}
        <div className="mt-14 max-w-3xl space-y-12 text-[1.0625rem] leading-relaxed text-bone-300">
          <section className="space-y-4">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <Building2 className="size-5 text-brass-500" />
              1. Nature of Advisory Practice
            </h2>
            <p>
              Meridian & Voss SA is an independent private real estate consultancy operating on a retained fee structure. Unlike conventional brokerage agencies paid exclusively on contingent sales fees, our advisory practice conducts independent buy-side underwriting and sell-side mandates under written retained mandate agreements.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <ShieldCheck className="size-5 text-brass-500" />
              2. Accuracy of Particulars & Diligence
            </h2>
            <p>
              All property descriptions, site area estimates, architectural floor plans, zoning permissions, and financial yield projections provided in our dossiers are compiled from authoritative registries and certified surveys.
            </p>
            <p>
              However, prospective acquirers remain responsible for instructing independent legal counsel, chartered surveyors, and tax advisors prior to binding contracts.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <Gavel className="size-5 text-brass-500" />
              3. Non-Disclosure & Confidentiality Obligations
            </h2>
            <p>
              Private dossiers, off-market seller details, and structural engineering reports provided to registered prospective clients are strictly confidential. Sharing or distributing off-market property dossiers to third parties without prior written consent from Meridian & Voss SA is explicitly prohibited.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100">
              4. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Business and any non-contractual obligations arising out of or in connection with them shall be governed by and construed in accordance with Swiss Law. The courts of the Canton of Geneva shall have exclusive jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
