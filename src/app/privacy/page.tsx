import Link from "next/link";
import { ArrowLeft, Shield, Lock, EyeOff, FileCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Meridian & Voss",
  description: "Private asset data protection, client confidentiality, and compliance policy under Swiss FADP & EU GDPR standards.",
};

export default function PrivacyPage() {
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
            <Shield className="size-3.5" />
            Client Confidentiality & Governance
          </div>
          <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] font-light leading-[1.08] tracking-tight text-bone-50">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-bone-400">
            Meridian & Voss operates under strict Swiss Federal Act on Data Protection (FADP) and General Data Protection Regulation (GDPR) standards. We treat sovereign, institutional, and private family asset data with absolute confidentiality.
          </p>

          <div className="mt-8 flex flex-wrap gap-8 text-[0.75rem] text-bone-500 font-mono">
            <div>EFFECTIVE DATE: <span className="text-bone-300">1 JANUARY 2026</span></div>
            <div>JURISDICTION: <span className="text-bone-300">GENEVA, SWITZERLAND</span></div>
            <div>REF: <span className="text-brass-400/90">MV-GOV-PRIV-2026</span></div>
          </div>
        </div>

        {/* Legal Body Sections */}
        <div className="mt-14 max-w-3xl space-y-12 text-[1.0625rem] leading-relaxed text-bone-300">
          <section className="space-y-4">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <Lock className="size-5 text-brass-500" />
              1. The Principle of Discretion
            </h2>
            <p>
              As a private property advisory house, client discretion is the foundation of our practice. We do not sell, license, monetize, or publicly disclose any personal identifying information, financial liquidity data, or private transaction records.
            </p>
            <p>
              Off-market representations and buyer searches are protected under legally binding non-disclosure agreements (NDAs) prior to receiving any property dossier or structural documentation.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <EyeOff className="size-5 text-brass-500" />
              2. Data We Collect & Scope
            </h2>
            <p>
              We collect information strictly necessary to fulfill private real estate acquisition and disposal mandates, anti-money laundering compliance (AML), and know-your-customer (KYC) statutory duties:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[0.975rem] text-bone-400">
              <li>Identity verification credentials (passports, corporate registry documents, beneficial ownership structures).</li>
              <li>Target portfolio criteria, geographical preference parameters, and acquisition horizons.</li>
              <li>Direct communications sent through our encrypted enquiry channels or partner correspondence.</li>
            </ul>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100 flex items-center gap-3">
              <FileCheck className="size-5 text-brass-500" />
              3. Data Retention & Cryptographic Storage
            </h2>
            <p>
              Client records and financial diligence files are encrypted using AES-256 standard protocols at rest and TLS 1.3 in transit. Files pertaining to completed transactions are archived in sovereign Swiss data centers under strict multi-factor physical and cryptographic access control.
            </p>
          </section>

          <section className="space-y-4 border-t border-hairline pt-10">
            <h2 className="font-display text-[1.75rem] font-light text-bone-100">
              4. Your Statutory Rights
            </h2>
            <p>
              Under Swiss data privacy law and GDPR, clients retain the absolute right to request an extract of held data, request rectification, or instruct the complete permanent purging of non-statutory records upon contract completion.
            </p>
            <p>
              For data access requests, contact our Data Governance Officer at:{" "}
              <a href="mailto:privacy@meridian-voss.com" className="text-brass-400 hover:underline">
                privacy@meridian-voss.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
