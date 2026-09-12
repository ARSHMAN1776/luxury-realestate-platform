import { NextRequest, NextResponse } from "next/server";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  timeline?: string;
  message?: string;
  propertySlug: string;
  propertyName: string;
}

interface EnquiryRecord {
  property: string;
  slug: string;
  from: { name: string; email: string; phone: string };
  timeline: string;
  message: string;
  receivedAt: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Handler ────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, timeline, message, propertySlug, propertyName } =
    body as Partial<EnquiryPayload>;

  /* ── Validation ──────────────────────────────────────────────────────── */
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please provide your full name." }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 422 });
  }
  if (!propertySlug || !propertyName) {
    return NextResponse.json({ error: "Property reference is missing." }, { status: 422 });
  }

  /* ── Honeypot / basic bot guard ──────────────────────────────────────── */
  // If a hidden field was populated, silently discard
  const raw = body as Record<string, unknown>;
  if (raw.website || raw.url) {
    return NextResponse.json({ ok: true }); // fake accept
  }

  /* ── Delivery ────────────────────────────────────────────────────────── */
  // In production wire this to your transactional email (Resend, Postmark, SES).
  // For now we log to the server console and return success so the form works in dev.

  const enquiry = {
    property: propertyName,
    slug: propertySlug,
    from: { name: name.trim(), email: email.trim(), phone: phone?.trim() ?? "" },
    timeline: timeline ?? "not specified",
    message: message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  console.log("[M&V] New enquiry:", JSON.stringify(enquiry, null, 2));

  /* ── Optionally call a transactional email service ───────────────────── */
  const TO_EMAIL = process.env.ENQUIRY_EMAIL;
  if (TO_EMAIL && process.env.RESEND_API_KEY) {
    await sendViaResend({ to: TO_EMAIL, enquiry });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

/* ─── Resend (optional) ──────────────────────────────────────────────────── */

async function sendViaResend({
  to,
  enquiry,
}: {
  to: string;
  enquiry: EnquiryRecord;
}) {
  const { from, timeline, message, property, slug } = enquiry;
  const { name, email, phone } = from;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "enquiries@meridianvoss.com",
      to,
      subject: `New enquiry: ${property} (${slug})`,
      text: [
        `Property: ${property} (${slug})`,
        `From: ${name} <${email}>`,
        phone ? `Phone: ${phone}` : "",
        `Timeline: ${timeline}`,
        `Message: ${message || "—"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  }).catch((err) => {
    console.error("[M&V] Email delivery failed:", err);
  });
}
