"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Search, PlusCircle, Trash2, Edit3, Eye, Star, RefreshCw } from "lucide-react";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    setLoading(true);
    try {
      const res = await fetch("/api/properties");
      const json = await res.json();
      if (json.success) {
        setProperties(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This action will immediately remove it from the public website.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete: " + json.error);
      }
    } catch (err) {
      alert("Error deleting property");
    }
  }

  async function toggleFeatured(property: Property) {
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !property.featured }),
      });
      const json = await res.json();
      if (json.success) {
        setProperties((prev) =>
          prev.map((p) => (p.id === property.id ? { ...p, featured: !p.featured } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = properties.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.reference.toLowerCase().includes(search.toLowerCase()) ||
      p.location.city.toLowerCase().includes(search.toLowerCase()) ||
      p.location.country.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "all" || p.category === category;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <span className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            Mandate Registry
          </span>
          <h1 className="font-display text-3xl font-light text-ink mt-1">
            Property Mandates ({properties.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProperties}
            className="p-3 border border-hairline text-ink-muted hover:text-brass-500 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-widest bg-brass-500 text-obsidian-950 font-semibold hover:bg-brass-400 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Property
          </Link>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eae6db] p-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by name, reference, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none capitalize"
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

        {/* Status */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-obsidian-950 [.light_&]:bg-[#f7f5f0] border border-hairline text-ink focus:border-brass-400 outline-none capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="under-offer">Under Offer</option>
            <option value="sold">Sold</option>
            <option value="off-market">Off Market</option>
          </select>
        </div>
      </div>

      {/* Property Table */}
      <div className="border border-hairline bg-obsidian-900/40 [.light_&]:bg-[#eae6db]">
        {loading ? (
          <div className="p-12 text-center text-ink-muted text-xs uppercase tracking-widest">
            Loading property mandates...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-ink-muted text-xs">
            No properties match your filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink border-collapse">
              <thead>
                <tr className="border-b border-hairline text-ink-muted uppercase tracking-wider bg-obsidian-900 [.light_&]:bg-[#e0dbc9]">
                  <th className="py-3.5 px-4 font-medium">Featured</th>
                  <th className="py-3.5 px-4 font-medium">Property Name</th>
                  <th className="py-3.5 px-4 font-medium">Category</th>
                  <th className="py-3.5 px-4 font-medium">Location</th>
                  <th className="py-3.5 px-4 font-medium">Specs</th>
                  <th className="py-3.5 px-4 font-medium">Price</th>
                  <th className="py-3.5 px-4 font-medium">Status</th>
                  <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-obsidian-800/40 [.light_&]:hover:bg-[#e4deca] transition-colors">
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-1.5 rounded transition-colors ${
                          p.featured ? "text-brass-500" : "text-ink-muted hover:text-ink"
                        }`}
                        title={p.featured ? "Featured on Homepage" : "Click to feature"}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-ink">
                      <Link href={`/admin/properties/${p.id}/edit`} className="hover:text-brass-500">
                        {p.name}
                      </Link>
                      <span className="block text-[11px] text-ink-muted font-mono">{p.reference}</span>
                    </td>
                    <td className="py-3.5 px-4 capitalize">{p.category}</td>
                    <td className="py-3.5 px-4">
                      {p.location.short || `${p.location.city}, ${p.location.country}`}
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">
                      {p.specs.bedrooms} beds · {p.specs.bathrooms} baths · {p.specs.interiorSqm}m²
                    </td>
                    <td className="py-3.5 px-4 font-mono text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 font-semibold">
                      {p.priceOnApplication ? "POA" : formatPrice(p.price, p.currency, "compact")}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider border border-hairline bg-obsidian-800 [.light_&]:bg-[#e0dbc9] text-ink font-medium">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-3 font-mono">
                        <Link
                          href={`/admin/properties/${p.id}/edit`}
                          className="p-1.5 text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 hover:bg-brass-500/10 rounded transition-colors"
                          title="Edit Property"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/properties/${p.slug}`}
                          target="_blank"
                          className="p-1.5 text-ink-muted hover:text-ink hover:bg-hairline rounded transition-colors"
                          title="View on Public Site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
