import { servicePillars } from "@/data/house";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Why the house. No icon grid, no "trusted by thousands" — four numbered
 * disciplines set as a ledger, each with the specifics that make the claim
 * checkable.
 */
export function Services() {
  return (
    <Section id="services" className="border-t border-hairline">
      <SectionHeader
        index="07"
        eyebrow="Why the house"
        title="What fifty years|makes routine."
        standfirst="Anyone can list a property. The value of an old house is everything that happens around the listing — quietly, correctly, and in the client's name alone."
      />

      <div className="mt-16 lg:mt-20">
        {servicePillars.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i * 0.07, 0.28)}>
            <article className="group grid gap-7 border-t border-hairline py-10 transition-colors duration-700 last:border-b lg:grid-cols-[6rem_1.1fr_1fr] lg:gap-12 lg:py-14">
              <p className="tabular eyebrow pt-2 text-bone-600 transition-colors duration-500 group-hover:text-brass-500">
                {s.index}
              </p>

              <h3 className="max-w-md font-display text-heading leading-[1.02] font-light text-bone-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-3">
                {s.title}
              </h3>

              <div>
                <p className="prose-luxe max-w-[52ch]">{s.copy}</p>
                <ul className="mt-7 space-y-3">
                  {s.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-4 text-[0.8125rem] leading-relaxed text-bone-500"
                    >
                      <span
                        className="h-px w-5 shrink-0 translate-y-[-3px] bg-brass-700"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
