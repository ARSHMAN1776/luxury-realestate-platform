import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bed, Bath, Square, MapPin } from "lucide-react";
import { getPropertyBySlug, getAllProperties, getRelatedProperties } from "@/lib/db";
import { getAgentById } from "@/data/agents";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyEnquiryForm } from "@/components/property/PropertyEnquiryForm";
import { Section } from "@/components/sections/Section";

/* ─── Static generation ──────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  const price = property.priceOnApplication
    ? "Price on application"
    : formatPrice(property.price, property.currency, "compact");

  return {
    title: `${property.name} — ${property.location.short} | Meridian & Voss`,
    description: property.tagline,
    openGraph: {
      title: `${property.name} | Meridian & Voss`,
      description: `${price} · ${property.location.short} · ${property.specs.bedrooms} bedrooms`,
      images: [{ url: property.hero.src, alt: property.hero.alt }],
      type: "article",
    },
    other: {
      "property:price:amount": String(property.price),
      "property:price:currency": property.currency,
    },
  };
}

/* ─── JSON-LD ────────────────────────────────────────────────────────────── */

function PropertyJsonLd({ property }: { property: NonNullable<ReturnType<typeof getPropertyBySlug>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.tagline,
    url: `https://meridianvoss.com/properties/${property.slug}`,
    image: property.hero.src,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.city,
      addressRegion: property.location.region,
      addressCountry: property.location.countryCode,
    },
    offers: property.priceOnApplication
      ? undefined
      : {
          "@type": "Offer",
          price: property.price,
          priceCurrency: property.currency,
        },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Status badge ───────────────────────────────────────────────────────── */

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  reserved: "Reserved",
  "under-offer": "Under Offer",
  sold: "Sold",
  "off-market": "Off Market",
};

const STATUS_COLOUR: Record<string, string> = {
  available: "text-green-400 bg-green-400/10 ring-green-400/20",
  reserved: "text-amber-400 bg-amber-400/10 ring-amber-400/20",
  "under-offer": "text-brass-400 bg-brass-400/10 ring-brass-400/20",
  sold: "text-bone-500 bg-bone-500/10 ring-bone-500/20",
  "off-market": "text-bone-500 bg-bone-500/10 ring-bone-500/20",
};

/* ─── Spec icon row ──────────────────────────────────────────────────────── */

