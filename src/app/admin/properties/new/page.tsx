"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, MapPin } from "lucide-react";
import { PropertyCategoryId, PropertyStatus, Currency, TenureType } from "@/types";

const LOCATION_PRESETS = [
  { city: "Porto Cervo", region: "Sardinia", country: "Italy", countryCode: "IT", lat: 41.1268, lng: 9.5361, short: "Costa Smeralda, Sardinia" },
  { city: "London", region: "Greater London", country: "United Kingdom", countryCode: "GB", lat: 51.5074, lng: -0.1278, short: "Mayfair, London" },
  { city: "Monaco", region: "Monte Carlo", country: "Monaco", countryCode: "MC", lat: 43.7384, lng: 7.4246, short: "Carré d'Or, Monaco" },
  { city: "New York", region: "New York", country: "United States", countryCode: "US", lat: 40.7128, lng: -74.006, short: "Manhattan, New York" },
  { city: "Dubai", region: "Dubai", country: "United Arab Emirates", countryCode: "AE", lat: 25.2048, lng: 55.2708, short: "Palm Jumeirah, Dubai" },
  { city: "Paris", region: "Île-de-France", country: "France", countryCode: "FR", lat: 48.8566, lng: 2.3522, short: "8th Arrondissement, Paris" },
  { city: "Zurich", region: "Zurich", country: "Switzerland", countryCode: "CH", lat: 47.3769, lng: 8.5417, short: "Goldküste, Zurich" },
  { city: "Aspen", region: "Colorado", country: "United States", countryCode: "US", lat: 39.1911, lng: -106.8175, short: "Red Mountain, Aspen" },
  { city: "St. Moritz", region: "Grisons", country: "Switzerland", countryCode: "CH", lat: 46.4908, lng: 9.8355, short: "Suvretta, St. Moritz" },
];

