import { IMG } from "@/lib/images";
import type { Agent } from "@/types";

/**
 * THE PARTNERS
 * Six principals. Written as a house would introduce its own people —
 * by what they have actually done, not by adjectives.
 */
export const agents: Agent[] = [
  {
    id: "a-001",
    slug: "eloise-marchetti",
    name: "Éloise Marchetti",
    role: "Senior Partner — Mediterranean",
    base: "Milan",
    languages: ["Italian", "English", "French", "Spanish"],
    specialisms: ["Coastal estates", "Restoration mandates", "Balearic & Sardinian"],
    tenure: 17,
    bio: "Éloise came to the house from a conservation practice in Florence, which is why she reads a building before she reads its brochure. She has handled the Costa Smeralda book since 2014 and has a standing rule about never bringing a client to a property she has not slept in.",
    portrait: {
      src: IMG.portraitB,
      alt: "Éloise Marchetti, Senior Partner — Mediterranean",
    },
    email: "e.marchetti@meridian-voss.com",
    phone: "+39 02 8734 9910",
    transactedUsd: 1_840_000_000,
  },
  {
    id: "a-002",
    slug: "julian-reyes",
    name: "Julian Reyes",
    role: "Partner — Americas",
    base: "New York",
    languages: ["English", "Spanish", "Portuguese"],
    specialisms: ["Loft & conversion", "Art-led acquisitions", "Downtown Manhattan"],
    tenure: 12,
    bio: "Julian spent nine years placing collections before he placed a single apartment, and the two disciplines have more in common than either field admits. He is the person to speak to if the walls matter as much as the view.",
    portrait: {
      src: IMG.portraitA,
      alt: "Julian Reyes, Partner — Americas",
    },
    email: "j.reyes@meridian-voss.com",
    phone: "+1 212 555 0184",
    transactedUsd: 1_210_000_000,
  },
  {
    id: "a-003",
    slug: "anneke-de-vries",
    name: "Anneke de Vries",
    role: "Managing Partner",
    base: "Geneva",
    languages: ["Dutch", "English", "German", "French"],
    specialisms: ["Private mandates", "Succession & structure", "Off-market"],
    tenure: 23,
    bio: "Anneke has run the house since 2019 and the Geneva desk for eleven years before that. Roughly two-thirds of what she transacts is never advertised, which is a statistic she regards as the entire point rather than an inconvenience.",
    portrait: {
      src: IMG.portraitD,
      alt: "Anneke de Vries, Managing Partner",
    },
    email: "a.devries@meridian-voss.com",
    phone: "+41 22 555 0119",
    transactedUsd: 3_960_000_000,
  },
  {
    id: "a-004",
    slug: "rashid-al-mansouri",
    name: "Rashid Al-Mansouri",
    role: "Partner — Middle East & Asia",
    base: "Dubai",
    languages: ["Arabic", "English", "Hindi"],
    specialisms: ["Tower residences", "Development stock", "Gulf & South-East Asia"],
    tenure: 9,
    bio: "Rashid underwrote development finance for six years before moving to the acquisition side, and he still builds the model before he shows the floorplate. Clients who arrive with a spreadsheet tend to stay with him.",
    portrait: {
      src: IMG.portraitC,
      alt: "Rashid Al-Mansouri, Partner — Middle East & Asia",
    },
    email: "r.almansouri@meridian-voss.com",
    phone: "+971 4 555 0172",
    transactedUsd: 2_470_000_000,
  },
  {
    id: "a-005",
    slug: "clara-whitmore",
    name: "Clara Whitmore",
    role: "Partner — United Kingdom & Alpine",
    base: "London",
    languages: ["English", "French", "German"],
    specialisms: ["Listed & heritage", "Prime central London", "Alpine"],
    tenure: 14,
    bio: "Clara handles the listed book, which means she spends as much time with planning officers as with buyers. She has taken four Grade II consents through to completion without losing an original cornice, and mentions this only when asked.",
    portrait: {
      src: IMG.portraitF,
      alt: "Clara Whitmore, Partner — United Kingdom & Alpine",
    },
    email: "c.whitmore@meridian-voss.com",
    phone: "+44 20 7555 0143",
    transactedUsd: 1_650_000_000,
  },
  {
    id: "a-006",
    slug: "tobias-lindqvist",
    name: "Tobias Lindqvist",
    role: "Partner — Commercial & Land",
    base: "Singapore",
    languages: ["Swedish", "English", "Mandarin"],
    specialisms: ["Grade-A commercial", "Agricultural estates", "Yield structuring"],
    tenure: 11,
    bio: "Tobias covers the part of the book that produces income rather than pleasure — towers, farmland, and the occasional working vineyard. He is the only partner who routinely advises clients not to buy.",
    portrait: {
      src: IMG.portraitE,
      alt: "Tobias Lindqvist, Partner — Commercial & Land",
    },
    email: "t.lindqvist@meridian-voss.com",
    phone: "+65 6555 0128",
    transactedUsd: 2_090_000_000,
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}
