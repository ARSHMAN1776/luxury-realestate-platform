import { IMG } from "@/lib/images";
import type {
  PropertyCategory,
  Statistic,
  Testimonial,
  CaseStudy,
  Office,
  FaqItem,
  LifestylePillar,
  ServicePillar,
} from "@/types";

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORIES
   ═══════════════════════════════════════════════════════════════════════════ */

export const categories: PropertyCategory[] = [
  {
    id: "villas",
    index: "01",
    name: "Coastal Villas",
    description:
      "Houses built where the land runs out. Mediterranean, Balearic, and Andaman.",
    image: { src: IMG.exteriorPoolVilla, alt: "Coastal villa above the Mediterranean" },
    count: 34,
  },
  {
    id: "penthouses",
    index: "02",
    name: "Penthouses",
    description:
      "Full floor plates and upper volumes in eleven cities. Height, and the quiet that comes with it.",
    image: { src: IMG.cityDubaiDusk, alt: "Penthouse outlook over a city skyline at dusk" },
    count: 21,
  },
  {
    id: "estates",
    index: "03",
    name: "Country Estates",
    description:
      "Land with a house on it — parkland, vineyards, groves, and the occasional working farm.",
    image: { src: IMG.exteriorEstate, alt: "Country estate within mature parkland" },
    count: 18,
  },
  {
    id: "residences",
    index: "04",
    name: "City Residences",
    description:
      "Townhouses and period apartments in the addresses that do not change hands often.",
    image: { src: IMG.exteriorWhiteVilla, alt: "White stucco city townhouse facade" },
    count: 47,
  },
  {
    id: "commercial",
    index: "05",
    name: "Commercial",
    description:
      "Grade-A towers, mixed-use blocks, and income assets underwritten on the rent roll.",
    image: { src: IMG.officeAtrium, alt: "Grade-A commercial atrium" },
    count: 12,
  },
  {
    id: "islands",
    index: "06",
    name: "Private Islands",
    description:
      "Whole-island freeholds. Infrastructure first, architecture second — as it should be.",
    image: { src: IMG.beachAerialTurquoise, alt: "Private island from the air" },
    count: 6,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   THE HOUSE IN NUMBERS
   ═══════════════════════════════════════════════════════════════════════════ */

export const statistics: Statistic[] = [
  {
    id: "s-1",
    value: 13.2,
    prefix: "$",
    suffix: "B",
    label: "Transacted since 1974",
    detail: "Across 41 countries and four generations of ownership",
  },
  {
    id: "s-2",
    value: 68,
    suffix: "%",
    label: "Never publicly listed",
    detail: "The majority of what we place is transacted off-market",
  },
  {
    id: "s-3",
    value: 52,
    suffix: "",
    label: "Years of practice",
    detail: "Established in Geneva, 1974. Independently held since",
  },
  {
    id: "s-4",
    value: 9,
    suffix: "",
    label: "International offices",
    detail: "Geneva, London, New York, Milan, Paris, Dubai, Singapore, Miami, Hong Kong",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════════════ */

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote:
      "They talked me out of the first two houses I wanted. The third one I have now owned for six years, and I understand why.",
    author: "H. Bergström",
    descriptor: "Private client",
    location: "Stockholm",
    mandate: "Costa Smeralda acquisition",
    year: 2020,
  },
  {
    id: "t-2",
    quote:
      "Our family office reviewed four advisors. Meridian & Voss was the only one that arrived with a structuring position rather than a portfolio.",
    author: "Directors",
    descriptor: "Single-family office",
    location: "Singapore",
    mandate: "Commercial mandate, Raffles Place",
    year: 2024,
  },
  {
    id: "t-3",
    quote:
      "The property never appeared anywhere. I was shown it on a Tuesday and we exchanged on the Friday of the following week.",
    author: "Confidential",
    descriptor: "Private client",
    location: "Geneva",
    mandate: "Off-market lakefront",
    year: 2023,
  },
  {
    id: "t-4",
    quote:
      "Clara spent eleven months on the listed consent before we saw a single room. That is the part nobody else was willing to do.",
    author: "J. & M. Ashworth",
    descriptor: "Private clients",
    location: "London",
    mandate: "Grade II townhouse, Belgravia",
    year: 2022,
  },
  {
    id: "t-5",
    quote:
      "I have bought property on three continents. This is the only firm that has ever sent me a valuation I disagreed with and turned out to be right about.",
    author: "A. Nakamura",
    descriptor: "Investor",
    location: "Hong Kong",
    mandate: "Portfolio advisory",
    year: 2025,
  },
  {
    id: "t-6",
    quote:
      "Discretion is easy to promise. In four years, not one person outside my family has known what I own or what I paid.",
    author: "Confidential",
    descriptor: "Private client",
    location: "Dubai",
    mandate: "Full-plate residence",
    year: 2021,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDIES
   ═══════════════════════════════════════════════════════════════════════════ */

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    slug: "the-cologny-succession",
    index: "01",
    title: "The Cologny Succession",
    location: "Geneva, Switzerland",
    brief:
      "A lakefront estate held by one family since 1948, transferring across three heirs in two jurisdictions — none of whom wished to sell to the same buyer.",
    outcome:
      "Structured as a staged transfer with a single acquiring vehicle. Completed in fourteen months without the property reaching open market or a single valuation being disputed.",
    metrics: [
      { label: "Mandate value", value: "CHF 62M" },
      { label: "Time to completion", value: "14 months" },
      { label: "Parties aligned", value: "3 heirs, 2 jurisdictions" },
    ],
    image: { src: IMG.exteriorClassic, alt: "Belle Époque lakefront estate, Geneva" },
    year: 2024,
  },
  {
    id: "cs-2",
    slug: "a-tower-underwritten-twice",
    index: "02",
    title: "A Tower, Underwritten Twice",
    location: "Raffles Place, Singapore",
    brief:
      "A family office in Jakarta sought Grade-A exposure in the Singapore core. The first asset we modelled did not survive our own diligence.",
    outcome:
      "We advised against the initial target and spent a further seven months sourcing a freehold alternative. Acquired at 4.6% gross with a 6.2-year WALE and no single tenant above 22% of income.",
    metrics: [
      { label: "Acquisition", value: "SGD 148M" },
      { label: "Gross yield", value: "4.6%" },
      { label: "Deals declined", value: "1" },
    ],
    image: { src: IMG.archTower, alt: "Grade-A commercial tower, Singapore" },
    year: 2025,
  },
  {
    id: "cs-3",
    slug: "eighteen-months-of-planning",
    index: "03",
    title: "Eighteen Months of Planning",
    location: "Cap Martinet, Ibiza",
    brief:
      "A headland plot with an expired consent, a protected sightline, and a client who wanted to build rather than buy.",
    outcome:
      "Consent secured after eighteen months and two redesigns. The completed house holds one of the last unobstructed westerly aspects on the headland, and a rental licence that can no longer be issued.",
    metrics: [
      { label: "Consent secured", value: "18 months" },
      { label: "Redesigns", value: "2" },
      { label: "Valuation on completion", value: "€18.9M" },
    ],
    image: { src: IMG.exteriorGlassHouse, alt: "Concrete villa on a Balearic headland" },
    year: 2023,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   OFFICES — positions are percentages on the abstract world map
   ═══════════════════════════════════════════════════════════════════════════ */

export const offices: Office[] = [
  {
    id: "o-1",
    city: "Geneva",
    country: "Switzerland",
    address: "Quai du Mont-Blanc 17, 1201",
    phone: "+41 22 555 0100",
    timezone: "CET",
    coordinates: { lat: 46.2116, lng: 6.1487 },
    map: { x: 48.8, y: 33 },
    isHeadquarters: true,
    established: 1974,
  },
  {
    id: "o-2",
    city: "London",
    country: "United Kingdom",
    address: "12 Grosvenor Crescent, SW1X",
    phone: "+44 20 7555 0100",
    timezone: "GMT",
    coordinates: { lat: 51.5014, lng: -0.1528 },
    map: { x: 45.5, y: 28 },
    isHeadquarters: false,
    established: 1981,
  },
  {
    id: "o-3",
    city: "New York",
    country: "United States",
    address: "660 Madison Avenue, NY 10065",
    phone: "+1 212 555 0100",
    timezone: "EST",
    coordinates: { lat: 40.7663, lng: -73.9713 },
    map: { x: 25.5, y: 36 },
    isHeadquarters: false,
    established: 1986,
  },
  {
    id: "o-4",
    city: "Milan",
    country: "Italy",
    address: "Via Montenapoleone 8, 20121",
    phone: "+39 02 8734 9900",
    timezone: "CET",
    coordinates: { lat: 45.4685, lng: 9.1953 },
    map: { x: 49.5, y: 34.5 },
    isHeadquarters: false,
    established: 1992,
  },
  {
    id: "o-5",
    city: "Paris",
    country: "France",
    address: "38 Avenue Montaigne, 75008",
    phone: "+33 1 5555 0100",
    timezone: "CET",
    coordinates: { lat: 48.8662, lng: 2.3045 },
    map: { x: 47.2, y: 31 },
    isHeadquarters: false,
    established: 1995,
  },
  {
    id: "o-6",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Gate Village 4, DIFC",
    phone: "+971 4 555 0100",
    timezone: "GST",
    coordinates: { lat: 25.2093, lng: 55.2789 },
    map: { x: 61.5, y: 45 },
    isHeadquarters: false,
    established: 2006,
  },
  {
    id: "o-7",
    city: "Singapore",
    country: "Singapore",
    address: "1 Raffles Place, 048616",
    phone: "+65 6555 0100",
    timezone: "SGT",
    coordinates: { lat: 1.2839, lng: 103.8515 },
    map: { x: 75, y: 57 },
    isHeadquarters: false,
    established: 2009,
  },
  {
    id: "o-8",
    city: "Miami",
    country: "United States",
    address: "1111 Lincoln Road, FL 33139",
    phone: "+1 305 555 0100",
    timezone: "EST",
    coordinates: { lat: 25.7907, lng: -80.14 },
    map: { x: 26, y: 45 },
    isHeadquarters: false,
    established: 2013,
  },
  {
    id: "o-9",
    city: "Hong Kong",
    country: "Hong Kong SAR",
    address: "8 Connaught Place, Central",
    phone: "+852 5555 0100",
    timezone: "HKT",
    coordinates: { lat: 22.2809, lng: 114.1583 },
    map: { x: 78.5, y: 45 },
    isHeadquarters: false,
    established: 2016,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LIFESTYLE PILLARS
   ═══════════════════════════════════════════════════════════════════════════ */

export const lifestylePillars: LifestylePillar[] = [
  {
    id: "l-1",
    index: "I",
    title: "The Hours That Are Yours",
    copy: "A house earns its cost in the ordinary hours — a Tuesday morning on a terrace, not a photograph in August. We ask clients how they intend to spend a normal week, and the answer changes what we show them.",
    image: { src: IMG.poolInfinity, alt: "Infinity pool terrace in morning light" },
  },
  {
    id: "l-2",
    index: "II",
    title: "Light, and Where It Falls",
    copy: "Orientation is the one specification that cannot be renovated. We record the aspect of every room on our books and, where the decision is close, we will ask a client to return at a different hour before they commit.",
    image: { src: IMG.interiorLight, alt: "Interior in low afternoon light" },
  },
  {
    id: "l-3",
    index: "III",
    title: "Arrival",
    copy: "The approach to a property sets its value before the door opens. A gate, a drive, a change in surface underfoot — these are the details that separate a house from a residence, and they are rarely in the particulars.",
    image: { src: IMG.exteriorCourtyard, alt: "Courtyard arrival of a private estate" },
  },
  {
    id: "l-4",
    index: "IV",
    title: "What Cannot Be Built Again",
    copy: "Grandfathered moorings, expired consents, protected sightlines, licences no longer issued. Much of what we place carries a permission that current regulation would refuse. That is frequently the whole of the value.",
    image: { src: IMG.oceanCliff, alt: "Private shoreline beneath a cliffside property" },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   WHY THE HOUSE — service pillars
   ═══════════════════════════════════════════════════════════════════════════ */

export const servicePillars: ServicePillar[] = [
  {
    id: "sp-1",
    index: "01",
    title: "Off-Market by Default",
    copy: "Sixty-eight per cent of what we transact never reaches a portal, a window, or a press release. Sellers of consequence do not advertise, and the properties that matter most are placed through relationships rather than listings.",
    points: [
      "Standing NDA framework across all nine offices",
      "Private register of 4,100 qualified acquirers",
      "No third-party portal syndication without written instruction",
    ],
  },
  {
    id: "sp-2",
    index: "02",
    title: "We Will Advise Against",
    copy: "Our fee does not depend on which property a client buys, which means we can tell them when the answer is none of them. Last year we advised against eleven acquisitions that we were instructed on.",
    points: [
      "Independent valuation before any offer is drafted",
      "Full structural and title diligence in-house",
      "Eleven acquisitions declined on our advice in 2025",
    ],
  },
  {
    id: "sp-3",
    index: "03",
    title: "Structure Before Signature",
    copy: "Ownership vehicle, jurisdiction, succession, and tax position are settled before an offer is made — not after. We work alongside a client's existing counsel rather than replacing them.",
    points: [
      "Cross-border succession planning",
      "Vehicle and jurisdiction advisory",
      "Coordination with existing family counsel",
    ],
  },
  {
    id: "sp-4",
    index: "04",
    title: "After Completion",
    copy: "A house is a fifty-year relationship, not a transaction. We retain staffing, maintenance, and management oversight on more than two hundred properties we have previously placed.",
    points: [
      "Property management on 214 placed assets",
      "Staffing, security, and seasonal opening",
      "Annual valuation and portfolio review",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

export const faqs: FaqItem[] = [
  {
    id: "f-1",
    group: "Acquisition",
    question: "Do you show properties that are not on your website?",
    answer:
      "Most of them. Roughly two-thirds of what we transact is never publicly advertised — sellers at this level generally require it. Access to the private register follows an initial conversation and, where the seller requires it, a mutual non-disclosure agreement. There is no charge for either.",
  },
  {
    id: "f-2",
    group: "Acquisition",
    question: "What happens after I make an enquiry?",
    answer:
      "A partner — not an assistant — will contact you within one working day. The first conversation is about what you intend to do with the property rather than what you wish to spend. We do not send particulars until we have had it.",
  },
  {
    id: "f-3",
    group: "Acquisition",
    question: "Can you act for me on a property you do not represent?",
    answer:
      "Yes. Around a third of our work is buy-side, acting solely for the acquirer on a property listed elsewhere or not listed at all. In that arrangement we are paid by you and owe our duty entirely to you, which is a materially different position from a selling agent.",
  },
  {
    id: "f-4",
    group: "Ownership",
    question: "Do you assist with ownership structure and succession?",
    answer:
      "We settle the vehicle, jurisdiction, and succession position before an offer is drafted. We work alongside your existing counsel rather than displacing them — in most cases our role is to make sure the property decision and the structural decision are taken together rather than sequentially.",
  },
  {
    id: "f-5",
    group: "Ownership",
    question: "What happens after completion?",
    answer:
      "We currently hold management oversight on 214 properties we have previously placed — staffing, maintenance, security, seasonal opening and closing, and annual valuation. It is optional, priced separately, and cancellable annually.",
  },
  {
    id: "f-6",
    group: "The House",
    question: "How is Meridian & Voss owned?",
    answer:
      "Independently, by its partners, and it has been since 1974. We are not part of a network, we do not franchise the name, and we have no referral obligations to any other firm. This is why we are able to advise against a purchase without it costing us anything but the fee.",
  },
  {
    id: "f-7",
    group: "The House",
    question: "How do you protect client confidentiality?",
    answer:
      "Client identity is held by the instructed partner and no more than two support staff. We do not publish transaction details, we do not issue press on completions, and we do not name clients in marketing — the testimonials on this site are published with written consent and several remain anonymous at the client's request.",
  },
  {
    id: "f-8",
    group: "Investment",
    question: "Do you provide investment analysis, or only sales particulars?",
    answer:
      "Every mandate on our book carries a full underwriting model — gross and net yield, running cost, occupancy assumptions, and a five-year appreciation forecast with the assumptions stated. Where we think the numbers are weak, that appears in the model rather than being omitted from it.",
  },
  {
    id: "f-9",
    group: "Investment",
    question: "What is a realistic minimum for working with the house?",
    answer:
      "Our residential book generally begins around USD 5 million and our commercial mandates around USD 40 million. Below that we are unlikely to be the right firm, and we would rather say so at the outset than take an instruction we cannot serve properly.",
  },
];