export default function NewPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [reference, setReference] = useState(`MV-${Math.floor(1000 + Math.random() * 9000)}-${["SD", "LD", "MC", "NY", "DB"][Math.floor(Math.random() * 5)]}`);
  const [category, setCategory] = useState<PropertyCategoryId>("villas");
  const [status, setStatus] = useState<PropertyStatus>("available");
  const [price, setPrice] = useState<number>(15000000);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [priceOnApplication, setPriceOnApplication] = useState(false);
  const [featured, setFeatured] = useState(true);

  // Location
  const [neighbourhood, setNeighbourhood] = useState("Romazzino");
  const [city, setCity] = useState("Porto Cervo");
  const [region, setRegion] = useState("Sardinia");
  const [country, setCountry] = useState("Italy");
  const [countryCode, setCountryCode] = useState("IT");
  const [lat, setLat] = useState(41.1268);
  const [lng, setLng] = useState(9.5361);
  const [shortLocation, setShortLocation] = useState("Costa Smeralda, Sardinia");

  // Specs
  const [bedrooms, setBedrooms] = useState(6);
  const [bathrooms, setBathrooms] = useState(7);
  const [interiorSqm, setInteriorSqm] = useState(850);
  const [plotSqm, setPlotSqm] = useState(4500);
  const [parking, setParking] = useState(4);
  const [yearBuilt, setYearBuilt] = useState(2020);
  const [renovated, setRenovated] = useState(2023);
  const [levels, setLevels] = useState(3);
  const [orientation, setOrientation] = useState("South-facing, sunset views");
  const [tenure, setTenure] = useState<TenureType>("freehold");

  // Editorial & Media
  const [heroSrc, setHeroSrc] = useState("https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85");
  const [heroAlt, setHeroAlt] = useState("Luxury architectural residence");
  
  const [highlights] = useState<string[]>([
    "Panoramic ocean and cliffside views",
    "Private infinity pool and landscaped grounds",
    "Master suite with bespoke dressing rooms",
  ]);

  const [narrative] = useState<string[]>([
    "This exceptional private residence embodies architectural harmony and refined luxury. Designed to seamlessly connect indoor living with the natural landscape.",
    "Finished to exacting standards throughout, featuring custom stone craftsmanship, soaring floor-to-ceiling windows, and private staff quarters.",
  ]);

  const [amenities] = useState<string[]>([
    "Heated infinity pool",
    "Private boat mooring",
    "Wine cellar",
    "Spa & Hammam",
    "24/7 Security System",
  ]);

  const [gallery, setGallery] = useState<{ src: string; alt: string; caption?: string }[]>([
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      alt: "Living Salon",
      caption: "Principal living space",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      alt: "Terrace view",
      caption: "Sunset terrace",
    },
  ]);

  function applyPreset(preset: typeof LOCATION_PRESETS[0]) {
    setCity(preset.city);
    setRegion(preset.region);
    setCountry(preset.country);
    setCountryCode(preset.countryCode);
    setLat(preset.lat);
    setLng(preset.lng);
    setShortLocation(preset.short);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter property name.");

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
      exclusive: true,
      discreet: false,
      agentId: "agent-001",
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
      highlights: highlights.filter((h) => h.trim()),
      narrative: narrative.filter((n) => n.trim()),
      amenities: amenities.filter((a) => a.trim()),
      hero: {
        src: heroSrc,
        alt: heroAlt || name,
      },
      gallery,
    };

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        alert("Property added successfully! It is now live on the website.");
        router.push("/admin/properties");
      } else {
        alert("Failed to add property: " + json.error);
      }
    } catch (err) {
      alert("An error occurred while saving the property.");
    } finally {
      setSubmitting(false);
    }
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
            Create New Property Mandate
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            1. Core Mandate Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Property Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Villa Serafina, Penthouse Bellevue"
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
            <label className="block text-xs text-ink-muted mb-1 font-medium">Editorial Tagline</label>
            <input
              type="text"
              placeholder="e.g. A cliffside house that treats the Tyrrhenian as its fourth wall"
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

        {/* Section 2: Location & Geolocation */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
              2. Location & Proximity Coordinates
            </h2>
            <div className="flex items-center gap-1 text-[11px] text-ink-muted font-mono">
              <MapPin className="w-3.5 h-3.5 text-brass-500" />
              Presets available
            </div>
          </div>

          {/* Quick Presets */}
          <div className="p-3 bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline space-y-2">
            <span className="text-[11px] text-ink-muted block uppercase tracking-wider font-medium">
              Quick Location Preset (Auto-fills City, Country, & GPS):
            </span>
            <div className="flex flex-wrap gap-2">
              {LOCATION_PRESETS.map((preset) => (
                <button
                  key={preset.city}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="px-2.5 py-1 text-[11px] border border-hairline bg-obsidian-900 [.light_&]:bg-[#e4deca] text-ink hover:border-brass-400 hover:text-brass-500 transition-colors"
                >
                  {preset.city}, {preset.country}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Neighbourhood</label>
              <input
                type="text"
                value={neighbourhood}
                onChange={(e) => setNeighbourhood(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
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
              <label className="block text-xs text-ink-muted mb-1 font-medium">Region</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
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

        {/* Section 3: Physical Specifications */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            3. Property Specifications
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
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Year Built</label>
              <input
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Renovated Year</label>
              <input
                type="number"
                value={renovated}
                onChange={(e) => setRenovated(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Tenure</label>
              <select
                value={tenure}
                onChange={(e) => setTenure(e.target.value as TenureType)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none capitalize"
              >
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="share-transfer">Share Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-ink-muted mb-1 font-medium">Levels</label>
              <input
                type="number"
                value={levels}
                onChange={(e) => setLevels(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Imagery & Gallery */}
        <div className="border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-6 space-y-4">
          <h2 className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            4. Imagery & Media
          </h2>

          <div>
            <label className="block text-xs text-ink-muted mb-1 font-medium">Main Hero Image URL *</label>
            <input
              type="text"
              required
              value={heroSrc}
              onChange={(e) => setHeroSrc(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none font-mono"
            />
          </div>

          {/* Gallery Items */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-ink font-medium">Gallery Photos</label>
              <button
                type="button"
                onClick={() => setGallery([...gallery, { src: "", alt: "Property Photo", caption: "" }])}
                className="text-xs text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 flex items-center gap-1 hover:underline font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add Photo
              </button>
            </div>

            {gallery.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={item.src}
                  onChange={(e) => {
                    const next = [...gallery];
                    next[idx].src = e.target.value;
                    setGallery(next);
                  }}
                  className="flex-1 px-3 py-1.5 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink font-mono outline-none"
                />
                <input
                  type="text"
                  placeholder="Caption"
                  value={item.caption || ""}
                  onChange={(e) => {
                    const next = [...gallery];
                    next[idx].caption = e.target.value;
                    setGallery(next);
                  }}
                  className="w-1/3 px-3 py-1.5 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink outline-none"
                />
                <button
                  type="button"
                  onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
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
            {submitting ? "Saving Listing..." : "Publish Mandate to Site"}
          </button>
        </div>
      </form>
    </div>
  );
}
