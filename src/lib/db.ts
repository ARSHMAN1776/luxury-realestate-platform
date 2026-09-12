import fs from "fs";
import path from "path";
import { Property, Agent, JournalPost, PropertyFilters, PropertyCategoryId, PropertyStatus } from "@/types";
import { properties as initialProperties } from "@/data/properties";
import { agents as initialAgents } from "@/data/agents";
import { journalPosts as initialJournalPosts } from "@/data/journal";

export interface Enquiry {
  id: string;
  propertyId?: string;
  propertyName?: string;
  propertyReference?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "archived";
}

export interface DbSchema {
  properties: Property[];
  agents: Agent[];
  journalPosts: JournalPost[];
  enquiries: Enquiry[];
}

const STORE_PATH = path.join(process.cwd(), "src", "data", "store.json");

function ensureStoreExists(): DbSchema {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const content = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      return {
        properties: parsed.properties || initialProperties,
        agents: parsed.agents || initialAgents,
        journalPosts: parsed.journalPosts || initialJournalPosts,
        enquiries: parsed.enquiries || [],
      };
    }
  } catch (err) {
    console.error("Error reading store.json, falling back to initial data:", err);
  }

  const initialData: DbSchema = {
    properties: initialProperties,
    agents: initialAgents,
    journalPosts: initialJournalPosts,
    enquiries: [
      {
        id: "enq-101",
        propertyId: "p-001",
        propertyName: "Villa Serafina",
        propertyReference: "MV-4471-SD",
        name: "Lord Julian Vance",
        email: "vance@monaco-investments.mc",
        phone: "+377 98 98 00 11",
        message: "Requesting a private viewing for Villa Serafina during the second week of next month.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: "new",
      },
    ],
  };

  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing initial store.json:", err);
  }

  return initialData;
}

export function saveDb(data: DbSchema): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving store.json:", err);
  }
}

/* ─── Haversine Distance Calculation (Km) ─────────────────────────────────── */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/* ─── Property Operations ─────────────────────────────────────────────────── */

export function getAllProperties(): Property[] {
  const db = ensureStoreExists();
  return db.properties;
}

export function getPropertyById(id: string): Property | undefined {
  const properties = getAllProperties();
  return properties.find((p) => p.id === id);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  const properties = getAllProperties();
  return properties.find((p) => p.slug === slug);
}

export function getRelatedProperties(slug: string, limit = 3): Property[] {
  const current = getPropertyBySlug(slug);
  const all = getAllProperties().filter((p) => p.slug !== slug);
  if (!current) return all.slice(0, limit);
  const sameCategory = all.filter((p) => p.category === current.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  return [...sameCategory, ...all.filter((p) => p.category !== current.category)].slice(0, limit);
}

export function filterProperties(
  params: {
    query?: string;
    category?: string;
    country?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: string | number;
    status?: string;
    sort?: string;
    nearLat?: number;
    nearLng?: number;
    maxDistanceKm?: number;
  }
): (Property & { distanceKm?: number })[] {
  let list = getAllProperties();

  if (params.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.country.toLowerCase().includes(q) ||
        p.location.neighbourhood.toLowerCase().includes(q)
    );
  }

  if (params.category && params.category !== "all") {
    list = list.filter((p) => p.category === params.category);
  }

  if (params.country && params.country !== "all") {
    list = list.filter(
      (p) => p.location.country.toLowerCase() === params.country?.toLowerCase()
    );
  }

  if (params.city && params.city !== "all") {
    list = list.filter(
      (p) => p.location.city.toLowerCase() === params.city?.toLowerCase()
    );
  }

  if (params.status && params.status !== "all") {
    list = list.filter((p) => p.status === params.status);
  }

  if (params.minPrice !== undefined && !isNaN(params.minPrice) && params.minPrice > 0) {
    list = list.filter((p) => p.price >= (params.minPrice || 0));
  }

  if (params.maxPrice !== undefined && !isNaN(params.maxPrice) && params.maxPrice > 0) {
    list = list.filter((p) => p.price <= (params.maxPrice || Infinity));
  }

  if (params.bedrooms && params.bedrooms !== "any") {
    const beds = Number(params.bedrooms);
    if (!isNaN(beds)) {
      list = list.filter((p) => p.specs.bedrooms >= beds);
    }
  }

  // Geolocation Proximity
  let result: (Property & { distanceKm?: number })[] = list;
  if (params.nearLat !== undefined && params.nearLng !== undefined && !isNaN(params.nearLat) && !isNaN(params.nearLng)) {
    const lat = params.nearLat;
    const lng = params.nearLng;
    result = list.map((p) => {
      const dist = calculateHaversineDistance(
        lat,
        lng,
        p.location.coordinates.lat,
        p.location.coordinates.lng
      );
      return { ...p, distanceKm: Math.round(dist * 10) / 10 };
    });

    if (params.maxDistanceKm && params.maxDistanceKm > 0) {
      result = result.filter((p) => (p.distanceKm || 0) <= (params.maxDistanceKm || Infinity));
    }

    // Sort by proximity if geo-search requested and no explicit sort specified
    if (!params.sort || params.sort === "near") {
      result.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
      return result;
    }
  }

  // Standard Sorting
  if (params.sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (params.sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (params.sort === "newest") {
    result.sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime());
  } else if (params.sort === "size-desc") {
    result.sort((a, b) => b.specs.interiorSqm - a.specs.interiorSqm);
  }

  return result;
}

export function createProperty(data: Omit<Property, "id" | "listedAt"> & { id?: string; listedAt?: string }): Property {
  const db = ensureStoreExists();
  const id = data.id || `p-${Date.now().toString(36)}`;
  const listedAt = data.listedAt || new Date().toISOString();
  
  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  
  const newProperty: Property = {
    ...data,
    id,
    slug,
    listedAt,
  };

  db.properties.unshift(newProperty);
  saveDb(db);
  return newProperty;
}

export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  const db = ensureStoreExists();
  const index = db.properties.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = db.properties[index];
  const updated: Property = {
    ...existing,
    ...updates,
    id: existing.id, // prevent ID change
  };

  db.properties[index] = updated;
  saveDb(db);
  return updated;
}

export function deleteProperty(id: string): boolean {
  const db = ensureStoreExists();
  const initialLen = db.properties.length;
  db.properties = db.properties.filter((p) => p.id !== id);
  if (db.properties.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

/* ─── Enquiry Operations ─────────────────────────────────────────────────── */

export function getAllEnquiries(): Enquiry[] {
  const db = ensureStoreExists();
  return db.enquiries || [];
}

export function createEnquiry(data: Omit<Enquiry, "id" | "createdAt" | "status">): Enquiry {
  const db = ensureStoreExists();
  const newEnquiry: Enquiry = {
    ...data,
    id: `enq-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  if (!db.enquiries) db.enquiries = [];
  db.enquiries.unshift(newEnquiry);
  saveDb(db);
  return newEnquiry;
}

export function deleteEnquiry(id: string): boolean {
  const db = ensureStoreExists();
  if (!db.enquiries) return false;
  const initialLen = db.enquiries.length;
  db.enquiries = db.enquiries.filter((e) => e.id !== id);
  if (db.enquiries.length !== initialLen) {
    saveDb(db);
    return true;
  }
  return false;
}

export function updateEnquiryStatus(id: string, status: Enquiry["status"]): boolean {
  const db = ensureStoreExists();
  if (!db.enquiries) return false;
  const enquiry = db.enquiries.find((e) => e.id === id);
  if (enquiry) {
    enquiry.status = status;
    saveDb(db);
    return true;
  }
  return false;
}
