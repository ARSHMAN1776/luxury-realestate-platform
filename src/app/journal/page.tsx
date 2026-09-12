"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowUpRight, BookOpen } from "lucide-react";
import { journalPosts } from "@/data/journal";
import { BLUR_OBSIDIAN } from "@/lib/images";
import { Reveal } from "@/components/motion/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";

const CATEGORIES = ["All", "Market Intelligence", "Architecture", "Investment", "The House", "Lifestyle"];

export default function JournalArchivePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return journalPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-ground text-ink pb-20">
      {/* Editorial Page Header */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-hairline bg-obsidian-900/40">
        <div className="shell">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brass-500/10 border border-brass-500/20 text-brass-400 text-[0.75rem] font-medium tracking-widest uppercase mb-6">
              <BookOpen className="size-3.5" />
              The House Journal & Papers
            </div>
            <h1 className="font-display text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem] font-light leading-[1.05] tracking-tight text-bone-50">
              Private Underwriting & Market Intelligence
            </h1>
            <p className="mt-6 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-bone-400">
              Permanent advisory essays, planning precedent analysis, and valuation frameworks published under the house name for sovereign buyers, family offices, and private estate managers.
            </p>
          </div>

          {/* Search & Category Filtering Bar */}
          <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-t border-hairline pt-8">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[0.8125rem] transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-brass-500 text-obsidian-950 font-medium"
                      : "bg-obsidian-850/80 text-bone-400 border border-hairline hover:border-brass-500/40 hover:text-bone-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-bone-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-obsidian-850 border border-hairline pl-10 pr-4 py-2 text-[0.8125rem] text-bone-100 placeholder:text-bone-600 focus:outline-none focus:border-brass-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles List */}
      <section className="py-16 sm:py-24 shell">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-hairline p-10">
            <p className="text-bone-400 text-[1.125rem]">No journal articles found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-brass-500 text-obsidian-950 text-xs uppercase tracking-wider font-semibold hover:bg-brass-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <article className="group flex flex-col justify-between h-full border border-hairline bg-obsidian-900/50 p-6 transition-all duration-500 hover:border-brass-500/40 hover:shadow-brass/20">
                  <div>
                    <Link
                      href={`/journal/${post.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-obsidian-800 outline-none"
                    >
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR_OBSIDIAN}
                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      />
                      <div className="absolute top-3 left-3 bg-obsidian-950/85 backdrop-blur-sm px-2.5 py-1 text-[0.625rem] font-medium tracking-widest uppercase text-brass-400 border border-hairline">
                        {post.category}
                      </div>
                    </Link>

                    <div className="mt-6">
                      <h2 className="font-display text-[1.6rem] leading-snug font-light text-bone-100 transition-colors duration-300 group-hover:text-brass-200">
                        <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="mt-3 text-[0.875rem] leading-relaxed text-bone-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5 text-[0.8125rem]">
                    <span className="font-medium text-bone-300">{post.author}</span>
                    <Link
                      href={`/journal/${post.slug}`}
                      className="inline-flex items-center gap-1 text-brass-400 font-medium text-[0.8125rem] group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Read Essay <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
