import Link from "next/link";
import { ArrowUpRight, PlusCircle, Building2 } from "lucide-react";
import { getAllProperties } from "@/lib/db";
import { Section, SectionHeader } from "@/components/sections/Section";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";

/**
 * The featured book — five mandates, set as an editorial spread rather than a
 * marketplace grid. Live connected to persistent storage.
 */
export function Featured() {
  const properties = getAllProperties();
  const featured = properties.filter((p) => p.featured);
  const list = featured.length > 0 ? featured : properties;

  const [lead, ...rest] = list.slice(0, 5);

  return (
    <Section id="featured">
      <SectionHeader
        index="02"
        eyebrow="Featured mandates"
        title="A short list,|kept short|on purpose."
        standfirst="We decline more instructions than we accept. What remains is a book we are prepared to stand behind — every address visited, every title examined, every price defensible."
        action={
          <Button asChild variant="brass" size="inline">
            <Link href="/properties">
              View the entire book
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </Link>
          </Button>
        }
      />

      <div className="mt-16 sm:mt-20 lg:mt-24">
        {!lead ? (
          /* Empty State when all listings deleted */
          <div className="border border-hairline bg-obsidian-900/40 p-12 text-center space-y-6 max-w-3xl mx-auto">
            <Building2 className="w-10 h-10 text-brass-500 mx-auto opacity-70" />
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-light text-bone-100">
                Private Book Currently Updating
              </h3>
              <p className="text-body-sm text-bone-400 max-w-lg mx-auto">
                All mandates are currently under private subscription or discreet off-market transactions. Contact our private office for exclusive dossiers or create new listings in the system.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild variant="brass" size="md">
                <Link href="/contact">Contact Private Office</Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link href="/admin/properties/new" className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" /> Add Mandate in Admin
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <PropertyCard
              property={lead}
              size="wide"
              priority
              className="mx-auto max-w-5xl"
            />

            {rest.length > 0 && (
              <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:mt-24 lg:gap-x-14 lg:gap-y-20">
                {rest.map((property, i) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={i}
                    className={i % 2 === 1 ? "lg:mt-20" : undefined}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
}