function SpecRow({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hairline py-4">
      <span className="eyebrow text-bone-500">{label}</span>
      <span className="text-right font-display text-[1.0625rem] font-light text-bone-100">
        {value}
        {unit && <span className="ml-1 text-[0.8125rem] text-bone-500">{unit}</span>}
      </span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const related = getRelatedProperties(slug, 3);

  const price = property.priceOnApplication
    ? "Price on application"
    : formatPrice(property.price, property.currency);

  return (
    <>
      <PropertyJsonLd property={property} />

      <main className="bg-ground text-ink pt-20 sm:pt-24">
        {/* ── Back nav ─────────────────────────────────────────────────── */}
        <div className="shell py-5 sm:py-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 eyebrow text-bone-500 transition-colors duration-300 hover:text-bone-100"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            The Book
          </Link>
        </div>

        {/* ── Hero image ───────────────────────────────────────────────── */}
        <div className="relative aspect-[16/9] min-h-[28rem] max-h-[80vh] w-full overflow-hidden">
          <Image
            src={property.hero.src}
            alt={property.hero.alt}
            fill
            priority
            sizes="100vw"
            quality={90}
            placeholder="blur"
            blurDataURL={BLUR_OBSIDIAN}
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ground via-ground/30 to-transparent"
            aria-hidden="true"
          />

          {/* Headline overlay */}
          <div className="absolute bottom-0 left-0 right-0 shell pb-8 sm:pb-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                {/* Badges */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-widest ring-1 ring-inset ${STATUS_COLOUR[property.status] ?? STATUS_COLOUR.available}`}
                  >
                    {STATUS_LABEL[property.status]}
                  </span>
                  {property.exclusive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brass-500/15 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-widest text-brass-300 ring-1 ring-inset ring-brass-500/30">
                      Exclusive
                    </span>
                  )}
                  {property.discreet && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-bone-500/10 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-widest text-bone-400 ring-1 ring-inset ring-bone-500/20">
                      Discreet
                    </span>
                  )}
                </div>

                <p className="eyebrow mb-2 flex items-center gap-2 text-brass-400">
                  <MapPin className="size-3" strokeWidth={1.5} />
                  {property.location.short}
                </p>
                <h1 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] text-bone-50">
                  {property.name}
                </h1>
                <p className="mt-2 max-w-[52ch] text-[0.875rem] text-bone-300">
                  {property.tagline}
                </p>
              </div>

              <div className="text-right">
                <p className="eyebrow text-bone-500">Asking price</p>
                <p className="font-display text-[clamp(1.5rem,4vw,2.75rem)] font-light text-bone-50">
                  {price}
                </p>
                <p className="eyebrow mt-1 text-bone-500">Ref. {property.reference}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Gallery ──────────────────────────────────────────────────── */}
        {property.gallery.length > 0 && (
          <PropertyGallery images={property.gallery} propertyName={property.name} />
        )}

        {/* ── Two-column content layout ─────────────────────────────────── */}
        <Section id="property-detail">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-20">
            {/* Left — narrative + highlights + amenities */}
            <div className="space-y-12">
              {/* Key spec rail */}
              <div className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-4">
                {[
                  { icon: Bed, label: "Bedrooms", value: property.specs.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: property.specs.bathrooms },
                  {
                    icon: Square,
                    label: "Interior",
                    value: `${property.specs.interiorSqm.toLocaleString()} m²`,
                  },
                  {
                    icon: Square,
                    label: property.specs.plotSqm ? "Plot" : "Levels",
                    value: property.specs.plotSqm
                      ? `${property.specs.plotSqm.toLocaleString()} m²`
                      : `${property.specs.levels}`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-2 bg-obsidian-950 p-5 sm:p-6"
                  >
                    <Icon className="size-4 text-brass-500" strokeWidth={1.25} />
                    <span className="font-display text-[1.375rem] font-light text-bone-100">
                      {value}
                    </span>
                    <span className="eyebrow text-bone-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div>
                <p className="eyebrow mb-5 flex items-center gap-4 text-brass-400">
                  <span className="h-px w-8 bg-brass-600" aria-hidden="true" />
                  Why this property
                </p>
                <ul className="space-y-3">
                  {property.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[0.9375rem] text-bone-200">
                      <span
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-brass-500"
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Narrative */}
              <div>
                <p className="eyebrow mb-6 flex items-center gap-4 text-brass-400">
                  <span className="h-px w-8 bg-brass-600" aria-hidden="true" />
                  About the property
                </p>
                <div className="space-y-5">
                  {property.narrative.map((para, i) => (
                    <p
                      key={i}
                      className="text-[0.9375rem] leading-[1.75] text-bone-300"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="eyebrow mb-6 flex items-center gap-4 text-brass-400">
                  <span className="h-px w-8 bg-brass-600" aria-hidden="true" />
                  Amenities
                </p>
                <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 text-[0.875rem] text-bone-300">
                      <span
                        className="size-px shrink-0 bg-brass-600 w-4 h-px"
                        aria-hidden="true"
                      />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — specs table + agent + enquiry */}
            <aside className="space-y-8">
              {/* Full spec table */}
              <div className="border border-hairline p-6 sm:p-7">
                <p className="eyebrow mb-1 text-brass-400">Property specifications</p>
                <div>
                  <SpecRow label="Reference" value={property.reference} />
                  <SpecRow label="Category" value={property.category} />
                  <SpecRow label="Bedrooms" value={property.specs.bedrooms} />
                  <SpecRow label="Bathrooms" value={property.specs.bathrooms} />
                  <SpecRow label="Interior" value={property.specs.interiorSqm.toLocaleString()} unit="m²" />
                  {property.specs.plotSqm && (
                    <SpecRow label="Plot" value={property.specs.plotSqm.toLocaleString()} unit="m²" />
                  )}
                  <SpecRow label="Parking" value={property.specs.parking} unit="spaces" />
                  <SpecRow label="Levels" value={property.specs.levels} />
                  <SpecRow label="Orientation" value={property.specs.orientation} />
                  <SpecRow label="Year built" value={property.specs.yearBuilt} />
                  {property.specs.renovated && (
                    <SpecRow label="Renovated" value={property.specs.renovated} />
                  )}
                  <SpecRow label="Tenure" value={property.specs.tenure} />
                  <SpecRow
                    label="Location"
                    value={`${property.location.city}, ${property.location.country}`}
                  />
                </div>
              </div>

              {/* Investment profile */}
              {property.investment && (
                <div className="border border-brass-700/30 bg-brass-900/15 p-6 sm:p-7">
                  <p className="eyebrow mb-5 text-brass-400">Investment profile</p>
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      {
                        label: "Gross yield",
                        value: `${property.investment.grossYield}%`,
                      },
                      {
                        label: "5-yr appreciation",
                        value: `+${property.investment.appreciation5yr}%`,
                      },
                      {
                        label: "Rental p.a.",
                        value: formatPrice(property.investment.rentalIncomePa, property.currency, "compact"),
                      },
                      {
                        label: "Occupancy",
                        value: `${property.investment.occupancyRate}%`,
                      },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="eyebrow text-bone-500">{label}</p>
                        <p className="mt-1 font-display text-[1.5rem] font-light text-brass-300">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-hairline pt-5 text-[0.8125rem] leading-relaxed text-bone-400">
                    {property.investment.notes}
                  </p>
                </div>
              )}

              {/* Agent card */}
              {agent && (
                <div className="border border-hairline p-6 sm:p-7">
                  <p className="eyebrow mb-5 text-brass-400">Your adviser</p>
                  <div className="flex items-start gap-4">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={agent.portrait.src}
                        alt={agent.portrait.alt}
                        fill
                        sizes="56px"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={BLUR_OBSIDIAN}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-[1.0625rem] font-light text-bone-100">
                        {agent.name}
                      </p>
                      <p className="eyebrow mt-0.5 text-bone-500">{agent.role}</p>
                      <p className="mt-1 text-[0.8125rem] text-bone-400">{agent.base}</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2.5 border-t border-hairline pt-5">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center justify-between text-[0.8125rem] text-bone-300 transition-colors duration-300 hover:text-bone-100"
                    >
                      <span>{agent.email}</span>
                      <ArrowUpRight className="size-3.5 text-bone-600" strokeWidth={1.25} />
                    </a>
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-between text-[0.8125rem] text-bone-300 transition-colors duration-300 hover:text-bone-100"
                    >
                      <span>{agent.phone}</span>
                      <ArrowUpRight className="size-3.5 text-bone-600" strokeWidth={1.25} />
                    </a>
                  </div>
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="mt-5 inline-flex items-center gap-2 eyebrow text-brass-400 transition-colors duration-300 hover:text-brass-300"
                  >
                    Full profile
                    <ArrowUpRight className="size-3" strokeWidth={1.5} />
                  </Link>
                </div>
              )}

              {/* Enquiry form */}
              <PropertyEnquiryForm
                propertySlug={property.slug}
                propertyName={property.name}
              />
            </aside>
          </div>
        </Section>

        {/* ── Related properties ──────────────────────────────────────── */}
        {related.length > 0 && (
          <Section id="related-properties" className="border-t border-hairline">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-3 flex items-center gap-4 text-brass-400">
                  <span className="h-px w-8 bg-brass-600" aria-hidden="true" />
                  You may also consider
                </p>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-light text-bone-100">
                  Related mandates
                </h2>
              </div>
              <Link
                href="/properties"
                className="eyebrow hidden shrink-0 items-center gap-2 text-bone-500 transition-colors duration-300 hover:text-bone-100 sm:inline-flex"
              >
                View all
                <ArrowUpRight className="size-3.5" strokeWidth={1.25} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} size="default" />
              ))}
            </div>
          </Section>
        )}
      </main>
    </>
  );
}
