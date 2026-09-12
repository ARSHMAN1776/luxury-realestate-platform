"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/house";
import { propertyCountries, properties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";

const BUDGETS = [
  { label: "No minimum", value: 0 },
  { label: "USD 5M+", value: 5_000_000 },
  { label: "USD 15M+", value: 15_000_000 },
  { label: "USD 25M+", value: 25_000_000 },
  { label: "USD 40M+", value: 40_000_000 },
];

const BEDROOMS = ["any", "2", "3", "4", "5", "6"] as const;

/**
 * Advanced search, presented as a single hairline rail rather than a form
 * card. It resolves to the /properties route with query parameters — the
 * filtering itself lives there, so this stays a doorway, not a duplicate.
 */
export function Discovery() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState<string>("any");

  /* Live count, so the visitor knows what they will get before committing. */
  const matches = useMemo(() => {
    return properties.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (country !== "all" && p.location.country !== country) return false;
      if (bedrooms !== "any" && p.specs.bedrooms < Number(bedrooms)) return false;
      if (minPrice > 0 && !p.priceOnApplication && p.price < minPrice) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${p.name} ${p.location.short} ${p.location.country} ${p.tagline}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    }).length;
  }, [query, category, country, minPrice, bedrooms]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("category", category);
    if (country !== "all") params.set("country", country);
    if (minPrice > 0) params.set("min", String(minPrice));
    if (bedrooms !== "any") params.set("beds", bedrooms);
    router.push(`/properties${params.size ? `?${params}` : ""}`);
  }

  return (
    <section id="discovery" className="relative border-b border-hairline py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal direction="none" duration={0.9}>
              <p className="eyebrow mb-7 flex items-center gap-4 text-brass-500">
                <span className="tabular text-bone-600">01</span>
                <span className="h-px w-8 bg-brass-700" aria-hidden="true" />
                Discovery
              </p>
            </Reveal>

            <TextReveal
              as="h2"
              text="Begin with|a question,|not a filter."
              className="font-display text-title leading-[0.98] font-light text-bone-100"
            />

            <Reveal delay={0.15}>
              <p className="prose-luxe mt-8 max-w-[46ch]">
                Search the public book below. What you will not find here is the
                other two-thirds — those mandates are released after a
                conversation, and in most cases a confidentiality undertaking.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="tabular mt-10 flex items-baseline gap-4 border-t border-hairline pt-7">
                <span className="font-display text-[3.5rem] leading-none font-light text-brass-400">
                  {matches}
                </span>
                <span className="max-w-[14ch] text-[0.8125rem] leading-snug text-bone-500">
                  {matches === 1 ? "mandate matches" : "mandates match"} your criteria
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── The rail ─────────────────────────────────────────────────── */}
          <Reveal delay={0.1} className="lg:pt-2">
            <form onSubmit={submit} className="border border-hairline">
              {/* Free text */}
              <div className="group flex items-center gap-4 border-b border-hairline px-6 py-6 transition-colors duration-500 focus-within:border-brass-700 sm:px-8">
                <Search
                  className="size-4 shrink-0 text-bone-600 transition-colors duration-500 group-focus-within:text-brass-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="An island, a city, a street, a name…"
                  aria-label="Search properties"
                  className="w-full bg-transparent text-[1rem] text-bone-100 outline-none placeholder:text-bone-600 sm:text-[1.125rem]"
                />
              </div>

              {/* Structured criteria */}
              <div className="grid gap-x-8 gap-y-7 px-6 py-8 sm:grid-cols-2 sm:px-8">
                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Territory"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="all">Anywhere</option>
                  {propertyCountries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Guide price from"
                  value={String(minPrice)}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                >
                  {BUDGETS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  {BEDROOMS.map((b) => (
                    <option key={b} value={b}>
                      {b === "any" ? "Any" : `${b}+`}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Action rail */}
              <div className="flex flex-col gap-5 border-t border-hairline px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="flex items-center gap-2.5 text-[0.75rem] text-bone-600">
                  <SlidersHorizontal className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                  Refine further on the results page
                </p>

                <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                  Search the book
                  <ArrowRight className="size-3.5" strokeWidth={1.75} />
                </Button>
              </div>
            </form>

            {/* Common starting points */}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2.5">
              <span className="eyebrow mr-1 text-bone-600">Often asked for</span>
              {[
                { label: "Private islands", href: "/properties?category=islands" },
                { label: "Ibiza", href: "/properties?q=Ibiza" },
                { label: "Full-floor penthouses", href: "/properties?category=penthouses" },
                {
                  label: `${formatPrice(25_000_000, "USD", "compact")}+`,
                  href: "/properties?min=25000000",
                },
              ].map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => router.push(c.href)}
                  className="border border-hairline px-4 py-2 text-[0.75rem] text-bone-400 transition-colors duration-500 hover:border-brass-600 hover:text-brass-300"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
