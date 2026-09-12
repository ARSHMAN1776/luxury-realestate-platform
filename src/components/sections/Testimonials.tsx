import { testimonials } from "@/data/house";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * What clients said. Set as a ledger of attributed quotes rather than boxed
 * cards — a contract closes when both parties sign their name at the bottom.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" className="border-t border-hairline">
      <SectionHeader
        index="10"
        eyebrow="What clients said"
        title="In their own|words."
        standfirst="We ask for written consent before quoting anyone. What appears below was sent to us, or said in a recorded conversation, and released for publication."
      />

      <div className="mt-16 lg:mt-20">
        {testimonials.slice(0, 6).map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i * 0.06, 0.24)}>
            <blockquote className="group border-t border-hairline py-10 transition-colors duration-700 last:border-b lg:py-12">
              <p className="font-display text-[1.375rem] leading-[1.42] font-light text-bone-100 sm:text-[1.5rem] lg:text-[1.625rem]">
                "{t.quote}"
              </p>

              <footer className="mt-7 flex flex-col gap-2 text-[0.8125rem] text-bone-500 sm:flex-row sm:items-baseline sm:gap-6">
                <cite className="not-italic text-bone-200">{t.author}</cite>
                <span className="text-bone-600">·</span>
                <span>{t.descriptor}</span>
                <span className="text-bone-600">·</span>
                <span>{t.location}</span>
                <span className="text-bone-600">·</span>
                <span className="tabular">{t.year}</span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
