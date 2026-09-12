import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { faqs } from "@/data/house";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

/**
 * Frequently asked. A single accordion — the anti-grid, the anti-tooltip.
 * Every question is given enough room to be answered properly.
 */
export function FAQ() {
  return (
    <Section id="faq" className="border-t border-hairline">
      <SectionHeader
        index="12"
        eyebrow="Frequently asked"
        title="What people|ask before|they ask us."
        standfirst="The fourteen questions we are asked most often, answered here so the first conversation can begin somewhere more useful."
        action={
          <Button asChild variant="brass" size="inline">
            <Link href="/contact">
              Ask something else
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          </Button>
        }
      />

      <Reveal delay={0.1} className="mx-auto mt-16 max-w-4xl lg:mt-20">
        <Accordion type="single" collapsible>
          {faqs.slice(0, 14).map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-[0.9375rem] leading-relaxed text-bone-400">
            Not answered above? Send your question directly and a principal
            will reply within one working day.
          </p>
          <div className="mt-7">
            <Button asChild variant="outline" size="md">
              <Link href="/contact">
                <Mail className="size-3.5" strokeWidth={1.5} />
                Contact the house
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
