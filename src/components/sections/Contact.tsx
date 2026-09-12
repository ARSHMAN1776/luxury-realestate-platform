"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/**
 * Private enquiry. A form that resolves to a named principal — this is not a
 * newsletter capture posing as a contact form.
 */
export function Contact() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));

    toast("Enquiry received. A principal will reply within one working day.");
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <Section id="contact" className="border-t border-hairline">
      <SectionHeader
        index="14"
        eyebrow="Private enquiry"
        title="Begin the|conversation."
        standfirst="Send a private enquiry and a named principal will reply within one working day. Discretion is assumed, confidentiality undertakings available on request."
      />

      <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        {/* ── Left: detail ─────────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div>
            <h3 className="font-display text-[1.5rem] leading-tight font-light text-bone-100">
              What happens next
            </h3>
            <div className="prose-luxe mt-6 space-y-4">
              <p>
                Your enquiry is directed to a named principal based on the
                property category or region you mention. They respond personally
                — no template, no queue.
              </p>
              <p>
                Most first conversations happen by telephone or secure video
                within forty-eight hours. If the mandate you are asking about
                requires an NDA, one will be sent before any material is
                released.
              </p>
            </div>

            <div className="mt-10 space-y-5 border-t border-hairline pt-9">
              <div>
                <p className="eyebrow mb-2 text-bone-600">Geneva office</p>
                <p className="text-[0.9375rem] text-bone-400">
                  Rue du Rhône 67, 1204 Geneva
                  <br />
                  <a
                    href="tel:+41225550174"
                    className="link-draw text-brass-400 transition-colors duration-500 hover:text-brass-300"
                  >
                    +41 22 555 0174
                  </a>
                </p>
              </div>
              <div>
                <p className="eyebrow mb-2 text-bone-600">General enquiries</p>
                <p className="text-[0.9375rem] text-bone-400">
                  <a
                    href="mailto:enquiries@meridian-voss.com"
                    className="link-draw text-brass-400 transition-colors duration-500 hover:text-brass-300"
                  >
                    enquiries@meridian-voss.com
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Button asChild variant="brass" size="inline">
                <Link href="/offices">
                  View all offices
                  <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* ── Right: form ──────────────────────────────────────────────── */}
        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <Input
                label="Given name"
                name="firstName"
                required
                autoComplete="given-name"
                disabled={loading}
              />
              <Input
                label="Family name"
                name="lastName"
                required
                autoComplete="family-name"
                disabled={loading}
              />
            </div>

            <Input
              label="Email address"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={loading}
            />

            <Input
              label="Telephone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              disabled={loading}
            />

            <Textarea
              label="Your enquiry"
              name="message"
              rows={6}
              required
              placeholder="Tell us what you are looking for, or reference a specific mandate from the book…"
              disabled={loading}
            />

            <div className="flex items-start gap-5 border-t border-hairline pt-8">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <Send className="size-3.5" strokeWidth={1.5} />
                {loading ? "Sending…" : "Send enquiry"}
              </Button>

              <p className="mt-2 max-w-[42ch] text-[0.75rem] leading-relaxed text-bone-600">
                By submitting you consent to contact from MERIDIAN &amp; VOSS
                regarding your enquiry. Unsubscribe at any time.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
