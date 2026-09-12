"use client";

import * as React from "react";

const KEY = "mv-saved-properties";

interface SavedContextValue {
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
  /** False until localStorage has been read, so SSR and first paint agree. */
  ready: boolean;
}

const SavedContext = React.createContext<SavedContextValue | null>(null);

/**
 * The client's private collection.
 *
 * Persisted to localStorage only — no account, no server round-trip. `ready`
 * exists because the server cannot know what is saved: every consumer renders
 * the unsaved state until hydration completes, which avoids a mismatch.
 */
export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSaved(parsed.filter((v): v is string => typeof v === "string"));
        }
      }
    } catch {
      /* Private browsing, quota, or corrupt payload — start empty. */
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {
      /* Storage unavailable — the collection is simply session-scoped. */
    }
  }, [saved, ready]);

  /* Keep tabs in step. */
  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY || e.newValue === null) return;
      try {
        const parsed: unknown = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          setSaved(parsed.filter((v): v is string => typeof v === "string"));
        }
      } catch {
        /* ignore */
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = React.useMemo<SavedContextValue>(
    () => ({
      saved,
      ready,
      isSaved: (slug) => saved.includes(slug),
      toggle: (slug) =>
        setSaved((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev]
        ),
      clear: () => setSaved([]),
    }),
    [saved, ready]
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved(): SavedContextValue {
  const ctx = React.useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSaved must be used within <SavedProvider>");
  }
  return ctx;
}
