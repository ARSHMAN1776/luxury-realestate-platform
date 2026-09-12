import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { getAllProperties } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { BLUR_OBSIDIAN, IMG } from "@/lib/images";
import { ParallaxImage } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";

function pickFlagship() {
  const properties = getAllProperties();
  if (properties.length === 0) return null;
  return (
    properties.find((p) => p.featured && p.priceOnApplication) ??
    [...properties].sort((a, b) => b.price - a.price)[0]
  );
}

/**
 * One address, one frame. A full-bleed plate with a slow vertical drift.
 * Live connected to persistent storage with safe empty fallback.
 */
export function Showcase() {
  const p = pickFlagship();

  if (!p) {
    /* Fallback plate when all listings deleted */
    return (
      <section id="showcase" className="grain relative isolate overflow-hidden">
        <ParallaxImage className="h-[75svh] min-h-[30rem]" speed={0.26}>
          <Image
            src={IMG.exteriorPoolVilla}
            alt="MERIDIAN & VOSS Private House"
            fill
            sizes="100vw"
            quality={90}
            placeholder="blur"
            blurDataURL={BLUR_OBSIDIAN}
            className="object-cover opacity-50"
          />
        </ParallaxImage>

        <div className="scrim-full absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 sm:pb-16">
          <div className="shell text-center sm:text-left">
            <Reveal direction="none" duration={0.9}>
              <p className="eyebrow mb-4 flex items-center justify-center sm:justify-start gap-4 text-brass-400">
                <ShieldCheck className="w-4 h-4 text-brass-400" />
                The Centrefold · Meridian & Voss Private House
              </p>
            </Reveal>

            <TextReveal
              as="h2"
              text="Discreet|Off-Market|Mandates."
              className="max-w-4xl font-display text-display leading-[0.92] font-light text-bone-50"
            />

            <Reveal delay={0.2}>
              <p className="prose-luxe mt-5 max-w-[52ch] text-bone-300">
                Our private clients benefit from absolute confidentiality. Over 60% of our annual transaction volume occurs off-market under non-disclosure agreements.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <Button asChild variant="solid" size="lg">
                  <Link href="/contact">
                    Inquire Private Dossier
                    <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/admin/properties/new">Manage System Mandates</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  const specs = [
    { label: "Bedrooms", value: String(p.specs.bedrooms) },
    { label: "Interior", value: `${p.specs.interiorSqm.toLocaleString("en-US")} m²` },
    p.specs.plotSqm !== null
      ? { label: "Grounds", value: `${p.specs.plotSqm.toLocaleString("en-US")} m²` }
      : null,
    {
      label: "Guide",
      value: p.priceOnApplication
        ? "On application"
        : formatPrice(p.price, p.currency, "compact"),
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section
      id="showcase"
      className="grain relative isolate overflow-hidden"
      aria-label="Flagship mandate"
    >
      <ParallaxImage className="h-[92svh] min-h-[36rem]" speed={0.26}>
        <Image
          src={p.hero.src}
          alt={p.hero.alt}
          fill
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL={BLUR_OBSIDIAN}
          className="object-cover"
          loading="eager"
        />
      </ParallaxImage>

      <div className="scrim-full absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="shell">
          <Reveal direction="none" duration={0.9}>
            <p className="eyebrow mb-7 flex items-center gap-4 text-brass-400">
              <span className="tabular text-bone-500">05</span>
              <span className="h-px w-8 bg-brass-600" aria-hidden="true" />
              The centrefold · {p.reference}
            </p>
          </Reveal>

          <TextReveal
            as="h2"
            text={p.name.split(" ").length > 2
              ? p.name.replace(/ (?=[^ ]+$)/, "|")
              : p.name}
            className="max-w-4xl font-display text-display leading-[0.92] font-light text-bone-50"
          />

          <Reveal delay={0.2}>
            <p className="prose-luxe mt-7 max-w-[52ch] text-bone-300">
              {p.tagline}. {p.location.short}, {p.location.country}.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-9 border-t border-hairline-strong/60 pt-8 lg:flex-row lg:items-end lg:justify-between">
              <dl className="tabular flex flex-wrap gap-x-12 gap-y-6">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className="eyebrow text-bone-500">{s.label}</dt>
                    <dd className="mt-2.5 font-display text-[1.5rem] leading-none font-light text-bone-100 sm:text-[1.75rem]">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Button asChild variant="solid" size="lg">
                  <Link href={`/properties/${p.slug}`}>
                    Enter the residence
                    <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Request the dossier</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
