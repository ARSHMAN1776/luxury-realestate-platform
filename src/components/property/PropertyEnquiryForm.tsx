"use client";

import { useState, useRef } from "react";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

interface PropertyEnquiryFormProps {
  propertySlug: string;
  propertyName: string;
}

export function PropertyEnquiryForm({ propertySlug, propertyName }: PropertyEnquiryFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      timeline: fd.get("timeline") as string,
      message: fd.get("message") as string,
      propertySlug,
      propertyName,
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Submission failed. Please try again.");
      }

      setState("success");
      formRef.current?.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div className="border-t border-hairline pt-8">
      <p className="eyebrow mb-6 text-brass-400">Enquire About This Property</p>

      {/* ── Success state ─────────────────────────────────────────── */}
      {state === "success" && (
        <div
          className="flex items-start gap-3 border border-hairline bg-obsidian-900/60 px-5 py-4"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="mt-0.5 size-5 shrink-0 text-brass-400" strokeWidth={1.5} />
          <div>
            <p className="font-display text-[1.0625rem] italic text-bone-100">
              Enquiry received.
            </p>
            <p className="mt-1 text-[0.8125rem] text-bone-500">
              One of our advisors will contact you within one business day.
            </p>
          </div>
        </div>
      )}

      {/* ── Error banner ──────────────────────────────────────────── */}
      {state === "error" && errorMsg && (
        <div
          className="mb-6 flex items-start gap-3 border border-red-900/40 bg-red-950/30 px-5 py-4"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" strokeWidth={1.5} />
          <p className="text-[0.8125rem] text-red-300">{errorMsg}</p>
        </div>
      )}

      {/* ── Form ──────────────────────────────────────────────────── */}
      {state !== "success" && (
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="enq-name"
              name="name"
              label="Full name"
              required
              autoComplete="name"
              disabled={state === "submitting"}
            />
            <Input
              id="enq-email"
              name="email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
              disabled={state === "submitting"}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="enq-phone"
              name="phone"
              type="tel"
              label="Phone (optional)"
              autoComplete="tel"
              disabled={state === "submitting"}
            />
            <div className="relative">
              {/* Timeline select — styled to match underline field design */}
              <label
                htmlFor="enq-timeline"
                className="eyebrow mb-1 block text-bone-500"
              >
                Viewing timeline
              </label>
              <select
                id="enq-timeline"
                name="timeline"
                disabled={state === "submitting"}
                className="w-full appearance-none border-b border-hairline bg-transparent py-2.5 text-[0.9375rem] text-bone-100 outline-none transition-colors duration-200 focus:border-brass-400 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue=""
              >
                <option value="" disabled className="bg-obsidian-900">Select timeline</option>
                <option value="asap" className="bg-obsidian-900">As soon as possible</option>
                <option value="1-month" className="bg-obsidian-900">Within 1 month</option>
                <option value="3-months" className="bg-obsidian-900">Within 3 months</option>
                <option value="6-months" className="bg-obsidian-900">Within 6 months</option>
                <option value="browsing" className="bg-obsidian-900">Just browsing</option>
              </select>
              {/* Caret icon */}
              <span className="pointer-events-none absolute bottom-3 right-0 text-bone-600">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <Textarea
            id="enq-message"
            name="message"
            label="Message (optional)"
            rows={4}
            disabled={state === "submitting"}
          />

          <p className="text-[0.75rem] leading-relaxed text-bone-600">
            By submitting you agree to our{" "}
            <a href="/privacy" className="text-bone-400 underline underline-offset-2 transition-colors hover:text-bone-100">
              Privacy Policy
            </a>
            . Your data is never shared with third parties.
          </p>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={state === "submitting"}
            className="w-full"
          >
            {state === "submitting" ? "Sending…" : "Send enquiry"}
          </Button>
        </form>
      )}
    </div>
  );
}
