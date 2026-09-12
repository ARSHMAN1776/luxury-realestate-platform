import Link from "next/link";
import { LayoutDashboard, Building2, PlusCircle, MessageSquare, ArrowLeft, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const metadata = {
  title: "Admin Dashboard | MERIDIAN & VOSS Property Management",
  description: "Bespoke Property House Management System",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ground text-ink flex flex-col font-sans transition-colors duration-300">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-obsidian-950/90 [.light_&]:bg-[#eeebe3]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted hover:text-brass-500 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            View Public Site
          </Link>
          <span className="h-4 w-px bg-hairline" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brass-500" />
            <span className="font-display text-lg tracking-wide text-ink font-light">
              MERIDIAN & VOSS <span className="text-xs text-brass-600 [.light_&]:text-brass-700 dark:text-brass-400 font-sans tracking-widest font-medium uppercase ml-1">PMS</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button in Admin Header */}
          <ThemeToggle />

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest bg-brass-500 text-obsidian-950 font-semibold hover:bg-brass-400 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Mandate
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-hairline bg-obsidian-900/60 [.light_&]:bg-[#eeebe3]/60 p-6 flex flex-col justify-between hidden md:flex transition-colors">
          <nav className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-4 font-medium">
              Management Console
            </p>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider uppercase text-ink-muted hover:text-brass-500 hover:bg-obsidian-800/40 [.light_&]:hover:bg-[#e2ded2] transition-all border-l-2 border-transparent hover:border-brass-500 font-medium"
            >
              <LayoutDashboard className="w-4 h-4 text-brass-500" />
              Dashboard Overview
            </Link>

            <Link
              href="/admin/properties"
              className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider uppercase text-ink-muted hover:text-brass-500 hover:bg-obsidian-800/40 [.light_&]:hover:bg-[#e2ded2] transition-all border-l-2 border-transparent hover:border-brass-500 font-medium"
            >
              <Building2 className="w-4 h-4 text-brass-500" />
              Property Mandates
            </Link>

            <Link
              href="/admin/properties/new"
              className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider uppercase text-ink-muted hover:text-brass-500 hover:bg-obsidian-800/40 [.light_&]:hover:bg-[#e2ded2] transition-all border-l-2 border-transparent hover:border-brass-500 font-medium"
            >
              <PlusCircle className="w-4 h-4 text-brass-500" />
              Add New Listing
            </Link>

            <Link
              href="/admin/enquiries"
              className="flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider uppercase text-ink-muted hover:text-brass-500 hover:bg-obsidian-800/40 [.light_&]:hover:bg-[#e2ded2] transition-all border-l-2 border-transparent hover:border-brass-500 font-medium"
            >
              <MessageSquare className="w-4 h-4 text-brass-500" />
              Client Enquiries
            </Link>
          </nav>

          <div className="pt-6 border-t border-hairline text-xs text-ink-muted">
            <p className="font-display text-sm text-ink mb-1 font-light">Status: Active</p>
            <p className="text-[11px] text-ink-muted">Connected to property database engine.</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 bg-ground overflow-y-auto transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
}
