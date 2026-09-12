"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Enquiry } from "@/lib/db";
import { MessageSquare, Mail, Phone, Calendar, Trash2, CheckCircle, RefreshCw, Building2 } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const json = await res.json();
      if (json.success) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleStatus(id: string, currentStatus: Enquiry["status"]) {
    const nextStatus = currentStatus === "new" ? "contacted" : "new";
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: nextStatus } : e))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <span className="eyebrow text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400">
            Client Inquiry Register
          </span>
          <h1 className="font-display text-3xl font-light text-ink mt-1">
            Lead Enquiries ({enquiries.length})
          </h1>
        </div>

        <button
          onClick={fetchEnquiries}
          className="p-3 border border-hairline text-ink-muted hover:text-brass-500 transition-colors self-start"
          title="Refresh Enquiries"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-ink-muted text-xs uppercase tracking-widest">
          Loading client enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <div className="p-12 text-center text-ink-muted text-xs border border-hairline bg-obsidian-900/40 [.light_&]:bg-[#eae6db]">
          No client enquiries captured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enquiries.map((e) => (
            <div
              key={e.id}
              className={`p-6 border transition-all bg-obsidian-900/50 [.light_&]:bg-[#eae6db] space-y-4 ${
                e.status === "new" ? "border-brass-500/40" : "border-hairline"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider border font-medium ${
                      e.status === "new"
                        ? "bg-brass-500/15 text-brass-600 [.light_&]:text-brass-700 border-brass-500/30"
                        : "bg-obsidian-800 [.light_&]:bg-[#e0dbc9] text-ink-muted border-hairline"
                    }`}
                  >
                    {e.status}
                  </span>
                  <h3 className="font-display text-lg text-ink font-light">{e.name}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-ink-muted font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(e.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Property Details if attached */}
              {e.propertyName && (
                <div className="flex items-center gap-2 text-xs text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 font-mono">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Mandate: {e.propertyName}</span>
                  {e.propertyReference && <span className="text-ink-muted">({e.propertyReference})</span>}
                </div>
              )}

              <p className="text-xs text-ink leading-relaxed bg-obsidian-950/80 [.light_&]:bg-[#f7f5f0] p-4 border border-hairline font-sans">
                &ldquo;{e.message}&rdquo;
              </p>

              {/* Contact bar & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-muted">
                  <a
                    href={`mailto:${e.email}`}
                    className="flex items-center gap-1.5 hover:text-brass-500 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-brass-500" />
                    {e.email}
                  </a>

                  {e.phone && (
                    <a
                      href={`tel:${e.phone}`}
                      className="flex items-center gap-1.5 hover:text-brass-500 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brass-500" />
                      {e.phone}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(e.id, e.status)}
                    className="text-xs uppercase tracking-wider px-3 py-1.5 border border-hairline text-ink hover:border-brass-400 hover:text-brass-500 transition-colors"
                  >
                    Mark as {e.status === "new" ? "Contacted" : "New"}
                  </button>

                  <button
                    onClick={() => handleDelete(e.id)}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
