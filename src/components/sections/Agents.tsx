import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { agents } from "@/data/agents";
import { formatNumber } from "@/lib/utils";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * The people. Four principals presented as individual monographs rather than
 * a crowd shot — the opposite of a grid of headshots with LinkedIn bios.
 */
export function Agents() {
  const principals = agents.slice(0, 4);

  return (
    <Section id="agents">
      <SectionHeader
        index="09"
        eyebrow="The principals"
        title="The people who|hold the book."
        standfirst="No call centres, no graduate trainees. Every mandate is the responsibility of one named principal, and your calls reach them directly."
        action={
          <Button asChild variant="brass" size="inline">
            <Link href="/agents">
              Meet the house
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          </Button>
        }
      />

      <div className="mt-16 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:mt-20">
        {principals.map((agent, i) => (
          <Reveal key={agent.id} delay={i * 0.08} className="bg-obsidian-900">
            <Link
              href={`/agents/${agent.slug}`}
              className="group block h-full outline-none focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-brass-400"
              data-cursor="View"
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-800">
                <Image
                  src={agent.portrait.src}
                  alt={agent.portrait.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover grayscale transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-hover:grayscale-0"
                />
                <div className="scrim-b absolute inset-x-0 bottom-0 h-2/3 opacity-60 transition-opacity duration-700 group-hover:opacity-40" />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <p className="eyebrow text-brass-400">{agent.base}</p>
                  <h3 className="mt-3 font-display text-[2rem] leading-none font-light text-bone-50 transition-colors duration-500 group-hover:text-brass-200">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] text-bone-400">{agent.role}</p>
                </div>
              </div>

              {/* The record */}
              <div className="p-7 lg:p-8">
                <p className="max-w-[42ch] text-[0.875rem] leading-relaxed text-bone-400">
                  {agent.bio}
                </p>

                <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-hairline pt-6">
                  <div>
                    <dt className="eyebrow text-bone-600">With the house</dt>
                    <dd className="tabular mt-2 font-display text-[1.5rem] leading-none font-light text-bone-100">
                      {agent.tenure} <span className="text-[1rem] text-bone-500">yr</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-bone-600">Transacted</dt>
                    <dd className="tabular mt-2 font-display text-[1.5rem] leading-none font-light text-brass-400">
                      {formatNumber(agent.transactedUsd)}{" "}
                      <span className="text-[1rem] text-bone-500">USD</span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  {agent.specialisms.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="eyebrow border border-hairline px-3 py-1.5 text-bone-500"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
