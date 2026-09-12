/* ═══════════════════════════════════════════════════════════════════════════
   DOMAIN TYPES — MERIDIAN & VOSS
   ═══════════════════════════════════════════════════════════════════════════ */

export type Currency = "USD" | "EUR" | "GBP" | "CHF" | "AED" | "SGD";

export type PropertyStatus =
  | "available"
  | "reserved"
  | "under-offer"
  | "sold"
  | "off-market";

export type PropertyCategoryId =
  | "villas"
  | "penthouses"
  | "estates"
  | "residences"
  | "commercial"
  | "islands";

export type TenureType = "freehold" | "leasehold" | "share-transfer";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PropertyLocation {
  neighbourhood: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  coordinates: Coordinates;
  /** Short line for cards, e.g. "Costa Smeralda, Sardinia" */
  short: string;
}

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  /** Internal area, square metres */
  interiorSqm: number;
  /** Land / plot area, square metres. Null for apartments. */
  plotSqm: number | null;
  parking: number;
  yearBuilt: number;
  /** Year of most recent full renovation, if any */
  renovated?: number;
  levels: number;
  orientation: string;
  tenure: TenureType;
}

export interface PropertyImage {
  src: string;
  alt: string;
  /** Editorial caption shown in the lightbox / gallery rail */
  caption?: string;
}

export interface InvestmentProfile {
  /** Projected gross rental yield, percent */
  grossYield: number;
  /** 5-year capital appreciation forecast, percent */
  appreciation5yr: number;
  /** Estimated annual rental income in the property currency */
  rentalIncomePa: number;
  /** Annual running cost estimate */
  runningCostPa: number;
  occupancyRate: number;
  notes: string;
}

export interface Property {
  id: string;
  slug: string;
  /** Internal reference shown to clients, e.g. "MV-4471-SD" */
  reference: string;
  name: string;
  /** Editorial one-liner, sentence case, no full stop */
  tagline: string;
  category: PropertyCategoryId;
  status: PropertyStatus;

  price: number;
  currency: Currency;
  /** When true, price is withheld and "Price on application" is shown */
  priceOnApplication: boolean;

  location: PropertyLocation;
  specs: PropertySpecs;

  /** 3–5 short phrases, the reasons this property exists on our books */
  highlights: string[];
  /** Long-form editorial description, one string per paragraph */
  narrative: string[];
  amenities: string[];

  hero: PropertyImage;
  gallery: PropertyImage[];

  featured: boolean;
  /** Sole-agency / exclusive mandate */
  exclusive: boolean;
  /** Never publicly advertised — requires NDA */
  discreet: boolean;

  agentId: string;
  investment?: InvestmentProfile;
  /** ISO date the mandate was signed — used for "new to market" */
  listedAt: string;
}

export interface PropertyCategory {
  id: PropertyCategoryId;
  index: string;
  name: string;
  description: string;
  image: PropertyImage;
  /** Rough count shown in the UI */
  count: number;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: string;
  /** Office city */
  base: string;
  languages: string[];
  specialisms: string[];
  /** Years with the house */
  tenure: number;
  bio: string;
  portrait: PropertyImage;
  email: string;
  phone: string;
  /** Total transacted value, in USD, across career */
  transactedUsd: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  descriptor: string;
  location: string;
  /** The property or mandate this relates to */
  mandate: string;
  year: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  index: string;
  title: string;
  location: string;
  brief: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  image: PropertyImage;
  year: number;
}

export interface Office {
  id: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  timezone: string;
  coordinates: Coordinates;
  /** Position on the abstract world map, percent from left / top */
  map: { x: number; y: number };
  isHeadquarters: boolean;
  established: number;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Market Intelligence" | "Architecture" | "Investment" | "The House" | "Lifestyle";
  readMinutes: number;
  publishedAt: string;
  author: string;
  image: PropertyImage;
  /** Body paragraphs; strings beginning with "## " render as subheadings */
  body: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: "Acquisition" | "Ownership" | "The House" | "Investment";
}

export interface Statistic {
  id: string;
  value: number;
  /** Rendered after the animated numeral, e.g. "B+" or "%" */
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
}

export interface LifestylePillar {
  id: string;
  index: string;
  title: string;
  copy: string;
  image: PropertyImage;
}

export interface ServicePillar {
  id: string;
  index: string;
  title: string;
  copy: string;
  points: string[];
}

/* ── UI-side types ─────────────────────────────────────────────────────────── */

export interface PropertyFilters {
  query: string;
  category: PropertyCategoryId | "all";
  country: string | "all";
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "any";
  sort: "featured" | "price-desc" | "price-asc" | "newest" | "size-desc";
}
