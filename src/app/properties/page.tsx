"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Property, PropertyCategoryId } from "@/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Section } from "@/components/sections/Section";
import { Search, MapPin, Navigation, SlidersHorizontal, X, RefreshCw, Compass } from "lucide-react";

const LOCATION_OPTIONS = [
  { label: "All Locations", value: "all" },
  { label: "📍 Near Me (GPS Geolocation)", value: "near_me" },
  { label: "Porto Cervo, Sardinia", value: "Porto Cervo" },
  { label: "London, UK", value: "London" },
  { label: "Monaco, Monte Carlo", value: "Monaco" },
  { label: "New York, USA", value: "New York" },
  { label: "Dubai, UAE", value: "Dubai" },
  { label: "Paris, France", value: "Paris" },
  { label: "Zurich, Switzerland", value: "Zurich" },
  { label: "Aspen, USA", value: "Aspen" },
  { label: "St. Moritz, Switzerland", value: "St. Moritz" },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  
  const [properties, setProperties] = useState<(Property & { distanceKm?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters State
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState<string>(searchParams.get("category") || "all");
  const [locationValue, setLocationValue] = useState<string>(searchParams.get("location") || "all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [sort, setSort] = useState<string>("featured");

  // Geolocation State
  const [geoState, setGeoState] = useState<{
    active: boolean;
    loading: boolean;
    lat?: number;
    lng?: number;
    error?: string;
  }>({ active: false, loading: false });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("query", query.trim());
      if (category !== "all") params.set("category", category);
      if (locationValue !== "all" && locationValue !== "near_me") {
        params.set("city", locationValue);
      }
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (bedrooms !== "any") params.set("bedrooms", bedrooms);
      if (sort) params.set("sort", sort);

      if (geoState.active && geoState.lat && geoState.lng) {
        params.set("nearLat", String(geoState.lat));
        params.set("nearLng", String(geoState.lng));
      }

      const res = await fetch(`/api/properties?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setProperties(json.data);
        setTotalCount(json.total || json.data.length);
      }
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    } finally {
      setLoading(false);
    }
  }, [query, category, locationValue, minPrice, maxPrice, bedrooms, sort, geoState]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Request HTML5 Geolocation API
  function handleRequestLocation() {
    if (!navigator.geolocation) {
      setGeoState({ active: false, loading: false, error: "Geolocation is not supported by your browser." });
      return;
    }

    setGeoState({ active: false, loading: true, error: undefined });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoState({
          active: true,
          loading: false,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: undefined,
        });
        setLocationValue("near_me");
        setSort("near");
      },
      (error) => {
        let msg = "Could not retrieve location permission.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied by browser.";
        }
        setGeoState({ active: false, loading: false, error: msg });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  function handleLocationDropdownChange(val: string) {
    if (val === "near_me") {
      handleRequestLocation();
    } else {
      setGeoState({ active: false, loading: false });
      setLocationValue(val);
    }
  }

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setLocationValue("all");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("any");
    setSort("featured");
    setGeoState({ active: false, loading: false });
  }

  return (
    <div className="pt-24 sm:pt-32 pb-24 space-y-12">
      {/* Header Banner */}
      <section className="shell space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hairline pb-8">
          <div>
            <span className="eyebrow text-brass-400">The Mandate Registry</span>
            <h1 className="display-sm font-light text-bone-100 mt-2">
              International Property Mandates
            </h1>
            <p className="text-body-sm text-bone-400 mt-2 max-w-xl">
              Explore residential and commercial properties from our global portfolio. Live data powered by the private property house system.
            </p>
          </div>

          {/* Near Me Button */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <button
              onClick={handleRequestLocation}
              disabled={geoState.loading}
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-widest border transition-all ${
                geoState.active
                  ? "border-brass-400 bg-brass-400/10 text-brass-300"
                  : "border-hairline text-bone-200 hover:border-brass-400 hover:text-brass-400"
              }`}
            >
              <Navigation className={`w-4 h-4 text-brass-400 ${geoState.loading ? "animate-spin" : ""}`} />
              {geoState.loading
                ? "Detecting Coordinates..."
                : geoState.active
                ? "📍 Proximity Sorting Active"
                : "Use My Location (Near Me)"}
            </button>

            {geoState.error && (
              <span className="text-[11px] text-amber-400">{geoState.error}</span>
            )}
          </div>
        </div>
      </section>

      {/* Filter Control Bar */}
      <section className="shell">
        <div className="border border-hairline bg-obsidian-900/60 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-widest text-bone-400 mb-1 font-semibold">
                Keywords Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-bone-500" />
                <input
                  type="text"
                  placeholder="Villa, reference, street..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-obsidian-950 border border-hairline text-bone-100 focus:border-brass-400 outline-none"
                />
              </div>
            </div>

            {/* Location Selector Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-bone-400 mb-1 font-semibold">
                Location & Region
              </label>
              <select
                value={locationValue}
                onChange={(e) => handleLocationDropdownChange(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 border border-hairline text-bone-100 focus:border-brass-400 outline-none"
              >
                {LOCATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-bone-400 mb-1 font-semibold">
                Mandate Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 border border-hairline text-bone-100 focus:border-brass-400 outline-none capitalize"
              >
                <option value="all">All Categories</option>
                <option value="villas">Villas</option>
                <option value="penthouses">Penthouses</option>
                <option value="estates">Estates</option>
                <option value="residences">Residences</option>
                <option value="commercial">Commercial</option>
                <option value="islands">Islands</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-bone-400 mb-1 font-semibold">
                Order & Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-obsidian-950 border border-hairline text-bone-100 focus:border-brass-400 outline-none"
              >
                <option value="featured">Featured Mandates</option>
                <option value="near">Proximity (Closest First)</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="newest">Newest to Market</option>
                <option value="size-desc">Interior Size (m²)</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters (Bedrooms & Price Range) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-bone-400 text-[11px] uppercase tracking-wider">Bedrooms:</span>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="px-2 py-1 bg-obsidian-950 border border-hairline text-bone-100 outline-none"
                >
                  <option value="any">Any Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                  <option value="7">7+ Bedrooms</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-bone-400 text-[11px] uppercase tracking-wider">Price Range:</span>
                <input
                  type="number"
                  placeholder="Min €"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-24 px-2 py-1 bg-obsidian-950 border border-hairline text-bone-100 font-mono outline-none"
                />
                <span className="text-bone-500">-</span>
                <input
                  type="number"
                  placeholder="Max €"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-28 px-2 py-1 bg-obsidian-950 border border-hairline text-bone-100 font-mono outline-none"
                />
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-bone-400 hover:text-brass-400 transition-colors uppercase tracking-wider text-[11px]"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="shell space-y-8">
        <div className="flex items-center justify-between text-xs text-bone-400 border-b border-hairline pb-4">
          <span>
            Showing <strong className="text-bone-100 font-mono">{properties.length}</strong> of{" "}
            <strong className="text-bone-100 font-mono">{totalCount}</strong> luxury mandates
            {geoState.active && " (Sorted by distance from your location)"}
          </span>

          {loading && (
            <span className="flex items-center gap-2 text-brass-400 font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Updating grid...
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-bone-500 font-mono text-xs uppercase tracking-widest">
            Fetching mandate directory...
          </div>
        ) : properties.length === 0 ? (
          <div className="py-24 text-center border border-hairline bg-obsidian-900/30 space-y-4">
            <Compass className="w-8 h-8 text-brass-500 mx-auto opacity-60" />
            <h3 className="font-display text-xl text-bone-200">No matching mandates found</h3>
            <p className="text-body-sm text-bone-400 max-w-md mx-auto">
              We could not find any property listings matching your exact search criteria. Try expanding your location or price range.
            </p>
            <button
              onClick={resetFilters}
              className="inline-block px-6 py-2.5 text-xs uppercase tracking-widest bg-brass-500 text-obsidian-950 font-semibold hover:bg-brass-400 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {properties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} index={idx} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <main>
      <Suspense fallback={<div className="pt-32 text-center text-bone-400 text-xs uppercase tracking-widest">Loading registry...</div>}>
        <PropertiesContent />
      </Suspense>
    </main>
  );
}
