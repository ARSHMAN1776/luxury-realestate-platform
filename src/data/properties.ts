import { IMG } from "@/lib/images";
import type { Property } from "@/types";

/**
 * THE BOOK
 * ────────────────────────────────────────────────────────────────────────────
 * Twelve mandates. Written as a private property house would write them —
 * specific, restrained, and never in the language of a marketplace. Copy here
 * carries the brand voice as much as any visual decision does.
 */
export const properties: Property[] = [
  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-001",
    slug: "villa-serafina",
    reference: "MV-4471-SD",
    name: "Villa Serafina",
    tagline: "A cliffside house that treats the Tyrrhenian as its fourth wall",
    category: "villas",
    status: "available",
    price: 24_500_000,
    currency: "EUR",
    priceOnApplication: false,
    location: {
      neighbourhood: "Romazzino",
      city: "Porto Cervo",
      region: "Sardinia",
      country: "Italy",
      countryCode: "IT",
      coordinates: { lat: 41.1268, lng: 9.5361 },
      short: "Costa Smeralda, Sardinia",
    },
    specs: {
      bedrooms: 7,
      bathrooms: 9,
      interiorSqm: 1_180,
      plotSqm: 8_400,
      parking: 6,
      yearBuilt: 1987,
      renovated: 2022,
      levels: 3,
      orientation: "South-west, sunset-facing",
      tenure: "freehold",
    },
    highlights: [
      "Ninety metres of private granite shoreline",
      "Restored by Studio Peregrini over three seasons",
      "Deep-water mooring for a 34-metre vessel",
      "Terraced gardens by landscape architect Elena Marchetti",
    ],
    narrative: [
      "Villa Serafina was cut into the Romazzino cliff in 1987 by an owner who wanted the sea to do the decorating. Thirty-five years later, that instinct survives every renovation the house has been through — including the most recent, a three-season restoration that stripped the interiors back to their granite bones and started again.",
      "The plan is deceptively simple. Three levels step down the rock, each one turning slightly to hold a different part of the bay. Living spaces occupy the middle terrace, opening entirely to the west so that the last two hours of light move through the house rather than past it. Bedrooms sit below, cooler and quieter, each with its own external stair to the water.",
      "What cannot be photographed is the sound. The cliff geometry funnels the Tyrrhenian into the lower terrace at a volume that makes the property feel considerably more remote than its eleven-minute drive from Porto Cervo would suggest.",
    ],
    amenities: [
      "Infinity pool, heated, 22m",
      "Private granite beach",
      "Deep-water mooring",
      "Staff quarters, two-bedroom",
      "Wine cellar, 2,400 bottles",
      "Outdoor kitchen and pergola dining",
      "Gymnasium and hammam",
      "Helipad clearance, permitted",
    ],
    hero: {
      src: IMG.exteriorPoolVilla,
      alt: "Villa Serafina at golden hour, infinity pool overlooking the Tyrrhenian Sea",
    },
    gallery: [
      {
        src: IMG.poolInfinity,
        alt: "The 22-metre infinity pool on the middle terrace",
        caption: "Middle terrace — the pool edge is set 400mm below eye level when seated",
      },
      {
        src: IMG.interiorLiving,
        alt: "Principal living room opening entirely to the west",
        caption: "Principal salon, west aspect",
      },
      {
        src: IMG.interiorBedroom,
        alt: "Principal bedroom suite with sea view",
        caption: "Principal suite, lower terrace",
      },
      {
        src: IMG.oceanCliff,
        alt: "The granite shoreline below the property",
        caption: "Ninety metres of private shoreline",
      },
      {
        src: IMG.interiorDining,
        alt: "Dining room with pergola beyond",
        caption: "Dining room, opening to the pergola",
      },
      {
        src: IMG.exteriorGolden,
        alt: "The house from the water at dusk",
        caption: "From the mooring, looking east",
      },
    ],
    featured: true,
    exclusive: true,
    discreet: false,
    agentId: "a-001",
    investment: {
      grossYield: 4.2,
      appreciation5yr: 31,
      rentalIncomePa: 1_040_000,
      runningCostPa: 285_000,
      occupancyRate: 68,
      notes:
        "Costa Smeralda peak-season rates have compounded at 9% annually since 2019. The mooring materially widens the charter-client pool.",
    },
    listedAt: "2026-05-14",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-002",
    slug: "the-mercer-penthouse",
    reference: "MV-2209-NY",
    name: "The Mercer Penthouse",
    tagline: "Two floors above SoHo, with the ceiling height of a gallery",
    category: "penthouses",
    status: "available",
    price: 38_750_000,
    currency: "USD",
    priceOnApplication: false,
    location: {
      neighbourhood: "SoHo",
      city: "New York",
      region: "New York",
      country: "United States",
      countryCode: "US",
      coordinates: { lat: 40.7233, lng: -74.0021 },
      short: "SoHo, New York",
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      interiorSqm: 720,
      plotSqm: null,
      parking: 2,
      yearBuilt: 1904,
      renovated: 2023,
      levels: 2,
      orientation: "North-south through-floor",
      tenure: "share-transfer",
    },
    highlights: [
      "4.4-metre ceilings across the principal floor",
      "Original cast-iron structure, exposed and restored",
      "310sqm of private planted terrace",
      "Two deeded parking spaces — rare below Houston",
    ],
    narrative: [
      "A cast-iron warehouse from 1904, converted once in the 1970s and properly reconsidered in 2023. The current owner brought in a conservation architect before an interior designer, which is the correct order of operations for a building like this and is visible in every decision that followed.",
      "The principal floor is a single 340sqm volume interrupted only by the original columns. At 4.4 metres, the ceiling is tall enough that the space reads as institutional rather than residential — the owner hangs large-format work here, and the proportions absorb it. Bedrooms are upstairs, deliberately smaller, deliberately quieter.",
      "The terrace is the anomaly. Three hundred and ten square metres, mature planting, and an outlook that will not change: the surrounding roofline is landmarked in every direction that matters.",
    ],
    amenities: [
      "Private keyed lift, two floors",
      "310sqm planted terrace",
      "Chef's kitchen, Molteni suite",
      "Climate-controlled art store",
      "Two deeded parking spaces",
      "Staff suite with separate entry",
      "Screening room",
      "Full-building generator",
    ],
    hero: {
      src: IMG.interiorGallery,
      alt: "The Mercer Penthouse principal floor with 4.4-metre ceilings",
    },
    gallery: [
      {
        src: IMG.interiorMinimal,
        alt: "Principal volume with original cast-iron columns",
        caption: "Principal floor — original 1904 columns, restored",
      },
      {
        src: IMG.interiorLounge,
        alt: "Seating area beneath the north windows",
        caption: "North aspect seating",
      },
      {
        src: IMG.exteriorTerrace,
        alt: "The private planted terrace",
        caption: "310sqm terrace, mature planting",
      },
      {
        src: IMG.interiorKitchen,
        alt: "Molteni kitchen suite",
        caption: "Kitchen — Molteni, specified 2023",
      },
      {
        src: IMG.interiorStair,
        alt: "Internal stair between the two floors",
        caption: "Connecting stair, blackened steel",
      },
      {
        src: IMG.interiorBath,
        alt: "Principal bathroom in honed marble",
        caption: "Principal bathroom",
      },
    ],
    featured: true,
    exclusive: true,
    discreet: false,
    agentId: "a-002",
    investment: {
      grossYield: 3.1,
      appreciation5yr: 22,
      rentalIncomePa: 1_200_000,
      runningCostPa: 410_000,
      occupancyRate: 92,
      notes:
        "Downtown lofts of this ceiling height number in the dozens. Scarcity, not yield, is the argument here.",
    },
    listedAt: "2026-06-02",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-003",
    slug: "maison-du-lac",
    reference: "MV-8814-CH",
    name: "Maison du Lac",
    tagline: "A Geneva lakehouse with the discretion the address implies",
    category: "estates",
    status: "under-offer",
    price: 62_000_000,
    currency: "CHF",
    priceOnApplication: false,
    location: {
      neighbourhood: "Cologny",
      city: "Geneva",
      region: "Geneva",
      country: "Switzerland",
      countryCode: "CH",
      coordinates: { lat: 46.2224, lng: 6.1878 },
      short: "Cologny, Geneva",
    },
    specs: {
      bedrooms: 9,
      bathrooms: 11,
      interiorSqm: 1_640,
      plotSqm: 14_200,
      parking: 8,
      yearBuilt: 1912,
      renovated: 2019,
      levels: 4,
      orientation: "West, lake and Jura",
      tenure: "freehold",
    },
    highlights: [
      "One hundred and forty metres of Lake Geneva frontage",
      "Original 1912 Belle Époque structure, fully modernised",
      "Fourteen thousand square metres of mature parkland",
      "Twelve minutes from Geneva International",
    ],
    narrative: [
      "Cologny holds perhaps forty properties of genuine consequence, and they rarely reach open market. Maison du Lac has been in the same family since 1948; the current sale follows a generational transfer rather than a change of heart.",
      "The house is Belle Époque and unapologetic about it — a 1912 structure with the ceiling heights, enfilade planning, and window proportions of its period, brought to contemporary standards in a 2019 programme that touched every service but almost no original detail. The plaster, the parquet, and the principal stair are as built.",
      "The park is the reason the property commands what it does. Fourteen thousand square metres of mature planting running down to a hundred and forty metres of private lake frontage, with a boathouse and a jetty that predate the current zoning and could not be built today.",
    ],
    amenities: [
      "140m private lake frontage",
      "Boathouse and jetty, grandfathered",
      "Indoor pool and spa",
      "Orangery, restored",
      "Wine cellar, 6,000 bottles",
      "Staff cottage, three-bedroom",
      "Tennis court, north lawn",
      "Full home automation, Crestron",
    ],
    hero: {
      src: IMG.exteriorClassic,
      alt: "Maison du Lac, Belle Époque facade above Lake Geneva",
    },
    gallery: [
      {
        src: IMG.interiorSalon,
        alt: "Principal salon with original plasterwork",
        caption: "Principal salon — original 1912 plaster",
      },
      {
        src: IMG.exteriorCountry,
        alt: "The house within its parkland",
        caption: "West elevation from the lower park",
      },
      {
        src: IMG.interiorWarm,
        alt: "Library with lake outlook",
        caption: "Library, west aspect",
      },
      {
        src: IMG.oceanCalm,
        alt: "Lake Geneva from the private jetty",
        caption: "From the jetty, looking toward the Jura",
      },
      {
        src: IMG.interiorDining,
        alt: "Formal dining room",
        caption: "Formal dining, seating eighteen",
      },
      {
        src: IMG.exteriorFacade,
        alt: "Detail of the restored facade",
        caption: "Facade detail, restored 2019",
      },
    ],
    featured: true,
    exclusive: false,
    discreet: true,
    agentId: "a-003",
    investment: {
      grossYield: 2.4,
      appreciation5yr: 18,
      rentalIncomePa: 1_490_000,
      runningCostPa: 620_000,
      occupancyRate: 45,
      notes:
        "Cologny lakefront is a capital-preservation instrument. Yield is incidental; the grandfathered jetty is not replicable.",
    },
    listedAt: "2026-03-21",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-004",
    slug: "the-obsidian-residence",
    reference: "MV-1092-AE",
    name: "The Obsidian Residence",
    tagline: "The seventy-eighth floor, held as a single dwelling",
    category: "penthouses",
    status: "available",
    price: 0,
    currency: "AED",
    priceOnApplication: true,
    location: {
      neighbourhood: "Downtown",
      city: "Dubai",
      region: "Dubai",
      country: "United Arab Emirates",
      countryCode: "AE",
      coordinates: { lat: 25.1972, lng: 55.2744 },
      short: "Downtown, Dubai",
    },
    specs: {
      bedrooms: 6,
      bathrooms: 8,
      interiorSqm: 1_420,
      plotSqm: null,
      parking: 6,
      yearBuilt: 2021,
      levels: 2,
      orientation: "360°, full-floor",
      tenure: "freehold",
    },
    highlights: [
      "An entire floor plate, 360-degree glazing",
      "Private pool cantilevered at 312 metres",
      "Interiors by Vincent Aubert, Paris",
      "Two dedicated staff apartments on the floor below",
    ],
    narrative: [
      "Developers rarely release a full plate at this height; when they do, it is usually broken into four. This one was bought unbuilt, in shell, by a client who instructed Vincent Aubert to plan it as a house rather than an apartment — and then sold before taking occupation.",
      "The result is a two-level residence with a genuine circulation logic. Reception, dining, and the cantilevered pool occupy the upper level and run the full 360 degrees. Bedrooms are below, arranged along the eastern glazing to take the Gulf sunrise, with the western half given over to a gallery corridor that Aubert lit for artwork rather than for architecture.",
      "The pool is the detail everyone photographs — twenty-one metres, cantilevered clear of the structure at three hundred and twelve metres. It is also, quietly, the most heavily engineered element in the building.",
    ],
    amenities: [
      "Cantilevered pool, 21m, heated",
      "Two staff apartments, floor below",
      "Private lift lobby, biometric",
      "Cinema, twelve seats",
      "Cigar room with independent extraction",
      "Six parking bays plus wash bay",
      "Gymnasium and treatment room",
      "Full-height wine display, 1,800 bottles",
    ],
    hero: {
      src: IMG.cityDubaiDusk,
      alt: "The Obsidian Residence — Dubai Downtown skyline at dusk",
    },
    gallery: [
      {
        src: IMG.cityDubaiNight,
        alt: "The outlook at night from the upper level",
        caption: "Upper level, north aspect at night",
      },
      {
        src: IMG.interiorLight,
        alt: "Reception with 360-degree glazing",
        caption: "Reception — full-plate glazing",
      },
      {
        src: IMG.poolResort,
        alt: "The cantilevered pool at 312 metres",
        caption: "Cantilevered pool, 312m",
      },
      {
        src: IMG.interiorSeating,
        alt: "Gallery corridor, lit for artwork",
        caption: "Gallery corridor, western half",
      },
      {
        src: IMG.cityDubaiAerial,
        alt: "Aerial view of the Downtown district",
        caption: "The district, looking south-west",
      },
      {
        src: IMG.interiorBath,
        alt: "Principal bathroom in book-matched stone",
        caption: "Principal bathroom, book-matched Calacatta",
      },
    ],
    featured: true,
    exclusive: true,
    discreet: true,
    agentId: "a-004",
    investment: {
      grossYield: 5.8,
      appreciation5yr: 42,
      rentalIncomePa: 3_100_000,
      runningCostPa: 540_000,
      occupancyRate: 84,
      notes:
        "Dubai prime has absorbed significant capital since 2022 without a corresponding supply response at full-plate scale. No personal income tax on rental receipts.",
    },
    listedAt: "2026-07-08",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-005",
    slug: "casa-del-viento",
    reference: "MV-6633-ES",
    name: "Casa del Viento",
    tagline: "Concrete, water, and a Balearic headland that ends in nothing",
    category: "villas",
    status: "available",
    price: 18_900_000,
    currency: "EUR",
    priceOnApplication: false,
    location: {
      neighbourhood: "Cap Martinet",
      city: "Ibiza",
      region: "Balearic Islands",
      country: "Spain",
      countryCode: "ES",
      coordinates: { lat: 38.9421, lng: 1.4831 },
      short: "Cap Martinet, Ibiza",
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      interiorSqm: 890,
      plotSqm: 5_600,
      parking: 4,
      yearBuilt: 2019,
      levels: 2,
      orientation: "West, open sea",
      tenure: "freehold",
    },
    highlights: [
      "Board-marked concrete by Ferrer Arquitectos",
      "Uninterrupted westerly aspect to Es Vedrà",
      "Twenty-eight-metre lap pool on the upper deck",
      "Solar and greywater systems — near net-zero in season",
    ],
    narrative: [
      "Ferrer Arquitectos spent eighteen months on the planning application and four years on the build, which tells you something about both the site and the standard. Casa del Viento sits on a Cap Martinet headland with nothing to its west but water and, on a clear evening, the silhouette of Es Vedrà.",
      "The material palette is three items long: board-marked concrete, untreated iroko, and glass. Nothing has been added since completion because nothing needs to be. The concrete was poured in situ against timber shuttering and carries the grain of it, which is the sort of decision that costs a great deal and reads as almost nothing.",
      "In season the house runs close to net-zero. Roof-integrated photovoltaics, a greywater loop feeding the planting, and a thermal mass strategy that means the interiors hold temperature without mechanical assistance until roughly the second week of July.",
    ],
    amenities: [
      "Lap pool, 28m, upper deck",
      "Roof-integrated photovoltaics",
      "Greywater recovery to planting",
      "Outdoor kitchen, iroko and steel",
      "Guest pavilion, two-bedroom",
      "Sunken fire terrace",
      "Gymnasium, glazed to the west",
      "EV charging, four bays",
    ],
    hero: {
      src: IMG.exteriorGlassHouse,
      alt: "Casa del Viento — board-marked concrete villa above the Balearic sea",
    },
    gallery: [
      {
        src: IMG.poolVilla,
        alt: "The 28-metre lap pool on the upper deck",
        caption: "Upper deck, 28m lap pool",
      },
      {
        src: IMG.interiorMinimal,
        alt: "Living volume in concrete and iroko",
        caption: "Living volume — in-situ concrete, iroko",
      },
      {
        src: IMG.oceanHorizon,
        alt: "The westerly aspect toward Es Vedrà",
        caption: "West aspect, Es Vedrà beyond",
      },
      {
        src: IMG.archConcrete,
        alt: "Board-marked concrete detail",
        caption: "Board-marked concrete, timber shuttering grain",
      },
      {
        src: IMG.interiorBedroom,
        alt: "Principal bedroom opening to the deck",
        caption: "Principal bedroom, west",
      },
      {
        src: IMG.beachPalm,
        alt: "The coastline below the headland",
        caption: "The cove, five minutes on foot",
      },
    ],
    featured: false,
    exclusive: true,
    discreet: false,
    agentId: "a-001",
    investment: {
      grossYield: 5.1,
      appreciation5yr: 28,
      rentalIncomePa: 964_000,
      runningCostPa: 178_000,
      occupancyRate: 71,
      notes:
        "Balearic licensing restricts new tourist rental permits; this property holds one. That permit is a material part of the value.",
    },
    listedAt: "2026-04-30",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-006",
    slug: "eaton-square-townhouse",
    reference: "MV-3378-UK",
    name: "Eaton Square Townhouse",
    tagline: "Six storeys of Belgravia, white stucco and entirely intact",
    category: "residences",
    status: "available",
    price: 41_500_000,
    currency: "GBP",
    priceOnApplication: false,
    location: {
      neighbourhood: "Belgravia",
      city: "London",
      region: "England",
      country: "United Kingdom",
      countryCode: "GB",
      coordinates: { lat: 51.4954, lng: -0.1536 },
      short: "Eaton Square, London",
    },
    specs: {
      bedrooms: 7,
      bathrooms: 8,
      interiorSqm: 1_050,
      plotSqm: 420,
      parking: 2,
      yearBuilt: 1828,
      renovated: 2021,
      levels: 6,
      orientation: "East, garden square",
      tenure: "freehold",
    },
    highlights: [
      "Grade II listed, Thomas Cubitt terrace",
      "Freehold — uncommon on the square",
      "Direct keyholder access to the private gardens",
      "Lower-ground pool and spa, excavated 2021",
    ],
    narrative: [
      "Thomas Cubitt laid out Eaton Square in 1828, and the houses on its north side have changed hands perhaps three times each since. This is a freehold, which on this square is scarce enough to be the headline before anything else is discussed.",
      "The 2021 programme was largely invisible: full re-servicing, a discreet lift through all six storeys, and a lower-ground excavation for the pool and spa. Above ground, the listed fabric was left alone — the cornices, the shutters, the stair, and the first-floor drawing room proportions are all as Cubitt drew them.",
      "Keyholder access to the private gardens transfers with the freehold. In practice this is the amenity that residents of the square value most and the one that visitors notice least.",
    ],
    amenities: [
      "Lift, all six storeys",
      "Lower-ground pool and spa",
      "Private garden square access",
      "Two off-street parking spaces",
      "Staff flat, self-contained",
      "Wine room, 3,200 bottles",
      "Media room, lower ground",
      "Roof terrace, south-facing",
    ],
    hero: {
      src: IMG.exteriorWhiteVilla,
      alt: "Eaton Square Townhouse — white stucco Belgravia facade",
    },
    gallery: [
      {
        src: IMG.interiorSalon,
        alt: "First-floor drawing room with original cornices",
        caption: "First-floor drawing room — original cornice",
      },
      {
        src: IMG.interiorStair,
        alt: "The principal stair through six storeys",
        caption: "Principal stair, as built 1828",
      },
      {
        src: IMG.interiorKitchen,
        alt: "Garden-level kitchen and breakfast room",
        caption: "Garden level — kitchen and breakfast room",
      },
      {
        src: IMG.interiorBath,
        alt: "Principal bathroom",
        caption: "Principal bathroom, second floor",
      },
      {
        src: IMG.interiorWarm,
        alt: "Library on the second floor",
        caption: "Library, second floor",
      },
      {
        src: IMG.exteriorCourtyard,
        alt: "The private garden square",
        caption: "The square gardens — keyholder access",
      },
    ],
    featured: true,
    exclusive: false,
    discreet: false,
    agentId: "a-005",
    investment: {
      grossYield: 2.8,
      appreciation5yr: 16,
      rentalIncomePa: 1_162_000,
      runningCostPa: 340_000,
      occupancyRate: 88,
      notes:
        "Belgravia freeholds trade on scarcity rather than income. Twelve-year price history shows materially lower drawdown than the wider prime central London index.",
    },
    listedAt: "2026-02-11",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-007",
    slug: "the-atrium-tower",
    reference: "MV-7741-SG",
    name: "The Atrium Tower",
    tagline: "A Grade-A freehold with a covenant most landlords cannot offer",
    category: "commercial",
    status: "available",
    price: 148_000_000,
    currency: "SGD",
    priceOnApplication: false,
    location: {
      neighbourhood: "Raffles Place",
      city: "Singapore",
      region: "Central Region",
      country: "Singapore",
      countryCode: "SG",
      coordinates: { lat: 1.2839, lng: 103.8515 },
      short: "Raffles Place, Singapore",
    },
    specs: {
      bedrooms: 0,
      bathrooms: 24,
      interiorSqm: 18_400,
      plotSqm: 2_100,
      parking: 96,
      yearBuilt: 2016,
      levels: 32,
      orientation: "Dual aspect, harbour and city",
      tenure: "freehold",
    },
    highlights: [
      "Thirty-two storeys, 18,400sqm net lettable",
      "Green Mark Platinum, recertified 2024",
      "Weighted average lease expiry of 6.2 years",
      "Anchor tenant on a fifteen-year term",
    ],
    narrative: [
      "Freehold commercial stock in Raffles Place is effectively fixed in supply; almost everything transacted in the last decade has been leasehold with a diminishing tail. The Atrium Tower is freehold, which changes the underwriting fundamentally.",
      "Completed in 2016 to Green Mark Platinum and recertified in 2024, the building runs at an operating cost roughly nineteen per cent below the district median — a function of the facade specification and a chilled-water system that was over-engineered at the outset.",
      "The rent roll is the asset. A weighted average lease expiry of 6.2 years, an anchor tenant fifteen years into a term with two options remaining, and no single tenant representing more than twenty-two per cent of income.",
    ],
    amenities: [
      "18,400sqm net lettable",
      "Green Mark Platinum",
      "96 parking bays, 24 with EV",
      "End-of-trip facilities, 180 lockers",
      "Ground-floor retail, four units",
      "N+1 chiller redundancy",
      "Destination-dispatch lift core",
      "Sky terrace, level 31",
    ],
    hero: {
      src: IMG.officeAtrium,
      alt: "The Atrium Tower — Grade-A commercial atrium in Raffles Place",
    },
    gallery: [
      {
        src: IMG.archTower,
        alt: "The tower from street level",
        caption: "Thirty-two storeys, dual aspect",
      },
      {
        src: IMG.officeFloor,
        alt: "Typical office floor plate",
        caption: "Typical floor — 575sqm, column-free",
      },
      {
        src: IMG.officeLounge,
        alt: "Tenant lounge on the sky terrace level",
        caption: "Sky terrace lounge, level 31",
      },
      {
        src: IMG.archLines,
        alt: "Facade detail",
        caption: "Facade — high-performance double-skin",
      },
      {
        src: IMG.archMonolith,
        alt: "The building within the Raffles Place skyline",
        caption: "Within the Raffles Place core",
      },
      {
        src: IMG.archGeometry,
        alt: "Structural detail of the atrium",
        caption: "Atrium structure",
      },
    ],
    featured: false,
    exclusive: true,
    discreet: false,
    agentId: "a-006",
    investment: {
      grossYield: 4.6,
      appreciation5yr: 24,
      rentalIncomePa: 6_808_000,
      runningCostPa: 1_290_000,
      occupancyRate: 96,
      notes:
        "Freehold Grade-A in the Raffles Place core is a closed set. Operating costs run ~19% below district median on the current certification.",
    },
    listedAt: "2026-01-19",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-008",
    slug: "isla-verena",
    reference: "MV-9902-BS",
    name: "Isla Verena",
    tagline: "Forty hectares, one house, and no neighbours by construction",
    category: "islands",
    status: "available",
    price: 0,
    currency: "USD",
    priceOnApplication: true,
    location: {
      neighbourhood: "Exuma Cays",
      city: "Exuma",
      region: "Out Islands",
      country: "Bahamas",
      countryCode: "BS",
      coordinates: { lat: 24.1783, lng: -76.4372 },
      short: "Exuma Cays, Bahamas",
    },
    specs: {
      bedrooms: 10,
      bathrooms: 12,
      interiorSqm: 2_240,
      plotSqm: 404_000,
      parking: 4,
      yearBuilt: 2015,
      levels: 2,
      orientation: "All aspects — private island",
      tenure: "freehold",
    },
    highlights: [
      "Forty hectares held freehold in their entirety",
      "Deep-water dock and permitted airstrip",
      "Main house plus four guest pavilions",
      "Desalination and full solar microgrid",
    ],
    narrative: [
      "A private island is a logistics proposition before it is a lifestyle one, and Isla Verena was developed by an owner who understood that. The infrastructure came first: a deep-water dock capable of taking a 45-metre vessel, a permitted 900-metre airstrip, desalination, and a solar microgrid with four days of battery autonomy.",
      "Only then came the buildings. A main house of 1,180 square metres on the island's western rise, and four guest pavilions placed far enough apart that none is visible from another. All five structures are timber-framed, hurricane-rated to 250km/h, and finished in materials chosen for salt tolerance over appearance — though the appearance has not suffered for it.",
      "The remaining thirty-eight hectares are largely untouched. Two beaches, a mangrove system on the eastern shore that supports a resident bonefish population, and a ridge trail that takes about forty minutes end to end.",
    ],
    amenities: [
      "Deep-water dock, 45m capacity",
      "Permitted airstrip, 900m",
      "Solar microgrid, four-day autonomy",
      "Desalination, 40,000 l/day",
      "Four guest pavilions",
      "Two private beaches",
      "Staff village, eight residences",
      "Hurricane rating to 250km/h",
    ],
    hero: {
      src: IMG.beachAerialTurquoise,
      alt: "Isla Verena — private island in the Exuma Cays from the air",
    },
    gallery: [
      {
        src: IMG.aerialCoast,
        alt: "The island from the north",
        caption: "From the north — forty hectares",
      },
      {
        src: IMG.exteriorLuxuryVilla,
        alt: "The main house on the western rise",
        caption: "Main house, western rise",
      },
      {
        src: IMG.beachPalm,
        alt: "The southern beach",
        caption: "South beach",
      },
      {
        src: IMG.interiorLight,
        alt: "Main house living pavilion",
        caption: "Living pavilion, main house",
      },
      {
        src: IMG.poolInfinity,
        alt: "Pool terrace above the west beach",
        caption: "Pool terrace, west",
      },
      {
        src: IMG.oceanCalm,
        alt: "The mangrove system on the eastern shore",
        caption: "Eastern mangroves — resident bonefish",
      },
    ],
    featured: true,
    exclusive: true,
    discreet: true,
    agentId: "a-003",
    investment: {
      grossYield: 6.4,
      appreciation5yr: 38,
      rentalIncomePa: 4_200_000,
      runningCostPa: 1_100_000,
      occupancyRate: 62,
      notes:
        "Whole-island charter rates in the Exumas have doubled since 2020. Bahamian ownership carries no capital gains or inheritance tax.",
    },
    listedAt: "2026-06-25",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-009",
    slug: "chalet-hauteville",
    reference: "MV-5520-FR",
    name: "Chalet Hauteville",
    tagline: "Ski-in on old larch, with the Mont Blanc massif in the glass",
    category: "estates",
    status: "reserved",
    price: 29_400_000,
    currency: "EUR",
    priceOnApplication: false,
    location: {
      neighbourhood: "Le Rocher",
      city: "Courchevel 1850",
      region: "Savoie",
      country: "France",
      countryCode: "FR",
      coordinates: { lat: 45.4154, lng: 6.6349 },
      short: "Courchevel 1850, Savoie",
    },
    specs: {
      bedrooms: 8,
      bathrooms: 10,
      interiorSqm: 1_320,
      plotSqm: 3_100,
      parking: 5,
      yearBuilt: 2017,
      levels: 5,
      orientation: "South-east, massif view",
      tenure: "freehold",
    },
    highlights: [
      "True ski-in, ski-out on the Bellecôte return",
      "Reclaimed larch, sourced from four Savoyard barns",
      "Spa level with pool, hammam, and snow room",
      "Heated garage for five, with ski-boot lift",
    ],
    narrative: [
      "Genuine ski-in, ski-out in 1850 is a short list, and Le Rocher is at the top of it. Chalet Hauteville returns directly onto the Bellecôte piste — not a two-minute walk, not a shuttle, but an actual door onto snow.",
      "The building is 2017 but reads considerably older, because the external larch was reclaimed from four Savoyard barns and left to weather rather than treated. Inside, five levels are stacked around a central stair, with the principal reception on the third to put the Mont Blanc massif at eye level from the sofa rather than above it.",
      "The spa level is the part guests do not expect. A twenty-metre pool cut into the rock, hammam, snow room, and two treatment rooms — all below ground, all naturally cool, and all served by a plant room sized for a building twice this size.",
    ],
    amenities: [
      "Ski-in, ski-out — Bellecôte return",
      "Pool, 20m, cut into rock",
      "Hammam, snow room, two treatment rooms",
      "Heated garage, five vehicles",
      "Ski room with boot lift",
      "Cinema, fourteen seats",
      "Staff accommodation, four-bedroom",
      "Helipad, five minutes by road",
    ],
    hero: {
      src: IMG.exteriorDusk,
      alt: "Chalet Hauteville at dusk, Courchevel 1850",
    },
    gallery: [
      {
        src: IMG.interiorWarm,
        alt: "Third-floor reception with massif view",
        caption: "Principal reception, third floor",
      },
      {
        src: IMG.exteriorNight,
        alt: "The chalet lit at night",
        caption: "South-east elevation at night",
      },
      {
        src: IMG.interiorBedroom,
        alt: "Principal bedroom suite",
        caption: "Principal suite, fourth floor",
      },
      {
        src: IMG.interiorBath,
        alt: "Spa level pool",
        caption: "Spa level — 20m pool cut into rock",
      },
      {
        src: IMG.interiorDining,
        alt: "Dining room in reclaimed larch",
        caption: "Dining — reclaimed Savoyard larch",
      },
      {
        src: IMG.exteriorTerrace,
        alt: "Terrace above the piste",
        caption: "Terrace, above the Bellecôte return",
      },
    ],
    featured: false,
    exclusive: true,
    discreet: false,
    agentId: "a-005",
    investment: {
      grossYield: 4.9,
      appreciation5yr: 26,
      rentalIncomePa: 1_440_000,
      runningCostPa: 296_000,
      occupancyRate: 74,
      notes:
        "Peak-week rates in 1850 clear €165,000. True ski-in inventory is effectively fixed — no comparable plots remain on Le Rocher.",
    },
    listedAt: "2026-05-02",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-010",
    slug: "villa-kamala",
    reference: "MV-2287-TH",
    name: "Villa Kamala",
    tagline: "An Andaman headland, engineered to disappear into it",
    category: "villas",
    status: "available",
    price: 12_600_000,
    currency: "USD",
    priceOnApplication: false,
    location: {
      neighbourhood: "Millionaire's Mile",
      city: "Kamala, Phuket",
      region: "Phuket",
      country: "Thailand",
      countryCode: "TH",
      coordinates: { lat: 7.9519, lng: 98.2811 },
      short: "Kamala, Phuket",
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      interiorSqm: 1_040,
      plotSqm: 3_900,
      parking: 4,
      yearBuilt: 2020,
      levels: 4,
      orientation: "West, Andaman Sea",
      tenure: "leasehold",
    },
    highlights: [
      "Four terraces stepped into the headland",
      "Twenty-five-metre pool on the upper deck",
      "Full villa-management agreement in place",
      "Sunset aspect over the Andaman, unobstructed",
    ],
    narrative: [
      "Kamala's western headland — locally and unglamorously known as Millionaire's Mile — has perhaps twenty properties with a genuinely unobstructed sunset aspect. Villa Kamala is one of them, and it was built by an architect who chose to work with the gradient rather than flatten it.",
      "Four levels step down the slope, each one a single terrace deep, so that no room in the house looks at another. The upper deck holds the pool and the principal reception; the two below are bedrooms; the lowest is a spa and gym that opens onto planting rather than view, which was a deliberate and slightly brave decision.",
      "A full management agreement transfers with the sale — the same operator has run the property since completion, with staffing, maintenance, and rental administration in place. For a non-resident owner this is the difference between an asset and a project.",
    ],
    amenities: [
      "Pool, 25m, upper deck",
      "Spa and gymnasium, lower level",
      "Full management agreement",
      "Staff quarters, four-bedroom",
      "Outdoor sala and dining",
      "Cinema room",
      "Backup generator, whole-house",
      "Beach club membership, transferable",
    ],
    hero: {
      src: IMG.exteriorModernHouse,
      alt: "Villa Kamala stepped into the Andaman headland",
    },
    gallery: [
      {
        src: IMG.poolInfinity,
        alt: "The 25-metre pool on the upper deck",
        caption: "Upper deck, 25m pool",
      },
      {
        src: IMG.interiorLiving,
        alt: "Principal reception, west aspect",
        caption: "Principal reception, west",
      },
      {
        src: IMG.oceanHorizon,
        alt: "Sunset over the Andaman Sea",
        caption: "The aspect — unobstructed west",
      },
      {
        src: IMG.interiorBedroom,
        alt: "Bedroom on the second terrace",
        caption: "Second terrace bedroom",
      },
      {
        src: IMG.beachPalm,
        alt: "Kamala beach below the headland",
        caption: "Kamala beach",
      },
      {
        src: IMG.interiorSeating,
        alt: "Outdoor sala",
        caption: "Sala, third terrace",
      },
    ],
    featured: false,
    exclusive: false,
    discreet: false,
    agentId: "a-004",
    investment: {
      grossYield: 7.2,
      appreciation5yr: 33,
      rentalIncomePa: 907_000,
      runningCostPa: 164_000,
      occupancyRate: 79,
      notes:
        "Highest running yield on our books. Note the leasehold structure — 30 years remaining with two renewal options, standard for foreign ownership in Thailand.",
    },
    listedAt: "2026-07-16",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-011",
    slug: "the-vaux-apartments",
    reference: "MV-4419-FR",
    name: "The Vaux Apartments",
    tagline: "A Haussmann corner on Avenue Montaigne, held as two",
    category: "residences",
    status: "available",
    price: 21_800_000,
    currency: "EUR",
    priceOnApplication: false,
    location: {
      neighbourhood: "8e Arrondissement",
      city: "Paris",
      region: "Île-de-France",
      country: "France",
      countryCode: "FR",
      coordinates: { lat: 48.8662, lng: 2.3045 },
      short: "Avenue Montaigne, Paris",
    },
    specs: {
      bedrooms: 5,
      bathrooms: 5,
      interiorSqm: 480,
      plotSqm: null,
      parking: 2,
      yearBuilt: 1874,
      renovated: 2020,
      levels: 2,
      orientation: "Corner, south and west",
      tenure: "freehold",
    },
    highlights: [
      "Second and third floors of a Haussmann corner building",
      "Original parquet de Versailles and boiserie throughout",
      "Two cellars and two parking spaces included",
      "Four minutes on foot to Plaza Athénée",
    ],
    narrative: [
      "Two apartments on the second and third floors of an 1874 Haussmann corner, currently held together and connected by a private internal stair. They can be reunited into a single 480-square-metre residence or separated again — the structural work for either is already done.",
      "The 2020 renovation was conservative in the best sense. Parquet de Versailles lifted, numbered, restored, and relaid. Boiserie stripped by hand rather than chemically. Marble fireplaces retained in all six principal rooms. Services entirely renewed, but routed so that no original moulding was cut.",
      "The corner position gives dual south and west aspect, which in the eighth is worth a great deal — most Haussmann floorplates of this size face one way and take light from a courtyard.",
    ],
    amenities: [
      "Private internal stair between floors",
      "Two parking spaces, secure",
      "Two cellars",
      "Concierge, twenty-four hour",
      "Six marble fireplaces, original",
      "Service entrance, both floors",
      "Lift to both levels",
      "Balcony, south elevation",
    ],
    hero: {
      src: IMG.interiorSalon,
      alt: "The Vaux Apartments — Haussmann salon on Avenue Montaigne",
    },
    gallery: [
      {
        src: IMG.interiorDining,
        alt: "Dining room with original boiserie",
        caption: "Dining room — boiserie, hand-stripped",
      },
      {
        src: IMG.exteriorFacade,
        alt: "The Haussmann corner facade",
        caption: "Corner facade, 1874",
      },
      {
        src: IMG.interiorWarm,
        alt: "Salon on the second floor",
        caption: "Second-floor salon, south aspect",
      },
      {
        src: IMG.interiorBedroom,
        alt: "Principal bedroom, third floor",
        caption: "Principal bedroom, third floor",
      },
      {
        src: IMG.interiorKitchen,
        alt: "Kitchen, third floor",
        caption: "Kitchen, renewed 2020",
      },
      {
        src: IMG.interiorStair,
        alt: "The private connecting stair",
        caption: "Private stair between floors",
      },
    ],
    featured: false,
    exclusive: false,
    discreet: false,
    agentId: "a-002",
    investment: {
      grossYield: 3.4,
      appreciation5yr: 19,
      rentalIncomePa: 741_000,
      runningCostPa: 152_000,
      occupancyRate: 91,
      notes:
        "Optionality is the argument: hold as one residence, or separate into two lettable units with independent lift access.",
    },
    listedAt: "2026-04-08",
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "p-012",
    slug: "hacienda-los-olivos",
    reference: "MV-6675-ES",
    name: "Hacienda Los Olivos",
    tagline: "Two hundred hectares of Andalucía, and a working olive estate",
    category: "estates",
    status: "available",
    price: 16_200_000,
    currency: "EUR",
    priceOnApplication: false,
    location: {
      neighbourhood: "Ronda",
      city: "Málaga",
      region: "Andalusia",
      country: "Spain",
      countryCode: "ES",
      coordinates: { lat: 36.7462, lng: -5.1611 },
      short: "Ronda, Andalusia",
    },
    specs: {
      bedrooms: 12,
      bathrooms: 13,
      interiorSqm: 2_680,
      plotSqm: 2_000_000,
      parking: 10,
      yearBuilt: 1782,
      renovated: 2018,
      levels: 2,
      orientation: "South, Serranía de Ronda",
      tenure: "freehold",
    },
    highlights: [
      "Two hundred hectares, 14,000 producing olive trees",
      "Eighteenth-century cortijo, restored 2018",
      "Own mill and DO-certified oil production",
      "Equestrian facility with eight boxes and a manège",
    ],
    narrative: [
      "Hacienda Los Olivos is a working agricultural business with an exceptional house on it, and it is important to understand it in that order. Fourteen thousand producing olive trees across two hundred hectares, an on-site mill, and a Denominación de Origen certification that took the previous owner six years to obtain.",
      "The cortijo dates from 1782 and was restored in 2018 by a team that had done three comparable buildings in the Serranía. Lime plaster, chestnut beams, and terracotta floors — all original where they could be saved and correctly reproduced where they could not. Twelve bedrooms across two wings, arranged around the original courtyard.",
      "The estate produces between eighteen and twenty-two thousand litres annually depending on the season, sold under its own label. It is not a hobby operation; it employs nine people year-round and considerably more at harvest.",
    ],
    amenities: [
      "14,000 producing olive trees",
      "On-site mill, DO certified",
      "Equestrian facility, eight boxes",
      "Manège, 60m × 20m",
      "Pool, 24m, original cistern",
      "Guest cortijo, four-bedroom",
      "Staff housing, three residences",
      "Chapel, deconsecrated 1961",
    ],
    hero: {
      src: IMG.exteriorEstate,
      alt: "Hacienda Los Olivos — eighteenth-century cortijo in the Serranía de Ronda",
    },
    gallery: [
      {
        src: IMG.exteriorCourtyard,
        alt: "The original courtyard",
        caption: "Courtyard, as laid out 1782",
      },
      {
        src: IMG.interiorWarm,
        alt: "Principal salon with chestnut beams",
        caption: "Principal salon — chestnut beams, original",
      },
      {
        src: IMG.exteriorCountry,
        alt: "The olive groves from the south",
        caption: "The groves — 14,000 trees",
      },
      {
        src: IMG.interiorDining,
        alt: "Dining room, east wing",
        caption: "Dining room, east wing",
      },
      {
        src: IMG.poolVilla,
        alt: "The pool, converted from the original cistern",
        caption: "Pool — the 1782 cistern, converted",
      },
      {
        src: IMG.exteriorGolden,
        alt: "The estate at golden hour",
        caption: "South elevation, evening",
      },
    ],
    featured: false,
    exclusive: true,
    discreet: false,
    agentId: "a-006",
    investment: {
      grossYield: 4.4,
      appreciation5yr: 21,
      rentalIncomePa: 712_000,
      runningCostPa: 384_000,
      occupancyRate: 58,
      notes:
        "Dual income: agricultural production plus event and rental use. Andalusian agricultural land carries favourable succession treatment for qualifying holdings.",
    },
    listedAt: "2026-03-05",
  },
];

/* ── Selectors ─────────────────────────────────────────────────────────────── */

export const featuredProperties = properties.filter((p) => p.featured);

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertiesByAgent(agentId: string): Property[] {
  return properties.filter((p) => p.agentId === agentId);
}

/** Everything except the given slug, ordered so featured mandates surface first. */
export function getRelatedProperties(slug: string, limit = 3): Property[] {
  const current = getPropertyBySlug(slug);
  if (!current) return properties.slice(0, limit);

  return properties
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // Same category first, then featured, then price proximity.
      const catA = a.category === current.category ? 0 : 1;
      const catB = b.category === current.category ? 0 : 1;
      if (catA !== catB) return catA - catB;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return Math.abs(a.price - current.price) - Math.abs(b.price - current.price);
    })
    .slice(0, limit);
}

/** Distinct countries on the book, alphabetised — drives the filter UI. */
export const propertyCountries = Array.from(
  new Set(properties.map((p) => p.location.country))
).sort();
