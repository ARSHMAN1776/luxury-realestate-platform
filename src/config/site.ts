/* ═══════════════════════════════════════════════════════════════════════════
   SITE CONFIGURATION — white-label single source of truth
   ═══════════════════════════════════════════════════════════════════════════

   This is the ONE file a buyer edits to rebrand the entire product. Every brand
   name, contact detail, domain, and default that used to be hardcoded across
   Header/Footer/Contact/layout now resolves from here.

   Precedence at runtime:  env  →  this file (defaults)  →  CMS "Site Settings"
   The CMS layer (added in Phase 1) can override the editable fields below at
   runtime so non-technical staff can change phone/address/social without a
   redeploy. Fonts are the one exception — see `fonts` note — because
   `next/font` requires statically-analysable arguments and is build-time only.

   Anything referencing NEXT_PUBLIC_* is safe to read on the client.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  /** Full legal/display name, e.g. "Meridian & Voss" */
  name: string;
  /** Registered legal entity for © and legal pages, e.g. "Meridian & Voss SA" */
  legalName: string;
  /** One-line positioning used in metadata + hero eyebrow fallbacks */
  tagline: string;
  description: string;

  /**
   * Wordmark lockup. If `logo.src` is set, the <Brand /> component renders that
   * image; otherwise it renders the text lockup: `${parts[0]} ${separator} ${parts[1]}`.
   * The current design is a two-part lockup joined by an ampersand.
   */
  wordmark: {
    parts: [string, string];
    separator: string;
    /** aria-label for the home link */
    ariaLabel: string;
  };
  logo: {
    /** Public path or CMS media URL; empty string → use the text lockup */
    src: string;
    width: number;
    height: number;
    alt: string;
  };

  /** Canonical origin, no trailing slash. Drives metadataBase, sitemap, share URLs. */
  url: string;

  contact: {
    email: string;
    /** Display phone, e.g. "+41 22 555 0100" */
    phone: string;
    /** Physical HQ address line */
    address: string;
    city: string;
    country: string;
  };

  /** Founding line, e.g. "Est. Geneva, 1974" */
  established: string;
  foundedYear: number;

  social: SocialLink[];

  /** Presentation defaults — see src/lib/utils.ts formatPrice + units toggle. */
  locale: string;
  /** BCP-47 language for <html lang> */
  lang: string;
  defaultCurrency: string;
  /** "metric" → m² · "imperial" → ft² */
  defaultUnitSystem: "metric" | "imperial";

  /**
   * Fonts are applied at build time via next/font in src/app/layout.tsx.
   * These names document the active pairing; changing the actual typefaces
   * means editing the next/font import (a documented rebrand step), not this field.
   */
  fonts: {
    display: string;
    sans: string;
  };
}

/** Read an env override, falling back to the baked-in default. */
function env(key: string, fallback: string): string {
  const v = process.env[key];
  return v && v.length > 0 ? v : fallback;
}

export const siteConfig: SiteConfig = {
  name: env("NEXT_PUBLIC_SITE_NAME", "Meridian & Voss"),
  legalName: env("NEXT_PUBLIC_LEGAL_NAME", "Meridian & Voss SA"),
  tagline: env(
    "NEXT_PUBLIC_SITE_TAGLINE",
    "International Private Property House",
  ),
  description: env(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Curators of the world's most exceptional residential and commercial properties. International private property house, est. 1974.",
  ),

  wordmark: {
    parts: ["MERIDIAN", "VOSS"],
    separator: "&",
    ariaLabel: "Meridian & Voss — home",
  },
  logo: {
    src: env("NEXT_PUBLIC_LOGO_SRC", ""),
    width: 160,
    height: 32,
    alt: "Meridian & Voss",
  },

  url: env("NEXT_PUBLIC_SITE_URL", "https://meridian-voss.com").replace(
    /\/$/,
    "",
  ),

  contact: {
    email: env("NEXT_PUBLIC_CONTACT_EMAIL", "enquiries@meridian-voss.com"),
    phone: env("NEXT_PUBLIC_CONTACT_PHONE", "+41 22 555 0100"),
    address: env("NEXT_PUBLIC_CONTACT_ADDRESS", "Rue du Rhône 67, 1204 Geneva"),
    city: env("NEXT_PUBLIC_CONTACT_CITY", "Geneva"),
    country: env("NEXT_PUBLIC_CONTACT_COUNTRY", "Switzerland"),
  },

  established: env("NEXT_PUBLIC_ESTABLISHED", "Est. Geneva, 1974"),
  foundedYear: Number(env("NEXT_PUBLIC_FOUNDED_YEAR", "1974")),

  social: [
    { label: "Instagram", href: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM", "#") },
    { label: "LinkedIn", href: env("NEXT_PUBLIC_SOCIAL_LINKEDIN", "#") },
  ],

  locale: env("NEXT_PUBLIC_LOCALE", "en-US"),
  lang: env("NEXT_PUBLIC_LANG", "en"),
  defaultCurrency: env("NEXT_PUBLIC_DEFAULT_CURRENCY", "USD"),
  defaultUnitSystem:
    env("NEXT_PUBLIC_UNIT_SYSTEM", "metric") === "imperial"
      ? "imperial"
      : "metric",

  fonts: {
    display: "Cormorant Garamond",
    sans: "Inter",
  },
};

/** Convenience: the phone with all spaces stripped, for tel: hrefs. */
export function telHref(phone: string = siteConfig.contact.phone): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/** Convenience: mailto: for the primary contact address. */
export function mailtoHref(email: string = siteConfig.contact.email): string {
  return `mailto:${email}`;
}

/** Absolute URL for a path, using the canonical origin. */
export function absoluteUrl(path: string = ""): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${p}`;
}
