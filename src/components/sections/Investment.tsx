import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { getAllProperties } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Interactions";
import { Button } from "@/components/ui/Button";

/**
 * The yield desk. Properties that also happen to be positions.
 * Live connected to persistent storage.
 */
export function Investment() {
  const properties = getAllProperties();
  const positions = properties.filter((p) => p.investment).slice(0, 3);
  if (positions.length === 0) return null;

  return (
    <Section id="investment" className="border-t border-hairline">
      <SectionHeader
        index="06"
        eyebrow="Investment desk"
        title="Addresses that|also happen to|be positions."
        standfirst="A small number of mandates are underwritten by our advisory desk: audited income history, forward yield modelling, and running costs stated to the franc. These are the current three."
        action={
          <Button asChild variant="brass" size="inline">
            <Link href="/contact?intent=investment">
              Speak to the desk
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          </Button>
        }
      />

      <div className="mt-16 grid gap-px border border-hairline bg-hairline lg:mt-20 lg:grid-cols-3">
        {positions.map((p, i) => {
          const inv = p.investment!;
          return (
            <Reveal key={p.id} delay={i * 0.1} className="bg-obsidian-900">
              <Link
                href={`/properties/${p.slug}`}
                className="group block h-full outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-brass-400"
                data-cursor="View"
              >
                {/* Plate */}
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-800">
                  <Image
                    src={p.hero.src}
                    alt={p.hero.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_OBSIDIAN}
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
                  />
                  <div className="scrim-b absolute inset-x-0 bottom-0 h-1/2 opacity-80" />
                  <span className="eyebrow absolute bottom-4 left-5 text-bone-300">
                    {p.location.short}
                  </span>
                </div>

                {/* Metrics rail */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[1.375rem] font-light text-bone-100 transition-colors group-hover:text-brass-300">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[0.875rem] text-brass-400">
                      {p.priceOnApplication
                        ? "POA"
                        : formatPrice(p.price, p.currency, "compact")}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.8125rem] text-bone-400 line-clamp-2">
                    {p.tagline}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-6">
                    <div>
                      <span className="eyebrow text-bone-500">Gross Yield</span>
                      <p className="mt-1 flex items-baseline gap-1 font-display text-[1.5rem] font-light text-brass-400">
                        <Counter value={inv.grossYield} decimals={1} />
                        <span className="text-[1rem]">%</span>
                      </p>
                    </div>

                    <div>
                      <span className="eyebrow text-bone-500">5yr Appreciation</span>
                      <p className="mt-1 flex items-baseline gap-1 font-display text-[1.5rem] font-light text-bone-100">
                        <span className="text-[1rem] text-brass-500">+</span>
                        <Counter value={inv.appreciation5yr} decimals={1} />
                        <span className="text-[1rem]">%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
