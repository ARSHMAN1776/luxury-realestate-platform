import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { journalPosts } from "@/data/journal";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Section, SectionHeader } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * The Journal Section.
 * Displays 5 permanent, high-value editorial articles for luxury real estate clients.
 * Clean, timeless editorial presentation with category and author (no dates/times).
 */
export function Journal() {
  const featuredPost = journalPosts[0];
  const gridPosts = journalPosts.slice(1, 5); // 4 permanent articles

  return (
    <Section id="journal" className="border-t border-hairline">
      <SectionHeader
        index="05"
        eyebrow="The Journal & Intelligence"
        title="Market intelligence &|private underwriting."
        standfirst="Curated editorial essays, valuation frameworks, and structural analysis published under the house name for sovereign buyers and asset managers."
        action={
          <Button asChild variant="brass" size="inline">
            <Link href="/journal">
              Explore All Articles
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          </Button>
        }
      />

      {/* Featured Primary Article (Article 1) */}
      <div className="mt-14 lg:mt-18">
        <Reveal>
          <article className="group relative overflow-hidden border border-hairline bg-obsidian-900/60 p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:border-brass-500/40">
            <Link
              href={`/journal/${featuredPost.slug}`}
              className="grid gap-8 lg:grid-cols-12 lg:items-center outline-none"
            >
              <div className="relative aspect-[16/9] lg:aspect-[16/10] overflow-hidden lg:col-span-7 bg-obsidian-850">
                <Image
                  src={featuredPost.image.src}
                  alt={featuredPost.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  placeholder="blur"
                  blurDataURL={BLUR_OBSIDIAN}
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 left-4 z-10 bg-obsidian-950/80 backdrop-blur-md px-3 py-1 text-[0.6875rem] font-medium tracking-wider uppercase text-brass-400 border border-hairline">
                  Featured Intelligence
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="flex items-center gap-3 text-[0.75rem] text-bone-500">
                  <span className="eyebrow text-brass-500">{featuredPost.category}</span>
                </div>

                <h3 className="mt-4 font-display text-[1.85rem] sm:text-[2.25rem] leading-[1.15] font-light text-bone-100 transition-colors duration-300 group-hover:text-brass-200">
                  {featuredPost.title}
                </h3>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone-400">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-8 flex items-center justify-between border-t border-hairline pt-6 text-[0.8125rem]">
                  <span className="font-medium text-bone-200">{featuredPost.author}</span>

                  <span className="inline-flex items-center gap-1.5 text-brass-400 font-medium text-[0.8125rem] group-hover:translate-x-1 transition-transform duration-300">
                    Read Article <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </Reveal>
      </div>

      {/* Grid of 4 Permanent Articles */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {gridPosts.map((post, i) => (
          <Reveal key={post.id} delay={0.1 + i * 0.08}>
            <article className="group flex flex-col justify-between h-full border border-hairline bg-obsidian-900/40 p-5 transition-all duration-500 hover:border-brass-500/30">
              <Link href={`/journal/${post.slug}`} className="flex flex-col h-full outline-none">
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-800">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_OBSIDIAN}
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>

                <div className="mt-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="eyebrow text-brass-500 text-[0.625rem]">{post.category}</span>
                    </div>

                    <h4 className="mt-3 font-display text-[1.25rem] leading-snug font-light text-bone-100 transition-colors duration-300 group-hover:text-brass-200">
                      {post.title}
                    </h4>

                    <p className="mt-2.5 line-clamp-3 text-[0.8125rem] leading-relaxed text-bone-400">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-[0.75rem] text-bone-500">
                    <span className="font-medium text-bone-300">{post.author}</span>
                    <span className="text-brass-400 group-hover:translate-x-0.5 transition-transform duration-300 font-medium">
                      Read Essay &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
