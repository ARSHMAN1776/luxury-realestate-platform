import Link from "next/link";
import { getAllProperties, getAllEnquiries } from "@/lib/db";
import { Building2, PlusCircle, MessageSquare, TrendingUp, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const properties = getAllProperties();
  const enquiries = getAllEnquiries();

  const totalValue = properties.reduce((acc, p) => acc + (p.price || 0), 0);
  const availableCount = properties.filter((p) => p.status === "available").length;
  const featuredCount = properties.filter((p) => p.featured).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <span className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            System Control Center
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-ink mt-1">
            Property House Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider bg-brass-500 text-obsidian-950 font-semibold hover:bg-brass-400 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Property
          </Link>
          <Link
            href="/properties"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider border border-hairline text-ink hover:border-brass-400 hover:text-brass-500 transition-colors"
          >
            Preview Site
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metric Cards - Clean, Theme-Aware Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 border border-hairline bg-obsidian-900/40 [.light_&]:bg-[#eae6db] space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] uppercase tracking-wider font-medium">Total Listings</span>
            <Building2 className="w-4 h-4 text-brass-500" />
          </div>
          <p className="font-display text-2xl font-light text-ink">{properties.length}</p>
          <p className="text-[11px] text-ink-muted">{availableCount} active on public market</p>
        </div>

        <div className="p-5 border border-hairline bg-obsidian-900/40 [.light_&]:bg-[#eae6db] space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] uppercase tracking-wider font-medium">Portfolio Value</span>
            <TrendingUp className="w-4 h-4 text-brass-500" />
          </div>
          <p className="font-display text-2xl font-light text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            {formatPrice(totalValue, "EUR", "compact")}
          </p>
          <p className="text-[11px] text-ink-muted">Across luxury mandates</p>
        </div>

        <div className="p-5 border border-hairline bg-obsidian-900/40 [.light_&]:bg-[#eae6db] space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] uppercase tracking-wider font-medium">Featured</span>
            <CheckCircle2 className="w-4 h-4 text-brass-500" />
          </div>
          <p className="font-display text-2xl font-light text-ink">{featuredCount}</p>
          <p className="text-[11px] text-ink-muted">Highlighted on homepage</p>
        </div>

        <div className="p-5 border border-hairline bg-obsidian-900/40 [.light_&]:bg-[#eae6db] space-y-2">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-[11px] uppercase tracking-wider font-medium">Client Leads</span>
            <MessageSquare className="w-4 h-4 text-brass-500" />
          </div>
          <p className="font-display text-2xl font-light text-ink">{enquiries.length}</p>
          <p className="text-[11px] text-ink-muted">Captured from forms</p>
        </div>
      </div>

      {/* Recent Property Listings Table */}
      <div className="border border-hairline bg-obsidian-900/30 [.light_&]:bg-[#eae6db] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-light text-ink">Recent Property Listings</h2>
            <p className="text-[11px] text-ink-muted">Click any property to edit details or delete listing.</p>
          </div>
          <Link
            href="/admin/properties"
            className="text-xs uppercase tracking-widest text-brass-500 hover:underline font-medium"
          >
            View All ({properties.length}) &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink border-collapse">
            <thead>
              <tr className="border-b border-hairline text-ink-muted uppercase tracking-wider bg-obsidian-950/60 [.light_&]:bg-[#e0dbc9]">
                <th className="py-3 px-4 font-medium">Property</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {properties.slice(0, 6).map((p) => (
                <tr key={p.id} className="hover:bg-obsidian-800/40 [.light_&]:hover:bg-[#e4deca] transition-colors">
                  <td className="py-3 px-4 font-medium text-ink">
                    <Link href={`/admin/properties/${p.id}/edit`} className="hover:text-brass-500">
                      {p.name}
                    </Link>
                    <span className="block text-[11px] text-ink-muted font-mono">{p.reference}</span>
                  </td>
                  <td className="py-3 px-4 capitalize text-ink-muted">{p.category}</td>
                  <td className="py-3 px-4 text-ink-muted">{p.location.short || `${p.location.city}, ${p.location.country}`}</td>
                  <td className="py-3 px-4 font-mono text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
                    {p.priceOnApplication ? "POA" : formatPrice(p.price, p.currency, "compact")}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider border border-hairline bg-obsidian-800 [.light_&]:bg-[#e0dbc9] text-ink">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-3 font-mono">
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/properties/${p.slug}`}
                      target="_blank"
                      className="text-ink-muted hover:text-ink"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
