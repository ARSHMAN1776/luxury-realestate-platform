import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { lifestylePillars } from "@/data/house";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { Button } from "@/components/ui/Button";

/**
 * The lifestyle proposition. Not a list of amenities — four verticals that
 * happen when you live in one of these addresses, each paired with a plate.
 */
export function Lifestyle() {
  return (
    <Section id="lifestyle" className="border-t border-hairline">
      <SectionHeader
        index="08"
        eyebrow="The proposition"
        title="The life that|comes with|the address."
        standfirst="Property is the frame. What hangs inside it — the art, the cellar, the morning, the view — is the reason anyone buys. These are the four registers."
      />

      <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
        {lifestylePillars.map((pillar, i) => {
          const isReversed = i % 2 === 1;
          return (
            <Reveal key={pillar.id} delay={0.1} className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div
                className={`flex flex-col justify-center ${isReversed ? "lg:order-2" : ""}`}
              >
                <p className="eyebrow mb-7 flex items-center gap-4 text-brass-500">
                  <span className="tabular text-bone-600">{pillar.index}</span>
                  <span className="h-px w-8 bg-brass-700" aria-hidden="true" />
                </p>

                <h3 className="font-display text-heading leading-tight font-light text-bone-100">
                  {pillar.title}
                </h3>

                <p className="prose-luxe mt-7 max-w-[52ch]">{pillar.copy}</p>

                <div className="mt-9">
                  <Button asChild variant="brass" size="inline">
                    <Link href="/lifestyle">
                      Explore this vertical
                      <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                    </Link>
                  </Button>
                </div>
              </div>

              <ParallaxImage
                speed={0.18}
                className={`relative aspect-[4/5] lg:aspect-[5/6] ${isReversed ? "lg:order-1" : ""}`}
              >
                <Image
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover"
                />
              </ParallaxImage>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
