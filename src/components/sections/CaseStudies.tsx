import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/house";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Three mandates that closed. Not the whole story — just the parts we are
 * allowed to publish, framed as numbered monographs instead of card stacks.
 */
export function CaseStudies() {
  return (
    <Section id="case-studies" className="border-t border-hairline">
      <SectionHeader
        index="11"
        eyebrow="Selected mandates"
        title="What closing|actually looked|like."
        standfirst="Three mandates we are allowed to discuss publicly. Names redacted, outcomes reported. Most of what we close never appears here — the discretion clause survives the final signature."
        action={
          <Button asChild variant="brass" size="inline">
            <Link href="/case-studies">
              Full case archive
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          </Button>
        }
      />

      <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
        {caseStudies.slice(0, 3).map((study, i) => (
          <Reveal key={study.id} delay={i * 0.08}>
            <article className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              {/* Plate */}
              <Link
                href={`/case-studies/${study.slug}`}
                className="group relative aspect-[16/10] overflow-hidden bg-obsidian-800 outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brass-400 lg:aspect-[5/4]"
                data-cursor="View"
              >
                <Image
                  src={study.image.src}
                  alt={study.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
                />
                <div className="scrim-b absolute inset-x-0 bottom-0 h-2/3 opacity-70" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                  <p className="eyebrow text-brass-400">Case {study.index}</p>
                  <h3 className="mt-3 font-display text-[2rem] leading-tight font-light text-bone-50 transition-colors duration-500 group-hover:text-brass-200 lg:text-[2.25rem]">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] text-bone-300">
                    {study.location} · {study.year}
                  </p>
                </div>
              </Link>

              {/* The account */}
              <div className="flex flex-col justify-center">
                <div>
                  <h4 className="eyebrow mb-4 text-brass-500">The brief</h4>
                  <p className="prose-luxe max-w-[48ch]">{study.brief}</p>
                </div>

                <div className="mt-8">
                  <h4 className="eyebrow mb-4 text-brass-500">The outcome</h4>
                  <p className="prose-luxe max-w-[48ch]">{study.outcome}</p>
                </div>

                <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-hairline pt-7">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="eyebrow text-bone-600">{m.label}</dt>
                      <dd className="tabular mt-2.5 font-display text-[1.5rem] leading-none font-light text-bone-100">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
