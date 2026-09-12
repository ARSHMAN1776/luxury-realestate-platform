"use client";

import * as React from "react";
import {
  Bookmark,
  Share2,
  CalendarDays,
  MessageSquare,
  Link2,
  Mail,
  Check,
  Loader2,
} from "lucide-react";
import { FaWhatsapp, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import type { Property } from "@/types";
import { getAgentById } from "@/data/agents";
import { cn, formatPrice } from "@/lib/utils";
import { useSaved } from "./SavedProvider";
import { useToast } from "@/components/ui/Toast";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Field";

/* ═══════════════════════════════════════════════════════════════════════════
   SAVE
   ═══════════════════════════════════════════════════════════════════════════ */

export function SaveButton({
  slug,
  name,
  variant = "icon",
  className,
}: {
  slug: string;
  name: string;
  variant?: "icon" | "labelled";
  className?: string;
}) {
  const { isSaved, toggle, ready } = useSaved();
  const toast = useToast();
  const active = ready && isSaved(slug);

  function onClick(e: React.MouseEvent) {
    /* Cards are wrapped in a link — the action must not navigate. */
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
    toast(active ? `${name} removed from your collection` : `${name} saved to your collection`);
  }

  if (variant === "labelled") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "group/save flex items-center gap-3 border-b border-hairline pb-2.5 eyebrow",
          "transition-colors duration-500",
          active ? "border-brass-500 text-brass-300" : "text-bone-400 hover:text-bone-100",
          className
        )}
      >
        <Bookmark
          className={cn("size-3.5 transition-all duration-500", active && "fill-brass-400")}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {active ? "Saved" : "Save property"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from your collection` : `Save ${name}`}
      data-cursor-expand
      className={cn(
        "flex size-10 items-center justify-center border backdrop-blur-md transition-all duration-500",
        active
          ? "border-brass-500 bg-brass-500/90 text-obsidian-950"
          : "border-hairline-strong bg-obsidian-950/45 text-bone-100 hover:border-bone-100 hover:bg-obsidian-950/70",
        className
      )}
    >
      <Bookmark
        className={cn("size-4 transition-transform duration-500", active && "fill-current")}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARE
   ═══════════════════════════════════════════════════════════════════════════ */

export function ShareButton({
  property,
  variant = "icon",
  className,
}: {
  property: Property;
  variant?: "icon" | "labelled";
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const toast = useToast();

  const url = `https://meridian-voss.com/properties/${property.slug}`;
  const text = `${property.name} — ${property.location.short}`;

  async function onTrigger(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    /* Prefer the OS sheet where it exists; fall back to our own panel. */
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: property.name, text, url });
        return;
      } catch {
        /* Dismissed or unsupported in this context — open the panel instead. */
      }
    }
    setOpen(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast("Copy unavailable — select the address to copy it");
    }
  }

  const channels = [
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(property.name)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    },
    {
      label: "LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      icon: FaXTwitter,
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <>
      {variant === "labelled" ? (
        <button
          type="button"
          onClick={onTrigger}
          className={cn(
            "flex items-center gap-3 border-b border-hairline pb-2.5 eyebrow text-bone-400",
            "transition-colors duration-500 hover:text-bone-100",
            className
          )}
        >
          <Share2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Share property
        </button>
      ) : (
        <button
          type="button"
          onClick={onTrigger}
          aria-label={`Share ${property.name}`}
          data-cursor-expand
          className={cn(
            "flex size-10 items-center justify-center border border-hairline-strong bg-obsidian-950/45",
            "text-bone-100 backdrop-blur-md transition-all duration-500",
            "hover:border-bone-100 hover:bg-obsidian-950/70",
            className
          )}
        >
          <Share2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          open={open}
          title="Share this address"
          description={`${property.name}, ${property.location.short}`}
        >
          <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 bg-obsidian-900 px-5 py-5 transition-colors duration-500 hover:bg-obsidian-850"
              >
                <c.icon
                  className="size-4 text-bone-500 transition-colors duration-500 group-hover:text-brass-400"
                  aria-hidden="true"
                />
                <span className="eyebrow text-bone-200">{c.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <p className="eyebrow mb-3.5 text-bone-600">Direct link</p>
            <div className="flex items-center gap-4 border-b border-hairline pb-3.5">
              <span className="flex-1 truncate text-[0.8125rem] text-bone-400">{url}</span>
              <button
                type="button"
                onClick={copy}
                className="flex shrink-0 items-center gap-2 eyebrow text-brass-400 transition-colors duration-500 hover:text-brass-200"
              >
                {copied ? (
                  <Check className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Link2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <p className="mt-9 text-[0.75rem] leading-relaxed text-bone-600">
            {property.discreet
              ? "This mandate is held discreetly. Please share only with parties who have signed our confidentiality undertaking."
              : "Shared links carry no client information and expire on the withdrawal of the mandate."}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENQUIRE  ·  SCHEDULE A VIEWING
   Both use one form, in two modes — the fields differ only by intent.
   ═══════════════════════════════════════════════════════════════════════════ */

type Mode = "viewing" | "enquiry";
type State = "idle" | "sending" | "sent";

const COPY: Record<Mode, { title: string; description: string; cta: string; done: string }> = {
  viewing: {
    title: "Arrange a viewing",
    description:
      "Private viewings are accompanied by the partner holding the mandate. We will confirm within one business day.",
    cta: "Request this viewing",
    done: "Your viewing request has been received.",
  },
  enquiry: {
    title: "Private enquiry",
    description:
      "Your enquiry goes directly to the partner holding this mandate — not to a call centre.",
    cta: "Send enquiry",
    done: "Your enquiry has been received.",
  },
};

const TIMES = ["Morning, 09:00 – 12:00", "Afternoon, 12:00 – 16:00", "Evening, 16:00 – 19:00"];

export function PropertyEnquiry({
  property,
  mode,
  trigger,
}: {
  property: Property;
  mode: Mode;
  trigger: (open: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<State>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const toast = useToast();

  const agent = getAgentById(property.agentId);
  const copy = COPY[mode];

  /* Viewings cannot be requested for today or earlier. */
  const minDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (name.length < 2) next.name = "Please give us a name we can address you by.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "A valid email address, please.";
    if (mode === "viewing" && !data.get("date")) next.date = "Choose a preferred date.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    /* No backend in this build — the delay stands in for the round-trip. */
    await new Promise((r) => setTimeout(r, 1100));
    setState("sent");
    toast(copy.done);
  }

  function close(next: boolean) {
    setOpen(next);
    if (!next) {
      /* Reset after the exit transition, not during it. */
      setTimeout(() => {
        setState("idle");
        setErrors({});
      }, 650);
    }
  }

  return (
    <>
      {trigger(() => setOpen(true))}

      <Dialog open={open} onOpenChange={close}>
        <DialogContent
          open={open}
          title={state === "sent" ? "Thank you" : copy.title}
          description={state === "sent" ? undefined : copy.description}
        >
          {state === "sent" ? (
            <div>
              <p className="prose-luxe">
                {copy.done} {agent?.name ?? "The partner holding this mandate"} will be in touch
                personally, usually within one business day.
              </p>

              {agent && (
                <div className="mt-9 border-t border-hairline pt-7">
                  <p className="eyebrow mb-4 text-bone-600">Your point of contact</p>
                  <p className="font-display text-[1.5rem] font-light text-bone-100">
                    {agent.name}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] text-bone-500">
                    {agent.role} · {agent.base}
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={`mailto:${agent.email}`}
                      className="link-draw w-fit text-[0.8125rem] text-brass-400"
                    >
                      {agent.email}
                    </a>
                    <a
                      href={`tel:${agent.phone.replace(/\s/g, "")}`}
                      className="link-draw w-fit text-[0.8125rem] text-brass-400"
                    >
                      {agent.phone}
                    </a>
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                size="md"
                className="mt-9 w-full"
                onClick={() => close(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {/* Which property this concerns — stated, not assumed. */}
              <div className="mb-9 border border-hairline px-5 py-4">
                <p className="eyebrow mb-2 text-bone-600">Regarding</p>
                <p className="font-display text-[1.25rem] leading-snug font-light text-bone-100">
                  {property.name}
                </p>
                <p className="mt-1 text-[0.75rem] text-bone-500">
                  {property.reference} · {property.location.short} ·{" "}
                  {property.priceOnApplication
                    ? "Price on application"
                    : formatPrice(property.price, property.currency, "compact")}
                </p>
              </div>

              <div className="space-y-7">
                <Input name="name" label="Full name" placeholder="Your name" error={errors.name} required />
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  error={errors.email}
                  required
                />
                <Input name="phone" type="tel" label="Telephone (optional)" placeholder="+41 22 000 0000" />

                {mode === "viewing" ? (
                  <>
                    <Input
                      name="date"
                      type="date"
                      label="Preferred date"
                      min={minDate}
                      error={errors.date}
                      required
                    />
                    <Select name="time" label="Preferred time">
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </Select>
                    <Select name="format" label="Format">
                      <option value="in-person">In person</option>
                      <option value="virtual">Accompanied virtual tour</option>
                      <option value="representative">By my representative</option>
                    </Select>
                  </>
                ) : (
                  <Select name="interest" label="Nature of interest">
                    <option value="acquisition">Acquisition for own use</option>
                    <option value="investment">Investment</option>
                    <option value="information">Further information</option>
                    <option value="comparable">Comparable properties</option>
                  </Select>
                )}

                <Textarea
                  name="message"
                  label="Message (optional)"
                  rows={4}
                  placeholder={
                    mode === "viewing"
                      ? "Anything we should prepare in advance."
                      : "What would you like to know?"
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="mt-10 w-full"
                disabled={state === "sending"}
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" strokeWidth={1.75} />
                    Sending
                  </>
                ) : (
                  copy.cta
                )}
              </Button>

              <p className="mt-6 text-[0.6875rem] leading-relaxed text-bone-600">
                We hold your details for the purpose of this enquiry alone. We do not sell data and
                we do not add you to a mailing list without your asking.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

/* Convenience wrappers so cards and detail pages stay declarative. */

export function ViewingButton({
  property,
  variant = "icon",
  className,
}: {
  property: Property;
  variant?: "icon" | "labelled";
  className?: string;
}) {
  return (
    <PropertyEnquiry
      property={property}
      mode="viewing"
      trigger={(open) =>
        variant === "labelled" ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            className={cn(
              "flex items-center gap-3 border-b border-hairline pb-2.5 eyebrow text-bone-400",
              "transition-colors duration-500 hover:text-bone-100",
              className
            )}
          >
            <CalendarDays className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Schedule viewing
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            aria-label={`Schedule a viewing of ${property.name}`}
            data-cursor-expand
            className={cn(
              "flex size-10 items-center justify-center border border-hairline-strong bg-obsidian-950/45",
              "text-bone-100 backdrop-blur-md transition-all duration-500",
              "hover:border-bone-100 hover:bg-obsidian-950/70",
              className
            )}
          >
            <CalendarDays className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        )
      }
    />
  );
}

export function InquiryButton({
  property,
  variant = "icon",
  className,
}: {
  property: Property;
  variant?: "icon" | "labelled" | "primary";
  className?: string;
}) {
  return (
    <PropertyEnquiry
      property={property}
      mode="enquiry"
      trigger={(open) => {
        if (variant === "primary") {
          return (
            <Button variant="primary" size="lg" className={className} onClick={open}>
              Private enquiry
            </Button>
          );
        }
        if (variant === "labelled") {
          return (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className={cn(
                "flex items-center gap-3 border-b border-hairline pb-2.5 eyebrow text-bone-400",
                "transition-colors duration-500 hover:text-bone-100",
                className
              )}
            >
              <MessageSquare className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              Property inquiry
            </button>
          );
        }
        return (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            aria-label={`Enquire about ${property.name}`}
            data-cursor-expand
            className={cn(
              "flex size-10 items-center justify-center border border-hairline-strong bg-obsidian-950/45",
              "text-bone-100 backdrop-blur-md transition-all duration-500",
              "hover:border-bone-100 hover:bg-obsidian-950/70",
              className
            )}
          >
            <MessageSquare className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        );
      }}
    />
  );
}
