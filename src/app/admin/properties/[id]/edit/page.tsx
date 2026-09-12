"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Plus, MapPin } from "lucide-react";
import { Property, PropertyCategoryId, PropertyStatus, Currency, TenureType } from "@/types";

type Props = { params: Promise<{ id: string }> };

export default function EditPropertyPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [reference, setReference] = useState("");
  const [category, setCategory] = useState<PropertyCategoryId>("villas");
  const [status, setStatus] = useState<PropertyStatus>("available");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [priceOnApplication, setPriceOnApplication] = useState(false);
  const [featured, setFeatured] = useState(false);

  // Location
  const [neighbourhood, setNeighbourhood] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [shortLocation, setShortLocation] = useState("");

  // Specs
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [interiorSqm, setInteriorSqm] = useState(0);
  const [plotSqm, setPlotSqm] = useState(0);
  const [parking, setParking] = useState(0);
  const [yearBuilt, setYearBuilt] = useState(2020);
  const [renovated, setRenovated] = useState(2022);
  const [levels, setLevels] = useState(1);
  const [orientation, setOrientation] = useState("");
  const [tenure, setTenure] = useState<TenureType>("freehold");

  // Media
  const [heroSrc, setHeroSrc] = useState("");
  const [heroAlt, setHeroAlt] = useState("");
  const [gallery, setGallery] = useState<{ src: string; alt: string; caption?: string }[]>([]);

  useEffect(() => {
    async function loadProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          const p: Property = json.data;
          setName(p.name);
          setTagline(p.tagline || "");
          setReference(p.reference || "");
          setCategory(p.category);
          setStatus(p.status);
          setPrice(p.price);
          setCurrency(p.currency);
          setPriceOnApplication(!!p.priceOnApplication);
          setFeatured(!!p.featured);

          setNeighbourhood(p.location.neighbourhood || "");
          setCity(p.location.city || "");
          setRegion(p.location.region || "");
          setCountry(p.location.country || "");
          setCountryCode(p.location.countryCode || "");
          setLat(p.location.coordinates?.lat || 0);
          setLng(p.location.coordinates?.lng || 0);
          setShortLocation(p.location.short || "");

          setBedrooms(p.specs.bedrooms || 0);
          setBathrooms(p.specs.bathrooms || 0);
          setInteriorSqm(p.specs.interiorSqm || 0);
          setPlotSqm(p.specs.plotSqm || 0);
          setParking(p.specs.parking || 0);
          setYearBuilt(p.specs.yearBuilt || 2020);
          setRenovated(p.specs.renovated || 0);
          setLevels(p.specs.levels || 1);
          setOrientation(p.specs.orientation || "");
          setTenure(p.specs.tenure || "freehold");

          setHeroSrc(p.hero.src || "");
          setHeroAlt(p.hero.alt || "");
          setGallery(p.gallery || []);
        } else {
          alert("Property not found");
          router.push("/admin/properties");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name,
      tagline,
      reference,
      category,
      status,
      price: Number(price),
      currency,
      priceOnApplication,
      featured,
      location: {
        neighbourhood,
        city,
        region,
        country,
        countryCode,
        coordinates: { lat: Number(lat), lng: Number(lng) },
        short: shortLocation || `${city}, ${country}`,
      },
      specs: {
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        interiorSqm: Number(interiorSqm),
        plotSqm: plotSqm ? Number(plotSqm) : null,
        parking: Number(parking),
        yearBuilt: Number(yearBuilt),
        renovated: renovated ? Number(renovated) : undefined,
        levels: Number(levels),
        orientation,
        tenure,
      },
      hero: {
        src: heroSrc,
        alt: heroAlt || name,
      },
      gallery,
    };

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        alert("Property updated successfully!");
        router.push("/admin/properties");
      } else {
        alert("Update failed: " + json.error);
      }
    } catch (err) {
      alert("Error saving property changes");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-12 text-center text-ink-muted text-xs uppercase tracking-widest">Loading property details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-6">
        <div>
          <Link
            href="/admin/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted hover:text-brass-500 mb-2 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Registry
          </Link>
          <h1 className="font-display text-3xl font-light text-ink">
            Edit Mandate: {name}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1 */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            1. Core Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Property Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Reference Code</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink font-mono focus:border-brass-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-ink-muted mb-1 font-medium">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PropertyCategoryId)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none capitalize"
              >
                <option value="villas">Villas</option>
                <option value="penthouses">Penthouses</option>
                <option value="estates">Estates</option>
                <option value="residences">Residences</option>
                <option value="commercial">Commercial</option>
                <option value="islands">Islands</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none capitalize"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="under-offer">Under Offer</option>
                <option value="sold">Sold</option>
                <option value="off-market">Off Market</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CHF">CHF (Fr)</option>
                <option value="AED">AED (AED)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                disabled={priceOnApplication}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink font-mono focus:border-brass-400 outline-none disabled:opacity-50"
              />
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={priceOnApplication}
                  onChange={(e) => setPriceOnApplication(e.target.checked)}
                  className="accent-brass-500"
                />
                Price on Application (POA)
              </label>

              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-brass-500"
                />
                Featured on Homepage
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Location */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            2. Location & GPS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Country *</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Short Display Label</label>
              <input
                type="text"
                value={shortLocation}
                onChange={(e) => setShortLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Latitude (GPS)</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink font-mono focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Longitude (GPS)</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink font-mono focus:border-brass-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Specs */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            3. Specifications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Interior Area (m²)</label>
              <input
                type="number"
                value={interiorSqm}
                onChange={(e) => setInteriorSqm(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Plot Area (m²)</label>
              <input
                type="number"
                value={plotSqm}
                onChange={(e) => setPlotSqm(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Imagery */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            4. Main Hero Photo
          </h2>
          <div>
            <label className="block text-xs text-ink-muted mb-1 font-medium">Hero Image URL</label>
            <input
              type="text"
              required
              value={heroSrc}
              onChange={(e) => setHeroSrc(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink font-mono focus:border-brass-400 outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/properties"
            className="px-6 py-3 text-xs uppercase tracking-widest border border-hairline text-ink-muted hover:text-ink transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-widest bg-brass-500 text-obsidian-950 font-semibold hover:bg-brass-400 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Saving..." : "Save Mandate Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
