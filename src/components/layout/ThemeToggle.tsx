"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-full border border-hairline bg-obsidian-900/60 text-brass-400 hover:border-brass-400 hover:bg-brass-400/10 transition-all ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Ivory Light" : "Obsidian Dark"} mode`}
      title={`Switch to ${theme === "dark" ? "Ivory Light" : "Obsidian Dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-brass-400 transition-transform duration-500 hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-brass-500 transition-transform duration-500 hover:-rotate-12" />
      )}
    </button>
  );
}
