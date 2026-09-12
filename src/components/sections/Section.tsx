import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/**
 * The one heading treatment used by every section: an indexed eyebrow above a
 * masked-line display heading, with an optional standfirst in the right column.
 * Line breaks in `title` are author-controlled via "|".
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  standfirst,
  align = "split",
  className,
  action,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  standfirst?: string;
  align?: "split" | "left" | "centre";
  className?: string;
  action?: React.ReactNode;
}) {
  const heading = (
    <TextReveal
      as="h2"
      text={title}
      className="font-display text-title leading-[0.98] font-light text-bone-100"
    />
  );

  const label = (
    <Reveal direction="none" duration={0.9}>
      <p className="eyebrow flex items-center gap-4 text-brass-500">
        {index && <span className="tabular text-bone-600">{index}</span>}
        <span className="h-px w-8 bg-brass-700" aria-hidden="true" />
        {eyebrow}
      </p>
    </Reveal>
  );

  if (align === "centre") {
    return (
      <div className={cn("mx-auto max-w-3xl text-center", className)}>
        <div className="mb-7 flex justify-center">{label}</div>
        {heading}
        {standfirst && (
          <Reveal delay={0.15}>
            <p className="prose-luxe mx-auto mt-7 max-w-[54ch]">{standfirst}</p>
          </Reveal>
        )}
      </div>
    );
  }

  if (align === "left") {
    return (
      <div className={cn("max-w-3xl", className)}>
        <div className="mb-7">{label}</div>
        {heading}
        {standfirst && (
          <Reveal delay={0.15}>
            <p className="prose-luxe mt-7 max-w-[56ch]">{standfirst}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-9 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16",
        className
      )}
    >
      <div>
        <div className="mb-7">{label}</div>
        {heading}
      </div>

      <div className="lg:pb-2">
        {standfirst && (
          <Reveal delay={0.15}>
            <p className="prose-luxe max-w-[52ch]">{standfirst}</p>
          </Reveal>
        )}
        {action && (
          <Reveal delay={0.25}>
            <div className="mt-8">{action}</div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/** Standard vertical rhythm for a homepage section. */
export function Section({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-24 sm:py-32 lg:py-40", className)}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}
