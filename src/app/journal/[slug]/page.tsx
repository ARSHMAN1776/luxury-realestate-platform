import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { journalPosts, getJournalPostBySlug, getRelatedPosts } from "@/data/journal";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return journalPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function JournalArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getJournalPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 3);

  return (
    <main className="min-h-screen bg-ground text-ink pb-24">
      {/* Header Back Navigation */}
      <article className="pt-28 sm:pt-36">
        <div className="shell">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[0.8125rem] text-bone-400 hover:text-brass-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journal Archive
          </Link>

          {/* Metadata & Title */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-[0.8125rem] text-bone-400 mb-5">
              <span className="px-3 py-1 bg-brass-500/10 border border-brass-500/20 text-brass-400 text-[0.6875rem] font-medium tracking-widest uppercase">
                {post.category}
              </span>
            </div>

            <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem] font-light leading-[1.08] tracking-tight text-bone-50">
              {post.title}
            </h1>

            <p className="mt-6 text-[1.1875rem] sm:text-[1.35rem] leading-relaxed text-bone-300 font-light border-l-2 border-brass-500/60 pl-6 py-1">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="mt-8 flex items-center justify-between border-y border-hairline py-4">
              <div className="flex items-center gap-4">
                <div className="size-11 rounded-full bg-obsidian-700 border border-brass-500/30 flex items-center justify-center font-display text-[1.25rem] text-brass-300 font-light">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[0.9375rem] font-medium text-bone-100">{post.author}</p>
                  <p className="text-[0.75rem] text-bone-500">Partner & Senior Market Advisory</p>
                </div>
              </div>

              <div className="text-right text-[0.75rem] text-bone-500 hidden sm:block">
                <p>Document Ref: <span className="font-mono text-brass-400/80">{post.id.toUpperCase()}-2026</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-10 shell">
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden bg-obsidian-850 border border-hairline">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_OBSIDIAN}
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-[0.75rem] text-bone-500 text-right italic">
            Photography: {post.image.alt}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="mt-14 shell">
          <div className="max-w-3xl mx-auto space-y-7">
            {post.body.map((paragraph, index) => {
              // Render Subheadings
              if (paragraph.startsWith("## ")) {
                const subhead = paragraph.replace("## ", "");
                return (
                  <div key={index} className="pt-6 pb-2 border-b border-hairline/60">
                    <h2 className="font-display text-[1.85rem] sm:text-[2.25rem] font-light leading-tight text-bone-100">
                      {subhead}
                    </h2>
                  </div>
                );
              }

              // Render Key Highlight / Pull Quote box for early paragraph
              if (index === 1) {
                return (
                  <div key={index}>
                    <p className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.8] text-bone-200">
                      {paragraph}
                    </p>

                    <div className="my-8 bg-obsidian-900/90 border-l-2 border-brass-500 p-6 sm:p-8">
                      <p className="font-display text-[1.35rem] sm:text-[1.5rem] font-light leading-snug text-brass-200 italic">
                        &ldquo;Permits and non-replicable physical rights do not respond to credit cycles. Their supply curve is fixed or declining.&rdquo;
                      </p>
                      <p className="mt-3 text-[0.75rem] uppercase tracking-widest text-brass-500 font-medium">
                        — Private Underwriting Thesis
                      </p>
                    </div>
                  </div>
                );
              }

              // Render Standard Paragraph
              return (
                <p key={index} className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.85] text-bone-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author Sign-off Footer */}
          <div className="max-w-3xl mx-auto mt-16 border-t border-hairline pt-10">
            <div className="bg-obsidian-900/60 border border-hairline p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h4 className="font-display text-[1.35rem] text-bone-100 font-light">
                  Need tailored underwriting advice?
                </h4>
                <p className="mt-1 text-[0.875rem] text-bone-400">
                  Speak directly with our market intelligence desk regarding private acquisition diligence.
                </p>
              </div>
              <Button asChild variant="brass" size="inline">
                <Link href="/contact">
                  Enquire with Advisory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-hairline shell">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="eyebrow text-brass-500">Further Reading</p>
              <h3 className="font-display text-[2rem] font-light text-bone-100 mt-2">
                Related Intelligence Papers
              </h3>
            </div>
            <Link
              href="/journal"
              className="text-[0.8125rem] text-brass-400 hover:text-brass-300 font-medium flex items-center gap-1"
            >
              View All Papers &rarr;
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {related.map((relPost) => (
              <Link
                key={relPost.id}
                href={`/journal/${relPost.slug}`}
                className="group border border-hairline bg-obsidian-900/40 p-5 transition-all hover:border-brass-500/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-800">
                  <Image
                    src={relPost.image.src}
                    alt={relPost.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[0.6875rem] text-bone-500">
                    <span className="eyebrow text-brass-500">{relPost.category}</span>
                  </div>
                  <h4 className="mt-2 font-display text-[1.25rem] font-light leading-snug text-bone-100 group-hover:text-brass-200 transition-colors">
                    {relPost.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
